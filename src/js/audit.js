// Trilha de auditoria e máquina de estados.
//
// `applyStatusChange` é o ÚNICO ponto de mutação de status do sistema. Toda
// tela que muda o estágio de um pedido passa por aqui, para que não exista
// caminho de alteração sem autor, data e motivo registrados.

const SLA_POR_ETAPA = {
  1: 5,   // Ideação & Necessidade — triagem do DFD
  2: 15,  // Validação & PCA
  3: 45,  // Estruturação (ETP/TR) — etapa mais pesada
  4: 60,  // Edital & Seleção — limitado por prazos legais
  5: 45,  // Aquisição & Fabricação
  6: 30   // Entrega & Finalização
};

const JUSTIFICATIVA_MINIMA_PADRAO = 20;
const JUSTIFICATIVA_MINIMA_URGENCIA = 30;
const URGENCIA_STATUS = 'Incluído no PCA (Urgência)';

// O grafo é derivado do caminho principal (próximo/anterior) e sobrescrito
// apenas onde o processo bifurca de verdade — Etapa 2 e os dois ramos.
function buildTransicoes() {
  const main = getMainPathStatuses().map(entry => entry.value);
  const map = {};

  main.forEach((status, index) => {
    const lista = [];
    if (main[index + 1]) lista.push(main[index + 1]);
    if (main[index - 1]) lista.push(main[index - 1]);
    // Arquivar deixa de fazer sentido depois que há empenho.
    if (getStatusStage(status) <= 4) lista.push(ARCHIVED_STATUS);
    map[status] = lista;
  });

  map['DFD Registrado'] = ['Em Análise Setorial', ARCHIVED_STATUS];
  map['Em Análise Setorial'] = ['Incluído no PCA', URGENCIA_STATUS, 'Aguardando Suplementação', 'DFD Registrado', ARCHIVED_STATUS];
  map['Aguardando Suplementação'] = ['Incluído no PCA', 'Em Análise Setorial', ARCHIVED_STATUS];
  map['Incluído no PCA'] = ['ETP em Elaboração', 'Em Análise Setorial', ARCHIVED_STATUS];
  map[URGENCIA_STATUS] = ['ETP em Elaboração', 'Em Análise Setorial', ARCHIVED_STATUS];
  map['ETP em Elaboração'] = ['Pesquisa de Preços', 'Incluído no PCA', ARCHIVED_STATUS];
  map['Recebimento Provisório'] = ['Recebimento Definitivo', REJECTED_BRANCH_STATUS, 'Em Trânsito ou Fabricação'];
  map[REJECTED_BRANCH_STATUS] = ['Recebimento Provisório', ARCHIVED_STATUS];
  map[ARCHIVED_STATUS] = ['Em Análise Setorial'];
  map['Pedido Entregue'] = [];

  return map;
}

const TRANSICOES = buildTransicoes();

function getTransicoesValidas(status) {
  return TRANSICOES[status] || [];
}

function podeTransicionar(de, para) {
  return getTransicoesValidas(de).includes(para);
}

function isRetrocesso(de, para) {
  if (isBranchStatus(de) || isBranchStatus(para)) return false;
  return getStatusIndex(para) < getStatusIndex(de);
}

function exigeAprovador(para) {
  return para === URGENCIA_STATUS;
}

function getJustificativaMinima(de, para, excepcional) {
  if (para === URGENCIA_STATUS) return JUSTIFICATIVA_MINIMA_URGENCIA;
  if (excepcional) return JUSTIFICATIVA_MINIMA_PADRAO;
  if (isBranchStatus(para)) return JUSTIFICATIVA_MINIMA_PADRAO;
  if (de === ARCHIVED_STATUS) return JUSTIFICATIVA_MINIMA_PADRAO;
  if (isRetrocesso(de, para)) return JUSTIFICATIVA_MINIMA_PADRAO;
  return 0;
}

function exigeJustificativa(de, para, excepcional) {
  return getJustificativaMinima(de, para, excepcional) > 0;
}

function getPerfilAtual() {
  return window.CBMDFNav ? window.CBMDFNav.getProfile() : 'solicitante';
}

function getAutorAtual() {
  const user = window.CBMDFNav ? window.CBMDFNav.getCurrentUser() : null;
  return user ? { id: user.id, nome: user.nome, matricula: user.matricula } : null;
}

// Retorna { ok, motivo } — a tela decide como comunicar a recusa.
function applyStatusChange(orderId, novoStatus, contexto = {}) {
  const orders = getSavedOrders();
  const order = findOrderById(orders, orderId);
  if (!order) return { ok: false, motivo: 'Pedido não encontrado.' };

  const de = order.status;
  if (de === novoStatus) return { ok: false, motivo: 'O pedido já está neste status.' };
  if (!STATUS_VALUES.includes(novoStatus)) return { ok: false, motivo: 'Status desconhecido.' };

  const excepcional = Boolean(contexto.excepcional);
  if (!excepcional && !podeTransicionar(de, novoStatus)) {
    return { ok: false, motivo: `Transição não permitida no fluxo: "${de}" → "${novoStatus}".` };
  }

  const justificativa = String(contexto.justificativa || '').trim();
  const minimo = getJustificativaMinima(de, novoStatus, excepcional);
  if (minimo > 0 && justificativa.length < minimo) {
    return { ok: false, motivo: `Esta mudança exige um motivo com no mínimo ${minimo} caracteres.` };
  }

  const autor = contexto.por || getAutorAtual();
  let aprovador = contexto.aprovador || null;

  if (exigeAprovador(novoStatus)) {
    if (!aprovador || !aprovador.matricula) {
      return { ok: false, motivo: 'A inclusão por urgência exige um aprovador identificado.' };
    }
    if (autor && aprovador.matricula === autor.matricula) {
      return { ok: false, motivo: 'O aprovador deve ser diferente de quem solicita a inclusão por urgência.' };
    }
  } else {
    aprovador = null;
  }

  order.status = novoStatus;
  if (!Array.isArray(order.historico)) order.historico = [];
  order.historico.push({
    de,
    para: novoStatus,
    em: new Date().toISOString(),
    por: autor,
    perfil: contexto.perfil || getPerfilAtual(),
    origem: contexto.origem || null,
    justificativa: justificativa || null,
    excepcional,
    aprovador,
    migrado: false
  });

  saveOrders(orders);
  return { ok: true, order };
}

/* ---------- leitura da trilha ---------- */

function getHistorico(order) {
  return Array.isArray(order?.historico) ? order.historico : [];
}

function temHistoricoConfiavel(order) {
  const historico = getHistorico(order);
  return historico.length > 0 && !historico.some(entry => entry.migrado);
}

// Data em que o pedido entrou pela primeira vez em uma macro-etapa.
function getEntradaNaEtapa(order, etapa) {
  const entrada = getHistorico(order).find(item => getStatusStage(item.para) === etapa);
  return entrada ? new Date(entrada.em) : null;
}

function diffEmDias(inicio, fim) {
  return Math.max(0, Math.round((fim - inicio) / 86400000));
}

function getDiasNoStatusAtual(order) {
  const historico = getHistorico(order);
  if (!historico.length) return null;
  return diffEmDias(new Date(historico[historico.length - 1].em), new Date());
}

function getLeadTimeDias(order) {
  const historico = getHistorico(order);
  if (!historico.length) return null;
  const inicio = new Date(order.criadoEm || historico[0].em);
  const fim = order.status === 'Pedido Entregue'
    ? new Date(historico[historico.length - 1].em)
    : new Date();
  return diffEmDias(inicio, fim);
}

// Situação do pedido frente ao SLA da etapa em que ele está.
function getSituacaoSla(order) {
  const etapa = getStatusStage(order.status);
  const sla = SLA_POR_ETAPA[etapa];
  const entrada = getEntradaNaEtapa(order, etapa);
  if (!sla || !entrada) return null;

  const dias = diffEmDias(entrada, new Date());
  return {
    etapa,
    sla,
    dias,
    excedido: dias > sla,
    nivel: dias > sla ? 'excedido' : dias > sla * 0.7 ? 'atencao' : 'ok'
  };
}

/* ---------- renderização ---------- */

function renderHistoricoHtml(order) {
  const historico = getHistorico(order);
  if (!historico.length) return '';

  const linhas = historico.slice().reverse().map(entry => {
    const autor = entry.por ? `${entry.por.nome} (${entry.por.matricula})` : 'Autor não registrado';
    const marcadores = [];
    if (entry.migrado) marcadores.push('<span class="historico-tag historico-tag--migrado">histórico anterior indisponível</span>');
    if (entry.excepcional) marcadores.push('<span class="historico-tag historico-tag--excecao">transição excepcional</span>');
    if (entry.aprovador) marcadores.push(`<span class="historico-tag historico-tag--aprovador">aprovado por ${escapeHtml(entry.aprovador.nome)} (${escapeHtml(entry.aprovador.matricula)})</span>`);

    const transicao = entry.de
      ? `${escapeHtml(entry.de)} → <strong>${escapeHtml(entry.para)}</strong>`
      : `<strong>${escapeHtml(entry.para)}</strong>`;

    return `
      <li class="historico-item">
        <div class="historico-transicao">${transicao}</div>
        <div class="historico-meta">
          ${escapeHtml(formatDateTime(entry.em))} · ${escapeHtml(autor)}${entry.perfil ? ` · perfil ${escapeHtml(entry.perfil)}` : ''}${entry.origem ? ` · ${escapeHtml(entry.origem)}` : ''}
        </div>
        ${entry.justificativa ? `<p class="historico-justificativa">${escapeHtml(entry.justificativa)}</p>` : ''}
        ${marcadores.length ? `<div class="historico-tags">${marcadores.join('')}</div>` : ''}
      </li>`;
  }).join('');

  return `
    <details class="historico-panel">
      <summary>Tramitação (${historico.length} ${historico.length === 1 ? 'registro' : 'registros'})</summary>
      <ol class="historico-lista">${linhas}</ol>
    </details>`;
}

/* ---------- guarda de perfil ---------- */

// Coerência de demonstração, não segurança: num app estático não existe
// controle de acesso real. Serve para que o autor gravado na trilha
// signifique alguma coisa.
function guardPage(perfisPermitidos) {
  const perfil = getPerfilAtual();
  if (perfisPermitidos.includes(perfil)) return true;

  document.body.innerHTML = `
    <div class="access-guard">
      <h1>Área restrita ao perfil ${perfisPermitidos.map(p => escapeHtml(p)).join(' ou ')}</h1>
      <p>Você está navegando como <strong>${escapeHtml(perfil)}</strong>. Troque o perfil no cabeçalho da página inicial para acessar esta área.</p>
      <p class="access-guard-note">Restrição de demonstração — este protótipo não possui controle de acesso real.</p>
      <a class="btn btn-primary" href="index.html">Voltar ao início</a>
    </div>`;
  return false;
}
