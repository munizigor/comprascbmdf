# -*- coding: utf-8 -*-
"""CLI offline: Rol de Demandas (CSV) -> payloads do PCA + relatório de pendências.

Não toca a rede. Lê o CSV e as tabelas versionadas, aplica as regras puras de
pca.py e catalogo.py, e grava:

    data/pca_2027_completo.json    o Rol inteiro, em um plano só
    data/pca_2027_170394.json      plano do CBMDF
    data/pca_2027_170495.json      plano da assistência médica
    data/pca_2027_pendencias.csv   o que o dado de origem não sustenta
    data/referencia/grupos_contratacao.json   numeração congelada dos grupos

Uso:
    python tools/pncp/gerar_pca.py
    python tools/pncp/gerar_pca.py --unidade 24104     # ensaio no treino
"""
import argparse
import csv
import io
import json
import os
import sys

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
import catalogo  # noqa: E402
import pca  # noqa: E402

RAIZ = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
DADOS = os.path.join(RAIZ, "data")
REFERENCIA = os.path.join(DADOS, "referencia")
CSV_PADRAO = os.path.join(DADOS, "CBMDF - Rol de Demandas 2027 - _GERAL.csv")

ANO = 2027
UNIDADE_CBMDF = "170394"
UNIDADE_SAUDE = "170495"
DEMANDANTES_SAUDE = {"PODON", "GAEPH", "POMED", "CEMEV"}

COLUNA_CLASSE = "CÓD CLASSE CATMAT/CATSER"
COLUNA_DESCRICAO = "DESCRIÇÃO DO OBJETO"


def ler_csv(caminho):
    with open(caminho, "rb") as f:
        texto = f.read().decode("utf-8")
    return list(csv.DictReader(io.StringIO(texto)))


def carregar_grupos_congelados():
    caminho = os.path.join(REFERENCIA, "grupos_contratacao.json")
    if not os.path.exists(caminho):
        return {}
    with open(caminho, encoding="utf-8") as f:
        return {k: v["codigo"] for k, v in json.load(f)["grupos"].items()}


def gravar_json(caminho, conteudo):
    with open(caminho, "w", encoding="utf-8") as f:
        json.dump(conteudo, f, ensure_ascii=False, indent=1)
        f.write("\n")


def main():
    opcoes = argparse.ArgumentParser(description="Gera os payloads do PCA a partir do Rol de Demandas")
    opcoes.add_argument("--csv", default=CSV_PADRAO)
    opcoes.add_argument("--ano", type=int, default=ANO)
    opcoes.add_argument("--unidade", default=UNIDADE_CBMDF,
                        help="unidade do arquivo completo (use 24104 para o ensaio no treino)")
    opcoes.add_argument("--limite-descricao", type=int, default=pca.LIMITE_DESCRICAO_PADRAO)
    argumentos = opcoes.parse_args()

    linhas = ler_csv(argumentos.csv)
    tabelas = catalogo.carregar(REFERENCIA)

    # 1ª passada: resolve a classificação e separa o que não pode ser publicado
    publicaveis, bloqueados, pares = [], [], []
    for indice, linha in enumerate(linhas):
        linha["_linha_csv"] = indice + 2  # 1 do cabeçalho, 1 da base zero
        motivo = pca.bloqueio(linha)
        resolucao = catalogo.resolver(
            linha.get(COLUNA_CLASSE), linha.get("GND"), linha.get(COLUNA_DESCRICAO), tabelas)
        if resolucao is None:
            motivo = motivo or "classe não resolvida"
        if motivo:
            bloqueados.append((linha, motivo))
            continue
        natureza = pca.natureza_despesa(linha.get("GND"))
        pares.append((resolucao["classe"], natureza))
        publicaveis.append((linha, resolucao, natureza))

    # 2ª passada: numera os grupos e completa a resolução de cada item
    codigos = catalogo.montar_grupos(pares, carregar_grupos_congelados())
    grupos_detalhados = {}
    for linha, resolucao, natureza in publicaveis:
        chave = catalogo.chave_grupo(resolucao["classe"], natureza)
        resolucao["grupo_codigo"] = codigos[chave]
        resolucao["grupo_nome"] = catalogo.nome_grupo(resolucao, natureza)
        grupos_detalhados.setdefault(chave, {
            "codigo": codigos[chave], "nome": resolucao["grupo_nome"],
            "classe": resolucao["classe"], "natureza": natureza,
            "catalogo": resolucao["catalogo"], "itens": 0})
        grupos_detalhados[chave]["itens"] += 1

    def plano(unidade, selecao):
        return pca.montar_plano(unidade, argumentos.ano,
                                [(l, r) for l, r, _ in selecao], argumentos.limite_descricao)

    saude = [p for p in publicaveis if (p[0].get("DEMANDANTE") or "").strip() in DEMANDANTES_SAUDE]
    resto = [p for p in publicaveis if p not in saude]

    arquivos = [
        ("pca_%d_completo.json" % argumentos.ano, plano(argumentos.unidade, publicaveis)),
        ("pca_%d_%s.json" % (argumentos.ano, UNIDADE_CBMDF), plano(UNIDADE_CBMDF, resto)),
        ("pca_%d_%s.json" % (argumentos.ano, UNIDADE_SAUDE), plano(UNIDADE_SAUDE, saude)),
    ]
    for nome, conteudo in arquivos:
        gravar_json(os.path.join(DADOS, nome), conteudo)

    gravar_json(os.path.join(REFERENCIA, "grupos_contratacao.json"), {
        "criterio": "um grupo por (classe do catálogo, natureza de despesa), a partir de 300",
        "total": len(grupos_detalhados),
        "grupos": dict(sorted(grupos_detalhados.items(), key=lambda kv: int(kv[1]["codigo"]))),
    })

    # relatório de pendências: uma linha por item que precisa de atenção
    caminho_pendencias = os.path.join(DADOS, "pca_%d_pendencias.csv" % argumentos.ano)
    with open(caminho_pendencias, "w", encoding="utf-8-sig", newline="") as f:
        escritor = csv.writer(f, delimiter=";")
        escritor.writerow(["linha_csv", "demandante", "situacao", "motivo", "plano",
                           "numero_item", "classe", "valor_total", "descricao"])
        for linha, motivo in bloqueados:
            escritor.writerow([linha["_linha_csv"], (linha.get("DEMANDANTE") or "").strip(),
                               "bloqueado", motivo, "", "",
                               (linha.get(COLUNA_CLASSE) or "").strip(),
                               (linha.get("VALOR TOTAL") or "").strip(),
                               pca.simplificar(linha.get(COLUNA_DESCRICAO), 120)])
        for unidade, selecao in ((UNIDADE_CBMDF, resto), (UNIDADE_SAUDE, saude)):
            for numero, (linha, resolucao, _) in enumerate(selecao, start=1):
                item, motivos = pca.converter(linha, numero, resolucao, argumentos.ano,
                                              argumentos.limite_descricao)
                if not motivos:
                    continue
                escritor.writerow([linha["_linha_csv"], item["unidadeRequisitante"],
                                   "publicado com pendência", ",".join(motivos), unidade,
                                   numero, resolucao["classe"], item["valorTotal"],
                                   item["descricao"]])

    # fechamento: o que entrou tem de bater com o que saiu
    total_publicado = sum(pca.numero_br(l.get("VALOR TOTAL")) or 0 for l, _, _ in publicaveis)
    total_bloqueado = sum(pca.numero_br(l.get("VALOR TOTAL")) or 0 for l, _ in bloqueados)
    print("Rol de Demandas %d — %s" % (argumentos.ano, os.path.basename(argumentos.csv)))
    print("  linhas lidas ............ %5d" % len(linhas))
    print("  publicáveis ............. %5d   R$ %s" % (len(publicaveis), format(total_publicado, ",.2f")))
    print("    unidade %s ......... %5d" % (UNIDADE_CBMDF, len(resto)))
    print("    unidade %s ......... %5d" % (UNIDADE_SAUDE, len(saude)))
    print("  bloqueados .............. %5d   R$ %s" % (len(bloqueados), format(total_bloqueado, ",.2f")))
    print("  conferência ............. %5d   R$ %s"
          % (len(publicaveis) + len(bloqueados), format(total_publicado + total_bloqueado, ",.2f")))
    print("  grupos de contratação ... %5d   (%s a %s)"
          % (len(grupos_detalhados),
             min(int(g["codigo"]) for g in grupos_detalhados.values()),
             max(int(g["codigo"]) for g in grupos_detalhados.values())))
    print()
    for nome, conteudo in arquivos:
        print("  gravado: data/%-28s %5d itens" % (nome, len(conteudo["itensPlano"])))
    print("  gravado: data/%-28s" % os.path.basename(caminho_pendencias))
    return 0


if __name__ == "__main__":
    sys.exit(main())
