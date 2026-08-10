# Pesquisa com Servidores — Planejamento Logístico e Orçamentário do CBMDF

Análise das **20 respostas** ao *Questionário sobre o Planejamento Logístico e Orçamentário do
CBMDF*, confrontadas com o que o protótipo já entrega.

> **Por que este documento importa.** Até aqui o produto foi construído a partir do
> [Documento de Visão](documento_de_visao.md) e de auditorias do próprio código. Esta é a
> **primeira validação com usuários reais** — a §2.2 do documento de visão afirma a causa-raiz
> sem nenhuma evidência de campo, e esta pesquisa é essa evidência.
>
> **Estado:** diagnóstico. As lacunas listadas na §5 **não foram implementadas** e a
> recomendação da §7 **não está aprovada**. Serve para embasar a decisão do Comitê e da Direção.

- **Fonte:** formulário respondido por 20 servidores (arquivo original fora do repositório).
- **Data da análise:** 10/08/2026.
- **Estado do produto na análise:** `main` em `263c698` (após o PR #32).

---

## 1. Quem respondeu

A amostra cobre as três posições do processo, o que dá validade à leitura por contraste:

| Posição no processo | Unidades |
| :--- | :--- |
| **Ponta operacional** | 1º GBM, 6º GBM (Prontidão), PODON, GPRAM, "Operacional" |
| **Unidades de apoio (área-meio)** | CECOM/Banda de Música, POMED/SEGEP, Gaeph, ASPAR, SES Ouvidoria, Controle Interno, DIREP |
| **Estrutura de logística e contratação** | SELOF, SELOG/COMOP, SELOG/GAEPH, DICOA/COPLI, COMAP, EMG (Orçamento e Finanças) |

Funções declaradas: 12 solicitantes/especificadores técnicos, 2 gestores/aprovadores,
2 equipes de licitações, 2 equipes de planejamento e governança, 1 prontidão, 1 não informada.

---

## 2. O que os números dizem

### 2.1 Dificuldades (múltipla escolha, n = 20)

| Dificuldade | Citações |
| :--- | :--- |
| Limitações orçamentárias ou **indefinição de recursos** | **15/20 (75%)** |
| Dificuldade de comunicação com contratação/planejamento | 10/20 (50%) |
| Falta de informações claras sobre demandas futuras | 8/20 (40%) |
| Sistemas/ferramentas complexos ou ineficientes | 8/20 (40%) |
| Prazos exíguos para elaboração e envio | 6/20 (30%) |
| Falta de capacitação técnica | 5/20 (25%) |

### 2.2 Qualidade da comunicação com o planejamento

**Média 2,85 de 5**, com **8 das 20 respostas ≤ 2**.

| Nota | Respostas |
| :--- | :--- |
| 1 | 1 |
| 2 | 7 |
| 3 | 7 |
| 4 | 4 |
| 5 | 1 |

A distribuição correlaciona com a **distância ao centro de contratação**: as unidades da ponta
operacional (1º GBM = 1, 6º GBM = 2, PODON = 2, GPRAM = 2) concentram-se no fundo da escala; as
internas à estrutura de logística (COMAP = 4, Gaeph = 4, SELOG/GAEPH = 4, SELOG/COMOP = 4,
DICOA/COPLI = 5) no topo. As exceções são o **SELOF** e o **CECOM**, ambos nota 2 — e o SELOF é
justamente quem consolida as demandas de todas as unidades.

**Leitura:** o problema de comunicação não é geral, é **direcional**. Quem está longe do centro
não enxerga o processo; quem está dentro, enxerga.

---

## 3. Achado que valida o Épico 08

O **SELOG/COMOP** descreve o método que já usa hoje, à mão:

> *"Atualmente utilizamos a Matriz GUT com adaptações. Colocamos a **maturidade do processo**
> também como um peso para priorizar os processos de compra. Ao final, temos uma pontuação que
> permite priorizar os itens."*

É, por caminho independente, o modelo implementado no Épico 08. O mapeamento é direto:

| Matriz GUT adaptada (SELOG/COMOP) | Score do Épico 08 |
| :--- | :--- |
| Gravidade | Criticidade operacional (peso 40) |
| Tendência | Risco de postergar (peso 30) |
| — | Obrigatoriedade legal (peso 20) |
| **Maturidade do processo** | **Prontidão da instrução (peso 10)** |

**POMED/SEGEP** e **SELOF** também citam a GUT. E o SELOF nomeia exatamente o problema que os
pesos institucionais fixos resolvem:

> *"Essas demandas são priorizadas hoje através da matriz GUT, mas acaba que **tudo fica
> priorizado** ou fica muito diferente de demandante pra demandante."*

Uma matriz preenchida por cada unidade não ordena nada quando todas se pontuam no topo. É o
argumento de campo para pesos fixos, decompostos na tela e auditáveis.

---

## 4. O que o sistema já atende

| Pedido dos servidores | Onde está | Evidência no código |
| :--- | :--- | :--- |
| Priorização institucional explícita e uniforme | Épico 08 | `governanca.js` — score 40/30/20/10 com decomposição "Por quê?" |
| Critério auditável, não "tudo prioritário" | Épico 08 | pesos fixos + desempate estável (score → `criadoEm` → protocolo) |
| Planejamento contínuo, não anual | Épico 08 | ciclos quadrimestrais com ata e fotografia congelada (`cbmdf_pca_ciclos`) |
| Saber em que pé está o pedido / se foi atendido | Fase 7 | `historico[]` com autor, data e motivo; trilha em `acompanhe.html` |
| Conter emergenciais, não só contabilizar | Épico 08 + KPIs | motivo ≥ 30 caracteres + aprovador ≠ autor; limite de 20% por setor |
| Medir o tempo de tramitação | Fase 7 + KPIs | SLA 5/15/45/60/45/30 (200 dias); KPIs 1 e 2 em `indicadores.html` |
| Fonte única de valores planejado/executado | Fase 6 | `core.js` unificou 6 cópias de `formatPrice` e 3 de `getItemSubtotal` |
| Rastrear as "idas e vindas" do processo | Fase 7 | retrocesso rotulado "Devolver para correção", motivo ≥ 20 caracteres |
| Requisitante ver sua posição na fila | HU08.6 | `renderPosicaoFilaHtml` em `acompanhe.js` |
| Referência de "quanto a unidade deveria ter" | Matriz de Dotação | `dotacao.js` — previsto × atual por setor e item |
| Janela formal para inclusões extraordinárias | PGC | `isJanelaRevisao` em `status-pipeline.js` (15/set–15/nov) |

---

## 5. O que o sistema ainda não atende

### 5.1 O achado central: os três dados que o requisitante mais pede **já existem — e estão todos fechados para ele**

Esta é a conclusão mais acionável da pesquisa. As três perguntas que dominam as respostas são
*"quanto posso pedir?"*, *"o que minha unidade deveria ter?"* e *"quanto tempo vai demorar?"*.
O sistema **calcula as três**, e **nenhuma chega a quem faz o pedido**:

| Pergunta do requisitante | O dado existe em | Exposto a quem |
| :--- | :--- | :--- |
| Quanto minha unidade pode gastar? | `budget.js` (`capCusteio`, `saldoCusteio`, …) | `orcamento-*.html` → **gestor, compras** |
| O que minha unidade deveria ter? | `dotacao.js` (previsto × atual) | `dotacao.html` → **gestor, compras** |
| Quanto tempo o pedido deve levar? | `audit.js` (`getSituacaoSla`) | `status.html` → **gestor, compras** |

Verificado: `acompanhe.js` não contém uma única referência a SLA, e nenhum arquivo fora de
`budget.js` lê os tetos setoriais. O perfil `solicitante` alcança apenas `index.html` e
`acompanhe.html`.

Isso é coerente com o achado da §2.2: **a comunicação é ruim na direção de quem está longe** — e
é justamente para esse lado que o produto não publica o que já sabe.

### 5.2 Lacunas, por peso na amostra

#### A. Teto orçamentário invisível para quem planeja — 75% da amostra

> *"Falta de um local de consulta pra saber o que podemos pedir e quanto"* (SELOF)
> *"Delimitação de quanto dinheiro cada área técnica terá no ano de aquisição"* (SELOG/COMOP)
> *"Limitação orçamentária não repassada anteriormente, mesmo com atendimento de prazos"* (Gaeph)
> *"O setor teria um orçamento previamente definido... permitiria elaborar prioridades de forma
> mais realista"* (CECOM/Banda)

O GPRAM descreve a consequência direta com números: a indefinição do montante produz um PCA do
tipo *"coloca tudo para não esquecer nada"*, também chamado por ele de **"lista de papai noel"** —
o grupamento *"não chegou a executar 10 milhões no último ano [e] costuma ter um PARF de 50"*.

Pedir sem teto conhecido não é indisciplina: é a única estratégia racional para quem não sabe o
limite.

#### B. Previsão de prazo não chega ao requisitante

> *"A principal dificuldade é a falta de previsibilidade no tempo de tramitação. Esse fato
> dificulta o planejamento dos anos seguintes."* (POMED/SEGEP)
> *"Temos processos da PODON que levam em média mais de 500 dias até que o material esteja
> disponível para uso. Raramente conseguimos licitar dentro do ano aquilo que foi planejado."*
> (PODON)

O SLA institucional de 200 dias existe e é medido nos indicadores, mas quem espera o material não
o vê.

#### C. Calendário de contratações por diretoria ou natureza — **parcial**

A janela de revisão do PCA (15/set–15/nov) já existe. O que os servidores pedem é diferente e mais
granular: **filas com hora marcada por diretoria ou por natureza da demanda**.

> *"Ter um calendário de licitações e avaliação das demandas na DIMAT. Chegam muitos processos ao
> mesmo tempo e fica praticamente inviável que sejam analisados em tempo. Exemplo: de janeiro a
> março serão analisados e licitados apenas processos da DISAU."* (PODON)
> *"Têm-se buscado enviar demandas da OPVV em dezembro/janeiro e da OPC em junho/julho"* (GPRAM)

O GPRAM aponta ainda a consequência jurídica de não haver ordenação no tempo: *"um processo acaba
entrando na 'fila' e, por vezes, na sua vez de ser analisado já está vencido — por exemplo, o
prazo de 180 dias de validade da planilha orçamentária (art. 97, Decreto 44.330/2023)"*.

#### D. Ciclo de vida, validade e consumo — **parcial**, e o maior gap temático (6 respostas)

A Matriz de Dotação responde *"quanto deveria ter versus quanto tem"*. Não responde *"quando vai
acabar"* — não há vida útil, validade nem histórico de consumo.

> *"Não há um sistema de logística dos materiais com controle de estoque"* (DIREP)
> *"Recomendável a implantação de um sistema de acompanhamento da vida útil e da validade dos
> equipamentos, permitindo prever substituições antes que ocorram indisponibilidades"* (1º GBM)
> *"Faria o levantamento de todos os produtos/serviços da corporação e verificaria seus prazos de
> validade. Após isso estipularia um processo de compras baseado nesse prazo"* (ASPAR)
> *"O material de APH possui volatilidade em seu consumo... A imprevisibilidade é um dos maiores
> fatores limitantes no planejamento"* (Gaeph)

O **GPRAM já faz isso à mão** e mostra o que o sistema poderia automatizar: acompanha o ciclo de
vida desde 2020, calcula consumo médio anual (≈100 mochilas costais), projeta a quantidade para o
horizonte do PLANES 2025–2030 (500 unidades) e busca *"realizar a trajetória processual do objeto
apenas uma vez a cada PLANES/PPA"*.

Esta é a **raiz da imprevisibilidade** que gera o emergencial que o Épico 08 apenas contém. O COMAP
descreve o ciclo vicioso completo:

> *"Os incidentes críticos exigem atuação imediata, o que interrompe o fluxo normal e paralisa a
> fila de projetos previamente agendados. Quando as demandas planejadas são finalmente retomadas,
> o tempo de espera acumulado frequentemente as transforma em novas emergências."*

#### E. Checklist documental e padronização de exigências — 4 respostas

Causa direta do retrabalho e dos orçamentos vencidos.

> *"Fluxo de processos, check-list"* (Controle Interno)
> *"Sempre que muda a equipe na DIMAT ou DICOA uma nova forma de analisar os processos é
> estabelecida e ficamos perdendo tempo em idas e vindas do processo"* (PODON)
> *"Tempo para responder o processo e ter que refazer etapas, o que faz os orçamentos vencerem"*
> (CECOM)

#### F. Ponto focal e responsável visível por etapa — 6 respostas

O sistema grava **quem** executou cada transição, mas não mostra **a quem recorrer** na etapa atual.

> *"Definição de pontos focais para acompanhamento das demandas e canal direto para atualização do
> andamento"* (1º GBM) · *"Facilidade de contatar o pregoeiro"* (CECOM) · *"Canal de dúvidas"*
> (DIREP) · *"Reuniões mensais com os setores responsáveis"* (ASPAR)

O Gaeph registra o que já funciona e poderia ser generalizado: *"a comunicação hoje é possível
graças a visitas nas setoriais do DEALF que ocorrem quinzenalmente"* — e é uma das duas notas 4
entre as unidades de apoio.

#### G. Eixo área-fim × área-meio na priorização — questão de política, não de código

> *"A Banda de Música é uma unidade de apoio (área meio), cujas necessidades nem sempre recebem a
> mesma prioridade em relação às atividades fins"* (CECOM/Banda)
> *"O fluxo de contratações poderia ser dividido entre interesse público primário (área fim) e
> secundário (área meio)"* (GPRAM)

O score atual não tem esse eixo. Vale registrar que ele **já torna a assimetria visível** — a Banda
veria a própria pontuação e a decomposição que a produziu. Tornar visível é função do software;
**decidir se área-meio merece cota protegida é decisão do Comitê**, e deve ser tomada antes de
virar código.

#### H. Capacidade de execução e limite de trabalho em curso — 2 respostas

A fila prioriza, mas não limita quanto entra de uma vez.

> *"Muitos processos para poucos pregoeiros"* e, à pergunta sobre o que mudaria: *"Mais
> pregoeiros"* (SELOG/COMOP)
> *"Chegam muitos processos ao mesmo tempo e fica praticamente inviável que sejam analisados em
> tempo"* (PODON)

É a contrapartida natural do calendário (C): uma fila só tem sentido se a vazão for conhecida.

---

## 6. Fora do escopo técnico do produto

Registrados porque foram pedidos, com o motivo de não entrarem:

| Pedido | Por que está fora |
| :--- | :--- |
| Banco de Preços por assinatura (COMAP) | Contratação de ferramenta externa, não desenvolvimento |
| Fim da duplicidade E-Compras / Compras.GOV / PAM (POMED, CECOM) | Exige integração real — RNF da §6.3, depende de backend |
| Mais pregoeiros (SELOG/COMOP) | Decisão de força de trabalho; o sistema pode **evidenciar** o gargalo (lacuna H), não resolvê-lo |
| Capacitação técnica dos militares (5 respostas) | Ação de treinamento; mitigável por checklist (lacuna E), não substituível por software |

Vale notar que a fronteira "planejar e governar × executar", firmada na
[Análise de Escopo — ERP](analise_escopo_erp.md), é o que mantém a lacuna D fora do produto na
forma de *controle de estoque*. A previsão de reposição (quando vai acabar) é planejamento e cabe
aqui; a custódia do material permanece no Grifo e no SISGEPAT.

---

## 7. Recomendação — **não aprovada**

> Decisão registrada em 10/08/2026: **entregar apenas o diagnóstico**. Nada abaixo deve ser
> implementado sem nova aprovação explícita.

Se houver decisão de seguir, a recomendação técnica é atacar **A + B + F** primeiro. São as três
dores mais citadas, o dado **já existe no repositório** e a mudança é de **exposição, não de
modelo novo** — o que a torna a intervenção de melhor relação valor/custo de todo o backlog. Ela
se resume em uma frase verificável:

> *"O requisitante vê quanto sua unidade tem, o que deveria ter e quanto tempo o pedido deve
> levar — antes de pedir, não depois."*

Ordem sugerida para o restante, por valor decrescente: **C** (calendário por diretoria/natureza,
somando-se à janela de revisão já existente), **E** (checklist por etapa), **D** (previsão de
reposição — merece fase própria), **H** (capacidade e vazão), **G** (decisão do Comitê antes de
virar requisito).

---

## 8. Relação com os demais documentos

- [Documento de Visão](documento_de_visao.md) — §2.2 (Causa-Raiz): esta pesquisa é a evidência de
  campo que a sustenta; §5 (Épico 08): validado pelo relato do SELOG/COMOP.
- [Registro de Evolução](registro_de_evolucao.md) — trilha cronológica das decisões.
- [Análise de Escopo — ERP](analise_escopo_erp.md) — a fronteira que mantém a lacuna D fora do
  escopo na forma de controle de estoque.
