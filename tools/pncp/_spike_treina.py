# -*- coding: utf-8 -*-
"""SPIKE DESCARTAVEL - Fase 1. Nao e codigo definitivo; some apos o gate.

Responde quatro perguntas contra treina.pncp.gov.br, na unidade 170394 do FCDF:

  1. O login devolve o token no header e ele autoriza o POST /pca?
  2. A API aceita codigoItem nulo com catalogo=1?
  3. Aceita classe CATSER de 4 digitos (o PGC manda o grupo de 3)?
  4. Qual o tamanho de lote que passa - 500? 2000?

E confirma o caminho de rollback (DELETE do plano).

Credencial so por variavel de ambiente. O token nunca e impresso.

    setx PNCP_LOGIN "seu.usuario"      (ou $env:PNCP_LOGIN = "...")
    setx PNCP_SENHA "sua.senha"
    python tools/pncp/_spike_treina.py
"""
import argparse
import json
import os
import shutil
import subprocess
import sys
import tempfile
import time

BASE = "https://treina.pncp.gov.br/api/pncp"   # so treina; producao nao entra aqui

# O alvo e parametro: a credencial decide onde da para escrever. A de treino nao
# tem permissao no CNPJ do FCDF (401 "Usuario nao esta habilitado a publicar
# informacoes para o orgao 05448380000145") - a API barra por orgao, o que e uma
# rede de protecao contra publicar no plano da corporacao errada.
CNPJ = "08977914000119"          # CBMDF
UNIDADE = "24104"                # CORPO DE BOMB. MILITAR DO DISTRITO FEDERAL
ANO = 2027

# o curl do Git/mingw nao completa o TLS com o PNCP; o do Windows sim
CURL = r"C:\Windows\System32\curl.exe"
if not os.path.exists(CURL):
    CURL = shutil.which("curl")

TMP = tempfile.mkdtemp(prefix="spike_pncp_")


def _requisicao(metodo, caminho, corpo=None, token=None, timeout=300):
    """Devolve (status, headers, corpo). Escreve em arquivo, nunca em stdout."""
    saida = os.path.join(TMP, "corpo.json")
    cabecalhos = os.path.join(TMP, "headers.txt")
    cmd = [CURL, "-s", "-X", metodo, "-o", saida, "-D", cabecalhos,
           "-w", "%{http_code}", "--max-time", str(timeout),
           "-H", "Accept: application/json"]
    if token:
        cmd += ["-H", "Authorization: Bearer " + token]
    if corpo is not None:
        arquivo = os.path.join(TMP, "envio.json")
        with open(arquivo, "w", encoding="utf-8") as f:
            json.dump(corpo, f, ensure_ascii=False)
        cmd += ["-H", "Content-Type: application/json",
                "--data-binary", "@" + arquivo]
    cmd.append(BASE + caminho)

    inicio = time.time()
    proc = subprocess.run(cmd, capture_output=True, timeout=timeout + 60)
    duracao = time.time() - inicio
    status = int(proc.stdout.decode(errors="replace").strip() or 0)

    heads = {}
    if os.path.exists(cabecalhos):
        with open(cabecalhos, encoding="utf-8", errors="replace") as f:
            for linha in f:
                if ":" in linha:
                    k, _, v = linha.partition(":")
                    heads[k.strip().lower()] = v.strip()
    bruto = ""
    if os.path.exists(saida):
        with open(saida, encoding="utf-8", errors="replace") as f:
            bruto = f.read()
    try:
        corpo_resp = json.loads(bruto) if bruto.strip() else None
    except ValueError:
        corpo_resp = bruto[:400]
    return status, heads, corpo_resp, duracao


def _mostrar(rotulo, status, corpo, duracao=None):
    tempo = " em %.1fs" % duracao if duracao is not None else ""
    print("  %-42s HTTP %s%s" % (rotulo, status, tempo))
    if corpo not in (None, ""):
        texto = json.dumps(corpo, ensure_ascii=False) if not isinstance(corpo, str) else corpo
        print("      %s" % texto[:600])


def item(numero, **campos):
    """Item minimo valido, no formato desenhado: catalogo 1, codigoItem ausente."""
    base = {
        "numeroItem": numero,
        "categoriaItemPca": 1,
        "catalogo": 1,
        "classificacaoCatalogo": "1",
        "classificacaoSuperiorCodigo": "7930",
        "classificacaoSuperiorNome": "COMPOSTOS E PREPARADOS PARA LIMPEZA E POLIMENTO",
        "descricao": "SPIKE DE TESTE - item %d, apagar" % numero,
        "unidadeFornecimento": "Unidade",
        "quantidade": 1,
        "valorUnitario": 1.0,
        "valorTotal": 1.0,
        "valorOrcamentoExercicio": 1.0,
        "unidadeRequisitante": "DIMAT",
        "dataDesejada": "2027-12-31",
    }
    base.update(campos)
    return base


def main():
    global CNPJ, UNIDADE, ANO
    argumentos = argparse.ArgumentParser(description="Spike da Fase 1 - so ambiente de treino")
    argumentos.add_argument("--cnpj", default=CNPJ)
    argumentos.add_argument("--unidade", default=UNIDADE)
    argumentos.add_argument("--ano", type=int, default=ANO)
    opcoes = argumentos.parse_args()
    CNPJ, UNIDADE, ANO = opcoes.cnpj, opcoes.unidade, opcoes.ano

    login = os.environ.get("PNCP_LOGIN")
    senha = os.environ.get("PNCP_SENHA")
    if not login or not senha:
        print("ERRO: defina PNCP_LOGIN e PNCP_SENHA no ambiente antes de rodar.")
        return 2
    if not CURL:
        print("ERRO: curl nao encontrado.")
        return 2

    print("SPIKE - %s | CNPJ %s | unidade %s | ano %s\n" % (BASE, CNPJ, UNIDADE, ANO))

    # -- 1. login -------------------------------------------------------------
    print("[1] Autenticacao")
    status, heads, corpo, dur = _requisicao(
        "POST", "/v1/usuarios/login", {"login": login, "senha": senha})
    autorizacao = heads.get("authorization", "")
    token = autorizacao.replace("Bearer", "").strip()
    print("  login                                      HTTP %s em %.1fs" % (status, dur))
    print("  header Authorization presente:             %s (%d chars)"
          % ("sim" if token else "NAO", len(token)))
    if not token:
        print("  headers recebidos: %s" % sorted(heads))
        _mostrar("corpo da resposta", status, corpo)
        return 1

    # a resposta traz o id do usuario e os orgaos autorizados - sem isso o POST falha
    if isinstance(corpo, dict):
        print("  usuario id=%s  orgaos=%s" % (corpo.get("id"), corpo.get("entesAutorizados") or corpo.get("orgaos") or "?"))

    status, _, corpo, _ = _requisicao("GET", "/v1/usuarios/permissoes", token=token)
    _mostrar("permissoes do usuario", status, corpo)

    # confere a unidade pelo nome antes de escrever - numero errado publica no
    # plano de outra corporacao
    status, _, corpo, _ = _requisicao(
        "GET", "/v1/orgaos/%s/unidades/%s" % (CNPJ, UNIDADE))
    nome_unidade = (corpo or {}).get("nomeUnidade") if isinstance(corpo, dict) else None
    print("  alvo: CNPJ %s | unidade %s = %r" % (CNPJ, UNIDADE, nome_unidade))
    if not nome_unidade:
        print("  >> unidade nao encontrada nesse CNPJ; nada foi escrito.")
        return 1

    # -- 2. cria o plano com as tres variantes --------------------------------
    print("\n[2] POST /pca com 3 itens - as variantes em duvida")
    itens = [
        item(1),                                              # material, codigoItem ausente
        item(2, codigoItem=None),                             # material, codigoItem explicitamente nulo
        item(3, categoriaItemPca=2, classificacaoCatalogo="2",  # servico, classe CATSER de 4 digitos
             classificacaoSuperiorCodigo="9290",
             classificacaoSuperiorNome="OUTROS SERVICOS DE EDUCACAO E TREINAMENTO"),
    ]
    status, heads, corpo, dur = _requisicao(
        "POST", "/v1/orgaos/%s/pca" % CNPJ,
        {"codigoUnidade": UNIDADE, "anoPca": ANO, "itensPlano": itens}, token=token)
    _mostrar("criacao do plano", status, corpo, dur)
    print("      location: %s" % heads.get("location", "(ausente)"))
    if status not in (200, 201, 204):
        print("\n  >> O POST falhou. Nada foi criado; o mapeamento precisa mudar.")
        return 1

    status, _, corpo, _ = _requisicao(
        "GET", "/v1/orgaos/%s/pca/%s/%s/sequenciaisplano" % (CNPJ, UNIDADE, ANO))
    _mostrar("sequencial do plano criado", status, corpo)
    sequencial = (corpo or {}).get("sequencialPlano")
    ultimo = (corpo or {}).get("sequencialUltimoItemInserido") or 3
    if not sequencial:
        print("  >> Sem sequencial, nao da para continuar.")
        return 1

    status, _, corpo, _ = _requisicao(
        "GET", "/v1/orgaos/%s/pca/%s/%s/itens?pagina=1&tamanhoPagina=10" % (CNPJ, ANO, sequencial))
    print("\n[3] Como o PNCP devolveu os 3 itens (HTTP %s)" % status)
    for it in (corpo or [])[:3]:
        print("      item %s | catalogo=%s | classifCat=%s | codigoItem=%r | superior=%s | unidReq=%r"
              % (it.get("numeroItem"), it.get("catalogoId"), it.get("classificacaoCatalogoId"),
                 it.get("codigoItem"), it.get("classificacaoSuperiorCodigo"),
                 it.get("unidadeRequisitante")))

    # -- 3. tamanho de lote ---------------------------------------------------
    print("\n[4] Tamanho de lote em POST /itens")
    caminho_itens = "/v1/orgaos/%s/pca/%s/%s/itens" % (CNPJ, ANO, sequencial)
    for tamanho in (500, 2000):
        lote = [item(ultimo + 1 + i) for i in range(tamanho)]
        status, _, corpo, dur = _requisicao("POST", caminho_itens, lote, token=token)
        _mostrar("lote de %d itens" % tamanho, status, corpo, dur)
        if status in (200, 201, 204):
            ultimo += tamanho
        else:
            print("      >> lote de %d NAO passou; o limite util e menor" % tamanho)
            break

    status, _, corpo, _ = _requisicao(
        "GET", "/v1/orgaos/%s/pca/%s/%s/itens/quantidade" % (CNPJ, ANO, sequencial))
    _mostrar("quantidade final de itens", status, corpo)

    # -- 4. rollback ----------------------------------------------------------
    print("\n[5] Rollback - DELETE do plano de teste")
    status, _, corpo, dur = _requisicao(
        "DELETE", "/v1/orgaos/%s/pca/%s/%s" % (CNPJ, ANO, sequencial),
        {"justificativa": "Spike de integracao - remocao do plano de teste"}, token=token)
    _mostrar("exclusao do plano", status, corpo, dur)
    status, _, corpo, _ = _requisicao("GET", "/v1/orgaos/%s/pca/%s/consolidado" % (CNPJ, ANO))
    _mostrar("consolidado apos o DELETE (404 = limpo)", status, corpo)

    print("\nArquivos temporarios em %s" % TMP)
    return 0


if __name__ == "__main__":
    sys.exit(main())
