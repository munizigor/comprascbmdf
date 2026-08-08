const STAGE_LABELS = {
  1: 'Ideação & Necessidade',
  2: 'Validação & PCA',
  3: 'Estruturação no Processo (ETP/TR)',
  4: 'Edital & Seleção',
  5: 'Aquisição & Fabricação',
  6: 'Entrega & Finalização'
};

const STATUS_PIPELINE = [
  { value: 'DFD Registrado', stage: 1, color: '#7c3aed' },
  { value: 'DFD Aprovado pela Unidade', stage: 1, color: '#6d28d9' },
  { value: 'DFD Devolvido para Ajuste', stage: 1, color: '#a855f7', branch: true },
  { value: 'Em Análise Setorial', stage: 2, color: '#334155' },
  { value: 'Aguardando Suplementação', stage: 2, color: '#b45309' },
  { value: 'Arquivado', stage: 2, color: '#6b7280', branch: true },
  { value: 'Consolidado em Item de PCA', stage: 2, color: '#1d4ed8' },
  { value: 'PCA Aguardando Aprovação', stage: 2, color: '#1e3a8a' },
  { value: 'Incluído no PCA', stage: 2, color: '#2563eb' },
  { value: 'Incluído no PCA (Urgência)', stage: 2, color: '#1e40af' },
  { value: 'ETP em Elaboração', stage: 3, color: '#0d9488' },
  { value: 'Pesquisa de Preços', stage: 3, color: '#0891b2' },
  { value: 'TR Elaborado', stage: 3, color: '#059669' },
  { value: 'Reserva Orçamentária Confirmada', stage: 3, color: '#047857' },
  { value: 'Edital Publicado', stage: 4, color: '#ea580c' },
  { value: 'Em Seleção de Fornecedor', stage: 4, color: '#c2410c' },
  { value: 'Nota de Empenho Emitida', stage: 4, color: '#d97706' },
  { value: 'Ordem de Fornecimento Emitida', stage: 5, color: '#0369a1' },
  { value: 'Em Trânsito ou Fabricação', stage: 5, color: '#0f766e' },
  { value: 'Recebimento Provisório', stage: 6, color: '#0284c7' },
  { value: 'Recebimento Rejeitado (Aguardando Substituição)', stage: 6, color: '#dc2626', branch: true },
  { value: 'Recebimento Definitivo', stage: 6, color: '#16a34a' },
  { value: 'Liquidado', stage: 6, color: '#15803d' },
  { value: 'Pago', stage: 6, color: '#166534' },
  { value: 'Pedido Entregue', stage: 6, color: '#14532d' }
];

const STATUS_VALUES = STATUS_PIPELINE.map(entry => entry.value);
const DEFAULT_STATUS = STATUS_VALUES[0];

const ARCHIVED_STATUS = 'Arquivado';
const RETURNED_STATUS = 'DFD Devolvido para Ajuste';
const REJECTED_BRANCH_STATUS = 'Recebimento Rejeitado (Aguardando Substituição)';
// Estágios pré-PCA: a demanda ainda não conta no "planejado" nem no orçamento
// (getStatusFlags exclui os pendentes do total). Só passa a contar em
// "Incluído no PCA".
const PENDING_STATUSES = new Set([
  'DFD Registrado', 'DFD Aprovado pela Unidade', 'DFD Devolvido para Ajuste',
  'Em Análise Setorial', 'Aguardando Suplementação',
  'Consolidado em Item de PCA', 'PCA Aguardando Aprovação'
]);

const COMPROMETIDO_TRIGGER = 'Reserva Orçamentária Confirmada';
const EMPENHADO_TRIGGER = 'Nota de Empenho Emitida';
const LIQUIDADO_TRIGGER = 'Liquidado';
const PAGO_TRIGGER = 'Pago';

function getStatusMeta(status) {
  return STATUS_PIPELINE.find(entry => entry.value === status) || STATUS_PIPELINE[0];
}

function getStatusLabel(status) {
  return STATUS_VALUES.includes(status) ? status : DEFAULT_STATUS;
}

function getStatusClass(status) {
  return String(status)
    .toLowerCase()
    .replace(/\s+/g, '-')
    .normalize('NFD')
    .replace(/[^a-z0-9\-]/g, '');
}

function getStatusIndex(status) {
  const index = STATUS_VALUES.indexOf(status);
  return index >= 0 ? index : 0;
}

function getStatusStage(status) {
  return getStatusMeta(status).stage;
}

function getStatusStageLabel(status) {
  return STAGE_LABELS[getStatusStage(status)];
}

function normalizeStatusText(status) {
  return String(status || '').trim();
}

function isArchivedStatus(status) {
  return normalizeStatusText(status) === ARCHIVED_STATUS;
}

function isRejectedBranchStatus(status) {
  return normalizeStatusText(status) === REJECTED_BRANCH_STATUS;
}

function isReturnedForFixStatus(status) {
  return normalizeStatusText(status) === RETURNED_STATUS;
}

// Qualquer status marcado como desvio no pipeline (Arquivado, Recebimento
// Rejeitado e DFD Devolvido para Ajuste). Deriva do flag `branch` do próprio
// pipeline para não precisar listar cada desvio à mão.
function isBranchStatus(status) {
  return Boolean(getStatusMeta(normalizeStatusText(status)).branch);
}

function isPendingStatus(status) {
  return PENDING_STATUSES.has(normalizeStatusText(status));
}

function getMainPathStatuses() {
  return STATUS_PIPELINE.filter(entry => !entry.branch);
}

function getStagesWithStatuses() {
  return [1, 2, 3, 4, 5, 6].map(stage => ({
    stage,
    label: STAGE_LABELS[stage],
    statuses: getMainPathStatuses().filter(entry => entry.stage === stage).map(entry => entry.value)
  }));
}

function getStatusFlags(status) {
  const normalizedStatus = getStatusLabel(status);
  const includeInTotal = !isPendingStatus(normalizedStatus) && !isArchivedStatus(normalizedStatus);
  const rejected = isRejectedBranchStatus(normalizedStatus);
  const effectiveStatus = rejected ? 'Recebimento Provisório' : normalizedStatus;
  const atOrAfter = trigger => includeInTotal && getStatusIndex(effectiveStatus) >= getStatusIndex(trigger);

  return {
    includeInTotal,
    includeInComprometido: atOrAfter(COMPROMETIDO_TRIGGER),
    includeInEmpenhado: atOrAfter(EMPENHADO_TRIGGER),
    includeInLiquidado: !rejected && atOrAfter(LIQUIDADO_TRIGGER),
    includeInPago: !rejected && atOrAfter(PAGO_TRIGGER)
  };
}

function renderStatusFilterOptions(selectEl) {
  if (!selectEl) return;
  selectEl.innerHTML = ['<option value="all">Todos os status</option>']
    .concat(STATUS_VALUES.map(value => `<option value="${value}">${value}</option>`))
    .join('');
}
