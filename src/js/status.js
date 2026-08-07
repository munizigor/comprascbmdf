const statusOptions = [
  'Aguardando Análise',
  'Arquivado',
  'Incluído no PCA',
  'DFD',
  'TR',
  'Nota de Empenho emitida',
  'Pedido a Caminho',
  'Recebido no CESMA',
  'Pedido Entregue'
];

function getSavedOrders() {
  const raw = localStorage.getItem('cbmdf_orders');
  return raw ? JSON.parse(raw) : [];
}

function saveOrders(orders) {
  localStorage.setItem('cbmdf_orders', JSON.stringify(orders));
}

function escapeHtml(value) {
  return String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

function getItemSubtotal(item) {
  return Number(item.subtotal ?? ((Number(item.quantidade ?? 0)) * (Number(item.precoUnitario ?? 0))));
}

function normalizeOrders(orders) {
  let changed = false;
  orders.forEach(order => {
    if (!order.status) {
      order.status = 'Aguardando Análise';
      changed = true;
    }
    if (!Array.isArray(order.itens)) {
      order.itens = [];
      changed = true;
    }
  });
  if (changed) saveOrders(orders);
  return orders;
}

function formatPrice(value) {
  return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}

function formatDateTime(dateString) {
  return dateString;
}

function getStatusLabel(status) {
  return statusOptions.includes(status) ? status : 'Aguardando Análise';
}

function getStatusClass(status) {
  return String(status)
    .toLowerCase()
    .replace(/\s+/g, '-')
    .normalize('NFD')
    .replace(/[^a-z0-9\-]/g, '');
}

function renderSummary(orders) {
  const ordersCount = orders.length;
  const archivedCount = orders.filter(order => order.status === 'Arquivado').length;
  const deliveredCount = orders.filter(order => order.status === 'Pedido Entregue').length;

  document.getElementById('ordersCount').textContent = ordersCount;
  document.getElementById('pendingCount').textContent = archivedCount;
  document.getElementById('completedCount').textContent = deliveredCount;
}

function populateUserFilter(orders) {
  const users = new Map();
  orders.forEach(order => {
    if (order.usuario && order.usuario.id) {
      users.set(order.usuario.id, order.usuario.nome);
    }
  });

  const select = document.getElementById('userFilter');
  select.innerHTML = '<option value="all">Todos os usuários</option>' +
    Array.from(users.entries())
      .map(([id, nome]) => `<option value="${id}">${nome}</option>`)
      .join('');
}

function applyFilters() {
  const orders = normalizeOrders(getSavedOrders());
  const search = document.getElementById('searchBox').value.trim().toLowerCase();
  const userSelect = document.getElementById('userFilter');
  const previousUserFilter = userSelect.value;
  populateUserFilter(orders);
  const hasUserOption = Array.from(userSelect.options).some(option => option.value === previousUserFilter);
  userSelect.value = hasUserOption ? previousUserFilter : 'all';
  const userFilter = userSelect.value;
  const statusFilter = document.getElementById('statusFilter').value;

  const filtered = orders
    .map((order, originalIndex) => ({ order, originalIndex }))
    .filter(entry => {
      const order = entry.order;
      const matchesUser = userFilter === 'all' || String(order.usuario.id) === userFilter;
      const matchesStatus = statusFilter === 'all' || order.status === statusFilter;

      const searchFields = [
        order.data,
        order.usuario.nome,
        order.usuario.matricula,
        order.usuario.setor,
        order.observacoes || ''
      ].join(' ').toLowerCase();

      const itemsText = (Array.isArray(order.itens) ? order.itens : [])
        .map(item => [item.nome, item.categoria, item.grupoNome, item.classeNome, item.tipo, item.naturezaDespesa].join(' '))
        .join(' ')
        .toLowerCase();

      const matchesSearch = !search || searchFields.includes(search) || itemsText.includes(search);
      return matchesUser && matchesStatus && matchesSearch;
    });

  renderSummary(filtered.map(entry => entry.order));
  renderOrders(filtered);
}

function updateOrderStatus(orderIndex, status) {
  const orders = normalizeOrders(getSavedOrders());
  if (!orders[orderIndex]) return;
  orders[orderIndex].status = status;
  saveOrders(orders);
  applyFilters();
}

function deleteOrder(orderIndex) {
  const orders = normalizeOrders(getSavedOrders());
  const order = orders[orderIndex];
  if (!order) return;

  const confirmation = confirm(`Tem certeza de que deseja excluir o pedido de ${order.usuario.nome} de ${order.data}?`);
  if (!confirmation) return;

  orders.splice(orderIndex, 1);
  saveOrders(orders);
  applyFilters();
}

function deleteOrderItem(orderIndex, itemIndex) {
  const orders = normalizeOrders(getSavedOrders());
  const order = orders[orderIndex];
  if (!order || !Array.isArray(order.itens) || !order.itens[itemIndex]) return;

  const item = order.itens[itemIndex];
  const itemName = item.nome || item.name || `Item ${itemIndex + 1}`;
  const confirmation = confirm(`Tem certeza de que deseja excluir o item "${itemName}" deste pedido?`);
  if (!confirmation) return;

  order.itens.splice(itemIndex, 1);
  saveOrders(orders);
  applyFilters();
}

function toggleAddItemForm(orderIndex) {
  const panel = document.getElementById(`add-item-panel-${orderIndex}`);
  if (!panel) return;
  panel.hidden = !panel.hidden;
}

function addItemToOrder(orderIndex) {
  const orders = normalizeOrders(getSavedOrders());
  const order = orders[orderIndex];
  if (!order) return;

  const nameInput = document.getElementById(`newItemName-${orderIndex}`);
  const quantityInput = document.getElementById(`newItemQuantity-${orderIndex}`);
  const urgencyInput = document.getElementById(`newItemUrgency-${orderIndex}`);
  const unitPriceInput = document.getElementById(`newItemUnitPrice-${orderIndex}`);
  const categoryInput = document.getElementById(`newItemCategory-${orderIndex}`);
  const groupInput = document.getElementById(`newItemGroup-${orderIndex}`);
  const classInput = document.getElementById(`newItemClass-${orderIndex}`);
  const typeInput = document.getElementById(`newItemType-${orderIndex}`);
  const expenseTypeInput = document.getElementById(`newItemExpenseType-${orderIndex}`);
  const expenseNatureInput = document.getElementById(`newItemExpenseNature-${orderIndex}`);

  const nome = (nameInput?.value || '').trim();
  const quantidade = Math.max(1, Number(quantityInput?.value) || 1);
  const urgencia = urgencyInput?.value || 'normal';
  const precoUnitario = Math.max(0, Number(unitPriceInput?.value) || 0);

  if (!nome) {
    alert('Informe o nome do item para acrescentar ao pedido.');
    return;
  }

  const newItem = {
    id: `item-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    nome,
    categoria: (categoryInput?.value || '').trim() || 'Sem categoria',
    grupoNome: (groupInput?.value || '').trim() || 'Sem grupo',
    classeNome: (classInput?.value || '').trim() || 'Sem classe',
    tipo: (typeInput?.value || '').trim() || 'MATERIAL',
    tipoDespesa: (expenseTypeInput?.value || '').trim() || 'Custeio',
    naturezaDespesa: (expenseNatureInput?.value || '').trim(),
    quantidade,
    urgencia,
    precoUnitario,
    subtotal: quantidade * precoUnitario
  };

  order.itens.push(newItem);
  saveOrders(orders);
  applyFilters();
  toggleAddItemForm(orderIndex);
}

function renderOrders(entries) {
  const container = document.getElementById('ordersContainer');
  container.innerHTML = '';

  if (!entries.length) {
    container.innerHTML = '<div class="empty-state">Nenhum pedido encontrado. Ajuste os filtros ou carregue pedidos no marketplace.</div>';
    return;
  }

  entries.forEach((entry, index) => {
    const order = entry.order;
    const items = Array.isArray(order.itens) ? order.itens : [];
    const orderCard = document.createElement('div');
    orderCard.className = 'order-card';
    orderCard.innerHTML = `
      <div class="order-card-header">
        <div class="order-card-title-group">
          <h3 class="order-card-title">Pedido ${index + 1}</h3>
          <span class="status-badge status-badge--${getStatusClass(order.status)}">${getStatusLabel(order.status)}</span>
        </div>
        <div class="order-card-actions">
          <label for="status-${entry.originalIndex}">Atualizar status</label>
          <select id="status-${entry.originalIndex}" onchange="updateOrderStatus(${entry.originalIndex}, this.value)">
            ${statusOptions.map(status => `<option value="${status}" ${order.status === status ? 'selected' : ''}>${status}</option>`).join('')}
          </select>
          <button class="btn btn-secondary btn-sm" type="button" onclick="toggleAddItemForm(${entry.originalIndex})">Acrescentar item</button>
          <button class="btn btn-danger btn-sm" type="button" onclick="deleteOrder(${entry.originalIndex})">Excluir pedido</button>
        </div>
        <div class="order-meta">
          <div><strong>Data:</strong> ${formatDateTime(order.data)}</div>
          <div><strong>Usuário:</strong> ${escapeHtml(order.usuario.nome)}</div>
          <div><strong>Setor:</strong> ${escapeHtml(order.usuario.setor)}</div>
          <div><strong>Itens:</strong> ${items.length}</div>
        </div>
      </div>
      <p class="order-notes"><strong>Observações:</strong> ${escapeHtml(order.observacoes || 'Nenhuma')}</p>
      <table class="report-table">
        <thead>
          <tr>
            <th>Item</th>
            <th>Qtd</th>
            <th>Urgência</th>
            <th>Preço unit.</th>
            <th>Subtotal</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          ${items.length ? items.map((item, itemIndex) => `
            <tr>
              <td>${escapeHtml(item.nome || item.name || 'Item sem nome')}</td>
              <td>${item.quantidade ?? item.quantity ?? 0}</td>
              <td>${escapeHtml(item.urgencia ?? item.urgency ?? 'normal')}</td>
              <td>${formatPrice(item.precoUnitario ?? item.unitPrice ?? 0)}</td>
              <td>${formatPrice(getItemSubtotal(item))}</td>
              <td>
                <button class="btn btn-danger btn-sm table-action" type="button" onclick="deleteOrderItem(${entry.originalIndex}, ${itemIndex})">Excluir item</button>
              </td>
            </tr>
          `).join('') : `
            <tr>
              <td colspan="6" style="text-align:center;color:var(--muted);padding:18px;">Nenhum item registrado neste pedido.</td>
            </tr>
          `}
        </tbody>
      </table>
      <div class="add-item-panel" id="add-item-panel-${entry.originalIndex}" hidden>
        <h4>Acrescentar item ao pedido</h4>
        <div class="add-item-grid">
          <div class="input-group">
            <label for="newItemName-${entry.originalIndex}">Nome do item</label>
            <input id="newItemName-${entry.originalIndex}" type="text" placeholder="Ex: Luva de combate" />
          </div>
          <div class="input-group">
            <label for="newItemQuantity-${entry.originalIndex}">Quantidade</label>
            <input id="newItemQuantity-${entry.originalIndex}" type="number" min="1" value="1" />
          </div>
          <div class="input-group">
            <label for="newItemUrgency-${entry.originalIndex}">Urgência</label>
            <select id="newItemUrgency-${entry.originalIndex}">
              <option value="normal">Normal</option>
              <option value="media">Média</option>
              <option value="alta">Alta</option>
            </select>
          </div>
          <div class="input-group">
            <label for="newItemUnitPrice-${entry.originalIndex}">Preço unitário</label>
            <input id="newItemUnitPrice-${entry.originalIndex}" type="number" min="0" step="0.01" value="0" />
          </div>
          <div class="input-group">
            <label for="newItemCategory-${entry.originalIndex}">Categoria</label>
            <input id="newItemCategory-${entry.originalIndex}" type="text" placeholder="Ex: seguranca" />
          </div>
          <div class="input-group">
            <label for="newItemGroup-${entry.originalIndex}">Grupo</label>
            <input id="newItemGroup-${entry.originalIndex}" type="text" placeholder="Grupo do item" />
          </div>
          <div class="input-group">
            <label for="newItemClass-${entry.originalIndex}">Classe</label>
            <input id="newItemClass-${entry.originalIndex}" type="text" placeholder="Classe do item" />
          </div>
          <div class="input-group">
            <label for="newItemType-${entry.originalIndex}">Tipo</label>
            <input id="newItemType-${entry.originalIndex}" type="text" placeholder="MATERIAL ou SERVIÇO" />
          </div>
          <div class="input-group">
            <label for="newItemExpenseType-${entry.originalIndex}">Tipo de despesa</label>
            <input id="newItemExpenseType-${entry.originalIndex}" type="text" placeholder="Custeio ou Investimento" />
          </div>
          <div class="input-group">
            <label for="newItemExpenseNature-${entry.originalIndex}">Natureza de despesa</label>
            <input id="newItemExpenseNature-${entry.originalIndex}" type="text" placeholder="Ex: 3.3.90.30" />
          </div>
        </div>
        <div class="add-item-actions">
          <button class="btn btn-primary btn-sm" type="button" onclick="addItemToOrder(${entry.originalIndex})">Salvar item</button>
          <button class="btn btn-secondary btn-sm" type="button" onclick="toggleAddItemForm(${entry.originalIndex})">Cancelar</button>
        </div>
      </div>
    `;
    container.appendChild(orderCard);
  });
}

document.addEventListener('DOMContentLoaded', () => {
  const orders = normalizeOrders(getSavedOrders());
  populateUserFilter(orders);
  applyFilters();
});
