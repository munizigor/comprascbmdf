# -*- coding: utf-8 -*-
"""Reagrupa as contratações do PCA por (elemento de despesa × classe).

A natureza de despesa vem na cauda da descrição, após o separador `|` — é de
onde a exportação em CSV a extrai. Custeio (339xxx) e investimento (449xxx)
caem sempre em grupos distintos porque o elemento faz parte da chave.

Uso: python tools/pgc/agrupar_contratacoes.py [plano.json]
"""
import io
import json
import os
import sys

sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from pgc import naturezas

RAIZ = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
PLANO_PADRAO = os.path.join(RAIZ, "data", "pca_2027_amostra.json")

SEPARADOR = "|"


def natureza_do_item(item):
    descricao = item["descricao"]
    if SEPARADOR not in descricao:
        raise SystemExit("item %s sem natureza na descrição" % item.get("numeroItem"))
    return descricao.rsplit(SEPARADOR, 1)[1].strip()


def agrupar(itens):
    chaves = [(natureza_do_item(i), i["classificacaoSuperiorCodigo"]) for i in itens]
    codigos = naturezas.numerar_grupos(chaves)
    for item in itens:
        chave = (naturezas.elemento(natureza_do_item(item)), item["classificacaoSuperiorCodigo"])
        item["grupoContratacaoCodigo"] = codigos[chave]
        item["grupoContratacaoNome"] = naturezas.nome_grupo(chave[0], item["classificacaoSuperiorNome"])
    return itens


def main(argv):
    caminho = argv[1] if len(argv) > 1 else PLANO_PADRAO
    with io.open(caminho, encoding="utf-8") as arquivo:
        plano = json.load(arquivo)
    agrupar(plano["itensPlano"])
    with io.open(caminho, "w", encoding="utf-8", newline="\n") as arquivo:
        json.dump(plano, arquivo, ensure_ascii=False, indent=2)
        arquivo.write("\n")
    grupos = {i["grupoContratacaoCodigo"]: i["grupoContratacaoNome"] for i in plano["itensPlano"]}
    print("%s: %d itens em %d contratações" % (os.path.relpath(caminho, RAIZ), len(plano["itensPlano"]), len(grupos)))
    for codigo in sorted(grupos):
        print("  %d  %s" % (codigo, grupos[codigo]))


if __name__ == "__main__":
    main(sys.argv)
