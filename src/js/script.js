const products = [
  {
    id: 1,
    name: 'Capacete de proteção tático',
    category: 'seguranca',
    description: 'Capacete resistente para operações de salvamento, combate a incêndio e manutenção.',
    price: 125.00,
    priority: 'alta',
    tipo: 'MATERIAL',
    unidade: 'unidade',
    grupoCodigo: '84',
    grupoNome: 'VESTUÁRIOS, EQUIPAMENTOS INDIVIDUAIS E INSÍGNIAS',
    classeCodigo: '8415',
    classeNome: 'VESTUÁRIO PARA FINS ESPECIAIS',
    tipoDespesa: 'Investimento',
    naturezaDespesa: '4.4.90.52' // Equipamentos e Material Permanente
  },
  {
    id: 2,
    name: 'Bota de combate e salvamento',
    category: 'seguranca',
    description: 'Bota tática com solado antiderrapante e proteção para panturrilha.',
    price: 320.00,
    priority: 'alta',
    tipo: 'MATERIAL',
    unidade: 'par',
    grupoCodigo: '84',
    grupoNome: 'VESTUÁRIOS, EQUIPAMENTOS INDIVIDUAIS E INSÍGNIAS',
    classeCodigo: '8430',
    classeNome: 'CALÇADOS MASCULINOS',
    tipoDespesa: 'Custeio',
    naturezaDespesa: '3.3.90.30' // Material de Consumo (Vestuário/Uniformes)
  },
  {
    id: 3,
    name: 'Mangueira de incêndio 20m',
    category: 'seguranca',
    description: 'Mangueira semi-rígida para combate a incêndios e treinamentos.',
    price: 490.00,
    priority: 'alta',
    tipo: 'MATERIAL',
    unidade: 'unidade',
    grupoCodigo: '42',
    grupoNome: 'EQUIPAMENTO PARA COMBATE A INCÊNDIO, RESGATE E SEGURANÇA',
    classeCodigo: '4210',
    classeNome: 'EQUIPAMENTOS PARA COMBATE A INCÊNDIO',
    tipoDespesa: 'Investimento',
    naturezaDespesa: '4.4.90.52' // Equipamentos e Material Permanente
  },
  {
    id: 4,
    name: 'Extintor ABC 4kg',
    category: 'seguranca',
    description: 'Extintor portátil para primeiros atendimentos em foco inicial de incêndio.',
    price: 158.00,
    priority: 'alta',
    tipo: 'MATERIAL',
    unidade: 'unidade',
    grupoCodigo: '42',
    grupoNome: 'EQUIPAMENTO PARA COMBATE A INCÊNDIO, RESGATE E SEGURANÇA',
    classeCodigo: '4210',
    classeNome: 'EQUIPAMENTOS PARA COMBATE A INCÊNDIO',
    tipoDespesa: 'Custeio',
    naturezaDespesa: '3.3.90.30' // Material de Consumo (Recarga/Proteção/Segurança)
  },
  {
    id: 5,
    name: 'Rádio comunicador portátil HT',
    category: 'manutencao',
    description: 'Rádio portátil para comunicação entre equipes de operação.',
    price: 220.00,
    priority: 'media',
    tipo: 'MATERIAL',
    unidade: 'unidade',
    grupoCodigo: '58',
    grupoNome: 'EQUIPAMENTOS DE COMUNICAÇÃO, DETECÇÃO E RADIAÇÃO COERENTE',
    classeCodigo: '5820',
    classeNome: 'EQUIPAMENTOS DE COMUNICAÇÃO DE RÁDIO E TELEVISÃO, EXCETO AÉREOS',
    tipoDespesa: 'Investimento',
    naturezaDespesa: '4.4.90.52' // Equipamentos e Material Permanente
  },
  {
    id: 6,
    name: 'Lanterna tátil recarregável',
    category: 'manutencao',
    description: 'Lanterna recarregável para inspeções e ações noturnas.',
    price: 86.00,
    priority: 'media',
    tipo: 'MATERIAL',
    unidade: 'unidade',
    grupoCodigo: '62',
    grupoNome: 'LÂMPADAS E ACCSSÓRIOS DE ILUMINAÇÃO',
    classeCodigo: '6230',
    classeNome: 'LÂMPADAS ELÉTRICAS PORTÁTEIS E DISPOSITIVOS DE FIXAÇÃO',
    tipoDespesa: 'Custeio',
    naturezaDespesa: '3.3.90.30' // Material de Consumo
  },
  {
    id: 7,
    name: 'Colete reflexivo operacional',
    category: 'seguranca',
    description: 'Colete para identificação em áreas externas e operações de tráfego.',
    price: 72.50,
    priority: 'media',
    tipo: 'MATERIAL',
    unidade: 'unidade',
    grupoCodigo: '84',
    grupoNome: 'VESTUÁRIOS, EQUIPAMENTOS INDIVIDUAIS E INSÍGNIAS',
    classeCodigo: '8415',
    classeNome: 'VESTUÁRIO PARA FINS ESPECIAIS',
    tipoDespesa: 'Custeio',
    naturezaDespesa: '3.3.90.30' // Material de Consumo (Vestuário e Uniformes)
  },
  {
    id: 8,
    name: 'Kit de primeiros socorros APH',
    category: 'higiene',
    description: 'Maleta com curativos, gaze e materiais básicos de atendimento pré-hospitalar.',
    price: 135.00,
    priority: 'alta',
    tipo: 'MATERIAL',
    unidade: 'kit',
    grupoCodigo: '65',
    grupoNome: 'EQUIPAMENTOS E ARTIGOS PARA USO MÉDICO, DENTÁRIO E VETERINÁRIO',
    classeCodigo: '6510',
    classeNome: 'MATERIAIS CIRÚRGICOS PARA CURATIVOS',
    tipoDespesa: 'Custeio',
    naturezaDespesa: '3.3.90.30' // Material de Consumo (Material Hospitalar e de APH)
  },
  {
    id: 9,
    name: 'Água sanitária 5L',
    category: 'higiene',
    description: 'Produto de limpeza para desinfecção de ambulâncias e áreas de atendimento.',
    price: 24.90,
    priority: 'normal',
    tipo: 'MATERIAL',
    unidade: 'galão',
    grupoCodigo: '79',
    grupoNome: 'EQUIPAMENTOS E MATERIAIS PARA LIMPEZA',
    classeCodigo: '7930',
    classeNome: 'COMPOSTOS E PREPARADOS PARA LIMPEZA E POLIMENTO',
    tipoDespesa: 'Custeio',
    naturezaDespesa: '3.3.90.30' // Material de Consumo (Material de Higiene e Limpeza)
  },
  {
    id: 10,
    name: 'Uniforme operacional (CBMDF)',
    category: 'manutencao',
    description: 'Calça e camisa com tecido resistente para uso em serviço e manutenção.',
    price: 245.00,
    priority: 'media',
    tipo: 'MATERIAL',
    unidade: 'conjunto',
    grupoCodigo: '84',
    grupoNome: 'VESTUÁRIOS, EQUIPAMENTOS INDIVIDUAIS E INSÍGNIAS',
    classeCodigo: '8405',
    classeNome: 'VESTUÁRIO EXTERNO MASCULINO',
    tipoDespesa: 'Custeio',
    naturezaDespesa: '3.3.90.30' // Material de Consumo (Vestuário e Fardamento)
  },
  {
    id: 11,
    name: 'Desfibrilador Externo Automático (DEA)',
    category: 'saude',
    description: 'Equipamento médico portátil para atendimento de emergências cardiorrespiratórias em campo.',
    price: 6800.00,
    priority: 'alta',
    tipo: 'MATERIAL',
    unidade: 'unidade',
    grupoCodigo: '65',
    grupoNome: 'EQUIPAMENTOS E ARTIGOS PARA USO MÉDICO, DENTÁRIO E VETERINÁRIO',
    classeCodigo: '6515',
    classeNome: 'INSTRUMENTOS, EQUIPAMENTOS E SUPRIMENTOS MÉDICOS E CIRÚRGICOS',
    tipoDespesa: 'Investimento',
    naturezaDespesa: '4.4.90.52' // Equipamentos e Material Permanente (Aparelhos Médico-Hospitalares)
  },
  {
    id: 12,
    name: 'Prancha Rígida de Imobilização com Tirantes',
    category: 'seguranca',
    description: 'Prancha translúcida para resgate e imobilização da coluna spinal de vítimas.',
    price: 450.00,
    priority: 'alta',
    tipo: 'MATERIAL',
    unidade: 'unidade',
    grupoCodigo: '42',
    grupoNome: 'EQUIPAMENTO PARA COMBATE A INCÊNDIO, RESGATE E SEGURANÇA',
    classeCodigo: '4240',
    classeNome: 'EQUIPAMENTO PARA SEGURANÇA E SALVAMENTO',
    tipoDespesa: 'Investimento',
    naturezaDespesa: '4.4.90.52' // Equipamentos e Material Permanente
  },
  {
    id: 13,
    name: 'Cinto / Baudrier para Salvamento em Altura',
    category: 'seguranca',
    description: 'Cinto tático tipo paraquedista para operações de ancoragem e rapel de resgate.',
    price: 890.00,
    priority: 'alta',
    tipo: 'MATERIAL',
    unidade: 'unidade',
    grupoCodigo: '42',
    grupoNome: 'EQUIPAMENTO PARA COMBATE A INCÊNDIO, RESGATE E SEGURANÇA',
    classeCodigo: '4240',
    classeNome: 'EQUIPAMENTO PARA SEGURANÇA E SALVAMENTO',
    tipoDespesa: 'Investimento',
    naturezaDespesa: '4.4.90.52' // Equipamentos e Material Permanente
  },
  {
    id: 14,
    name: 'Serviço de Manutenção Preventiva de VTRs',
    category: 'manutencao',
    description: 'Manutenção mecânica e revisão preventiva da frota de viaturas operacionais.',
    price: 3500.00,
    priority: 'media',
    tipo: 'SERVIÇO',
    unidade: 'serviço',
    grupoCodigo: '852',
    grupoNome: 'SERVIÇOS DE INVESTIGAÇÃO E SEGURANÇA',
    classeCodigo: '8529',
    classeNome: 'OUTROS SERVIÇOS DE SEGURANÇA',
    tipoDespesa: 'Custeio',
    naturezaDespesa: '3.3.90.39' // Outros Serviços de Terceiros - Pessoa Jurídica (Manutenção de Veículos)
  }
];

const cart = {};

function getSavedOrders() {
  const raw = localStorage.getItem('cbmdf_orders');
  return raw ? JSON.parse(raw) : [];
}

function saveOrders(orders) {
  localStorage.setItem('cbmdf_orders', JSON.stringify(orders));
}

function exportOrdersCsv() {
  const orders = getSavedOrders();
  if (!orders.length) {
    alert('Não há pedidos para exportar.');
    return;
  }

  const header = ['Data', 'Nome', 'Matrícula', 'Setor', 'Observações', 'Item ID', 'Item Nome', 'Categoria', 'Grupo', 'Classe', 'Categoria', 'Tipo', 'Natureza Despesa', 'Quantidade', 'Urgência', 'Preço Unitário', 'Subtotal'];
  const rows = [header];

  orders.forEach(order => {
    order.itens.forEach(item => {
      rows.push([
        order.data,
        order.usuario.nome,
        order.usuario.matricula,
        order.usuario.setor,
        order.observacoes,
        item.id,
        item.nome,
        item.categoria,
        item.grupoNome,
        item.classeNome,
        item.tipo,
        item.tipoDespesa,
        item.naturezaDespesa,
        item.quantidade,
        item.urgencia,
        item.precoUnitario,
        item.subtotal
      ]);
    });
  });

  const csv = rows.map(row => row.map(value => `"${String(value ?? '').replace(/"/g, '""')}"`).join(',')).join('\r\n');
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `pedidos_${new Date().toISOString().slice(0,10)}.csv`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

function populateUserSelect() {
  const select = document.getElementById('userSelect');
  select.innerHTML = users.map(user => `<option value="${user.id}">${user.nome}</option>`).join('');
  const savedId = localStorage.getItem('cbmdf_current_user_id');
  if (savedId && users.some(user => user.id === Number(savedId))) {
    select.value = savedId;
  }
  renderUser();
}

function renderUser() {
  const select = document.getElementById('userSelect');
  const greeting = document.getElementById('userGreeting');
  const sector = document.getElementById('userSector');
  const userId = Number(select.value);
  const user = users.find(item => item.id === userId) || users[0];
  if (greeting) greeting.textContent = `Olá, ${user.nome}`;
  sector.textContent = `Lotação: ${user.setor}`;
  if (window.CBMDFNav) window.CBMDFNav.setCurrentUserId(user.id);
  renderPersonalization(user);
  applyFilters();
}

function formatPrice(value) {
  return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}

function categoryLabel(category) {
  const labels = { escritorio: 'Escritório', manutencao: 'Manutenção', higiene: 'Higiene', saude: 'Saúde', seguranca: 'Segurança' };
  return labels[category] || 'Segurança';
}

function getProductCode(item) {
  const prefix = item.tipo === 'SERVIÇO' ? 'CATSER' : 'CATMAT';
  return `${prefix} ${item.classeCodigo}${String(item.id).padStart(2, '0')}`;
}

function getFavoritesKey() {
  const user = window.CBMDFNav ? window.CBMDFNav.getCurrentUser() : null;
  return `cbmdf_favorites_${user ? user.id : 'guest'}`;
}

function getFavorites() {
  const raw = localStorage.getItem(getFavoritesKey());
  return raw ? JSON.parse(raw) : [];
}

function toggleFavorite(productId) {
  const favorites = getFavorites();
  const index = favorites.indexOf(productId);
  if (index >= 0) favorites.splice(index, 1); else favorites.push(productId);
  localStorage.setItem(getFavoritesKey(), JSON.stringify(favorites));
  applyFilters();
}

function getGlobalItemCounts() {
  const counts = {};
  getSavedOrders().forEach(order => {
    order.itens.forEach(item => {
      counts[item.id] = (counts[item.id] || 0) + item.quantidade;
    });
  });
  return counts;
}

function getItemRecency() {
  const recency = {};
  getSavedOrders().forEach((order, index) => {
    order.itens.forEach(item => {
      recency[item.id] = index;
    });
  });
  return recency;
}

function renderProducts(list, favorites) {
  const container = document.getElementById('products');
  container.innerHTML = '';
  if (!list.length) {
    container.innerHTML = emptyStateHtml({
      title: 'Nenhum material encontrado',
      description: 'Ajuste a busca ou os filtros para ver outros itens do catálogo.'
    });
    return;
  }
  list.forEach(item => {
    const isFavorite = favorites.includes(item.id);
    const card = document.createElement('div');
    card.className = 'card';
    card.innerHTML = `
      <div class="card-top">
        <div class="card-icon">${item.category.charAt(0).toUpperCase()}</div>
        <div>
          <h3 class="card-title">${item.name}</h3>
          <p class="card-subtitle">${categoryLabel(item.category)}</p>
        </div>
        <button type="button" class="favorite-btn ${isFavorite ? 'is-active' : ''}" onclick="toggleFavorite(${item.id})" aria-label="${isFavorite ? 'Remover dos favoritos' : 'Adicionar aos favoritos'}" aria-pressed="${isFavorite}">${isFavorite ? '★' : '☆'}</button>
      </div>

      <p class="card-description">${item.description}</p>
      <div class="card-meta">
        <span class="chip">${item.tipo}</span>
        <span class="chip">${getProductCode(item)}</span>
        <span class="chip">Unidade: ${item.unidade}</span>
        <span class="chip">${item.tipoDespesa}</span>
      </div>
      <p class="card-availability">🟢 Disponível para solicitação</p>
      <div class="card-footer">
        <span class="price">${formatPrice(item.price)}</span>
        <button class="btn btn-primary" onclick="addToCart(${item.id})">Adicionar</button>
      </div>
    `;
    container.appendChild(card);
  });
}

function addToCart(productId) {
  const item = products.find(p => p.id === productId);
  if (!item) return;
  if (!cart[productId]) {
    cart[productId] = { quantity: 0, urgency: 'normal' };
  }
  cart[productId].quantity += 1;
  renderCart();
}

function removeFromCart(productId) {
  delete cart[productId];
  renderCart();
}

function updateQuantity(productId, delta) {
  if (!cart[productId]) return;
  cart[productId].quantity += delta;
  if (cart[productId].quantity < 1) delete cart[productId];
  renderCart();
}

function updateUrgency(productId, urgency) {
  if (!cart[productId]) return;
  cart[productId].urgency = urgency;
  renderCart();
}

function renderCart() {
  const cartItems = document.getElementById('cartItems');
  cartItems.innerHTML = '';
  const ids = Object.keys(cart);
  if (!ids.length) {
    cartItems.innerHTML = emptyStateHtml({
      title: 'Seu carrinho está vazio',
      description: 'Adicione materiais do catálogo para montar sua requisição.',
      compact: true
    });
  }
  let total = 0;
  let quantity = 0;
  ids.forEach(key => {
    const productId = Number(key);
    const cartItem = cart[productId];
    const count = cartItem.quantity;
    const item = products.find(p => p.id === productId);
    if (!item) return;
    const lineTotal = item.price * count;
    total += lineTotal;
    quantity += count;

    const entry = document.createElement('div');
    entry.className = 'cart-item';
    entry.innerHTML = `
      <div class="cart-item-header">
        <div>
          <p class="cart-item-title">${item.name}</p>
          <p class="cart-item-meta">${formatPrice(item.price)} cada</p>
        </div>
        <button class="btn btn-secondary" onclick="removeFromCart(${item.id})">Remover</button>
      </div>
      <div class="cart-item-controls">
      <div class="quantity">
        <button onclick="updateQuantity(${item.id}, -1)">-</button>
        <span>${count}</span>
        <button onclick="updateQuantity(${item.id}, 1)">+</button>
      </div>
      <div class="input-group" style="margin-top: 0;">
        <label for="urgency-${item.id}">Urgência</label>
        <select id="urgency-${item.id}" onchange="updateUrgency(${item.id}, this.value)">
          <option value="normal" ${cartItem.urgency === 'normal' ? 'selected' : ''}>Normal</option>
          <option value="media" ${cartItem.urgency === 'media' ? 'selected' : ''}>Média</option>
          <option value="alta" ${cartItem.urgency === 'alta' ? 'selected' : ''}>Alta</option>
        </select>
      </div>
    </div>
      <div class="summary-row">
        <span>Subtotal</span>
        <strong>${formatPrice(lineTotal)}</strong>
      </div>
    `;
    cartItems.appendChild(entry);
  });

  document.getElementById('summaryCount').textContent = ids.length;
  document.getElementById('summaryQuantity').textContent = quantity;
  document.getElementById('summaryTotal').textContent = formatPrice(total);
}

let currentStep = 1;

const stepPanelIds = { 1: 'stepSelectItems', 2: 'stepNecessidade', 3: 'stepRevisar', 4: 'stepConfirmado' };

function updateStepsNav() {
  document.querySelectorAll('#stepsNav .step').forEach(el => {
    const step = Number(el.dataset.step);
    const isActive = step === currentStep;
    el.classList.toggle('step--active', isActive);
    el.classList.toggle('step--completed', step < currentStep);
    if (isActive) {
      el.setAttribute('aria-current', 'step');
    } else {
      el.removeAttribute('aria-current');
    }
  });
}

function goToStep(step) {
  if (step === 2 && !Object.keys(cart).length) {
    alert('Adicione pelo menos um material ao pedido antes de continuar.');
    return;
  }
  if (step === 3) {
    renderReview();
  }
  currentStep = step;
  Object.entries(stepPanelIds).forEach(([key, id]) => {
    document.getElementById(id).style.display = Number(key) === step ? '' : 'none';
  });
  updateStepsNav();
  window.scrollTo({ top: 0, behavior: 'smooth' });
  const activePanel = document.getElementById(stepPanelIds[step]);
  if (activePanel) activePanel.focus();
}

function renderReview() {
  const reviewItems = document.getElementById('reviewItems');
  const notes = document.getElementById('notes').value.trim();
  let total = 0;
  let quantity = 0;

  const rows = Object.keys(cart).map(id => {
    const productId = Number(id);
    const item = products.find(p => p.id === productId);
    const count = cart[id].quantity;
    const lineTotal = item.price * count;
    total += lineTotal;
    quantity += count;
    return `
      <div class="cart-item">
        <div class="cart-item-header">
          <div>
            <p class="cart-item-title">${item.name}</p>
            <p class="cart-item-meta">${count} ${item.unidade}(s) × ${formatPrice(item.price)}</p>
          </div>
          <strong>${formatPrice(lineTotal)}</strong>
        </div>
      </div>
    `;
  }).join('');

  reviewItems.innerHTML = rows || '<p class="muted-note">Nenhum item selecionado.</p>';
  document.getElementById('reviewSummary').innerHTML = `
    <div class="summary-row">
      <span>Itens</span>
      <strong>${Object.keys(cart).length}</strong>
    </div>
    <div class="summary-row">
      <span>Quantidade total</span>
      <strong>${quantity}</strong>
    </div>
    <div class="summary-row summary-total">
      <span>Total estimado</span>
      <strong>${formatPrice(total)}</strong>
    </div>
  `;
  document.getElementById('reviewNotes').textContent = notes ? `Justificativa: ${notes}` : 'Nenhuma justificativa informada.';
}

function confirmSubmitOrder() {
  submitOrder();
  goToStep(4);
}

function resetToStep1() {
  goToStep(1);
}

function renderPersonalization(user) {
  const topItemsList = document.getElementById('topItemsList');
  const recentOrdersList = document.getElementById('recentOrdersList');
  if (!topItemsList || !recentOrdersList || !user) return;

  const sectorOrders = getSavedOrders().filter(order => order.usuario && order.usuario.setor === user.setor);

  const counts = {};
  sectorOrders.forEach(order => {
    order.itens.forEach(item => {
      if (!counts[item.id]) counts[item.id] = { id: item.id, nome: item.nome, total: 0 };
      counts[item.id].total += item.quantidade;
    });
  });
  const topItems = Object.values(counts).sort((a, b) => b.total - a.total).slice(0, 5);
  topItemsList.innerHTML = topItems.length
    ? topItems.map(item => `<button type="button" class="chip chip-action" onclick="addToCart(${item.id})">${item.nome} <span class="chip-count">${item.total}x</span></button>`).join('')
    : '<p class="muted-note">Sua unidade ainda não fez pedidos.</p>';

  const recentOrders = sectorOrders.slice(-3).reverse();
  recentOrdersList.innerHTML = recentOrders.length
    ? recentOrders.map(order => `
        <div class="recent-order-item">
          <div>
            <strong>${order.data}</strong>
            <span class="muted-note">${order.itens.length} ${order.itens.length === 1 ? 'item' : 'itens'}</span>
          </div>
          <span class="status-pill">${order.status}</span>
        </div>
      `).join('')
    : '<p class="muted-note">Nenhuma solicitação recente da sua unidade.</p>';
}

function applyFilters() {
  const search = document.getElementById('searchBox').value.trim().toLowerCase();
  const category = document.getElementById('categorySelect').value;
  const sort = document.getElementById('sortSelect') ? document.getElementById('sortSelect').value : 'relevancia';
  const onlyFavorites = document.getElementById('favoritesToggle') ? document.getElementById('favoritesToggle').checked : false;
  const favorites = getFavorites();

  let filtered = products.filter(item => {
    const codigo = getProductCode(item).toLowerCase();
    const matchesSearch = search
      ? item.name.toLowerCase().includes(search) || item.description.toLowerCase().includes(search) || codigo.includes(search)
      : true;
    const matchesCategory = category === 'all' ? true : item.category === category;
    const matchesFavorite = onlyFavorites ? favorites.includes(item.id) : true;
    return matchesSearch && matchesCategory && matchesFavorite;
  });

  if (sort === 'popular') {
    const counts = getGlobalItemCounts();
    filtered = filtered.slice().sort((a, b) => (counts[b.id] || 0) - (counts[a.id] || 0));
  } else if (sort === 'recent') {
    const recency = getItemRecency();
    filtered = filtered.slice().sort((a, b) => (recency[b.id] ?? -1) - (recency[a.id] ?? -1));
  }

  renderProducts(filtered, favorites);
}

function submitOrder() {
  const ids = Object.keys(cart);
  if (!ids.length) {
    alert('Adicione pelo menos um material ao pedido antes de enviar.');
    return;
  }
  const notes = document.getElementById('notes').value.trim();
  const orderDate = new Date().toLocaleString('pt-BR');
  const items = ids.map(id => {
    const productId = Number(id);
    const item = products.find(p => p.id === productId);
    return {
      id: productId,
      nome: item.name,
      categoria: item.category,
      grupoNome: item.grupoNome,
      classeNome: item.classeNome,
      tipo: item.tipo,
      tipoDespesa: item.tipoDespesa,
      naturezaDespesa: item.naturezaDespesa,
      quantidade: cart[id].quantity,
      urgencia: cart[id].urgency,
      precoUnitario: item.price,
      subtotal: item.price * cart[id].quantity
    };
  });

  const select = document.getElementById('userSelect');
  const userId = Number(select.value);
  const user = users.find(item => item.id === userId) || users[0];

  const savedOrders = getSavedOrders();
  savedOrders.push({
    data: orderDate,
    status: 'DFD Registrado',
    observacoes: notes,
    usuario: {
      id: user.id,
      nome: user.nome,
      matricula: user.matricula,
      setor: user.setor
    },
    itens: items
  });
  saveOrders(savedOrders);

  console.log('Pedidos armazenados no localStorage:', savedOrders);
  Object.keys(cart).forEach(key => delete cart[key]);
  renderCart();
  document.getElementById('notes').value = '';
  renderPersonalization(user);
}

applyFilters();
renderCart();
populateUserSelect();
