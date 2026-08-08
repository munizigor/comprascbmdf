# Matrizes do TCU (iGG) — relevância para o produto

Leitura orientada ao produto das duas matrizes de planejamento e possíveis achados do **TCU**
(metodologia do **iGG — Índice Integrado de Governança e Gestão**, base do `iesgo.tcu.gov.br`, o mesmo
que a SELOF cita como alvo institucional). As transcrições fiéis estão em:

- [Anexo — Apêndice F · Governança e gestão **orçamentária**](anexos/tcu_apendice_f_governanca_gestao_orcamentaria.md) (práticas 4410, 4420)
- [Anexo — Apêndice E · Governança e gestão de **contratações**](anexos/tcu_apendice_e_governanca_gestao_contratacoes.md) (práticas 4310–4370)

## O que são essas matrizes

São o **roteiro do auditor**. Para cada prática (ex.: "realiza o planejamento das contratações?"),
a matriz lista: **critérios**, **informações requeridas e suas fontes** (as *evidências*),
**procedimentos** de verificação, e os **possíveis achados** (eventos de risco → causas → efeitos).
Ou seja: dizem exatamente **que evidências comprovam boa governança** e **que riscos** surgem quando
elas faltam.

**Por que importam para este protótipo:** o produto **produz várias dessas evidências** (processo
formalizado, papéis, prazos, indicadores, priorização explícita, trilha de auditoria, publicação no
PNCP) e **ataca diretamente as causas** que as matrizes mais repetem — *"cultura afeita a orçamentos
meramente incrementais"*, *"falta de clareza de papéis/prazos"*, *"falta de evidência para
fundamentar a proposta"* e priorização por ordem de chegada. É o mesmo problema-raiz da SELOF
("quem chega primeiro leva o orçamento").

## Mapa: prática do TCU × o que o protótipo oferece

### Apêndice F — Gestão orçamentária

| Prática / subquestão | Evidência que o TCU pede | O que o protótipo oferece | Aderência |
|---|---|---|---|
| **4411** processo definido (etapas, papéis, responsabilidades, prazos; formalizado) | Mapeamento de processo, papéis, prazos formalizados | Pipeline de status (etapas), perfis + **gates de aprovação** (papéis/segregação), **SLA por macro-etapa** (prazos), **trilha de auditoria** (registro/formalização) | **Forte** |
| **4412** indicadores para gerenciar o processo | Dashboards/indicadores em uso | Tela de **Indicadores**; execução comprometido→empenhado→liquidado→pago; publicação no PNCP | **Forte** |
| **4413** alinhamento orçamento × estratégia | Documento que liga estratégia a ações orçamentárias | Campo **"vínculo ao planejamento"** no DFD; PCA por exercício | Parcial |
| **4414** metas de economia; redução de restos a pagar | Metas formais; normativos de eficiência | Visibilidade da execução; **baseline/Dotação** evita incrementalismo | Parcial → **oportunidade** (metas formais e RAP não são recurso do produto) |
| **4415** previsão adequada no PLOA (despesas essenciais; priorizar obrigatórias/projetos em curso; avaliar execução anterior) | Levantamento de despesas essenciais; projeções; critérios de realocação | **Matriz de Dotação** (essenciais × lacuna), Planejamento/PLOA, priorização | Parcial |
| **4420 / 4421 / 4422** prioridades e demandas de priorização conhecidas e tratadas | Critérios de priorização e seu uso | **Governança**: fila priorizada por score (criticidade/risco/legal/prontidão) + **Matriz de Dotação** | **Forte** |
| **4423** avaliação de políticas públicas incorporada ao orçamento | Uso de avaliação de políticas | — | Fora do escopo |

### Apêndice E — Gestão de contratações

| Prática | Evidência que o TCU pede | O que o protótipo oferece | Aderência |
|---|---|---|---|
| **4310** integridade | Segregação de funções; motivação das decisões | **Aprovador ≠ autor** nos gates; **trilha de auditoria** com justificativa/autor/perfil | **Forte** |
| **4320** capacidade (pessoas/competências) | Capacitação, quadro técnico | — (tema de RH) | Fora do escopo |
| **4330** planejamento das contratações (**PCA**) | Processo formal de elaboração/aprovação/acompanhamento do **Plano Anual de Contratações** | **Núcleo do produto**: Item de PCA por (exercício × classe), consolidação de DFDs, publicação no PNCP | **Muito forte** |
| **4340** processo de trabalho de contratações | Fluxo formal de contratação | **Máquina de estados** DFD → … → pago, com transições válidas e gates | **Muito forte** |
| **4350** gestão de riscos em contratações | Riscos identificados/tratados | Priorização por **criticidade/risco**; alertas de planejamento | Parcial |
| **4360** contratação/gestão por desempenho | Indicadores de desempenho de contratações | **Avaliação do pedido** (`ratingCriteria`: qualidade, fornecedor, prazo…) + Indicadores | Parcial |
| **4370** contratações sustentáveis | Critérios de sustentabilidade | — | Fora do escopo → **oportunidade** |

## Riscos/achados do TCU que o produto ajuda a mitigar

- **"Priorização por ordem de chegada" / falta de tratamento das demandas conhecidas** → fila por
  score + Matriz de Dotação (baseline).
- **"Orçamento meramente incremental"** → dotação prevista × atual dá referência objetiva; PCA por
  item/classe substitui o "repete-se o do ano passado".
- **"Falta de clareza de etapas, papéis e prazos"** → pipeline + perfis + gates + SLA, tudo na trilha.
- **"Falta de evidência para fundamentar a proposta"** → DFD estruturado, consolidação em Item de PCA,
  publicação no PNCP e histórico auditável.
- **Falta de segregação de funções (integridade, 4310)** → aprovador distinto do solicitante.

## Lacunas → oportunidades (aderência ao protótipo)

| Oportunidade (origem no TCU) | Aderência | Nota |
|---|---|---|
| Indicadores formais de **execução/economia** e **restos a pagar** (4412/4414) | Alta | Estende a tela de Indicadores |
| **Critérios de priorização** documentados e auditáveis (4421/4422) | Alta | Já temos o score; falta expor "por quê" como evidência exportável |
| **Gestão de riscos** de contratação estruturada (4350) | Média | Formalizar risco por contratação, além do pedido |
| **Desempenho de fornecedor/contratação** (4360) | Média | Reaproveita as avaliações já coletadas |
| **Sustentabilidade** nas contratações (4370) | Baixa | Novo atributo de item/critério |
| **Alinhamento estratégico** formal (4413) | Média | Ligar "vínculo ao planejamento" ao PLANES |

## Conexão com a SELOF e referências

As anotações da SELOF elegem o **iGG** como alvo (`iesgo.tcu.gov.br`). Estas matrizes são o critério
com que esse índice é auditado — logo, cada evidência que o produto gera (processo formalizado,
indicadores, priorização, trilha, PNCP) **conta a favor da pontuação do CBMDF no iGG**. Ver também
[contribuicoes_anotacoes_selof.md](contribuicoes_anotacoes_selof.md) e
[boas_praticas_orcamentaria_financeira_logistica.md](boas_praticas_orcamentaria_financeira_logistica.md).

- Referencial e questionário do iGG / IESGO — <https://iesgo.tcu.gov.br/>
- Transcrições fiéis: [Apêndice F](anexos/tcu_apendice_f_governanca_gestao_orcamentaria.md) ·
  [Apêndice E](anexos/tcu_apendice_e_governanca_gestao_contratacoes.md)
