# CBMDF Marketplace

Camada de governança e planejamento logístico-financeiro das contratações do
CBMDF. Orquestra as bases públicas de governança — hoje o **PNCP** — para dar
visibilidade contínua sobre o que foi planejado, contratado e está por vencer.

O que está no ar agora:

- **Radar de Vigência** — atas de registro de preços e contratos vigentes,
  ordenados pelo que vence primeiro. Fonte: PNCP.
- **Saúde do PCA** — estado dos Documentos de Formalização de Demanda (DFD)
  antes de virarem contratação: quanto está preenchido, quem escreveu, onde a
  demanda se concentra. Fonte: PGC / Compras.gov.br.

Um olha o que já foi publicado; o outro, o que ainda está sendo escrito.

## Pré-requisitos

Apenas **Python 3**. Nada mais — sem `pip install`, sem Node, sem banco, sem
servidor de aplicação.

```bash
python --version
```

## Como rodar

### 1. Atualizar os dados do PNCP

```bash
python tools/pncp/gerar_radar.py
```

Consulta o PNCP e regrava `data/radar_vigencia.json`. Leva alguns segundos e
imprime o que encontrou:

```
Consultando o PNCP (unidade 5541)...
  atas vigentes    : 47
  contratos vigentes: 583

Gravado em .../data/radar_vigencia.json
  atas        47 | 0-90: 8  91-180: 13  181-365: 26
  contratos  583 | 0-90: 22  91-180: 141  181-365: 55  >365: 365
```

O JSON é versionado no repositório, então **este passo é opcional** — a página
funciona com o dado da última geração. Rode quando quiser atualizar; a tela
avisa em vermelho quando o dado passa de 7 dias.

### 2. Atualizar o painel de saúde do PCA

O PGC não tem API pública aberta como o PNCP — o extrato sai da tela do
Compras.gov.br e é salvo como JSON. Coloque o arquivo em `data/_bruto/` e rode:

```bash
python tools/pgc/gerar_saude.py
```

Sem argumentos, lê **todos** os `.json` da pasta e agrupa por ano de PCA — o ano
vem do campo `anoPCA` de cada registro, não do nome do arquivo. Para acrescentar
outro exercício, basta jogar mais um extrato na pasta e rodar de novo; DFDs
repetidos entre lotes são descartados. Também aceita caminhos explícitos:

```bash
python tools/pgc/gerar_saude.py caminho/para/extrato.json
```

```
  pgc_170394_pca2027.json                    41 DFDs

Gravado em .../data/saude_pca.json
  PCA 2027 |  41 DFDs |  21 cascas | R$ 94,389,710.00 (concentrado: DFD 54 = 82.3%)
```

> 🔒 **`data/_bruto/` está no `.gitignore` e deve continuar assim.** O extrato do
> PGC traz o **CPF** do operador em `loginOperacao`. O saneamento descarta esse
> campo, então só o derivado (`data/saude_pca.json`) vai para o repositório.

### 3. Abrir as páginas

```bash
python -m http.server 8000
```

E acesse **<http://localhost:8000/web/radar.html>** ou
**<http://localhost:8000/web/pca.html>**.

> ⚠️ **Não abra o arquivo com duplo clique.** Por `file://` o navegador bloqueia
> a leitura do JSON e a página aparece vazia. O servidor acima existe só para
> contornar isso — não há backend nenhum.

Para encerrar, `Ctrl+C` no terminal do servidor.

### 4. Rodar os testes

```bash
python -m unittest discover tests -v
```

## Como a solução se organiza

A regra de negócio mora no Python; a página só desenha. O JSON versionado não é
despejo bruto da API — é o radar **já calculado**. Por isso os testes incidem
sobre funções puras e sobra pouca lógica no JavaScript.

```
tools/pncp/       coletor e regras do radar (Python, só stdlib)
  cliente.py        GET ao PNCP com retry e cache
  radar.py          regras puras — sem rede, sem relógio
  gerar_radar.py    único ponto que toca rede e data do sistema
tools/pgc/        saneamento e indicadores do PCA
  saude.py          regras puras — saneia a PII e agrega
  gerar_saude.py    único ponto que toca disco e data do sistema
tests/            unittest das regras puras
data/             JSON versionado, consumido pelas páginas
  _bruto/           extratos do PGC — fora do git (contêm CPF)
web/              HTML/CSS/JS que apenas renderiza
docs/             documentação viva
_archive/         material histórico (protótipo aposentado)
```

## Documentação

- [docs/integracao_pncp_estudo.md](docs/integracao_pncp_estudo.md) — medição das
  três APIs do PNCP: o que funciona, o que está bloqueado e por quê. **Leia antes
  de mexer na integração.**
- [docs/documento_de_visao.md](docs/documento_de_visao.md) — visão do produto
- [docs/mapeamento_processo_as_is.md](docs/mapeamento_processo_as_is.md) /
  [to_be](docs/mapeamento_processo_to_be.md) — processo de negócio suportado
- [.claude/CLAUDE.md](.claude/CLAUDE.md) — stack, convenções e armadilhas já
  conhecidas

## Uma ressalva sobre os números

A tela **não soma valores**, de propósito. O PNCP replica o valor total do
credenciamento em cada contrato individual (R$ 74,3 mi repetidos em 23 registros)
e publica R$ 1,00 quando não há valor definido (221 registros). Um total ingênuo
seria 85% artefato. Os contratos afetados vêm marcados na tela. Detalhes no §5 do
estudo.
