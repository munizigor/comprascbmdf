// Priorização, ciclos do PCA e contenção de urgência.
//
// Este módulo endereça o efeito da causa-raiz que nenhum épico cobria: a
// fragilidade da priorização institucional entre pedidos concorrentes.
// Tornar demandas visíveis (Épico 04) não faz ninguém escolher entre elas.
//
// A decisão é um score com pesos declarados, não uma ordenação manual, para
// que seja explicável ao setor preterido e auditável depois. O arbítrio
// continua possível, mas custa justificativa e aparece com nome na fila.

const CICLOS_KEY = 'cbmdf_pca_ciclos';

const PESO_CRITICIDADE = 40;
const PESO_RISCO = 30;
const PESO_LEGAL = 20;
const PESO_PRONTIDAO = 10;

const JUSTIFICATIVA_MINIMA_FILA = 20;
const JUSTIFICATIVA_MINIMA_CICLO = 20;

// Quadrimestral: 3 ciclos por exercício.
const QUADRIMESTRES = {
  1: { rotulo: '1º quadrimestre', meses: 'janeiro a abril' },
  2: { rotulo: '2º quadrimestre', meses: 'maio a agosto' },
  3: { rotulo: '3º quadrimestre', meses: 'setembro a dezembro' }
};

const ESCALA_CRITICIDADE = {
  1: 'Sem impacto operacional imediato',
  2: 'Impacto pequeno, contornável',
  3: 'Impacto moderado na rotina da unidade',
  4: 'Compromete atividade operacional relevante',
  5: 'Risco à vida ou à continuidade do socorro'
};

const ESCALA_RISCO = {
  1: 'Nenhum risco em postergar',
  2: 'Risco baixo',
  3: 'Risco moderado de agravamento',
  4: 'Risco alto de indisponibilidade',
  5: 'Risco iminente de paralisação'
};

const ESCALA_PRONTIDAO = {
  1: 'Sem instrução — só a demanda registrada',
  2: 'Instrução inicial',
  3: 'Especificação em elaboração',
  4: 'Especificação pronta, faltam anexos',
  5: 'Instruído e pronto para ETP'
};

/* ---------- priorização do pedido ---------- */

function clampNota(value, fallback) {
  const parsed = Math.round(toNumber(value, fallback));
  if (!Number.isFinite(parsed)) return fallback;
  return Math.min(5, Math.max(1, parsed));
}

// Pedidos anteriores ao Épico 08 não têm criticidade nem risco declarados.
// Em vez de assumir um valor neutro silenciosamente, a nota é derivada da
// urgência que o requisitante já declarou item a item, e a origem fica
// marcada como 'derivado' — a fila mostra essa diferença.
function derivarNotaDeUrgencia(order) {
  const itens = Array.isArray(order?.itens) ? order.itens : [];
  const escala = { alta: 5, media: 3, normal: 2 };
  const maior = itens.reduce((max, item) => {
    const nota = escala[getItemUrgency(item)] || 2;
    return nota > max ? nota : max;
  }, 0);
  return maior || 2;
}

function getPriorizacao(order) {
  const bruto = order?.priorizacao && typeof order.priorizacao === 'object' ? order.priorizacao : {};
  const derivada = derivarNotaDeUrgencia(order);

  return {
    criticidade: clampNota(bruto.criticidade, derivada),
    risco: clampNota(bruto.risco, derivada),
    obrigatoriedadeLegal: Boolean(bruto.obrigatoriedadeLegal),
    prontidao: clampNota(bruto.prontidao, 1),
    origem: bruto.criticidade ? 'declarado' : 'derivado',
    instruido: Boolean(bruto.instruidoEm),
    instruidoPor: bruto.instruidoPor || null,
    instruidoEm: bruto.instruidoEm || null,
    override: bruto.override || null
  };
}

// A decomposição é devolvida junto com o total porque a fila precisa
// responder "por quê?" na tela — um score opaco não é explicável.
function getScore(order) {
  const p = getPriorizacao(order);
  const criticidade = PESO_CRITICIDADE * (p.criticidade / 5);
  const risco = PESO_RISCO * (p.risco / 5);
  const legal = p.obrigatoriedadeLegal ? PESO_LEGAL : 0;
  const prontidao = PESO_PRONTIDAO * (p.prontidao / 5);

  return {
    criticidade,
    risco,
    legal,
    prontidao,
    total: criticidade + risco + legal + prontidao
  };
}

function formatScore(value) {
  return toAmount(value).toLocaleString('pt-BR', { minimumFractionDigits: 1, maximumFractionDigits: 1 });
}

/* ---------- fila priorizada ---------- */

// Só entram na fila de priorização as demandas ainda em decisão (antes de
// consolidar em item de PCA). "Consolidado em Item de PCA" e "PCA Aguardando
// Aprovação" seguem pendentes para efeito de orçamento, mas já saíram da fila.
const STATUS_ELEGIVEIS_FILA = new Set([
  'DFD Registrado', 'DFD Aprovado pela Unidade', 'Em Análise Setorial', 'Aguardando Suplementação'
]);

function isElegivelParaFila(order) {
  return STATUS_ELEGIVEIS_FILA.has(String(order?.status || '').trim());
}

// Desempate declarado: score ↓, depois o mais antigo, depois o protocolo.
// Sem isso a ordem dependeria da ordem de inserção no array, que muda.
function compararPrioridade(a, b) {
  const diff = getScore(b).total - getScore(a).total;
  if (Math.abs(diff) > 1e-9) return diff;

  const dataA = new Date(a.criadoEm || 0).getTime();
  const dataB = new Date(b.criadoEm || 0).getTime();
  if (dataA !== dataB) return dataA - dataB;

  return String(a.id).localeCompare(String(b.id));
}

// Os pedidos fixados manualmente ocupam a posição pedida; o restante escorre
// pelas vagas livres na ordem do score.
function buildFila(orders) {
  const elegiveis = (orders || getSavedOrders()).filter(isElegivelParaFila);
  const ordenados = elegiveis.slice().sort(compararPrioridade);

  const fixados = ordenados
    .filter(order => getPriorizacao(order).override)
    .sort((a, b) => getPriorizacao(a).override.posicao - getPriorizacao(b).override.posicao);
  const livres = ordenados.filter(order => !getPriorizacao(order).override);

  const slots = new Array(ordenados.length).fill(null);

  fixados.forEach(order => {
    const desejada = Math.min(Math.max(1, getPriorizacao(order).override.posicao), slots.length);
    let alvo = desejada - 1;
    while (alvo < slots.length && slots[alvo]) alvo += 1;
    if (alvo >= slots.length) alvo = slots.findIndex(slot => !slot);
    if (alvo >= 0) slots[alvo] = order;
  });

  livres.forEach(order => {
    const vaga = slots.findIndex(slot => !slot);
    if (vaga >= 0) slots[vaga] = order;
  });

  return slots.filter(Boolean).map((order, index) => ({
    order,
    posicao: index + 1,
    score: getScore(order),
    priorizacao: getPriorizacao(order)
  }));
}

function getPosicaoNaFila(orderId, orders) {
  const entrada = buildFila(orders).find(item => item.order.id === orderId);
  return entrada || null;
}

function ordenarPorPrioridade(entries, getOrder) {
  return entries.slice().sort((a, b) => compararPrioridade(getOrder(a), getOrder(b)));
}

/* ---------- instrução e ajuste manual ---------- */

function getAutorGovernanca() {
  const user = window.CBMDFNav ? window.CBMDFNav.getCurrentUser() : null;
  return user ? { id: user.id, nome: user.nome, matricula: user.matricula } : null;
}

// Criticidade e risco são do requisitante; obrigatoriedade legal e prontidão
// são do Planejamento. Ninguém pontua a si mesmo em 100%.
function registrarInstrucao(orderId, { obrigatoriedadeLegal, prontidao }) {
  const orders = getSavedOrders();
  const order = findOrderById(orders, orderId);
  if (!order) return { ok: false, motivo: 'Pedido não encontrado.' };

  const atual = order.priorizacao && typeof order.priorizacao === 'object' ? order.priorizacao : {};
  order.priorizacao = {
    ...atual,
    obrigatoriedadeLegal: Boolean(obrigatoriedadeLegal),
    prontidao: clampNota(prontidao, 1),
    instruidoPor: getAutorGovernanca(),
    instruidoEm: new Date().toISOString()
  };

  saveOrders(orders);
  return { ok: true, order };
}

function moverNaFila(orderId, novaPosicao, justificativa) {
  const orders = getSavedOrders();
  const order = findOrderById(orders, orderId);
  if (!order) return { ok: false, motivo: 'Pedido não encontrado.' };

  const posicao = Math.round(toNumber(novaPosicao, 0));
  if (posicao < 1) return { ok: false, motivo: 'Informe uma posição válida na fila.' };

  const motivo = String(justificativa || '').trim();
  if (motivo.length < JUSTIFICATIVA_MINIMA_FILA) {
    return { ok: false, motivo: `O ajuste manual exige um motivo com no mínimo ${JUSTIFICATIVA_MINIMA_FILA} caracteres.` };
  }

  const atual = order.priorizacao && typeof order.priorizacao === 'object' ? order.priorizacao : {};
  order.priorizacao = {
    ...atual,
    override: {
      posicao,
      justificativa: motivo,
      por: getAutorGovernanca(),
      em: new Date().toISOString()
    }
  };

  saveOrders(orders);
  return { ok: true, order };
}

function removerAjusteManual(orderId) {
  const orders = getSavedOrders();
  const order = findOrderById(orders, orderId);
  if (!order || !order.priorizacao) return { ok: false, motivo: 'Pedido não encontrado.' };

  delete order.priorizacao.override;
  saveOrders(orders);
  return { ok: true, order };
}

/* ---------- ciclos do PCA ---------- */

function getCiclos() {
  const lista = readJson(CICLOS_KEY, []);
  return Array.isArray(lista) ? lista : [];
}

function saveCiclos(ciclos) {
  try {
    localStorage.setItem(CICLOS_KEY, JSON.stringify(ciclos));
  } catch (error) {
    console.error('[governanca] Não foi possível salvar os ciclos.', error);
    alert('Não foi possível salvar: o armazenamento local do navegador está cheio.');
  }
}

function getCicloAberto() {
  return getCiclos().find(ciclo => ciclo.status === 'aberto') || null;
}

function getQuadrimestre(date) {
  return Math.floor(date.getMonth() / 4) + 1;
}

function abrirCiclo() {
  const ciclos = getCiclos();
  if (ciclos.some(ciclo => ciclo.status === 'aberto')) {
    return { ok: false, motivo: 'Já existe um ciclo aberto. Feche-o antes de abrir o próximo.' };
  }

  const agora = new Date();
  const quadrimestre = getQuadrimestre(agora);
  const ano = agora.getFullYear();
  const id = `PCA-${ano}-Q${quadrimestre}`;

  if (ciclos.some(ciclo => ciclo.id === id)) {
    return { ok: false, motivo: `O ciclo ${id} já foi registrado neste exercício.` };
  }

  ciclos.push({
    id,
    ano,
    quadrimestre,
    rotulo: `${QUADRIMESTRES[quadrimestre].rotulo} de ${ano}`,
    periodo: QUADRIMESTRES[quadrimestre].meses,
    status: 'aberto',
    abertoEm: agora.toISOString(),
    abertoPor: getAutorGovernanca(),
    fechadoEm: null,
    fechadoPor: null,
    justificativa: null,
    fotografia: []
  });

  saveCiclos(ciclos);
  return { ok: true, ciclo: ciclos[ciclos.length - 1] };
}

// A fotografia é o "planejado" contra o qual medir o executado — o
// denominador que hoje não existe. Congelar não trava a tramitação: os
// pedidos seguem mudando de status, a fotografia é que não muda mais.
function fecharCiclo(justificativa) {
  const ciclos = getCiclos();
  const ciclo = ciclos.find(item => item.status === 'aberto');
  if (!ciclo) return { ok: false, motivo: 'Não há ciclo aberto para fechar.' };

  const motivo = String(justificativa || '').trim();
  if (motivo.length < JUSTIFICATIVA_MINIMA_CICLO) {
    return { ok: false, motivo: `O fechamento do ciclo exige uma ata com no mínimo ${JUSTIFICATIVA_MINIMA_CICLO} caracteres.` };
  }

  const orders = getSavedOrders();
  ciclo.fotografia = buildFila(orders).map(entrada => ({
    protocolo: entrada.order.id,
    setor: entrada.order?.usuario?.setor || 'Sem setor',
    solicitante: entrada.order?.usuario?.nome || null,
    valor: getOrderTotal(entrada.order),
    score: Number(entrada.score.total.toFixed(2)),
    posicao: entrada.posicao,
    status: entrada.order.status,
    urgencia: entrada.order.status === 'Incluído no PCA (Urgência)',
    ajusteManual: Boolean(entrada.priorizacao.override)
  }));

  ciclo.status = 'fechado';
  ciclo.fechadoEm = new Date().toISOString();
  ciclo.fechadoPor = getAutorGovernanca();
  ciclo.justificativa = motivo;

  saveCiclos(ciclos);

  // O arbítrio vale para o ciclo em que foi exercido; a fila seguinte
  // recomeça pelo score. Sem isso, um ajuste pontual viraria permanente.
  let limpou = false;
  orders.forEach(order => {
    if (order?.priorizacao?.override) {
      delete order.priorizacao.override;
      limpou = true;
    }
  });
  if (limpou) saveOrders(orders);

  return { ok: true, ciclo };
}

/* ---------- contenção de urgência ---------- */

function isUrgencia(order) {
  return order?.status === 'Incluído no PCA (Urgência)'
    || getHistorico(order).some(entry => entry.para === 'Incluído no PCA (Urgência)');
}

function incluirPorUrgencia(orderId, { justificativa, aprovador, origem }) {
  return applyStatusChange(orderId, 'Incluído no PCA (Urgência)', {
    origem: origem || 'governanca.html',
    justificativa,
    aprovador
  });
}

// Percentual do valor que entrou por urgência, por setor. É o indicador que
// mostra se a governança está contendo a exceção ou apenas contabilizando-a.
function computeUrgenciaPorSetor(orders) {
  const mapa = new Map();

  (orders || getSavedOrders()).forEach(order => {
    if (isPendingStatus(order.status) || isArchivedStatus(order.status)) return;

    const setor = order?.usuario?.setor || 'Sem setor';
    if (!mapa.has(setor)) mapa.set(setor, { setor, total: 0, urgencia: 0, pedidos: 0, pedidosUrgencia: 0 });

    const bucket = mapa.get(setor);
    const valor = getOrderTotal(order);
    bucket.total += valor;
    bucket.pedidos += 1;

    if (isUrgencia(order)) {
      bucket.urgencia += valor;
      bucket.pedidosUrgencia += 1;
    }
  });

  return Array.from(mapa.values())
    .map(item => ({
      ...item,
      percentual: item.total > 0 ? (item.urgencia / item.total) * 100 : 0
    }))
    .sort((a, b) => b.percentual - a.percentual);
}

function getResumoUrgencia(orders) {
  const setores = computeUrgenciaPorSetor(orders);
  const total = setores.reduce((sum, item) => sum + item.total, 0);
  const urgencia = setores.reduce((sum, item) => sum + item.urgencia, 0);

  return {
    setores,
    total,
    urgencia,
    percentual: total > 0 ? (urgencia / total) * 100 : 0,
    acimaDoLimite: setores.filter(item => item.percentual > 20)
  };
}

/* ---------- renderização da página de governança ---------- */

function renderCicloPanel() {
  const container = document.getElementById('cicloContainer');
  if (!container) return;

  const ciclos = getCiclos();
  const aberto = getCicloAberto();
  const fechados = ciclos.filter(ciclo => ciclo.status === 'fechado').reverse();

  const abertoHtml = aberto
    ? `
      <div class="ciclo-card ciclo-card--aberto">
        <div class="ciclo-card-top">
          <div>
            <h3>${escapeHtml(aberto.rotulo)}</h3>
            <span class="ciclo-meta">${escapeHtml(aberto.periodo)} · aberto em ${escapeHtml(formatDateTime(aberto.abertoEm))}${aberto.abertoPor ? ` por ${escapeHtml(aberto.abertoPor.nome)}` : ''}</span>
          </div>
          <span class="ciclo-pill ciclo-pill--aberto">Aberto</span>
        </div>
        <p class="muted-note">Ao fechar, a fila atual é congelada como fotografia do planejado. Os pedidos continuam tramitando normalmente — a fotografia é que não muda mais.</p>
        <div class="input-group">
          <label for="ataCiclo">Ata do fechamento (mínimo de ${JUSTIFICATIVA_MINIMA_CICLO} caracteres)</label>
          <textarea id="ataCiclo" rows="3" placeholder="Registre a decisão do comitê que encerra este quadrimestre."></textarea>
        </div>
        <p class="transition-error" data-ciclo-error></p>
        <div class="governanca-actions">
          <button class="btn btn-primary" type="button" data-fechar-ciclo>Fechar ciclo e congelar fila</button>
        </div>
      </div>`
    : `
      <div class="ciclo-card">
        <p>Nenhum ciclo aberto. Abra o quadrimestre para que a fila priorizada possa ser congelada ao final.</p>
        <div class="governanca-actions">
          <button class="btn btn-primary" type="button" data-abrir-ciclo>Abrir ciclo do quadrimestre</button>
        </div>
        <p class="transition-error" data-ciclo-error></p>
      </div>`;

  const fechadosHtml = fechados.length
    ? fechados.map(ciclo => {
      const valor = ciclo.fotografia.reduce((sum, item) => sum + toAmount(item.valor), 0);
      const urgentes = ciclo.fotografia.filter(item => item.urgencia).length;
      const linhas = ciclo.fotografia.map(item => `
        <tr>
          <td>${item.posicao}</td>
          <td>${escapeHtml(item.protocolo)}</td>
          <td>${escapeHtml(item.setor)}</td>
          <td>${formatPrice(item.valor)}</td>
          <td>${formatScore(item.score)}</td>
          <td>${escapeHtml(item.status)}</td>
        </tr>`).join('');

      return `
        <details class="ciclo-card ciclo-card--fechado">
          <summary>
            <strong>${escapeHtml(ciclo.rotulo)}</strong>
            <span class="ciclo-meta">${ciclo.fotografia.length} ${ciclo.fotografia.length === 1 ? 'pedido' : 'pedidos'} · ${formatPrice(valor)} · ${urgentes} por urgência</span>
          </summary>
          <p class="ciclo-ata">${escapeHtml(ciclo.justificativa)}</p>
          <span class="ciclo-meta">Fechado em ${escapeHtml(formatDateTime(ciclo.fechadoEm))}${ciclo.fechadoPor ? ` por ${escapeHtml(ciclo.fechadoPor.nome)} (${escapeHtml(ciclo.fechadoPor.matricula)})` : ''}</span>
          <div class="table-scroll">
            <table class="report-table">
              <thead>
                <tr><th>#</th><th>Protocolo</th><th>Setor</th><th>Valor</th><th>Score</th><th>Status no fechamento</th></tr>
              </thead>
              <tbody>${linhas}</tbody>
            </table>
          </div>
        </details>`;
    }).join('')
    : '<p class="muted-note">Nenhum ciclo fechado ainda. O primeiro fechamento cria a linha de base do planejado.</p>';

  container.innerHTML = `${abertoHtml}<h3 class="governanca-subtitle">Ciclos encerrados</h3>${fechadosHtml}`;
}

function renderScoreBreakdown(entrada) {
  const { score, priorizacao } = entrada;
  const linha = (rotulo, valor, peso, detalhe) => `
    <li>
      <span class="score-linha-rotulo">${escapeHtml(rotulo)}</span>
      <span class="score-linha-valor">${formatScore(valor)} <small>de ${peso}</small></span>
      <span class="score-linha-detalhe">${escapeHtml(detalhe)}</span>
    </li>`;

  return `
    <details class="score-panel">
      <summary>Por quê? (${formatScore(score.total)} de 100)</summary>
      <ul class="score-lista">
        ${linha('Criticidade', score.criticidade, PESO_CRITICIDADE, `${priorizacao.criticidade}/5 — ${ESCALA_CRITICIDADE[priorizacao.criticidade]}`)}
        ${linha('Risco de postergar', score.risco, PESO_RISCO, `${priorizacao.risco}/5 — ${ESCALA_RISCO[priorizacao.risco]}`)}
        ${linha('Obrigatoriedade legal', score.legal, PESO_LEGAL, priorizacao.obrigatoriedadeLegal ? 'Sim — exigência normativa declarada' : 'Não declarada')}
        ${linha('Prontidão da instrução', score.prontidao, PESO_PRONTIDAO, `${priorizacao.prontidao}/5 — ${ESCALA_PRONTIDAO[priorizacao.prontidao]}`)}
      </ul>
      <p class="score-origem">
        ${priorizacao.origem === 'declarado'
          ? 'Criticidade e risco declarados pelo requisitante.'
          : 'Criticidade e risco <strong>derivados da urgência dos itens</strong> — o requisitante não declarou estes campos.'}
        ${priorizacao.instruido
          ? `Instrução avaliada por ${escapeHtml(priorizacao.instruidoPor?.nome || 'não identificado')} em ${escapeHtml(formatDateTime(priorizacao.instruidoEm))}.`
          : 'Instrução ainda não avaliada pelo Planejamento.'}
      </p>
    </details>`;
}

function renderFila() {
  const container = document.getElementById('filaContainer');
  if (!container) return;

  const fila = buildFila();
  if (!fila.length) {
    container.innerHTML = emptyStateHtml({
      title: 'Nenhuma demanda na fila',
      description: 'Não há pedidos aguardando decisão de priorização. Novas solicitações aparecem aqui assim que são registradas.',
      compact: true
    });
    return;
  }

  const outrosUsuarios = users.filter(user => {
    const atual = window.CBMDFNav ? window.CBMDFNav.getCurrentUser() : null;
    return !atual || user.id !== atual.id;
  });

  container.innerHTML = fila.map(entrada => {
    const { order, posicao, priorizacao } = entrada;
    const override = priorizacao.override;
    const setor = order?.usuario?.setor || 'Sem setor';

    const overrideHtml = override
      ? `<div class="fila-override">
           <strong>Posição ajustada manualmente</strong> por ${escapeHtml(override.por?.nome || 'não identificado')} em ${escapeHtml(formatDateTime(override.em))}
           <p class="historico-justificativa">${escapeHtml(override.justificativa)}</p>
           <button class="btn btn-secondary btn-sm" type="button" data-remover-override="${escapeAttr(order.id)}">Voltar à ordem do score</button>
         </div>`
      : '';

    const aprovadores = outrosUsuarios
      .map(user => `<option value="${escapeAttr(user.id)}">${escapeHtml(user.nome)} (${escapeHtml(user.setor)})</option>`)
      .join('');

    return `
      <article class="fila-card" data-fila-card="${escapeAttr(order.id)}">
        <div class="fila-card-top">
          <span class="fila-posicao">${posicao}º</span>
          <div class="fila-identificacao">
            <h3>${escapeHtml(order.id)}</h3>
            <span class="fila-meta">${escapeHtml(setor)} · ${escapeHtml(order?.usuario?.nome || 'Solicitante não informado')} · ${formatPrice(getOrderTotal(order))}</span>
          </div>
          <span class="status-badge status-badge--${escapeAttr(getStatusClass(order.status))}">${escapeHtml(order.status)}</span>
        </div>

        ${renderScoreBreakdown(entrada)}
        ${overrideHtml}

        <details class="governanca-form">
          <summary>Instrução do Planejamento</summary>
          <div class="governanca-campos">
            <label class="governanca-checkbox">
              <input type="checkbox" data-legal="${escapeAttr(order.id)}" ${priorizacao.obrigatoriedadeLegal ? 'checked' : ''}>
              Atende a exigência legal ou normativa
            </label>
            <div class="input-group">
              <label for="prontidao-${escapeAttr(order.id)}">Prontidão da instrução</label>
              <select id="prontidao-${escapeAttr(order.id)}" data-prontidao="${escapeAttr(order.id)}">
                ${[1, 2, 3, 4, 5].map(nota => `<option value="${nota}" ${priorizacao.prontidao === nota ? 'selected' : ''}>${nota} — ${escapeHtml(ESCALA_PRONTIDAO[nota])}</option>`).join('')}
              </select>
            </div>
            <button class="btn btn-secondary btn-sm" type="button" data-salvar-instrucao="${escapeAttr(order.id)}">Salvar instrução</button>
          </div>
        </details>

        <details class="governanca-form">
          <summary>Ajustar posição manualmente</summary>
          <div class="governanca-campos">
            <p class="muted-note">O ajuste vale para o ciclo corrente, aparece na fila com seu nome e expira quando o ciclo é fechado.</p>
            <div class="input-group">
              <label for="posicao-${escapeAttr(order.id)}">Nova posição</label>
              <input id="posicao-${escapeAttr(order.id)}" type="number" min="1" max="${fila.length}" value="${posicao}" data-nova-posicao="${escapeAttr(order.id)}">
            </div>
            <div class="input-group">
              <label for="motivo-fila-${escapeAttr(order.id)}">Motivo (mínimo de ${JUSTIFICATIVA_MINIMA_FILA} caracteres)</label>
              <textarea id="motivo-fila-${escapeAttr(order.id)}" rows="2" data-motivo-fila="${escapeAttr(order.id)}"></textarea>
            </div>
            <p class="transition-error" data-erro-fila="${escapeAttr(order.id)}"></p>
            <button class="btn btn-secondary btn-sm" type="button" data-mover-fila="${escapeAttr(order.id)}">Aplicar ajuste</button>
          </div>
        </details>

        <details class="governanca-form governanca-form--urgencia">
          <summary>Incluir por urgência</summary>
          <div class="governanca-campos">
            <p class="muted-note">A urgência fura a fila. Exige motivo de ${JUSTIFICATIVA_MINIMA_URGENCIA} caracteres e um segundo aprovador, e entra no painel de contenção.</p>
            <div class="input-group">
              <label for="aprovador-${escapeAttr(order.id)}">Aprovador</label>
              <select id="aprovador-${escapeAttr(order.id)}" data-aprovador="${escapeAttr(order.id)}">${aprovadores}</select>
            </div>
            <div class="input-group">
              <label for="motivo-urgencia-${escapeAttr(order.id)}">Motivo da urgência</label>
              <textarea id="motivo-urgencia-${escapeAttr(order.id)}" rows="2" data-motivo-urgencia="${escapeAttr(order.id)}"></textarea>
            </div>
            <p class="transition-error" data-erro-urgencia="${escapeAttr(order.id)}"></p>
            <button class="btn btn-danger btn-sm" type="button" data-incluir-urgencia="${escapeAttr(order.id)}">Incluir por urgência</button>
          </div>
        </details>
      </article>`;
  }).join('');
}

function renderUrgenciaPanel() {
  const container = document.getElementById('urgenciaContainer');
  if (!container) return;

  const resumo = getResumoUrgencia();
  if (!resumo.total) {
    container.innerHTML = emptyStateHtml({
      title: 'Sem valor contratado para medir',
      description: 'O percentual por urgência aparece quando houver pedidos aprovados no PCA.',
      compact: true
    });
    return;
  }

  const nivelGeral = resumo.percentual > 10 ? 'excedido' : resumo.percentual > 7 ? 'atencao' : 'ok';
  const linhas = resumo.setores.map(item => {
    const nivel = item.percentual > 20 ? 'excedido' : item.percentual > 14 ? 'atencao' : 'ok';
    return `
      <tr>
        <td>${escapeHtml(item.setor)}</td>
        <td>${formatPrice(item.total)}</td>
        <td>${formatPrice(item.urgencia)}</td>
        <td>${item.pedidosUrgencia} de ${item.pedidos}</td>
        <td><span class="sla-pill sla-pill--${nivel}">${item.percentual.toFixed(1)}%</span></td>
      </tr>`;
  }).join('');

  const alerta = resumo.acimaDoLimite.length
    ? `<div class="planning-alert planning-alert--danger">
         ${resumo.acimaDoLimite.length === 1 ? 'O setor' : 'Os setores'}
         ${escapeHtml(resumo.acimaDoLimite.map(item => item.setor).join(', '))}
         ${resumo.acimaDoLimite.length === 1 ? 'ultrapassou' : 'ultrapassaram'} o limite de 20% do valor por urgência.
       </div>`
    : '';

  container.innerHTML = `
    <div class="urgencia-resumo">
      <div class="planning-kpi-card">
        <span class="planning-kpi-label">Valor por urgência</span>
        <strong>${formatPrice(resumo.urgencia)}</strong>
        <span class="planning-kpi-meta">de ${formatPrice(resumo.total)} no total</span>
      </div>
      <div class="planning-kpi-card">
        <span class="planning-kpi-label">Percentual do ciclo</span>
        <strong><span class="sla-pill sla-pill--${nivelGeral}">${resumo.percentual.toFixed(1)}%</span></strong>
        <span class="planning-kpi-meta">meta: até 10%</span>
      </div>
    </div>
    ${alerta}
    <div class="table-scroll">
      <table class="report-table">
        <thead>
          <tr><th>Setor</th><th>Valor total</th><th>Por urgência</th><th>Pedidos</th><th>% por urgência</th></tr>
        </thead>
        <tbody>${linhas}</tbody>
      </table>
    </div>`;
}

// Sinaliza a janela de revisão do PCA (15/set–15/nov). Aceita `date` para
// testabilidade; em produção usa a data corrente.
function renderRevisaoBanner(date = new Date()) {
  const container = document.getElementById('revisaoBanner');
  if (!container) return;
  if (typeof isJanelaRevisao !== 'function' || !isJanelaRevisao(date)) {
    container.innerHTML = '';
    return;
  }
  container.innerHTML = `
    <div class="revisao-banner">
      <span class="revisao-banner-icon" aria-hidden="true">🗓️</span>
      <span><strong>Janela de revisão do PCA aberta</strong> (15/set–15/nov): inclusões extraordinárias
      entram como <em>Incluído no PCA (Urgência)</em> e passam pela contenção abaixo.</span>
    </div>`;
}

function renderGovernancaPage() {
  renderRevisaoBanner();
  renderCicloPanel();
  renderFila();
  renderUrgenciaPanel();
}

/* ---------- ações da página ---------- */

function setErro(seletor, mensagem) {
  const node = document.querySelector(seletor);
  if (node) node.textContent = mensagem;
}

function handleGovernancaClick(event) {
  const alvo = event.target;

  if (alvo.closest('[data-abrir-ciclo]')) {
    const resultado = abrirCiclo();
    if (!resultado.ok) return setErro('[data-ciclo-error]', resultado.motivo);
    renderGovernancaPage();
    return;
  }

  if (alvo.closest('[data-fechar-ciclo]')) {
    const ata = document.getElementById('ataCiclo');
    const resultado = fecharCiclo(ata ? ata.value : '');
    if (!resultado.ok) return setErro('[data-ciclo-error]', resultado.motivo);
    renderGovernancaPage();
    return;
  }

  const instrucao = alvo.closest('[data-salvar-instrucao]');
  if (instrucao) {
    const id = instrucao.getAttribute('data-salvar-instrucao');
    registrarInstrucao(id, {
      obrigatoriedadeLegal: document.querySelector(`[data-legal="${CSS.escape(id)}"]`)?.checked,
      prontidao: document.querySelector(`[data-prontidao="${CSS.escape(id)}"]`)?.value
    });
    renderGovernancaPage();
    return;
  }

  const mover = alvo.closest('[data-mover-fila]');
  if (mover) {
    const id = mover.getAttribute('data-mover-fila');
    const posicao = document.querySelector(`[data-nova-posicao="${CSS.escape(id)}"]`)?.value;
    const motivo = document.querySelector(`[data-motivo-fila="${CSS.escape(id)}"]`)?.value;
    const resultado = moverNaFila(id, posicao, motivo);
    if (!resultado.ok) return setErro(`[data-erro-fila="${CSS.escape(id)}"]`, resultado.motivo);
    renderGovernancaPage();
    return;
  }

  const remover = alvo.closest('[data-remover-override]');
  if (remover) {
    removerAjusteManual(remover.getAttribute('data-remover-override'));
    renderGovernancaPage();
    return;
  }

  const urgencia = alvo.closest('[data-incluir-urgencia]');
  if (urgencia) {
    const id = urgencia.getAttribute('data-incluir-urgencia');
    const aprovadorId = Number(document.querySelector(`[data-aprovador="${CSS.escape(id)}"]`)?.value);
    const aprovador = users.find(user => user.id === aprovadorId) || null;
    const motivo = document.querySelector(`[data-motivo-urgencia="${CSS.escape(id)}"]`)?.value;

    const resultado = incluirPorUrgencia(id, {
      justificativa: motivo,
      aprovador: aprovador ? { id: aprovador.id, nome: aprovador.nome, matricula: aprovador.matricula } : null
    });

    if (!resultado.ok) return setErro(`[data-erro-urgencia="${CSS.escape(id)}"]`, resultado.motivo);
    renderGovernancaPage();
  }
}

function initGovernancaPage() {
  if (!document.getElementById('filaContainer')) return;
  if (!guardPage(['gestor', 'compras'])) return;

  renderGovernancaPage();
  document.addEventListener('click', handleGovernancaClick);
}

document.addEventListener('DOMContentLoaded', initGovernancaPage);
