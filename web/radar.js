/* Radar de Vigência — renderizador.
   Toda a regra de negócio (faixas, dias, alerta de valor) já veio calculada em
   data/radar_vigencia.json por tools/pncp/radar.py. Aqui só se desenha e filtra. */
(function () {
  'use strict';

  var FONTE = '../data/radar_vigencia.json';
  var ORDEM = ['vencido', '0-90', '91-180', '181-365', '>365', 'indefinido'];
  var ROTULO = {
    'vencido': 'vencido',
    '0-90': 'até 90 dias',
    '91-180': '91 a 180 dias',
    '181-365': '181 a 365 dias',
    '>365': 'mais de 1 ano',
    'indefinido': 'sem data'
  };
  var DIAS_DADO_VELHO = 7;

  function esc(s) {
    return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }

  function brl(v) {
    if (v == null) return '—';
    return v.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  }

  function dataBr(iso) {
    if (!iso) return '—';
    var p = iso.split('-');
    return p[2] + '/' + p[1] + '/' + p[0];
  }

  function textoDias(d) {
    if (d == null) return '—';
    if (d < 0) return 'há ' + Math.abs(d) + 'd';
    if (d === 0) return 'hoje';
    return 'em ' + d + 'd';
  }

  /* ---------- renderização ---------- */

  function linha(item, mostrarValor) {
    var id = item.ano && item.sequencial ? item.ano + '/' + item.sequencial : (item.controle_pncp || '');
    var objeto = item.objeto || '(sem descrição)';
    var titulo = item.url
      ? '<a href="' + esc(item.url) + '" target="_blank" rel="noopener">' + esc(objeto) + '</a>'
      : esc(objeto);

    var celulaValor = '';
    if (mostrarValor) {
      var alerta = '';
      if (item.alerta_valor === 'replicado') {
        alerta = '<span class="alerta" data-tipo="replicado">valor replicado no PNCP</span>';
      } else if (item.alerta_valor === 'sem_valor') {
        alerta = '<span class="alerta">sem valor definido</span>';
      }
      var v = item.alerta_valor === 'sem_valor' ? '—' : brl(item.valor);
      celulaValor = '<td class="num">' + v + alerta + '</td>';
    }

    return '<tr data-faixa="' + esc(item.faixa) + '">' +
      '<td class="num">' + dataBr(item.fim_vigencia) + '</td>' +
      '<td class="num">' + textoDias(item.dias) + '</td>' +
      '<td><span class="badge" data-faixa="' + esc(item.faixa) + '">' + esc(ROTULO[item.faixa] || item.faixa) + '</span></td>' +
      '<td class="obj">' + titulo + '<span class="id">' + esc(id) + '</span></td>' +
      celulaValor +
      '</tr>';
  }

  function chips(faixas) {
    return ORDEM.filter(function (f) { return faixas[f] > 0; }).map(function (f) {
      return '<button class="chip" type="button" data-faixa="' + f + '" aria-pressed="false">' +
        '<span class="n">' + faixas[f] + '</span> ' + esc(ROTULO[f]) + '</button>';
    }).join('');
  }

  function painel(alvo, bloco, mostrarValor) {
    var raiz = document.getElementById(alvo);
    raiz.querySelector('[data-slot="count"]').textContent = bloco.total + ' vigentes';
    raiz.querySelector('[data-slot="faixas"]').innerHTML = chips(bloco.faixas);

    var corpo = raiz.querySelector('tbody');
    corpo.innerHTML = bloco.itens.map(function (i) { return linha(i, mostrarValor); }).join('');

    ligarFiltro(raiz, corpo);
  }

  /* Filtro por faixa: alterna o chip e esconde as linhas das outras faixas. */
  function ligarFiltro(raiz, corpo) {
    var ativa = null;
    raiz.querySelector('[data-slot="faixas"]').addEventListener('click', function (ev) {
      var chip = ev.target.closest('.chip');
      if (!chip) return;

      ativa = (ativa === chip.dataset.faixa) ? null : chip.dataset.faixa;

      raiz.querySelectorAll('.chip').forEach(function (c) {
        c.setAttribute('aria-pressed', String(c.dataset.faixa === ativa));
      });

      var visiveis = 0;
      corpo.querySelectorAll('tr[data-faixa]').forEach(function (tr) {
        var mostra = !ativa || tr.dataset.faixa === ativa;
        tr.hidden = !mostra;
        if (mostra) visiveis++;
      });

      var vazio = raiz.querySelector('[data-slot="vazio"]');
      if (vazio) vazio.hidden = visiveis > 0;
    });
  }

  function cabecalho(dados) {
    document.getElementById('gerado').textContent = dataBr(dados.gerado_em);

    // floor, não round: às 19h do próprio dia a fração arredondaria para "há 1 dia"
    var idade = Math.floor((Date.now() - Date.parse(dados.gerado_em + 'T00:00:00')) / 86400000);
    var aviso = document.getElementById('idade');
    if (idade >= DIAS_DADO_VELHO) {
      aviso.textContent = '(há ' + idade + ' dias — rode gerar_radar.py)';
      aviso.className = 'stale';
    } else {
      aviso.textContent = idade <= 0 ? '(hoje)' : '(há ' + idade + (idade === 1 ? ' dia)' : ' dias)');
    }

    if (dados.fonte) {
      document.getElementById('fonte').textContent =
        'UASG ' + dados.fonte.uasg + ' · ' + dados.fonte.orgao;
    }
  }

  fetch(FONTE)
    .then(function (r) {
      if (!r.ok) throw new Error('HTTP ' + r.status);
      return r.json();
    })
    .then(function (dados) {
      cabecalho(dados);
      // a busca do PNCP não devolve valor para atas — só contratos têm a coluna
      painel('atas', dados.atas, false);
      painel('contratos', dados.contratos, true);
    })
    .catch(function (erro) {
      document.getElementById('erro').innerHTML =
        '<div class="aviso"><b>Não foi possível carregar o radar.</b> ' + esc(erro.message) +
        '. Confirme que <code>data/radar_vigencia.json</code> existe — gere com ' +
        '<code>python tools/pncp/gerar_radar.py</code>. Se abriu o arquivo direto pelo disco, ' +
        'o navegador pode bloquear a leitura: sirva a pasta com ' +
        '<code>python -m http.server</code>.</div>';
    });
})();
