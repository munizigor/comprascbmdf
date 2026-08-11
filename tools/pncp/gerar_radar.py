# -*- coding: utf-8 -*-
"""Gera data/radar_vigencia.json a partir das atas e contratos vigentes do CBMDF.

Uso:  python tools/pncp/gerar_radar.py

Unico ponto do sistema que le o relogio e a rede. As regras em radar.py sao
puras e recebem `hoje` como parametro.
"""
import json
import os
import sys
from datetime import date

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))

import cliente  # noqa: E402
import radar  # noqa: E402

# id da unidade CBMDF (UASG 170394) no indice de busca do portal
UNIDADE_CBMDF = "5541"
RAIZ = os.path.join(os.path.dirname(os.path.abspath(__file__)), "..", "..")
SAIDA = os.path.normpath(os.path.join(RAIZ, "data", "radar_vigencia.json"))


def main():
    hoje = date.today()
    print("Consultando o PNCP (unidade %s)..." % UNIDADE_CBMDF, flush=True)

    atas = cliente.buscar("ata", "vigente", UNIDADE_CBMDF)
    print("  atas vigentes    : %d" % len(atas), flush=True)

    contratos = cliente.buscar("contrato", "vigente", UNIDADE_CBMDF)
    print("  contratos vigentes: %d" % len(contratos), flush=True)

    dados = radar.montar_radar(atas, contratos, hoje)
    dados["fonte"] = {
        "portal": "PNCP",
        "unidade": UNIDADE_CBMDF,
        "uasg": "170394",
        "orgao": "FUNDO CONSTITUCIONAL DO DISTRITO FEDERAL - FCDF",
    }

    os.makedirs(os.path.dirname(SAIDA), exist_ok=True)
    with open(SAIDA, "w", encoding="utf-8") as f:
        json.dump(dados, f, ensure_ascii=False, indent=1)

    print("\nGravado em %s" % SAIDA)
    for bloco in ("atas", "contratos"):
        faixas = dados[bloco]["faixas"]
        print("  %-10s %3d | %s" % (
            bloco, dados[bloco]["total"],
            "  ".join("%s: %d" % (nome, faixas[nome])
                      for nome in radar.ORDEM_FAIXAS if faixas[nome])))


if __name__ == "__main__":
    main()
