# -*- coding: utf-8 -*-
"""Regras puras da natureza de despesa e do agrupamento de contratações.

Sem I/O e sem relógio: a leitura da planilha e a escrita do JSON ficam em
`gerar_naturezas.py`.

Dois níveis de código convivem e não devem ser confundidos:

- **natureza de despesa detalhada** (8 dígitos, ex. `33903022`) — o subitem.
  É o que a coluna `GND` do Rol de Demandas carrega, e a coluna `DESCRIÇÃO GND`
  descreve *este* nível.
- **natureza de despesa** (6 dígitos, ex. `339030`) — o elemento. É o nível em
  que a contratação é agrupada, porque é ele que separa custeio de investimento.

O rótulo do elemento **não existe na planilha** — ela só descreve subitens
(`339030` sozinho aparece com 25 descrições diferentes). Por isso `ELEMENTOS`
é tabela fixa, com a nomenclatura da Portaria Conjunta STN/SOF.
"""
import re

ELEMENTOS = {
    "339014": "Diárias — Civil",
    "339030": "Material de Consumo",
    "339033": "Passagens e Despesas com Locomoção",
    "339036": "Outros Serviços de Terceiros PF",
    "339037": "Locação de Mão de Obra",
    "339039": "Outros Serviços de Terceiros PJ",
    "339040": "Serviços de Tecnologia da Informação e Comunicação PJ",
    "339047": "Obrigações Tributárias e Contributivas",
    "449051": "Obras e Instalações",
    "449052": "Equipamento e Material Permanente",
}

PRIMEIRO_CODIGO_DE_GRUPO = 300

# conectivos que a normalização de caixa mantém em minúscula
_CONECTIVOS = frozenset(["e", "de", "da", "do", "das", "dos", "para", "em", "com", "a", "o", "ou"])


def extrair_detalhadas(pares):
    """Monta a tabela `detalhada -> descrição` a partir da planilha.

    `pares` são tuplas `(codigo, descricao)` das colunas `GND` e `DESCRIÇÃO GND`.
    Linhas sem código são descartadas — a planilha traz algumas em branco no
    rodapé. Um mesmo código com descrições divergentes é erro de base, não algo
    a resolver por desempate silencioso.
    """
    tabela = {}
    for codigo, descricao in pares:
        codigo = (codigo or "").strip()
        descricao = (descricao or "").strip()
        if not codigo:
            continue
        if not (codigo.isdigit() and len(codigo) == 8):
            raise ValueError("natureza detalhada fora do padrão de 8 dígitos: %r" % codigo)
        anterior = tabela.get(codigo)
        if anterior is not None and anterior != descricao:
            raise ValueError("natureza %s com descrições divergentes: %r e %r" % (codigo, anterior, descricao))
        tabela[codigo] = descricao
    return tabela


def elemento(natureza):
    """Reduz a natureza ao elemento de despesa (6 dígitos)."""
    natureza = (natureza or "").strip()
    if not (natureza.isdigit() and len(natureza) >= 6):
        raise ValueError("natureza de despesa inválida: %r" % natureza)
    return natureza[:6]


def titulo(texto):
    """Normaliza nome vindo em caixa alta, preservando siglas pontuadas."""
    palavras = re.sub(r"\s+", " ", (texto or "").strip()).split(" ")
    saida = []
    for i, palavra in enumerate(palavras):
        if "." in palavra:
            saida.append(palavra)
        elif i > 0 and palavra.lower() in _CONECTIVOS:
            saida.append(palavra.lower())
        else:
            saida.append(palavra.capitalize())
    return " ".join(saida)


def nome_grupo(natureza, nome_classe):
    """Rótulo da contratação: elemento de despesa + classe do catálogo.

    Levanta `KeyError` em elemento sem rótulo. É deliberado: o nome do grupo
    descreve um lote de compra, e um rótulo inventado esconde a mistura de
    naturezas que o agrupamento existe para impedir.
    """
    codigo = elemento(natureza)
    if codigo not in ELEMENTOS:
        raise KeyError("elemento de despesa sem rótulo em ELEMENTOS: %r" % codigo)
    return "%s — %s" % (ELEMENTOS[codigo], titulo(nome_classe))


def numerar_grupos(chaves, primeiro=PRIMEIRO_CODIGO_DE_GRUPO):
    """Numera as contratações a partir de `primeiro`, uma por (elemento, classe).

    A ordenação pela própria chave torna a numeração reprodutível: rodar de novo
    sobre o mesmo PCA devolve os mesmos códigos.
    """
    distintas = sorted({(elemento(natureza), classe) for natureza, classe in chaves})
    return {chave: primeiro + i for i, chave in enumerate(distintas)}
