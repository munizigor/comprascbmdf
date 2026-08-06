# Documento de Visão do Produto
## CBMDF Marketplace — Plataforma de Gestão Logística e Financeira de Compras e Aquisições

---

## 1. Introdução

### 1.1 Propósito
O propósito deste documento é coletar, analisar e definir as necessidades de alto nível e os recursos fundamentais do **CBMDF Marketplace**. Ele fornece uma visão clara e compartilhada entre os patrocinadores (*stakeholders*), a equipe de desenvolvimento, os setores requisitantes, a área de planejamento/orçamento e a Central de Suprimentos e Material (CESMA) sobre o escopo e o direcionamento do produto.

### 1.2 Escopo
O **CBMDF Marketplace** é uma ferramenta de gestão logística e financeira das demandas de compras e aquisições do Corpo de Bombeiros Militar do Distrito Federal (CBMDF). O sistema abrange desde a requisição de materiais e serviços pelos setores operacionais e administrativos, passando pela tramitação processual do pedido (DFD, TR, Nota de Empenho), o agrupamento das demandas em contratações por classe, até a consolidação orçamentária do Plano de Contratações Anual (PCA) e do Projeto de Lei Orçamentária Anual (PLOA), com acompanhamento da execução da despesa (planejado → comprometido → empenhado → liquidado → pago).

### 1.3 Definições, Acrônimos e Abreviações
* **CBMDF:** Corpo de Bombeiros Militar do Distrito Federal.
* **PCA:** Plano de Contratações Anual.
* **PLOA:** Projeto de Lei Orçamentária Anual.
* **DFD:** Documento de Formalização de Demanda.
* **TR:** Termo de Referência.
* **Nota de Empenho:** Documento que registra o comprometimento orçamentário de uma despesa.
* **CESMA:** Central de Suprimentos e Material, unidade responsável pelo recebimento e distribuição de materiais.
* **Grupo/Classe:** Classificação do material segundo o Padrão Descritivo de Materiais (PDM), usada para categorizar e agrupar itens de contratação.
* **Tipo de Despesa:** Classificação orçamentária do item (Investimento ou Custeio).
* **Natureza de Despesa:** Código orçamentário associado ao item (ex.: 3.3.90.30, 4.4.90.52).
* **Comprometido / Empenhado / Liquidado / Pago:** Estágios sucessivos da execução orçamentária de uma despesa pública.
* **Setores:** unidades do CBMDF que originam ou tramitam pedidos, como COMOP, CESMA, DITIC, DIMAT e COMAP.
* **Grifo:** Sistema corporativo legado/existente do CBMDF utilizado para gestão de materiais, cujo catálogo será reaproveitado pelo CBMDF Marketplace.
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
* **O CBMDF Marketplace:** É uma ferramenta de gestão logística e financeira de compras e aquisições.
* **Que:** Unifica catálogo de requisição, tramitação de status processual, agrupamento de contratações por classe e consolidação orçamentária automática.
* **Diferente de:** Controles paralelos em planilhas e ofícios, que exigem atualização e consolidação manuais e não oferecem rastreabilidade ponta a ponta.
* **Nosso produto:** Proporciona rastreabilidade do pedido do início ao recebimento e consolidação automática dos valores planejado, comprometido, empenhado, liquidado e pago — sempre orientado pelo mantra **"comprar melhor"**: lotes otimizados, contratações completas e menos compras pulverizadas.

---

## 3. Descrição dos Envolvidos (*Stakeholders*) e Usuários

### 3.1 Resumo dos Stakeholders
| Nome | Função | Responsabilidade no Projeto |
| :--- | :--- | :--- |
| **Comando/Direção do CBMDF** | Patrocínio institucional | Aprovação da adoção da ferramenta e alinhamento com a estratégia de gestão de suprimentos. |
| **Central de Suprimentos e Material (CESMA)** | Recebimento e distribuição de materiais | Validação do fluxo de tramitação e recebimento dos pedidos. |
| **Área de Planejamento/Orçamento** | Gestão orçamentária | Validação dos relatórios de PCA/PLOA e da correta classificação de despesas. |

### 3.2 Perfil dos Usuários
| Usuário | Descrição | Principais Necessidades |
| :--- | :--- | :--- |
| **Requisitante** | Militar/servidor de um setor (ex.: COMOP, DITIC, DIMAT, COMAP) que monta pedidos no catálogo. | Buscar e filtrar materiais/serviços por categoria, montar um carrinho com quantidade e urgência por item, enviar a requisição vinculada ao seu setor e, ao final, avaliar a qualidade do pedido recebido (produto, fornecedor, contratação e especificação do material). |
| **Gestor de Tramitação** | Responsável por atualizar o status de cada pedido conforme avança no processo administrativo. | Visualizar todos os pedidos, filtrar por usuário/status e atualizar o estágio (DFD, TR, Nota de Empenho, recebimento, entrega). |
| **Gestor de Contratações** | Responsável por agrupar pedidos em contratações por classe e complementar itens manualmente. | Visualizar pedidos agrupados por classe, incluir itens adicionais com classificação orçamentária completa, excluir/restaurar grupos ou itens. |
| **Gestor do Catálogo e Atas (CESMA/DIMAT)** | Responsável pela manutenção do catálogo padronizado e pela gestão das Atas de Registro de Preços. | Homologar novos itens, sincronizar o catálogo com o sistema Grifo, cadastrar/atualizar ARPs, controlar saldos de atas e disponibilizar itens vinculados a atas vigentes. |
| **Planejamento/Diretoria** | Consome os relatórios consolidados de PCA e PLOA. | Visão agregada dos valores planejado, comprometido, empenhado, liquidado e pago, por setor, tipo, classe e natureza de despesa. |

---

## 4. Visão Geral do Produto

### 4.1 Perspectiva do Produto
A visão de evolução do produto é a de uma aplicação com backend próprio, banco de dados centralizado e autenticação integrada aos usuários do CBMDF, mantendo a mesma lógica de negócio já validada no protótipo: catálogo de materiais/serviços, tramitação de status e consolidação orçamentária.

Na visão de evolução, o produto deve interoperar com sistemas já usados pelo CBMDF e pelo Distrito Federal:
* **Grifo:** fonte primária para carga, padronização e sincronização do catálogo de materiais e serviços.
* **SEI:** abertura e instrução automática de processos administrativos (DFD e TR), com envio de links e documentos gerados no Marketplace.
* **SIAFI:** consulta de saldos orçamentários e emissão automática de pré-empenho, empenho, liquidação e registro de pagamento.
* **PNCP:** publicação automatizada do PCA, editais, contratos e Atas de Registro de Preços, conforme a Lei nº 14.133/2021.

### 4.2 Resumo dos Principais Recursos
1. **Catálogo e Carrinho de Requisição:** Busca e filtro de materiais/serviços por categoria, definição de quantidade e urgência por item, envio do pedido vinculado a um usuário e setor.
2. **Painel de Tramitação de Status:** Atualização do estágio de cada pedido ao longo do fluxo Arquivado → Incluído no PCA → DFD → TR → Nota de Empenho emitida → Pedido a Caminho → Recebido no CESMA → Pedido Entregue.
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
* **Eu quero:** Atualizar o status de cada pedido ao longo do fluxo (Arquivado, Incluído no PCA, DFD, TR, Nota de Empenho emitida, Pedido a Caminho, Recebido no CESMA, Pedido Entregue)
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
  * Os valores devem ser calculados automaticamente a partir do status de cada pedido (pedidos "Arquivado" não entram no total planejado).
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
* Registro de trilha de auditoria para alterações de status de pedido, hoje inexistente no protótipo.
* **RNF — Integração com Sistemas Governamentais:** o sistema deve dispor de APIs REST/Web Services para comunicação bidirecional com o SEI (abertura de processos e envio de minutas), o SIAFI (empenho e liquidação) e o PNCP (envio de dados de contratação e atas).
* **RNF — Sincronismo de Catálogo:** o catálogo de materiais e serviços deve ser mantido em sincronia com a base oficial do Grifo, garantindo a padronização dos códigos PDM/PDS.

### 6.4 Confiabilidade e Disponibilidade
* Disponibilidade compatível com um sistema administrativo interno, com backup periódico dos dados de pedidos, contratações e planejamento uma vez implementado o backend com banco de dados.

---

## 7. Restrições e Suposições

### 7.1 Restrições
* **Técnica (estado atual):** O protótipo atual não possui backend nem banco de dados — os pedidos são armazenados apenas no `localStorage` do navegador de cada usuário, sem autenticação. A evolução do produto requer a implementação de um backend com banco de dados centralizado e autenticação corporativa.
* **Legal:** Os dados e classificações orçamentárias (tipo de despesa, natureza de despesa, grupo/classe) devem seguir os padrões orçamentários públicos vigentes e a Lei nº 14.133/2021.
* **Organizacional:** A nomenclatura de status do pedido (Arquivado, Incluído no PCA, DFD, TR, Nota de Empenho emitida, Pedido a Caminho, Recebido no CESMA, Pedido Entregue) deve continuar refletindo o fluxo real de tramitação do CBMDF.
* **IA como componente incremental:** o desenvolvimento dos recursos baseados em Inteligência Artificial para sugestões avançadas de compras (Épico 06) é opcional/incremental. A primeira versão operacional (Go-Live) do CBMDF Marketplace deve funcionar plenamente com regras de negócio determinísticas (kits correlatos pré-configurados e validação por regras), garantindo que a entrega principal não fique refém do módulo de IA.

### 7.2 Suposições
* Os setores requisitantes possuem acesso à rede/intranet do CBMDF para utilização da ferramenta.
* A Central de Suprimentos e Material (CESMA) e a área de Planejamento/Orçamento validarão a correspondência entre os status do sistema e as etapas reais do processo de aquisição.

---

## 8. Métricas de Sucesso do Produto (KPIs)

| Métrica / KPI | Meta Estabelecida | Método de Mensuração |
| :--- | :--- | :--- |
| **Redução do tempo médio de tramitação** | Redução do tempo entre a criação do pedido e o status "Pedido Entregue" | Comparação do histórico de datas de atualização de status |
| **Atualização tempestiva de status** | % de pedidos com status atualizado dentro do prazo esperado por etapa | Acompanhamento no painel de tramitação |
| **Aderência do planejado ao executado** | Redução da diferença entre valores Planejado e Pago no PCA/PLOA | Indicadores do relatório de Planejamento |
| **Redução de contratações emergenciais** | Diminuição do volume de itens contratados fora do planejamento anual (PCA) | Comparação entre itens incluídos previamente no PCA e itens contratados sem planejamento prévio |
| **Adoção pelos setores requisitantes** | Uso recorrente da ferramenta pelos setores do CBMDF (COMOP, CESMA, DITIC, DIMAT, COMAP e demais) | Volume de pedidos registrados por setor |

---
