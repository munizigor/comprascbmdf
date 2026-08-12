# -*- coding: utf-8 -*-
"""Extrai a tabela de naturezas de despesa do Rol de Demandas.

Lê as colunas `GND` e `DESCRIÇÃO GND` da planilha e grava
`data/referencia/naturezas.json`, no mesmo formato dos demais arquivos de
referência (metadados de coleta + dicionário indexado pelo código).

Uso: python tools/pgc/gerar_naturezas.py [planilha.csv]
"""
import csv
import io
import json
import os
import sys
from datetime import date

sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from pgc import naturezas

RAIZ = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
PLANILHA_PADRAO = os.path.join(RAIZ, "data", "CBMDF - Rol de Demandas 2027 - _GERAL.csv")
DESTINO = os.path.join(RAIZ, "data", "referencia", "naturezas.json")

COLUNA_CODIGO = "GND"
COLUNA_DESCRICAO = "DESCRIÇÃO GND"


def ler_pares(caminho):
    """Devolve os pares (código, descrição) da planilha — fronteira de I/O."""
    with io.open(caminho, encoding="utf-8-sig", newline="") as arquivo:
        leitor = csv.DictReader(arquivo)
        faltando = [c for c in (COLUNA_CODIGO, COLUNA_DESCRICAO) if c not in leitor.fieldnames]
        if faltando:
            raise SystemExit("colunas ausentes na planilha: %s" % ", ".join(faltando))
        return [(linha.get(COLUNA_CODIGO), linha.get(COLUNA_DESCRICAO)) for linha in leitor]


def montar(pares, hoje, origem):
    detalhadas = naturezas.extrair_detalhadas(pares)
    elementos = sorted({naturezas.elemento(c) for c in detalhadas})
    sem_rotulo = [e for e in elementos if e not in naturezas.ELEMENTOS]
    if sem_rotulo:
        raise SystemExit(
            "elemento(s) sem rótulo em naturezas.ELEMENTOS: %s\n"
            "Acrescente o rótulo antes de gerar — a planilha não descreve este nível." % ", ".join(sem_rotulo)
        )
    return {
        "fonte": origem,
        "coletado_em": hoje.isoformat(),
        "total_detalhadas": len(detalhadas),
        "observacao": (
            "A coluna DESCRIÇÃO GND descreve o subitem (8 dígitos). O rótulo do "
            "elemento (6 dígitos) não existe na planilha e vem de "
            "naturezas.ELEMENTOS, com a nomenclatura da Portaria Conjunta STN/SOF."
        ),
        "elementos": {codigo: naturezas.ELEMENTOS[codigo] for codigo in elementos},
        "detalhadas": {
            codigo: {"descricao": detalhadas[codigo], "elemento": naturezas.elemento(codigo)}
            for codigo in sorted(detalhadas)
        },
    }


def main(argv):
    planilha = argv[1] if len(argv) > 1 else PLANILHA_PADRAO
    tabela = montar(ler_pares(planilha), date.today(), os.path.basename(planilha))
    with io.open(DESTINO, "w", encoding="utf-8", newline="\n") as arquivo:
        json.dump(tabela, arquivo, ensure_ascii=False, indent=2, sort_keys=False)
        arquivo.write("\n")
    print(
        "%s: %d naturezas detalhadas em %d elementos"
        % (os.path.relpath(DESTINO, RAIZ), tabela["total_detalhadas"], len(tabela["elementos"]))
    )


if __name__ == "__main__":
    main(sys.argv)
