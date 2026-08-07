function getSavedOrders() {
  const raw = localStorage.getItem('cbmdf_orders');
  return raw ? JSON.parse(raw) : [];
}

function getSavedContratacoes() {
  const raw = localStorage.getItem('cbmdf_contratacoes');
  return raw ? JSON.parse(raw) : { excludedGroups: [], excludedItemKeys: [], customItems: [] };
}

function saveContratacoes(contratacoes) {
  localStorage.setItem('cbmdf_contratacoes', JSON.stringify(contratacoes));
}

function formatPrice(value) {
  return Number(value ?? 0).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
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
    precoUnitario: Number(item.precoUnitario ?? item.unitPrice ?? 0),
    observacoes: item.observacoes || item.notes || '',
    setor: item.setor || item.usuario?.setor || item.department || '',
  };
}

function createContractId(classeNome) {
  return `contratacao-${String(classeNome).toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')}`;
}

function getOrderItemKey(item, order, orderIndex, itemIndex) {
  return `order:${item.id}:${order.usuario?.id ?? 'unknown'}:${order.data ?? 'unknown'}:${orderIndex}:${itemIndex}`;
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

  orders.forEach((order, orderIndex) => {
    (Array.isArray(order.itens) ? order.itens : []).forEach((rawItem, itemIndex) => {
      const item = normalizeItem(rawItem);
      const key = getOrderItemKey(item, order, orderIndex, itemIndex);
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
    classeNames.map(name => `<option value="${name}">${name}</option>`).join('');
}

function calculateContractsSummary(groups) {
  let itemCount = 0;
  let total = 0;

  groups.forEach(group => {
    group.items.forEach(item => {
      itemCount += item.quantidade;
      total += item.quantidade * item.precoUnitario;
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
    container.innerHTML = '<div class="empty-state">Nenhum grupo de contratação encontrado. Verifique se há pedidos registrados ou adicione itens manualmente.</div>';
    return;
  }

  groups.forEach(group => {
    const groupQuantity = group.items.reduce((sum, item) => sum + item.quantidade, 0);
    const groupValue = group.items.reduce((sum, item) => sum + item.quantidade * item.precoUnitario, 0);

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
          <button class="btn btn-danger btn-sm" type="button" onclick="excludeGroup('${escapeHtml(group.classeNome)}')">Excluir Contratação</button>
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
          ${group.items.map((item, itemIndex) => `
            <tr>
              <td>${escapeHtml(item.nome)}</td>
              <td>${item.quantidade}</td>
              <td>${escapeHtml(item.urgencia)}</td>
              <td>${formatPrice(item.precoUnitario)}</td>
              <td>${formatPrice(item.quantidade * item.precoUnitario)}</td>
              <td>${escapeHtml(item.usuario?.nome || '')} / ${escapeHtml(item.setor || item.usuario?.setor || '')}</td>
              <td><button class="btn btn-danger btn-sm" type="button" onclick="excludeItem('${escapeHtml(item.key)}')">Excluir item</button></td>
            </tr>
          `).join('')}
        </tbody>
      </table>
    `;

    container.appendChild(groupCard);
  });
}

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
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
  contratacoes.excludedGroups = [];
  contratacoes.excludedItemKeys = [];
  saveContratacoes(contratacoes);
  loadContractPage();
}

function addCustomItem() {
  const item = {
    id: `custom-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    nome: document.getElementById('newItemName').value.trim(),
    classeNome: document.getElementById('newItemClasse').value.trim(),
    grupoNome: document.getElementById('newItemGrupo').value.trim(),
    categoria: document.getElementById('newItemCategoria').value.trim(),
    tipo: document.getElementById('newItemTipo').value.trim() || 'MATERIAL',
    tipoDespesa: document.getElementById('newItemTipoDespesa').value.trim() || 'Custeio',
    naturezaDespesa: document.getElementById('newItemNatureza').value.trim(),
    quantidade: Number(document.getElementById('newItemQuantidade').value) || 1,
    urgencia: document.getElementById('newItemUrgencia').value,
    precoUnitario: Number(document.getElementById('newItemPreco').value) || 0,
    observacoes: document.getElementById('newItemObservacoes').value.trim(),
    setor: document.getElementById('newItemSetor').value.trim(),
  };

  if (!item.nome || !item.classeNome) {
    alert('Preencha o nome do item e a classe para incluir a contratação.');
    return;
  }

  const contratacoes = getSavedContratacoes();
  contratacoes.customItems = contratacoes.customItems || [];
  contratacoes.customItems.push(item);
  saveContratacoes(contratacoes);

  document.getElementById('newItemName').value = '';
  document.getElementById('newItemClasse').value = '';
  document.getElementById('newItemGrupo').value = '';
  document.getElementById('newItemCategoria').value = '';
  document.getElementById('newItemTipo').value = 'MATERIAL';
  document.getElementById('newItemTipoDespesa').value = 'Custeio';
  document.getElementById('newItemNatureza').value = '';
  document.getElementById('newItemQuantidade').value = '1';
  document.getElementById('newItemUrgencia').value = 'normal';
  document.getElementById('newItemPreco').value = '0.00';
  document.getElementById('newItemSetor').value = '';
  document.getElementById('newItemObservacoes').value = '';

  loadContractPage();
}

window.addEventListener('DOMContentLoaded', loadContractPage);
