# Fase 5 — Pipeline Granular de Status (Jornada de Contratação Pública)

## Contexto

As Fases 1-4 do PRD de UX (`docs/prd_manutencao_ux.md`) já foram implementadas, testadas e mescladas em `main` (PR #1 e PR #2). O usuário anexou um novo documento de referência descrevendo a jornada real de uma contratação pública em **6 macro-etapas**: (1) Ideação & Necessidade (DFD), (2) Validação & PCA, (3) Estruturação no Processo (ETP/TR), (4) Edital & Seleção, (5) Aquisição & Fabricação, (6) Entrega & Finalização — e pediu para usá-lo como referência principal para evoluir a solução.

Hoje o app modela todo esse ciclo com **apenas 11 status simples numa lista linear**, duplicada em 4 lugares (`status.js`, `acompanhe.js`, e dois `<option>` hardcoded em `status.html`/`acompanhe.html`), sem ETP, Edital, Recebimento Provisório/Definitivo ou Destino Final. Pior: a ordem do array atual é cronologicamente incorreta (`DFD` aparece DEPOIS de `Incluído no PCA`), a timeline de acompanhamento é puramente linear por índice de array (então `Arquivado`, hoje na posição 3, renderiza como "3 etapas concluídas" — semanticamente errado para um estado terminal/rejeitado), e **duas definições diferentes e divergentes de "Comprometido"** já coexistem: `planning.js` conta a partir de `TR`, `budget.js` conta qualquer status não-pendente/não-arquivado.

Decisões já validadas com o usuário:
1. **Pipeline granular completo**, fiel ao documento anexado (~21 status).
2. **Unificar** a definição de "Comprometido"/Empenhado/Liquidado/Pago entre `planning.js` e `budget.js` num único módulo fonte-da-verdade.
3. **Migrar automaticamente** os 11 pedidos da seed para os status equivalentes no novo pipeline.
4. **Atualizar `docs/documento_de_visao.md`**, que hoje documenta e trava ("Restrições") o fluxo antigo como requisito.

## Pipeline final (21 status, 6 etapas)

| # | Status | Etapa | Cor do badge | Observação |
|---|---|---|---|---|
| 1 | `DFD Registrado` | 1. Ideação & Necessidade | `#7c3aed` | Novo status inicial (era `Aguardando Análise`) |
| 2 | `Em Análise Setorial` | 2. Validação & PCA | `#334155` | Renomeado de `Aguardando Análise Setorial` |
| 3 | `Aguardando Suplementação` | 2. Validação & PCA | `#b45309` | Mantido |
| 4 | `Arquivado` | 2. Validação & PCA | `#6b7280` | Mantido — **terminal/rejeitado** |
| 5 | `Incluído no PCA` | 2. Validação & PCA | `#2563eb` | Mantido — via regular |
| 6 | `Incluído no PCA (Urgência)` | 2. Validação & PCA | `#1e40af` | Novo — inclusão extraordinária |
| 7 | `ETP em Elaboração` | 3. Estruturação (ETP/TR) | `#0d9488` | Novo |
| 8 | `Pesquisa de Preços` | 3. Estruturação (ETP/TR) | `#0891b2` | Novo |
| 9 | `TR Elaborado` | 3. Estruturação (ETP/TR) | `#059669` | Renomeado de `TR` |
| 10 | `Reserva Orçamentária Confirmada` | 3. Estruturação (ETP/TR) | `#047857` | Novo — **gatilho unificado de "Comprometido"** |
| 11 | `Edital Publicado` | 4. Edital & Seleção | `#ea580c` | Novo (cobre também Dispensa/Inexigibilidade) |
| 12 | `Em Seleção de Fornecedor` | 4. Edital & Seleção | `#c2410c` | Novo |
| 13 | `Nota de Empenho Emitida` | 4. Edital & Seleção | `#d97706` | Renomeado (grafia) de `Nota de Empenho emitida` — **gatilho de "Empenhado"** |
| 14 | `Ordem de Fornecimento Emitida` | 5. Aquisição & Fabricação | `#0369a1` | Novo |
| 15 | `Em Trânsito ou Fabricação` | 5. Aquisição & Fabricação | `#0f766e` | Renomeado de `Pedido a Caminho` (sem "/" para não gerar slug com hífen duplo) |
| 16 | `Recebimento Provisório` | 6. Entrega & Finalização | `#0284c7` | Novo |
| 17 | `Recebimento Rejeitado (Aguardando Substituição)` | 6. Entrega & Finalização | `#dc2626` | Novo — **ramo de rejeição** |
| 18 | `Recebimento Definitivo` | 6. Entrega & Finalização | `#16a34a` | Novo |
| 19 | `Liquidado` | 6. Entrega & Finalização | `#15803d` | Novo como status real — **gatilho de "Liquidado"** |
| 20 | `Pago` | 6. Entrega & Finalização | `#166534` | Novo como status real — **gatilho de "Pago"** |
| 21 | `Pedido Entregue` | 6. Entrega & Finalização | `#14532d` | **Mantido exatamente igual** (ver justificativa abaixo) |

`Pedido Entregue` fica com o mesmo texto porque `acompanhe.js` (`renderOrderRatingSection`/`setOrderRating`) trava a avaliação por estrelas exatamente nesse valor; renomear obrigaria tocar mais pontos sem ganho.

## Módulo compartilhado novo: `src/js/status-pipeline.js`

Segue o padrão já estabelecido no repo (scripts globais sem módulos ES, mesmo padrão de `users.js`/`nav.js`/`emptystate.js`). Substitui e unifica:
- `statusOptions` (`status.js:1-13`) e `statusSteps` (`acompanhe.js:1-13`) → `STATUS_VALUES` (array derivado de `STATUS_PIPELINE`, uma lista de objetos `{ value, stage, stageLabel, color, branch }`).
- `getStatusClass()` duplicado (`status.js:65-71`, `acompanhe.js:150-156`) → versão única.
- `getStatusIndex()` (`acompanhe.js:158-161`) → versão única.
- `getStatusFlags()` (`planning.js:14-29`) → versão única, com a regra unificada:
  - `includeInTotal`: true exceto quando pendente (`DFD Registrado`, `Em Análise Setorial`, `Aguardando Suplementação`) ou `Arquivado`.
  - `includeInComprometido`: true a partir de `Reserva Orçamentária Confirmada` (índice ≥) — novo gatilho único, substitui tanto o `TR` do `planning.js` quanto o "qualquer não-pendente" do `budget.js`. **Isso muda os números de "Comprometido" no Orçamento** contra a mesma seed — mudança intencional (correção da divergência).
  - `includeInEmpenhado`: true a partir de `Nota de Empenho Emitida`.
  - `includeInLiquidado`/`includeInPago`: true a partir de `Liquidado`/`Pago` respectivamente, exceto no ramo `Recebimento Rejeitado (Aguardando Substituição)` (conta como comprometido/empenhado mas nunca como liquidado/pago).
- `PENDING_STATUSES`/`isPendingStatus`/`isArchivedStatus` (`budget.js:9-16,40-46`) → versões únicas (`PENDING_STATUSES = new Set(['DFD Registrado', 'Em Análise Setorial', 'Aguardando Suplementação'])`).
- Novo `getStatusStage(status)` (1-6) e `STAGE_LABELS` — usado para redesenhar a timeline.
- Novo `isBranchStatus(status)` / `isRejectedBranchStatus(status)` — usado para tratar os dois estados terminais fora do caminho principal (`Arquivado`, `Recebimento Rejeitado`).
- Novo `renderStatusFilterOptions(selectEl)` — elimina as duas listas `<option>` hardcoded (`status.html:53-64`, `acompanhe.html:53-64`), gerando o filtro a partir do array único.

## Redesenho da timeline (`acompanhe.js`)

Hoje a timeline (`renderOrderList`, linhas 389-405) é puramente linear por `indexOf()`, sem noção de ramos — por isso `Arquivado` (índice antigo 3) aparece com "3 etapas concluídas", o que é enganoso para um estado rejeitado.

Nova lógica em `renderOrderList`:
- **Status do caminho principal** (19 dos 21, excluindo os dois de ramo): renderiza os passos agrupados sob os 6 cabeçalhos de etapa (`STAGE_LABELS`), com completed/current/pending calculado por `getStatusIndex()` como hoje, mas sem pular o índice 0 (agora `DFD Registrado` é uma etapa real, não um valor-padrão a ser ignorado).
- **Status de ramo** (`Arquivado`, `Recebimento Rejeitado (Aguardando Substituição)`): não tenta marcar passos individuais como concluídos (o app não tem trilha de auditoria — `documento_de_visao.md:304` já assume essa lacuna). Em vez disso, renderiza um banner de alerta (`.timeline-branch-alert`, com variante `--archived`/`--rejected`) informando em qual das 6 etapas o processo parou, sem simular progresso que não pode ser comprovado.

## Migração dos dados de exemplo (seed)

Find-and-replace literal em `src/js/cbmdf_orders_seed.js` (JSON de uma linha, 11 pedidos), mapeando por **posição relativa no array antigo** (não por semelhança de texto — `DFD` no modelo antigo ficava logo depois de `Incluído no PCA`, então não pode virar `DFD Registrado`, que agora é a própria etapa 1):

| Pedido (usuário) | Status antigo | Status novo |
|---|---|---|
| #1 Carlos Eduardo, #6 Carlos Eduardo | `Pedido Entregue` | `Pedido Entregue` (sem mudança) |
| #2, #3 Ana Beatriz, #9 Carlos Eduardo | `DFD` | `ETP em Elaboração` |
| #4 João Pedro, #10 Fernanda Silva | `Nota de Empenho emitida` | `Nota de Empenho Emitida` |
| #5 Maria Oliveira | `Recebido no CESMA` | `Recebimento Definitivo` |
| #7 Maria Oliveira, #11 João Pedro | `Incluído no PCA` | `Incluído no PCA` (sem mudança) |
| #8 Ana Beatriz | `TR` | `Reserva Orçamentária Confirmada` |

## Arquivos a alterar

- **`src/js/status-pipeline.js`** (novo) — módulo central descrito acima.
- **`src/js/status.js`** — remove `statusOptions`/`getStatusLabel`/`getStatusClass` locais; dropdown de status (linha ~252) passa a usar `STATUS_VALUES`; `normalizeOrders` usa `DEFAULT_STATUS`.
- **`src/js/acompanhe.js`** — remove `statusSteps`/`getStatusClass`/`getStatusIndex` locais; `normalizeOrders` usa `DEFAULT_STATUS`; timeline (389-405) reescrita conforme acima.
- **`src/js/planning.js`** — remove `getStatusFlags` local (14-29), usa a versão do módulo compartilhado (mesma assinatura, sem mudança nos call sites).
- **`src/js/budget.js`** — remove `PENDING_STATUSES`/`isPendingStatus`/`isArchivedStatus` locais; `computeCommittedBySector` (linha ~194) passa a checar `getStatusFlags(status).includeInComprometido` em vez de `isArchivedStatus || isPendingStatus`.
- **`src/js/script.js`** — linha ~674: `status: 'Aguardando Análise'` → `status: 'DFD Registrado'` (literal; `index.html` não vai carregar o módulo novo só por isso — único ponto de status ali, mesmo padrão de duplicação pontual já tolerado no repo).
- **`src/js/cbmdf_orders_seed.js`** — migração da tabela acima.
- **`src/css/status.css`** — substitui as 11 regras `.status-badge--*` (342-363) por 21, cores da tabela acima; adiciona `.timeline-branch-alert` (+ variantes) perto de `.timeline-step--*`.
- **`status.html`, `acompanhe.html`** — adicionar `<script src="src/js/status-pipeline.js">` (após `emptystate.js`, antes do script da página); trocar as 10 `<option>` hardcoded do `#statusFilter` por chamada a `renderStatusFilterOptions(...)`.
- **`planejamento.html`, `orcamento-geral.html`, `orcamento-setorial.html`** — adicionar o mesmo `<script src="src/js/status-pipeline.js">` (antes de `budget.js`/`planning.js`).
- **`contratacoes.html`/`src/js/contratacoes.js`** — sem mudanças (confirmado zero referências a status; agrupamento é só por `classeNome`).
- **`docs/documento_de_visao.md`** — atualizar lista de acrônimos (adicionar ETP, Edital, Recebimento Provisório/Definitivo, Destino Final), a descrição do fluxo (linha ~103) e a seção de Restrições (linha ~318) para refletir as 6 etapas e os 21 status; ajustar HU02.1 (~145-152) e a descrição da persona "Gestor de Tramitação" (~83) para não re-listar tudo três vezes.

## Verificação

Sem framework de testes — validação manual via `python3 -m http.server` + Chromium/Playwright, como nas fases anteriores:
1. Nova solicitação em `index.html` → status inicial `DFD Registrado`.
2. `status.html`: dropdown e filtro mostram os 21 status na ordem correta das 6 etapas; badges com as cores da tabela.
3. `acompanhe.html`: timeline agrupada por etapa num pedido normal; forçar um pedido para `Arquivado` e outro para `Recebimento Rejeitado (Aguardando Substituição)` e confirmar que aparece o banner de alerta (não progresso fabricado); avaliação por estrelas continua travada até `Pedido Entregue`.
4. `planejamento.html`: KPIs/tabelas/alertas renderizam sem erro contra a seed migrada; pedido #8 (`Reserva Orçamentária Confirmada`) é o que passa a contar como "Comprometido".
5. `orcamento-geral.html`/`orcamento-setorial.html`: números de "Comprometido" refletem a regra unificada (mais estreita que antes); lista de "Solicitações Pendentes" e seu empty state continuam corretos.
6. Console limpo (sem `ReferenceError`) nas 7 páginas.

## Fora de escopo
- Trilha de auditoria de mudança de status (permanece lacuna conhecida, já documentada).
- Validação/restrição de transições de status (continua livre, sem máquina de estados).
- Alterar `contratacoes.js` para filtrar por etapa do pipeline.
- Atualizar `docs/apresentacao_cbmdf_marketplace.md`/`docs/sugestoes.md` (não travam nomenclatura como `documento_de_visao.md`).
