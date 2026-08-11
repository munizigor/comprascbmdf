# CLAUDE.md — CBMDF Marketplace

## Contexto de Negócio

Camada de governança e planejamento logístico-financeiro das contratações do
CBMDF. Orquestra as bases públicas de governança — hoje o PNCP (Plano de
Contratações Anual e Contratos) — para dar visibilidade contínua sobre o que foi
planejado, contratado e está por vencer. Usuários: SELOF, DEALF, gestores
setoriais (GSO) e unidades requisitantes.

## Stack Travada (decidida no gate da Fase 3)

- **Coletor/regras:** Python 3 — **somente biblioteca padrão**. Sem `pip install`,
  sem `requirements.txt`, sem ambiente virtual.
- **HTTP:** `subprocess` + `curl` do Windows (ver "Lições Aprendidas").
- **Testes:** `unittest` da stdlib.
- **Página:** HTML + CSS + JavaScript puro. Sem framework, sem bundler, sem CDN.
- **Dados:** JSON versionado no repositório, gerado por script. **Sem backend,
  sem banco, sem job agendado.**

Desvio desta stack = parar e consultar o Navegador. Não sugerir troca.

O princípio que sustenta a escolha: **a regra de negócio mora no Python, a página
é um renderizador burro.** O JSON commitado não é despejo bruto da API — é o
resultado já calculado. Assim o TDD incide sobre funções puras e sobra pouca
lógica no JS.

## Comandos

- `python -m unittest discover tests -v` — suíte completa (gate antes de commit)
- `python tools/pncp/gerar_radar.py` — regera `data/radar_vigencia.json` do PNCP
- Abrir `web/radar.html` no navegador — não precisa de servidor

## Arquitetura e Estrutura

```
tools/pncp/   # coletor e regras de negócio (Python, stdlib)
  cliente.py      # GET ao PNCP com retry e cache em disco
  radar.py        # REGRAS PURAS — sem I/O, sem data do sistema
  gerar_radar.py  # CLI: coleta -> aplica regras -> grava JSON
tests/        # unittest das regras puras
data/         # JSON versionado, consumido pela página
web/          # HTML/CSS/JS que apenas renderiza o JSON
docs/         # documentação viva do sistema
_archive/     # material histórico — NÃO é fonte; protótipo aposentado aqui
```

Dependências apontam numa direção só: `gerar_radar → (cliente, radar)`.
`radar.py` não importa `cliente.py` nem faz I/O.

## As três APIs do PNCP

| API | Base | Uso | Rate limit |
| :-- | :-- | :-- | :-- |
| PNCP | `/api/pncp/v1` | dado granular por órgão/ano/sequencial | não observado |
| Busca | `/api/search/` | universo do CBMDF (índice do portal, não documentado) | não observado |
| Consulta | `/api/consulta/v1` | sincronização por período | **429, janela ~60s** |

Identificadores: PCA sob CNPJ `08977914000119` (unidade 24104); contratações sob
o órgão superior FCDF `05448380000145`, UASG `170394` (id de unidade `5541` na
busca). Detalhes e medições em [docs/integracao_pncp_estudo.md](../docs/integracao_pncp_estudo.md).

## Convenções Específicas do Projeto

- Nomes de domínio e de arquivo em **pt-BR** (`radar.py`, `faixa_vencimento`,
  `dias_restantes`). Comentários e commits em pt-BR.
- **Regra pura nunca lê o relógio.** `hoje` é sempre parâmetro — `date.today()`
  só em `gerar_radar.py`. É o que torna o teste determinístico.
- Todo dado exibido carrega a data em que foi coletado (`gerado_em`).
- Datas do PNCP vêm ISO com fuso; truncar para `date` na fronteira do coletor.

## O que NUNCA fazer neste projeto

- **Não somar `valor_global` de contratos.** O PNCP replica o valor total do
  credenciamento em cada contrato individual (R$ 74,3 mi em 23 registros) e usa
  R$ 1,00 em outros 221 — 85% de um agregado ingênuo é artefato. Exibir por
  contrato e sinalizar o suspeito.
- **Não usar `status=todos`** na busca. `status` é obrigatório e um valor
  inválido é *silenciosamente ignorado*, devolvendo a base inteira. Funciona
  hoje, quebra quando o PNCP corrigir a validação. Usar `vigente`.
- **Não calcular execução do PCA por similaridade de descrição.** Não existe
  chave entre item do PCA e item contratado; inferir por texto produz execuções
  de 12.030%. Ver §4 do estudo.
- Não tratar `_archive/` como fonte de verdade — é histórico.
- Não adicionar dependência externa sem passar pelo Navegador.

## Lições Aprendidas

- O `curl` do Git/mingw **falha no handshake TLS** com o PNCP (rc 56); o do
  Windows (`C:\Windows\System32\curl.exe`) funciona. Sempre usar caminho absoluto.
- Com `--retry`, o curl **concatena respostas parciais no stdout** e corrompe o
  JSON. Escrever em arquivo (`-o`), nunca capturar de stdout.
- Nomes de arquivo de cache devem ser hash: o caminho do projeto já é longo e o
  Windows corta em 260 caracteres, gerando `FileNotFoundError` enganoso.
- `python -c` que reatribui `sys.stdout` depois de importar um módulo que já o
  reatribuiu fecha o stream e quebra com `I/O operation on closed file`.
