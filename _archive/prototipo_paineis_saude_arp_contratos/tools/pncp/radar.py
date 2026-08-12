# -*- coding: utf-8 -*-
"""Regras puras do radar de vigencia.

Nenhuma funcao aqui faz I/O nem le o relogio do sistema: `hoje` e sempre
parametro. E o que permite testar as fronteiras de faixa de forma deterministica.
"""
from datetime import date

# fronteiras em dias, do vencimento mais proximo ao mais distante
FAIXAS = (("0-90", 90), ("91-180", 180), ("181-365", 365))
ORDEM_FAIXAS = ("vencido", "0-90", "91-180", "181-365", ">365", "indefinido")

# a partir de quantas ocorrencias do mesmo valor consideramos replicacao;
# dois contratos de mesmo valor e coincidencia plausivel, tres ja nao e
MIN_OCORRENCIAS_REPLICACAO = 3

BASE_PORTAL = "https://pncp.gov.br/app"


def _para_data(valor):
    """Aceita 'AAAA-MM-DD' ou ISO com hora/fuso. Devolve date ou None."""
    if not valor:
        return None
    try:
        return date.fromisoformat(str(valor)[:10])
    except ValueError:
        return None


def dias_restantes(fim_vigencia, hoje):
    """Dias ate o vencimento. Negativo se ja venceu, None se nao ha data."""
    fim = _para_data(fim_vigencia)
    if fim is None:
        return None
    return (fim - hoje).days


def faixa_vencimento(fim_vigencia, hoje):
    """Classifica o vencimento na janela de acao correspondente."""
    dias = dias_restantes(fim_vigencia, hoje)
    if dias is None:
        return "indefinido"
    if dias < 0:
        return "vencido"
    for nome, limite in FAIXAS:
        if dias <= limite:
            return nome
    return ">365"


def valor_suspeito(valor, ocorrencias):
    """Sinaliza valores que o PNCP publica de forma nao somavel.

    'sem_valor'  -> ausente ou R$ 1,00 (credenciamento sem valor definido)
    'replicado'  -> mesmo valor repetido em varios contratos (valor do
                    credenciamento inteiro copiado em cada contrato individual)
    """
    if valor is None or valor <= 1.0:
        return "sem_valor"
    if ocorrencias >= MIN_OCORRENCIAS_REPLICACAO:
        return "replicado"
    return None


def _inteiro(valor):
    try:
        return int(valor)
    except (TypeError, ValueError):
        return None


def normalizar(bruto, hoje, ocorrencias_valor):
    """Converte um registro da busca do PNCP no formato que a pagina consome."""
    valor = bruto.get("valor_global")
    caminho = (bruto.get("item_url") or "").lstrip("/")
    return {
        "ano": _inteiro(bruto.get("ano")),
        "sequencial": _inteiro(bruto.get("numero_sequencial")),
        "controle_pncp": bruto.get("numero_controle_pncp"),
        "objeto": (bruto.get("description") or bruto.get("title") or "").strip(),
        "inicio_vigencia": (bruto.get("data_inicio_vigencia") or "")[:10] or None,
        "fim_vigencia": (bruto.get("data_fim_vigencia") or "")[:10] or None,
        "dias": dias_restantes(bruto.get("data_fim_vigencia"), hoje),
        "faixa": faixa_vencimento(bruto.get("data_fim_vigencia"), hoje),
        "valor": valor,
        "alerta_valor": valor_suspeito(valor, ocorrencias_valor.get(valor, 1)),
        "url": "%s/%s" % (BASE_PORTAL, caminho) if caminho else None,
    }


def _contar_valores(registros):
    """Quantas vezes cada valor global aparece — base para detectar replicacao."""
    ocorrencias = {}
    for r in registros:
        v = r.get("valor_global")
        if v is not None:
            ocorrencias[v] = ocorrencias.get(v, 0) + 1
    return ocorrencias


def _bloco(brutos, hoje):
    ocorrencias = _contar_valores(brutos)
    itens = [normalizar(b, hoje, ocorrencias) for b in brutos]
    # sem data de fim vai para o fim da lista, nao para o topo
    itens.sort(key=lambda i: (i["fim_vigencia"] is None, i["fim_vigencia"] or "",
                              i["sequencial"] or 0))
    faixas = {nome: 0 for nome in ORDEM_FAIXAS}
    for i in itens:
        faixas[i["faixa"]] += 1
    return {"total": len(itens), "faixas": faixas, "itens": itens}


def montar_radar(atas, contratos, hoje):
    """Monta o radar completo, pronto para serializar em JSON."""
    return {
        "gerado_em": hoje.isoformat(),
        "atas": _bloco(atas, hoje),
        "contratos": _bloco(contratos, hoje),
    }
