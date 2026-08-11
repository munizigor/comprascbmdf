
---

## 1. Ajustes nas Seções 1 (Introdução) e 2 (Posicionamento)

### 1.1 Atualização de Acrônimos e Conceitos (Seção 1.3)



Adicione as ferramentas externas e conceitos operacionais citados nos feedbacks:

* **Grifo:** Sistema corporativo legado/existente do CBMDF utilizado para gestão de materiais e cujo catálogo será reaproveitado.
* **SEI (Sistema Eletrônico de Informações):** Sistema de gestão de processos e documentos administrativos do Distrito Federal.
* **SIAFI:** Sistema Integrado de Administração Financeira (utilizado para execução orçamentária e financeira).
* **PNCP:** Portal Nacional de Contratações Públicas (exigência da Lei nº 14.133/2021).
* **ARP:** Ata de Registro de Preços.

### 1.2 Reenquadramento da Solução e Filosofia (Seções 1.2, 2.1 e 2.4)



* **Conceito de Central de Compras:** Altere o posicionamento do sistema de *"ferramenta de gestão de demandas"* para **"Central de Compras do CBMDF"**.


* **Mantra Institucional:** Inclua explicitamente na *Oportunidade de Negócio (2.1)* e na *Declaração de Posição (2.4)* que o objetivo do sistema **não é comprar mais, mas comprar melhor**, reduzindo compras pulverizadas, otimizando lotes e garantindo contratações completas.



---

## 2. Ajustes na Seção 3 (Perfil dos Usuários)



Adicione um novo perfil de usuário para garantir a governança do catálogo e das atas:

| Usuário | Descrição | Principais Necessidades |
| --- | --- | --- |
| **Gestor do Catálogo e Atas (CESMA/DIMAT)** | Responsável pela manutenção do catálogo padronizado e pela gestão das Atas de Registro de Preços. | Homologar novos itens, sincronizar catálogo com o sistema Grifo, cadastrar/atualizar ARPs, controlar saldos de atas e disponibilizar itens vinculados a atas vigentes. |

---

## 3. Ajustes na Seção 4 (Visão Geral do Produto) e Arquitetura



### 3.1 Interoperabilidade com Sistemas Externos (Seção 4.1)



Descreva como a solução se conecta às ferramentas governamentais:

1. **Sistema Grifo:** Fonte primária para carga, padronização e sincronização do catálogo de materiais e serviços.
2. **SEI (Processos):** Abertura e instrução automática de processos administrativos (DFD e TR), com envio de links e documentos gerados no Marketplace.
3. **SIAFI (Financeiro/Orçamentário):** Consulta de saldos orçamentários, emissão automática de pré-empenho, empenho, liquidação e registro de pagamento.
4. **PNCP (Transparência/Legal):** Publicação automatizada do PCA, editais, contratos e Atas de Registro de Preços, conforme a Lei nº 14.133/2021.

### 3.2 Novo Módulo: Gestão Financeira (Seção 4.2)



Expanda o escopo para cobrir o ciclo completo da despesa:

* Controle de cotas/limites financeiros por setor.
* Acompanhamento de cronograma de desembolso financeiro.
* Monitoramento do fluxo financeiro: *Empenhado → Liquidado → Pago*.

---

## 4. Atualização e Criação de Épicos (Seção 5)



### **Ajustes nos Épicos Existentes**

#### **ÉPICO 01: Catálogo Padronizado e Pedido Assistido**

* **Mudança no Catálogo:** O catálogo para o usuário da ponta torna-se **estritamente fechado/padronizado** (oriundo do **Grifo**). O requisitante comum não cadastra novos itens; se necessitar de algo fora do catálogo, deve abrir uma solicitação para a gestão de catálogo homologar.
* **Sugestões de Compras Correlatas (Kits/Bundles):** Ao selecionar um item principal (ex.: Viatura), o sistema apresenta automaticamente sugestões de itens ou serviços dependentes (ex.: Seguro, Manutenção Preventiva, Combustível, Equipamentos Rádio).

#### **ÉPICO 04: Gestão Orçamentária e Financeira**

* Expandir a HU04.2 para contemplar não apenas a visualização de PLOA, mas a **Gestão Financeira Ativa**: controle de limites financeiros por diretoria/setor e acompanhamento do fluxo de liquidação e pagamentos em tempo real via integração com o SIAFI.



---

### **Novos Épicos a Incluir**

#### **ÉPICO 05: Gestão de Atas de Registro de Preços (ARPs)**

> **Descrição:** Permitir o cadastro, acompanhamento, controle de saldo e utilização de Atas de Registro de Preços vigentes para agilizar o atendimento aos pedidos.

* **HU05.1 — Cadastro e Manutenção de Atas:**
* **Como:** Gestor de Atas
* **Eu quero:** Cadastrar e gerir Atas de Registro de Preços (número, fornecedor, vigência, itens, quantidades e valores)
* **Para que:** O sistema saiba quais materiais/serviços possuem contratação imediata disponível.


* **HU05.2 — Consulta de Saldo e Consumo de Ata:**
* **Como:** Gestor de Contratações / Requisitante
* **Eu quero:** Consultar o saldo disponível de cada item em ata e vincular pedidos diretamente a uma ARP vigente
* **Para que:** O pedido seja atendido com rapidez sem necessidade de nova licitação.



#### **ÉPICO 06: Assistente Virtual e Inteligência de Compras (Incremento / Opcional)**

> **Descrição:** Oferecer um assistente virtual e recomendações baseadas no histórico de compras para orientar o usuário final a montar pedidos mais precisos e eficientes.
> *Nota de Restrição:* Este épico é **incremental** e **não impeditivo** para o funcionamento base do sistema.

* **HU06.1 — Assistente Virtual de Compras (Wizard/Guia):**
* **Como:** Requisitante da ponta
* **Eu quero:** Ser guiado por um assistente passo a passo durante a montagem do pedido
* **Para que:** Eu consiga preencher justificativas, quantidades e especificações corretas, mesmo sem ter conhecimento técnico aprofundado do processo de licitação.


* **HU06.2 — Sugestões de Compras baseadas em Histórico e IA (Incremento):**
* **Como:** Requisitante / Gestor
* **Eu quero:** Receber recomendações automáticas de reposição ou complemento de pedidos com base no histórico de consumo do setor e datas comemorativas/sazonais
* **Para que:** O setor não esqueça de itens essenciais para sua operação e evite compras emergenciais.



---

## 5. Requisitos Não Funcionais (Seção 6) e Restrições (Seção 7)



### 5.1 Requisitos Não Funcionais de Interoperabilidade (Seção 6.3)



* **RNF - Integração com Sistemas Governamentais:** O sistema deve dispor de APIs REST/Web Services para comunicação bidirecional com o SEI (abertura de processos e envio de minutas), SIAFI (empenho e liquidação) e PNCP (envio de dados de contratação e atas).
* **RNF - Sincronismo de Catálogo:** O catálogo de materiais e serviços deve ser mantido em sincronia com a base oficial do **Grifo**, garantindo a padronização dos códigos PDM e PDS.

### 5.2 Restrições do Produto (Seção 7.1)



* **IA como Componente Incremental:** O desenvolvimento dos recursos baseados em Inteligência Artificial para sugestões avançadas de compras é **opcional / incremental**. A primeira versão operacional (*Go-Live*) do CBMDF Marketplace funcionará plenamente com regras de negócio determinísticas (kits correlatos pré-configurados e validação por regras), garantindo que a entrega principal não fique refém do módulo de IA.

---

## Resumo dos Impactos no Documento

| Feedback Recebido | Onde entra no Documento |
| --- | --- |
| **Catálogo padronizado (Grifo) + Cadastro restrito à Gestão** | Seção 1.3 (Acrônimos), Seção 3.2 (Perfis), Épico 01 e RNF 6.3

 |
| **Conceito de Central de Compras + "Comprar melhor, não mais"** | Seção 1.2 (Escopo), Seção 2.1 e 2.4 (Posicionamento)

 |
| **Módulo de Gestão Financeira** | Seção 1.2 (Escopo), Seção 4.2 e Épico 04 (Gestão Orçamentária/Financeira)

 |
| **Épico de Gestão de Atas (ARP)** | Seção 4.2 e Novo Épico 05

 |
| **Assistente Virtual + Compras Correlatas + IA Incremental** | Seção 2.1, Épico 01, Novo Épico 06 e Seção 7.1 (Restrições)

 |
| **Interoperabilidade (SEI, SIAFI, PNCP)** | Seção 1.3, Seção 4.1 e Seção 6.3 (RNFs de Interoperabilidade)

 |