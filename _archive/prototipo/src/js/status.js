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
      .map(([id, nome]) => `<option value="${escapeAttr(id)}">${escapeHtml(nome)}</option>`)
      .join('');
}

function applyFilters(resetPagination = false) {
  if (resetPagination) visibleCount = PAGE_SIZE;
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

// Opções de aprovador = todos os usuários exceto quem está registrando a
// mudança (a regra aprovador ≠ autor é validada em applyStatusChange).
function buildAprovadorOptions() {
  const autor = typeof getAutorAtual === 'function' ? getAutorAtual() : null;
  const lista = typeof users !== 'undefined' && Array.isArray(users) ? users : [];
  return lista
    .filter(user => !autor || user.id !== autor.id)
    .map(user => `<option value="${escapeAttr(user.id)}">${escapeHtml(user.nome)} (${escapeHtml(user.setor)})</option>`)
    .join('');
}

// A mudança de status não é mais imediata: escolher um destino abre o painel
// de motivo, e só o "Registrar mudança" efetiva — passando por
// applyStatusChange, o ponto único que grava a trilha.
function openTransitionPanel(orderId, novoStatus) {
  const panel = document.getElementById(`transition-panel-${orderId}`);
  if (!panel) return;

  const order = findOrderById(getSavedOrders(), orderId);
  if (!order) return;

  const excecao = document.querySelector(`[data-excecao="${CSS.escape(orderId)}"]`)?.checked || false;
  const minimo = getJustificativaMinima(order.status, novoStatus, excecao);

  panel.hidden = !novoStatus;
  if (!novoStatus) return;

  panel.querySelector('[data-transition-target]').textContent = novoStatus;

  // Gates que exigem um segundo responsável mostram o seletor de aprovador.
  const precisaAprovador = typeof exigeAprovador === 'function' && exigeAprovador(order.status, novoStatus);
  const aprovadorBox = panel.querySelector('[data-transition-aprovador]');
  if (aprovadorBox) {
    aprovadorBox.hidden = !precisaAprovador;
    const aprovadorSelect = aprovadorBox.querySelector('[data-aprovador-select]');
    if (aprovadorSelect) aprovadorSelect.innerHTML = precisaAprovador ? buildAprovadorOptions() : '';
  }

  const hint = panel.querySelector('[data-transition-hint]');
  const partes = [minimo > 0
    ? `Motivo obrigatório (mínimo de ${minimo} caracteres).`
    : 'Motivo opcional — se preenchido, fica registrado na trilha.'];
  if (precisaAprovador) partes.push('Exige um aprovador diferente de quem registra a mudança.');
  hint.textContent = partes.join(' ');
  panel.querySelector('textarea').value = '';
  panel.querySelector('[data-transition-error]').textContent = '';
}

function confirmTransition(orderId) {
  const select = document.querySelector(`[data-order-status="${CSS.escape(orderId)}"]`);
  const panel = document.getElementById(`transition-panel-${orderId}`);
  if (!select || !panel || !select.value) return;

  const excepcional = document.querySelector(`[data-excecao="${CSS.escape(orderId)}"]`)?.checked || false;

  const order = findOrderById(getSavedOrders(), orderId);
  let aprovador = null;
  if (order && typeof exigeAprovador === 'function' && exigeAprovador(order.status, select.value)) {
    const aprovadorId = Number(panel.querySelector('[data-aprovador-select]')?.value);
    const lista = typeof users !== 'undefined' && Array.isArray(users) ? users : [];
    const user = lista.find(item => item.id === aprovadorId);
    aprovador = user ? { id: user.id, nome: user.nome, matricula: user.matricula } : null;
  }

  const resultado = applyStatusChange(orderId, select.value, {
    justificativa: panel.querySelector('textarea').value,
    excepcional,
    aprovador,
    origem: 'status.html'
  });

  if (!resultado.ok) {
    panel.querySelector('[data-transition-error]').textContent = resultado.motivo;
    return;
  }

  applyFilters();
}

function cancelTransition(orderId) {
  const select = document.querySelector(`[data-order-status="${CSS.escape(orderId)}"]`);
  if (select) select.value = '';
  const panel = document.getElementById(`transition-panel-${orderId}`);
  if (panel) panel.hidden = true;
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

const PAGE_SIZE = 20;
let visibleCount = PAGE_SIZE;

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

  const podeExcecao = getPerfilAtual() === 'compras';
  const pagina = entries.slice(0, visibleCount);

  pagina.forEach(entry => {
    const order = entry.order;
    const id = escapeAttr(order.id);
    const items = Array.isArray(order.itens) ? order.itens : [];
    const transicoes = getTransicoesValidas(order.status);
    const sla = getSituacaoSla(order);
    const orderCard = document.createElement('div');
    orderCard.className = 'order-card';
    orderCard.innerHTML = `
      <div class="order-card-header">
        <div class="order-card-title-group">
          <h3 class="order-card-title">${escapeHtml(order.id)}</h3>
          <span class="status-badge status-badge--${getStatusClass(order.status)}">${escapeHtml(getStatusLabel(order.status))}</span>
          ${sla ? `<span class="sla-pill sla-pill--${sla.nivel}" title="SLA da Etapa ${sla.etapa}: ${sla.sla} dias">${sla.dias} d na etapa</span>` : ''}
        </div>
        <div class="order-card-actions">
          <label for="status-${id}">Atualizar status</label>
          <select id="status-${id}" data-order-status="${id}">
            <option value="">— manter status atual —</option>
            ${transicoes.map(status => `<option value="${escapeAttr(status)}">${escapeHtml(status)}</option>`).join('')}
          </select>
          ${podeExcecao ? `
            <label class="excecao-toggle" title="Libera qualquer status do pipeline; exige motivo e fica marcado na trilha.">
              <input type="checkbox" data-excecao="${id}"> Transição excepcional
            </label>` : ''}
          <button class="btn btn-secondary btn-sm" type="button" data-toggle-add-item="${id}">Acrescentar item</button>
          <button class="btn btn-danger btn-sm" type="button" data-delete-order="${id}">Excluir pedido</button>
        </div>
        <div class="transition-panel" id="transition-panel-${id}" hidden>
          <p class="transition-title">Mudar para <strong data-transition-target></strong></p>
          <div class="input-group transition-aprovador" data-transition-aprovador hidden>
            <label for="aprovador-${id}">Aprovador responsável (diferente de quem registra)</label>
            <select id="aprovador-${id}" data-aprovador-select></select>
          </div>
          <div class="input-group">
            <label for="justificativa-${id}">Motivo da mudança</label>
            <textarea id="justificativa-${id}" rows="2" placeholder="Descreva o motivo desta mudança de estágio."></textarea>
            <small class="transition-hint" data-transition-hint></small>
          </div>
          <p class="transition-error" data-transition-error role="alert"></p>
          <div class="transition-actions">
            <button class="btn btn-primary btn-sm" type="button" data-confirm-transition="${id}">Registrar mudança</button>
            <button class="btn btn-secondary btn-sm" type="button" data-cancel-transition="${id}">Cancelar</button>
          </div>
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
      ${renderHistoricoHtml(order)}
    `;
    container.appendChild(orderCard);
  });

  // O card ficou pesado com a trilha; carrega em blocos.
  if (entries.length > pagina.length) {
    const row = document.createElement('div');
    row.className = 'load-more-row';
    row.innerHTML = `<button class="btn btn-secondary" type="button" data-load-more>Carregar mais (${entries.length - pagina.length} restantes)</button>`;
    container.appendChild(row);
  }
}

function handleOrdersContainerClick(event) {
  const target = event.target.closest('[data-delete-order], [data-toggle-add-item], [data-save-item], [data-delete-item-order], [data-confirm-transition], [data-cancel-transition], [data-load-more]');
  if (!target) return;

  if (target.dataset.deleteOrder) return deleteOrder(target.dataset.deleteOrder);
  if (target.dataset.toggleAddItem) return toggleAddItemForm(target.dataset.toggleAddItem);
  if (target.dataset.saveItem) return addItemToOrder(target.dataset.saveItem);
  if (target.hasAttribute('data-load-more')) {
    visibleCount += PAGE_SIZE;
    return applyFilters();
  }
  if (target.dataset.confirmTransition) return confirmTransition(target.dataset.confirmTransition);
  if (target.dataset.cancelTransition) return cancelTransition(target.dataset.cancelTransition);
  if (target.dataset.deleteItemOrder) {
    return deleteOrderItem(target.dataset.deleteItemOrder, target.dataset.deleteItemUid);
  }
}

function handleOrdersContainerChange(event) {
  const select = event.target.closest('[data-order-status]');
  if (select) return openTransitionPanel(select.dataset.orderStatus, select.value);

  // Marcar "transição excepcional" libera todo o pipeline no select daquele card.
  const excecao = event.target.closest('[data-excecao]');
  if (!excecao) return;

  const orderId = excecao.dataset.excecao;
  const statusSelect = document.querySelector(`[data-order-status="${CSS.escape(orderId)}"]`);
  const order = findOrderById(getSavedOrders(), orderId);
  if (!statusSelect || !order) return;

  const opcoes = excecao.checked
    ? STATUS_VALUES.filter(status => status !== order.status)
    : getTransicoesValidas(order.status);

  statusSelect.innerHTML = '<option value="">— manter status atual —</option>' +
    opcoes.map(status => `<option value="${escapeAttr(status)}">${escapeHtml(status)}</option>`).join('');
  cancelTransition(orderId);
}

document.addEventListener('DOMContentLoaded', () => {
  if (!guardPage(['gestor', 'compras'])) return;

  renderStatusFilterOptions(document.getElementById('statusFilter'));
  populateUserFilter(getSavedOrders());
  applyFilters();

  const container = document.getElementById('ordersContainer');
  container.addEventListener('click', handleOrdersContainerClick);
  container.addEventListener('change', handleOrdersContainerChange);

  const searchBox = document.getElementById('searchBox');
  searchBox.removeAttribute('oninput');
  searchBox.addEventListener('input', debounce(() => applyFilters(true), 200));
});
