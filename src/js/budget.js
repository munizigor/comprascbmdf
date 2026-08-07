const BUDGET_STORAGE_KEY = 'cbmdf_budget_config';
const ORDER_STORAGE_KEY = 'cbmdf_orders';

const CORPORATE_DEFAULTS = {
  custeio: 140000,
  investimento: 220000
};

const PENDING_STATUSES = new Set([
  'Aguardando Analise',
  'Aguardando Análise',
  'Aguardando Analise Setorial',
  'Aguardando Análise Setorial',
  'Aguardando Suplementacao',
  'Aguardando Suplementação'
]);

function formatMoney(value) {
  return Number(value || 0).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}

function toNumber(value, fallback = 0) {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : fallback;
}

function parseDate(dateText) {
  if (!dateText || typeof dateText !== 'string') return 0;
  const parts = dateText.split(',')[0]?.trim().split('/');
  if (!parts || parts.length !== 3) return 0;
  const [day, month, year] = parts.map(Number);
  const dt = new Date(year, month - 1, day);
  return Number.isNaN(dt.getTime()) ? 0 : dt.getTime();
}

function normalizeStatus(status) {
  return String(status || '').trim();
}

function isPendingStatus(status) {
  return PENDING_STATUSES.has(normalizeStatus(status));
}

function isArchivedStatus(status) {
  return normalizeStatus(status) === 'Arquivado';
}

function getItemSubtotal(item) {
  const qty = toNumber(item?.quantidade ?? item?.quantity, 0);
  const unit = toNumber(item?.precoUnitario ?? item?.unitPrice, 0);
  return toNumber(item?.subtotal, qty * unit);
}

function getOrders() {
  const raw = localStorage.getItem(ORDER_STORAGE_KEY);
  if (!raw) return [];
  try {
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch (_error) {
    return [];
  }
}

function saveOrders(orders) {
  localStorage.setItem(ORDER_STORAGE_KEY, JSON.stringify(orders));
}

function buildSectorDirectory(orders) {
  const map = new Map();
  orders.forEach(order => {
    const setor = (order?.usuario?.setor || 'Sem setor').trim();
    if (!map.has(setor)) {
      map.set(setor, {
        setor,
        gestor: order?.usuario?.nome || 'Gestor nao informado',
        latestDate: parseDate(order?.data)
      });
      return;
    }

    const current = map.get(setor);
    const candidateDate = parseDate(order?.data);
    if (candidateDate >= current.latestDate) {
      current.gestor = order?.usuario?.nome || current.gestor;
      current.latestDate = candidateDate;
    }
  });

  if (!map.size) {
    map.set('Sem setor', { setor: 'Sem setor', gestor: 'Gestor nao informado', latestDate: 0 });
  }

  return Array.from(map.values())
    .map(({ latestDate, ...rest }) => rest)
    .sort((a, b) => a.setor.localeCompare(b.setor));
}

function buildDefaultBudgetConfig(orders) {
  const sectors = buildSectorDirectory(orders);
  const sectorCount = Math.max(1, sectors.length);
  const custeioPerSector = CORPORATE_DEFAULTS.custeio / sectorCount;
  const investPerSector = CORPORATE_DEFAULTS.investimento / sectorCount;

  return {
    corporate: { ...CORPORATE_DEFAULTS },
    sectors: sectors.map(sector => ({
      setor: sector.setor,
      gestor: sector.gestor,
      capCusteio: Number(custeioPerSector.toFixed(2)),
      capInvestimento: Number(investPerSector.toFixed(2))
    }))
  };
}

function loadBudgetConfig() {
  const orders = getOrders();
  const raw = localStorage.getItem(BUDGET_STORAGE_KEY);
  if (!raw) {
    const defaults = buildDefaultBudgetConfig(orders);
    saveBudgetConfig(defaults);
    return defaults;
  }

  try {
    const parsed = JSON.parse(raw);
    if (!parsed || typeof parsed !== 'object' || !Array.isArray(parsed.sectors)) {
      throw new Error('invalid config');
    }

    const normalized = {
      corporate: {
        custeio: Math.max(0, toNumber(parsed?.corporate?.custeio, CORPORATE_DEFAULTS.custeio)),
        investimento: Math.max(0, toNumber(parsed?.corporate?.investimento, CORPORATE_DEFAULTS.investimento))
      },
      sectors: parsed.sectors.map(item => ({
        setor: String(item?.setor || 'Sem setor'),
        gestor: String(item?.gestor || 'Gestor nao informado'),
        capCusteio: Math.max(0, toNumber(item?.capCusteio, 0)),
        capInvestimento: Math.max(0, toNumber(item?.capInvestimento, 0))
      }))
    };

    // Merge with any new sectors found in orders.
    const sectorDirectory = buildSectorDirectory(orders);
    sectorDirectory.forEach(reference => {
      if (!normalized.sectors.some(entry => entry.setor === reference.setor)) {
        normalized.sectors.push({
          setor: reference.setor,
          gestor: reference.gestor,
          capCusteio: 0,
          capInvestimento: 0
        });
      }
    });

    normalized.sectors.sort((a, b) => a.setor.localeCompare(b.setor));
    saveBudgetConfig(normalized);
    return normalized;
  } catch (_error) {
    const defaults = buildDefaultBudgetConfig(orders);
    saveBudgetConfig(defaults);
    return defaults;
  }
}

function saveBudgetConfig(config) {
  localStorage.setItem(BUDGET_STORAGE_KEY, JSON.stringify(config));
}

function extractOrderCosts(order) {
  const totals = { custeio: 0, investimento: 0 };
  const items = Array.isArray(order?.itens) ? order.itens : [];

  items.forEach(item => {
    const subtotal = getItemSubtotal(item);
    const expenseType = String(item?.tipoDespesa || '').toLowerCase();
    if (expenseType.includes('invest')) {
      totals.investimento += subtotal;
    } else {
      totals.custeio += subtotal;
    }
  });

  return totals;
}

function computeCommittedBySector(orders) {
  const committed = new Map();

  orders.forEach(order => {
    const setor = order?.usuario?.setor || 'Sem setor';
    const status = normalizeStatus(order?.status);
    if (isArchivedStatus(status) || isPendingStatus(status)) {
      return;
    }

    if (!committed.has(setor)) {
      committed.set(setor, { custeio: 0, investimento: 0 });
    }

    const totals = extractOrderCosts(order);
    const bucket = committed.get(setor);
    bucket.custeio += totals.custeio;
    bucket.investimento += totals.investimento;
  });

  return committed;
}

function computeBudgetSnapshot() {
  const orders = getOrders();
  const config = loadBudgetConfig();
  const committedMap = computeCommittedBySector(orders);

  const sectors = config.sectors.map(sector => {
    const committed = committedMap.get(sector.setor) || { custeio: 0, investimento: 0 };
    const saldoCusteio = sector.capCusteio - committed.custeio;
    const saldoInvest = sector.capInvestimento - committed.investimento;

    return {
      ...sector,
      committedCusteio: committed.custeio,
      committedInvestimento: committed.investimento,
      saldoCusteio,
      saldoInvestimento: saldoInvest
    };
  });

  const allocated = sectors.reduce((acc, sector) => {
    acc.custeio += sector.capCusteio;
    acc.investimento += sector.capInvestimento;
    return acc;
  }, { custeio: 0, investimento: 0 });

  return {
    orders,
    config,
    sectors,
    corporate: {
      custeio: config.corporate.custeio,
      investimento: config.corporate.investimento,
      total: config.corporate.custeio + config.corporate.investimento
    },
    allocated: {
      custeio: allocated.custeio,
      investimento: allocated.investimento,
      total: allocated.custeio + allocated.investimento
    },
    nonAllocated: {
      custeio: config.corporate.custeio - allocated.custeio,
      investimento: config.corporate.investimento - allocated.investimento,
      total: (config.corporate.custeio - allocated.custeio) + (config.corporate.investimento - allocated.investimento)
    }
  };
}

function getSaldoClass(value) {
  if (value < 0) return 'saldo-cell saldo-cell--negative';
  if (value === 0) return 'saldo-cell saldo-cell--empty';
  return 'saldo-cell saldo-cell--available';
}

function renderGeneralView() {
  const snapshot = computeBudgetSnapshot();

  const corpCusteioInput = document.getElementById('corpCusteioInput');
  const corpInvestInput = document.getElementById('corpInvestInput');
  if (corpCusteioInput && corpInvestInput) {
    corpCusteioInput.value = snapshot.corporate.custeio;
    corpInvestInput.value = snapshot.corporate.investimento;
  }

  document.getElementById('kpiTotalGeral').textContent = formatMoney(snapshot.corporate.total);
  document.getElementById('kpiTotalAlocado').textContent = formatMoney(snapshot.allocated.total);
  const saldoNode = document.getElementById('kpiTotalSaldo');
  saldoNode.textContent = formatMoney(snapshot.nonAllocated.total);
  saldoNode.classList.toggle('is-negative', snapshot.nonAllocated.total < 0);

  const tbody = document.getElementById('sectorBudgetTableBody');
  tbody.innerHTML = '';

  snapshot.sectors.forEach(sector => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${sector.setor}</td>
      <td>${sector.gestor}</td>
      <td>${formatMoney(sector.capCusteio)}</td>
      <td>${formatMoney(sector.committedCusteio)}</td>
      <td class="${getSaldoClass(sector.saldoCusteio)}">${formatMoney(sector.saldoCusteio)}</td>
      <td>${formatMoney(sector.capInvestimento)}</td>
      <td>${formatMoney(sector.committedInvestimento)}</td>
      <td class="${getSaldoClass(sector.saldoInvestimento)}">${formatMoney(sector.saldoInvestimento)}</td>
      <td><button class="btn btn-secondary btn-sm budget-edit-btn" type="button" data-sector-name="${sector.setor}">Editar teto</button></td>
    `;
    tbody.appendChild(row);
  });

  bindGeneralActions(snapshot);
}

function bindGeneralActions(snapshot) {
  const saveButton = document.getElementById('saveCorpBudgetButton');
  if (saveButton) {
    saveButton.onclick = () => {
      const custeio = Math.max(0, toNumber(document.getElementById('corpCusteioInput').value, snapshot.corporate.custeio));
      const investimento = Math.max(0, toNumber(document.getElementById('corpInvestInput').value, snapshot.corporate.investimento));

      if (custeio < snapshot.allocated.custeio || investimento < snapshot.allocated.investimento) {
        alert('Os novos tetos corporativos nao podem ser menores que o total ja alocado nos setores.');
        return;
      }

      const config = loadBudgetConfig();
      config.corporate.custeio = custeio;
      config.corporate.investimento = investimento;
      saveBudgetConfig(config);
      renderGeneralView();
    };
  }

  document.querySelectorAll('[data-sector-name]').forEach(button => {
    button.onclick = () => {
      const sectorName = button.getAttribute('data-sector-name');
      openSectorCapEditor(sectorName);
    };
  });
}

function openSectorCapEditor(sectorName) {
  const config = loadBudgetConfig();
  const target = config.sectors.find(item => item.setor === sectorName);
  if (!target) return;

  const currentCusteio = target.capCusteio;
  const currentInvest = target.capInvestimento;

  const inputCusteio = prompt(`Novo teto de Custeio para ${sectorName}`, String(currentCusteio));
  if (inputCusteio === null) return;
  const inputInvest = prompt(`Novo teto de Investimento para ${sectorName}`, String(currentInvest));
  if (inputInvest === null) return;

  const nextCusteio = Math.max(0, toNumber(inputCusteio, currentCusteio));
  const nextInvest = Math.max(0, toNumber(inputInvest, currentInvest));

  const allocatedWithoutTarget = config.sectors.reduce((acc, sector) => {
    if (sector.setor === sectorName) return acc;
    acc.custeio += sector.capCusteio;
    acc.investimento += sector.capInvestimento;
    return acc;
  }, { custeio: 0, investimento: 0 });

  const projectedAllocated = {
    custeio: allocatedWithoutTarget.custeio + nextCusteio,
    investimento: allocatedWithoutTarget.investimento + nextInvest
  };

  if (
    projectedAllocated.custeio > config.corporate.custeio
    || projectedAllocated.investimento > config.corporate.investimento
  ) {
    alert('Alocacao invalida: o teto setorial excede o saldo corporativo da categoria.');
    return;
  }

  target.capCusteio = Number(nextCusteio.toFixed(2));
  target.capInvestimento = Number(nextInvest.toFixed(2));
  saveBudgetConfig(config);
  renderGeneralView();
}

function getSectorPendingRequests(orders, setor) {
  return orders
    .map((order, index) => ({ order, index }))
    .filter(entry => (entry.order?.usuario?.setor || 'Sem setor') === setor)
    .filter(entry => isPendingStatus(entry.order?.status));
}

function getProgressLevel(percentage) {
  if (percentage > 90) return 'red';
  if (percentage > 70) return 'yellow';
  return 'green';
}

function updateProgressMeter(prefix, committed, cap) {
  const percentNode = document.getElementById(`${prefix}Percent`);
  const meterFill = document.getElementById(`${prefix}MeterFill`);
  const metaNode = document.getElementById(`${prefix}Meta`);

  const percent = cap > 0 ? (committed / cap) * 100 : 0;
  const boundedPercent = Math.max(0, Math.min(percent, 100));
  const level = getProgressLevel(percent);

  percentNode.textContent = `${percent.toFixed(1)}%`;
  meterFill.style.width = `${boundedPercent}%`;
  meterFill.classList.remove('level-green', 'level-yellow', 'level-red');
  meterFill.classList.add(`level-${level}`);

  metaNode.textContent = `Comprometido ${formatMoney(committed)} de ${formatMoney(cap)}`;
}

function requestFitsSectorBudget(sector, requestCosts) {
  const saldoCusteio = sector.capCusteio - sector.committedCusteio;
  const saldoInvestimento = sector.capInvestimento - sector.committedInvestimento;

  return {
    fits: requestCosts.custeio <= saldoCusteio && requestCosts.investimento <= saldoInvestimento,
    saldoCusteio,
    saldoInvestimento,
    overflowCusteio: Math.max(0, requestCosts.custeio - saldoCusteio),
    overflowInvestimento: Math.max(0, requestCosts.investimento - saldoInvestimento)
  };
}

function renderPendingRequests(setorData, pendingEntries) {
  const container = document.getElementById('pendingRequestsContainer');
  container.innerHTML = '';

  if (!pendingEntries.length) {
    container.innerHTML = '<div class="empty-state empty-state--compact">Nao ha solicitacoes pendentes para este setor.</div>';
    return;
  }

  pendingEntries.forEach(entry => {
    const requestCosts = extractOrderCosts(entry.order);
    const validation = requestFitsSectorBudget(setorData, requestCosts);
    const orderLabel = entry.order?.data || `Pedido ${entry.index + 1}`;
    const userName = entry.order?.usuario?.nome || 'Usuario nao informado';
    const statusClass = validation.fits ? 'fit' : 'overflow';
    const statusLabel = validation.fits ? 'Dentro do Orcamento' : 'Orcamento Insuficiente';

    const card = document.createElement('article');
    card.className = 'budget-request-card';

    const rows = (Array.isArray(entry.order?.itens) ? entry.order.itens : [])
      .map((item, itemIndex) => `
        <tr>
          <td>${item.nome || item.name || 'Item sem nome'}</td>
          <td>${item.tipoDespesa || 'Custeio'}</td>
          <td>${formatMoney(getItemSubtotal(item))}</td>
          <td><button class="btn btn-danger btn-sm" type="button" data-remove-item-order="${entry.index}" data-remove-item-index="${itemIndex}">Excluir</button></td>
        </tr>
      `)
      .join('');

    const warningText = !validation.fits
      ? `<div class="budget-warning">Orcamento Insuficiente. Excesso em Custeio: ${formatMoney(validation.overflowCusteio)} | Excesso em Investimento: ${formatMoney(validation.overflowInvestimento)}.</div>`
      : '';

    card.innerHTML = `
      <div class="budget-request-top">
        <div>
          <h3 class="budget-request-title">${orderLabel}</h3>
          <small>Solicitante: ${userName}</small>
        </div>
        <span class="budget-status-pill ${statusClass}">${statusLabel}</span>
      </div>

      <div class="budget-request-summary">
        <div><strong>Custeio da solicitacao:</strong> ${formatMoney(requestCosts.custeio)}</div>
        <div><strong>Investimento da solicitacao:</strong> ${formatMoney(requestCosts.investimento)}</div>
        <div><strong>Saldo atual Custeio:</strong> ${formatMoney(validation.saldoCusteio)}</div>
        <div><strong>Saldo atual Investimento:</strong> ${formatMoney(validation.saldoInvestimento)}</div>
      </div>

      ${warningText}

      <div class="table-scroll">
        <table class="report-table budget-item-table">
          <thead>
            <tr>
              <th>Item</th>
              <th>Tipo de despesa</th>
              <th>Subtotal</th>
              <th>Acao</th>
            </tr>
          </thead>
          <tbody>${rows}</tbody>
        </table>
      </div>

      <div class="budget-request-actions">
        <button class="btn btn-primary btn-sm" type="button" data-approve-order="${entry.index}" ${validation.fits ? '' : 'disabled'}>Aprovar no Setor</button>
        <button class="btn btn-secondary btn-sm" type="button" data-supplement-order="${entry.index}">Solicitar Suplementacao</button>
      </div>
    `;

    container.appendChild(card);
  });

  bindPendingRequestActions();
}

function bindPendingRequestActions() {
  document.querySelectorAll('[data-remove-item-order]').forEach(button => {
    button.onclick = () => {
      const orderIndex = Number(button.getAttribute('data-remove-item-order'));
      const itemIndex = Number(button.getAttribute('data-remove-item-index'));
      removeItemFromOrder(orderIndex, itemIndex);
    };
  });

  document.querySelectorAll('[data-approve-order]').forEach(button => {
    button.onclick = () => {
      const orderIndex = Number(button.getAttribute('data-approve-order'));
      approveOrderInSector(orderIndex);
    };
  });

  document.querySelectorAll('[data-supplement-order]').forEach(button => {
    button.onclick = () => {
      const orderIndex = Number(button.getAttribute('data-supplement-order'));
      markOrderAsSupplementRequest(orderIndex);
    };
  });
}

function removeItemFromOrder(orderIndex, itemIndex) {
  const orders = getOrders();
  const order = orders[orderIndex];
  if (!order || !Array.isArray(order.itens) || !order.itens[itemIndex]) {
    return;
  }

  order.itens.splice(itemIndex, 1);
  saveOrders(orders);
  renderSectorView();
}

function approveOrderInSector(orderIndex) {
  const orders = getOrders();
  if (!orders[orderIndex]) return;

  const selectedSector = document.getElementById('sectorSelect')?.value;
  const snapshot = computeBudgetSnapshot();
  const setorData = snapshot.sectors.find(item => item.setor === selectedSector);
  if (!setorData) return;

  const requestCosts = extractOrderCosts(orders[orderIndex]);
  const validation = requestFitsSectorBudget(setorData, requestCosts);

  if (!validation.fits) {
    alert('Orcamento Insuficiente. Ajuste itens ou solicite suplementacao.');
    return;
  }

  orders[orderIndex].status = 'Incluído no PCA';
  saveOrders(orders);
  renderSectorView();
}

function markOrderAsSupplementRequest(orderIndex) {
  const orders = getOrders();
  if (!orders[orderIndex]) return;

  orders[orderIndex].status = 'Aguardando Suplementação';
  saveOrders(orders);
  renderSectorView();
}

function renderSectorSelector(sectors, selected) {
  const select = document.getElementById('sectorSelect');
  if (!select) return;

  select.innerHTML = sectors
    .map(sector => `<option value="${sector.setor}" ${sector.setor === selected ? 'selected' : ''}>${sector.setor} - ${sector.gestor}</option>`)
    .join('');

  select.onchange = () => renderSectorView();
}

function renderSectorView() {
  const snapshot = computeBudgetSnapshot();
  const select = document.getElementById('sectorSelect');

  const preferredSector = select?.value || snapshot.sectors[0]?.setor;
  renderSectorSelector(snapshot.sectors, preferredSector);

  const activeSectorName = document.getElementById('sectorSelect').value;
  const setorData = snapshot.sectors.find(item => item.setor === activeSectorName);

  if (!setorData) {
    document.getElementById('pendingRequestsContainer').innerHTML = '<div class="empty-state empty-state--compact">Setor nao encontrado.</div>';
    return;
  }

  const custeioPercent = setorData.capCusteio > 0
    ? (setorData.committedCusteio / setorData.capCusteio) * 100
    : 0;
  const investPercent = setorData.capInvestimento > 0
    ? (setorData.committedInvestimento / setorData.capInvestimento) * 100
    : 0;

  updateProgressMeter('custeio', setorData.committedCusteio, setorData.capCusteio);
  updateProgressMeter('invest', setorData.committedInvestimento, setorData.capInvestimento);

  // Keep text values explicit to avoid stale UI if meter re-renders.
  document.getElementById('custeioPercent').textContent = `${custeioPercent.toFixed(1)}%`;
  document.getElementById('investPercent').textContent = `${investPercent.toFixed(1)}%`;

  const pendingEntries = getSectorPendingRequests(snapshot.orders, activeSectorName);
  renderPendingRequests(setorData, pendingEntries);
}

function initBudgetModule() {
  const view = document.body.getAttribute('data-budget-view');
  if (view === 'general') {
    renderGeneralView();
    return;
  }

  if (view === 'sector') {
    renderSectorView();
  }
}

document.addEventListener('DOMContentLoaded', initBudgetModule);
