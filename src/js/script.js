const products = [
  {
    id: 1,
    name: 'Capacete de proteção tático',
    category: 'seguranca',
    description: 'Capacete resistente para operações de salvamento, combate a incêndio e manutenção.',
    price: 125.00,
    priority: 'alta',
    tipo: 'MATERIAL',
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
    grupoCodigo: '852',
    grupoNome: 'SERVIÇOS DE INVESTIGAÇÃO E SEGURANÇA',
    classeCodigo: '8529',
    classeNome: 'OUTROS SERVIÇOS DE SEGURANÇA',
    tipoDespesa: 'Custeio',
    naturezaDespesa: '3.3.90.39' // Outros Serviços de Terceiros - Pessoa Jurídica (Manutenção de Veículos)
  }
];

const users = [
  { id: 1, nome: 'Ana Beatriz', matricula: 'CBMDF-1023', setor: 'COMOP' },
  { id: 2, nome: 'Carlos Eduardo', matricula: 'CBMDF-1047', setor: 'CESMA' },
  { id: 3, nome: 'Fernanda Silva', matricula: 'CBMDF-1091', setor: 'DITIC' },
  { id: 4, nome: 'João Pedro', matricula: 'CBMDF-1108', setor: 'DIMAT' },
  { id: 5, nome: 'Maria Oliveira', matricula: 'CBMDF-1122', setor: 'COMAP' }
];

const cart = {};

function getSavedOrders() {
  const raw = localStorage.getItem('cbmdf_orders');
  return raw ? JSON.parse(raw) : [];
}

function saveOrders(orders) {
  localStorage.setItem('cbmdf_orders', JSON.stringify(orders));
}

function toggleMenu() {
  const dropdown = document.getElementById('menuDropdown');
  dropdown.style.display = dropdown.style.display === 'block' ? 'none' : 'block';
}

function closeMenu() {
  document.getElementById('menuDropdown').style.display = 'none';
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
  closeMenu();
}

document.addEventListener('click', event => {
  const dropdown = document.getElementById('menuDropdown');
  const button = document.getElementById('menuButton');
  if (!dropdown.contains(event.target) && !button.contains(event.target)) {
    closeMenu();
  }
});

function populateUserSelect() {
  const select = document.getElementById('userSelect');
  select.innerHTML = users.map(user => `<option value="${user.id}">${user.nome}</option>`).join('');
  renderUser();
}

function renderUser() {
  const select = document.getElementById('userSelect');
  const sector = document.getElementById('userSector');
  const userId = Number(select.value);
  const user = users.find(item => item.id === userId) || users[0];
  sector.textContent = `${user.setor}`;
}

function formatPrice(value) {
  return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}

function renderProducts(list) {
  const container = document.getElementById('products');
  container.innerHTML = '';
  if (!list.length) {
    container.innerHTML = '<p style="color: var(--muted);">Nenhum material encontrado. Ajuste a busca ou filtros.</p>';
    return;
  }
  list.forEach(item => {
    const card = document.createElement('div');
    card.className = 'card';
    card.innerHTML = `
      <div class="card-top">
        <div class="card-icon">${item.category.charAt(0).toUpperCase()}</div>
        <div>
          <h3 class="card-title">${item.name}</h3>
          <p class="card-subtitle">${item.category === 'escritorio' ? 'Escritório' : item.category === 'manutencao' ? 'Manutenção' : item.category === 'higiene' ? 'Higiene' : item.category === 'saude' ? 'Saúde' : 'Segurança'}</p>
        </div>
      </div>
      
      <p class="card-description">${item.description}</p>
      <div class="card-meta">
        <span class="chip">${item.tipo}</span>
        <span class="chip">${item.grupoNome} - ${item.classeNome}</span>
        <span class="chip">${item.tipoDespesa}</span>
      </div>
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
    cartItems.innerHTML = '<p style="color: var(--muted);">Seu carrinho está vazio. Adicione materiais para montar a requisição.</p>';
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

function applyFilters() {
  const search = document.getElementById('searchBox').value.trim().toLowerCase();
  const category = document.getElementById('categorySelect').value;

  const filtered = products.filter(item => {
    const matchesSearch = search ? item.name.toLowerCase().includes(search) || item.description.toLowerCase().includes(search) : true;
    const matchesCategory = category === 'all' ? true : item.category === category;
    return matchesSearch && matchesCategory;
  });

  renderProducts(filtered);
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
  alert('Pedido registrado.');
  Object.keys(cart).forEach(key => delete cart[key]);
  renderCart();
  document.getElementById('notes').value = '';
}

applyFilters();
renderCart();
populateUserSelect();
