function renderDotacaoSummary(resumos) {
  const previstaTotal = resumos.reduce((s, r) => s + r.prevista, 0);
  const atualCapado = resumos.reduce((s, r) => s + Math.min(r.atual, r.prevista), 0);
  const deficitTotal = resumos.reduce((s, r) => s + r.deficit, 0);
  const itensDeficit = resumos.reduce((s, r) => s + r.itensComDeficit, 0);
  const cobertura = previstaTotal > 0 ? Math.round((atualCapado / previstaTotal) * 100) : 100;

  document.getElementById('kpiCobertura').textContent = `${cobertura}%`;
  document.getElementById('kpiDeficit').textContent = deficitTotal;
  document.getElementById('kpiItensDeficit').textContent = itensDeficit;
}

function dotacaoRowClass(linha) {
  if (linha.lacuna > 0) return 'dotacao-row--deficit';
  if (linha.excedente) return 'dotacao-row--excedente';
  return '';
}

function renderDotacaoContainer(resumos) {
  const container = document.getElementById('dotacaoContainer');
  container.innerHTML = '';

  if (!resumos.length) {
    container.innerHTML = emptyStateHtml({
      title: 'Sem dotação definida',
      description: 'Nenhum setor possui matriz de dotação cadastrada.'
    });
    return;
  }

  resumos.forEach(resumo => {
    const card = document.createElement('div');
    card.className = 'order-card';
    card.innerHTML = `
      <div class="order-card-header">
        <div class="order-card-title-group">
          <div>
            <h3 class="order-card-title">${escapeHtml(resumo.setor)}</h3>
            <div class="order-meta">
              <div><strong>Cobertura:</strong> ${resumo.coberturaPct}%</div>
              <div><strong>Déficit:</strong> ${resumo.deficit} ${resumo.deficit === 1 ? 'unidade' : 'unidades'}</div>
              <div><strong>Itens com déficit:</strong> ${resumo.itensComDeficit}</div>
            </div>
          </div>
        </div>
      </div>
      <table class="report-table">
        <thead>
          <tr>
            <th>Item</th><th>Prevista</th><th>Atual</th><th>Lacuna</th>
            <th>Em atendimento</th><th>A solicitar</th><th>Cobertura</th>
          </tr>
        </thead>
        <tbody>
          ${resumo.linhas.map(l => `
            <tr class="${dotacaoRowClass(l)}">
              <td>${escapeHtml(l.nome)}</td>
              <td>${l.prevista}</td>
              <td>${l.atual}${l.excedente ? ' <span class="dotacao-tag dotacao-tag--excedente">excedente</span>' : ''}</td>
              <td>${l.lacuna || '—'}</td>
              <td>${l.emAtendimento || '—'}</td>
              <td>${l.aSolicitar ? `<strong>${l.aSolicitar}</strong>` : '—'}</td>
              <td>${l.coberturaPct}%</td>
            </tr>
          `).join('')}
        </tbody>
      </table>
    `;
    container.appendChild(card);
  });
}

function populateSetorFilter() {
  const select = document.getElementById('setorFilter');
  if (!select) return;
  const setores = getSetoresComDotacao();
  const anterior = select.value;
  select.innerHTML = '<option value="all">Todos os setores</option>' +
    setores.map(s => `<option value="${escapeAttr(s)}">${escapeHtml(s)}</option>`).join('');
  if (anterior) select.value = (anterior === 'all' || setores.includes(anterior)) ? anterior : 'all';
}

function renderDotacaoPage() {
  const filtro = document.getElementById('setorFilter') ? document.getElementById('setorFilter').value : 'all';
  const todos = getResumoDotacaoGeral();
  const resumos = filtro === 'all' ? todos : todos.filter(r => r.setor === filtro);
  renderDotacaoSummary(resumos);
  renderDotacaoContainer(resumos);
}

document.addEventListener('DOMContentLoaded', () => {
  if (!guardPage(['gestor', 'compras'])) return;
  populateSetorFilter();
  renderDotacaoPage();
});
