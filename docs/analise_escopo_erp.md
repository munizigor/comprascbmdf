# Análise de Escopo — O CBMDF Marketplace é (ou deveria ser) um ERP?

> **Documento de análise estratégica.** Discute o propósito da solução e onde a
> ideia de "ERP" se encaixa (ou não). Serve de referência para a discussão com
> os stakeholders e para o refino do [Documento de Visão](documento_de_visao.md).

---

## 0. Nota metodológica — o que está sendo analisado

Esta análise avalia a **solução em produção descrita na documentação**, e não o
protótipo atual.

O protótipo (HTML/CSS/JS em `localStorage`, sem backend nem autenticação) é
**instrumento** — uma ferramenta para validar hipóteses com usuários reais e
lapidar o Documento de Visão que guiará a construção. Suas limitações técnicas
(ausência de banco, de APIs, de perfis) são características do *instrumento*, não
do *produto*. A solução de produção terá:

- **banco de dados próprio**, integrado à base institucional do CBMDF;
- **APIs / Web Services** para interoperar com os sistemas de governo;
- **Design System do gov.br** e autenticação corporativa;
- **controle de acesso por perfil** e trilha de auditoria persistida.

Portanto, argumentos do tipo "não é ERP porque não tem banco de dados" são
**irrelevantes** — dizem respeito à maturidade do protótipo, não ao escopo da
solução. A pergunta correta é sobre **domínio e arquitetura**: *que
responsabilidades a solução deve possuir, e quais deve delegar a outros
sistemas?* É isso que este documento reexamina.

---

## 1. Propósito refinado da solução

Incorporando a observação de que a **execução logística** (catálogo, material,
estoque e patrimônio) é feita por outros sistemas — **Grifo**, **SISGEPAT** etc.
—, o propósito ganha uma fronteira mais nítida:

> O **CBMDF Marketplace** é a **camada institucional de governança e
> planejamento logístico e financeiro das contratações e aquisições** do CBMDF.
> Ele **recebe, prioriza e planeja** as necessidades de material e serviço das
> unidades — convertendo-as em um Plano de Contratações Anual (PCA) e em uma
> projeção orçamentária (PLOA) **contínuos, priorizados por critério explícito e
> auditáveis** — e **orquestra** a tramitação de cada demanda até a contratação.
>
> A **execução** de cada especialidade permanece no sistema próprio: a gestão
> logística (catálogo, material, estoque, patrimônio) no **Grifo** e no
> **SISGEPAT**; a execução financeira e contábil (empenho, liquidação,
> pagamento) no **SIAFI**; o processo administrativo no **SEI**; a publicidade
> legal no **PNCP**.
>
> Em uma frase: **o produto planeja e governa o ciclo de aquisição; ele não
> executa a logística nem a contabilidade — ele as orquestra, integra e
> consolida.**

### 1.1 A distinção que sustenta o propósito

O nome do domínio contém uma armadilha que vale desfazer explicitamente:

| Conceito | A solução faz? | Quem executa |
| :--- | :--- | :--- |
| **Planejamento logístico** — *o que* comprar, *quando*, em que lote, com que priorização e consolidação de demandas | ✅ **Sim — é o núcleo** | — |
| **Execução logística** — custódia física, entrada/saída de estoque, inventário, tombamento de bens | ❌ Não | Grifo, SISGEPAT |
| **Planejamento e monitoramento financeiro** — PCA/PLOA, tetos por setor, cronograma de desembolso, acompanhamento planejado × executado | ✅ **Sim — é o núcleo** | — |
| **Execução financeira e contábil** — empenho, liquidação, pagamento, lançamentos, razão | ❌ Não | SIAFI |

"Planejar a logística" **não** é "executar a logística". A solução decide e
coordena; a custódia e os lançamentos vivem nos sistemas de registro
especializados. Essa fronteira é o que a diferencia de um ERP — e é uma escolha
de projeto, não uma limitação.

---

## 2. O que a solução POSSUI vs. o que ela INTEGRA

O desenho é o de uma **camada de orquestração** que é *dona* de alguns domínios
e *cliente* de outros:

| A solução é DONA (sistema de registro) | A solução INTEGRA (lê/escreve, mas não é dona) |
| :--- | :--- |
| Recebimento e caracterização de demandas (DFD) | Catálogo e padronização de material → **Grifo** |
| Priorização e governança (score, ciclos do PCA, contenção de urgência) | Estoque, almoxarifado e patrimônio → **SISGEPAT / Grifo** |
| Planejamento de contratações (PCA) e orçamentário (PLOA) | Execução financeira e contábil (empenho/liquidação/pagamento) → **SIAFI** |
| Orquestração da tramitação (pipeline de status ponta a ponta) | Processo administrativo e documentos → **SEI** |
| Trilha de auditoria das decisões e transições | Publicidade legal (PCA, editais, contratos, ARPs) → **PNCP** |
| Consolidação, relatórios e indicadores de governança | Identidade, lotação e matrícula → base institucional / RH |
| Gestão de ARPs e inteligência de compras (avaliação de fornecedores) | — |

O valor da solução está justamente na **primeira coluna** — governança e
planejamento — que **nenhum** dos sistemas da segunda coluna entrega. SIAFI
executa, mas não prioriza demandas concorrentes; Grifo cataloga, mas não planeja
o PCA; SEI tramita documentos, mas não consolida orçamento. A solução é o elo
que hoje não existe.

---

## 3. Onde o "ERP" se encaixa — e onde não

### 3.1 O que é um ERP, na definição correta

Um ERP é um **sistema único e integrado de registro (system of record) que
abrange todos os domínios de recursos da organização** — finanças/contabilidade,
RH/folha, patrimônio, estoque, compras, operações. A essência não é "ser grande"
nem "ter banco de dados": é **ser a fonte única e integrada da verdade de todos
esses domínios ao mesmo tempo**.

### 3.2 Por que a solução não é um ERP — por desenho, não por imaturidade

Reavaliando na base correta (solução de produção, com banco e APIs), a resposta
continua sendo **não** — mas por um motivo mais forte do que "falta backend":

- **Ela deliberadamente não é dona da maioria dos domínios de um ERP.**
  Patrimônio e estoque são do SISGEPAT/Grifo; a execução financeiro-contábil é
  do SIAFI; RH/folha está fora do escopo. A solução **não quer** ser o registro
  desses recursos — quer orquestrá-los.
- **No setor público não existe "um ERP" a ser substituído.** Existe uma
  **federação de sistemas mandatórios** — SIAFI, SEI, SISGEPAT, Grifo,
  PNCP/Comprasnet, sistemas de RH. Vários são de uso **obrigatório por lei** (o
  empenho e a liquidação no SIAFI, a publicidade no PNCP). Não há como
  substituí-los; só há como integrá-los.
- **O papel natural da solução é ser a torre de controle dessa federação**, para
  o ciclo de aquisição. Isso é *mais* valioso e *mais* viável do que ser "mais um
  ERP" concorrendo com sistemas que a instituição é obrigada a manter.

### 3.3 A analogia que esclarece

No mercado corporativo, esse papel tem nome: são as plataformas de
**Source-to-Pay (S2P) / Gestão de Compras e Gastos** — como Coupa e SAP Ariba —
que **integram-se ao ERP** (o financeiro/contábil) em vez de **serem** o ERP.
Elas são *best-of-breed*: profundas no ciclo de compras e governança, e clientes
do backbone fiscal para a execução. É exatamente esse o posicionamento correto
para o CBMDF Marketplace.

### 3.4 A nuance a nomear: "não-ERP" ≠ "pequeno"

Para evitar leitura equivocada: dizer que **não é um ERP** não a rebaixa a
"formulário" nem a "módulo". Em engenharia, a solução de produção será de **porte
corporativo** — banco integrado, APIs, autenticação, auditoria, Design System
gov.br. Ela é **"ERP-grade" em robustez, mas "não-ERP" em escopo de domínio**:
faz *pouca* coisa (o ciclo demanda → plano → governança → contratação), porém com
*profundidade* e como *orquestradora* do resto. Essa é uma posição arquitetural
deliberada e defensável, não um estágio intermediário rumo a um ERP.

---

## 4. Conclusão e recomendação

1. **A solução não é, nem deveria ser, um ERP.** Ela é a **camada de governança
   e planejamento logístico e financeiro das contratações** — uma plataforma
   *best-of-breed* (padrão Source-to-Pay) que orquestra e se integra à federação
   de sistemas mandatórios do setor público, em vez de reconstruí-los.

2. **A fronteira que define o produto** é "planejar e governar" × "executar":
   ela decide *o que, quando e em que prioridade* comprar e acompanha o
   planejado × executado; a **custódia logística** (SISGEPAT/Grifo) e a
   **execução financeiro-contábil** (SIAFI) permanecem nos sistemas donos desses
   registros.

3. **Isso fortalece a proposta de valor**, não a enfraquece. A força do produto é
   a governança contínua das contratações — exatamente a lacuna que a federação
   de sistemas existentes não cobre. Ampliar o escopo para "ERP genérico" trocaria
   uma vantagem clara e um papel único por uma disputa desnecessária com sistemas
   de uso obrigatório.

4. **O eixo de evolução recomendado** é aprofundar o vertical (governança,
   planejamento, ARPs/contratos, inteligência de fornecedores) e investir nas
   **integrações reais** (SIAFI, SEI, Grifo, SISGEPAT, PNCP) como *core* da
   estratégia — pois são elas que fazem "Liquidado/Pago" deixarem de ser status e
   virarem fato, sem que o produto precise virar contabilidade.

> **Posição-síntese:** *governança e planejamento logístico-financeiro das
> contratações, orquestrando a federação de sistemas do setor público — não um
> ERP concorrente, e sim a camada que hoje falta entre eles.*
