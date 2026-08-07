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
  const archivedCount = orders.filter(order => isArchivedStatus(order.status)).length;
  const deliveredCount = orders.filter(order => order.status === 'Pedido Entregue').length;

  document.getElementById('ordersCount').textContent = ordersCount;
  document.getElementById('archivedCount').textContent = archivedCount;
  document.getElementById('deliveredCount').textContent = deliveredCount;
}

// "Meus pedidos" é a tela do requisitante: nasce filtrada no usuário corrente.
// Gestão e Compras precisam enxergar a corporação inteira, então para esses
// perfis a opção "todos" continua disponível.
function canSeeAllUsers() {
  const profile = window.CBMDFNav ? window.CBMDFNav.getProfile() : 'solicitante';
  return profile === 'gestor' || profile === 'compras';
}

function populateUserFilter(orders) {
  const select = document.getElementById('userFilter');
  const users = collectUsers(orders);
  const options = users.map(user => `<option value="${escapeAttr(user.id)}">${escapeHtml(user.nome)}</option>`);
  select.innerHTML = (canSeeAllUsers() ? '<option value="all">Todos os usuários</option>' : '') + options.join('');
}

function applyFilters() {
  const orders = getSavedOrders();
  const search = document.getElementById('searchBox').value.trim().toLowerCase();
  const userFilter = document.getElementById('userFilter').value;
  const statusFilter = document.getElementById('statusFilter').value;

  const filtered = orders
    .map(order => ({ order }))
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

function renderRatingStars(orderId, criterionId, currentValue, isLocked) {
  return Array.from({ length: 5 }, (_, index) => {
    const value = index + 1;
    const isActive = currentValue >= value;
    const activeClass = isActive ? ' is-active' : '';
    const disabledAttr = isLocked ? 'disabled' : '';
    return `<button
      type="button"
      class="star-btn${activeClass}"
      data-rating-star="true"
      data-order-id="${escapeAttr(orderId)}"
      data-criterion-id="${escapeAttr(criterionId)}"
      data-rating-value="${value}"
      aria-label="Avaliar com ${value} estrela${value > 1 ? 's' : ''}"
      ${disabledAttr}
    >&#9733;</button>`;
  }).join('');
}

function renderOrderRatingSection(order) {
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
        <span class="rating-label">${escapeHtml(criterion.label)}</span>
        <div class="rating-stars" role="group" aria-label="${escapeAttr(criterion.label)}">
          ${renderRatingStars(order.id, criterion.id, value, false)}
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

function setOrderRating(orderId, criterionId, value) {
  const orders = getSavedOrders();
  const order = findOrderById(orders, orderId);
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

  const orderId = button.getAttribute('data-order-id');
  const criterionId = button.getAttribute('data-criterion-id');
  const value = Number(button.getAttribute('data-rating-value'));

  if (!orderId || !criterionId || !isValidRatingValue(value)) {
    return;
  }

  setOrderRating(orderId, criterionId, value);
}

function renderOrderTimeline(order) {
  if (isBranchStatus(order.status)) {
    const archived = isArchivedStatus(order.status);
    const variant = archived ? 'archived' : 'rejected';
    const message = archived
      ? `Processo arquivado durante a Etapa ${getStatusStage(order.status)} de 6 — ${getStatusStageLabel(order.status)}.`
      : `Recebimento rejeitado na Etapa ${getStatusStage(order.status)} de 6 — ${getStatusStageLabel(order.status)}. Aguardando substituição pelo fornecedor.`;
    return `
      <div class="timeline-branch-alert timeline-branch-alert--${variant}">
        <strong>${order.status}</strong>
        <p>${message}</p>
      </div>
    `;
  }

  const orderStatusIndex = getStatusIndex(order.status);
  const stagesHtml = getStagesWithStatuses().map(stageGroup => {
    const stepsHtml = stageGroup.statuses.map(status => {
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
    return `
      <li class="timeline-stage-group">
        <h4 class="timeline-stage-title">Etapa ${stageGroup.stage} — ${stageGroup.label}</h4>
        <ul class="timeline">${stepsHtml}</ul>
      </li>
    `;
  }).join('');

  return `<ul class="timeline-stages">${stagesHtml}</ul>`;
}

function renderOrderList(entries) {
  const container = document.getElementById('ordersContainer');
  container.innerHTML = '';

  if (!entries.length) {
    container.innerHTML = emptyStateHtml({
      title: 'Nenhum pedido encontrado',
      description: 'Você ainda não realizou solicitações, ou nenhum pedido corresponde aos filtros atuais.',
      ctaLabel: 'Nova solicitação',
      ctaHref: 'index.html'
    });
    return;
  }

  entries.forEach(entry => {
    const order = entry.order;
    const items = Array.isArray(order.itens) ? order.itens : [];
    const orderTotal = items.reduce((sum, item) => sum + getItemSubtotal(item), 0);

    const orderCard = document.createElement('div');
    orderCard.className = 'order-card';
    orderCard.innerHTML = `
      <div class="order-card-header">
        <div class="order-card-title-group">
          <h3 class="order-card-title">${escapeHtml(order.id)}</h3>
          <span class="status-badge status-badge--${getStatusClass(order.status)}">${escapeHtml(order.status)}</span>
        </div>
      </div>
      <div class="order-meta">
        <div><strong>Data:</strong> ${escapeHtml(formatDateTime(order.data))}</div>
        <div><strong>Usuário:</strong> ${escapeHtml(order.usuario?.nome || 'Desconhecido')}</div>
        <div><strong>Setor:</strong> ${escapeHtml(order.usuario?.setor || '—')}</div>
      </div>
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
              <td>${escapeHtml(getItemName(item))}</td>
              <td>${getItemQuantity(item)}</td>
              <td>${escapeHtml(getItemUrgency(item))}</td>
              <td>${formatPrice(getItemUnitPrice(item))}</td>
              <td>${formatPrice(getItemSubtotal(item))}</td>
            </tr>
          `).join('') + `
            <tr class="table-total-row">
              <td colspan="4" style="text-align:right;"><strong>Total do pedido</strong></td>
              <td><strong>${formatPrice(orderTotal)}</strong></td>
            </tr>
          ` : `
            <tr>
              <td colspan="5" style="text-align:center;color:var(--muted);padding:18px;">Nenhum item registrado neste pedido.</td>
            </tr>
          `}
        </tbody>
      </table>
      ${renderOrderTimeline(order)}
      ${renderHistoricoHtml(order)}
      ${renderOrderRatingSection(order)}
    `;
    container.appendChild(orderCard);
  });
}

function initializePage() {
  renderStatusFilterOptions(document.getElementById('statusFilter'));
  const orders = getSavedOrders();
  populateUserFilter(orders);

  // A tela é "Meus pedidos": abre no usuário corrente, não no acervo inteiro.
  const userSelect = document.getElementById('userFilter');
  const currentUser = window.CBMDFNav ? window.CBMDFNav.getCurrentUser() : null;
  if (currentUser && Array.from(userSelect.options).some(option => option.value === String(currentUser.id))) {
    userSelect.value = String(currentUser.id);
  }

  applyFilters();

  const ordersContainer = document.getElementById('ordersContainer');
  ordersContainer.addEventListener('click', handleRatingClick);

  const searchBox = document.getElementById('searchBox');
  searchBox.removeAttribute('oninput');
  searchBox.addEventListener('input', debounce(applyFilters, 200));
}

window.addEventListener('DOMContentLoaded', initializePage);
