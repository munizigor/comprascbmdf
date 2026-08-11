# CBMDF Marketplace

Camada de governança e planejamento logístico-financeiro das contratações do
CBMDF. Orquestra as bases públicas de governança — hoje o **PNCP** — para dar
visibilidade contínua sobre o que foi planejado, contratado e está por vencer.

O que está no ar agora: o **Radar de Vigência**, que lista atas de registro de
preços e contratos vigentes ordenados pelo que vence primeiro.

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

### 2. Abrir a página

```bash
python -m http.server 8000
```

E acesse **<http://localhost:8000/web/radar.html>**.

> ⚠️ **Não abra o arquivo com duplo clique.** Por `file://` o navegador bloqueia
> a leitura do JSON e a página aparece vazia. O servidor acima existe só para
> contornar isso — não há backend nenhum.

Para encerrar, `Ctrl+C` no terminal do servidor.

### 3. Rodar os testes

```bash
python -m unittest discover tests -v
```

## Como a solução se organiza

A regra de negócio mora no Python; a página só desenha. O JSON versionado não é
despejo bruto da API — é o radar **já calculado**. Por isso os testes incidem
sobre funções puras e sobra pouca lógica no JavaScript.

```
tools/pncp/       coletor e regras (Python, só stdlib)
  cliente.py        GET ao PNCP com retry e cache
  radar.py          regras puras — sem rede, sem relógio
  gerar_radar.py    único ponto que toca rede e data do sistema
tests/            unittest das regras puras
data/             JSON versionado, consumido pela página
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
