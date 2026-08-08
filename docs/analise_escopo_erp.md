# Análise de Escopo — O CBMDF Marketplace é (ou deveria virar) um ERP?

> **Documento de análise** — registra as considerações sobre a hipótese de o
> CBMDF Marketplace evoluir para um ERP. Baseado na leitura do código-fonte
> (11 módulos JS, pipeline de status, camadas de orçamento e governança) e do
> Documento de Visão. Serve de referência para a discussão com os stakeholders.

---

## Resposta curta

**Não. Hoje o sistema não é um ERP — e a recomendação é que ele não vire um ERP
genérico.** Ele é (e deveria continuar sendo) um sistema **vertical
especializado de governança de compras e planejamento de contratações
públicas**, que se **integra** ao "ERP fiscal" que o setor público já é
obrigado a usar (SIAFI, SEI, Grifo, PNCP), em vez de tentar substituí-lo.

---

## 1. O que o sistema é, de fato

Olhando o código (não o discurso de visão), o escopo é nítido e coeso. Cobre o
ciclo **DFD → PCA → contratação → tramitação → recebimento → entrega**, com
quatro camadas bem construídas:

| Camada | Módulos | O que faz |
| :--- | :--- | :--- |
| **Requisição** | `script.js`, `core.js` | Catálogo, carrinho, DFD, criticidade/risco declarados pelo requisitante |
| **Tramitação** | `status-pipeline.js`, `status.js`, `audit.js` | Máquina de ~26 status em 6 macro-etapas, com trilha de auditoria real (ponto único de mutação, justificativa obrigatória, segundo aprovador, SLA por etapa) |
| **Planejamento orçamentário** | `planning.js`, `budget.js`, `contratacoes.js` | Consolidação PCA/PLOA, tetos por setor, agrupamento de itens em Itens de PCA |
| **Governança** | `governanca.js`, `indicadores.js` | Fila priorizada por score transparente, ciclos quadrimestrais com fotografia congelada, contenção de urgência, 5 KPIs com linha de base e meta |

Essa é a parte **diferenciada** do produto: governança de contratações é
justamente o que os sistemas fiscais existentes **não** fazem bem.

---

## 2. Por que ainda não é um ERP

Um ERP é definido por três características que o sistema **não possui**:

| Característica de ERP | Situação no código |
| :--- | :--- |
| Base de dados integrada e compartilhada | ❌ Apenas `localStorage` do navegador, sem backend nem autenticação |
| Múltiplos domínios de negócio integrados | ❌ Cobre apenas compras/planejamento |
| Razão financeiro-contábil real (lançamentos) | ❌ "Comprometido/Empenhado/Liquidado/Pago" são **derivados do status** (`getStatusFlags`), não lançamentos com valor gravado |

E faltam domínios inteiros que caracterizam um ERP:

- **Almoxarifado / estoque** (saldo físico, entradas/saídas, inventário) —
  inexistente; "quantidade" é apenas do pedido.
- **Patrimônio / tombamento de bens** — inexistente (aparece só como texto da
  natureza de despesa 4.4.90.52).
- **Contas a pagar/receber e nota fiscal** — inexistentes.
- **Cadastro de fornecedores** — inexistente (fornecedor aparece só como nome de
  status e como critério de avaliação).
- **Contabilidade / plano de contas** — inexistente.
- **RH / folha de pagamento** — inexistente.

Em termos de ERP, o que existe hoje é **um módulo** (Procurement + Sourcing +
um pedaço de Budgeting) — não o sistema integrado.

---

## 3. Por que *não* transformá-lo em ERP

Não é uma limitação técnica — é uma decisão estratégica. Três pontos, dois deles
vindos do próprio projeto:

1. **No setor público, o "ERP" já existe e é mandatório.** SIAFI (execução
   financeiro-contábil), SEI (processo), Grifo (catálogo/material), sistemas de
   patrimônio/almoxarifado do GDF. O empenho e a liquidação no SIAFI são
   **obrigatórios por lei** — não podem ser substituídos, apenas integrados.
   Reconstruir esses domínios seria redundante, provavelmente não conforme, e um
   desperdício de engenharia.

2. **A própria visão já se posiciona corretamente.** O §4.1 e os RNFs do §6.3 do
   Documento de Visão falam em "interoperar com SEI/SIAFI/PNCP/Grifo", não em
   "substituir". E a causa-raiz declarada no §2.2 **não é "falta de um ERP"** — é
   a *ausência de governança contínua das contratações*. Virar ERP resolveria um
   problema que o documento nem afirma existir, e diluiria o que é afiado: o
   mantra **"comprar melhor"**.

3. **O salto de arquitetura já é grande.** Sair de um protótipo em `localStorage`
   para um sistema com backend, banco central e autenticação corporativa (o
   próximo passo real e correto) já é um projeto significativo. Empilhar "virar
   ERP" em cima disso é a receita clássica de *scope creep* que mata produtos
   govtech.

---

## 4. O caminho recomendado (o meio-termo)

Não virar ERP **não** significa ficar parado. Existe um eixo natural de
aprofundamento — de **"compras"** para **"gestão logística"** (que, aliás, é o
subtítulo do produto) — que agrega muito valor **sem** invadir o território do
ERP fiscal:

- **Fechar o ciclo pós-entrega.** Hoje o pipeline termina em "Pedido Entregue".
  Ligar `Recebimento Definitivo` → entrada no **almoxarifado** (bem de consumo)
  ou **tombamento no patrimônio** (bem permanente) fecharia o ciclo logístico de
  ponta a ponta — o próprio documento já cita "Destino Final" nas definições.
  Isso é um *link/integração leve*, não reconstruir um sistema de patrimônio.
- **Gestão de ARPs e de contratos** (Épico 05, hoje só parcial): saldo de ata,
  vigência, execução contratual, fiscalização. É o vizinho mais óbvio e de alto
  valor.
- **Cadastro e avaliação de fornecedores.** A avaliação já existe (`avaliacao` no
  pedido), mas não há entidade de fornecedor para consolidar. Fechar esse laço
  transforma dado solto em inteligência de compras.
- **Integrações reais** (SIAFI/SEI/PNCP) como o *core* da estratégia: é o que faz
  "Liquidado/Pago" deixarem de ser status e virarem fato financeiro — sem o
  produto virar contabilidade.

---

## 5. Conclusão

**Best-of-breed de compras e governança, integrado ao ERP fiscal — não um ERP
concorrente.** Essa posição é mais defensável tecnicamente, mais fácil de aprovar
institucionalmente e mantém a proposta de valor nítida. A força do produto está
na governança contínua das contratações — exatamente a lacuna que os sistemas
fiscais existentes não cobrem. Ampliar o escopo para ERP genérico trocaria uma
vantagem clara por uma disputa desnecessária com sistemas mandatórios.
