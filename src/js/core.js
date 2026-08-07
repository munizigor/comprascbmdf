// Núcleo único de dados, formatação e migração.
//
// Regra para código novo: não gere `onclick` com dados interpolados — use
// `data-*` + delegação de evento. `escapeJsAttr` existe apenas para os
// handlers inline legados que ainda não foram migrados.

const ORDERS_KEY = 'cbmdf_orders';
const CONTRATACOES_KEY = 'cbmdf_contratacoes';
const SCHEMA_VERSION_KEY = 'cbmdf_schema_version';
const SCHEMA_VERSION = 1;

const ratingCriteria = [
  { id: 'qualidadeProduto', label: 'Como você avalia a qualidade do material ou serviço entregue?' },
  { id: 'fornecedor', label: 'Como você avalia o desempenho do fornecedor?' },
  { id: 'tempoProjeto', label: 'O tempo de tramitação do processo foi adequado?' },
  { id: 'comunicacaoSuporte', label: 'Como você avalia a atuação da equipe de compras?' },
  { id: 'atendeuExpectativa', label: 'A contratação atendeu à necessidade da sua unidade?' }
];

/* ---------- números e moeda ---------- */

function toAmount(value) {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : 0;
}

function toNumber(value, fallback = 0) {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : fallback;
}

function formatPrice(value) {
  return toAmount(value).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}

/* ---------- escape ---------- */

function escapeHtml(value) {
  return String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

function escapeAttr(value) {
  return escapeHtml(value);
}

// Escapa para string JavaScript ANTES de escapar para HTML — o parser HTML
// decodifica as entidades do atributo antes de o JS ser avaliado, então a
// ordem inversa quebraria a string.
function escapeJsAttr(value) {
  const forJs = String(value ?? '')
    .replace(/\\/g, '\\\\')
    .replace(/'/g, "\\'")
    .replace(/\r?\n/g, '\\n');
  return escapeHtml(forJs);
}

/* ---------- itens ---------- */

function getItemName(item) {
  return item?.nome || item?.name || 'Item sem nome';
}

function getItemQuantity(item) {
  return toAmount(item?.quantidade ?? item?.quantity);
}

function getItemUnitPrice(item) {
  return toAmount(item?.precoUnitario ?? item?.unitPrice);
}

function getItemUrgency(item) {
  return item?.urgencia || item?.urgency || 'normal';
}

// O subtotal declarado vence quando é um número finito; caso contrário
// recalcula por quantidade × preço unitário.
function getItemSubtotal(item) {
  const declared = Number(item?.subtotal ?? item?.total);
  if (Number.isFinite(declared)) return declared;
  return getItemQuantity(item) * getItemUnitPrice(item);
}

function getOrderTotal(order) {
  const items = Array.isArray(order?.itens) ? order.itens : [];
  return items.reduce((sum, item) => sum + getItemSubtotal(item), 0);
}

/* ---------- avaliação ---------- */

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
    if (!isComplete) order.avaliacao.finalizadoEm = null;
    changed = true;
  }

  return changed;
}

/* ---------- identidade e datas ---------- */

// `order.data` é uma string pt-BR ("05/08/2026, 14:13:24").
function parseBrDateTime(dateText) {
  if (!dateText || typeof dateText !== 'string') return null;
  const [datePart, timePart] = dateText.split(',').map(part => part.trim());
  const [day, month, year] = String(datePart).split('/').map(Number);
  if (!day || !month || !year) return null;
  const [hour = 0, minute = 0, second = 0] = String(timePart || '').split(':').map(Number);
  const parsed = new Date(year, month - 1, day, hour || 0, minute || 0, second || 0);
  return Number.isNaN(parsed.getTime()) ? null : parsed;
}

function getOrderYear(order) {
  const parsed = parseBrDateTime(order?.data);
  return parsed ? parsed.getFullYear() : new Date().getFullYear();
}

function formatOrderId(year, sequential) {
  return `PED-${year}-${String(sequential).padStart(4, '0')}`;
}

// Sequencial por ano: 1 + maior sequencial já usado naquele ano.
function nextOrderId(orders, year) {
  const prefix = `PED-${year}-`;
  const maxSeq = orders.reduce((max, order) => {
    if (typeof order?.id !== 'string' || !order.id.startsWith(prefix)) return max;
    const seq = Number(order.id.slice(prefix.length));
    return Number.isFinite(seq) && seq > max ? seq : max;
  }, 0);
  return formatOrderId(year, maxSeq + 1);
}

function makeItemUid(orderId, index) {
  return `${orderId}-I${index + 1}`;
}

function formatDateTime(value) {
  if (!value) return '';
  // ISO 8601 → pt-BR; qualquer outra coisa é devolvida como veio (legado).
  if (typeof value === 'string' && value.includes('T')) {
    const parsed = new Date(value);
    if (!Number.isNaN(parsed.getTime())) return parsed.toLocaleString('pt-BR');
  }
  return String(value);
}

/* ---------- normalização ---------- */

// União das duas normalizeOrders que existiam (status.js garantia `itens` e
// ignorava `avaliacao`; acompanhe.js fazia o inverso, e ambas gravavam — a
// ordem de visita às páginas alterava os dados persistidos).
function normalizeOrders(orders) {
  let changed = false;

  orders.forEach(order => {
    if (!order.status) {
      order.status = DEFAULT_STATUS;
      changed = true;
    }

    if (!Array.isArray(order.itens)) {
      order.itens = [];
      changed = true;
    }

    if (!order.id) {
      order.id = nextOrderId(orders, getOrderYear(order));
      changed = true;
    }

    if (!order.criadoEm) {
      const parsed = parseBrDateTime(order.data);
      order.criadoEm = (parsed || new Date()).toISOString();
      changed = true;
    }

    order.itens.forEach((item, index) => {
      if (item && !item.itemUid) {
        item.itemUid = makeItemUid(order.id, index);
        changed = true;
      }
    });

    // O histórico é criado já nesta fase (ainda sem uso) para que a trilha de
    // auditoria da Fase 7 não exija uma segunda migração de dados.
    if (!Array.isArray(order.historico)) {
      order.historico = [{
        de: null,
        para: order.status,
        em: order.criadoEm,
        por: order.usuario ? { id: order.usuario.id, nome: order.usuario.nome, matricula: order.usuario.matricula } : null,
        perfil: null,
        origem: null,
        justificativa: 'Registro inicial migrado — histórico anterior indisponível.',
        excepcional: false,
        aprovador: null,
        migrado: true
      }];
      changed = true;
    }

    if (normalizeOrderRating(order)) changed = true;
  });

  if (changed) saveOrders(orders);
  return orders;
}

/* ---------- migração de chaves de contratações ---------- */

function readJson(key, fallback) {
  const raw = localStorage.getItem(key);
  if (!raw) return fallback;
  try {
    const parsed = JSON.parse(raw);
    return parsed ?? fallback;
  } catch (error) {
    console.warn(`[core] Valor inválido em ${key}; usando padrão.`, error);
    return fallback;
  }
}

// Chave antiga: `order:<itemId>:<usuarioId>:<order.data>:<orderIndex>:<itemIndex>`.
// `order.data` contém ',' e ':', então o parse precisa ser feito do FIM.
function migrateExcludedItemKeys(orders) {
  const contratacoes = readJson(CONTRATACOES_KEY, null);
  if (!contratacoes || !Array.isArray(contratacoes.excludedItemKeys)) return;

  let changed = false;
  contratacoes.excludedItemKeys = contratacoes.excludedItemKeys.map(key => {
    if (typeof key !== 'string' || !key.startsWith('order:')) return key;

    const parts = key.split(':');
    const itemIndex = Number(parts.pop());
    const orderIndex = Number(parts.pop());
    const order = orders[orderIndex];
    const item = order && Array.isArray(order.itens) ? order.itens[itemIndex] : null;

    // Chave não resolvível é preservada como está — nunca apagar dado do
    // usuário numa migração; ela simplesmente deixa de casar, que é o
    // comportamento que já tinha.
    if (!item || !item.itemUid) return key;

    changed = true;
    return `item:${item.itemUid}`;
  });

  if (changed) {
    localStorage.setItem(CONTRATACOES_KEY, JSON.stringify(contratacoes));
  }
}

let migrationRan = false;

function runMigrations(orders) {
  if (migrationRan) return;
  migrationRan = true;
  try {
    const version = Number(localStorage.getItem(SCHEMA_VERSION_KEY)) || 0;
    if (version < SCHEMA_VERSION) {
      migrateExcludedItemKeys(orders);
      localStorage.setItem(SCHEMA_VERSION_KEY, String(SCHEMA_VERSION));
    }
  } catch (error) {
    // Migração nunca deve derrubar a página: segue com o dado não migrado.
    console.warn('[core] Falha na migração de esquema; seguindo com o dado atual.', error);
  }
}

/* ---------- acesso aos pedidos ---------- */

let ordersCache = null;

function getSavedOrders() {
  if (ordersCache) return ordersCache;

  const raw = localStorage.getItem(ORDERS_KEY);
  let parsed = [];
  if (raw) {
    try {
      const candidate = JSON.parse(raw);
      parsed = Array.isArray(candidate) ? candidate : [];
    } catch (error) {
      console.warn('[core] cbmdf_orders inválido; iniciando lista vazia.', error);
      parsed = [];
    }
  }

  ordersCache = normalizeOrders(parsed);
  runMigrations(ordersCache);
  return ordersCache;
}

function saveOrders(orders) {
  ordersCache = orders;
  try {
    localStorage.setItem(ORDERS_KEY, JSON.stringify(orders));
  } catch (error) {
    console.error('[core] Não foi possível salvar os pedidos.', error);
    alert('Não foi possível salvar: o armazenamento local do navegador está cheio.');
  }
}

function findOrderById(orders, orderId) {
  return orders.find(order => order.id === orderId) || null;
}

function findOrderIndexById(orders, orderId) {
  return orders.findIndex(order => order.id === orderId);
}

/* ---------- criação ---------- */

function createOrder({ usuario, itens, observacoes }) {
  const orders = getSavedOrders();
  const now = new Date();
  const id = nextOrderId(orders, now.getFullYear());
  const criadoEm = now.toISOString();

  const order = {
    id,
    data: now.toLocaleString('pt-BR'),
    criadoEm,
    status: DEFAULT_STATUS,
    observacoes: observacoes || '',
    usuario,
    itens: (itens || []).map((item, index) => ({ ...item, itemUid: makeItemUid(id, index) })),
    avaliacao: {
      criterios: createEmptyRatingCriteria(),
      finalizada: false,
      atualizadoEm: null,
      finalizadoEm: null
    },
    historico: [{
      de: null,
      para: DEFAULT_STATUS,
      em: criadoEm,
      por: usuario ? { id: usuario.id, nome: usuario.nome, matricula: usuario.matricula } : null,
      perfil: 'solicitante',
      origem: 'index.html',
      justificativa: 'Solicitação registrada pelo requisitante.',
      excepcional: false,
      aprovador: null,
      migrado: false
    }]
  };

  orders.push(order);
  saveOrders(orders);
  return order;
}

/* ---------- exportação ---------- */

function exportOrdersCsv() {
  const orders = getSavedOrders();
  if (!orders.length) {
    alert('Não há pedidos para exportar.');
    return;
  }

  const header = [
    'Protocolo', 'Data', 'Status', 'Etapa', 'Nome', 'Matrícula', 'Setor', 'Observações',
    'Item ID', 'Item Nome', 'Categoria', 'Grupo', 'Classe', 'Tipo', 'Tipo Despesa',
    'Natureza Despesa', 'Quantidade', 'Urgência', 'Preço Unitário', 'Subtotal'
  ];
  const rows = [header];

  orders.forEach(order => {
    const items = Array.isArray(order.itens) ? order.itens : [];
    const etapa = typeof getStatusStageLabel === 'function' ? getStatusStageLabel(order.status) : '';

    if (!items.length) {
      rows.push([
        order.id, order.data, order.status, etapa,
        order.usuario?.nome, order.usuario?.matricula, order.usuario?.setor, order.observacoes,
        '', '(pedido sem itens)', '', '', '', '', '', '', 0, '', 0, 0
      ]);
      return;
    }

    items.forEach(item => {
      rows.push([
        order.id, order.data, order.status, etapa,
        order.usuario?.nome, order.usuario?.matricula, order.usuario?.setor, order.observacoes,
        item.id, item.nome, item.categoria, item.grupoNome, item.classeNome,
        item.tipo, item.tipoDespesa, item.naturezaDespesa,
        getItemQuantity(item), item.urgencia, getItemUnitPrice(item), getItemSubtotal(item)
      ]);
    });
  });

  const csv = rows
    .map(row => row.map(value => `"${String(value ?? '').replace(/"/g, '""')}"`).join(','))
    .join('\r\n');
  const blob = new Blob(['﻿' + csv], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `pedidos_${new Date().toISOString().slice(0, 10)}.csv`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

/* ---------- utilidades de UI ---------- */

function debounce(fn, wait = 200) {
  let timer = null;
  return function debounced(...args) {
    clearTimeout(timer);
    timer = setTimeout(() => fn.apply(this, args), wait);
  };
}
