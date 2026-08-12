/* Saúde do PCA — renderizador.
   Percentuais, agrupamentos, lacunas e o alerta de concentração já vieram
   calculados em data/saude_pca.json por tools/pgc/saude.py. Aqui só se desenha,
   se troca de ano e se filtra por área. */
(function () {
  'use strict';

  var FONTE = '../data/saude_pca.json';
  var DIAS_DADO_VELHO = 30;   // o PCA muda por semana, não por dia
  var ALERTA_COMPLETUDE = 70; // abaixo disso o campo está mais vazio que cheio
  var GRAVE_COMPLETUDE = 30;

  var ROTULO_CAMPO = {
    area: 'Área técnica', objeto: 'Objeto',
    valor: 'Valor estimado', necessidade: 'Necessidade'
  };

  function esc(s) {
    return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }

  function brl(v) {
    if (v == null) return '—';
    return v.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  }

  function brlCurto(v) {
    if (v == null) return '—';
    if (v >= 1e6) return 'R$ ' + (v / 1e6).toLocaleString('pt-BR', { maximumFractionDigits: 1 }) + ' mi';
    if (v >= 1e3) return 'R$ ' + (v / 1e3).toLocaleString('pt-BR', { maximumFractionDigits: 0 }) + ' mil';
    return brl(v);
  }

  function dataBr(iso) {
    if (!iso) return '—';
    var p = iso.split('-');
    return p[2] + '/' + p[1] + '/' + p[0];
  }

  function tom(percentual) {
    if (percentual < GRAVE_COMPLETUDE) return 'grave';
    if (percentual < ALERTA_COMPLETUDE) return 'alerta';
    return 'bom';
  }

  /* ---------- blocos ---------- */

  function kpis(ano) {
    var v = ano.valores;
    var cartoes = [
      { rot: 'DFDs no ciclo', val: ano.total, pe: 'PCA ' + ano.ano_pca },
      {
        rot: 'Cascas vazias', val: ano.cascas,
        pe: ano.cascas_percentual + '% sem área, objeto ou valor',
        tom: tom(100 - ano.cascas_percentual)
      },
      {
        rot: 'Valor informado', val: brlCurto(v.total),
        pe: v.sem_valor + ' de ' + ano.total + ' DFDs sem valor',
        tom: v.concentrado ? 'alerta' : ''
      }
    ];

    if (v.concentrado && v.maior) {
      cartoes.push({
        rot: 'Concentração', val: v.maior.percentual + '%',
        pe: 'do total em um só DFD (nº ' + v.maior.numero + ')', tom: 'alerta'
      });
    }

    return cartoes.map(function (c) {
      return '<div class="kpi"' + (c.tom ? ' data-tom="' + c.tom + '"' : '') + '>' +
        '<span class="rot">' + esc(c.rot) + '</span>' +
        '<span class="val">' + esc(c.val) + '</span>' +
        '<span class="pe">' + esc(c.pe) + '</span></div>';
    }).join('');
  }

  function completude(dados) {
    return Object.keys(ROTULO_CAMPO).map(function (campo) {
      var c = dados[campo];
      if (!c) return '';
      return '<div class="barra" data-tom="' + tom(c.percentual) + '">' +
        '<span class="nome">' + esc(ROTULO_CAMPO[campo]) + '</span>' +
        '<span class="trilho"><span class="preenche" style="width:' + c.percentual + '%"></span></span>' +
        '<span class="n">' + c.percentual + '% <span aria-hidden="true">·</span> ' +
        c.preenchidos + '/' + c.total + '</span></div>';
    }).join('');
  }

  function listaStatus(status) {
    return status.map(function (s) {
      return '<li><span>' + esc(s.status) + '</span><span class="n">' + s.total + '</span></li>';
    }).join('');
  }

  function linhasAreas(areas) {
    return areas.map(function (a) {
      return '<tr><td>' + esc(a.area) + '</td>' +
        '<td class="num">' + a.total + '</td>' +
        '<td class="num">' + (a.cascas || '—') + '</td>' +
        '<td class="num">' + (a.valor ? brl(a.valor) : '—') + '</td></tr>';
    }).join('');
  }

  function linhasResponsaveis(resp) {
    return resp.map(function (r) {
      return '<tr><td>' + esc(r.responsavel || '—') + '</td>' +
        '<td class="num">' + r.total + '</td></tr>';
    }).join('');
  }

  function linhaItem(item, maiorNumero) {
    var objeto = item.objeto
      ? esc(item.objeto)
      : '<span class="casca">(sem objeto informado)</span>';
    var marca = item.numero === maiorNumero
      ? '<span class="marca-maior">maior valor do ciclo</span>' : '';
    var campos = '<b>' + '●'.repeat(item.preenchidos) + '</b>' +
      '○'.repeat(item.essenciais - item.preenchidos);

    return '<tr data-area="' + esc(item.area) + '" data-casca="' + item.casca + '">' +
      '<td class="num">' + esc(item.numero) + '</td>' +
      '<td>' + esc(item.status) + '</td>' +
      '<td>' + esc(item.area) + '</td>' +
      '<td class="obj' + (item.objeto ? '' : ' casca') + '">' + objeto + marca + '</td>' +
      '<td>' + esc(item.responsavel || '—') + '</td>' +
      '<td class="num">' + (item.valor == null ? '—' : brl(item.valor)) + '</td>' +
      '<td class="campos" title="' + item.preenchidos + ' de ' + item.essenciais +
      ' campos essenciais">' + campos + '</td></tr>';
  }

  function chipsArea(areas) {
    return areas.map(function (a) {
      return '<button class="chip" type="button" data-area="' + esc(a.area) + '" aria-pressed="false">' +
        '<span class="n">' + a.total + '</span> ' + esc(a.area) + '</button>';
    }).join('');
  }

  /* Filtro por área: mesma mecânica dos chips de faixa do radar. */
  function ligarFiltro() {
    var filtros = document.getElementById('filtros');
    var corpo = document.getElementById('itens');
    var vazio = document.getElementById('vazio');
    var ativa = null;

    filtros.onclick = function (ev) {
      var chip = ev.target.closest('.chip');
      if (!chip) return;

      ativa = (ativa === chip.dataset.area) ? null : chip.dataset.area;
      filtros.querySelectorAll('.chip').forEach(function (c) {
        c.setAttribute('aria-pressed', String(c.dataset.area === ativa));
      });

      var visiveis = 0;
      corpo.querySelectorAll('tr[data-area]').forEach(function (tr) {
        var mostra = !ativa || tr.dataset.area === ativa;
        tr.hidden = !mostra;
        if (mostra) visiveis++;
      });
      vazio.hidden = visiveis > 0;
    };
  }

  function textoNumeracao(n) {
    if (!n.presentes) return 'Sem DFDs neste ciclo.';
    if (!n.ausentes.length) {
      return 'Sequência completa de ' + n.menor + ' a ' + n.maior + ', sem lacunas.';
    }
    return 'A sequência vai de ' + n.menor + ' a ' + n.maior + ', mas só ' + n.presentes +
      ' números vieram neste extrato. Faltam ' + n.ausentes.length + ': ' +
      n.ausentes.join(', ') + '. Podem ser DFDs de outro ano de PCA, excluídos ou sigilosos — ' +
      'confirmar antes de ler isto como abandono.';
  }

  /* ---------- montagem ---------- */

  function desenharAno(ano) {
    var maior = ano.valores.maior ? ano.valores.maior.numero : null;

    document.getElementById('kpis').innerHTML = kpis(ano);
    document.getElementById('completude').innerHTML = completude(ano.completude);
    document.getElementById('status').innerHTML = listaStatus(ano.status);
    document.getElementById('fase').textContent =
      ano.itens.length ? 'fase: ' + ano.itens[0].fase : '—';

    document.getElementById('areas').innerHTML = linhasAreas(ano.areas);
    document.getElementById('areas-count').textContent = ano.areas.length + ' áreas';
    document.getElementById('responsaveis').innerHTML = linhasResponsaveis(ano.responsaveis);
    document.getElementById('resp-count').textContent = ano.responsaveis.length + ' pessoas';

    document.getElementById('itens').innerHTML = ano.itens.map(function (i) {
      return linhaItem(i, maior);
    }).join('');
    document.getElementById('itens-count').textContent = ano.total + ' documentos';
    document.getElementById('filtros').innerHTML = chipsArea(ano.areas);
    document.getElementById('vazio').hidden = true;

    document.getElementById('cobertura').textContent = ano.numeracao.cobertura + '% da sequência';
    document.getElementById('numeracao').textContent = textoNumeracao(ano.numeracao);

    var mortos = ano.campos_mortos || [];
    document.getElementById('mortos-count').textContent = mortos.length + ' campos';
    document.getElementById('mortos').textContent = mortos.length ? mortos.join(' · ') : 'Nenhum.';

    document.getElementById('painel').hidden = false;
  }

  function ligarAnos(anos) {
    var nav = document.getElementById('anos');
    if (anos.length < 2) return;

    nav.innerHTML = anos.map(function (a, i) {
      return '<button class="chip" type="button" data-i="' + i + '" aria-pressed="' +
        (i === anos.length - 1) + '">PCA ' + a.ano_pca +
        ' <span class="n">' + a.total + '</span></button>';
    }).join('');
    nav.hidden = false;

    nav.onclick = function (ev) {
      var chip = ev.target.closest('.chip');
      if (!chip) return;
      nav.querySelectorAll('.chip').forEach(function (c) {
        c.setAttribute('aria-pressed', String(c === chip));
      });
      desenharAno(anos[Number(chip.dataset.i)]);
    };
  }

  function cabecalho(dados) {
    document.getElementById('gerado').textContent = dataBr(dados.gerado_em);

    var idade = Math.floor((Date.now() - Date.parse(dados.gerado_em + 'T00:00:00')) / 86400000);
    var aviso = document.getElementById('idade');
    if (idade >= DIAS_DADO_VELHO) {
      aviso.textContent = '(há ' + idade + ' dias — rode gerar_saude.py)';
      aviso.className = 'stale';
    } else {
      aviso.textContent = idade <= 0 ? '(hoje)' : '(há ' + idade + (idade === 1 ? ' dia)' : ' dias)');
    }

    var itens = dados.anos.length ? dados.anos[0].itens : [];
    if (itens.length) {
      document.getElementById('fonte').textContent =
        'UASG ' + itens[0].uasg + ' · ' + itens[0].nome_uasg;
    }
  }

  fetch(FONTE)
    .then(function (r) {
      if (!r.ok) throw new Error('HTTP ' + r.status);
      return r.json();
    })
    .then(function (dados) {
      cabecalho(dados);
      if (!dados.anos.length) throw new Error('nenhum DFD no arquivo');
      ligarAnos(dados.anos);
      ligarFiltro();
      // o ciclo mais recente é o que está em jogo; os anteriores ficam no seletor
      desenharAno(dados.anos[dados.anos.length - 1]);
    })
    .catch(function (erro) {
      document.getElementById('erro').innerHTML =
        '<div class="aviso"><b>Não foi possível carregar o painel.</b> ' + esc(erro.message) +
        '. Confirme que <code>data/saude_pca.json</code> existe — gere com ' +
        '<code>python tools/pgc/gerar_saude.py</code>. Se abriu o arquivo direto pelo disco, ' +
        'o navegador pode bloquear a leitura: sirva a pasta com ' +
        '<code>python -m http.server</code>.</div>';
    });
})();
