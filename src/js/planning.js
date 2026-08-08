function getCellRawValue(cell) {
  if (cell && typeof cell === 'object' && Object.prototype.hasOwnProperty.call(cell, 'value')) {
    return cell.value;
  }
  return cell;
}

function getSaldoColumnIndexes(headers) {
  return headers
    .map((header, index) => ({ header: String(header || '').trim().toLowerCase(), index }))
    .filter(item => item.header === 'saldo')
    .map(item => item.index);
}

function getSaldoStateClass(value) {
  const numericValue = Number(value || 0);
  if (numericValue > 0) {
    return 'saldo-cell--available';
  }
  if (numericValue < 0) {
    return 'saldo-cell--negative';
  }
  return 'saldo-cell--empty';
}

function renderRowCells(cells, numericColumns, saldoColumns = []) {
  return cells.map((cell, index) => {
    if (cell === null) {
      return '';
    }

    const cellIsObject = cell && typeof cell === 'object' && !Array.isArray(cell);
    const rawValue = getCellRawValue(cell);
    // Colunas não numéricas trazem dados digitados pelo usuário (classe, tipo,
    // natureza de despesa) — precisam de escape antes de ir para innerHTML.
    const value = numericColumns.includes(index) ? formatPrice(rawValue) : escapeHtml(rawValue);
    const rowspanAttr = cellIsObject && cell.rowspan ? ` rowspan="${Number(cell.rowspan) || 1}"` : '';
    const colspanAttr = cellIsObject && cell.colspan ? ` colspan="${Number(cell.colspan) || 1}"` : '';
    const classNames = [];
    if (cellIsObject && cell.className) {
      classNames.push(cell.className);
    }
    if (saldoColumns.includes(index)) {
      classNames.push('saldo-cell', getSaldoStateClass(rawValue));
    }
    const classAttr = classNames.length ? ` class="${classNames.join(' ')}"` : '';

    return `<td${rowspanAttr}${colspanAttr}${classAttr}>${value}</td>`;
  }).join('');
}

function renderTable(containerId, headers, rows, totalLabel, numericColumns = [], totalValues = null) {
  const container = document.getElementById(containerId);
  if (!container) return;

  if (!rows.length) {
    container.innerHTML = emptyStateHtml({
      title: 'Nenhum valor registrado',
      description: 'Ainda não há pedidos suficientes para compor este plano.'
    });
    return;
  }

  container.innerHTML = '';
  container.appendChild(createReportTable(headers, rows, totalLabel, numericColumns, totalValues));
}

function createReportTable(headers, rows, totalLabel, numericColumns = [], totalValues = null) {
  const normalizedRows = rows.map(row => Array.isArray(row) ? { cells: row, className: '' } : row);
  const resolvedNumericColumns = numericColumns.length ? numericColumns : [headers.length - 1];
  const saldoColumns = getSaldoColumnIndexes(headers);
  const resolvedTotalValues = totalValues ?? resolvedNumericColumns.map(columnIndex => normalizedRows.reduce((sum, row) => sum + Number(getCellRawValue(row.cells[columnIndex]) || 0), 0));
  const totalRow = totalLabel ? `
        <tr class="table-total-row">
          <td colspan="${Math.max(1, headers.length - resolvedTotalValues.length)}">${escapeHtml(totalLabel)}</td>
          ${resolvedTotalValues.map((value, idx) => {
            const columnIndex = resolvedNumericColumns[idx];
            const saldoClasses = saldoColumns.includes(columnIndex) ? ` class="saldo-cell ${getSaldoStateClass(value)}"` : '';
            return `<td${saldoClasses}>${formatPrice(value)}</td>`;
          }).join('')}
        </tr>` : '';

  const table = document.createElement('table');
  table.className = 'report-table';
  table.innerHTML = `
    <thead>
      <tr>
        ${headers.map(header => `<th>${escapeHtml(header)}</th>`).join('')}
      </tr>
    </thead>
    <tbody>
      ${normalizedRows.map(({ cells, className }) => `
        <tr class="${escapeAttr(className || '')}">
          ${renderRowCells(cells, resolvedNumericColumns, saldoColumns)}
        </tr>
      `).join('')}
      ${totalRow}
    </tbody>
  `;

  return table;
}

function renderPcaBySetorTables(containerId, setorGroups) {
  const container = document.getElementById(containerId);
  if (!container) return;

  if (!setorGroups.length) {
    container.innerHTML = emptyStateHtml({
      title: 'Nenhum valor registrado por setor',
      description: 'Ainda não há pedidos suficientes para compor o PCA setorial.'
    });
    return;
  }

  container.innerHTML = '';

  setorGroups.forEach(group => {
    const section = document.createElement('section');
    section.className = 'setor-table-section';

    const title = document.createElement('h3');
    title.className = 'setor-table-title';
    title.textContent = `Setor: ${group.setor}`;

    const totals = group.totals;
    const table = createReportTable(
      ['Tipo', 'Classe', 'Planejado', 'Comprometido', 'Empenhado', 'Liquidado', 'Pago', 'Saldo'],
      group.rows,
      `TOTAL ${group.setor}`,
      [2, 3, 4, 5, 6, 7],
      [totals.total, totals.comprometido, totals.empenhado, totals.liquidado, totals.pago, totals.total - totals.comprometido]
    );

    section.appendChild(title);
    section.appendChild(table);
    container.appendChild(section);
  });
}

function renderPlanningSummary({ pcaGeralTotal, pcaGeralCount, totalAllValue, setorCount, demandaCount, ploaTotal }) {
  const pcaGeralPercent = totalAllValue > 0 ? Math.round((pcaGeralTotal / totalAllValue) * 100) : 0;

  document.getElementById('kpiPcaGeralValor').textContent = formatPrice(pcaGeralTotal);
  document.getElementById('kpiPcaGeralContratacoes').textContent = pcaGeralCount;
  document.getElementById('kpiPcaGeralPercent').textContent = `${pcaGeralPercent}%`;
  document.getElementById('kpiPcaSetorUnidades').textContent = setorCount;
  document.getElementById('kpiPcaSetorDemandas').textContent = demandaCount;
  document.getElementById('kpiPloaValor').textContent = formatPrice(ploaTotal);
}

function renderPlanningAlerts(ordersWithItems) {
  const container = document.getElementById('planningAlerts');
  if (!container) return;

  let unclassifiedCount = 0;
  ordersWithItems.forEach(order => {
    order.itens.forEach(item => {
      if (!item.classeNome || !item.tipo) unclassifiedCount += 1;
    });
  });

  let sectorsOverBudget = 0;
  if (typeof computeBudgetSnapshot === 'function') {
    const snapshot = computeBudgetSnapshot();
    sectorsOverBudget = snapshot.sectors.filter(sector => sector.saldoCusteio < 0 || sector.saldoInvestimento < 0).length;
  }

  const pcaOrders = ordersWithItems.filter(order => getStatusFlags(order.status).includeInTotal);
  const advancedOrders = pcaOrders.length;
  const advancedPercent = ordersWithItems.length ? Math.round((advancedOrders / ordersWithItems.length) * 100) : 0;

  const pncpPublicados = typeof isPublicadoPncp === 'function'
    ? pcaOrders.filter(order => isPublicadoPncp(order)).length
    : 0;
  const pncpPercent = advancedOrders ? Math.round((pncpPublicados / advancedOrders) * 100) : 0;

  const alerts = [];
  if (unclassifiedCount > 0) {
    alerts.push({ type: 'warning', text: `${unclassifiedCount} ${unclassifiedCount === 1 ? 'item ainda não classificado' : 'itens ainda não classificados'} (sem tipo ou classe definidos).` });
  }
  if (sectorsOverBudget > 0) {
    alerts.push({ type: 'warning', text: `${sectorsOverBudget} ${sectorsOverBudget === 1 ? 'unidade ultrapassou' : 'unidades ultrapassaram'} o limite orçamentário previsto.` });
  }
  alerts.push({ type: 'success', text: `${advancedPercent}% das demandas já possuem contratação correspondente em andamento.` });
  alerts.push({
    type: pncpPublicados > 0 ? 'success' : 'warning',
    text: `${pncpPublicados} de ${advancedOrders} ${advancedOrders === 1 ? 'item do PCA publicado' : 'itens do PCA publicados'} no PNCP (${pncpPercent}%).`
  });

  container.innerHTML = alerts.map(alert => `
    <div class="planning-alert planning-alert--${alert.type}">
      <span class="planning-alert-icon" aria-hidden="true">${alert.type === 'warning' ? '⚠️' : '✅'}</span>
      <span>${alert.text}</span>
    </div>
  `).join('');
}

function getExercicioFilter() {
  return document.getElementById('exercicioFilter')?.value || 'all';
}

// Popula o filtro com os exercícios distintos presentes nos pedidos (desc),
// preservando a seleção atual quando possível.
function populateExercicioFilter(orders) {
  const select = document.getElementById('exercicioFilter');
  if (!select) return;
  const anos = Array.from(new Set(orders.map(order => order.exercicioPca).filter(ano => ano != null)))
    .sort((a, b) => b - a);
  const anterior = select.value;
  select.innerHTML = ['<option value="all">Todos os exercícios</option>']
    .concat(anos.map(ano => `<option value="${ano}">${ano}</option>`))
    .join('');
  if (anterior && (anterior === 'all' || anos.some(ano => String(ano) === anterior))) {
    select.value = anterior;
  }
}

function renderPlanning() {
  const orders = getSavedOrders();
  populateExercicioFilter(orders);
  const exercicioFilter = getExercicioFilter();
  const ordersWithItems = orders
    .filter(order => Array.isArray(order.itens) && order.itens.length)
    .filter(order => exercicioFilter === 'all' || String(order.exercicioPca) === exercicioFilter);

  const pcaTypeAggregation = {};
  const pcaAggregation = {};
  ordersWithItems.forEach(order => {
    const flags = getStatusFlags(order.status);

    order.itens.forEach(item => {
      const setor = order.usuario?.setor || 'Não informado';
      const tipo = item.tipo || 'Não informado';
      const classe = item.classeNome || 'Não informado';
      const typeKey = `${tipo}|||${classe}`;
      const key = `${setor}|||${tipo}|||${classe}`;
      const value = Number(item.subtotal ?? item.total ?? 0);

      if (!pcaTypeAggregation[typeKey]) {
        pcaTypeAggregation[typeKey] = { total: 0, comprometido: 0, empenhado: 0, liquidado: 0, pago: 0 };
      }

      if (flags.includeInTotal) pcaTypeAggregation[typeKey].total += value;
      if (flags.includeInComprometido) pcaTypeAggregation[typeKey].comprometido += value;
      if (flags.includeInEmpenhado) pcaTypeAggregation[typeKey].empenhado += value;
      if (flags.includeInLiquidado) pcaTypeAggregation[typeKey].liquidado += value;
      if (flags.includeInPago) pcaTypeAggregation[typeKey].pago += value;

      if (!pcaAggregation[key]) {
        pcaAggregation[key] = { total: 0, comprometido: 0, empenhado: 0, liquidado: 0, pago: 0 };
      }

      if (flags.includeInTotal) pcaAggregation[key].total += value;
      if (flags.includeInComprometido) pcaAggregation[key].comprometido += value;
      if (flags.includeInEmpenhado) pcaAggregation[key].empenhado += value;
      if (flags.includeInLiquidado) pcaAggregation[key].liquidado += value;
      if (flags.includeInPago) pcaAggregation[key].pago += value;
    });
  });

  const ploaAggregation = {};
  ordersWithItems.forEach(order => {
    const flags = getStatusFlags(order.status);

    order.itens.forEach(item => {
      const tipoDespesa = item.tipoDespesa || 'Não informado';
      const natureza = item.naturezaDespesa || 'Não informado';
      const key = `${tipoDespesa}|||${natureza}`;
      const value = Number(item.subtotal ?? item.total ?? 0);

      if (!ploaAggregation[key]) {
        ploaAggregation[key] = { total: 0, comprometido: 0, empenhado: 0, liquidado: 0, pago: 0 };
      }

      if (flags.includeInTotal) ploaAggregation[key].total += value;
      if (flags.includeInComprometido) ploaAggregation[key].comprometido += value;
      if (flags.includeInEmpenhado) ploaAggregation[key].empenhado += value;
      if (flags.includeInLiquidado) ploaAggregation[key].liquidado += value;
      if (flags.includeInPago) ploaAggregation[key].pago += value;
    });
  });

  const pcaTypeRows = [];
  const pcaTypeDetailRows = Object.entries(pcaTypeAggregation).map(([key, values]) => {
    const [tipo, classe] = key.split('|||');
    return { tipo, classe, ...values };
  }).sort((a, b) => a.tipo.localeCompare(b.tipo) || a.classe.localeCompare(b.classe));

  const pcaTypeTotals = pcaTypeDetailRows.reduce((acc, row) => {
    if (!acc[row.tipo]) {
      acc[row.tipo] = { total: 0, comprometido: 0, empenhado: 0, liquidado: 0, pago: 0 };
    }

    acc[row.tipo].total += row.total;
    acc[row.tipo].comprometido += row.comprometido;
    acc[row.tipo].empenhado += row.empenhado;
    acc[row.tipo].liquidado += row.liquidado;
    acc[row.tipo].pago += row.pago;
    return acc;
  }, {});

  let pcaTypeIndex = 0;
  while (pcaTypeIndex < pcaTypeDetailRows.length) {
    const currentType = pcaTypeDetailRows[pcaTypeIndex].tipo;
    const typeStartIndex = pcaTypeIndex;
    while (pcaTypeIndex < pcaTypeDetailRows.length && pcaTypeDetailRows[pcaTypeIndex].tipo === currentType) {
      pcaTypeIndex += 1;
    }

    const typeRows = pcaTypeDetailRows.slice(typeStartIndex, pcaTypeIndex);
    typeRows.forEach((row, rowIndex) => {
      pcaTypeRows.push({
        cells: [
          rowIndex === 0 ? { value: row.tipo, rowspan: typeRows.length } : null,
          row.classe,
          row.total,
          row.comprometido,
          row.empenhado,
          row.liquidado,
          row.pago,
          row.total - row.comprometido
        ],
        className: ''
      });
    });

    const subtotal = pcaTypeTotals[currentType];
    pcaTypeRows.push({ cells: [{ value: `TOTAL EM ${currentType}`, colspan: 2 }, null, subtotal.total, subtotal.comprometido, subtotal.empenhado, subtotal.liquidado, subtotal.pago, subtotal.total - subtotal.comprometido], className: 'table-subtotal-row' });
  }

  const pcaTypeTotalsSummary = pcaTypeDetailRows.reduce((acc, row) => {
    acc.total += Number(row.total || 0);
    acc.comprometido += Number(row.comprometido || 0);
    acc.empenhado += Number(row.empenhado || 0);
    acc.liquidado += Number(row.liquidado || 0);
    acc.pago += Number(row.pago || 0);
    return acc;
  }, { total: 0, comprometido: 0, empenhado: 0, liquidado: 0, pago: 0 });

  renderTable('pcaTypeContainer', ['Tipo', 'Classe', 'Planejado', 'Comprometido', 'Empenhado', 'Liquidado', 'Pago', 'Saldo'], pcaTypeRows, 'TOTAL', [2, 3, 4, 5, 6, 7], [pcaTypeTotalsSummary.total, pcaTypeTotalsSummary.comprometido, pcaTypeTotalsSummary.empenhado, pcaTypeTotalsSummary.liquidado, pcaTypeTotalsSummary.pago, pcaTypeTotalsSummary.total - pcaTypeTotalsSummary.comprometido]);

  const pcaDetailRows = Object.entries(pcaAggregation).map(([key, values]) => {
    const [setor, tipo, classe] = key.split('|||');
    return { setor, tipo, classe, ...values };
  }).sort((a, b) => a.setor.localeCompare(b.setor) || a.tipo.localeCompare(b.tipo) || a.classe.localeCompare(b.classe));

  const pcaTypeTotalsBySetor = pcaDetailRows.reduce((acc, row) => {
    if (!acc[row.setor]) {
      acc[row.setor] = {};
    }

    if (!acc[row.setor][row.tipo]) {
      acc[row.setor][row.tipo] = { total: 0, comprometido: 0, empenhado: 0, liquidado: 0, pago: 0 };
    }

    acc[row.setor][row.tipo].total += row.total;
    acc[row.setor][row.tipo].comprometido += row.comprometido;
    acc[row.setor][row.tipo].empenhado += row.empenhado;
    acc[row.setor][row.tipo].liquidado += row.liquidado;
    acc[row.setor][row.tipo].pago += row.pago;
    return acc;
  }, {});

  const pcaSetorTotals = pcaDetailRows.reduce((acc, row) => {
    if (!acc[row.setor]) {
      acc[row.setor] = { total: 0, comprometido: 0, empenhado: 0, liquidado: 0, pago: 0 };
    }

    acc[row.setor].total += row.total;
    acc[row.setor].comprometido += row.comprometido;
    acc[row.setor].empenhado += row.empenhado;
    acc[row.setor].liquidado += row.liquidado;
    acc[row.setor].pago += row.pago;
    return acc;
  }, {});

  const pcaRowsBySetor = pcaDetailRows.reduce((acc, row) => {
    if (!acc[row.setor]) {
      acc[row.setor] = [];
    }
    acc[row.setor].push(row);
    return acc;
  }, {});

  const pcaSetorGroups = Object.keys(pcaRowsBySetor)
    .sort((a, b) => a.localeCompare(b, 'pt-BR'))
    .map(setor => {
      const rows = [];
      const setorRows = pcaRowsBySetor[setor];
      let setorIndex = 0;

      while (setorIndex < setorRows.length) {
        const currentTipo = setorRows[setorIndex].tipo;
        const tipoStartIndex = setorIndex;
        while (setorIndex < setorRows.length && setorRows[setorIndex].tipo === currentTipo) {
          setorIndex += 1;
        }

        const tipoRows = setorRows.slice(tipoStartIndex, setorIndex);
        tipoRows.forEach((row, rowIndex) => {
          rows.push({
            cells: [
              rowIndex === 0 ? { value: row.tipo, rowspan: tipoRows.length } : null,
              row.classe,
              row.total,
              row.comprometido,
              row.empenhado,
              row.liquidado,
              row.pago,
              row.total - row.comprometido
            ],
            className: ''
          });
        });

        const subtotal = pcaTypeTotalsBySetor[setor][currentTipo];
        rows.push({ cells: [{ value: `TOTAL EM ${currentTipo}`, colspan: 2 }, null, subtotal.total, subtotal.comprometido, subtotal.empenhado, subtotal.liquidado, subtotal.pago, subtotal.total - subtotal.comprometido], className: 'table-subtotal-row' });
      }

      return {
        setor,
        rows,
        totals: pcaSetorTotals[setor] || { total: 0, comprometido: 0, empenhado: 0, liquidado: 0, pago: 0 }
      };
    });

  renderPcaBySetorTables('pcaContainer', pcaSetorGroups);

  const ploaRows = [];
  const ploaDetailRows = Object.entries(ploaAggregation).map(([key, values]) => {
    const [tipoDespesa, natureza] = key.split('|||');
    return { tipoDespesa, natureza, ...values };
  }).sort((a, b) => a.tipoDespesa.localeCompare(b.tipoDespesa) || a.natureza.localeCompare(b.natureza));

  const ploaTypeTotals = ploaDetailRows.reduce((acc, row) => {
    if (!acc[row.tipoDespesa]) {
      acc[row.tipoDespesa] = { total: 0, comprometido: 0, empenhado: 0, liquidado: 0, pago: 0 };
    }

    acc[row.tipoDespesa].total += row.total;
    acc[row.tipoDespesa].comprometido += row.comprometido;
    acc[row.tipoDespesa].empenhado += row.empenhado;
    acc[row.tipoDespesa].liquidado += row.liquidado;
    acc[row.tipoDespesa].pago += row.pago;
    return acc;
  }, {});

  let ploaIndex = 0;
  while (ploaIndex < ploaDetailRows.length) {
    const currentTipoDespesa = ploaDetailRows[ploaIndex].tipoDespesa;
    const tipoStartIndex = ploaIndex;
    while (ploaIndex < ploaDetailRows.length && ploaDetailRows[ploaIndex].tipoDespesa === currentTipoDespesa) {
      ploaIndex += 1;
    }

    const tipoRows = ploaDetailRows.slice(tipoStartIndex, ploaIndex);
    tipoRows.forEach((row, rowIndex) => {
      ploaRows.push({
        cells: [
          rowIndex === 0 ? { value: row.tipoDespesa, rowspan: tipoRows.length } : null,
          row.natureza,
          row.total,
          row.comprometido,
          row.empenhado,
          row.liquidado,
          row.pago,
          row.total - row.comprometido
        ],
        className: ''
      });
    });

    const subtotal = ploaTypeTotals[currentTipoDespesa];
    ploaRows.push({ cells: [{ value: `Total em ${currentTipoDespesa}`, colspan: 2 }, null, subtotal.total, subtotal.comprometido, subtotal.empenhado, subtotal.liquidado, subtotal.pago, subtotal.total - subtotal.comprometido], className: 'table-subtotal-row' });
  }

  const ploaTotals = ploaDetailRows.reduce((acc, row) => {
    acc.total += Number(row.total || 0);
    acc.comprometido += Number(row.comprometido || 0);
    acc.empenhado += Number(row.empenhado || 0);
    acc.liquidado += Number(row.liquidado || 0);
    acc.pago += Number(row.pago || 0);
    return acc;
  }, { total: 0, comprometido: 0, empenhado: 0, liquidado: 0, pago: 0 });

  renderTable('ploaContainer', ['Tipo de Despesa', 'Natureza', 'Planejado', 'Comprometido', 'Empenhado', 'Liquidado', 'Pago', 'Saldo'], ploaRows, 'TOTAL', [2, 3, 4, 5, 6, 7], [ploaTotals.total, ploaTotals.comprometido, ploaTotals.empenhado, ploaTotals.liquidado, ploaTotals.pago, ploaTotals.total - ploaTotals.comprometido]);

  const totalAllValue = ordersWithItems.reduce((sum, order) => (
    sum + order.itens.reduce((itemSum, item) => itemSum + Number(item.subtotal ?? item.total ?? 0), 0)
  ), 0);

  renderPlanningSummary({
    pcaGeralTotal: pcaTypeTotalsSummary.total,
    pcaGeralCount: pcaTypeDetailRows.length,
    totalAllValue,
    setorCount: pcaSetorGroups.length,
    demandaCount: ordersWithItems.length,
    ploaTotal: ploaTotals.total
  });
  renderPlanningAlerts(ordersWithItems);
}

window.addEventListener('DOMContentLoaded', () => {
  if (!guardPage(['compras'])) return;

  renderPlanning();

  const exercicioFilter = document.getElementById('exercicioFilter');
  if (exercicioFilter) exercicioFilter.addEventListener('change', renderPlanning);

  const exportButton = document.getElementById('exportCsvButton');
  if (exportButton) exportButton.addEventListener('click', exportOrdersCsv);
});
