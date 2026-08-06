function getSavedOrders() {
  const raw = localStorage.getItem('cbmdf_orders');
  return raw ? JSON.parse(raw) : [];
}

function exportOrdersCsv() {
  const orders = getSavedOrders();
  if (!orders.length) {
    alert('Não há pedidos para exportar.');
    return;
  }

  const header = ['Data', 'Nome', 'Matrícula', 'Setor', 'Observações', 'Item ID', 'Item Nome', 'Categoria', 'Grupo', 'Classe', 'Tipo', 'Tipo Despesa', 'Natureza Despesa', 'Quantidade', 'Urgência', 'Preço Unitário', 'Subtotal'];
  const rows = [header];

  orders.forEach(order => {
    order.itens.forEach(item => {
      rows.push([
        order.data,
        order.usuario.nome,
        order.usuario.matricula,
        order.usuario.setor,
        order.observacoes,
        item.id,
        item.nome,
        item.categoria,
        item.grupoNome,
        item.classeNome,
        item.tipo,
        item.tipoDespesa,
        item.naturezaDespesa,
        item.quantidade,
        item.urgencia,
        item.precoUnitario,
        item.subtotal
      ]);
    });
  });

  const csv = rows.map(row => row.map(value => `"${String(value ?? '').replace(/"/g, '""')}"`).join(',')).join('\r\n');
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `pedidos_${new Date().toISOString().slice(0,10)}.csv`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

function formatPrice(value) {
  return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}

function formatDateTime(dateString) {
  return dateString;
}

function getItemName(item) {
  return item.nome || item.name || 'Item sem nome';
}

function getItemQuantity(item) {
  return Number(item.quantidade ?? item.quantity ?? 0);
}

function getItemUrgency(item) {
  return item.urgencia || item.urgency || 'normal';
}

function getItemUnitPrice(item) {
  return Number(item.precoUnitario ?? item.unitPrice ?? 0);
}

function getItemSubtotal(item) {
  return Number(item.subtotal ?? item.total ?? getItemQuantity(item) * getItemUnitPrice(item));
}

function collectUsers(orders) {
  const users = new Map();
  orders.forEach(order => {
    if (!users.has(order.usuario.id)) {
      users.set(order.usuario.id, order.usuario.nome);
    }
  });
  return Array.from(users.entries()).map(([id, nome]) => ({ id, nome }));
}

function renderSummary(orders) {
  const ordersCount = orders.length;
  const itemsCount = orders.reduce((sum, order) => sum + order.itens.reduce((sub, item) => sub + (item.quantidade || 0), 0), 0);
  const ordersTotal = orders.reduce((sum, order) => sum + order.itens.reduce((sub, item) => sub + (item.subtotal || 0), 0), 0);

  document.getElementById('ordersCount').textContent = ordersCount;
  document.getElementById('itemsCount').textContent = itemsCount;
  document.getElementById('ordersTotal').textContent = formatPrice(ordersTotal);
}

function populateUserFilter(orders) {
  const select = document.getElementById('userFilter');
  const users = collectUsers(orders);
  select.innerHTML = '<option value="all">Todos os usuários</option>' +
    users.map(user => `<option value="${user.id}">${user.nome}</option>`).join('');
}

function applyFilters() {
  const orders = getSavedOrders();
  const search = document.getElementById('searchBox').value.trim().toLowerCase();
  const userFilter = document.getElementById('userFilter').value;
  const urgencyFilter = document.getElementById('urgencyFilter').value;

  const filtered = orders
    .map((order, originalIndex) => ({ order, originalIndex }))
    .filter(entry => {
      const order = entry.order;
      const matchesUser = userFilter === 'all' || String(order.usuario.id) === userFilter;
      const matchesUrgency = urgencyFilter === 'all' || order.itens.some(item => item.urgencia === urgencyFilter);

      const searchFields = [
        order.data,
        order.usuario.nome,
        order.usuario.matricula,
        order.usuario.setor,
        order.observacoes || ''
      ].join(' ').toLowerCase();

      const itemsText = order.itens.map(item => [item.nome, item.categoria, item.grupoNome, item.classeNome, item.tipo, item.naturezaDespesa].join(' ')).join(' ').toLowerCase();
      const matchesSearch = !search || searchFields.includes(search) || itemsText.includes(search);

      return matchesUser && matchesUrgency && matchesSearch;
    });

  renderSummary(filtered.map(entry => entry.order));
  renderOrders(filtered);
}

function renderOrders(entries) {
  const container = document.getElementById('ordersContainer');
  container.innerHTML = '';

  if (!entries.length) {
    container.innerHTML = '<div class="empty-state">Nenhum pedido encontrado. Ajuste os filtros ou volte após registrar pedidos no marketplace.</div>';
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
          <button class="btn btn-danger btn-sm" type="button" onclick="deleteOrder(${entry.originalIndex})">Excluir pedido</button>
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
              <td>${getItemName(item)}</td>
              <td>${getItemQuantity(item)}</td>
              <td>${getItemUrgency(item)}</td>
              <td>${formatPrice(getItemUnitPrice(item))}</td>
              <td>${formatPrice(getItemSubtotal(item))}</td>
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

function deleteOrder(orderIndex) {
  const orders = getSavedOrders();
  const order = orders[orderIndex];
  if (!order) return;
  const confirmation = confirm(`Tem certeza de que deseja excluir o pedido de ${order.usuario.nome} de ${order.data}?`);
  if (!confirmation) return;

  orders.splice(orderIndex, 1);
  localStorage.setItem('cbmdf_orders', JSON.stringify(orders));
  applyFilters();
}

document.addEventListener('DOMContentLoaded', () => {
  const orders = getSavedOrders();
  populateUserFilter(orders);
  renderSummary(orders);
  renderOrders(orders.map((order, originalIndex) => ({ order, originalIndex })));
});
