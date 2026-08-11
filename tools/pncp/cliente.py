# -*- coding: utf-8 -*-
"""Cliente HTTP para as APIs abertas do PNCP. Somente biblioteca padrao.

Duas armadilhas ja custaram tempo neste projeto e estao resolvidas aqui:

1. O curl do Git/mingw falha no handshake TLS com o PNCP (rc 56). O do Windows
   funciona — por isso o caminho absoluto.
2. Com --retry, o curl reescreve a resposta no stdout a cada tentativa e as
   partes se concatenam, produzindo JSON invalido. Por isso escrevemos em
   arquivo (-o), que e sobrescrito a cada tentativa.
"""
import hashlib
import json
import os
import shutil
import subprocess
import time
import urllib.parse

BASE = "https://pncp.gov.br"
CACHE = os.path.join(os.path.dirname(os.path.abspath(__file__)), ".cache")

# o curl do Git/mingw nao completa o TLS com o PNCP; o do Windows sim
CURL = r"C:\Windows\System32\curl.exe"
if not os.path.exists(CURL):
    CURL = shutil.which("curl")


def _caminho_cache(url):
    # hash, e nao a URL: o caminho do projeto ja e longo e o Windows corta em
    # 260 caracteres, o que produz um FileNotFoundError enganoso
    os.makedirs(CACHE, exist_ok=True)
    return os.path.join(CACHE, hashlib.md5(url.encode()).hexdigest() + ".json")


def get(caminho, params=None, tentativas=4, usar_cache=True):
    """GET com retry e cache em disco. Devolve (status, objeto)."""
    url = BASE + caminho
    if params:
        url += "?" + urllib.parse.urlencode(params)
    arquivo = _caminho_cache(url)

    if usar_cache and os.path.exists(arquivo):
        with open(arquivo, encoding="utf-8") as f:
            guardado = json.load(f)
        return guardado["status"], guardado["corpo"]

    if not CURL:
        raise RuntimeError("curl nao encontrado")

    ultimo = None
    parcial = arquivo + ".part"
    for tentativa in range(tentativas):
        try:
            proc = subprocess.run(
                [CURL, "-s", "-o", parcial, "-w", "%{http_code}",
                 "--retry", "3", "--retry-all-errors", "--retry-delay", "2",
                 "--max-time", "120", "-H", "Accept: application/json", url],
                capture_output=True, timeout=180)
            status = int(proc.stdout.decode().strip() or 0)
            bruto = ""
            if os.path.exists(parcial):
                with open(parcial, encoding="utf-8", errors="replace") as f:
                    bruto = f.read()
                os.remove(parcial)

            if status == 0:
                raise RuntimeError("curl rc=%d" % proc.returncode)
            if status in (400, 404, 422):
                return status, _talvez_json(bruto)
            if status == 429:
                # rate limit da /api/consulta/ — a janela observada e de ~60s
                time.sleep(20 * (tentativa + 1))
                ultimo = "HTTP 429"
                continue
            if status >= 500:
                raise RuntimeError("HTTP %d" % status)

            corpo = json.loads(bruto) if bruto.strip() else None
            if usar_cache:
                with open(arquivo, "w", encoding="utf-8") as f:
                    json.dump({"status": status, "corpo": corpo}, f)
            return status, corpo
        except Exception as erro:  # rede, timeout ou JSON truncado
            ultimo = repr(erro)
            time.sleep(1.5 * (tentativa + 1))

    raise RuntimeError("falha ao consultar %s: %s" % (url, ultimo))


def _talvez_json(bruto):
    try:
        return json.loads(bruto)
    except ValueError:
        return {"bruto": bruto[:300]}


def buscar(tipo_documento, status, unidade, tam_pagina=100):
    """Pagina a busca do portal ate esgotar e devolve todos os registros.

    `status` e obrigatorio na API. Cuidado: um valor invalido e silenciosamente
    ignorado e devolve a base inteira — sempre passar um valor valido.
    """
    registros = []
    pagina = 1
    while True:
        st, dados = get("/api/search/", {
            "tipos_documento": tipo_documento,
            "status": status,
            "unidades": unidade,
            "ordenacao": "-data",
            "pagina": pagina,
            "tam_pagina": tam_pagina,
        }, usar_cache=False)
        if not isinstance(dados, dict):
            raise RuntimeError("busca %s/%s devolveu %s: %s"
                               % (tipo_documento, status, st, str(dados)[:120]))
        itens = dados.get("items") or []
        if not itens:
            break
        registros.extend(itens)
        if len(registros) >= dados.get("total", 0):
            break
        pagina += 1
    return registros
