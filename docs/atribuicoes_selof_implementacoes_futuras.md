# Atribuições regimentais da SELOF × CBMDF Marketplace — o que entra como implementação futura

Análise das atribuições da **Seção de Logística, Orçamento e Finanças (SELOF)** — competências
específicas (Art. 61 do Regimento Interno), atribuições comuns às seções do EMG (Art. 59),
atribuições do Chefe da Seção (Art. 69) e atividades práticas operacionais — com o recorte de **o
que deve entrar no roadmap do produto como implementação futura e o que não deve**.

> **Relação com outros docs:** complementa [contribuicoes_anotacoes_selof.md](contribuicoes_anotacoes_selof.md)
> (curadoria das anotações de brainstorm da SELOF). Aquele documento parte das *ideias* da seção;
> este parte das *atribuições regimentais* — juntos, delimitam o que o produto deve absorver do
> mandato institucional da SELOF. A fonte oficial de escopo permanece o
> [Documento de Visão](documento_de_visao.md) e a fronteira arquitetural está em
> [Análise de Escopo — ERP](analise_escopo_erp.md).

---

## 1. Critério de triagem

A fronteira do produto — *"planejar e governar o ciclo de aquisição; não executar a logística nem a
contabilidade"* ([analise_escopo_erp.md](analise_escopo_erp.md), §1) — gera três testes, aplicados a
cada atribuição:

1. **É planejamento/governança de contratações e do orçamento a elas vinculado?**
   → candidata a **núcleo ou implementação futura** do produto.
2. **É elaboração de documento institucional ou prestação de contas que *consome* dados de
   contratações?** → o produto entra como **fonte de insumos** (exportações/consolidações), não como
   a ferramenta que redige ou tramita o documento. Implementação futura = o *insumo automático*, não
   o relatório.
3. **É atividade administrativa da seção (documentos, pessoal, patrimônio próprio, pareceres) ou
   execução que pertence a outro sistema mandatório (SEI, SIAFI, SISGEPAT, sistemas de RH)?**
   → **fora do escopo** do produto; pertence ao ecossistema/programa institucional.

Legenda das tabelas: ✅ **coberto** (total ou parcialmente pelo protótipo/visão atual) ·
🔭 **implementação futura** (entra no roadmap) · ⛔ **fora do escopo** (ecossistema/institucional).

---

## 2. Competências específicas da SELOF (Art. 61)

| Inciso | Atribuição (síntese) | Classificação | Justificativa / âncora no produto |
|---|---|---|---|
| I | Formular política e diretrizes de logística, orçamento e finanças | ⛔ com apoio do produto | Política é ato normativo, não sistema. O produto **materializa** a política (score de priorização, gates, ciclos), mas a formulação é governança institucional — já mapeada como "fora do escopo" em [contribuicoes_anotacoes_selof.md](contribuicoes_anotacoes_selof.md) §3. |
| II | Planejar e coordenar a elaboração do **PPA** e do **PLOA** | ✅ parcial + 🔭 | PLOA é núcleo (HU04.2). O **PPA exige horizonte plurianual**: hoje o produto trabalha por exercício (Etapa 5 do PGC); a extensão para janela de 4 anos é implementação futura (ver §6, item F1). |
| III | Coordenar e acompanhar programas e ações do PPA | 🔭 | Requer **programa de trabalho/ação orçamentária como dimensão** dos itens de PCA e dos relatórios — mesmo padrão da "fonte de recurso como dimensão" já no backlog. Ver §6, item F2. |
| IV | Coordenar a elaboração do **PARF** | 🔭 | O PARF é a **"LOA interna"** do CBMDF (glossário das anotações). Âncora direta no orçamento setorial (`budget.js`): evoluir de limites por setor (HU04.3) para um **módulo PARF** — distribuição da dotação por unidade/classe com aprovação e fotografia. Ver §6, item F3. |
| V | Avaliar a execução orçamentária frente aos objetivos estratégicos | ✅ parcial + 🔭 | As telas de Orçamento e Indicadores já acompanham planejado × comprometido × empenhado × liquidado × pago. Falta o vínculo com o **PLANES** (grau de cumprimento de metas), já listado no catálogo de indicadores (§2.7 das contribuições). Ver §6, item F6. |
| VI | Levantar e atualizar demandas por bens, serviços e **obras** para planos de curto, médio e longo prazo | ✅ + 🔭 | É o **núcleo do produto** (captura de DFD, Matriz de Dotação, PCA contínuo). O médio/longo prazo depende do horizonte plurianual (F1); **obras** merecem verificação de aderência do pipeline (etapas e prazos de obra diferem de material/serviço) — ver §6, item F8. |
| VII | Propor alterações no PARF conforme necessidade administrativa | 🔭 | Complemento natural do módulo PARF: **remanejamento de dotação com justificativa, aprovador distinto e trilha de auditoria** — reusa o padrão de gates já implementado. Compõe F3. |
| VIII | Emitir parecer de mérito em normas/planos apreciados pelo EMG | ⛔ | Tramitação e instrução documental são do **SEI**. O produto pode, no máximo, fornecer dados para fundamentar pareceres — não é ferramenta de parecer. |
| IX | Elaborar o **Relatório de Atividades** da Corporação (prestação de contas ao GDF) | ⛔ redação · 🔭 insumo | O relatório abrange a Corporação inteira (operacional, ensino, pessoal) — muito além das contratações. O produto entra como **fonte automática do capítulo de aquisições/execução** (exportação consolidada por exercício). Ver §6, item F5. |
| X | Elaborar o **Relatório de Gestão** (prestação de contas do **FCDF**) | ⛔ redação · 🔭 insumo | Mesmo racional do inciso IX. Pré-requisito para o insumo ser útil: **fonte de recurso como dimensão** (FCDF × outras fontes), já no backlog das contribuições (§2.4). Ver §6, itens F4 e F5. |

---

## 3. Atribuições comuns às seções do EMG (Art. 59)

| Inciso | Atribuição (síntese) | Classificação | Justificativa |
|---|---|---|---|
| I | Planejar, organizar, dirigir e controlar as atividades administrativas da seção | ⛔ | Gestão administrativa interna da seção; o produto não é ferramenta de gestão de expediente. |
| II | Receber, tramitar, arquivar documentos e processos | ⛔ | Domínio do **SEI** — o produto orquestra processos *de aquisição* e se integra ao SEI; não substitui o protocolo. |
| III | Acompanhar publicações em BG, BAR, DOU e DODF | ⛔ | Rotina de expediente. (A publicidade **legal das contratações** — PNCP — já é coberta pela Etapa 4 do PGC; não confundir com boletins administrativos.) |
| IV | Elaborar memorandos, ofícios, despachos etc. | ⛔ | Produção documental → SEI/editores. O produto já gera os *artefatos do seu domínio* (DFD, atas de ciclo, fotografias do PCA). |
| V | Promover estudos para aprimoramento da gestão | ✅ apoio | Não é feature: os painéis de Indicadores e a trilha de auditoria **são** o instrumento desses estudos. Nada novo a implementar além do backlog de indicadores. |
| VI | Controlar efetivo próprio e bens patrimoniais da seção | ⛔ | Efetivo → sistemas de RH; patrimônio → **SISGEPAT**. Fronteira explícita do produto (não executa custódia). |
| VII | Elaborar e monitorar **PAM e PES** conforme as demandas do setor | ✅ parcial + 🔭 | Planos setoriais de demanda ancoram no que o produto já faz (Matriz de Dotação + pedidos por setor + exercício). Implementação futura: **visão "plano do setor"** — a demanda consolidada da unidade para o exercício, com acompanhamento (compõe F1/F3). |

---

## 4. Atribuições do Chefe da SELOF (Art. 69)

| Inciso | Atribuição (síntese) | Classificação | Justificativa |
|---|---|---|---|
| I, V | Dirigir a seção; fiscalizar o trabalho de assessores/auxiliares | ⛔ | Gestão de pessoas/da seção, não do ciclo de aquisição. |
| II, III | Pessoal: alterações funcionais, afastamentos, capacitação | ⛔ | Domínio de RH/ensino. |
| IV | Gerenciar viaturas e bens sob sua guarda | ⛔ | Custódia patrimonial → SISGEPAT/Grifo. (A *aquisição* de viaturas e bens, sim, tramita no produto.) |
| VI | Uniformização de procedimentos e rotinas | ✅ apoio | O produto uniformiza *por construção* o fluxo de contratações (máquina de estados, gates, nomenclatura única). Sem feature adicional. |
| VII | Estudos para racionalização das atividades | ✅ apoio | Mesmo racional do Art. 59-V: indicadores e trilha já são o instrumento. |
| VIII | Analisar e decidir atos/processos de sua competência | ✅ parcial | As decisões *do ciclo de aquisição* já têm suporte: gates de aprovação, decisão de exceção com motivo (HU08.2), contenção de urgência (HU08.4). Decisões administrativas gerais → SEI. |
| IX | Zelar pelo cumprimento de prazos dos processos | ✅ parcial + 🔭 | SLA por macro-etapa e pílulas de atraso já existem. O reforço futuro é o **cronograma retroativo + indicadores de tempo entre marcos** (backlog §2.6 das contribuições). |
| X | Garantir a execução das ações do **Plano Estratégico** na sua área | 🔭 | Mesmo item do Art. 61-V: vincular demandas/itens de PCA a objetivos do PLANES e medir cumprimento (F6). |

---

## 5. Atividades práticas e operacionais

| Atividade | Classificação | Justificativa / âncora |
|---|---|---|
| Elaboração e controle do **PPA** | 🔭 | Horizonte plurianual sobre a base já existente de exercício (F1). |
| Elaboração da **LDO** e da **PLOA** | ✅ parcial (PLOA) · ⛔ (LDO) | PLOA é núcleo (HU04.2). A LDO é processo legislativo-macro do GDF: o produto no máximo fornece subsídios agregados. |
| Elaboração do **PARF** | 🔭 | Módulo PARF (F3) — a maior lacuna regimental com aderência direta ao produto. |
| **Distribuição e controle do orçamento** (incl. GSV) | ✅ parcial · ⛔ (GSV) | Limites por setor (HU04.3) e telas de orçamento cobrem contratações. **GSV é despesa de pessoal** — explicitamente fora do escopo (contribuições §3). |
| Secretaria do **FUNCBM** | ⛔ rito · 🔭 dimensão | O rito de secretaria (atas, convocações) não é do produto. O FUNCBM como **fonte de recurso** dos itens de PCA entra na dimensão de fontes (F4). |
| **Relatório de Gestão** (GDF/TCU) e **TCA** | ⛔ redação · 🔭 insumo | Exportações de prestação de contas (F5). A TCA é do Ordenador de Despesas; o produto fornece o rastro planejado × executado com trilha de auditoria. |
| **Sítio de Transparência** e alimentação das UOs | 🔭 | O produto já é a fonte natural dos dados de planejamento/execução de contratações: **exportação/API de dados abertos** para transparência ativa (F7). |
| **Caderno de Emendas Parlamentares** (distrital e federal) | 🔭 | Alta aderência: o caderno é, na essência, a **demanda qualificada não coberta pelo teto** — exatamente o que o banco de demandas priorizado (score + demanda reprimida) produz. Gerar o caderno a partir da fila é implementação futura (F4). |
| Cadastro de emendas em **SIGER, SisCAEP, SISCONEP** | ⛔ | Digitação em sistemas externos do GDF/União; eventual integração pertence ao roadmap institucional de integrações, não ao protótipo. |
| **E-PACC** (Plano Anual de Compras e Contratações do GDF) | 🔭 | O PCA consolidado do produto é o insumo direto: **exportação no leiaute do E-PACC** (ou integração) evita a redigitação que o produto existe para eliminar (F5). |

---

## 6. Consolidação — o que entra como implementação futura

Em ordem de aderência ao propósito do produto:

- **F1 · Horizonte plurianual (PPA e planos de médio/longo prazo)** — estender a dimensão
  *exercício* (já capturada no DFD e materializada no Item de PCA) para uma janela plurianual:
  projeção dos itens recorrentes, demanda reprimida rolando para exercícios seguintes e visão
  agregada por quadriênio. Atende Art. 61-II/VI e a atividade "PPA". *Pré-requisito:* nenhum — a
  base por exercício existe.
- **F2 · Programa/ação orçamentária como dimensão** — classificar itens de PCA por programa de
  trabalho e ação do PPA, permitindo o acompanhamento do Art. 61-III nos relatórios. Mesmo padrão
  da dimensão "fonte de recurso".
- **F3 · Módulo PARF (distribuição interna da dotação)** — evolução do orçamento setorial: registro
  da distribuição por unidade/classe, **remanejamentos com justificativa + aprovador distinto +
  trilha** (Art. 61-IV/VII), fotografia por versão do PARF e visão "plano do setor" (Art. 59-VII).
  É o item de maior peso regimental com âncora direta em código existente (`budget.js`, gates).
- **F4 · Fontes de recurso e captação (FCDF, FUNCBM, emendas)** — a dimensão *fonte* já está no
  backlog (contribuições §2.4); este documento acrescenta o **Caderno de Emendas gerado a partir do
  banco de demandas priorizado** — transformar demanda reprimida qualificada (score, dotação,
  especificação pronta) em propostas de emenda é captação de recurso derivada de dado que o produto
  já possui.
- **F5 · Insumos automáticos de prestação de contas e integração de planos** — exportações
  consolidadas por exercício/fonte/programa para Relatório de Gestão, TCA e Relatório de Atividades
  (Art. 61-IX/X), e **exportação no leiaute do E-PACC**. O produto alimenta os documentos; não os
  redige.
- **F6 · Vínculo com o PLANES** — objetivo estratégico como atributo do item de PCA e indicador de
  grau de cumprimento (Art. 61-V, Art. 69-X); soma-se ao catálogo de indicadores já mapeado.
- **F7 · Transparência ativa** — exportação/API de dados abertos do planejamento e execução das
  contratações para o Sítio de Transparência do CBMDF.
- **F8 · Aderência do pipeline a obras** — verificação (spike) de que as 6 macro-etapas e SLAs
  comportam contratação de obras (Art. 61-VI cita expressamente "obras"); prazos e marcos de obra
  diferem dos de material/serviço.

### O que **não** entra (e por quê)

- **Rotina administrativa da seção** (Art. 59-I/II/III/IV/VI; Art. 69-I a V): expediente, protocolo,
  boletins, efetivo e patrimônio próprio — domínios do SEI, RH e SISGEPAT.
- **Atos normativos e pareceres** (Art. 61-I/VIII): o produto materializa a política, não a redige
  nem a tramita.
- **Despesa de pessoal** (GSV, diárias): fora do domínio de contratações — já excluído nas
  contribuições da SELOF (§3).
- **Redação dos relatórios institucionais e ritos de colegiado** (Relatório de Gestão, TCA,
  Relatório de Atividades, secretaria do FUNCBM, LDO): o produto é fonte de insumo (F5), nunca o
  editor do documento.
- **Digitação/integração com SIGER, SisCAEP, SISCONEP**: pertence ao roadmap institucional de
  integrações (ecossistema), não ao protótipo.

---

## 7. Backlog candidato (aderência × esforço)

Complementa a tabela §4 de [contribuicoes_anotacoes_selof.md](contribuicoes_anotacoes_selof.md) —
itens repetidos lá não são duplicados aqui.

| Implementação futura | Aderência | Esforço | Observação |
|---|---|---|---|
| F3 · Módulo PARF + remanejamentos auditados | Alta | Médio/Alto | Maior peso regimental; estende `budget.js` e reusa gates. Absorve "limite por classe/CSO" do backlog anterior |
| F1 · Horizonte plurianual (PPA) | Alta | Médio | Estende a dimensão exercício; casa com "demanda reprimida → próximo PCA" |
| F4 · Caderno de Emendas a partir do banco de demandas | Alta | Médio | Depende da dimensão fonte de recurso (backlog §2.4) |
| F5 · Exportações de prestação de contas + leiaute E-PACC | Alta | Baixo/Médio | Consolida dados que já existem; formato é o trabalho |
| F6 · Vínculo com o PLANES | Média | Baixo/Médio | Novo atributo + indicador |
| F2 · Programa/ação do PPA como dimensão | Média | Médio | Mesmo padrão da dimensão fonte |
| F7 · Transparência ativa (dados abertos) | Média | Baixo/Médio | Exportação inicial; API na evolução com backend |
| F8 · Spike de aderência a obras | Média | Baixo | Verificação de pipeline/SLA, não construção |

**Recomendação de entrada:** **F3 (PARF)** é a lacuna regimental mais importante que o produto pode
fechar — é a atribuição da SELOF (Art. 61-IV/VII) sem nenhum instrumento sistêmico hoje e com âncora
direta no orçamento setorial existente. **F5 (E-PACC + prestação de contas)** é o melhor custo ×
benefício imediato: elimina redigitação com esforço baixo. Os demais itens seguem a ordem da tabela,
condicionados à dimensão *fonte de recurso* (F4/F7) e ao horizonte plurianual (F1/F2).
