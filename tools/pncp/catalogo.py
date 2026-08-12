# -*- coding: utf-8 -*-
"""Classificação CATMAT/CATSER e numeração dos grupos de contratação.

REGRAS PURAS: nenhuma função aqui faz rede nem lê o relógio. O único I/O é
`carregar`, que lê as tabelas versionadas em data/referencia/ — e é chamado pelo
CLI, não pelas regras.

Duas coisas que o Rol de Demandas ensinou e estão codificadas aqui:

1. O elemento de despesa e o catálogo concordam: 30 e 52 são material (CATMAT),
   39 é serviço (CATSER), 51 é obra. Quando um código de classe existe nas duas
   tabelas, é o elemento que desempata.
2. O nome da classe vem sempre do catálogo oficial, nunca do texto do CSV. É o
   que permite perceber, olhando o plano publicado, que a classe não combina com
   o objeto.
"""
import json
import os
import re

# categorias do PNCP (GET /v1/categoriaItemPcas)
MATERIAL, SERVICO, OBRA, ENGENHARIA, TIC = 1, 2, 3, 4, 5

CATEGORIA_POR_ELEMENTO = {"30": MATERIAL, "52": MATERIAL, "39": SERVICO, "51": OBRA}

# Lei 14.133/2021, art. 6º, XII: obra é construção, reforma, fabricação,
# recuperação ou ampliação. Manutenção e conservação são serviço de engenharia,
# ainda que a despesa esteja empenhada em 4490.51.
MANUTENCAO = re.compile(r"manuten[çc][ãa]o|conserva[çc][ãa]o|reparo|"
                        r"assist[êe]ncia t[ée]cnica", re.I)

# Os 22 itens que chegam sem classe utilizável. A sugestão é explícita e vira
# pendência no relatório — a área confirma ou corrige depois por PATCH.
SUGESTAO_POR_CLASSE = {
    "-7": ("5412", "CATSER", OBRA),      # obras da COMAP, GND 4490.51
    "7099": ("7010", "CATMAT", TIC),     # equipamentos e soluções de TI da DITIC
}

SUGESTAO_POR_DESCRICAO = (
    (re.compile(r"divis[óo]ria", re.I), ("5680", "CATMAT", MATERIAL)),
    (re.compile(r"\bm[óo]ve(l|is)\b|mesa|poltrona|cadeira|arm[áa]rio|estante", re.I),
     ("7110", "CATMAT", MATERIAL)),
    (re.compile(r"caixa|organizador|contentor", re.I), ("7195", "CATMAT", MATERIAL)),
)

LIMITE_NOME = 255


def carregar(diretorio):
    """Lê as tabelas de classes versionadas. Único ponto de I/O do módulo."""
    tabelas = {}
    for rotulo, arquivo in (("CATMAT", "classes_catmat.json"),
                            ("CATSER", "classes_catser.json")):
        with open(os.path.join(diretorio, arquivo), encoding="utf-8") as f:
            tabelas[rotulo] = json.load(f)["classes"]
    return tabelas


def _elemento(gnd):
    gnd = (gnd or "").strip()
    return gnd[4:6] if len(gnd) == 8 else ""


def _catalogo_da_classe(classe, elemento, tabelas):
    """Devolve o catálogo onde a classe vive; o elemento desempata a duplicata."""
    em_material = classe in tabelas.get("CATMAT", {})
    em_servico = classe in tabelas.get("CATSER", {})
    if em_material and em_servico:
        return "CATSER" if elemento in ("39", "51") else "CATMAT"
    if em_material:
        return "CATMAT"
    if em_servico:
        return "CATSER"
    return None


def _sugerir(classe, descricao):
    if classe in SUGESTAO_POR_CLASSE:
        return SUGESTAO_POR_CLASSE[classe]
    if not classe:
        for padrao, sugestao in SUGESTAO_POR_DESCRICAO:
            if padrao.search(descricao or ""):
                return sugestao
    return None


def _categoria(classe, catalogo, elemento, descricao, tabelas):
    """Categoria do item no PNCP.

    Duas exceções ao elemento de despesa, ambas com fundamento:

    - A seção 1 do CATSER (grupos 111 a 183) é a de TIC — software, nuvem,
      telecom, outsourcing de impressão, licenciamento. O PNCP tem categoria
      própria para ela, e o PGC já a usa nesta UASG.
    - Manutenção empenhada em 4490.51 é serviço de engenharia, não obra.
    """
    if catalogo == "CATSER" and str(tabelas["CATSER"][classe].get("grupo", "")).startswith("1"):
        return TIC
    if elemento == "51" and MANUTENCAO.search(descricao or ""):
        return ENGENHARIA
    return CATEGORIA_POR_ELEMENTO.get(
        elemento, MATERIAL if catalogo == "CATMAT" else SERVICO)


def resolver(classe, gnd, descricao, tabelas):
    """Classe do CSV -> classificação do PNCP. None quando não há como resolver."""
    classe = (classe or "").strip()
    elemento = _elemento(gnd)

    catalogo = _catalogo_da_classe(classe, elemento, tabelas)
    categoria_forcada = None
    sugerida = False

    if catalogo is None:
        sugestao = _sugerir(classe, descricao)
        if sugestao is None:
            return None
        classe, catalogo, categoria_forcada = sugestao
        sugerida = True
        if classe not in tabelas.get(catalogo, {}):
            return None

    categoria = categoria_forcada or _categoria(classe, catalogo, elemento, descricao, tabelas)

    return {
        "classe": classe,
        # o catálogo oficial vem com espaços duplos ("UTENSÍLIOS E  SUPRIMENTOS")
        "nome": re.sub(r"\s+", " ", tabelas[catalogo][classe]["nome"]).strip(),
        "catalogo": catalogo,
        "classificacao_catalogo": "1" if catalogo == "CATMAT" else "2",
        "categoria": categoria,
        "sugerida": sugerida,
    }


def _caixa_de_sentenca(texto):
    return re.sub(r"\s+", " ", (texto or "")).strip().lower()


def nome_grupo(resolucao, natureza):
    """Nome legível do conjunto de compras da classe, com a natureza no fim."""
    verbo = "Aquisição de " if resolucao["catalogo"] == "CATMAT" else "Contratação de "
    sufixo = " (ND %s)" % natureza if natureza else " (ND não informada)"
    corpo = _caixa_de_sentenca(resolucao["nome"])
    folga = LIMITE_NOME - len(verbo) - len(sufixo)
    if len(corpo) > folga:
        corpo = corpo[:folga].rsplit(" ", 1)[0]
    return verbo + corpo + sufixo


def chave_grupo(classe, natureza):
    return "%s|%s" % (classe, natureza)


def _ordem(par):
    classe = par[0]
    return (0, int(classe), par[1]) if classe.isdigit() else (1, 0, classe + par[1])


def montar_grupos(pares, congelado=None):
    """(classe, natureza) -> código a partir de 300.

    Códigos já congelados são preservados: renumerar um grupo publicado quebraria
    a referência no PNCP. Classe nova recebe o próximo código livre.
    """
    grupos = dict(congelado or {})
    usados = {int(c) for c in grupos.values() if str(c).isdigit()}
    proximo = max(usados) + 1 if usados else 300
    for classe, natureza in sorted(set(pares), key=_ordem):
        chave = chave_grupo(classe, natureza)
        if chave in grupos:
            continue
        grupos[chave] = str(proximo)
        proximo += 1
    return grupos
