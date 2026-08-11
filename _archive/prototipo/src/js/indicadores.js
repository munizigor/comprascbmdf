// Indicadores de sucesso do produto.
//
// Todos os cinco KPIs são calculados a partir de duas fontes que só passaram a
// existir nas fases anteriores: a trilha de auditoria (order.historico) e as
// fotografias congeladas dos ciclos do PCA (cbmdf_pca_ciclos).
//
// Regra de cobertura: pedidos cujo histórico é migrado ("histórico anterior
// indisponível") ficam FORA dos cálculos de tempo, e o número de excluídos é
// declarado no rodapé. Um indicador que mistura dado real com dado ausente
// mede a própria lacuna, não o processo — e a cobertura do dado é parte do
// produto, não uma nota de rodapé técnica.

const META_LEAD_TIME_DIAS = 200;      // soma dos SLAs das 6 macro-etapas
const META_SLA_PERCENTUAL = 80;
const META_DESVIO_ADERENCIA = 15;
const META_URGENCIA_PERCENTUAL = 10;
const META_URGENCIA_SETOR = 20;
const META_ADOCAO_UNIDADES = 90;

/* ---------- cobertura do dado ---------- */

function getCobertura(orders) {
  const lista = orders || getSavedOrders();
  const confiaveis = lista.filter(temHistoricoConfiavel);
  return {
    total: lista.length,
    confiaveis: confiaveis.length,
    excluidos: lista.length - confiaveis.length,
    ordens: confiaveis
  };
}

/* ---------- KPI 1 — tempo médio de tramitação ---------- */

function getDataEntrega(order) {
  const entrada = getHistorico(order).find(item => item.para === 'Pedido Entregue');
  return entrada ? new Date(entrada.em) : null;
}

function computeLeadTime(orders) {
  const { ordens } = getCobertura(orders);
  const entregues = ordens.filter(order => order.status === 'Pedido Entregue');

  const tempos = entregues.map(order => {
    const fim = getDataEntrega(order);
    const inicio = new Date(order.criadoEm || getHistorico(order)[0]?.em);
    return fim && inicio ? diffEmDias(inicio, fim) : null;
  }).filter(dias => dias !== null);

  if (!tempos.length) {
    return { reportavel: false, motivo: 'Nenhum pedido entregue com trilha completa.', amostra: 0 };
  }

  const media = tempos.reduce((soma, dias) => soma + dias, 0) / tempos.length;
  const ordenados = tempos.slice().sort((a, b) => a - b);
  const meio = Math.floor(ordenados.length / 2);

  return {
    reportavel: true,
    amostra: tempos.length,
    media: Math.round(media),
    mediana: ordenados.length % 2 ? ordenados[meio] : Math.round((ordenados[meio - 1] + ordenados[meio]) / 2),
    pior: ordenados[ordenados.length - 1],
    melhor: ordenados[0],
    dentroDaMeta: media <= META_LEAD_TIME_DIAS
  };
}

/* ---------- KPI 2 — aderência ao SLA por macro-etapa ---------- */

// Uma "passagem" é o período em que o pedido esteve numa macro-etapa. Etapas
// ainda em curso contam com o tempo decorrido até hoje: um pedido parado há
// 110 dias numa etapa de 45 já estourou o SLA, e omiti-lo maquiaria o número.
function buildPassagensDeEtapa(order) {
  const historico = getHistorico(order);
  const passagens = [];
  let etapaAtual = null;
  let entrada = null;

  historico.forEach(item => {
    const etapa = getStatusStage(item.para);
    if (etapa === etapaAtual) return;
    if (etapaAtual !== null && entrada) {
      passagens.push({ etapa: etapaAtual, dias: diffEmDias(entrada, new Date(item.em)), emCurso: false });
    }
    etapaAtual = etapa;
    entrada = new Date(item.em);
  });

  if (etapaAtual !== null && entrada && order.status !== 'Pedido Entregue') {
    passagens.push({ etapa: etapaAtual, dias: diffEmDias(entrada, new Date()), emCurso: true });
  }

  return passagens;
}

function computeAderenciaSla(orders) {
  const { ordens } = getCobertura(orders);
  const porEtapa = {};
  let total = 0;
  let dentro = 0;

  ordens.forEach(order => {
    buildPassagensDeEtapa(order).forEach(passagem => {
      const sla = SLA_POR_ETAPA[passagem.etapa];
      if (!sla) return;

      if (!porEtapa[passagem.etapa]) {
        porEtapa[passagem.etapa] = { etapa: passagem.etapa, sla, total: 0, dentro: 0, somaDias: 0 };
      }

      const bucket = porEtapa[passagem.etapa];
      bucket.total += 1;
      bucket.somaDias += passagem.dias;
      total += 1;
      if (passagem.dias <= sla) {
        bucket.dentro += 1;
        dentro += 1;
      }
    });
  });

  const etapas = Object.values(porEtapa)
    .sort((a, b) => a.etapa - b.etapa)
    .map(item => ({
      ...item,
      label: STAGE_LABELS[item.etapa],
      percentual: item.total ? (item.dentro / item.total) * 100 : 0,
      mediaDias: item.total ? Math.round(item.somaDias / item.total) : 0
    }));

  if (!total) {
    return { reportavel: false, motivo: 'Nenhuma passagem de etapa com trilha completa.', etapas: [] };
  }

  const percentual = (dentro / total) * 100;
  return {
    reportavel: true,
    total,
    dentro,
    percentual,
    etapas,
    dentroDaMeta: percentual >= META_SLA_PERCENTUAL
  };
}

/* ---------- KPI 3 — aderência do planejado ao executado ---------- */

// Depende de um ciclo fechado: sem a fotografia congelada não existe
// denominador. O mundo anterior a este produto são planilhas dispersas, e
// declarar "não reportável" é mais honesto do que inventar uma linha de base.
function computeAderenciaPlanejado(orders) {
  const ciclos = typeof getCiclos === 'function' ? getCiclos() : [];
  const fechados = ciclos.filter(ciclo => ciclo.status === 'fechado');

  if (!fechados.length) {
    return {
      reportavel: false,
      motivo: 'Não reportável no 1º ciclo: nenhum ciclo do PCA foi fechado ainda. O indicador exige uma fotografia congelada como denominador.'
    };
  }

  const ciclo = fechados[fechados.length - 1];
  const lista = orders || getSavedOrders();

  let planejado = 0;
  let executado = 0;
  const itens = ciclo.fotografia.map(foto => {
    const order = findOrderById(lista, foto.protocolo);
    const avancou = order ? getStatusFlags(order.status).includeInComprometido : false;
    const valorExecutado = avancou ? getOrderTotal(order) : 0;
    planejado += toAmount(foto.valor);
    executado += valorExecutado;
    return {
      protocolo: foto.protocolo,
      setor: foto.setor,
      planejado: toAmount(foto.valor),
      executado: valorExecutado,
      statusAtual: order ? order.status : 'pedido não encontrado'
    };
  });

  const desvio = planejado > 0 ? (Math.abs(planejado - executado) / planejado) * 100 : 0;

  // Um ciclo recém-fechado tem desvio próximo de 100% por construção: a
  // fotografia congela demandas que ainda não foram executadas. Cobrar a meta
  // nesse momento julgaria o ciclo antes de ele acontecer, então o indicador é
  // exibido com os números, mas sem veredicto, até completar um quadrimestre.
  const diasDesdeFechamento = diffEmDias(new Date(ciclo.fechadoEm), new Date());
  const emMaturacao = diasDesdeFechamento < 120;

  return {
    reportavel: true,
    ciclo: ciclo.rotulo,
    cicloId: ciclo.id,
    fechadoEm: ciclo.fechadoEm,
    diasDesdeFechamento,
    emMaturacao,
    planejado,
    executado,
    desvio,
    itens,
    dentroDaMeta: !emMaturacao && desvio <= META_DESVIO_ADERENCIA
  };
}

/* ---------- KPI 4 — contratações por urgência ---------- */

function computeUrgenciaKpi(orders) {
  if (typeof getResumoUrgencia !== 'function') {
    return { reportavel: false, motivo: 'Módulo de governança não carregado.' };
  }

  const resumo = getResumoUrgencia(orders);
  if (!resumo.total) {
    return { reportavel: false, motivo: 'Nenhum valor contratado para medir no período.' };
  }

  return {
    reportavel: true,
    percentual: resumo.percentual,
    valor: resumo.urgencia,
    total: resumo.total,
    setores: resumo.setores,
    acimaDoLimite: resumo.acimaDoLimite,
    dentroDaMeta: resumo.percentual <= META_URGENCIA_PERCENTUAL && !resumo.acimaDoLimite.length
  };
}

/* ---------- KPI 5 — adoção pelas unidades ---------- */

function computeAdocao(orders) {
  const lista = orders || getSavedOrders();
  const universo = Array.from(new Set(users.map(user => user.setor)));
  const comPedido = new Set(lista.map(order => order?.usuario?.setor).filter(Boolean));

  const ativas = universo.filter(setor => comPedido.has(setor));
  const percentual = universo.length ? (ativas.length / universo.length) * 100 : 0;

  return {
    reportavel: true,
    universo: universo.length,
    ativas: ativas.length,
    semPedido: universo.filter(setor => !comPedido.has(setor)),
    percentual,
    dentroDaMeta: percentual >= META_ADOCAO_UNIDADES,
    // A segunda metade da meta (≥70% do valor institucional) exige o total
    // empenhado pelo CBMDF, que só vem da integração com o SIAFI.
    valorReportavel: false
  };
}

/* ---------- renderização ---------- */

function kpiCardHtml({ titulo, definicao, atual, baseline, meta, prazo, nivel, detalhe, rodape }) {
  return `
    <article class="kpi-card kpi-card--${nivel}">
      <header class="kpi-card-head">
        <h3>${escapeHtml(titulo)}</h3>
        <p class="kpi-definicao">${escapeHtml(definicao)}</p>
      </header>
      <div class="kpi-trio">
        <div class="kpi-trio-item kpi-trio-item--atual">
          <span class="kpi-trio-label">Valor atual</span>
          <strong>${atual}</strong>
        </div>
        <div class="kpi-trio-item">
          <span class="kpi-trio-label">Linha de base</span>
          <strong>${escapeHtml(baseline)}</strong>
        </div>
        <div class="kpi-trio-item">
          <span class="kpi-trio-label">Meta · ${escapeHtml(prazo)}</span>
          <strong>${escapeHtml(meta)}</strong>
        </div>
      </div>
      ${detalhe || ''}
      ${rodape ? `<p class="kpi-rodape">${rodape}</p>` : ''}
    </article>`;
}

function nivelDoKpi(resultado) {
  if (!resultado.reportavel || resultado.emMaturacao) return 'indisponivel';
  return resultado.dentroDaMeta ? 'ok' : 'atencao';
}

function renderKpiLeadTime(container) {
  const r = computeLeadTime();
  const detalhe = r.reportavel
    ? `<div class="kpi-detalhe">
         <span>Mediana: <strong>${r.mediana} dias</strong></span>
         <span>Melhor: <strong>${r.melhor} dias</strong></span>
         <span>Pior: <strong>${r.pior} dias</strong></span>
       </div>`
    : `<p class="kpi-indisponivel">${escapeHtml(r.motivo)}</p>`;

  container.insertAdjacentHTML('beforeend', kpiCardHtml({
    titulo: '1. Tempo médio de tramitação',
    definicao: 'Dias entre o registro do DFD e o status "Pedido Entregue".',
    atual: r.reportavel ? `${r.media} dias` : '—',
    baseline: 'amostra retrospectiva do SEI',
    meta: `≤ ${META_LEAD_TIME_DIAS} dias`,
    prazo: '12 meses',
    nivel: nivelDoKpi(r),
    detalhe,
    rodape: r.reportavel ? `Amostra: ${r.amostra} ${r.amostra === 1 ? 'pedido entregue' : 'pedidos entregues'} com trilha completa.` : ''
  }));
}

function renderKpiSla(container) {
  const r = computeAderenciaSla();
  const detalhe = r.reportavel
    ? `<div class="table-scroll">
         <table class="report-table">
           <thead><tr><th>Macro-etapa</th><th>SLA</th><th>Média</th><th>Passagens</th><th>Dentro do SLA</th></tr></thead>
           <tbody>${r.etapas.map(e => `
             <tr>
               <td>${escapeHtml(e.label)}</td>
               <td>${e.sla} d</td>
               <td>${e.mediaDias} d</td>
               <td>${e.dentro} de ${e.total}</td>
               <td><span class="sla-pill sla-pill--${e.percentual >= META_SLA_PERCENTUAL ? 'ok' : e.percentual >= 50 ? 'atencao' : 'excedido'}">${e.percentual.toFixed(0)}%</span></td>
             </tr>`).join('')}</tbody>
         </table>
       </div>`
    : `<p class="kpi-indisponivel">${escapeHtml(r.motivo)}</p>`;

  container.insertAdjacentHTML('beforeend', kpiCardHtml({
    titulo: '2. Cumprimento do SLA por macro-etapa',
    definicao: 'Percentual das passagens por etapa concluídas dentro do prazo definido na seção 8.1.',
    atual: r.reportavel ? `${r.percentual.toFixed(1)}%` : '—',
    baseline: '0% (não mensurável antes da trilha)',
    meta: `≥ ${META_SLA_PERCENTUAL}%`,
    prazo: '12 meses',
    nivel: nivelDoKpi(r),
    detalhe,
    rodape: r.reportavel ? `Marcos intermediários: 50% em 3 meses, 65% em 6 meses. Base: ${r.total} passagens de etapa.` : ''
  }));
}

function renderKpiAderencia(container) {
  const r = computeAderenciaPlanejado();

  const maturacao = r.reportavel && r.emMaturacao
    ? `<p class="kpi-indisponivel">Ciclo fechado há ${r.diasDesdeFechamento} ${r.diasDesdeFechamento === 1 ? 'dia' : 'dias'}: a fotografia congela demandas que ainda não foram executadas, então o desvio começa próximo de 100% por construção. O indicador só é confrontado com a meta após um quadrimestre de execução.</p>`
    : '';

  const detalhe = r.reportavel
    ? `${maturacao}
       <div class="kpi-detalhe">
         <span>Planejado: <strong>${formatPrice(r.planejado)}</strong></span>
         <span>Comprometido: <strong>${formatPrice(r.executado)}</strong></span>
         <span>Ciclo: <strong>${escapeHtml(r.ciclo)}</strong></span>
       </div>`
    : `<p class="kpi-indisponivel">${escapeHtml(r.motivo)}</p>`;

  container.insertAdjacentHTML('beforeend', kpiCardHtml({
    titulo: '3. Aderência do planejado ao executado',
    definicao: 'Desvio entre a fotografia congelada no fechamento do ciclo e o valor efetivamente comprometido.',
    atual: !r.reportavel ? 'não reportável' : r.emMaturacao ? `${r.desvio.toFixed(1)}% *` : `${r.desvio.toFixed(1)}%`,
    baseline: '1º ciclo fechado',
    meta: `desvio ≤ ${META_DESVIO_ADERENCIA}%`,
    prazo: '2º exercício',
    nivel: nivelDoKpi(r),
    detalhe,
    rodape: r.reportavel ? `Fotografia de ${escapeHtml(formatDateTime(r.fechadoEm))} · ${r.itens.length} ${r.itens.length === 1 ? 'pedido' : 'pedidos'}.` : ''
  }));
}

function renderKpiUrgencia(container) {
  const r = computeUrgenciaKpi();
  const detalhe = r.reportavel
    ? `<div class="table-scroll">
         <table class="report-table">
           <thead><tr><th>Setor</th><th>Valor total</th><th>Por urgência</th><th>%</th></tr></thead>
           <tbody>${r.setores.map(s => `
             <tr>
               <td>${escapeHtml(s.setor)}</td>
               <td>${formatPrice(s.total)}</td>
               <td>${formatPrice(s.urgencia)}</td>
               <td><span class="sla-pill sla-pill--${s.percentual > META_URGENCIA_SETOR ? 'excedido' : s.percentual > META_URGENCIA_PERCENTUAL ? 'atencao' : 'ok'}">${s.percentual.toFixed(1)}%</span></td>
             </tr>`).join('')}</tbody>
         </table>
       </div>`
    : `<p class="kpi-indisponivel">${escapeHtml(r.motivo)}</p>`;

  const alerta = r.reportavel && r.acimaDoLimite.length
    ? `<div class="planning-alert planning-alert--danger">${escapeHtml(r.acimaDoLimite.map(s => s.setor).join(', '))} ${r.acimaDoLimite.length === 1 ? 'está' : 'estão'} acima do limite de ${META_URGENCIA_SETOR}% por setor.</div>`
    : '';

  container.insertAdjacentHTML('beforeend', kpiCardHtml({
    titulo: '4. Contratações por urgência',
    definicao: 'Percentual do valor contratado que entrou fora da fila, por inclusão de urgência.',
    atual: r.reportavel ? `${r.percentual.toFixed(1)}%` : '—',
    baseline: 'dispensas emergenciais no PNCP (24 meses)',
    meta: `≤ ${META_URGENCIA_PERCENTUAL}% do ciclo; nenhum setor > ${META_URGENCIA_SETOR}%`,
    prazo: '18 meses',
    nivel: nivelDoKpi(r),
    detalhe: alerta + detalhe
  }));
}

function renderKpiAdocao(container) {
  const r = computeAdocao();
  const detalhe = `
    <div class="kpi-detalhe">
      <span>Unidades ativas: <strong>${r.ativas} de ${r.universo}</strong></span>
      ${r.semPedido.length ? `<span>Sem pedidos: <strong>${escapeHtml(r.semPedido.join(', '))}</strong></span>` : '<span>Todas as unidades registraram pedidos.</span>'}
    </div>`;

  container.insertAdjacentHTML('beforeend', kpiCardHtml({
    titulo: '5. Adoção pelas unidades',
    definicao: 'Percentual das unidades do CBMDF que registraram ao menos um pedido na plataforma.',
    atual: `${r.percentual.toFixed(0)}%`,
    baseline: '0%',
    meta: `≥ ${META_ADOCAO_UNIDADES}% das unidades`,
    prazo: '12 meses',
    nivel: nivelDoKpi(r),
    detalhe,
    rodape: 'A segunda metade da meta (≥ 70% do valor institucional) depende da integração com o SIAFI e <strong>não é calculável</strong> a partir do dado da plataforma.'
  }));
}

function renderRodapeMetodologico() {
  const node = document.getElementById('coberturaRodape');
  if (!node) return;

  const cobertura = getCobertura();
  const percentual = cobertura.total ? (cobertura.confiaveis / cobertura.total) * 100 : 0;

  node.innerHTML = `
    <h3>Cobertura do dado</h3>
    <p>
      Os indicadores de tempo (1 e 2) usam <strong>${cobertura.confiaveis} de ${cobertura.total}</strong>
      ${cobertura.total === 1 ? 'pedido' : 'pedidos'} (${percentual.toFixed(0)}% da base).
      <strong>${cobertura.excluidos}</strong>
      ${cobertura.excluidos === 1 ? 'pedido foi excluído do cálculo por histórico migrado' : 'pedidos foram excluídos do cálculo por histórico migrado'} —
      registros anteriores à trilha de auditoria, cujas datas intermediárias não existem e não foram fabricadas.
    </p>
    <p class="muted-note">
      À medida que a base migrada é substituída por pedidos tramitados na plataforma, a cobertura tende a 100%
      e os indicadores ganham precisão. Declarar essa cobertura é parte do indicador: uma média calculada sobre
      metade da base não significa o mesmo que uma calculada sobre toda ela.
    </p>`;
}

function renderIndicadoresPage() {
  const container = document.getElementById('kpiContainer');
  if (!container) return;

  container.innerHTML = '';
  renderKpiLeadTime(container);
  renderKpiSla(container);
  renderKpiAderencia(container);
  renderKpiUrgencia(container);
  renderKpiAdocao(container);
  renderRodapeMetodologico();
}

function initIndicadoresPage() {
  if (!document.getElementById('kpiContainer')) return;
  if (!guardPage(['gestor', 'compras'])) return;
  renderIndicadoresPage();
}

document.addEventListener('DOMContentLoaded', initIndicadoresPage);
