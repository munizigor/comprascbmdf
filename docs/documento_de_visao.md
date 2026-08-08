# Documento de Visão do Produto
## CBMDF Marketplace — Camada de Governança e Planejamento Logístico e Financeiro das Contratações e Aquisições

---

## 1. Introdução

### 1.1 Propósito
O propósito deste documento é coletar, analisar e definir as necessidades de alto nível e os recursos fundamentais do **CBMDF Marketplace**. Ele fornece uma visão clara e compartilhada entre os patrocinadores (*stakeholders*), a equipe de desenvolvimento, os setores requisitantes, a área de planejamento/orçamento e a Central de Suprimentos e Material (CESMA) sobre o escopo e o direcionamento do produto.

### 1.2 Escopo
O **CBMDF Marketplace** é a **camada institucional de governança e planejamento logístico e financeiro das contratações e aquisições** do Corpo de Bombeiros Militar do Distrito Federal (CBMDF). O sistema abrange desde a requisição de materiais e serviços pelos setores operacionais e administrativos, passando pela tramitação processual do pedido (DFD, TR, Nota de Empenho), o agrupamento das demandas em contratações por classe, até a consolidação orçamentária do Plano de Contratações Anual (PCA) e do Projeto de Lei Orçamentária Anual (PLOA), com acompanhamento da execução da despesa (planejado → comprometido → empenhado → liquidado → pago).

O produto **recebe, prioriza e planeja** as necessidades e **orquestra** a tramitação até a contratação — ele *planeja e governa* o ciclo de aquisição. A **execução** de cada especialidade permanece no sistema próprio: a **custódia logística** (catálogo, material, estoque e patrimônio) no Grifo e no SISGEPAT, e a **execução financeira e contábil** (empenho, liquidação e pagamento) no SIAFI. Ou seja, o CBMDF Marketplace **não executa a logística nem a contabilidade — ele as orquestra, integra e consolida**. Essa fronteira ("planejar e governar" × "executar") é uma escolha de projeto que distingue a solução de um ERP e é aprofundada no documento [Análise de Escopo — ERP](analise_escopo_erp.md).

### 1.3 Definições, Acrônimos e Abreviações
* **CBMDF:** Corpo de Bombeiros Militar do Distrito Federal.
* **PCA:** Plano de Contratações Anual.
* **PLOA:** Projeto de Lei Orçamentária Anual.
* **DFD:** Documento de Formalização de Demanda.
* **ETP:** Estudo Técnico Preliminar, que avalia a melhor solução para atender à necessidade (compra, aluguel, outsourcing) e o padrão de qualidade de mercado.
* **TR:** Termo de Referência.
* **Edital de Licitação:** Instrumento de convocação de fornecedores (Pregão, Concorrência) ou, alternativamente, processo de Contratação Direta (Dispensa/Inexigibilidade).
* **Nota de Empenho:** Documento que registra o comprometimento orçamentário de uma despesa.
* **Recebimento Provisório / Recebimento Definitivo:** Etapas sucessivas de conferência do material entregue — a primeira sumária (quantidade/volumes), a segunda com vistoria e testes detalhados que resultam em aceite ou rejeição.
* **Destino Final:** Encerramento do ciclo de vida do item recebido — tombamento no patrimônio (bem permanente), entrega ao estoque/almoxarifado (bem de consumo) ou entrada em operação contínua (serviço).
* **CESMA:** Central de Suprimentos e Material, unidade responsável pelo recebimento e distribuição de materiais.
* **Grupo/Classe:** Classificação do material segundo o Padrão Descritivo de Materiais (PDM), usada para categorizar e agrupar itens de contratação.
* **Tipo de Despesa:** Classificação orçamentária do item (Investimento ou Custeio).
* **Natureza de Despesa:** Código orçamentário associado ao item (ex.: 3.3.90.30, 4.4.90.52).
* **Comprometido / Empenhado / Liquidado / Pago:** Estágios sucessivos da execução orçamentária de uma despesa pública. `Liquidado` e `Pago` são status reais do pedido (não apenas colunas derivadas dos relatórios de planejamento), atingidos ao final da Etapa 6 (Entrega & Finalização).
* **Setores:** unidades do CBMDF que originam ou tramitam pedidos, como COMOP, CESMA, DITIC, DIMAT e COMAP.
* **Grifo:** Sistema corporativo legado/existente do CBMDF utilizado para gestão de materiais, cujo catálogo será reaproveitado pelo CBMDF Marketplace.
* **SISGEPAT:** Sistema de Gerenciamento de Patrimônio, responsável pela execução da custódia patrimonial (tombamento e controle de bens permanentes). A execução logística permanece nele e no Grifo — o CBMDF Marketplace planeja e orquestra, mas não executa essa custódia.
* **SEI (Sistema Eletrônico de Informações):** Sistema de gestão de processos e documentos administrativos do Distrito Federal.
* **SIAFI:** Sistema Integrado de Administração Financeira, utilizado para execução orçamentária e financeira.
* **PNCP:** Portal Nacional de Contratações Públicas, exigência da Lei nº 14.133/2021.
* **ARP:** Ata de Registro de Preços.

---

## 2. Posicionamento

### 2.1 Oportunidade de Negócio
Os setores do CBMDF hoje solicitam materiais e serviços de forma dispersa — por planilhas, ofícios e controles paralelos —, sem visibilidade unificada do andamento processual de cada pedido (DFD, TR, empenho, recebimento) nem do seu impacto no orçamento agregado por PCA e PLOA. Essa fragmentação dificulta o planejamento de contratações, atrasa a tramitação de demandas e torna trabalhosa a prestação de contas sobre valores planejados *versus* executados. O **CBMDF Marketplace** responde a essa necessidade centralizando a requisição, a tramitação e a consolidação orçamentária em uma única ferramenta.

O mantra institucional do produto é **"comprar melhor"**: o objetivo não é aumentar o volume de compras, e sim reduzir compras pulverizadas, otimizar lotes de contratação e garantir que as contratações saiam completas — com especificação, orçamento e fornecedor adequados. Complementarmente, há a oportunidade de orientar o requisitante durante a montagem do pedido (assistente virtual e sugestões de itens correlatos), tema aprofundado no Épico 06.

### 2.2 Causa-Raiz Identificada
A análise do problema mostrou que a **causa-raiz não é a periodicidade do Plano de Contratações Anual (PCA) em si**, mas a **ausência de um sistema institucional de governança que transforme o planejamento das contratações em um processo contínuo de gestão**. A periodicidade anual do PCA é apenas a manifestação visível dessa lacuna estrutural.

Os efeitos dessa lacuna se refletem em:
* **Baixa previsibilidade das demandas** dos setores ao longo do ano.
* **Fragilidade da priorização institucional** entre pedidos concorrentes.
* **Retrabalho** na consolidação manual de informações que já deveriam estar centralizadas.
* **Desarticulação entre os atores envolvidos** (setores requisitantes, CESMA, Planejamento/Orçamento e Direção).
* **Aumento das contratações emergenciais**, resultado direto da falta de um processo contínuo de acompanhamento.

Essa causa-raiz orienta a proposta de solução: o CBMDF Marketplace não deve ser apenas uma ferramenta de requisição, mas o instrumento que sustenta um **processo contínuo de governança das contratações**, e não apenas um repositório atualizado uma vez por ano.

### 2.3 Declaração do Problema
| **O problema de** | Falta de visibilidade centralizada sobre o andamento dos pedidos de compra e ausência de um processo contínuo de governança das contratações. |
| **afeta** | Setores requisitantes, a Central de Suprimentos e Material (CESMA), a área de Planejamento/Orçamento e a Direção do CBMDF. |
| **cujo impacto é** | Demandas represadas ou perdidas, retrabalho na consolidação manual de valores para o PCA e o PLOA, dificuldade em identificar o estágio processual (DFD, TR, empenho) de cada pedido, baixa previsibilidade orçamentária e aumento de contratações emergenciais. |
| **uma solução bem-sucedida seria** | Uma plataforma única que centralize o catálogo de materiais/serviços, permita o acompanhamento contínuo do status de cada pedido por todos os envolvidos e consolide automaticamente os valores planejados e executados por classe, setor e natureza de despesa — transformando o planejamento de uma atualização anual em um processo de gestão contínuo. |

### 2.4 Declaração de Posição do Produto
* **Para:** Setores requisitantes do CBMDF, gestores da Central de Suprimentos e Material (CESMA) e a área de Planejamento/Orçamento.
* **Que:** Precisam requisitar materiais e serviços, tramitar essas demandas até a entrega e manter o controle orçamentário do PCA e do PLOA.
* **O CBMDF Marketplace:** É a camada de governança e planejamento logístico e financeiro das contratações e aquisições.
* **Que:** Unifica catálogo de requisição, priorização das demandas, tramitação de status processual, agrupamento de contratações por classe e consolidação orçamentária automática — orquestrando os sistemas que executam cada especialidade (Grifo, SISGEPAT, SIAFI, SEI e PNCP) em vez de substituí-los.
* **Diferente de:** Controles paralelos em planilhas e ofícios, que exigem atualização e consolidação manuais e não oferecem rastreabilidade ponta a ponta; e diferente de um ERP, pois **não é o sistema de registro do patrimônio, do estoque ou da contabilidade** — esses permanecem em seus sistemas próprios.
* **Nosso produto:** Proporciona rastreabilidade do pedido do início ao recebimento e consolidação automática dos valores planejado, comprometido, empenhado, liquidado e pago — sempre orientado pelo mantra **"comprar melhor"**: lotes otimizados, contratações completas e menos compras pulverizadas.

---

## 3. Descrição dos Envolvidos (*Stakeholders*) e Usuários

### 3.1 Resumo dos Stakeholders
| Nome | Função | Responsabilidade no Projeto |
| :--- | :--- | :--- |
| **Comando/Direção do CBMDF** | Patrocínio institucional | Aprovação da adoção da ferramenta e alinhamento com a estratégia de gestão de suprimentos. |
| **Central de Suprimentos e Material (CESMA)** | Recebimento e distribuição de materiais | Validação do fluxo de tramitação e recebimento dos pedidos. |
| **Área de Planejamento/Orçamento** | Gestão orçamentária | Validação dos relatórios de PCA/PLOA e da correta classificação de despesas. |
| **Comitê de Governança de Contratações** | Priorização institucional e rito de revisão do PCA | Definição dos pesos do critério de priorização, condução dos ciclos quadrimestrais e contenção das contratações por urgência. |

### 3.2 Perfil dos Usuários
| Usuário | Descrição | Principais Necessidades |
| :--- | :--- | :--- |
| **Requisitante** | Militar/servidor de um setor (ex.: COMOP, DITIC, DIMAT, COMAP) que monta pedidos no catálogo. | Buscar e filtrar materiais/serviços por categoria, montar um carrinho com quantidade e urgência por item, enviar a requisição vinculada ao seu setor e, ao final, avaliar a qualidade do pedido recebido (produto, fornecedor, contratação e especificação do material). |
| **Gestor de Tramitação** | Responsável por atualizar o status de cada pedido conforme avança no processo administrativo. | Visualizar todos os pedidos, filtrar por usuário/status e atualizar o estágio ao longo das 6 macro-etapas de tramitação (ver seção 4.2, item 2), da formalização da demanda (DFD) até a finalização (recebimento, liquidação e pagamento). |
| **Gestor de Contratações** | Responsável por agrupar pedidos em contratações por classe e complementar itens manualmente. | Visualizar pedidos agrupados por classe, incluir itens adicionais com classificação orçamentária completa, excluir/restaurar grupos ou itens. |
| **Gestor do Catálogo e Atas (CESMA/DIMAT)** | Responsável pela manutenção do catálogo padronizado e pela gestão das Atas de Registro de Preços. | Homologar novos itens, sincronizar o catálogo com o sistema Grifo, cadastrar/atualizar ARPs, controlar saldos de atas e disponibilizar itens vinculados a atas vigentes. |
| **Planejamento/Diretoria** | Consome os relatórios consolidados de PCA e PLOA. | Visão agregada dos valores planejado, comprometido, empenhado, liquidado e pago, por setor, tipo, classe e natureza de despesa. |
| **Comitê de Governança de Contratações** | Instância colegiada que decide a ordem de atendimento das demandas concorrentes e conduz o rito quadrimestral de revisão do PCA. | Ver a fila priorizada com o critério explícito que a ordenou, ajustar posições em caráter excepcional mediante justificativa registrada, abrir e fechar ciclos com ata e fotografia do planejado, e acompanhar o percentual de contratações que entraram por urgência em cada setor. |

---

## 4. Visão Geral do Produto

### 4.1 Perspectiva do Produto
A visão de evolução do produto é a de uma aplicação com backend próprio, banco de dados centralizado e integrado à base institucional do CBMDF, autenticação corporativa e Design System do gov.br, mantendo a mesma lógica de negócio já validada no protótipo: catálogo de materiais/serviços, priorização das demandas, tramitação de status e consolidação orçamentária.

Arquiteturalmente, o produto é uma **camada de orquestração** (padrão *Source-to-Pay*): é dono dos domínios de governança e planejamento das contratações e **cliente** dos sistemas que executam cada especialidade. Ele deve interoperar, via APIs/Web Services, com os sistemas já usados pelo CBMDF e pelo Distrito Federal:
* **Grifo:** fonte primária para carga, padronização e sincronização do catálogo de materiais e serviços.
* **SISGEPAT:** destino da custódia patrimonial — o tombamento de bens permanentes recebidos permanece nele; o Marketplace planeja a aquisição e registra o encaminhamento, não a custódia.
* **SEI:** abertura e instrução automática de processos administrativos (DFD e TR), com envio de links e documentos gerados no Marketplace.
* **SIAFI:** consulta de saldos orçamentários e emissão automática de pré-empenho, empenho, liquidação e registro de pagamento — a execução financeiro-contábil é dele, não do Marketplace.
* **PNCP:** publicação automatizada do PCA, editais, contratos e Atas de Registro de Preços, conforme a Lei nº 14.133/2021.

### 4.2 Resumo dos Principais Recursos
1. **Catálogo e Carrinho de Requisição:** Busca e filtro de materiais/serviços por categoria, definição de quantidade e urgência por item, envio do pedido vinculado a um usuário e setor.
2. **Painel de Tramitação de Status:** Atualização do estágio de cada pedido ao longo de um pipeline granular organizado em 6 macro-etapas, refletindo a jornada real de uma contratação pública:
   1. **Ideação & Necessidade:** `DFD Registrado`.
   2. **Validação & PCA:** `Em Análise Setorial` → `Aguardando Suplementação` (se necessário) → `Incluído no PCA` (via regular) ou `Incluído no PCA (Urgência)` (inclusão extraordinária); pedidos reprovados vão para `Arquivado`.
   3. **Estruturação no Processo (ETP/TR):** `ETP em Elaboração` → `Pesquisa de Preços` → `TR Elaborado` → `Reserva Orçamentária Confirmada`.
   4. **Edital & Seleção:** `Edital Publicado` → `Em Seleção de Fornecedor` → `Nota de Empenho Emitida`.
   5. **Aquisição & Fabricação:** `Ordem de Fornecimento Emitida` → `Em Trânsito ou Fabricação`.
   6. **Entrega & Finalização:** `Recebimento Provisório` → `Recebimento Definitivo` (ou `Recebimento Rejeitado (Aguardando Substituição)`, se o material apresentar defeito) → `Liquidado` → `Pago` → `Pedido Entregue`.

   `Arquivado` e `Recebimento Rejeitado (Aguardando Substituição)` são estados de exceção fora do caminho principal, não etapas de progresso.
3. **Acompanhamento do Pedido pelo Requisitante:** Consulta do andamento de cada solicitação, com filtros por usuário e status.
4. **Gestão de Contratações:** Agrupamento automático dos itens pedidos por classe, com possibilidade de inclusão manual de itens e exclusão/restauração de grupos.
5. **Relatórios de Planejamento Orçamentário (PCA/PLOA):** Consolidação automática dos valores planejado, comprometido, empenhado, liquidado e pago, agregados por setor/tipo/classe (PCA) e por tipo de despesa/natureza de despesa (PLOA), com exportação dos pedidos em CSV.
6. **Gestão de Atas de Registro de Preços (ARP):** Cadastro, controle de saldo e vinculação de pedidos a Atas vigentes, agilizando o atendimento das demandas.
7. **Gestão Financeira Ativa:** Controle de cotas/limites financeiros por setor, acompanhamento do cronograma de desembolso e monitoramento do fluxo Empenhado → Liquidado → Pago.
8. **Avaliação do Pedido:** Ao final do processo, o requisitante avalia a qualidade do produto/serviço, o fornecedor, a contratação e a especificação do material, com espaço para sugestões.

---

## 5. Épicos e Histórias de Usuário (HUs) de Alto Nível

Abaixo, apresentamos os Épicos estratégicos da plataforma com suas respectivas Histórias de Usuário (HUs) prioritárias de alto nível, incluindo seus critérios de aceite preliminares.

---

### **ÉPICO 01: Catálogo e Emissão de Pedidos**
> **Descrição:** Permitir que os setores requisitantes localizem materiais e serviços no catálogo e enviem pedidos completos, com quantidade e urgência definidas por item.

#### **HU01.1 — Busca e Filtro de Materiais no Catálogo**
* **Como:** Requisitante
* **Eu quero:** Buscar materiais/serviços por nome ou descrição e filtrar por categoria (escritório, manutenção, higiene, segurança, saúde)
* **Para que:** Eu encontre rapidamente os itens que preciso requisitar.
* **Critérios de Aceite:**
  * A busca deve considerar nome e descrição do item.
  * O filtro por categoria deve ser combinável com a busca textual.
  * Cada item deve exibir tipo (MATERIAL/SERVIÇO), grupo/classe e tipo de despesa.

#### **HU01.2 — Montagem do Carrinho e Envio da Requisição**
* **Como:** Requisitante
* **Eu quero:** Adicionar itens ao carrinho, definir quantidade e urgência (normal, média, alta) por item e enviar a requisição
* **Para que:** Meu pedido seja registrado com todas as informações necessárias para tramitação.
* **Critérios de Aceite:**
  * O carrinho deve exibir quantidade, urgência e subtotal por item, além do total estimado do pedido.
  * O envio deve vincular o pedido ao usuário e setor selecionados, com data/hora e observações opcionais.
  * O pedido enviado deve ficar disponível para tramitação, acompanhamento e relatórios de planejamento.

---

### **ÉPICO 02: Tramitação e Acompanhamento de Status**
> **Descrição:** Prover visibilidade do estágio processual de cada pedido, tanto para quem gerencia a tramitação quanto para quem fez a requisição.

#### **HU02.1 — Atualização do Status do Pedido**
* **Como:** Gestor de Tramitação
* **Eu quero:** Atualizar o status de cada pedido ao longo das 6 macro-etapas de tramitação descritas na seção 4.2 (item 2) — Ideação & Necessidade, Validação & PCA, Estruturação no Processo (ETP/TR), Edital & Seleção, Aquisição & Fabricação, Entrega & Finalização
* **Para que:** O andamento real do processo de aquisição fique refletido no sistema.
* **Critérios de Aceite:**
  * Deve ser possível filtrar pedidos por usuário e por status antes de atualizar.
  * A alteração de status deve refletir imediatamente nos indicadores de resumo (pedidos no filtro, arquivados, entregues).
  * A mudança de status deve impactar automaticamente os relatórios de planejamento (PCA/PLOA).

#### **HU02.2 — Consulta do Andamento pelo Requisitante**
* **Como:** Requisitante
* **Eu quero:** Consultar a jornada do meu pedido, com filtro por usuário e por status atual
* **Para que:** Eu saiba em qual etapa do processo minha requisição se encontra sem precisar contatar outros setores.
* **Critérios de Aceite:**
  * A busca deve permitir localizar pedidos por nome, matrícula, setor ou observações.
  * Deve ser exibido um resumo com total de pedidos no filtro, arquivados e entregues.

---

### **ÉPICO 03: Gestão de Contratações**
> **Descrição:** Agrupar as demandas registradas por classe de material/serviço, permitindo consolidar itens de múltiplos pedidos em contratações e complementar com itens adicionais.

#### **HU03.1 — Agrupamento de Pedidos por Classe**
* **Como:** Gestor de Contratações
* **Eu quero:** Visualizar os itens pedidos agrupados automaticamente por classe
* **Para que:** Eu consiga consolidar demandas semelhantes em uma única contratação.
* **Critérios de Aceite:**
  * Os grupos devem exibir quantidade de itens e valor total estimado por classe.
  * Deve ser possível buscar e filtrar os grupos por classe.
  * Deve ser possível excluir um grupo ou item específico, com opção de restauração.

#### **HU03.2 — Inclusão Manual de Item de Contratação**
* **Como:** Gestor de Contratações
* **Eu quero:** Incluir manualmente um item de contratação informando nome, classe, grupo, setor solicitante, categoria, tipo, tipo de despesa, natureza de despesa, quantidade, urgência e preço unitário
* **Para que:** Demandas que não passaram pelo catálogo padrão também sejam consideradas na contratação e no planejamento orçamentário.
* **Critérios de Aceite:**
  * O item incluído manualmente deve aparecer agrupado junto aos demais itens da mesma classe.
  * O item deve entrar na contagem de itens e no valor total estimado das contratações.

---

### **ÉPICO 04: Gestão Orçamentária e Financeira**
> **Descrição:** Consolidar automaticamente os valores das demandas registradas nos relatórios de Plano de Contratações Anual (PCA) e Projeto de Lei Orçamentária Anual (PLOA), refletindo o estágio de execução orçamentária de cada pedido, e prover gestão financeira ativa dos limites de cada setor.

#### **HU04.1 — Relatório de PCA por Tipo/Classe e por Setor**
* **Como:** Planejamento/Diretoria
* **Eu quero:** Visualizar os valores agregados por tipo e classe, e também por setor, tipo e classe
* **Para que:** Eu tenha visão consolidada do que cada setor planeja contratar e em que classe de material/serviço.
* **Critérios de Aceite:**
  * Cada linha deve exibir os valores de Planejado, Comprometido, Empenhado, Liquidado, Pago e Saldo.
  * Os valores devem ser calculados automaticamente a partir do status de cada pedido (pedidos em status pendente de aprovação — `DFD Registrado`, `Em Análise Setorial`, `Aguardando Suplementação` — ou `Arquivado` não entram no total planejado).
  * Deve haver subtotais por tipo e por setor, além do total geral.

#### **HU04.2 — Relatório de PLOA por Tipo e Natureza de Despesa**
* **Como:** Planejamento/Diretoria
* **Eu quero:** Visualizar os valores agregados por tipo de despesa (Investimento/Custeio) e natureza de despesa
* **Para que:** Eu consiga acompanhar a execução orçamentária no formato exigido pelo PLOA.
* **Critérios de Aceite:**
  * Cada linha deve exibir os valores de Planejado, Comprometido, Empenhado, Liquidado, Pago e Saldo.
  * Deve haver subtotais por tipo de despesa e o total geral do relatório.

#### **HU04.3 — Gestão Financeira Ativa por Setor**
* **Como:** Planejamento/Orçamento
* **Eu quero:** Definir limites financeiros por diretoria/setor e acompanhar o fluxo de liquidação e pagamento em tempo real, integrado ao SIAFI
* **Para que:** Nenhum setor ultrapasse sua cota orçamentária e a execução financeira seja acompanhada continuamente, e não apenas no fechamento do PCA/PLOA.
* **Critérios de Aceite:**
  * Deve ser possível cadastrar um limite financeiro por setor e período.
  * O sistema deve alertar quando o valor Comprometido/Empenhado de um setor se aproximar do limite definido.
  * O status Liquidado/Pago de cada pedido deve refletir, via integração com o SIAFI, o cronograma de desembolso real.

---

### **ÉPICO 05: Gestão de Atas de Registro de Preços (ARPs)**
> **Descrição:** Permitir o cadastro, acompanhamento, controle de saldo e utilização de Atas de Registro de Preços vigentes para agilizar o atendimento aos pedidos.

#### **HU05.1 — Cadastro e Manutenção de Atas**
* **Como:** Gestor do Catálogo e Atas
* **Eu quero:** Cadastrar e gerir Atas de Registro de Preços (número, fornecedor, vigência, itens, quantidades e valores)
* **Para que:** O sistema saiba quais materiais/serviços possuem contratação imediata disponível.
* **Critérios de Aceite:**
  * O cadastro deve incluir número da ata, fornecedor, vigência, itens vinculados, quantidades e valores unitários.
  * Atas vencidas devem deixar de ser oferecidas para vinculação a novos pedidos.

#### **HU05.2 — Consulta de Saldo e Consumo de Ata**
* **Como:** Gestor de Contratações / Requisitante
* **Eu quero:** Consultar o saldo disponível de cada item em ata e vincular pedidos diretamente a uma ARP vigente
* **Para que:** O pedido seja atendido com rapidez, sem necessidade de nova licitação.
* **Critérios de Aceite:**
  * Cada item do catálogo vinculado a uma ARP deve exibir o saldo disponível na ata.
  * Ao vincular um pedido a uma ARP, o saldo consumido deve ser debitado automaticamente.
  * O sistema deve impedir o consumo de saldo acima do disponível na ata.

---

### **ÉPICO 06: Assistente Virtual e Inteligência de Compras (Incremento/Opcional)**
> **Descrição:** Oferecer um assistente virtual e recomendações baseadas no histórico de compras para orientar o usuário final a montar pedidos mais precisos e eficientes. Este épico é **incremental** e **não impeditivo** para o funcionamento base do sistema.

#### **HU06.1 — Assistente Virtual de Compras (Wizard/Guia)**
* **Como:** Requisitante da ponta
* **Eu quero:** Ser guiado por um assistente passo a passo durante a montagem do pedido
* **Para que:** Eu consiga preencher justificativas, quantidades e especificações corretas, mesmo sem conhecimento técnico aprofundado do processo de licitação.
* **Critérios de Aceite:**
  * O assistente deve orientar a escolha de categoria, especificação e urgência do item.
  * O uso do assistente é opcional — o requisitante pode montar o pedido sem ele, pelo fluxo padrão do catálogo.

#### **HU06.2 — Sugestões de Compras Baseadas em Histórico e IA (Incremento)**
* **Como:** Requisitante / Gestor
* **Eu quero:** Receber recomendações automáticas de reposição ou complemento de pedidos com base no histórico de consumo do setor e em datas comemorativas/sazonais
* **Para que:** O setor não esqueça itens essenciais para sua operação e evite compras emergenciais.
* **Critérios de Aceite:**
  * As recomendações devem se basear no histórico de pedidos do próprio setor.
  * A ausência do módulo de IA não pode impedir o envio normal de um pedido.

#### **HU06.3 — Sugestões de Compras Correlatas (Kits/Bundles)** *(opcional)*
* **Como:** Requisitante
* **Eu quero:** Ao selecionar um item principal (ex.: viatura), receber sugestões automáticas de itens ou serviços dependentes (ex.: seguro, manutenção preventiva, combustível, equipamentos de rádio)
* **Para que:** A contratação saia completa, evitando retrabalho por itens esquecidos — reforçando o mantra "comprar melhor".
* **Critérios de Aceite:**
  * As sugestões de itens correlatos devem funcionar por regras de negócio determinísticas (kits pré-configurados), não dependendo de IA.
  * O requisitante pode ignorar as sugestões e prosseguir apenas com o item principal.

---

### **ÉPICO 07: Avaliação do Pedido pelo Requisitante**
> **Descrição:** Permitir que, ao final do processo, o requisitante avalie a experiência da compra — nos moldes de um marketplace —, retroalimentando a instituição sobre a qualidade do catálogo, dos fornecedores e das especificações técnicas.

#### **HU07.1 — Avaliação do Pedido Recebido**
* **Como:** Requisitante
* **Eu quero:** Avaliar, após o recebimento do pedido, a qualidade do produto/serviço, o fornecedor, a especificação do material e como foi conduzida a contratação, além de registrar sugestões em texto livre
* **Para que:** A instituição tenha retroalimentação para melhorar catálogo, fornecedores e especificações futuras.
* **Critérios de Aceite:**
  * A avaliação só fica disponível quando o pedido estiver no status "Pedido Entregue".
  * Deve permitir nota separada para qualidade do produto/serviço, fornecedor e especificação do material.
  * Deve permitir um campo de texto livre para comentários e sugestões.

#### **HU07.2 — Consolidação das Avaliações para Gestão**
* **Como:** Gestor de Contratações / Gestor do Catálogo e Atas
* **Eu quero:** Visualizar as avaliações consolidadas por item, classe, fornecedor e ARP
* **Para que:** Eu identifique fornecedores ou itens recorrentemente mal avaliados e ajuste especificações ou substitua fornecedores nas próximas contratações.
* **Critérios de Aceite:**
  * Deve exibir a média de avaliação por fornecedor e por item/classe.
  * Deve permitir filtrar avaliações com nota baixa para ação corretiva.
  * Avaliações vinculadas a uma ARP devem alimentar a decisão de renovação ou substituição da ata.

---

### **ÉPICO 08: Priorização e Governança Contínua**
> **Descrição:** Fechar a lacuna entre tornar demandas **visíveis** e fazer a instituição **escolher** entre elas. A seção 2.2 lista cinco efeitos da causa-raiz; a *fragilidade da priorização institucional entre pedidos concorrentes* não era endereçada por nenhum épico, e o *aumento das contratações emergenciais* era apenas contabilizado, nunca contido. Governança é decidir entre demandas concorrentes com recurso escasso — sem um critério explícito de priorização, o produto se reduz a "mais um formulário".

#### **HU08.1 — Fila Priorizada por Score Transparente**
* **Como:** Comitê de Governança de Contratações
* **Eu quero:** Ver as demandas pendentes ordenadas por um score com pesos declarados — criticidade (40), risco de postergar (30), obrigatoriedade legal (20) e prontidão da instrução (10)
* **Para que:** A ordem de atendimento seja explicável ao setor preterido e auditável depois, em vez de depender da ordem de chegada ou de articulação informal.
* **Critérios de Aceite:**
  * A tela deve exibir a decomposição do score ("Por quê?"), e as parcelas exibidas devem somar exatamente o total apresentado.
  * Criticidade e risco são declarados pelo **requisitante**; obrigatoriedade legal e prontidão da instrução, pelo **Planejamento** — nenhum ator pontua a própria demanda em todos os critérios.
  * Empates devem ser desfeitos de forma estável: score decrescente, depois data de criação crescente, depois número do protocolo.
  * Pedidos anteriores ao épico, sem criticidade declarada, devem ter a nota derivada da urgência já informada nos itens, e a fila deve indicar que se trata de valor derivado, não declarado.

#### **HU08.2 — Decisão de Exceção com Custo Político**
* **Como:** Comitê de Governança de Contratações
* **Eu quero:** Poder mover manualmente um pedido na fila, informando o motivo
* **Para que:** A realidade administrativa que o score não captura possa ser acomodada sem que a exceção se torne invisível.
* **Critérios de Aceite:**
  * O ajuste manual exige motivo com no mínimo 20 caracteres; sem ele, a operação é recusada.
  * O pedido ajustado exibe, na fila, o nome de quem ajustou e o motivo declarado.
  * O ajuste **expira ao fechar o ciclo** — o arbítrio vale para o ciclo em que foi exercido e não se torna permanente.

#### **HU08.3 — Rito de Ciclo Quadrimestral do PCA**
* **Como:** Comitê de Governança de Contratações
* **Eu quero:** Abrir e fechar ciclos quadrimestrais, registrando uma ata no fechamento
* **Para que:** O PCA deixe de ser uma atualização anual e passe a ser revisto em rito periódico com autor e data.
* **Critérios de Aceite:**
  * Apenas um ciclo pode estar aberto por vez.
  * O fechamento exige ata com no mínimo 20 caracteres e registra autor e data.
  * O fechamento **congela uma fotografia imutável** da fila (protocolo, setor, valor, score, posição, status e marca de urgência). Alterar o status de um pedido depois **não** altera a fotografia.
  * Congelar não trava a tramitação: os pedidos seguem avançando normalmente.

#### **HU08.4 — Contenção da Contratação por Urgência**
* **Como:** Gestor Setorial / Comitê de Governança
* **Eu quero:** Que a inclusão de um pedido por urgência exija motivo robusto e um segundo aprovador
* **Para que:** Furar a fila seja possível, mas nunca silencioso nem unilateral.
* **Critérios de Aceite:**
  * A inclusão por urgência exige justificativa com no mínimo 30 caracteres.
  * O aprovador deve ser **diferente** de quem solicita a inclusão; a operação é recusada em caso contrário.
  * A ação deve estar disponível na tela onde a fila setorial é julgada, ao lado de "Aprovar no Setor" e "Solicitar Suplementação".
  * A decisão é registrada na trilha de auditoria (Épico 02), com autor, aprovador, motivo e tela de origem.

#### **HU08.5 — Painel de Urgências por Setor**
* **Como:** Planejamento/Diretoria
* **Eu quero:** Ver o percentual do valor que entrou por urgência, no total e por setor
* **Para que:** A instituição saiba se está contendo a exceção ou apenas contabilizando-a.
* **Critérios de Aceite:**
  * Deve exibir valor total, valor por urgência e percentual, por setor.
  * Setores acima de 20% do valor por urgência devem aparecer sinalizados.
  * O painel deve indicar a meta institucional (até 10% do ciclo).

#### **HU08.6 — Visibilidade da Posição pelo Requisitante**
* **Como:** Requisitante
* **Eu quero:** Ver a posição do meu pedido na fila e a conta que a produziu
* **Para que:** Eu entenda por que minha demanda vem antes ou depois de outra, sem precisar acionar informalmente o Planejamento.
* **Critérios de Aceite:**
  * A posição e o score devem aparecer no acompanhamento do pedido enquanto ele estiver pendente de decisão.
  * Deve exibir os quatro critérios que compuseram o score.
  * Se a posição tiver sido ajustada manualmente pelo comitê, o requisitante deve ver essa marca.

#### **HU08.7 — Fila e Ciclos por Exercício** *(evolução para produção — fora do protótipo)*
* **Como:** Comitê de Governança de Contratações / Planejamento
* **Eu quero:** Que a fila priorizada e os ciclos do PCA sejam escopados pelo **exercício-alvo** (ano do PCA) da demanda
* **Para que:** Demandas de anos diferentes não concorram na mesma fila — o PCA é anual (o PGC planeja o exercício N+1), e priorizar um pedido de 2027 contra um de 2028 na mesma ordenação distorce a decisão.
* **Nota de escopo:** No protótipo, o exercício é **capturado** no DFD, é **dimensão de filtro** no Planejamento e nas Contratações e **materializa o Item de PCA** por (exercício × classe), mas a **fila da governança** (`buildFila`) e a **fotografia do ciclo** ainda misturam todos os exercícios (decisão consciente para conter o risco no protótipo).
* **Critérios de Aceite (produção):**
  * A fila priorizada deve ser filtrável/segmentada por exercício; o score e o desempate operam dentro de cada exercício.
  * O ciclo quadrimestral (HU08.3) deve vincular seu `ano`/`quadrimestre` ao exercício-alvo do PCA, e a fotografia congelada deve registrar o exercício de cada demanda.
  * A janela de revisão (15/set–15/nov) deve condicionar as inclusões por urgência ao exercício em revisão.

---

## 6. Requisitos Não Funcionais (RNFs)

### 6.1 Usabilidade
* A nomenclatura utilizada na interface (DFD, TR, Nota de Empenho, PCA, PLOA, classes de material) deve ser a mesma já praticada nos processos administrativos do CBMDF, para não exigir treinamento adicional dos requisitantes.
* A navegação entre catálogo, pedidos, status, contratações e planejamento deve ser acessível a partir de qualquer página do sistema.

### 6.2 Desempenho e Escalabilidade
* O sistema deve responder de forma fluida ao volume de uso interno do CBMDF (setores administrativos e operacionais), sem necessidade de escala para múltiplos órgãos ou tenants externos.

### 6.3 Segurança e Conformidade
* Aderência à Lei nº 14.133/2021 (Nova Lei de Licitações e Contratos) e às normas internas de compras públicas do CBMDF.
* Conformidade com a Lei Geral de Proteção de Dados (LGPD) quanto aos dados pessoais de requisitantes (nome, matrícula, setor).
* Controle de acesso por perfil (requisitante, gestor de tramitação, gestor de contratações, gestor do catálogo e atas, planejamento), hoje inexistente no protótipo e necessário na evolução do produto.
* Registro de trilha de auditoria para alterações de status de pedido, **implementado**: toda mudança de status passa por um ponto único de mutação que grava estado anterior, estado novo, data, autor, perfil, tela de origem e justificativa. Transições fora do fluxo previsto exigem marcação explícita de excepcionalidade. Pedidos anteriores à implementação recebem uma entrada de gênese marcada como migrada, sem timestamps intermediários fabricados.
* **RNF — Integração com Sistemas Governamentais:** o sistema deve dispor de APIs REST/Web Services para comunicação bidirecional com o SEI (abertura de processos e envio de minutas), o SIAFI (empenho e liquidação) e o PNCP (envio de dados de contratação e atas).
* **RNF — Sincronismo de Catálogo:** o catálogo de materiais e serviços deve ser mantido em sincronia com a base oficial do Grifo, garantindo a padronização dos códigos PDM/PDS.

### 6.4 Confiabilidade e Disponibilidade
* Disponibilidade compatível com um sistema administrativo interno, com backup periódico dos dados de pedidos, contratações e planejamento uma vez implementado o backend com banco de dados.

---

## 7. Restrições e Suposições

### 7.1 Restrições
* **Técnica (estado atual):** O protótipo atual não possui backend nem banco de dados — os pedidos são armazenados apenas no `localStorage` do navegador de cada usuário, sem autenticação. A evolução do produto requer a implementação de um backend com banco de dados centralizado e autenticação corporativa.
* **Legal:** Os dados e classificações orçamentárias (tipo de despesa, natureza de despesa, grupo/classe) devem seguir os padrões orçamentários públicos vigentes e a Lei nº 14.133/2021.
* **Organizacional:** A nomenclatura de status do pedido — organizada nas 6 macro-etapas descritas na seção 4.2 (item 2): Ideação & Necessidade, Validação & PCA, Estruturação no Processo (ETP/TR), Edital & Seleção, Aquisição & Fabricação, Entrega & Finalização — deve continuar refletindo o fluxo real de tramitação do CBMDF.
* **IA como componente incremental:** o desenvolvimento dos recursos baseados em Inteligência Artificial para sugestões avançadas de compras (Épico 06) é opcional/incremental. A primeira versão operacional (Go-Live) do CBMDF Marketplace deve funcionar plenamente com regras de negócio determinísticas (kits correlatos pré-configurados e validação por regras), garantindo que a entrega principal não fique refém do módulo de IA.

### 7.2 Suposições
* Os setores requisitantes possuem acesso à rede/intranet do CBMDF para utilização da ferramenta.
* A Central de Suprimentos e Material (CESMA) e a área de Planejamento/Orçamento validarão a correspondência entre os status do sistema e as etapas reais do processo de aquisição.

---

## 8. Métricas de Sucesso do Produto (KPIs)

Um indicador só é cobrável quando tem **linha de base**, **meta numérica**, **prazo** e **fonte do dado**. As versões anteriores desta seção declaravam metas na forma "reduzir" ou "aumentar", que não permitem afirmar sucesso nem fracasso. A tabela abaixo fixa os quatro elementos para cada KPI.

| # | KPI | Definição operacional | Linha de base | Meta | Prazo | Fonte do dado |
| :-- | :--- | :--- | :--- | :--- | :--- | :--- |
| 1 | **Tempo médio de tramitação** | Dias corridos entre o registro do DFD e o status "Pedido Entregue" | Amostra retrospectiva do SEI (ver §8.2) | ≤ **200 dias** | 12 meses | `historico[]` do pedido |
| 2 | **Cumprimento do SLA por macro-etapa** | % das passagens por etapa concluídas dentro do prazo da §8.1 | **0%** — não mensurável antes da trilha de auditoria | ≥ **80%** (50% em 3 meses, 65% em 6 meses) | 12 meses | `historico[]` + SLA da §8.1 |
| 3 | **Aderência do planejado ao executado** | Desvio entre a fotografia congelada no fechamento do ciclo e o valor efetivamente comprometido | 1º ciclo fechado — **não reportável no 1º ciclo** | desvio ≤ **15%** | 2º exercício | `cbmdf_pca_ciclos` |
| 4 | **Contratações por urgência** | % do valor contratado que entrou fora da fila priorizada | Dispensas emergenciais do CBMDF no PNCP, últimos 24 meses | ≤ **10%** do ciclo e **nenhum setor acima de 20%** | 18 meses | status e `historico[]` |
| 5 | **Adoção pelas unidades** | % das unidades do CBMDF com ao menos um pedido registrado | **0%** | ≥ **90%** das unidades e ≥ 70% do valor | 12 meses | pedidos por setor |

O painel `indicadores.html` exibe, para cada KPI, o **valor atual, a linha de base e a meta lado a lado** — um número isolado não permite afirmar melhora.

### 8.1 SLA por macro-etapa

O KPI 2 depende de um prazo esperado por etapa, que não existia em lugar nenhum do projeto. Os prazos abaixo são a referência inicial, a ser calibrada pela CESMA e pelo Planejamento após o primeiro quadrimestre de operação:

| Macro-etapa | Prazo | Justificativa |
| :--- | :--- | :--- |
| 1 — Ideação & Necessidade | 5 dias | Triagem do DFD pela unidade |
| 2 — Validação & PCA | 15 dias | Análise setorial e decisão de priorização |
| 3 — Estruturação (ETP/TR) | 45 dias | Etapa mais pesada: pesquisa de preços e especificação |
| 4 — Edital & Seleção | 60 dias | Limitado por prazos legais da Lei nº 14.133/2021 |
| 5 — Aquisição & Fabricação | 45 dias | Depende do fornecedor e do objeto |
| 6 — Entrega & Finalização | 30 dias | Recebimento, liquidação e pagamento |
| **Total ponta a ponta** | **200 dias** | Meta do KPI 1 |

Etapas ainda em curso contam com o tempo decorrido até a data da consulta: um pedido parado há 110 dias numa etapa de 45 já estourou o SLA, e omiti-lo do cálculo maquiaria o indicador.

### 8.2 Protocolo de coleta da linha de base

Os KPIs 1 e 2 não têm linha de base histórica no sistema, porque o mundo anterior a este produto são planilhas dispersas e processos no SEI. A coleta proposta:

* **Amostra:** 30 processos de aquisição encerrados nos últimos 24 meses, estratificados por macro-etapa de maior recorrência.
* **Dados por processo:** 7 datas — registro do DFD, conclusão do ETP, conclusão do TR, publicação do edital, homologação, emissão da nota de empenho e recebimento definitivo.
* **Esforço estimado:** aproximadamente 1 semana de trabalho de 1 servidor com acesso ao SEI.
* **KPI 4:** a linha de base vem do PNCP, pelas dispensas emergenciais publicadas pelo CBMDF nos últimos 24 meses — dado público, sem esforço de coleta interna.
* **KPI 3:** declarado **não reportável no 1º ciclo**. Sem uma fotografia congelada anterior não existe denominador, e estimar um seria fabricar a linha de base que o produto se propõe a substituir.

Há ainda um período de maturação a respeitar no KPI 3. A fotografia congela demandas que **ainda não foram executadas**, então o desvio começa próximo de 100% por construção e cai à medida que o ciclo avança. Confrontar o indicador com a meta logo após o fechamento julgaria o ciclo antes de ele acontecer. O painel exibe os números desde o primeiro dia, mas só emite veredicto contra a meta depois de um quadrimestre de execução — até lá, o valor aparece marcado com asterisco e acompanhado da explicação.

### 8.3 Fonte do dado e limites de cobertura

Os indicadores 1 e 2 são calculados **apenas sobre pedidos com trilha completa**. Pedidos anteriores à implementação da trilha carregam uma entrada de gênese marcada como migrada, sem datas intermediárias — que não foram fabricadas. Esses pedidos ficam fora dos cálculos de tempo, e o painel declara no rodapé quantos foram excluídos e qual a cobertura percentual da base.

Essa declaração é parte do indicador: uma média calculada sobre metade da base não significa o mesmo que uma calculada sobre toda ela. À medida que a base migrada é substituída por pedidos tramitados na plataforma, a cobertura tende a 100%.

Duas limitações declaradas:

* A segunda metade da meta do KPI 5 (≥ 70% do valor institucional) exige o total empenhado pelo CBMDF, que só vem da **integração com o SIAFI** (RNF da §6.3). O painel calcula a adoção por unidades e marca a parcela de valor como não calculável.
* O KPI 4 mede o valor que entrou por urgência **dentro da plataforma**. Contratações conduzidas inteiramente fora dela não aparecem, e o KPI 5 é justamente o indicador que mede essa lacuna de cobertura.

---
