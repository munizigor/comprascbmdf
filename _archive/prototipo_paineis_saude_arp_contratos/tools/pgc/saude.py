# -*- coding: utf-8 -*-
"""Regras puras do painel de saude do PCA.

Nenhuma funcao aqui faz I/O nem le o relogio: `gerado_em` e sempre parametro,
como em pncp/radar.py.

Duas responsabilidades, nesta ordem:

1. `sanear` — traduz o registro bruto do PGC para o vocabulario do dominio e
   descarta a PII. O CPF do operador (`loginOperacao`) morre aqui: nao existe
   caminho pelo qual ele chegue ao JSON versionado.
2. os agregadores — transformam a lista saneada nos indicadores que a pagina
   apenas renderiza.
"""

# campos do bruto que nunca saem daqui
CAMPOS_PII = ("loginOperacao",)

# o que precisa estar preenchido para um DFD ser util a quem consolida o PCA
CAMPOS_ESSENCIAIS = ("area", "objeto", "valor", "necessidade")

SEM_AREA = "(sem area informada)"

# a partir de que fatia um unico DFD domina o agregado a ponto de a soma
# deixar de descrever o conjunto — mesma logica do alerta de valor replicado
# do radar: numero que existe, mas nao significa o que aparenta
LIMIAR_CONCENTRACAO = 0.70


def _texto(valor):
    return (valor or "").strip()


def _percentual(parte, total):
    if not total:
        return 0.0
    return round(100.0 * parte / total, 1)


def _preenchido(registro, campo):
    """Um campo essencial conta como preenchido? `area` ausente vira rotulo."""
    valor = registro.get(campo)
    if campo == "area":
        return valor != SEM_AREA
    if isinstance(valor, str):
        return bool(valor.strip())
    return valor is not None


def sanear(bruto):
    """Converte um DFD bruto do PGC no registro que o painel consome."""
    registro = {
        "id": bruto.get("id"),
        "numero": bruto.get("numero"),
        "identificador": bruto.get("identificadorUnico"),
        "ano_pca": bruto.get("anoPCA"),
        "uasg": bruto.get("uasg"),
        "nome_uasg": _texto(bruto.get("nomeUasg")),
        "status": _texto(bruto.get("descricaoStatus")),
        "fase": _texto(bruto.get("descricaoFase")),
        "tipo": _texto(bruto.get("descricaoTipo")),
        "area": _texto(bruto.get("nomeArea")) or SEM_AREA,
        "objeto": _texto(bruto.get("objeto")),
        "necessidade": _texto(bruto.get("necessidade")),
        "valor": bruto.get("valor"),
        "responsavel": _texto(bruto.get("nomeLoginOperacao")),
        "tem_contratacao": bool(bruto.get("possuiContratacaoVinculada")),
        "tem_anexos": bool(bruto.get("temAnexos")),
    }
    preenchidos = sum(1 for c in CAMPOS_ESSENCIAIS if _preenchido(registro, c))
    registro["preenchidos"] = preenchidos
    registro["essenciais"] = len(CAMPOS_ESSENCIAIS)
    registro["casca"] = preenchidos == 0
    return registro


def completude(registros):
    """Quantos DFDs tem cada campo essencial preenchido."""
    total = len(registros)
    return {campo: {
        "preenchidos": sum(1 for r in registros if _preenchido(r, campo)),
        "total": total,
        "percentual": _percentual(sum(1 for r in registros if _preenchido(r, campo)), total),
    } for campo in CAMPOS_ESSENCIAIS}


def resumo_valores(registros):
    """Soma o que foi informado e denuncia quando um so DFD carrega o agregado."""
    com_valor = [r for r in registros if r.get("valor") is not None]
    total = sum(r["valor"] for r in com_valor)
    maior = max(com_valor, key=lambda r: r["valor"]) if com_valor else None
    fatia = (maior["valor"] / total) if maior and total else 0.0
    return {
        "total": total,
        "com_valor": len(com_valor),
        "sem_valor": len(registros) - len(com_valor),
        "maior": None if maior is None else {
            "numero": maior["numero"],
            "area": maior["area"],
            "objeto": maior["objeto"],
            "valor": maior["valor"],
            "percentual": _percentual(maior["valor"], total),
        },
        "concentrado": fatia >= LIMIAR_CONCENTRACAO,
    }


def numeracao(registros):
    """Lacunas na sequencia de DFDs — numero reservado que nao veio no lote."""
    numeros = sorted(r["numero"] for r in registros if r.get("numero") is not None)
    if not numeros:
        return {"menor": None, "maior": None, "presentes": 0, "ausentes": [], "cobertura": 0.0}
    faixa = range(numeros[0], numeros[-1] + 1)
    ausentes = [n for n in faixa if n not in set(numeros)]
    return {
        "menor": numeros[0],
        "maior": numeros[-1],
        "presentes": len(numeros),
        "ausentes": ausentes,
        "cobertura": _percentual(len(numeros), len(faixa)),
    }


def campos_mortos(brutos):
    """Campos que o PGC oferece e que chegam vazios em 100% dos registros.

    Recebe o bruto de proposito: e um diagnostico da origem, nao do saneado.
    """
    chaves = set()
    for b in brutos:
        chaves.update(b.keys())
    mortos = []
    for chave in sorted(chaves - set(CAMPOS_PII)):
        valores = [b.get(chave) for b in brutos]
        if all(v is None or v == "" or v == [] or v == {} for v in valores):
            mortos.append(chave)
    return mortos


def por_area(registros):
    """Concentracao por area tecnica; area ausente sempre por ultimo."""
    grupos = {}
    for r in registros:
        g = grupos.setdefault(r["area"], {"area": r["area"], "total": 0, "valor": 0.0, "cascas": 0})
        g["total"] += 1
        g["valor"] += r["valor"] or 0.0
        g["cascas"] += 1 if r["casca"] else 0
    return sorted(grupos.values(),
                  key=lambda g: (g["area"] == SEM_AREA, -g["valor"], -g["total"], g["area"]))


def _contagem(registros, campo, rotulo):
    grupos = {}
    for r in registros:
        grupos[r[campo]] = grupos.get(r[campo], 0) + 1
    return sorted(({rotulo: k, "total": v} for k, v in grupos.items()),
                  key=lambda g: (-g["total"], g[rotulo]))


def por_responsavel(registros):
    return _contagem(registros, "responsavel", "responsavel")


def por_status(registros):
    return _contagem(registros, "status", "status")


def _ano(brutos, ano_pca, registros):
    cascas = sum(1 for r in registros if r["casca"])
    return {
        "ano_pca": ano_pca,
        "total": len(registros),
        "cascas": cascas,
        "cascas_percentual": _percentual(cascas, len(registros)),
        "completude": completude(registros),
        "valores": resumo_valores(registros),
        "numeracao": numeracao(registros),
        "areas": por_area(registros),
        "responsaveis": por_responsavel(registros),
        "status": por_status(registros),
        "campos_mortos": campos_mortos(brutos),
        "itens": sorted(registros, key=lambda r: r["numero"] or 0),
    }


def dedupe(brutos):
    """Remove DFDs repetidos entre lotes, preservando a ordem de chegada.

    Coletas de anos diferentes se sobrepoem: o mesmo DFD pode vir em dois
    arquivos. Vence a ultima ocorrencia — e a mais recente do lote.
    """
    unicos = {}
    ordem = []
    soltos = []
    for bruto in brutos:
        ident = bruto.get("id")
        if ident is None:
            soltos.append(bruto)
            continue
        if ident not in unicos:
            ordem.append(ident)
        unicos[ident] = bruto
    return [unicos[i] for i in ordem] + soltos


def montar_painel(brutos, gerado_em):
    """Monta o painel completo, um bloco por ano de PCA, pronto para o JSON."""
    lotes = {}
    for bruto in brutos:
        lotes.setdefault(bruto.get("anoPCA"), []).append(bruto)
    anos = [_ano(lote, ano, [sanear(b) for b in lote])
            for ano, lote in sorted(lotes.items(), key=lambda kv: kv[0] or 0)]
    return {
        "gerado_em": gerado_em.isoformat(),
        "total": len(brutos),
        "anos": anos,
    }
