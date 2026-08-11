# Documento de Visão do Produto
## CBMDF Marketplace — Camada de Governança e Planejamento Logístico e Financeiro das Contratações e Aquisições

---

## 1. Escopo e Glossário

### 1.1 Escopo

O **CBMDF Marketplace** é a camada institucional de governança e planejamento logístico e financeiro das contratações e aquisições do CBMDF. Abrange da requisição de materiais e serviços pelos setores, passando pela tramitação processual (DFD, TR, Nota de Empenho) e pelo agrupamento das demandas em contratações por classe, até a consolidação orçamentária do PCA e do PLOA, com acompanhamento da execução da despesa (planejado → comprometido → empenhado → liquidado → pago).

**A fronteira do produto** — escolha de projeto que o distingue de um ERP — é *planejar e governar* × *executar*. O produto recebe, prioriza, planeja e orquestra a tramitação até a contratação. A **execução** de cada especialidade permanece no sistema próprio: a **custódia logística** (catálogo, material, estoque e patrimônio) no Grifo e no SISGEPAT; a **execução financeira e contábil** (empenho, liquidação e pagamento) no SIAFI. O Marketplace não executa a logística nem a contabilidade — ele as orquestra, integra e consolida.

### 1.2 Glossário

| Sigla | Significado |
| :--- | :--- |
| **PCA / PLOA / PPA** | Plano de Contratações Anual; Projeto de Lei Orçamentária Anual; Plano Plurianual (quatro anos, ao qual o exercício anual deve ser compatível). |
| **PARF** | Plano Anual de Recursos Financeiros — reúne o PCA e as despesas de pessoal e custeio da folha; a "LOA interna" do CBMDF. |
| **DFD / ETP / TR** | Documento de Formalização de Demanda; Estudo Técnico Preliminar (avalia a melhor solução — compra, aluguel, outsourcing — e o padrão de mercado); Termo de Referência. |
| **ARP** | Ata de Registro de Preços. |
| **Grupo/Classe** | Classificação do material segundo o Padrão Descritivo de Materiais (PDM), usada para categorizar e agrupar itens de contratação. |
| **Tipo / Natureza de Despesa** | Classificação orçamentária do item: Investimento ou Custeio; e o código associado (ex.: 3.3.90.30, 4.4.90.52). |
| **Recebimento Provisório / Definitivo** | Etapas sucessivas de conferência do material entregue — a primeira sumária (quantidade/volumes), a segunda com vistoria e testes que resultam em aceite ou rejeição. |
| **CESMA** | Central de Suprimentos e Material — recebimento e distribuição de materiais. |
| **Grifo / SISGEPAT** | Sistemas legados do CBMDF para gestão de materiais e de patrimônio. Fonte do catálogo e destino da custódia patrimonial, respectivamente. |
| **SEI / SIAFI / PNCP** | Sistema Eletrônico de Informações (processos administrativos do DF); Sistema Integrado de Administração Financeira (execução orçamentária); Portal Nacional de Contratações Públicas (exigência da Lei nº 14.133/2021). |
| **PLANES** | Planejamento Estratégico do CBMDF, ciclo 2025–2030. Doze objetivos estratégicos com indicadores e metas oficiais — quatro deles (governança, infraestrutura logística, governança digital e finanças) diretamente afetados pelo ciclo de contratações. |
| **iGG / iESGo** | Índice Integrado de Governança e Gestão públicas e Índice de Governança e Sustentabilidade, aferidos pelo **TCU**. Suas matrizes definem quais evidências comprovam boa governança em contratações e orçamento. |
| **OKR** | Estrutura de metas em que um **Objetivo** declara o resultado pretendido e cada **Resultado-Chave** é um indicador com meta numérica, prazo e fonte. É o que o PLANES já pratica sob outra nomenclatura (Objetivo Estratégico → Indicador → Meta). |

---

## 2. Posicionamento

### 2.1 Oportunidade de Negócio

Os setores do CBMDF hoje solicitam materiais e serviços de forma dispersa — planilhas, ofícios e controles paralelos —, sem visibilidade unificada do andamento processual de cada pedido nem do seu impacto no orçamento agregado por PCA e PLOA. Essa fragmentação dificulta o planejamento, atrasa a tramitação e torna trabalhosa a prestação de contas sobre planejado *versus* executado.

O mantra institucional do produto é **"comprar melhor"**: o objetivo não é aumentar o volume de compras, e sim reduzir compras pulverizadas, otimizar lotes de contratação e garantir que as contratações saiam completas — com especificação, orçamento e fornecedor adequados.

### 2.2 Causa-Raiz Identificada

A causa-raiz **não é a periodicidade anual do PCA em si**, mas a **ausência de um sistema institucional de governança que transforme o planejamento das contratações em um processo contínuo de gestão**. A periodicidade anual é apenas a manifestação visível dessa lacuna estrutural, cujos efeitos são:

* **Baixa previsibilidade das demandas** dos setores ao longo do ano.
* **Fragilidade da priorização institucional** entre pedidos concorrentes.
* **Retrabalho** na consolidação manual de informações que já deveriam estar centralizadas.
* **Desarticulação entre os atores** (setores requisitantes, CESMA, Planejamento/Orçamento e Direção).
* **Aumento das contratações emergenciais**, resultado direto da falta de acompanhamento contínuo.

Daí a proposta: o produto não deve ser apenas uma ferramenta de requisição, mas o instrumento que sustenta um **processo contínuo de governança das contratações**.

#### Evidência de campo

Pesquisa com **20 servidores** — ponta operacional, unidades de apoio e a estrutura de logística e contratação. Confirma os cinco efeitos e acrescenta três leituras:

* **A indefinição de recursos é a dor dominante** (75% da amostra). Sem teto conhecido, o PCA vira uma *"lista de papai noel"* — o GPRAM *"não chegou a executar 10 milhões no último ano [e] costuma ter um PARF de 50"*.
* **A desarticulação é direcional, não geral.** A comunicação com o planejamento foi avaliada em **2,85 de 5**, e a nota cai conforme a distância ao centro de contratação: unidades da ponta (1º GBM, 6º GBM, PODON, GPRAM) em 1–2; unidades internas à logística (COMAP, Gaeph, SELOG, DICOA) em 4–5.
* **O Épico 08 foi validado de forma independente.** O SELOG/COMOP já usa *"a Matriz GUT com adaptações [colocando] a maturidade do processo também como um peso"* — o score deste produto, inclusive o critério de prontidão da instrução. O SELOF nomeia o problema que os pesos institucionais fixos resolvem: com a GUT preenchida por cada unidade, *"tudo fica priorizado ou fica muito diferente de demandante pra demandante"*.

Os três dados mais pedidos pelo requisitante — teto orçamentário da unidade, dotação prevista e prazo esperado — **já são calculados pelo sistema, mas só exibidos aos perfis de gestão**. As demais lacunas apontadas pela pesquisa ainda **não** viraram épicos.

### 2.3 Declaração do Problema

| **O problema de** | Falta de visibilidade centralizada sobre o andamento dos pedidos de compra e ausência de um processo contínuo de governança das contratações. |
| :--- | :--- |
| **afeta** | Setores requisitantes, CESMA, Planejamento/Orçamento e Direção do CBMDF. |
| **cujo impacto é** | Demandas represadas ou perdidas, retrabalho na consolidação manual para o PCA e o PLOA, dificuldade em identificar o estágio processual de cada pedido, baixa previsibilidade orçamentária e aumento de contratações emergenciais. |
| **uma solução bem-sucedida seria** | Uma plataforma única que centralize o catálogo, permita acompanhamento contínuo do status de cada pedido por todos os envolvidos e consolide automaticamente planejado e executado por classe, setor e natureza de despesa — transformando o planejamento de uma atualização anual em gestão contínua. |

---

## 3. Envolvidos e Usuários

| Ator | Papel | Necessidades / Responsabilidade |
| :--- | :--- | :--- |
| **Comando/Direção** | Patrocínio institucional | Aprovação da adoção da ferramenta e alinhamento com a estratégia de suprimentos. |
| **Requisitante** | Militar/servidor de um setor (COMOP, DITIC, DIMAT, COMAP…) que monta pedidos | Buscar e filtrar o catálogo, montar carrinho com quantidade e urgência por item, enviar requisição vinculada ao setor, acompanhar a posição na fila e avaliar o pedido recebido. |
| **Gestor de Tramitação** | Atualiza o status de cada pedido | Visualizar e filtrar pedidos por usuário/status e avançar o estágio ao longo das 6 macro-etapas (§4.2). |
| **Gestor de Contratações** | Agrupa pedidos em contratações por classe | Visualizar pedidos agrupados por classe, incluir itens adicionais com classificação orçamentária completa, excluir/restaurar grupos ou itens. |
| **Gestor do Catálogo e Atas (CESMA/DIMAT)** | Mantém o catálogo padronizado e as ARPs | Homologar itens, sincronizar com o Grifo, cadastrar ARPs, controlar saldos e disponibilizar itens de atas vigentes. Valida o fluxo de tramitação e recebimento. |
| **Planejamento/Orçamento e Diretoria** | Gestão orçamentária e consumo dos relatórios | Visão agregada de planejado, comprometido, empenhado, liquidado e pago por setor, tipo, classe e natureza de despesa; validação da classificação de despesas. |
| **Comitê de Governança de Contratações** | Instância colegiada de priorização e rito de revisão do PCA | Definir os pesos do score, ver a fila priorizada com o critério que a ordenou, ajustar posições em caráter excepcional com justificativa registrada, abrir/fechar ciclos com ata e fotografia, e conter as contratações por urgência. |

---

## 4. Visão Geral do Produto

### 4.1 Arquitetura e Integrações

A visão de evolução é a de uma aplicação com backend próprio, banco de dados centralizado e integrado à base institucional do CBMDF, autenticação corporativa e Design System do gov.br, mantendo a lógica de negócio validada no protótipo.

Arquiteturalmente, é uma **camada de orquestração** (padrão *Source-to-Pay*): dona dos domínios de governança e planejamento, **cliente** dos sistemas que executam cada especialidade. Deve interoperar, via APIs/Web Services, com:

* **Grifo:** fonte primária para carga, padronização e sincronização do catálogo.
* **SISGEPAT:** destino da custódia patrimonial — o tombamento permanece nele; o Marketplace registra o encaminhamento, não a custódia.
* **SEI:** abertura e instrução automática de processos administrativos (DFD e TR).
* **SIAFI:** consulta de saldos e emissão automática de pré-empenho, empenho, liquidação e registro de pagamento.
* **PNCP:** publicação automatizada do PCA, editais, contratos e ARPs, conforme a Lei nº 14.133/2021.

### 4.2 Pipeline de Status — as 6 macro-etapas

Cada pedido avança por um pipeline granular organizado em 6 macro-etapas, refletindo a jornada real de uma contratação pública:

1. **Ideação & Necessidade:** `DFD Registrado`.
2. **Validação & PCA:** `Em Análise Setorial` → `Aguardando Suplementação` (se necessário) → `Incluído no PCA` (via regular) ou `Incluído no PCA (Urgência)` (inclusão extraordinária); pedidos reprovados vão para `Arquivado`.
3. **Estruturação no Processo (ETP/TR):** `ETP em Elaboração` → `Pesquisa de Preços` → `TR Elaborado` → `Reserva Orçamentária Confirmada`.
4. **Edital & Seleção:** `Edital Publicado` → `Em Seleção de Fornecedor` → `Nota de Empenho Emitida`.
5. **Aquisição & Fabricação:** `Ordem de Fornecimento Emitida` → `Em Trânsito ou Fabricação`.
6. **Entrega & Finalização:** `Recebimento Provisório` → `Recebimento Definitivo` (ou `Recebimento Rejeitado (Aguardando Substituição)`, se houver defeito) → `Liquidado` → `Pago` → `Pedido Entregue`.

`Arquivado` e `Recebimento Rejeitado (Aguardando Substituição)` são estados de exceção fora do caminho principal, não etapas de progresso. `Liquidado` e `Pago` são status reais do pedido, não colunas derivadas dos relatórios.

---

## 5. Épicos e Histórias de Usuário

---

### **ÉPICO 01: Catálogo e Emissão de Pedidos**
> Permitir que os setores localizem materiais e serviços no catálogo e enviem pedidos completos, com quantidade e urgência por item.

#### **HU01.1 — Busca e Filtro de Materiais no Catálogo**
* **Como** Requisitante, **quero** buscar materiais/serviços por nome ou descrição e filtrar por categoria (escritório, manutenção, higiene, segurança, saúde), **para que** eu encontre rapidamente os itens que preciso.
* **Critérios de Aceite:**
  * A busca considera nome e descrição; o filtro por categoria é combinável com a busca textual.
  * Cada item exibe tipo (MATERIAL/SERVIÇO), grupo/classe e tipo de despesa.

#### **HU01.2 — Montagem do Carrinho e Envio da Requisição**
* **Como** Requisitante, **quero** adicionar itens ao carrinho, definir quantidade e urgência (normal, média, alta) por item e enviar a requisição, **para que** meu pedido seja registrado com as informações necessárias para tramitação.
* **Critérios de Aceite:**
  * O carrinho exibe quantidade, urgência e subtotal por item, além do total estimado.
  * O envio vincula o pedido ao usuário e setor, com data/hora e observações opcionais.
  * O pedido enviado fica disponível para tramitação, acompanhamento e relatórios.

---

### **ÉPICO 02: Tramitação e Acompanhamento de Status**
> Prover visibilidade do estágio processual de cada pedido, tanto para quem gerencia a tramitação quanto para quem fez a requisição.

#### **HU02.1 — Atualização do Status do Pedido**
* **Como** Gestor de Tramitação, **quero** atualizar o status de cada pedido ao longo das 6 macro-etapas (§4.2), **para que** o andamento real do processo fique refletido no sistema.
* **Critérios de Aceite:**
  * É possível filtrar pedidos por usuário e por status antes de atualizar.
  * A alteração reflete imediatamente nos indicadores de resumo (pedidos no filtro, arquivados, entregues).
  * A mudança de status impacta automaticamente os relatórios de PCA/PLOA.

#### **HU02.2 — Consulta do Andamento pelo Requisitante**
* **Como** Requisitante, **quero** consultar a jornada do meu pedido, com filtro por usuário e status, **para que** eu saiba em qual etapa está sem precisar contatar outros setores.
* **Critérios de Aceite:**
  * A busca localiza pedidos por nome, matrícula, setor ou observações.
  * Exibe resumo com total de pedidos no filtro, arquivados e entregues.

---

### **ÉPICO 03: Gestão de Contratações**
> Agrupar as demandas por classe, consolidando itens de múltiplos pedidos em contratações e permitindo complementá-las com itens adicionais.

#### **HU03.1 — Agrupamento de Pedidos por Classe**
* **Como** Gestor de Contratações, **quero** visualizar os itens pedidos agrupados automaticamente por classe, **para que** eu consolide demandas semelhantes em uma única contratação.
* **Critérios de Aceite:**
  * Os grupos exibem quantidade de itens e valor total estimado por classe, e são buscáveis/filtráveis por classe.
  * É possível excluir um grupo ou item específico, com opção de restauração.

#### **HU03.2 — Inclusão Manual de Item de Contratação**
* **Como** Gestor de Contratações, **quero** incluir manualmente um item informando nome, classe, grupo, setor solicitante, categoria, tipo, tipo e natureza de despesa, quantidade, urgência e preço unitário, **para que** demandas fora do catálogo padrão também entrem na contratação e no planejamento.
* **Critérios de Aceite:**
  * O item manual aparece agrupado junto aos demais da mesma classe.
  * Entra na contagem de itens e no valor total estimado das contratações.

---

### **ÉPICO 04: Gestão Orçamentária e Financeira**
> Consolidar automaticamente os valores das demandas no PCA e no PLOA, refletindo o estágio de execução de cada pedido, e prover gestão financeira ativa dos limites de cada setor.

#### **HU04.1 — Relatório de PCA por Tipo/Classe e por Setor**
* **Como** Planejamento/Diretoria, **quero** visualizar os valores agregados por tipo e classe, e também por setor, **para que** eu tenha visão consolidada do que cada setor planeja contratar.
* **Critérios de Aceite:**
  * Cada linha exibe Planejado, Comprometido, Empenhado, Liquidado, Pago e Saldo.
  * Os valores derivam automaticamente do status (pedidos em `DFD Registrado`, `Em Análise Setorial`, `Aguardando Suplementação` ou `Arquivado` não entram no total planejado).
  * Há subtotais por tipo e por setor, além do total geral.

#### **HU04.2 — Relatório de PLOA por Tipo e Natureza de Despesa**
* **Como** Planejamento/Diretoria, **quero** visualizar os valores agregados por tipo de despesa (Investimento/Custeio) e natureza de despesa, **para que** eu acompanhe a execução no formato exigido pelo PLOA.
* **Critérios de Aceite:**
  * Cada linha exibe Planejado, Comprometido, Empenhado, Liquidado, Pago e Saldo, com subtotais por tipo de despesa e total geral.

#### **HU04.3 — Gestão Financeira Ativa por Setor**
* **Como** Planejamento/Orçamento, **quero** definir limites financeiros por diretoria/setor e acompanhar liquidação e pagamento em tempo real via SIAFI, **para que** nenhum setor ultrapasse sua cota e a execução seja acompanhada continuamente.
* **Critérios de Aceite:**
  * Cadastro de limite financeiro por setor e período, com alerta quando o Comprometido/Empenhado se aproximar do limite.
  * O status Liquidado/Pago reflete, via SIAFI, o cronograma de desembolso real.
  * *Refinamento ([#30](https://github.com/munizigor/comprascbmdf/issues/30)):* limites também **por natureza/finalidade** (ex.: cota da DIREP para diárias e passagens, separadas por curso/operação/representação). Ressalva de fronteira: naturezas não-contratuais entram apenas como **cota financeira** monitorada — nunca como pedido no fluxo de compras.

#### **HU04.4 — Custeio via ARP com Cronograma de Desembolso pelo Duodécimo** *(evolução para produção — issue [#16](https://github.com/munizigor/comprascbmdf/issues/16))*
* **Como** Planejamento/Orçamento, **quero** planejar despesas de custeio como ARPs e acompanhar um cronograma mensal ancorado no duodécimo, **para que** a execução se distribua ao longo do ano sem estourar o teto.
* **Critérios de Aceite:**
  * É possível marcar contratações de custeio como "executáveis via ARP".
  * O painel financeiro mostra previsto mensal (duodécimo) × empenhado × liquidado × pago.
  * Alerta quando o ritmo mensal de empenho diverge do planejado.
* **Pré-condição de negócio:** a diretriz "todos os custeios como ARP" precisa ser confirmada com o Planejamento **antes** de esta HU virar requisito fechado.

#### **HU04.5 — KPI de Aging: Dias entre Empenho e Liquidação** *(evolução para produção — issue [#17](https://github.com/munizigor/comprascbmdf/issues/17))*
* **Como** Planejamento/Diretoria, **quero** ver há quantos dias cada despesa empenhada está sem liquidação, e a distribuição por setor/natureza, **para que** eu atue antes que virem restos a pagar ou devolução de recurso.
* **Critérios de Aceite:**
  * Dias médios entre `Nota de Empenho Emitida` e `Liquidado`, calculados sobre o `historico[]`.
  * Lista de empenhos acima de um limite de dias (ex.: > 60 sem liquidar), com recorte por setor e natureza de despesa.

#### **HU04.6 — Planejamento de Despesas Continuadas** *(evolução para produção — issues [#18](https://github.com/munizigor/comprascbmdf/issues/18), [#28](https://github.com/munizigor/comprascbmdf/issues/28) e parte da [#30](https://github.com/munizigor/comprascbmdf/issues/30))*
* **Como** Planejamento/Orçamento, **quero** cadastrar despesas continuadas recorrentes (água, luz, combustível, pneu) com projeção anual, incluindo o custeio continuado no PARF, **para que** o PCA/PLOA contemple o gasto recorrente sem depender de o setor lembrar de requisitar item a item.
* **Critérios de Aceite:**
  * Marcação de itens/classes como despesa continuada (reaproveita o campo `servicoContinuado` do DFD).
  * Projeção anual estimada a partir do histórico/consumo médio.
  * Esses itens entram automaticamente na consolidação do PCA/PLOA do exercício.

#### **HU04.7 — Projeção Orçamentária por GND com Janela Móvel** *(evolução para produção — issues [#19](https://github.com/munizigor/comprascbmdf/issues/19) e [#27](https://github.com/munizigor/comprascbmdf/issues/27))*
* **Como** Planejamento/Diretoria, **quero** visualizar a projeção agregada por Grupo de Natureza de Despesa (GND) e por classe CATMAT/CATSER, **para que** eu tenha a visão do PLOA no formato exigido e enxergue o gasto projetado à frente.
* **Critérios de Aceite:**
  * O relatório PLOA agrega por GND, além da natureza detalhada, com as colunas Planejado/Comprometido/Empenhado/Liquidado/Pago/Saldo.
  * Projeção em **janela móvel de 12 meses**, independente do exercício financeiro (refinamento da #27).
  * Exportável em CSV.

#### **HU04.8 — Indicadores de Vínculo ao Planejamento Estratégico e ao PPA/LOA** *(evolução para produção — issues [#20](https://github.com/munizigor/comprascbmdf/issues/20) e [#25](https://github.com/munizigor/comprascbmdf/issues/25))*
* **Como** Direção/Planejamento, **quero** medir quanto das contratações está vinculado a objetivos do planejamento estratégico e aos indicadores do PPA/LOA, **para que** a Direção enxergue o alinhamento entre o que se compra e a estratégia.
* **Critérios de Aceite:**
  * O painel mostra % (e valor) de demandas com `vinculoPlanejamento` preenchido — o campo já é capturado no DFD; esta HU fecha o laço.
  * Recorte por objetivo/meta estratégica, por indicador do PPA/LOA e por setor; demandas sem vínculo são sinalizadas.

#### **HU04.9 — Reserva de Contingência no Planejamento** *(evolução para produção — issues [#22](https://github.com/munizigor/comprascbmdf/issues/22) e parte da [#24](https://github.com/munizigor/comprascbmdf/issues/24))*
* **Como** Planejamento/Orçamento, **quero** registrar reserva de contingência (e suprimento de fundos) no PCA, por setorial, **para que** o planejado não consuma 100% do teto e exista folga declarada para o imprevisto.
* **Critérios de Aceite:**
  * O planejamento por setorial comporta os campos de reserva de contingência e suprimento de fundos, deduzidos do saldo alocável.
  * Os relatórios PCA/PLOA exibem a reserva separada do valor planejado em demandas.
* **Pré-condição de negócio:** os **percentuais** por setorial são decisão do Comitê/EMG (§7.3, P2) — o software materializa os campos, não a política.

---

### **ÉPICO 05: Gestão de Atas de Registro de Preços (ARPs)**
> Cadastro, acompanhamento, controle de saldo e utilização de ARPs vigentes para agilizar o atendimento aos pedidos.

#### **HU05.1 — Cadastro e Manutenção de Atas**
* **Como** Gestor do Catálogo e Atas, **quero** cadastrar e gerir ARPs (número, fornecedor, vigência, itens, quantidades e valores), **para que** o sistema saiba quais materiais/serviços têm contratação imediata disponível.
* **Critérios de Aceite:**
  * O cadastro inclui número, fornecedor, vigência, itens vinculados, quantidades e valores unitários.
  * Atas vencidas deixam de ser oferecidas para vinculação a novos pedidos.

#### **HU05.2 — Consulta de Saldo e Consumo de Ata**
* **Como** Gestor de Contratações / Requisitante, **quero** consultar o saldo disponível de cada item em ata e vincular pedidos a uma ARP vigente, **para que** o pedido seja atendido sem nova licitação.
* **Critérios de Aceite:**
  * Cada item do catálogo vinculado a uma ARP exibe o saldo disponível.
  * Ao vincular um pedido, o saldo é debitado automaticamente; o sistema impede consumo acima do disponível.

#### **HU05.3 — Alerta de ARP Próxima do Vencimento** *(evolução para produção — issue [#15](https://github.com/munizigor/comprascbmdf/issues/15))*
* **Como** Gestor do Catálogo e Atas / Gestor de Contratações, **quero** ser alertado quando uma ARP se aproximar do fim da vigência (e ao esgotar saldo), **para que** eu inicie a reposição **antes** de vencer, evitando ruptura e contratação emergencial.
* **Critérios de Aceite:**
  * Cada ARP exibe dias restantes de vigência e saldo disponível.
  * O sistema sinaliza atas a vencer dentro de uma janela configurável (ex.: 90/60/30 dias).
  * A partir do alerta, é possível abrir demanda já pré-vinculada à classe/itens da ata.

---

### **ÉPICO 06: Assistente Virtual e Inteligência de Compras** *(incremental — não impeditivo)*
> Assistente virtual e recomendações baseadas no histórico para orientar o requisitante a montar pedidos mais precisos.

#### **HU06.1 — Assistente Virtual de Compras (Wizard/Guia)**
* **Como** Requisitante da ponta, **quero** ser guiado passo a passo durante a montagem do pedido, **para que** eu preencha justificativas, quantidades e especificações corretas mesmo sem conhecimento técnico do processo licitatório.
* **Critérios de Aceite:**
  * O assistente orienta a escolha de categoria, especificação e urgência.
  * O uso é opcional — o requisitante pode montar o pedido pelo fluxo padrão do catálogo.

#### **HU06.2 — Sugestões Baseadas em Histórico e IA**
* **Como** Requisitante/Gestor, **quero** receber recomendações de reposição ou complemento com base no histórico de consumo do setor e em sazonalidade, **para que** o setor não esqueça itens essenciais e evite compras emergenciais.
* **Critérios de Aceite:**
  * As recomendações se baseiam no histórico de pedidos do próprio setor.
  * A ausência do módulo de IA não impede o envio normal de um pedido.

#### **HU06.3 — Sugestões de Compras Correlatas (Kits/Bundles)** *(opcional)*
* **Como** Requisitante, **quero** que ao selecionar um item principal (ex.: viatura) o sistema sugira itens dependentes (seguro, manutenção preventiva, combustível, rádio), **para que** a contratação saia completa — reforçando o "comprar melhor".
* **Critérios de Aceite:**
  * As sugestões funcionam por regras determinísticas (kits pré-configurados), sem depender de IA.
  * O requisitante pode ignorá-las e prosseguir apenas com o item principal.

---

### **ÉPICO 07: Avaliação do Pedido pelo Requisitante**
> Ao final do processo, o requisitante avalia a experiência da compra — nos moldes de um marketplace —, retroalimentando a instituição sobre catálogo, fornecedores e especificações.

#### **HU07.1 — Avaliação do Pedido Recebido**
* **Como** Requisitante, **quero** avaliar, após o recebimento, a qualidade do produto/serviço, o fornecedor, a especificação e a condução da contratação, além de registrar sugestões livres, **para que** a instituição melhore catálogo, fornecedores e especificações futuras.
* **Critérios de Aceite:**
  * A avaliação só fica disponível no status `Pedido Entregue`.
  * Notas separadas para qualidade do produto/serviço, fornecedor e especificação, mais campo de texto livre.

#### **HU07.2 — Consolidação das Avaliações para Gestão**
* **Como** Gestor de Contratações / Gestor do Catálogo e Atas, **quero** visualizar as avaliações consolidadas por item, classe, fornecedor e ARP, **para que** eu identifique fornecedores ou itens mal avaliados e ajuste especificações ou substitua fornecedores.
* **Critérios de Aceite:**
  * Exibe média por fornecedor e por item/classe, com filtro para notas baixas.
  * Avaliações vinculadas a uma ARP alimentam a decisão de renovação ou substituição da ata.

---

### **ÉPICO 08: Priorização e Governança Contínua**
> Fechar a lacuna entre tornar demandas **visíveis** e fazer a instituição **escolher** entre elas. Dos cinco efeitos da §2.2, a *fragilidade da priorização* não era endereçada por nenhum épico, e o *aumento das contratações emergenciais* era apenas contabilizado, nunca contido. Sem critério explícito de priorização, o produto se reduz a "mais um formulário".

#### **HU08.1 — Fila Priorizada por Score Transparente**
* **Como** Comitê de Governança, **quero** ver as demandas pendentes ordenadas por um score com pesos declarados — criticidade (40), risco de postergar (30), obrigatoriedade legal (20) e prontidão da instrução (10) —, **para que** a ordem seja explicável ao setor preterido e auditável depois.
* **Critérios de Aceite:**
  * A tela exibe a decomposição do score ("Por quê?"), e as parcelas somam exatamente o total apresentado.
  * Criticidade e risco são declarados pelo **requisitante**; obrigatoriedade legal e prontidão, pelo **Planejamento** — nenhum ator pontua a própria demanda em todos os critérios.
  * Empates são desfeitos de forma estável: score decrescente, depois data de criação crescente, depois número do protocolo.
  * Pedidos anteriores ao épico, sem criticidade declarada, têm a nota derivada da urgência dos itens, e a fila indica tratar-se de valor derivado, não declarado.

#### **HU08.2 — Decisão de Exceção com Custo Político**
* **Como** Comitê de Governança, **quero** poder mover manualmente um pedido na fila informando o motivo, **para que** a realidade administrativa que o score não captura seja acomodada sem que a exceção fique invisível.
* **Critérios de Aceite:**
  * O ajuste exige motivo com no mínimo 20 caracteres; sem ele, a operação é recusada.
  * O pedido ajustado exibe, na fila, quem ajustou e o motivo declarado.
  * O ajuste **expira ao fechar o ciclo** — o arbítrio vale para o ciclo em que foi exercido.

#### **HU08.3 — Rito de Ciclo Quadrimestral do PCA**
* **Como** Comitê de Governança, **quero** abrir e fechar ciclos quadrimestrais registrando ata no fechamento, **para que** o PCA passe a ser revisto em rito periódico com autor e data.
* **Critérios de Aceite:**
  * Apenas um ciclo aberto por vez; o fechamento exige ata com no mínimo 20 caracteres e registra autor e data.
  * O fechamento **congela uma fotografia imutável** da fila (protocolo, setor, valor, score, posição, status e marca de urgência). Alterar o status depois **não** altera a fotografia.
  * Congelar não trava a tramitação: os pedidos seguem avançando.

#### **HU08.4 — Contenção da Contratação por Urgência**
* **Como** Gestor Setorial / Comitê, **quero** que a inclusão por urgência exija motivo robusto e segundo aprovador, **para que** furar a fila seja possível, mas nunca silencioso nem unilateral.
* **Critérios de Aceite:**
  * Justificativa com no mínimo 30 caracteres.
  * O aprovador deve ser **diferente** de quem solicita; a operação é recusada em caso contrário.
  * A ação fica disponível na tela onde a fila setorial é julgada, ao lado de "Aprovar no Setor" e "Solicitar Suplementação".
  * A decisão é registrada na trilha de auditoria (§6.3), com autor, aprovador, motivo e tela de origem.

#### **HU08.5 — Painel de Urgências por Setor**
* **Como** Planejamento/Diretoria, **quero** ver o percentual do valor que entrou por urgência, no total e por setor, **para que** a instituição saiba se está contendo a exceção ou apenas contabilizando-a.
* **Critérios de Aceite:**
  * Exibe valor total, valor por urgência e percentual, por setor.
  * Setores acima de 20% aparecem sinalizados; o painel indica a meta institucional (até 10% do ciclo).

#### **HU08.6 — Visibilidade da Posição pelo Requisitante**
* **Como** Requisitante, **quero** ver a posição do meu pedido na fila e a conta que a produziu, **para que** eu entenda por que minha demanda vem antes ou depois de outra.
* **Critérios de Aceite:**
  * Posição e score aparecem no acompanhamento enquanto o pedido estiver pendente de decisão, com os quatro critérios que compuseram o score.
  * Se a posição foi ajustada manualmente pelo comitê, o requisitante vê essa marca.

#### **HU08.7 — Fila e Ciclos por Exercício** *(evolução para produção)*
* **Como** Comitê/Planejamento, **quero** que a fila e os ciclos sejam escopados pelo **exercício-alvo** (ano do PCA), **para que** demandas de anos diferentes não concorram na mesma fila.
* **Nota de escopo:** no protótipo, o exercício é **capturado** no DFD, é **dimensão de filtro** no Planejamento e nas Contratações e **materializa o Item de PCA** por (exercício × classe), mas `buildFila` e a fotografia do ciclo ainda misturam exercícios (decisão consciente de contenção de risco).
* **Critérios de Aceite (produção):**
  * A fila é filtrável/segmentada por exercício; score e desempate operam dentro de cada exercício.
  * O ciclo quadrimestral vincula seu `ano`/`quadrimestre` ao exercício-alvo, e a fotografia registra o exercício de cada demanda.
  * A janela de revisão (15/set–15/nov) condiciona as inclusões por urgência ao exercício em revisão.

---

### **ÉPICO 09: Matriz de Dotação de Material (baseline dos pedidos)**
> Hoje os pedidos nascem sem referência objetiva. A Matriz de Dotação registra, para cada **(setor, item)**, quanto a unidade **deveria ter** (dotação prevista, normativa) e quanto **tem** (carga atual). A diferença — a **lacuna** — é a necessidade objetiva que ancora cada solicitação.

#### **HU09.1 — Necessidades da Unidade a partir da Dotação**
* **Como** Requisitante, **quero** ver, ao abrir o catálogo, os itens em que minha unidade está **abaixo** da dotação prevista, com a quantidade que falta, **para que** eu solicite a partir de uma referência, não do improviso.
* **Critérios de Aceite:**
  * A quantidade sugerida desconta o que já está em **pedidos em andamento** do setor.
  * O card do item exibe o status de dotação (atual/prevista e a lacuna).
  * Pedir **acima** da dotação prevista gera aviso que orienta a justificativa (não bloqueia).

#### **HU09.2 — Painel Gerencial da Matriz de Dotação**
* **Como** Gestor/Planejamento, **quero** ver prevista × atual × lacuna × cobertura por setor e por item, com déficits e excedentes destacados, **para que** a instituição enxergue o baseline de material e o alimente no PCA.

#### **HU09.3 — Evolução para produção**
* No protótipo, as bases (prevista e carga atual) são **semeadas / somente leitura**. Em produção: (a) edição da matriz pela UI, com trilha de auditoria; (b) integração da carga atual a um sistema de inventário/patrimônio; (c) uso da **lacuna de dotação** como critério explícito na priorização (demanda amparada por baseline pesa mais que demanda avulsa).

---

### **ÉPICO 10: Catálogo Institucional de Indicadores e OKRs** *(implementação futura)*
> Os cinco KPIs da §8 medem o sucesso **deste produto**. Este épico trata do outro conjunto: os indicadores que a **instituição** precisa cumprir — metas do **PLANES 2025–2030**, execução do **PPA/LOA** e práticas auditadas pelo **TCU** —, cuja matéria-prima nasce no ciclo de contratações que o produto orquestra. O instrumento é um **catálogo curado**: fechado na interface (o usuário não cria indicador) e extensível por curadoria. Catálogo completo, com fichas e os nove objetivos, em [catalogo_indicadores_okr.md](catalogo_indicadores_okr.md).

#### **HU10.1 — Painel de OKRs Institucionais**
* **Como** Planejamento/SELOF/Alto Comando, **quero** ver os indicadores organizados por objetivo, filtráveis pela origem (PLANES, PPA/PARF, TCU, produto), **para que** a Corporação acompanhe num só lugar o que é cobrado dela por fora.
* **Critérios de Aceite:**
  * Cada indicador exibe a **origem normativa** (número do indicador do PLANES, prática do TCU ou dispositivo do Regimento Interno).
  * O painel mantém a apresentação da §8: **valor atual, linha de base e meta lado a lado**.
  * O filtro por origem isola o recorte de cada instância (PLANES para o Comando, práticas do TCU para a auditoria).

#### **HU10.2 — Catálogo Fechado e Curado**
* **Como** SELOF/DEALF (curadoria), **quero** que o conjunto de indicadores seja lista fechada e versionada, e não um campo que qualquer usuário preenche, **para que** todo indicador tenha origem, dono, meta e série comparável.
* **Critérios de Aceite:**
  * A interface **não** oferece "criar indicador"; oferece **filtrar, ativar e desativar**.
  * A inclusão se dá por alteração versionada do catálogo, com registro de quem solicitou, quem aprovou e a partir de quando vale.
  * A curadoria verifica duplicidade, aderência à fronteira do produto e viabilidade da fonte.
  * Indicador com ficha incompleta (sem meta, prazo ou fonte) fica como **proposto** e **não** sobe ao painel.

#### **HU10.3 — Vínculo da Demanda ao Objetivo Estratégico do PLANES**
* **Como** Requisitante/Planejamento, **quero** indicar, no DFD, a qual objetivo do PLANES a demanda se vincula, escolhendo de **lista fechada** dos objetivos vigentes, **para que** a Corporação afirme quanto do que compra está a serviço da estratégia — hoje o campo é texto livre e não consolida.
* **Critérios de Aceite:**
  * A seleção vem do ciclo do PLANES **vigente**, não de lista fixa no código.
  * O planejamento consolida demandas e valor por objetivo estratégico.
  * Demandas anteriores não têm vínculo fabricado: ficam marcadas como sem vínculo declarado.

#### **HU10.4 — Declaração de Calculabilidade e Cobertura**
* **Como** Planejamento/auditoria, **quero** que cada indicador declare se é calculável hoje e, quando não for, o que exatamente falta, **para que** a lacuna vire item de roadmap em vez de número inventado.
* **Critérios de Aceite:**
  * Cada indicador exibe um estado: calculável hoje; dado coletado com cálculo ausente; requer atributo novo; requer integração externa; ou indicador de contexto aferido fora do sistema.
  * Indicador não calculável aparece com o **motivo declarado**, nunca com valor estimado.
  * Indicadores de contexto (como o iGG) aparecem identificados como tal, com o produto na condição de fonte de evidência.

#### **HU10.5 — Índice de Efetividade de Compras ("Compra boa")**
* **Como** SELOF/DEALF, **quero** apurar o **IND. 5.4 do PLANES** a partir da avaliação do pedido e da trilha de auditoria, **para que** a Corporação meça se está comprando **melhor**, e não apenas se está comprando.
* **Critérios de Aceite:**
  * A dimensão *Qualidade* deriva do formulário de avaliação do pedido (escala 1–5), normalizada conforme o PLANES.
  * A dimensão *Tempo* reusa o cálculo de lead time existente, com a normalização e o teto do PLANES.
  * Enquanto as dimensões de redução percentual e de punições não existirem, o índice composto é declarado **não reportável**, e as dimensões disponíveis exibidas isoladamente.

#### **HU10.6 — Evidência Exportável para Prestação de Contas**
* **Como** SELOF, **quero** exportar, por exercício, o valor de cada indicador com fórmula, fonte e limites de cobertura, **para que** o dado alimente o Relatório de Gestão, diligências e a pontuação no iGG sem redigitação.
* **Critérios de Aceite:**
  * A exportação traz a ficha do indicador junto do número.
  * Declara a cobertura da base no período, como já faz o rodapé metodológico da tela de Indicadores.

#### **HU10.7 — Solicitação de Inclusão de Indicador**
* **Como** qualquer área (SELOF, DEALF, EMG, Comando, unidade requisitante), **quero** solicitar a inclusão de indicador novo pela plataforma preenchendo os campos da ficha, **para que** o catálogo cresça sem abrir digitação livre.
* **Critérios de Aceite:**
  * A solicitação entra como **proposta** e segue para curadoria; **nunca** vira indicador ativo diretamente.
  * A curadoria classifica a proposta como **resultado-chave** (evidencia avanço de um objetivo, tem meta e prazo) ou **indicador de acompanhamento** (monitor temático, com vigência própria e sem objetivo por trás).
  * O solicitante acompanha a situação do seu pedido, como acompanha um pedido de material.
  * A proposta pode ser registrada sem meta ou fonte definidas — permanece proposta até a ficha fechar.
  * A recusa vem com motivo registrado (duplicidade, fora da fronteira, ou fonte inviável).

#### **HU10.8 — Ciclo de Vida do Indicador**
* **Como** SELOF/DEALF (curadoria), **quero** marcar indicadores como suspensos ou aposentados ao fim de cada ciclo normativo, mantendo a série histórica, **para que** o catálogo envelheça junto com o PLANES e o PPA sem perder a memória.
* **Critérios de Aceite:**
  * Indicador **aposentado** sai do painel e **permanece** no catálogo com sua série e o vínculo para o sucessor.
  * Indicador **suspenso** (fonte indisponível) é declarado como tal, sem exibir o último valor conhecido como se fosse atual.
  * Ao fim de cada ciclo do PLANES, do PPA ou do exercício do PCA, a curadoria revalida, suspende, sucede ou aposenta cada entrada.

---

### **ÉPICO 11: Fontes de Recurso e Fundos** *(estrutural — evolução para produção)*
> O modelo de dados conhece `tipoDespesa` e `naturezaDespesa`, mas **não a origem do recurso**. Este épico introduz a dimensão **fonte de recurso / fundo** (FUSP, FISP, duodécimo/tesouro, emendas parlamentares, convênios) em todo o ciclo — do pedido aos relatórios —, permitindo governar não só *quanto* se gasta, mas *de onde* sai e *o que cada fonte exige*. Origem: [#21](https://github.com/munizigor/comprascbmdf/issues/21) (canônica), com [#26](https://github.com/munizigor/comprascbmdf/issues/26) e [#31](https://github.com/munizigor/comprascbmdf/issues/31) absorvidas. Por alterar o esquema de dados e as integrações (SIAFI), é **estrutural**: avaliar impacto antes de qualquer HU dependente.

#### **HU11.1 — Dimensão Fonte de Recurso no Modelo e nos Relatórios**
* **Como** Planejamento/Orçamento, **quero** registrar a fonte de recurso/fundo de cada demanda, **para que** os relatórios e o acompanhamento financeiro reflitam a origem do recurso, não só a natureza da despesa.
* **Critérios de Aceite:**
  * O item/pedido passa a ter campo "fonte de recurso/fundo".
  * PCA/PLOA e o painel financeiro permitem recorte e subtotais por fonte/fundo — incluindo **emendas e convênios** (refinamento da #31).
  * Alertas de teto/saldo passam a considerar a fonte, quando aplicável.

#### **HU11.2 — Justificativa de Compra por Indicador de Fundo**
* **Como** Planejamento/Orçamento, **quero** vincular produtos/contratações a indicadores do fundo que os financia (ex.: FUSP), **para que** a compra nasça com a justificativa que o fundo exige e a prestação de contas seja derivada do próprio sistema.
* **Critérios de Aceite:**
  * Um item/contratação com fonte "fundo" declara o(s) indicador(es) do fundo que atende.
  * Relatório de prestação de contas por fundo: valor executado × indicadores atendidos.

---

### **ÉPICO 12: Adoção e Carga Inicial via PNCP** *(estratégia de implantação — evolução para produção)*
> O sistema não pode depender de input manual para ter valor no primeiro exercício — em 2026, por exemplo, não haverá registro de demandas pela plataforma. A estratégia de partida é **consumir dados que já existem**: as compras publicadas no PNCP e o que está pendente no PCA vigente. Origem: [#35](https://github.com/munizigor/comprascbmdf/issues/35). Conecta-se ao KPI 5 (adoção) e ao RNF de integração com o PNCP (§6.3).

#### **HU12.1 — Bootstrap da Base com Compras Realizadas e PCA Pendente**
* **Como** Planejamento/Diretoria, **quero** importar do PNCP as contratações já realizadas e carregar o PCA vigente (itens pendentes), sem depender de registro manual, **para que** a plataforma opere desde o primeiro dia com a fotografia real e as análises tenham base histórica.
* **Critérios de Aceite:**
  * Importação das contratações do CBMDF publicadas no PNCP (dado público), mapeadas para o modelo do produto (classe, natureza, valores, datas).
  * Carga do PCA vigente com os itens pendentes, distinguíveis dos pedidos nascidos na plataforma.
  * Pedidos importados são marcados como **migrados** (gênese migrada, sem timestamps fabricados) e declarados nos rodapés de cobertura dos indicadores.

---

## 6. Requisitos Não Funcionais

### 6.1 Usabilidade
* A nomenclatura da interface (DFD, TR, Nota de Empenho, PCA, PLOA, classes de material) deve ser a já praticada nos processos administrativos do CBMDF, para não exigir treinamento adicional.
* A navegação entre catálogo, pedidos, status, contratações e planejamento deve ser acessível de qualquer página.

### 6.2 Desempenho e Escalabilidade
* Resposta fluida ao volume de uso interno do CBMDF, sem necessidade de escala para múltiplos órgãos ou tenants externos.

### 6.3 Segurança e Conformidade
* Aderência à Lei nº 14.133/2021 e às normas internas de compras públicas do CBMDF.
* Conformidade com a LGPD quanto aos dados pessoais de requisitantes (nome, matrícula, setor).
* Controle de acesso por perfil, hoje inexistente no protótipo e necessário na evolução do produto.
* **Trilha de auditoria — implementada:** toda mudança de status passa por um ponto único de mutação que grava estado anterior, estado novo, data, autor, perfil, tela de origem e justificativa. Transições fora do fluxo previsto exigem marcação explícita de excepcionalidade. Pedidos anteriores à implementação recebem uma entrada de gênese marcada como migrada, sem timestamps intermediários fabricados.
* **Integração com Sistemas Governamentais:** APIs REST/Web Services para comunicação bidirecional com SEI (abertura de processos e envio de minutas), SIAFI (empenho e liquidação) e PNCP (dados de contratação e atas).
* **Sincronismo de Catálogo:** o catálogo deve ser mantido em sincronia com a base oficial do Grifo, garantindo a padronização dos códigos PDM/PDS.
* **Integridade do Catálogo de Indicadores:** o catálogo institucional (§8.4) deve ser **lista fechada e versionada**, sem entrada livre pela interface — filtrar, ativar e desativar, nunca criar. A inclusão se dá por curadoria registrada, com rastro de quem solicitou, quem aprovou e desde quando vale. Nenhum valor pode ser exibido quando a fonte não existe: o indicador é apresentado como não reportável, com o motivo declarado.
* **Dependência externa — códigos CATMAT/CATSER na base de inventário** ([#29](https://github.com/munizigor/comprascbmdf/issues/29)): a integração da carga atual da Matriz de Dotação (HU09.3) e a consolidação por classe dependem de a base de inventário (Grifo/SISGEPAT) carregar os códigos CATMAT/CATSER de cada item. É débito técnico **da base externa** — fora da fronteira do produto, mas registrado como pré-requisito de integração a articular com os donos daqueles sistemas.

### 6.4 Confiabilidade e Disponibilidade
* Disponibilidade compatível com um sistema administrativo interno, com backup periódico dos dados uma vez implementado o backend.

---

## 7. Restrições, Suposições e Pendências

### 7.1 Restrições
* **Técnica (estado atual):** o protótipo não possui backend nem banco de dados — os pedidos ficam no `localStorage` do navegador de cada usuário, sem autenticação. A evolução requer backend com banco centralizado e autenticação corporativa.
* **Legal:** as classificações orçamentárias devem seguir os padrões orçamentários públicos vigentes e a Lei nº 14.133/2021.
* **Organizacional:** a nomenclatura de status (§4.2) deve continuar refletindo o fluxo real de tramitação do CBMDF.
* **Indicadores de fonte externa:** parte dos indicadores do catálogo (§8.4) depende de dados que não nascem neste sistema — SIAFI, PNCP, inventário, apontamentos de controle. Enquanto as integrações da §6.3 não existirem, esses indicadores permanecem marcados como não calculáveis, com a dependência nomeada. O sistema não estima o que não mede.
* **IA como componente incremental:** o Épico 06 é opcional. O Go-Live deve funcionar plenamente com regras determinísticas (kits pré-configurados e validação por regras).

### 7.2 Suposições
* Os setores requisitantes têm acesso à rede/intranet do CBMDF.
* CESMA e Planejamento/Orçamento validarão a correspondência entre os status do sistema e as etapas reais do processo.

### 7.3 Decisões institucionais pendentes *(insumos do Comitê — não são requisitos ainda)*

O padrão é o apontado pela pesquisa com servidores: *tornar visível é função do software; decidir é função do Comitê*. As pendências abaixo vieram da triagem de issues e só viram requisito depois de decididas:

* **P1 — Matriz operacional × administrativa** ([#23](https://github.com/munizigor/comprascbmdf/issues/23) e parte da [#30](https://github.com/munizigor/comprascbmdf/issues/30)): definir o eixo área-fim × área-meio — inclusive se área-meio terá cota protegida — e como o custeio de operações se enquadra. Quando decidido, candidato a critério no score do Épico 08.
* **P2 — Percentuais de suprimento de fundos e reserva de contingência por setorial** ([#24](https://github.com/munizigor/comprascbmdf/issues/24)): a HU04.9 prevê os campos; os percentuais são política orçamentária do Comitê/EMG.
* **P3 — CSOs (máximo 5) e subportfólios** ([#30](https://github.com/munizigor/comprascbmdf/issues/30)): definição organizacional da estrutura de portfólio de contratações; depois de definida, candidata a dimensão estrutural de agrupamento.

---

## 8. Métricas de Sucesso do Produto (KPIs)

Um indicador só é cobrável quando tem **linha de base**, **meta numérica**, **prazo** e **fonte do dado**. Metas na forma "reduzir" ou "aumentar" não permitem afirmar sucesso nem fracasso. A tabela abaixo fixa os quatro elementos.

| # | KPI | Definição operacional | Linha de base | Meta | Prazo | Fonte do dado |
| :-- | :--- | :--- | :--- | :--- | :--- | :--- |
| 1 | **Tempo médio de tramitação** | Dias corridos entre o registro do DFD e o status "Pedido Entregue" | Amostra retrospectiva do SEI (§8.2) | ≤ **200 dias** | 12 meses | `historico[]` do pedido |
| 2 | **Cumprimento do SLA por macro-etapa** | % das passagens por etapa concluídas dentro do prazo da §8.1 | **0%** — não mensurável antes da trilha de auditoria | ≥ **80%** (50% em 3 meses, 65% em 6 meses) | 12 meses | `historico[]` + SLA da §8.1 |
| 3 | **Aderência do planejado ao executado** | Desvio entre a fotografia congelada no fechamento do ciclo e o valor efetivamente comprometido | 1º ciclo fechado — **não reportável no 1º ciclo** | desvio ≤ **15%** | 2º exercício | `cbmdf_pca_ciclos` |
| 4 | **Contratações por urgência** | % do valor contratado que entrou fora da fila priorizada | Dispensas emergenciais do CBMDF no PNCP, últimos 24 meses | ≤ **10%** do ciclo e **nenhum setor acima de 20%** | 18 meses | status e `historico[]` |
| 5 | **Adoção pelas unidades** | % das unidades do CBMDF com ao menos um pedido registrado | **0%** | ≥ **90%** das unidades e ≥ 70% do valor | 12 meses | pedidos por setor |

O painel `indicadores.html` exibe, para cada KPI, o **valor atual, a linha de base e a meta lado a lado** — um número isolado não permite afirmar melhora.

### 8.1 SLA por macro-etapa

Referência inicial para o KPI 2, a ser calibrada pela CESMA e pelo Planejamento após o primeiro quadrimestre de operação:

| Macro-etapa | Prazo | Justificativa |
| :--- | :--- | :--- |
| 1 — Ideação & Necessidade | 5 dias | Triagem do DFD pela unidade |
| 2 — Validação & PCA | 15 dias | Análise setorial e decisão de priorização |
| 3 — Estruturação (ETP/TR) | 45 dias | Etapa mais pesada: pesquisa de preços e especificação |
| 4 — Edital & Seleção | 60 dias | Limitado por prazos legais da Lei nº 14.133/2021 |
| 5 — Aquisição & Fabricação | 45 dias | Depende do fornecedor e do objeto |
| 6 — Entrega & Finalização | 30 dias | Recebimento, liquidação e pagamento |
| **Total ponta a ponta** | **200 dias** | Meta do KPI 1 |

Etapas em curso contam com o tempo decorrido até a data da consulta: um pedido parado há 110 dias numa etapa de 45 já estourou o SLA, e omiti-lo maquiaria o indicador.

### 8.2 Protocolo de coleta da linha de base

Os KPIs 1 e 2 não têm linha de base histórica no sistema — o mundo anterior são planilhas dispersas e processos no SEI. A coleta proposta:

* **Amostra:** 30 processos de aquisição encerrados nos últimos 24 meses, estratificados por macro-etapa de maior recorrência.
* **Dados por processo:** 7 datas — registro do DFD, conclusão do ETP, conclusão do TR, publicação do edital, homologação, emissão da nota de empenho e recebimento definitivo.
* **Esforço estimado:** ~1 semana de 1 servidor com acesso ao SEI.
* **KPI 4:** linha de base vem do PNCP (dispensas emergenciais dos últimos 24 meses) — dado público, sem coleta interna.
* **KPI 3:** **não reportável no 1º ciclo.** Sem fotografia congelada anterior não existe denominador, e estimar um seria fabricar a linha de base que o produto se propõe a substituir.

O KPI 3 tem ainda um período de maturação: a fotografia congela demandas **ainda não executadas**, então o desvio começa próximo de 100% por construção e cai à medida que o ciclo avança. O painel exibe os números desde o primeiro dia, mas só emite veredicto contra a meta depois de um quadrimestre de execução — até lá, o valor aparece com asterisco e explicação.

### 8.3 Fonte do dado e limites de cobertura

Os indicadores 1 e 2 são calculados **apenas sobre pedidos com trilha completa**. Pedidos migrados carregam uma entrada de gênese sem datas intermediárias — que não foram fabricadas —, ficam fora dos cálculos de tempo, e o painel declara no rodapé quantos foram excluídos e a cobertura percentual da base. Essa declaração é parte do indicador: uma média sobre metade da base não significa o mesmo que sobre toda ela.

Duas limitações declaradas:

* A segunda metade da meta do KPI 5 (≥ 70% do valor institucional) exige o total empenhado pelo CBMDF, que só vem da **integração com o SIAFI** (§6.3). O painel calcula a adoção por unidades e marca a parcela de valor como não calculável.
* O KPI 4 mede o valor que entrou por urgência **dentro da plataforma**. Contratações conduzidas inteiramente fora dela não aparecem — e o KPI 5 é justamente o indicador dessa lacuna de cobertura.

### 8.4 Catálogo institucional de indicadores e OKRs *(implementação futura)*

Os cinco KPIs acima são do produto. Os indicadores que o **CBMDF** precisa cumprir são outros e existem antes deste sistema: metas do **PLANES 2025–2030**, execução do **PPA/LOA** e práticas de governança auditadas pelo **TCU** (iGG/iESGo). O produto não os substitui — passa a ser a **fonte de dado** de boa parte deles, porque é no ciclo de contratações que esses números nascem. O instrumento é o **Catálogo de Indicadores**, detalhado em [catalogo_indicadores_okr.md](catalogo_indicadores_okr.md) e especificado no Épico 10; cada entrada recebe ficha com origem normativa, definição operacional, fórmula, meta, prazo, fonte, responsável, limites de cobertura, **estado de calculabilidade** e **ciclo de vida** (proposto, vigente, suspenso, aposentado).

O achado que justifica a prioridade do tema: o indicador oficial mais aderente ao produto em todo o PLANES — o **IND. 5.4, "Indicador de efetividade de compras e contratações"** (meta: índice "Compra boa" em pelo menos 80% das compras) — é composto por quatro dimensões, e o sistema **já coleta duas delas sem usá-las**: *Qualidade* é o formulário de avaliação do pedido (escala 1–5) e *Tempo* é o lead time já calculado sobre a trilha de auditoria. Faltam a redução percentual entre valor estimado e homologado e o registro de apontamentos dos órgãos de controle.
