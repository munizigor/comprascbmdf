# -*- coding: utf-8 -*-
"""Gera data/saude_pca.json a partir dos extratos de DFD do PGC.

Uso:  python tools/pgc/gerar_saude.py [arquivo.json ...]

Sem argumentos, le todos os .json de data/_bruto/ (pasta fora do git, porque o
bruto do PGC carrega CPF). O ano do PCA vem do campo `anoPCA` de cada registro,
nao do nome do arquivo — jogar o extrato de outro ano na pasta e rodar de novo
basta para o painel ganhar mais um bloco.

Unico ponto do modulo que le o relogio e o disco. As regras em saude.py sao
puras e recebem `gerado_em` como parametro.
"""
import glob
import json
import os
import sys

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))

import _archive.prototipo_paineis_saude_arp_contratos.tools.pgc.saude as saude  # noqa: E402

RAIZ = os.path.join(os.path.dirname(os.path.abspath(__file__)), "..", "..")
ENTRADA = os.path.normpath(os.path.join(RAIZ, "data", "_bruto"))
SAIDA = os.path.normpath(os.path.join(RAIZ, "data", "saude_pca.json"))


def carregar(caminho):
    """Le um extrato do PGC. Aceita a lista crua ou o envelope com 'resultado'."""
    with open(caminho, encoding="utf-8-sig") as f:
        dados = json.load(f)
    if isinstance(dados, dict):
        for chave in ("resultado", "items", "content", "dados"):
            if isinstance(dados.get(chave), list):
                return dados[chave]
        raise ValueError("%s: JSON sem lista de DFDs" % caminho)
    return dados


def main(argv):
    caminhos = argv or sorted(glob.glob(os.path.join(ENTRADA, "*.json")))
    if not caminhos:
        print("Nenhum extrato encontrado em %s" % ENTRADA)
        print("Coloque o JSON do PGC na pasta ou passe o caminho como argumento.")
        return 1

    brutos = []
    for caminho in caminhos:
        lote = carregar(caminho)
        brutos.extend(lote)
        print("  %-40s %4d DFDs" % (os.path.basename(caminho), len(lote)), flush=True)

    unicos = saude.dedupe(brutos)
    if len(unicos) < len(brutos):
        print("  (%d repetidos entre lotes, descartados)" % (len(brutos) - len(unicos)))

    from datetime import date  # noqa: E402  — o relogio so entra aqui
    painel = saude.montar_painel(unicos, date.today())
    painel["fonte"] = {
        "portal": "PGC / Compras.gov.br",
        "artefato": "Documento de Formalizacao de Demanda (DFD)",
        "arquivos": [os.path.basename(c) for c in caminhos],
        "observacao": "CPF do operador descartado no saneamento",
    }

    os.makedirs(os.path.dirname(SAIDA), exist_ok=True)
    with open(SAIDA, "w", encoding="utf-8") as f:
        json.dump(painel, f, ensure_ascii=False, indent=1)

    print("\nGravado em %s" % SAIDA)
    for ano in painel["anos"]:
        v = ano["valores"]
        print("  PCA %s | %3d DFDs | %3d cascas | R$ %s%s" % (
            ano["ano_pca"], ano["total"], ano["cascas"],
            format(v["total"], ",.2f"),
            " (concentrado: DFD %s = %.1f%%)" % (v["maior"]["numero"], v["maior"]["percentual"])
            if v["concentrado"] else ""))
    return 0


if __name__ == "__main__":
    sys.exit(main(sys.argv[1:]))
