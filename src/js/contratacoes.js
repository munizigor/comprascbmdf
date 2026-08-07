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
    grupoNome: item.grupoNome || item.groupName || 'Sem grupo',
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

function createContractId(classeNome) {
  return `contratacao-${String(classeNome).toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')}`;
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

function groupContratacoesByClasse(orders, contratacoes) {
  const groups = new Map();
  const excludedGroups = new Set(contratacoes.excludedGroups || []);
  const excludedItemKeys = new Set(contratacoes.excludedItemKeys || []);

  orders.forEach(order => {
    (Array.isArray(order.itens) ? order.itens : []).forEach(rawItem => {
      const item = normalizeItem(rawItem);
      const key = getOrderItemKey(rawItem);
      if (excludedGroups.has(item.classeNome) || excludedItemKeys.has(key)) return;

      if (!groups.has(item.classeNome)) {
        groups.set(item.classeNome, {
          id: createContractId(item.classeNome),
          classeNome: item.classeNome,
          grupoNome: item.grupoNome,
          tipo: item.tipo,
          tipoDespesa: item.tipoDespesa,
          naturezaDespesa: item.naturezaDespesa,
          items: [],
        });
      }

      groups.get(item.classeNome).items.push({
        ...item,
        key,
        source: 'order',
        usuario: order.usuario || { nome: 'Desconhecido', matricula: '', setor: '' },
        setor: item.setor || order.usuario?.setor || '',
        pedidoData: order.data || '',
      });
    });
  });

  (contratacoes.customItems || []).forEach(rawItem => {
    const item = buildCustomItem(rawItem);
    if (excludedGroups.has(item.classeNome) || excludedItemKeys.has(item.key)) return;
    if (!groups.has(item.classeNome)) {
      groups.set(item.classeNome, {
        id: createContractId(item.classeNome),
        classeNome: item.classeNome,
        grupoNome: item.grupoNome,
        tipo: item.tipo,
        tipoDespesa: item.tipoDespesa,
        naturezaDespesa: item.naturezaDespesa,
        items: [],
      });
    }
    groups.get(item.classeNome).items.push(item);
  });

  return Array.from(groups.values());
}

function getUniqueClasseNames(groups) {
  return groups.map(group => group.classeNome).sort((a, b) => a.localeCompare(b, 'pt-BR'));
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

    const groupCard = document.createElement('div');
    groupCard.className = 'order-card';
    groupCard.innerHTML = `
      <div class="order-card-header">
        <div class="order-card-title-group">
          <div>
            <h3 class="order-card-title">Classe: ${escapeHtml(group.classeNome)}</h3>
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
  const groups = groupContratacoesByClasse(orders, contratacoes);

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

  const groups = groupContratacoesByClasse(orders, contratacoes)
    .filter(group => {
      const matchesClass = classFilter === 'all' || group.classeNome === classFilter;
      const searchText = [
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
