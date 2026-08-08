function getSavedContratacoes() {
  const stored = readJson('cbmdf_contratacoes', null);
  if (!stored || typeof stored !== 'object') {
    return { excludedGroups: [], excludedItemKeys: [], customItems: [] };
  }
  return {
    excludedGroups: Array.isArray(stored.excludedGroups) ? stored.excludedGroups : [],
    excludedItemKeys: Array.isArray(stored.excludedItemKeys) ? stored.excludedItemKeys : [],
    customItems: Array.isArray(stored.customItems) ? stored.customItems : []
  };
}

function saveContratacoes(contratacoes) {
  localStorage.setItem('cbmdf_contratacoes', JSON.stringify(contratacoes));
}

function normalizeItem(item) {
  return {
    id: item.id ?? item.itemId ?? Math.random().toString(36).slice(2, 10),
    nome: item.nome || item.name || 'Item sem nome',
    categoria: item.categoria || item.category || 'Sem categoria',
    grupoCodigo: item.grupoCodigo || '',
    grupoNome: item.grupoNome || item.groupName || 'Sem grupo',
    classeCodigo: item.classeCodigo || '',
    classeNome: item.classeNome || item.classe || item.className || 'Sem classe',
    tipo: item.tipo || item.type || 'MATERIAL',
    tipoDespesa: item.tipoDespesa || item.expenseType || 'Custeio',
    naturezaDespesa: item.naturezaDespesa || item.expenseNature || '',
    quantidade: Number(item.quantidade ?? item.quantity ?? 1),
    urgencia: item.urgencia || item.urgency || 'normal',
    itemUid: item.itemUid,
    precoUnitario: getItemUnitPrice(item),
    subtotal: getItemSubtotal(item),
    observacoes: item.observacoes || item.notes || '',
    setor: item.setor || item.usuario?.setor || item.department || '',
  };
}

// Um item de PCA é sempre de um exercício específico e de uma classe
// (CATMAT/CATSER). Quando o código da classe não existe (itens custom ou
// acrescentados manualmente), cai no nome da classe.
const SEM_EXERCICIO = 'sem-exercicio';

function getClasseKey(item) {
  return item.classeCodigo || item.classeNome;
}

function getExercicioKey(exercicio) {
  return exercicio == null || exercicio === '' ? SEM_EXERCICIO : String(exercicio);
}

function getPcaGroupKey(exercicio, item) {
  return `${getExercicioKey(exercicio)}|||${getClasseKey(item)}`;
}

function getCatalogCode(item) {
  if (!item.classeCodigo) return '';
  const prefixo = item.tipo === 'SERVIÇO' ? 'CATSER' : 'CATMAT';
  return `${prefixo} ${item.classeCodigo}`;
}

function createContractId(exercicio, item) {
  const base = `${getExercicioKey(exercicio)}-${getClasseKey(item)}`;
  return `contratacao-${base.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')}`;
}

function getOrderItemKey(rawItem) {
  return `item:${rawItem.itemUid}`;
}

function getCustomItemKey(item) {
  return `custom:${item.id}`;
}

function buildCustomItem(rawItem) {
  const item = normalizeItem(rawItem);
  return {
    ...item,
    key: getCustomItemKey(item),
    source: 'custom',
    usuario: { nome: 'Gestor', setor: item.setor || '' },
  };
}

// Agrupa por (exercício × classe) — a unidade de um item de PCA. A exclusão de
// grupo segue por `classeNome` (remove a classe em todos os exercícios).
function groupContratacoesByClasse(orders, contratacoes) {
  const groups = new Map();
  const excludedGroups = new Set(contratacoes.excludedGroups || []);
  const excludedItemKeys = new Set(contratacoes.excludedItemKeys || []);

  const ensureGroup = (exercicio, item) => {
    const mapKey = getPcaGroupKey(exercicio, item);
    if (!groups.has(mapKey)) {
      groups.set(mapKey, {
        id: createContractId(exercicio, item),
        exercicioPca: getExercicioKey(exercicio) === SEM_EXERCICIO ? null : exercicio,
        classeCodigo: item.classeCodigo,
        classeNome: item.classeNome,
        grupoCodigo: item.grupoCodigo,
        grupoNome: item.grupoNome,
        tipo: item.tipo,
        tipoDespesa: item.tipoDespesa,
        naturezaDespesa: item.naturezaDespesa,
        items: [],
      });
    }
    return groups.get(mapKey);
  };

  orders.forEach(order => {
    (Array.isArray(order.itens) ? order.itens : []).forEach(rawItem => {
      const item = normalizeItem(rawItem);
      const key = getOrderItemKey(rawItem);
      if (excludedGroups.has(item.classeNome) || excludedItemKeys.has(key)) return;

      ensureGroup(order.exercicioPca, item).items.push({
        ...item,
        key,
        source: 'order',
        protocolo: order.id || '',
        publicadoPncp: typeof isPublicadoPncp === 'function' ? isPublicadoPncp(order) : false,
        usuario: order.usuario || { nome: 'Desconhecido', matricula: '', setor: '' },
        setor: item.setor || order.usuario?.setor || '',
        pedidoData: order.data || '',
      });
    });
  });

  (contratacoes.customItems || []).forEach(rawItem => {
    const item = buildCustomItem(rawItem);
    if (excludedGroups.has(item.classeNome) || excludedItemKeys.has(item.key)) return;
    ensureGroup(null, item).items.push(item);
  });

  return Array.from(groups.values());
}

// Materializa os itens de PCA: numera o conjunto COMPLETO por (exercício,
// código de classe) — antes de qualquer filtro, para o número não mudar
// conforme a busca — e deriva os protocolos de DFD que os originaram.
function buildPcaItens(orders, contratacoes) {
  const grupos = groupContratacoesByClasse(orders, contratacoes);

  grupos.sort((a, b) => {
    const exA = a.exercicioPca == null ? Infinity : Number(a.exercicioPca);
    const exB = b.exercicioPca == null ? Infinity : Number(b.exercicioPca);
    if (exA !== exB) return exA - exB;
    return String(a.classeCodigo || a.classeNome).localeCompare(String(b.classeCodigo || b.classeNome), 'pt-BR');
  });

  const contadores = new Map();
  grupos.forEach(grupo => {
    const exercicioLabel = grupo.exercicioPca == null ? 'SEM' : String(grupo.exercicioPca);
    const proximo = (contadores.get(exercicioLabel) || 0) + 1;
    contadores.set(exercicioLabel, proximo);
    grupo.numero = `PCA-${exercicioLabel}-${String(proximo).padStart(3, '0')}`;
    grupo.dfdsOrigem = Array.from(new Set(
      grupo.items.filter(item => item.source === 'order' && item.protocolo).map(item => item.protocolo)
    ));
    grupo.dfdsPublicados = new Set(
      grupo.items.filter(item => item.source === 'order' && item.protocolo && item.publicadoPncp).map(item => item.protocolo)
    ).size;
  });

  return grupos;
}

function getUniqueClasseNames(groups) {
  return Array.from(new Set(groups.map(group => group.classeNome)))
    .sort((a, b) => a.localeCompare(b, 'pt-BR'));
}

function updateFilters(groups) {
  const classSelect = document.getElementById('classFilter');
  const classeNames = getUniqueClasseNames(groups);
  classSelect.innerHTML = '<option value="all">Todas as classes</option>' +
    classeNames.map(name => `<option value="${escapeAttr(name)}">${escapeHtml(name)}</option>`).join('');
}

function calculateContractsSummary(groups) {
  let itemCount = 0;
  let total = 0;

  groups.forEach(group => {
    group.items.forEach(item => {
      itemCount += item.quantidade;
      total += getItemSubtotal(item);
    });
  });

  return {
    groupCount: groups.length,
    itemCount,
    total,
  };
}

function renderSummary(groups) {
  const summary = calculateContractsSummary(groups);
  document.getElementById('groupCount').textContent = summary.groupCount;
  document.getElementById('contractItemCount').textContent = summary.itemCount;
  document.getElementById('contractTotal').textContent = formatPrice(summary.total);
}

function renderContractGroups(groups) {
  const container = document.getElementById('contractContainer');
  container.innerHTML = '';

  if (!groups.length) {
    container.innerHTML = emptyStateHtml({
      title: 'Nenhum grupo de contratação encontrado',
      description: 'Ainda não há pedidos suficientes para formar grupos de contratação, ou os filtros atuais não retornaram resultados.'
    });
    return;
  }

  groups.forEach(group => {
    const groupQuantity = group.items.reduce((sum, item) => sum + item.quantidade, 0);
    const groupValue = group.items.reduce((sum, item) => sum + getItemSubtotal(item), 0);
    const exercicioLabel = group.exercicioPca != null ? String(group.exercicioPca) : 'não informado';
    const codigo = getCatalogCode(group);
    const classeTitulo = codigo ? `${codigo} — ${group.classeNome}` : group.classeNome;
    const totalDfds = group.dfdsOrigem.length;
    const pncpLabel = totalDfds
      ? `${group.dfdsPublicados}/${totalDfds} DFDs${group.dfdsPublicados === totalDfds && group.dfdsPublicados > 0 ? ' ✅' : ''}`
      : '—';

    const groupCard = document.createElement('div');
    groupCard.className = 'order-card';
    groupCard.innerHTML = `
      <div class="order-card-header">
        <div class="order-card-title-group">
          <div>
            <p class="pca-eyebrow"><strong>Item de PCA nº ${escapeHtml(group.numero)}</strong> · Exercício ${escapeHtml(exercicioLabel)}</p>
            <h3 class="order-card-title">Classe: ${escapeHtml(classeTitulo)}</h3>
            <div class="order-meta">
              <div><strong>Grupo:</strong> ${escapeHtml(group.grupoNome)}</div>
              <div><strong>Tipo:</strong> ${escapeHtml(group.tipo)}</div>
              <div><strong>Despesa:</strong> ${escapeHtml(group.tipoDespesa)}</div>
              <div><strong>Natureza:</strong> ${escapeHtml(group.naturezaDespesa)}</div>
            </div>
          </div>
          <button class="btn btn-danger btn-sm" type="button" data-exclude-group="${escapeAttr(group.classeNome)}">Excluir Contratação</button>
        </div>
        <div class="order-meta">
          <div><strong>Itens:</strong> ${group.items.length}</div>
          <div><strong>Quantidade total:</strong> ${groupQuantity}</div>
          <div><strong>Valor:</strong> ${formatPrice(groupValue)}</div>
          <div><strong>DFDs de origem:</strong> ${totalDfds}</div>
          <div><strong>Publicado no PNCP:</strong> ${pncpLabel}</div>
        </div>
      </div>
      <table class="report-table">
        <thead>
          <tr>
            <th>Item</th>
            <th>Qtd</th>
            <th>Urgência</th>
            <th>Preço unit.</th>
            <th>Subtotal</th>
            <th>Solicitante / Setor</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          ${group.items.map(item => `
            <tr>
              <td>${escapeHtml(item.nome)}</td>
              <td>${item.quantidade}</td>
              <td>${escapeHtml(item.urgencia)}</td>
              <td>${formatPrice(item.precoUnitario)}</td>
              <td>${formatPrice(getItemSubtotal(item))}</td>
              <td>${escapeHtml(item.usuario?.nome || '')} / ${escapeHtml(item.setor || item.usuario?.setor || '')}</td>
              <td><button class="btn btn-danger btn-sm" type="button" data-exclude-item="${escapeAttr(item.key)}">Excluir item</button></td>
            </tr>
          `).join('')}
        </tbody>
      </table>
    `;

    container.appendChild(groupCard);
  });
}

function loadContractPage() {
  const orders = getSavedOrders();
  const contratacoes = getSavedContratacoes();
  const groups = buildPcaItens(orders, contratacoes);

  updateFilters(groups);
  renderSummary(groups);
  renderContractGroups(groups);
  updateRestoreButton(contratacoes);
}

function applyFilters() {
  const orders = getSavedOrders();
  const contratacoes = getSavedContratacoes();
  const search = document.getElementById('searchBox').value.trim().toLowerCase();
  const classFilter = document.getElementById('classFilter').value;

  const groups = buildPcaItens(orders, contratacoes)
    .filter(group => {
      const matchesClass = classFilter === 'all' || group.classeNome === classFilter;
      const searchText = [
        group.numero,
        group.classeCodigo,
        group.classeNome,
        group.grupoNome,
        group.tipo,
        group.tipoDespesa,
        group.naturezaDespesa,
        ...group.items.map(item => [item.nome, item.categoria, item.urgencia, item.usuario?.nome, item.usuario?.setor, item.observacoes].join(' '))
      ].join(' ').toLowerCase();

      return matchesClass && (!search || searchText.includes(search));
    });

  renderSummary(groups);
  renderContractGroups(groups);
}

function updateRestoreButton(contratacoes) {
  const button = document.getElementById('restoreGroupsButton');
  if (!button) return;
  const hasExclusions = (contratacoes.excludedGroups && contratacoes.excludedGroups.length) || (contratacoes.excludedItemKeys && contratacoes.excludedItemKeys.length);
  button.style.display = hasExclusions ? 'block' : 'none';
}

function excludeGroup(classeNome) {
  const contratacoes = getSavedContratacoes();
  contratacoes.excludedGroups = Array.from(new Set([...(contratacoes.excludedGroups || []), classeNome]));
  saveContratacoes(contratacoes);
  loadContractPage();
}

function excludeItem(itemKey) {
  const contratacoes = getSavedContratacoes();
  contratacoes.excludedItemKeys = Array.from(new Set([...(contratacoes.excludedItemKeys || []), itemKey]));
  saveContratacoes(contratacoes);
  loadContractPage();
}

function restoreExcludedGroups() {
  const contratacoes = getSavedContratacoes();
  const groupCount = contratacoes.excludedGroups.length;
  const itemCount = contratacoes.excludedItemKeys.length;

  if (!groupCount && !itemCount) return;

  const parts = [];
  if (groupCount) parts.push(`${groupCount} ${groupCount === 1 ? 'grupo' : 'grupos'}`);
  if (itemCount) parts.push(`${itemCount} ${itemCount === 1 ? 'item' : 'itens'}`);
  const plural = parts.length > 1 || groupCount > 1 || itemCount > 1;
  const verbo = plural ? 'foram excluídos' : 'foi excluído';
  if (!confirm(`Restaurar ${parts.join(' e ')} que ${verbo} das contratações?`)) return;

  contratacoes.excludedGroups = [];
  contratacoes.excludedItemKeys = [];
  saveContratacoes(contratacoes);
  loadContractPage();
}

function readCustomItemField(id) {
  return (document.getElementById(id)?.value || '').trim();
}

function addCustomItem() {
  const item = {
    id: `custom-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    nome: readCustomItemField('newItemName'),
    classeNome: readCustomItemField('newItemClasse'),
    grupoNome: readCustomItemField('newItemGrupo'),
    categoria: readCustomItemField('newItemCategoria'),
    tipo: readCustomItemField('newItemTipo') || 'MATERIAL',
    tipoDespesa: readCustomItemField('newItemTipoDespesa') || 'Custeio',
    naturezaDespesa: readCustomItemField('newItemNatureza'),
    quantidade: Math.max(1, Number(readCustomItemField('newItemQuantidade')) || 1),
    urgencia: readCustomItemField('newItemUrgencia') || 'normal',
    precoUnitario: Math.max(0, Number(readCustomItemField('newItemPreco')) || 0),
    observacoes: readCustomItemField('newItemObservacoes'),
    setor: readCustomItemField('newItemSetor')
  };

  if (!item.nome || !item.classeNome) {
    alert('Preencha o nome do item e a classe para incluir a contratação.');
    return;
  }

  const contratacoes = getSavedContratacoes();
  contratacoes.customItems.push(item);
  saveContratacoes(contratacoes);

  ['newItemName', 'newItemClasse', 'newItemGrupo', 'newItemCategoria', 'newItemNatureza', 'newItemSetor', 'newItemObservacoes']
    .forEach(id => { const field = document.getElementById(id); if (field) field.value = ''; });
  const defaults = { newItemTipo: 'MATERIAL', newItemTipoDespesa: 'Custeio', newItemQuantidade: '1', newItemUrgencia: 'normal', newItemPreco: '0.00' };
  Object.entries(defaults).forEach(([id, value]) => { const field = document.getElementById(id); if (field) field.value = value; });

  loadContractPage();
}

function handleContractContainerClick(event) {
  const target = event.target.closest('[data-exclude-group], [data-exclude-item]');
  if (!target) return;

  if (target.dataset.excludeGroup !== undefined) return excludeGroup(target.dataset.excludeGroup);
  if (target.dataset.excludeItem !== undefined) return excludeItem(target.dataset.excludeItem);
}

window.addEventListener('DOMContentLoaded', () => {
  if (!guardPage(['compras'])) return;

  loadContractPage();

  document.getElementById('contractContainer').addEventListener('click', handleContractContainerClick);

  const searchBox = document.getElementById('searchBox');
  searchBox.removeAttribute('oninput');
  searchBox.addEventListener('input', debounce(applyFilters, 200));

  const restoreButton = document.getElementById('restoreGroupsButton');
  if (restoreButton) restoreButton.addEventListener('click', restoreExcludedGroups);

  const addItemButton = document.getElementById('addCustomItemButton');
  if (addItemButton) addItemButton.addEventListener('click', addCustomItem);
});
