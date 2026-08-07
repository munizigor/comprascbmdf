# Fases 6–9 — Da rastreabilidade à governança contínua

## Contexto: a causa raiz, em duas camadas

O `docs/documento_de_visao.md` (§2.2) acerta o diagnóstico do problema público: a causa-raiz **não é a periodicidade anual do PCA**, e sim *"a ausência de um sistema institucional de **governança** que transforme o planejamento das contratações em um processo contínuo de gestão"*. Ele lista cinco efeitos dessa lacuna. Auditei os 7 épicos contra esses cinco efeitos:

| Efeito da causa-raiz | Épico que endereça |
|---|---|
| Retrabalho na consolidação manual | 04 — **resolvido**, é a força real do produto |
| Desarticulação entre atores | 02 — parcial (dá visibilidade, não cria decisão) |
| Baixa previsibilidade das demandas | 01/06 — parcial |
| **Fragilidade da priorização institucional entre pedidos concorrentes** | **nenhum** |
| **Aumento das contratações emergenciais** | apenas contabilizado, nunca contido |

**Camada 1 — o escopo entrega um sistema de registro, não de governança.** Governança é decidir entre demandas concorrentes com recurso escasso. Não existe HU de priorização, fila, comitê ou critério de desempate. O produto é excelente em tornar demandas visíveis e incapaz de fazer alguém escolher entre elas. A própria apresentação nomeia esse modo de falha: *"reduzindo o projeto a 'mais um formulário'"*.

**Camada 2 — o protótipo não consegue provar nem medir o que promete.** O KPI principal ("Redução do tempo médio de tramitação") tem como método declarado *"Comparação do histórico de datas de atualização de status"* — histórico que **não existe**. `status.js:111-117` sobrescreve o status sem registrar autor, data ou estado anterior. Somam-se: sem ID estável de pedido (a posição no array é a identidade, e vaza para o HTML e para chaves persistidas em `cbmdf_contratacoes`), sem máquina de estados (um pedido salta de `DFD Registrado` para `Pago`), e 3 semânticas divergentes de `getItemSubtotal` + 3 de `formatPrice` — **o mesmo pedido soma valores diferentes conforme a tela aberta**.

A Camada 2 torna a Camada 1 indemonstrável. Não se sustenta uma tese de "governança contínua" perante a Direção com um protótipo onde o valor muda de tela para tela e ninguém sabe quem decidiu o quê.

**Decisões aprovadas:** fechar a lacuna de governança; criar o Épico 08 e atualizar os docs; tornar os KPIs mensuráveis; corrigir ID estável + núcleo de cálculo como base técnica da auditoria.

**Princípio de sequenciamento:** cada fase entrega uma frase que a Direção entende sozinha.

---

## Fase 6 — Identidade estável e núcleo único

> *"O mesmo pedido soma o mesmo valor em todas as telas. Cada pedido tem protocolo. Excluir um pedido não bagunça mais as contratações. 'Meus pedidos' mostra só os meus."*

**Novo `src/js/core.js`** — segue o padrão já estabelecido de módulo global (`status-pipeline.js`, `emptystate.js`, `nav.js`; sem módulos ES, sem build). Absorve as famílias duplicadas, cada uma com **uma** semântica decidida:

- `formatPrice` — 6 cópias (`status.js:39`, `script.js:308`, `planning.js:6`, `acompanhe.js:99`, `contratacoes.js:15`, `budget.js:9` `formatMoney`) → `toAmount(v).toLocaleString(...)`, nunca lança. `formatMoney` é renomeado nos call sites, sem alias.
- `getItemSubtotal` — 3 cópias divergentes → subtotal declarado (`subtotal ?? total`) vence **se finito**, senão `quantidade × precoUnitario`. Corrige `budget.js:27` (tratava `null` como 0) e `status.js:19` (ignorava o alias `total`).
- `normalizeOrders` — as duas cópias **incompatíveis** (`status.js:23` garante `itens` e ignora `avaliacao`; `acompanhe.js:84` o inverso, ambas gravando) viram **uma união**. O conflito deixa de existir: a ordem de visita às páginas para de alterar dados persistidos.
- `getSavedOrders`/`saveOrders` — 5 cópias sem `try/catch` + a defensiva de `budget.js:33` → fica a defensiva.
- `escapeHtml` (com `?? ''`, corrigindo o "undefined" de `contratacoes.js:219`), `escapeAttr`, `escapeJsAttr`.
- `createOrder`, `exportOrdersCsv` (movida de `script.js:239`, hoje órfã).

**Identidade:** `id` = `PED-<ano>-<seq>` (legível como protocolo institucional), `criadoEm` ISO, `itemUid` por item, `historico[]` criado já nesta fase (mesmo sem uso) para a Fase 7 não exigir segunda migração. `cbmdf_schema_version = 1`. Migração idempotente, em `try/catch`, que nunca apaga dado.

**Correção do bug latente:** as chaves de `cbmdf_contratacoes.excludedItemKeys` embutem `orderIndex:itemIndex` (`contratacoes.js:41-43`) — hoje, excluir um pedido faz itens ocultos reaparecerem e itens legítimos sumirem. Migram para `item:<itemUid>`. Atenção: `order.data` contém `,` e `:`, então o parse da chave antiga precisa ser **do fim** (`pop()`), não da esquerda.

**Integridade encaixada nesta fase:**

| Correção | Decisão |
|---|---|
| `acompanhe.js:459-464` mostra pedidos de **todos** | Filtrar pelo usuário corrente (`CBMDFNav.getCurrentUser()`). O título "Meus pedidos" é falso hoje, e LGPD é RNF declarado (§6.3). Perfis `gestor`/`compras` mantêm a opção "todos". |
| XSS em `planning.js:59,71` e `budget.js:313-321,470` | Aplicar `escapeHtml`. Caminho alcançável: campo "Classe" em `status.html` → `innerHTML`. |
| Escape JS em `contratacoes.js:179,208` | **Eliminar a classe do bug**: migrar para `data-*` + delegação (padrão já em `budget.js:527-547`), não remendar. |
| `exportOrdersCsv` órfã | **Dar botão** em `planejamento.html` — o §4.2 já promete "exportação em CSV". Adicionar guarda em `order.itens.forEach`. |
| Formulário de inclusão manual comentado (`contratacoes.html:75-140`) | **Implementar** — é a HU03.2, escopo aprovado. Corrigir os 12 `getElementById` que hoje lançariam `TypeError`. |
| "Restaurar grupos excluídos" comentado (`contratacoes.html:50-53`) | **Implementar** — HU03.1 exige, e hoje exclusões são **irreversíveis pela interface**. |
| `groupBy` órfã (`planning.js:14`) | **Remover** — sua regra contradiz a agregação real da tela (ignora `getStatusFlags`); é armadilha. |
| `renderTable`×`createReportTable` (33 linhas idênticas) | Deduplicar. |
| Reparse+regravação a cada tecla (`acompanhe.js:185`, `status.js:73`) | Cache em memória + debounce 200 ms. |

Handlers passam a usar **id, não índice** (`status.js:225-229`, `acompanhe.js:224`, `budget.js:473,515,516`). Ordem de scripts uniformizada nas 7 páginas (`index.html` e `contratacoes.html` passam a carregar `status-pipeline.js`).

---

## Fase 7 — Trilha de auditoria e máquina de estados

> *"Toda mudança tem autor, data e motivo. Não dá mais para pular de DFD Registrado para Pago."*

**Novo `src/js/audit.js`** com **`applyStatusChange(orderId, novoStatus, contexto)` como ponto único de mutação de status no app inteiro**. Hoje há três pontos independentes e sem registro: `status.js:111`, `budget.js:579` (`approveOrderInSector`) e `budget.js:588` (`markOrderAsSupplementRequest`), mais a criação em `script.js:672`.

`historico[]` grava: `de`, `para`, `em` (ISO), `por` {nome, matrícula}, `perfil`, `origem` (tela), `justificativa`, `excepcional`, `aprovador`, `migrado`.

> **Regra de honestidade do dado:** pedidos já existentes recebem **uma** entrada gênese marcada `migrado:true` ("histórico anterior indisponível"). Nunca fabricar timestamps intermediários para dado real — seria exatamente o vício que o produto combate. A **seed**, ao contrário, ganha histórico fictício completo e coerente (o banner "PROTÓTIPO — dados fictícios" já cobre), senão o painel da Fase 9 abre vazio na demonstração.

**Máquina de estados** derivada de `getMainPathStatuses()`/`getStatusIndex()` (já existem em `status-pipeline.js`) — só ramos e bifurcações da Etapa 2 são declarados à mão. `Pedido Entregue` é terminal; `Arquivado` reabre para `Em Análise Setorial`.

Obrigações: → `Arquivado` e retrocessos exigem justificativa (≥20 car.); → `Incluído no PCA (Urgência)` exige justificativa ≥30 **+ aprovador ≠ autor**.

**UI:** o `<select>` mostra **apenas transições válidas** — exibir 21 opções das quais 18 serão recusadas ensina o usuário a errar; exibir as 3 válidas **comunica o processo**. Válvula de escape: checkbox **"Transição excepcional"**, só para perfil `compras`, libera os 21 status, torna a justificativa obrigatória e grava `excepcional:true`. A demonstração continua flexível, mas **todo atalho deixa rastro**. Retrocesso é rotulado "Devolver para correção" — ato administrativo, não desfazer.

`budget.js` ganha justificativa **derivada da validação real** já calculada em `requestFitsSectorBudget` (`budget.js:430-441`) — verdadeira e sem digitação.

**Guardas de perfil** nas páginas de gestão, explicitamente rotuladas como *coerência de demonstração, não segurança* (impossível em app estático) — mas necessárias para que o autor gravado na trilha signifique algo. Paginação de 20 cards (o histórico pesa o card).

---

## Fase 8 — Épico 08: priorização, ciclos e contenção de urgência

> *"A Direção vê por que o pedido A vem antes do B, com a conta na tela. O PCA é revisto por quadrimestre com ata e autor. Nenhuma urgência entra sem justificativa e segundo aprovador."*

**Novos `src/js/governanca.js` + `governanca.html`** (perfis `gestor`/`compras`). Página nova, não integração: fila, rito de ciclo e painel de urgências formam um fluxo com um dono único (o Comitê); espalhá-los reproduziria o modo de falha "mais um formulário".

**Score transparente, exibido na tela:**
`score = 40·(criticidade/5) + 30·(risco/5) + 20·(obrigatoriedadeLegal) + 10·(prontidão/5)`
Desempate: score ↓ → `criadoEm` ↑ → `id` ↑.

Criticidade e risco são declarados pelo **requisitante**; obrigatoriedade legal e prontidão da instrução, pelo **Planejamento** — ninguém pontua a si mesmo em 100%. Score com pesos (não ordenação manual) é explicável ao setor preterido e auditável. `override` manual existe (a realidade exige exceção), exige justificativa, aparece com nome e motivo na fila (custo político para o arbítrio) e **expira ao fechar o ciclo**.

**Ciclos do PCA** (`cbmdf_pca_ciclos`, quadrimestral): um aberto por vez; fechar exige justificativa + autor e **congela uma fotografia imutável** (protocolo, setor, valor, score, posição, status, marca de urgência). É o "planejado" contra o qual medir o executado — o denominador que hoje não existe. Congelar não trava a tramitação.

**Conexão com o que já existe:** `getSectorPendingRequests` (`budget.js:400-405`) já é a fila de aprovação setorial, hoje **sem ordenação por prioridade** — passa a ordenar por score, e ganha o terceiro botão **"Incluir por Urgência"** ao lado de "Aprovar no Setor"/"Solicitar Suplementação" (`budget.js:514-517`). A urgência é justamente a decisão de furar a fila; é ali que ela pertence.

Épico 08 escrito em `docs/documento_de_visao.md` com HU08.1–HU08.6 (fila priorizada; decisão de exceção; rito de ciclo; contenção de urgência; painel de urgências por setor com série temporal; visibilidade da posição pelo requisitante) + nova persona **Comitê de Governança de Contratações**.

---

## Fase 9 — Indicadores mensuráveis

> *"Aqui está a prova."*

**Novos `src/js/indicadores.js` + `indicadores.html`**, calculados 100% do `historico[]` + fotografias congeladas.

**SLA por macro-etapa** (o "prazo esperado por etapa" que o KPI 2 cita e que não existe em lugar nenhum do repositório): 5 / 15 / 45 / 60 / 45 / 30 dias = **200 dias ponta a ponta**.

**Metas com prazo:**

| KPI | Baseline | Meta | Prazo |
|---|---|---|---|
| Tempo médio DFD→Entregue | amostra retrospectiva | ≤ 200 dias | 12 m |
| % dentro do SLA da etapa | 0% (não mensurável hoje) | ≥ 80% (50% em 3 m, 65% em 6 m) | 12 m |
| Aderência planejado×executado | 1º ciclo fechado | desvio ≤ 15% | 2º exercício |
| % do valor por urgência | dispensas emergenciais no PNCP (24 m) | ≤ 10% do ciclo; nenhum setor > 20% | 18 m |
| Adoção | 0 | ≥ 90% das unidades **e** ≥ 70% do valor | 12 m |

**Coleta do baseline:** amostra de 30 processos SEI encerrados (7 datas cada, ~1 semana de 1 servidor) para KPIs 1–2; PNCP para o KPI 4; o KPI 3 é declarado **não reportável no 1º ciclo** — honestidade metodológica, já que o mundo anterior são planilhas dispersas e o denominador não existe.

O painel exibe **valor atual, baseline e meta lado a lado**, e um rodapé metodológico com "N pedidos excluídos do cálculo por histórico migrado". A cobertura do dado é parte do produto.

**Docs:** §8 reescrita (6 colunas) + §8.1 SLA + §8.2 protocolo de baseline + §8.3 fonte do dado; §6.3 deixa de listar trilha de auditoria como lacuna.

---

## Fora de escopo (e por quê)

| Fora | Motivo |
|---|---|
| Backend, banco, autenticação real | Restrição declarada (§7.1). As guardas de perfil da Fase 7 são rotuladas como simulação. |
| Épicos 05 (ARPs) e 06 (IA) | Nenhum toca a causa-raiz de governança. |
| Teste/linter/CI/build | Triplicaria o escopo por fase sem nada demonstrável à Direção. Recomendação separada. |
| Notificação/cobrança automática de SLA | Sem backend, é teatro. O SLA é medido, não cobrado. |
| Migrar para módulos ES/bundler | O padrão de globais funciona sem build; trocá-lo é risco sem retorno público. |

---

## Verificação

Sem framework de teste: `python3 -m http.server` + Chromium/Playwright, roteiro automatizado, como nas Fases 1–5. Por fase, os testes que **provam** a correção:

**Fase 6** — (a) injetar `cbmdf_orders` legado sem `id` + `excludedItemKeys` no formato antigo; confirmar migração e que **o mesmo item continua oculto**; (b) o bug latente: excluir item em Contratações, excluir um pedido *anterior* em Gestão, voltar — o item oculto deve ser o mesmo; (c) convergência: pedido com `subtotal:null` e outro com alias `total` somam idêntico nas 5 telas; (d) `precoUnitario:null` renderiza "R$ 0,00" em vez de `TypeError`; (e) visitar `status`→`acompanhe`→`status` preserva `avaliacao` e `itens`; (f) Classe = `<img src=x onerror=alert(1)>` renderiza como texto; (g) classe com apóstrofo não quebra o botão; (h) `acompanhe.html` mostra só os pedidos do usuário corrente.

**Fase 7** — `DFD Registrado` oferece só 2 transições (`Pago` ausente); arquivar sem motivo é bloqueado; "Transição excepcional" invisível para `solicitante` e, para `compras`, grava `excepcional:true`; "Aprovar no Setor" em `orcamento-setorial.html` gera entrada de histórico com origem e justificativa derivada do saldo; `Pedido Entregue` não oferece saída mas mantém a avaliação.

**Fase 8** — a decomposição do "Por quê?" soma o score exibido; empate desempata por `criadoEm` de forma estável; mover sem motivo é bloqueado; fechar ciclo sem justificativa é bloqueado e, com ela, congela — alterar o status depois **não** muda a fotografia, e o `override` não passa para a fila nova; urgência com justificativa de 20 caracteres é bloqueada (mín. 30) e com o próprio usuário como aprovador também.

**Fase 9** — alterar um status move o KPI 1; injetar pedido migrado aumenta o N do rodapé **sem** mover a média; sem ciclo fechado o KPI 3 exibe "não reportável no 1º ciclo"; setor acima de 20% aparece sinalizado.

Console limpo (zero `ReferenceError`/`TypeError`) em todas as páginas, nos 3 perfis, com `localStorage` vazio e semeado.

---

## Arquivos críticos

- `src/js/core.js` *(novo — núcleo de dados, formatação, escape e migração; base das 4 fases)*
- `src/js/audit.js` *(novo — `applyStatusChange` como ponto único, máquina de estados, SLA)*
- `src/js/governanca.js` + `governanca.html` *(novos — score, fila, ciclos, urgência)*
- `src/js/indicadores.js` + `indicadores.html` *(novos — 5 KPIs sobre a trilha)*
- `src/js/status.js` *(maior concentração de dívida: índice no HTML `225-229`, mutação sem trilha `111-117`, select sem máquina de estados `226`)*
- `src/js/budget.js` *(mutações `579`/`588`, XSS `470`, e onde o Épico 08 se conecta ao fluxo existente)*
- `docs/documento_de_visao.md` *(Épico 08, nova persona, §6.3, reescrita da §8)*
