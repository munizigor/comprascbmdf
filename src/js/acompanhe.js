const statusSteps = [
  'Arquivado',
  'Incluído no PCA',
  'DFD',
  'TR',
  'Nota de Empenho emitida',
  'Pedido a Caminho',
  'Recebido no CESMA',
  'Pedido Entregue'
];

const ratingCriteria = [
  { id: 'qualidadeProduto', label: 'Como você avalia a qualidade do produto?' },
  { id: 'fornecedor', label: 'Qual é a sua avaliação sobre o fornecedor?' },
  { id: 'tempoProjeto', label: 'Como você avalia o tempo que levou para receber o pedido?' },
  { id: 'comunicacaoSuporte', label: 'Como foi a comunicação e o suporte prestado?' },
  { id: 'atendeuExpectativa', label: 'O pedido atendeu às suas expectativas?' }
];

function getSavedOrders() {
  const raw = localStorage.getItem('cbmdf_orders');
  return raw ? JSON.parse(raw) : [];
}

function saveOrders(orders) {
  localStorage.setItem('cbmdf_orders', JSON.stringify(orders));
}

function isValidRatingValue(value) {
  return Number.isInteger(value) && value >= 1 && value <= 5;
}

function createEmptyRatingCriteria() {
  const criteria = {};
  ratingCriteria.forEach(criterion => {
    criteria[criterion.id] = null;
  });
  return criteria;
}

function normalizeOrderRating(order) {
  let changed = false;

  if (!order.avaliacao || typeof order.avaliacao !== 'object') {
    order.avaliacao = {
      criterios: createEmptyRatingCriteria(),
      finalizada: false,
      atualizadoEm: null,
      finalizadoEm: null
    };
    return true;
  }

  if (!order.avaliacao.criterios || typeof order.avaliacao.criterios !== 'object') {
    order.avaliacao.criterios = createEmptyRatingCriteria();
    changed = true;
  }

  ratingCriteria.forEach(criterion => {
    const rawValue = Number(order.avaliacao.criterios[criterion.id]);
    const normalizedValue = isValidRatingValue(rawValue) ? rawValue : null;
    if (order.avaliacao.criterios[criterion.id] !== normalizedValue) {
      order.avaliacao.criterios[criterion.id] = normalizedValue;
      changed = true;
    }
  });

  if (typeof order.avaliacao.finalizada !== 'boolean') {
    order.avaliacao.finalizada = false;
    changed = true;
  }

  if (!Object.prototype.hasOwnProperty.call(order.avaliacao, 'atualizadoEm')) {
    order.avaliacao.atualizadoEm = null;
    changed = true;
  }

  if (!Object.prototype.hasOwnProperty.call(order.avaliacao, 'finalizadoEm')) {
    order.avaliacao.finalizadoEm = null;
    changed = true;
  }

  const isComplete = ratingCriteria.every(criterion => isValidRatingValue(order.avaliacao.criterios[criterion.id]));
  if (order.avaliacao.finalizada !== isComplete) {
    order.avaliacao.finalizada = isComplete;
    if (!isComplete) {
      order.avaliacao.finalizadoEm = null;
    }
    changed = true;
  }

  return changed;
}

function normalizeOrders(orders) {
  let changed = false;
  orders.forEach(order => {
    if (!order.status) {
      order.status = 'Arquivado';
      changed = true;
    }
    if (normalizeOrderRating(order)) {
      changed = true;
    }
  });
  if (changed) saveOrders(orders);
  return orders;
}

function formatPrice(value) {
  return Number(value || 0).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}

function formatDateTime(dateString) {
  return dateString || '';
}

function getStatusClass(status) {
  return String(status)
    .toLowerCase()
    .replace(/\s+/g, '-')
    .normalize('NFD')
    .replace(/[^a-z0-9\-]/g, '');
}

function getStatusIndex(status) {
  const index = statusSteps.indexOf(status);
  return index >= 0 ? index : 0;
}

function collectUsers(orders) {
  const users = new Map();
  orders.forEach(order => {
    if (order.usuario && order.usuario.id) {
      users.set(order.usuario.id, order.usuario.nome);
    }
  });
  return Array.from(users.entries()).map(([id, nome]) => ({ id, nome }));
}

function getOrderRatingSummary(order) {
  if (!order.avaliacao || !order.avaliacao.criterios) {
    return null;
  }

  const values = ratingCriteria
    .map(criterion => Number(order.avaliacao.criterios[criterion.id]))
    .filter(value => isValidRatingValue(value));

  if (!values.length) {
    return null;
  }

  const average = values.reduce((sum, value) => sum + value, 0) / values.length;
  return {
    average,
    count: values.length,
    finalizada: Boolean(order.avaliacao.finalizada)
  };
}

function renderSummary(orders) {
  const ordersCount = orders.length;
  const archivedCount = orders.filter(order => order.status === 'Arquivado').length;
  const deliveredCount = orders.filter(order => order.status === 'Pedido Entregue').length;

  document.getElementById('ordersCount').textContent = ordersCount;
  document.getElementById('archivedCount').textContent = archivedCount;
  document.getElementById('deliveredCount').textContent = deliveredCount;
}

function populateUserFilter(orders) {
  const select = document.getElementById('userFilter');
  const users = collectUsers(orders);
  select.innerHTML = '<option value="all">Todos os usuários</option>' +
    users.map(user => `<option value="${user.id}">${user.nome}</option>`).join('');
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
      const matchesUser = userFilter === 'all' || String(order.usuario?.id) === userFilter;
      const matchesStatus = statusFilter === 'all' || order.status === statusFilter;
      const searchFields = [
        order.data,
        order.usuario?.nome,
        order.usuario?.matricula,
        order.usuario?.setor,
        order.observacoes || ''
      ].join(' ').toLowerCase();
      const itemsText = (Array.isArray(order.itens) ? order.itens : [])
        .map(item => [item.nome, item.categoria, item.grupoNome, item.classeNome, item.tipo, item.naturezaDespesa].join(' '))
        .join(' ').toLowerCase();
      const matchesSearch = !search || searchFields.includes(search) || itemsText.includes(search);
      return matchesUser && matchesStatus && matchesSearch;
    });

  renderSummary(filtered.map(entry => entry.order));
  renderOrderList(filtered);
}

function renderRatingStars(orderIndex, criterionId, currentValue, isLocked) {
  return Array.from({ length: 5 }, (_, index) => {
    const value = index + 1;
    const isActive = currentValue >= value;
    const activeClass = isActive ? ' is-active' : '';
    const disabledAttr = isLocked ? 'disabled' : '';
    return `<button
      type="button"
      class="star-btn${activeClass}"
      data-rating-star="true"
      data-order-index="${orderIndex}"
      data-criterion-id="${criterionId}"
      data-rating-value="${value}"
      aria-label="Avaliar com ${value} estrela${value > 1 ? 's' : ''}"
      ${disabledAttr}
    >&#9733;</button>`;
  }).join('');
}

function renderOrderRatingSection(order, orderIndex) {
  const isDelivered = order.status === 'Pedido Entregue';

  if (!isDelivered) {
    return `
      <section class="rating-panel rating-panel--locked">
        <div class="rating-header">
          <h4 class="rating-title">Avaliação do pedido</h4>
          <span class="rating-badge">Aguardando entrega</span>
        </div>
        <p class="rating-message">A avaliação será liberada quando o pedido chegar ao status Pedido Entregue.</p>
      </section>
    `;
  }

  const criteriaValues = order.avaliacao?.criterios || createEmptyRatingCriteria();
  const isFinalized = Boolean(order.avaliacao?.finalizada);
  const summary = getOrderRatingSummary(order);
  const ratingRows = ratingCriteria.map(criterion => {
    const value = Number(criteriaValues[criterion.id]) || 0;
    return `
      <div class="rating-row">
        <span class="rating-label">${criterion.label}</span>
        <div class="rating-stars" role="group" aria-label="${criterion.label}">
          ${renderRatingStars(orderIndex, criterion.id, value, false)}
        </div>
      </div>
    `;
  }).join('');

  const statusText = isFinalized
    ? 'Avaliação concluída. Você pode ajustar as estrelas a qualquer momento.'
    : 'Auto-save ativo: cada clique em estrela salva a nota automaticamente.';

  const summaryText = summary
    ? `Média geral: <strong>${summary.average.toFixed(1).replace('.', ',')}</strong> (${summary.count}/5 critérios)`
    : 'Média geral: <strong>—</strong>';

  return `
    <section class="rating-panel">
      <div class="rating-header">
        <h4 class="rating-title">Avaliação do pedido</h4>
        <span class="rating-badge ${isFinalized ? 'rating-badge--done' : 'rating-badge--pending'}">${isFinalized ? 'Avaliado' : 'Em avaliação'}</span>
      </div>
      <div class="rating-grid">
        ${ratingRows}
      </div>
      <div class="rating-footer">
        <span class="rating-summary">${summaryText}</span>
        <span class="rating-message">${statusText}</span>
      </div>
    </section>
  `;
}

function setOrderRating(orderIndex, criterionId, value) {
  const orders = normalizeOrders(getSavedOrders());
  const order = orders[orderIndex];
  if (!order || order.status !== 'Pedido Entregue') {
    return;
  }

  if (!ratingCriteria.some(criterion => criterion.id === criterionId)) {
    return;
  }

  if (!isValidRatingValue(value)) {
    return;
  }

  if (!order.avaliacao || typeof order.avaliacao !== 'object') {
    order.avaliacao = {
      criterios: createEmptyRatingCriteria(),
      finalizada: false,
      atualizadoEm: null,
      finalizadoEm: null
    };
  }

  if (!order.avaliacao.criterios || typeof order.avaliacao.criterios !== 'object') {
    order.avaliacao.criterios = createEmptyRatingCriteria();
  }

  order.avaliacao.criterios[criterionId] = value;
  order.avaliacao.atualizadoEm = new Date().toISOString();

  const isComplete = ratingCriteria.every(criterion => isValidRatingValue(Number(order.avaliacao.criterios[criterion.id])));
  if (isComplete) {
    order.avaliacao.finalizada = true;
    if (!order.avaliacao.finalizadoEm) {
      order.avaliacao.finalizadoEm = new Date().toISOString();
    }
  }

  saveOrders(orders);
  applyFilters();
}

function handleRatingClick(event) {
  const button = event.target.closest('[data-rating-star="true"]');
  if (!button) {
    return;
  }

  const orderIndex = Number(button.getAttribute('data-order-index'));
  const criterionId = button.getAttribute('data-criterion-id');
  const value = Number(button.getAttribute('data-rating-value'));

  if (!Number.isInteger(orderIndex) || !criterionId || !isValidRatingValue(value)) {
    return;
  }

  setOrderRating(orderIndex, criterionId, value);
}

function renderOrderList(entries) {
  const container = document.getElementById('ordersContainer');
  container.innerHTML = '';

  if (!entries.length) {
    container.innerHTML = '<div class="empty-state">Nenhum pedido encontrado. Ajuste os filtros ou volte após registrar pedidos no marketplace.</div>';
    return;
  }

  entries.forEach(entry => {
    const order = entry.order;
    const orderStatusIndex = getStatusIndex(order.status);
    const timelineHtml = statusSteps.slice(1).map(status => {
      const stepIndex = getStatusIndex(status);
      const state = orderStatusIndex > stepIndex ? 'completed' : orderStatusIndex === stepIndex ? 'current' : 'pending';
      return `
        <li class="timeline-step timeline-step--${state}">
          <span class="timeline-step-marker"></span>
          <div class="timeline-step-content">
            <strong>${status}</strong>
            ${state === 'current' ? '<span class="timeline-step-note">Status atual</span>' : ''}
          </div>
        </li>`;
    }).join('');

    const orderCard = document.createElement('div');
    orderCard.className = 'order-card';
    orderCard.innerHTML = `
      <div class="order-card-header">
        <div class="order-card-title-group">
          <h3 class="order-card-title">Pedido ${entry.originalIndex + 1}</h3>
          <span class="status-badge status-badge--${getStatusClass(order.status)}">${order.status}</span>
        </div>
      </div>
      <div class="order-meta">
        <div><strong>Data:</strong> ${formatDateTime(order.data)}</div>
        <div><strong>Usuário:</strong> ${order.usuario?.nome || 'Desconhecido'}</div>
        <div><strong>Setor:</strong> ${order.usuario?.setor || '—'}</div>
      </div>
      <ul class="timeline">
        ${timelineHtml}
      </ul>
      ${renderOrderRatingSection(order, entry.originalIndex)}
    `;
    container.appendChild(orderCard);
  });
}

function initializePage() {
  const orders = normalizeOrders(getSavedOrders());
  populateUserFilter(orders);
  renderSummary(orders);
  renderOrderList(orders.map((order, originalIndex) => ({ order, originalIndex })));

  const ordersContainer = document.getElementById('ordersContainer');
  ordersContainer.addEventListener('click', handleRatingClick);
}

window.addEventListener('DOMContentLoaded', initializePage);
