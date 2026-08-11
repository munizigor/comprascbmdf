// Derivações da Matriz de Dotação de Material. Sem estado: tudo calculado
// on-read a partir de `cbmdf_dotacao` e dos pedidos. Reusa readJson,
// getSavedOrders, getItemQuantity (core.js) e isArchivedStatus (status-pipeline.js).

// Catálogo mínimo (nome/unidade) para exibir a matriz sem depender de script.js
// (que só é carregado no index). Espelha os itens de dotação de src/js/script.js.
const DOTACAO_CATALOGO = {
  1: { nome: 'Capacete de proteção tático', unidade: 'unidade' },
  2: { nome: 'Bota de combate e salvamento', unidade: 'par' },
  3: { nome: 'Mangueira de incêndio 20m', unidade: 'unidade' },
  4: { nome: 'Extintor ABC 4kg', unidade: 'unidade' },
  5: { nome: 'Rádio comunicador portátil HT', unidade: 'unidade' },
  6: { nome: 'Lanterna tática recarregável', unidade: 'unidade' },
  7: { nome: 'Colete reflexivo operacional', unidade: 'unidade' },
  8: { nome: 'Kit de primeiros socorros APH', unidade: 'kit' },
  10: { nome: 'Uniforme operacional (CBMDF)', unidade: 'conjunto' },
  11: { nome: 'Desfibrilador Externo Automático (DEA)', unidade: 'unidade' },
  12: { nome: 'Prancha Rígida de Imobilização com Tirantes', unidade: 'unidade' },
  13: { nome: 'Cinto / Baudrier para Salvamento em Altura', unidade: 'unidade' }
};

function getDotacaoItemNome(itemId) {
  return DOTACAO_CATALOGO[itemId] ? DOTACAO_CATALOGO[itemId].nome : `Item ${itemId}`;
}

function getDotacao() {
  const raw = typeof readJson === 'function' ? readJson('cbmdf_dotacao', null) : null;
  const d = raw && typeof raw === 'object' ? raw : {};
  return {
    prevista: Array.isArray(d.prevista) ? d.prevista : [],
    atual: Array.isArray(d.atual) ? d.atual : []
  };
}

// [{setor,itemId,quantidade}] filtrado por setor → { itemId: quantidade }.
function indexarPorItem(lista, setor) {
  const mapa = {};
  lista.forEach(entry => {
    if (entry && entry.setor === setor) mapa[entry.itemId] = toNumber(entry.quantidade, 0);
  });
  return mapa;
}

function getDotacaoSetor(setor) {
  const { prevista, atual } = getDotacao();
  return { prevista: indexarPorItem(prevista, setor), atual: indexarPorItem(atual, setor) };
}

// Soma, por item, das quantidades em pedidos EM ANDAMENTO do setor — status
// ainda ativo (nem arquivado, nem entregue) — para não pedir o que já vem.
function getEmAtendimento(setor) {
  const mapa = {};
  getSavedOrders().forEach(order => {
    if (!order.usuario || order.usuario.setor !== setor) return;
    if (isArchivedStatus(order.status) || order.status === 'Pedido Entregue') return;
    (Array.isArray(order.itens) ? order.itens : []).forEach(item => {
      mapa[item.id] = (mapa[item.id] || 0) + getItemQuantity(item);
    });
  });
  return mapa;
}

// Linhas de lacuna por item para um setor, ordenadas por maior lacuna.
function getLacunasSetor(setor) {
  const { prevista, atual } = getDotacaoSetor(setor);
  const emAtend = getEmAtendimento(setor);
  const ids = new Set([...Object.keys(prevista), ...Object.keys(atual)].map(Number));
  const linhas = [];
  ids.forEach(itemId => {
    const prev = prevista[itemId] || 0;
    const at = atual[itemId] || 0;
    const emAtendimento = emAtend[itemId] || 0;
    const lacuna = Math.max(0, prev - at);
    const aSolicitar = Math.max(0, prev - at - emAtendimento);
    const coberturaPct = prev > 0 ? Math.round((at / prev) * 100) : 100;
    linhas.push({
      itemId, nome: getDotacaoItemNome(itemId),
      prevista: prev, atual: at, lacuna, emAtendimento, aSolicitar, coberturaPct,
      excedente: at > prev
    });
  });
  return linhas.sort((a, b) => b.lacuna - a.lacuna || a.nome.localeCompare(b.nome, 'pt-BR'));
}

// Status de dotação de UM item para o setor (selo no card). Null se não houver
// dotação definida para o par (setor, item).
function getDotacaoItemSetor(setor, itemId) {
  return getLacunasSetor(setor).find(linha => linha.itemId === Number(itemId)) || null;
}

function getResumoDotacaoSetor(setor) {
  const linhas = getLacunasSetor(setor);
  const prevista = linhas.reduce((s, l) => s + l.prevista, 0);
  const atual = linhas.reduce((s, l) => s + l.atual, 0);
  const deficit = linhas.reduce((s, l) => s + l.lacuna, 0);
  const itensComDeficit = linhas.filter(l => l.lacuna > 0).length;
  // Cobertura agregada limita atual a prevista, para excedentes não inflarem o %.
  const coberturaPct = prevista > 0 ? Math.round((Math.min(atual, prevista) / prevista) * 100) : 100;
  return { setor, prevista, atual, deficit, itensComDeficit, coberturaPct, linhas };
}

function getSetoresComDotacao() {
  const { prevista, atual } = getDotacao();
  return Array.from(new Set([...prevista, ...atual].map(entry => entry.setor)))
    .sort((a, b) => String(a).localeCompare(String(b), 'pt-BR'));
}

function getResumoDotacaoGeral() {
  return getSetoresComDotacao().map(getResumoDotacaoSetor);
}
