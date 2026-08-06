function getSavedOrders() {
  const raw = localStorage.getItem('cbmdf_orders');
  return raw ? JSON.parse(raw) : [];
}

function formatPrice(value) {
  return Number(value || 0).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}

function formatDateTime(dateString) {
  return dateString || '';
}

function getStatusFlags(status) {
  const normalizedStatus = status || 'Arquivado';
  const includeInTotal = normalizedStatus !== 'Arquivado';
  const includeInComprometido = ['TR','Nota de Empenho emitida', 'Pedido a Caminho', 'Recebido no CESMA', 'Pedido Entregue'].includes(normalizedStatus);
  const includeInEmpenhado = ['Nota de Empenho emitida', 'Pedido a Caminho', 'Recebido no CESMA', 'Pedido Entregue'].includes(normalizedStatus);
  const includeInLiquidado = ['Recebido no CESMA', 'Pedido Entregue'].includes(normalizedStatus);
  const includeInPago = ['Pedido Entregue'].includes(normalizedStatus);

  return {
    includeInTotal,
    includeInComprometido,
    includeInEmpenhado,
    includeInLiquidado,
    includeInPago
  };
}

function groupBy(orders, keyFn) {
  return orders.reduce((acc, order) => {
    const items = Array.isArray(order.itens) ? order.itens : [];
    items.forEach(item => {
      const key = keyFn(item);
      if (!acc[key]) acc[key] = 0;
      acc[key] += Number(item.subtotal ?? item.total ?? 0);
    });
    return acc;
  }, {});
}

function renderTable(containerId, headers, rows, totalLabel, numericColumns = [], totalValues = null) {
  const container = document.getElementById(containerId);
  if (!container) return;

  if (!rows.length) {
    container.innerHTML = '<div class="empty-state">Nenhum valor registrado para este plano.</div>';
    return;
  }

  const normalizedRows = rows.map(row => Array.isArray(row) ? { cells: row, className: '' } : row);
  const resolvedNumericColumns = numericColumns.length ? numericColumns : [headers.length - 1];
  const resolvedTotalValues = totalValues ?? resolvedNumericColumns.map(columnIndex => normalizedRows.reduce((sum, row) => sum + Number(row.cells[columnIndex] || 0), 0));
  const totalRow = totalLabel ? `
        <tr class="table-total-row">
          <td colspan="${Math.max(1, headers.length - resolvedTotalValues.length)}">${totalLabel}</td>
          ${resolvedTotalValues.map(value => `<td>${formatPrice(value)}</td>`).join('')}
        </tr>` : '';

  const table = document.createElement('table');
  table.className = 'report-table';
  table.innerHTML = `
    <thead>
      <tr>
        ${headers.map(header => `<th>${header}</th>`).join('')}
      </tr>
    </thead>
    <tbody>
      ${normalizedRows.map(({ cells, className }) => `
        <tr class="${className || ''}">
          ${cells.map((cell, index) => `
            <td>${resolvedNumericColumns.includes(index) ? formatPrice(cell) : cell}</td>
          `).join('')}
        </tr>
      `).join('')}
      ${totalRow}
    </tbody>
  `;

  container.innerHTML = '';
  container.appendChild(table);
}

function renderPlanning() {
  const orders = getSavedOrders();
  const ordersWithItems = orders.filter(order => Array.isArray(order.itens) && order.itens.length);

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

  let currentPcaType = null;
  pcaTypeDetailRows.forEach(row => {
    if (row.tipo !== currentPcaType) {
      if (currentPcaType) {
        const subtotal = pcaTypeTotals[currentPcaType];
        pcaTypeRows.push({ cells: [`TOTAL EM ${currentPcaType}`, '', subtotal.total, subtotal.comprometido, subtotal.empenhado, subtotal.liquidado, subtotal.pago, subtotal.total - subtotal.comprometido], className: 'table-subtotal-row' });
      }
      currentPcaType = row.tipo;
    }

    pcaTypeRows.push({ cells: [row.tipo, row.classe, row.total, row.comprometido, row.empenhado, row.liquidado, row.pago, row.total - row.comprometido], className: '' });
  });

  if (currentPcaType) {
    const subtotal = pcaTypeTotals[currentPcaType];
    pcaTypeRows.push({ cells: [`TOTAL EM ${currentPcaType}`, '', subtotal.total, subtotal.comprometido, subtotal.empenhado, subtotal.liquidado, subtotal.pago, subtotal.total - subtotal.comprometido], className: 'table-subtotal-row' });
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

  const pcaRows = [];
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

  let currentSetor = null;
  let currentTipo = null;
  pcaDetailRows.forEach(row => {
    if (row.setor !== currentSetor) {
      if (currentSetor && currentTipo) {
        const subtotal = pcaTypeTotalsBySetor[currentSetor][currentTipo];
        pcaRows.push({ cells: [currentSetor, `TOTAL EM ${currentTipo}`, '', subtotal.total, subtotal.comprometido, subtotal.empenhado, subtotal.liquidado, subtotal.pago, subtotal.total - subtotal.comprometido], className: 'table-subtotal-row' });
      }

      if (currentSetor) {
        const subtotal = pcaSetorTotals[currentSetor];
        pcaRows.push({ cells: [`TOTAL ${currentSetor}`, '', '', subtotal.total, subtotal.comprometido, subtotal.empenhado, subtotal.liquidado, subtotal.pago, subtotal.total - subtotal.comprometido], className: 'table-subtotal-row' });
      }

      currentSetor = row.setor;
      currentTipo = null;
    }

    if (row.tipo !== currentTipo) {
      if (currentTipo) {
        const subtotal = pcaTypeTotalsBySetor[currentSetor][currentTipo];
        pcaRows.push({ cells: [row.setor, `TOTAL EM ${currentTipo}`, '', subtotal.total, subtotal.comprometido, subtotal.empenhado, subtotal.liquidado, subtotal.pago, subtotal.total - subtotal.comprometido], className: 'table-subtotal-row' });
      }
      currentTipo = row.tipo;
    }

    pcaRows.push({ cells: [row.setor, row.tipo, row.classe, row.total, row.comprometido, row.empenhado, row.liquidado, row.pago, row.total - row.comprometido], className: '' });
  });

  if (currentSetor && currentTipo) {
    const subtotal = pcaTypeTotalsBySetor[currentSetor][currentTipo];
    pcaRows.push({ cells: [currentSetor, `TOTAL EM ${currentTipo}`, '', subtotal.total, subtotal.comprometido, subtotal.empenhado, subtotal.liquidado, subtotal.pago, subtotal.total - subtotal.comprometido], className: 'table-subtotal-row' });
  }

  if (currentSetor) {
    const subtotal = pcaSetorTotals[currentSetor];
    pcaRows.push({ cells: [`TOTAL ${currentSetor}`, '', '', subtotal.total, subtotal.comprometido, subtotal.empenhado, subtotal.liquidado, subtotal.pago, subtotal.total - subtotal.comprometido], className: 'table-subtotal-row' });
  }

  const pcaTotals = pcaDetailRows.reduce((acc, row) => {
    acc.total += Number(row.total || 0);
    acc.comprometido += Number(row.comprometido || 0);
    acc.empenhado += Number(row.empenhado || 0);
    acc.liquidado += Number(row.liquidado || 0);
    acc.pago += Number(row.pago || 0);
    return acc;
  }, { total: 0, comprometido: 0, empenhado: 0, liquidado: 0, pago: 0 });

  renderTable('pcaContainer', ['Setor', 'Tipo', 'Classe', 'Planejado', 'Comprometido', 'Empenhado', 'Liquidado', 'Pago', 'Saldo'], pcaRows, 'TOTAL', [3, 4, 5, 6, 7, 8], [pcaTotals.total, pcaTotals.comprometido, pcaTotals.empenhado, pcaTotals.liquidado, pcaTotals.pago, pcaTotals.total - pcaTotals.comprometido]);

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

  let currentTipoDespesa = null;
  ploaDetailRows.forEach(row => {
    if (row.tipoDespesa !== currentTipoDespesa) {
      if (currentTipoDespesa) {
        const subtotal = ploaTypeTotals[currentTipoDespesa];
        ploaRows.push({ cells: [`Total em ${currentTipoDespesa}`, '', subtotal.total, subtotal.comprometido, subtotal.empenhado, subtotal.liquidado, subtotal.pago, subtotal.total - subtotal.comprometido], className: 'table-subtotal-row' });
      }
      currentTipoDespesa = row.tipoDespesa;
    }

    ploaRows.push({ cells: [row.tipoDespesa, row.natureza, row.total, row.comprometido, row.empenhado, row.liquidado, row.pago, row.total - row.comprometido], className: '' });
  });

  if (currentTipoDespesa) {
    const subtotal = ploaTypeTotals[currentTipoDespesa];
    ploaRows.push({ cells: [`Total em ${currentTipoDespesa}`, '', subtotal.total, subtotal.comprometido, subtotal.empenhado, subtotal.liquidado, subtotal.pago, subtotal.total - subtotal.comprometido], className: 'table-subtotal-row' });
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
}

window.addEventListener('DOMContentLoaded', renderPlanning);
