function renderSummary(orders) {
  const ordersCount = orders.length;
  const archivedCount = orders.filter(order => isArchivedStatus(order.status)).length;
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
  const orders = getSavedOrders();
  const search = document.getElementById('searchBox').value.trim().toLowerCase();
  const userSelect = document.getElementById('userFilter');
  const previousUserFilter = userSelect.value;
  populateUserFilter(orders);
  const hasUserOption = Array.from(userSelect.options).some(option => option.value === previousUserFilter);
  userSelect.value = hasUserOption ? previousUserFilter : 'all';
  const userFilter = userSelect.value;
  const statusFilter = document.getElementById('statusFilter').value;

  const filtered = orders
    .map(order => ({ order }))
    .filter(entry => {
      const order = entry.order;
      const matchesUser = userFilter === 'all' || String(order.usuario?.id) === userFilter;
      const matchesStatus = statusFilter === 'all' || order.status === statusFilter;

      const searchFields = [
        order.id,
        order.data,
        order.usuario?.nome,
        order.usuario?.matricula,
        order.usuario?.setor,
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

function updateOrderStatus(orderId, status) {
  const orders = getSavedOrders();
  const order = findOrderById(orders, orderId);
  if (!order) return;
  order.status = status;
  saveOrders(orders);
  applyFilters();
}

function deleteOrder(orderId) {
  const orders = getSavedOrders();
  const index = findOrderIndexById(orders, orderId);
  if (index < 0) return;

  const order = orders[index];
  const confirmation = confirm(`Tem certeza de que deseja excluir o pedido ${order.id} de ${order.usuario?.nome || 'usuário não informado'}?`);
  if (!confirmation) return;

  orders.splice(index, 1);
  saveOrders(orders);
  applyFilters();
}

function deleteOrderItem(orderId, itemUid) {
  const orders = getSavedOrders();
  const order = findOrderById(orders, orderId);
  if (!order || !Array.isArray(order.itens)) return;

  const itemIndex = order.itens.findIndex(item => item.itemUid === itemUid);
  if (itemIndex < 0) return;

  const confirmation = confirm(`Tem certeza de que deseja excluir o item "${getItemName(order.itens[itemIndex])}" deste pedido?`);
  if (!confirmation) return;

  order.itens.splice(itemIndex, 1);
  saveOrders(orders);
  applyFilters();
}

function toggleAddItemForm(orderId) {
  const panel = document.getElementById(`add-item-panel-${orderId}`);
  if (!panel) return;
  panel.hidden = !panel.hidden;
}

function addItemToOrder(orderId) {
  const orders = getSavedOrders();
  const order = findOrderById(orders, orderId);
  if (!order) return;

  const readField = suffix => document.getElementById(`${suffix}-${orderId}`);

  const nome = (readField('newItemName')?.value || '').trim();
  const quantidade = Math.max(1, Number(readField('newItemQuantity')?.value) || 1);
  const urgencia = readField('newItemUrgency')?.value || 'normal';
  const precoUnitario = Math.max(0, Number(readField('newItemUnitPrice')?.value) || 0);

  if (!nome) {
    alert('Informe o nome do item para acrescentar ao pedido.');
    return;
  }

  order.itens.push({
    id: `item-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    itemUid: `${order.id}-I${order.itens.length + 1}-${Date.now().toString(36)}`,
    nome,
    categoria: (readField('newItemCategory')?.value || '').trim() || 'Sem categoria',
    grupoNome: (readField('newItemGroup')?.value || '').trim() || 'Sem grupo',
    classeNome: (readField('newItemClass')?.value || '').trim() || 'Sem classe',
    tipo: (readField('newItemType')?.value || '').trim() || 'MATERIAL',
    tipoDespesa: (readField('newItemExpenseType')?.value || '').trim() || 'Custeio',
    naturezaDespesa: (readField('newItemExpenseNature')?.value || '').trim(),
    quantidade,
    urgencia,
    precoUnitario,
    subtotal: quantidade * precoUnitario
  });

  saveOrders(orders);
  applyFilters();
}

function renderOrders(entries) {
  const container = document.getElementById('ordersContainer');
  container.innerHTML = '';

  if (!entries.length) {
    container.innerHTML = emptyStateHtml({
      title: 'Nenhuma demanda encontrada',
      description: 'Não há pedidos que correspondam aos filtros atuais. Ajuste a busca, o usuário ou o status selecionado.'
    });
    return;
  }

  entries.forEach(entry => {
    const order = entry.order;
    const id = escapeAttr(order.id);
    const items = Array.isArray(order.itens) ? order.itens : [];
    const orderCard = document.createElement('div');
    orderCard.className = 'order-card';
    orderCard.innerHTML = `
      <div class="order-card-header">
        <div class="order-card-title-group">
          <h3 class="order-card-title">${escapeHtml(order.id)}</h3>
          <span class="status-badge status-badge--${getStatusClass(order.status)}">${escapeHtml(getStatusLabel(order.status))}</span>
        </div>
        <div class="order-card-actions">
          <label for="status-${id}">Atualizar status</label>
          <select id="status-${id}" data-order-status="${id}">
            ${STATUS_VALUES.map(status => `<option value="${escapeAttr(status)}" ${order.status === status ? 'selected' : ''}>${escapeHtml(status)}</option>`).join('')}
          </select>
          <button class="btn btn-secondary btn-sm" type="button" data-toggle-add-item="${id}">Acrescentar item</button>
          <button class="btn btn-danger btn-sm" type="button" data-delete-order="${id}">Excluir pedido</button>
        </div>
        <div class="order-meta">
          <div><strong>Data:</strong> ${escapeHtml(formatDateTime(order.data))}</div>
          <div><strong>Usuário:</strong> ${escapeHtml(order.usuario?.nome)}</div>
          <div><strong>Setor:</strong> ${escapeHtml(order.usuario?.setor)}</div>
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
          ${items.length ? items.map(item => `
            <tr>
              <td>${escapeHtml(getItemName(item))}</td>
              <td>${getItemQuantity(item)}</td>
              <td>${escapeHtml(getItemUrgency(item))}</td>
              <td>${formatPrice(getItemUnitPrice(item))}</td>
              <td>${formatPrice(getItemSubtotal(item))}</td>
              <td>
                <button class="btn btn-danger btn-sm table-action" type="button"
                  data-delete-item-order="${id}" data-delete-item-uid="${escapeAttr(item.itemUid)}">Excluir item</button>
              </td>
            </tr>
          `).join('') : `
            <tr>
              <td colspan="6" style="text-align:center;color:var(--muted);padding:18px;">Nenhum item registrado neste pedido.</td>
            </tr>
          `}
        </tbody>
      </table>
      <div class="add-item-panel" id="add-item-panel-${id}" hidden>
        <h4>Acrescentar item ao pedido</h4>
        <div class="add-item-grid">
          <div class="input-group">
            <label for="newItemName-${id}">Nome do item</label>
            <input id="newItemName-${id}" type="text" placeholder="Ex: Luva de combate" />
          </div>
          <div class="input-group">
            <label for="newItemQuantity-${id}">Quantidade</label>
            <input id="newItemQuantity-${id}" type="number" min="1" value="1" />
          </div>
          <div class="input-group">
            <label for="newItemUrgency-${id}">Urgência</label>
            <select id="newItemUrgency-${id}">
              <option value="normal">Normal</option>
              <option value="media">Média</option>
              <option value="alta">Alta</option>
            </select>
          </div>
          <div class="input-group">
            <label for="newItemUnitPrice-${id}">Preço unitário</label>
            <input id="newItemUnitPrice-${id}" type="number" min="0" step="0.01" value="0" />
          </div>
          <div class="input-group">
            <label for="newItemCategory-${id}">Categoria</label>
            <input id="newItemCategory-${id}" type="text" placeholder="Ex: seguranca" />
          </div>
          <div class="input-group">
            <label for="newItemGroup-${id}">Grupo</label>
            <input id="newItemGroup-${id}" type="text" placeholder="Grupo do item" />
          </div>
          <div class="input-group">
            <label for="newItemClass-${id}">Classe</label>
            <input id="newItemClass-${id}" type="text" placeholder="Classe do item" />
          </div>
          <div class="input-group">
            <label for="newItemType-${id}">Tipo</label>
            <input id="newItemType-${id}" type="text" placeholder="MATERIAL ou SERVIÇO" />
          </div>
          <div class="input-group">
            <label for="newItemExpenseType-${id}">Tipo de despesa</label>
            <input id="newItemExpenseType-${id}" type="text" placeholder="Custeio ou Investimento" />
          </div>
          <div class="input-group">
            <label for="newItemExpenseNature-${id}">Natureza de despesa</label>
            <input id="newItemExpenseNature-${id}" type="text" placeholder="Ex: 3.3.90.30" />
          </div>
        </div>
        <div class="add-item-actions">
          <button class="btn btn-primary btn-sm" type="button" data-save-item="${id}">Salvar item</button>
          <button class="btn btn-secondary btn-sm" type="button" data-toggle-add-item="${id}">Cancelar</button>
        </div>
      </div>
    `;
    container.appendChild(orderCard);
  });
}

function handleOrdersContainerClick(event) {
  const target = event.target.closest('[data-delete-order], [data-toggle-add-item], [data-save-item], [data-delete-item-order]');
  if (!target) return;

  if (target.dataset.deleteOrder) return deleteOrder(target.dataset.deleteOrder);
  if (target.dataset.toggleAddItem) return toggleAddItemForm(target.dataset.toggleAddItem);
  if (target.dataset.saveItem) return addItemToOrder(target.dataset.saveItem);
  if (target.dataset.deleteItemOrder) {
    return deleteOrderItem(target.dataset.deleteItemOrder, target.dataset.deleteItemUid);
  }
}

function handleOrdersContainerChange(event) {
  const select = event.target.closest('[data-order-status]');
  if (!select) return;
  updateOrderStatus(select.dataset.orderStatus, select.value);
}

document.addEventListener('DOMContentLoaded', () => {
  renderStatusFilterOptions(document.getElementById('statusFilter'));
  populateUserFilter(getSavedOrders());
  applyFilters();

  const container = document.getElementById('ordersContainer');
  container.addEventListener('click', handleOrdersContainerClick);
  container.addEventListener('change', handleOrdersContainerChange);

  const searchBox = document.getElementById('searchBox');
  searchBox.removeAttribute('oninput');
  searchBox.addEventListener('input', debounce(applyFilters, 200));
});
