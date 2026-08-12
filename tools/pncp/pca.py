# -*- coding: utf-8 -*-
"""Conversão de uma linha do Rol de Demandas em item do PCA do PNCP.

REGRAS PURAS: sem rede, sem disco, sem relógio. O ano é parâmetro — é o que
torna o teste determinístico.

A descrição é a regra mais delicada. O Rol traz textos de até 3.226 caracteres
que misturam nome do item, especificação técnica, embalagem e prazo de validade.
O PNCP aceita 2.048, mas um plano legível pede muito menos. A regra corta no
primeiro marcador estrutural ("Descrição:", "Características", "Medida:"), e só
recorre ao limite de caracteres quando o texto não tem marcador nenhum.

No fim de toda descrição entra a natureza de despesa, separada por " | ", para
que a exportação futura em CSV a recupere por posição, sem adivinhar.
"""
import calendar
import re

LIMITE_DESCRICAO_PADRAO = 250
LIMITE_DESCRICAO_API = 2048
LIMITE_UNIDADE = 255
SEPARADOR = " | "
UNIDADE_PADRAO = "Unidade"
TOLERANCIA_VALOR = 0.02

MESES = {
    "JANEIRO": 1, "FEVEREIRO": 2, "MARCO": 3, "MARÇO": 3, "ABRIL": 4,
    "MAIO": 5, "JUNHO": 6, "JULHO": 7, "AGOSTO": 8, "SETEMBRO": 9,
    "OUTUBRO": 10, "NOVEMBRO": 11, "DEZEMBRO": 12,
}

_ID_INTERNO = re.compile(r"^\(\s*ID[\s\-]*\d+\s*\)\s*[-–:]?\s*")

# o marcador pode vir precedido de "Demais", "contendo as seguintes", "com as"...
_MARCADOR = re.compile(
    r"(?:[,;.]\s*)?"
    r"(?:(?:demais|contendo|cont[ée]m|com|possui)\s+(?:as\s+|os\s+)?(?:seguintes\s+)?)?"
    r"(?:descri[çc][ãa]o|caracter[íi]sticas?|medida|unidade de fornecimento|"
    r"aplica[çc][ãa]o|composi[çc][ãa]o|especifica[çc][õo]es|prazo de validade|"
    r"forma de apresenta[çc][ãa]o)\b", re.I)

# preposição ou conectivo órfão no fim, resto do corte
_CAUDA = re.compile(
    r"\b(demais|contendo|cont[ée]m|com|de|da|do|das|dos|para|em|e|as|os|conforme|"
    r"seguintes|tipo|sendo|incluindo)\b[\s,:;.\-–]*$", re.I)

_MIN_CABECA = 8       # abaixo disso o corte no marcador deixaria o item sem nome
_FRACAO_FRONTEIRA = 0.25


def numero_br(texto):
    """"R$ 1.756,00" -> 1756.0. Devolve None quando não há número, e 0.0 quando
    o número é zero — a diferença entre ausência e zero importa no bloqueio."""
    if texto is None:
        return None
    limpo = re.sub(r"[^0-9,.\-]", "", str(texto).replace("R$", ""))
    if not re.search(r"\d", limpo):
        return None
    if "," in limpo:
        limpo = limpo.replace(".", "").replace(",", ".")
    try:
        return float(limpo)
    except ValueError:
        return None


def natureza_despesa(gnd):
    """Os 6 primeiros dígitos do GND: a natureza, sem o subitem."""
    gnd = (gnd or "").strip()
    return gnd[:6] if len(gnd) == 8 else ""


def elemento_despesa(gnd):
    gnd = (gnd or "").strip()
    return gnd[4:6] if len(gnd) == 8 else ""


def simplificar(texto, limite=LIMITE_DESCRICAO_PADRAO):
    """Reduz o texto do Rol ao que descreve o item."""
    corpo = re.sub(r"\s+", " ", texto or "").strip()
    corpo = _ID_INTERNO.sub("", corpo)

    marcador = _MARCADOR.search(corpo)
    if marcador and marcador.start() >= _MIN_CABECA:
        corpo = corpo[:marcador.start()]
    corpo = corpo.strip(" -–,;.:")

    if len(corpo) > limite:
        fronteira = max(corpo.rfind(sinal, 0, limite) for sinal in (". ", "; ", ", "))
        if fronteira >= max(_MIN_CABECA, limite * _FRACAO_FRONTEIRA):
            corpo = corpo[:fronteira]
        else:
            corpo = corpo[:limite].rsplit(" ", 1)[0]
        corpo = corpo.strip(" -–,;.:")

    anterior = None
    while corpo != anterior:
        anterior = corpo
        corpo = _CAUDA.sub("", corpo).strip(" -–,;.:")
    return corpo


def descricao(texto, gnd, limite=LIMITE_DESCRICAO_PADRAO):
    """Descrição simplificada seguida da natureza de despesa."""
    final = simplificar(texto, limite) + SEPARADOR + natureza_despesa(gnd)
    return final[:LIMITE_DESCRICAO_API]


def unidade_fornecimento(texto):
    """(unidade, pendência). Sem marcador na origem, assume o padrão e sinaliza."""
    achado = re.search(
        r"(?:medida|unidade de fornecimento|forma de fornecimento)\s*:\s*([^.;\n]{1,120})",
        texto or "", re.I)
    if not achado:
        return UNIDADE_PADRAO, True
    return achado.group(1).strip()[:LIMITE_UNIDADE], False


def data_desejada(mes, ano):
    """(ISO, pendência). O mês pretendido vira o último dia do mês."""
    numero = MESES.get(re.sub(r"\s+", " ", (mes or "")).strip().upper())
    if not numero:
        return "%d-12-31" % ano, True
    return "%d-%02d-%02d" % (ano, numero, calendar.monthrange(ano, numero)[1]), False


def bloqueio(linha):
    """Motivo pelo qual o item não pode ser publicado, ou None."""
    quantidade = numero_br(linha.get("QUANTIDADE"))
    unitario = numero_br(linha.get("VALOR UNITÁRIO"))
    total = numero_br(linha.get("VALOR TOTAL"))
    if total is None:
        return "valor total ausente"
    if quantidade is None:
        return "quantidade ausente"
    if unitario is None:
        return "valor unitário ausente"
    if total == 0 or quantidade == 0:
        return "valor zerado"
    return None


def converter(linha, numero, resolucao, ano, limite=LIMITE_DESCRICAO_PADRAO):
    """Linha do CSV + classificação resolvida -> (item do PNCP, pendências)."""
    pendencias = []

    unidade, sem_unidade = unidade_fornecimento(linha.get("DESCRIÇÃO DO OBJETO"))
    if sem_unidade:
        pendencias.append("unidade_fornecimento_ausente")

    data, sem_mes = data_desejada(
        linha.get("MÊS PRETENDIDO PARA A ENTREGA DA CONTRATAÇÃO"), ano)
    if sem_mes:
        pendencias.append("mes_ausente")

    if resolucao.get("sugerida"):
        pendencias.append("classe_sugerida")

    quantidade = numero_br(linha.get("QUANTIDADE"))
    unitario = numero_br(linha.get("VALOR UNITÁRIO"))
    total = numero_br(linha.get("VALOR TOTAL"))
    if None not in (quantidade, unitario, total):
        if abs(quantidade * unitario - total) > max(TOLERANCIA_VALOR, 0.01 * abs(total)):
            pendencias.append("valor_incoerente")
    if not natureza_despesa(linha.get("GND")):
        pendencias.append("natureza_ausente")

    item = {
        "numeroItem": numero,
        "categoriaItemPca": resolucao["categoria"],
        "descricao": descricao(linha.get("DESCRIÇÃO DO OBJETO"), linha.get("GND"), limite),
        "unidadeFornecimento": unidade,
        "quantidade": quantidade,
        "valorUnitario": unitario,
        "valorTotal": total,
        "valorOrcamentoExercicio": total,
        "unidadeRequisitante": (linha.get("DEMANDANTE") or "").strip(),
        "dataDesejada": data,
        "grupoContratacaoCodigo": resolucao.get("grupo_codigo"),
        "grupoContratacaoNome": resolucao.get("grupo_nome"),
        "catalogo": 1,
        "classificacaoCatalogo": resolucao["classificacao_catalogo"],
        "codigoItem": None,
        "classificacaoSuperiorCodigo": resolucao["classe"],
        "classificacaoSuperiorNome": resolucao["nome"][:LIMITE_UNIDADE],
        "pdmCodigo": None,
        "pdmDescricao": None,
    }
    return item, pendencias


def montar_plano(codigo_unidade, ano, pares, limite=LIMITE_DESCRICAO_PADRAO):
    """Numera de 1 a N dentro do plano e devolve o payload do POST /pca.

    A numeração é por plano: o mesmo item entra como 1 na 170394 e como 1 na
    170495 — são planos distintos no PNCP.
    """
    itens = [converter(linha, numero, resolucao, ano, limite)[0]
             for numero, (linha, resolucao) in enumerate(pares, start=1)]
    return {"codigoUnidade": codigo_unidade, "anoPca": ano, "itensPlano": itens}
