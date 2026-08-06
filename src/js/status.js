const statusOptions = [
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

function normalizeOrders(orders) {
  let changed = false;
  orders.forEach(order => {
    if (!order.status) {
      order.status = 'Arquivado';
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
  return statusOptions.includes(status) ? status : 'Arquivado';
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
  const userFilter = document.getElementById('userFilter').value;
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
        </div>
        <div class="order-meta">
          <div><strong>Data:</strong> ${formatDateTime(order.data)}</div>
          <div><strong>Usuário:</strong> ${order.usuario.nome}</div>
          <div><strong>Setor:</strong> ${order.usuario.setor}</div>
          <div><strong>Itens:</strong> ${items.length}</div>
        </div>
      </div>
      <p class="order-notes"><strong>Observações:</strong> ${order.observacoes || 'Nenhuma'}</p>
      <table class="report-table">
        <thead>
          <tr>
            <th>Item</th>
            <th>Qtd</th>
            <th>Urgência</th>
            <th>Preço unit.</th>
            <th>Subtotal</th>
          </tr>
        </thead>
        <tbody>
          ${items.length ? items.map(item => `
            <tr>
              <td>${item.nome || item.name || 'Item sem nome'}</td>
              <td>${item.quantidade ?? item.quantity ?? 0}</td>
              <td>${item.urgencia ?? item.urgency ?? 'normal'}</td>
              <td>${formatPrice(item.precoUnitario ?? item.unitPrice ?? 0)}</td>
              <td>${formatPrice(item.subtotal ?? item.total ?? ((item.quantidade ?? item.quantity ?? 0) * (item.precoUnitario ?? item.unitPrice ?? 0)))}</td>
            </tr>
          `).join('') : `
            <tr>
              <td colspan="5" style="text-align:center;color:var(--muted);padding:18px;">Nenhum item registrado neste pedido.</td>
            </tr>
          `}
        </tbody>
      </table>
    `;
    container.appendChild(orderCard);
  });
}

document.addEventListener('DOMContentLoaded', () => {
  const orders = normalizeOrders(getSavedOrders());
  populateUserFilter(orders);
  applyFilters();
});
