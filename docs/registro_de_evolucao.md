# Registro de Evolução e Decisões

Log cronológico das melhorias do protótipo e — principalmente — do **porquê** de cada uma
(motivação, decisão tomada, alternativas descartadas). Serve de trilha de auditoria do produto e de
**insumo para consolidar o [Documento de Visão](documento_de_visao.md)** ao fim do protótipo.

- **Fonte da verdade:** `git log` + descrições dos Pull Requests + as decisões registradas nas
  conversas de evolução.
- **Relação com outros docs:** o [documento de visão](documento_de_visao.md) é a fonte oficial
  (épicos e HUs); os docs de fase (`fase5_pipeline_status.md`, `fases6-9_governanca_continua.md`,
  `prd_manutencao_ux.md`) detalham a evolução anterior a esta trilha. Este registro é a **camada
  cronológica de decisões** que amarra tudo.
- **Como manter:** a cada incremento entregue, adicionar uma entrada seguindo o template abaixo.

## Template de entrada

```
### AAAA-MM-DD — <Incremento> — PR #<n>
- **Motivação:** que problema/necessidade endereça.
- **Decisão:** o que foi decidido (e por quê).
- **Alternativas descartadas:** o que foi considerado e não seguimos, com o motivo.
- **Entregue:** o que efetivamente mudou (arquivos/áreas).
- **Verificação:** como foi validado.
```

## Linha do tempo (resumo)

| Data | Incremento | PR | Decisão-chave |
|------|-----------|----|---------------|
| 2026-08-08 | PGC · Etapa 1 — Captura do DFD | [#7](https://github.com/munizigor/comprascbmdf/pull/7) | Capturar exercício/DFD e preservar códigos CATMAT/CATSER; aditivo e tolerante a legado |
| 2026-08-08 | PGC · Etapa 2 — Sub-fluxo do DFD + gates | [#7](https://github.com/munizigor/comprascbmdf/pull/7) | Sub-fluxo detalhado; manter "Urgência"; preservar atalho setorial; fila desacoplada |
| 2026-08-08 | PGC · Etapa 3 — Item de PCA | [#8](https://github.com/munizigor/comprascbmdf/pull/8) | Um item por (exercício × classe); derivado on-read |
| 2026-08-08 | PGC · Etapa 4 — Publicação no PNCP | [#8](https://github.com/munizigor/comprascbmdf/pull/8) | Derivar da trilha (não persistir); distinguir gate formal × atalho |
| 2026-08-08 | PGC · Etapa 5 — Exercício + janela de revisão | [#8](https://github.com/munizigor/comprascbmdf/pull/8) | Escopo leve; profundo documentado (HU08.7) |
| 2026-08-08 | Seed enriquecido + ciclo fechado | [#9](https://github.com/munizigor/comprascbmdf/pull/9) | Substituir por ~33 pedidos (25 status); dados canônicos |
| 2026-08-08 | FAB de feedback | [#10](https://github.com/munizigor/comprascbmdf/pull/10) | FAB (vs banner); dispensável por sessão; injeção via nav.js |
| 2026-08-08 | Matriz de Dotação de Material | [#11](https://github.com/munizigor/comprascbmdf/pull/11) | Por item; entrega completa; semeado/read-only; desconto do "em atendimento" |

## Antecedentes (antes desta trilha)

Fases 3–9 (PRs #2–#6) estabeleceram a base sobre a qual esta trilha construiu — empty states e
acessibilidade, dashboards de Planejamento/Orçamento, o **pipeline granular de status**, a
**identidade única de pedido** e o **núcleo de dados**, a **trilha de auditoria / máquina de
estados** e o **Épico 08** (priorização por score, ciclos do PCA e contenção de urgência). Detalhes
em `prd_manutencao_ux.md`, `fase5_pipeline_status.md` e `fases6-9_governanca_continua.md`.

---

## Entradas detalhadas

### 2026-08-08 — Alinhamento ao PGC · Etapa 1 — Captura do DFD — PR #7
- **Motivação:** aproximar a formalização da demanda do fluxo real do **PGC** (Compras.gov.br). O
  DFD oficial exige campos que o app não capturava, e os códigos CATMAT/CATSER — base da consolidação
  — eram descartados na criação do pedido.
- **Decisão:** capturar no passo "Informar necessidade" o **exercício do PCA** (default N+1, como o
  PGC planeja), **data pretendida**, **serviço continuado** e **vínculo ao planejamento**; e
  **preservar `classeCodigo`/`grupoCodigo`** em `order.itens`. Tudo aditivo e tolerante a `undefined`,
  com backfill em `normalizeOrders` para pedidos legados.
- **Alternativas descartadas:** retrofit dos dados antigos item a item (custoso e frágil) — optamos
  por backfill em tempo de carga.
- **Entregue:** `index.html`, `src/js/script.js`, `src/js/core.js` (+ colunas no CSV de exportação).
- **Verificação:** Chromium headless — persistência dos campos, códigos preservados, backfill do seed
  e colunas do CSV.

### 2026-08-08 — PGC · Etapa 2 — Sub-fluxo do DFD + gates de aprovação — PR #7
- **Motivação:** o pipeline colapsava as etapas 1–2 do PGC; faltavam a aprovação pela unidade e pela
  autoridade competente (segregação de funções).
- **Decisão:** novos status `DFD Aprovado pela Unidade`, `DFD Devolvido para Ajuste` (desvio),
  `Consolidado em Item de PCA`, `PCA Aguardando Aprovação`; **gates de aprovador** (aprovador ≠ autor)
  reusando a regra da urgência. Decisões do usuário: **sub-fluxo detalhado** e **manter** o status
  `Incluído no PCA (Urgência)` (sem renomear para "Revisão").
- **Alternativas descartadas:** renomear "Urgência" → "Revisão" (quebraria dados semente e literais);
  sub-fluxo enxuto de 2 gates (menos fiel). **Atalho setorial preservado:** manter a aresta direta
  `Em Análise/Aguardando Suplementação → Incluído no PCA` para não quebrar o `budget.js`. A
  elegibilidade da fila foi **desacoplada** de `isPendingStatus` (só demandas pré-consolidação).
- **Entregue:** `status-pipeline.js`, `audit.js`, `status.js`, `governanca.js`, `status.css`.
- **Verificação:** Chromium headless — máquina de estados, gates (API e UI), aprovador ≠ autor,
  flags de orçamento e elegibilidade da fila.

### 2026-08-08 — PGC · Etapa 3 — Item de PCA materializado — PR #8
- **Motivação:** a consolidação agrupava por texto de classe, misturando anos e sem o código.
- **Decisão:** materializar um **Item de PCA por (exercício × classe CATMAT/CATSER)**, com numeração
  determinística, agregação de quantidade/valor e rastreio dos DFDs de origem. **Derivado on-read**
  (nada persistido além dos ajustes já existentes).
- **Alternativas descartadas:** agrupar só por classe (exercício ambíguo); persistir os itens
  (staleness e invalidação).
- **Entregue:** `contratacoes.js`, `contratacoes.html`.
- **Verificação:** Chromium headless — mesma classe em 2027/2028 gera itens separados, numeração
  estável sob filtro, agregados e origem corretos.

### 2026-08-08 — PGC · Etapa 4 — Publicação no PNCP — PR #8
- **Motivação:** representar o marco de transparência (publicação do PCA).
- **Decisão:** **derivar a publicação da trilha** (transição formal `PCA Aguardando Aprovação →
  Incluído no PCA` com aprovador), sem persistir campo novo — consistente com o padrão derive-on-read.
- **Alternativas descartadas:** persistir `publicadoPncp` (migração e sincronização). **Distinção
  registrada:** inclusões pelo atalho setorial (sem gate) **não** constam publicadas — sinal de
  governança.
- **Entregue:** `audit.js`, `contratacoes.js`, `planning.js`.
- **Verificação:** Chromium headless — data/autoridade a partir da trilha; gate formal × atalho;
  contagem por item e alerta no Planejamento.

### 2026-08-08 — PGC · Etapa 5 — Exercício como dimensão + janela de revisão — PR #8
- **Motivação:** o exercício era capturado mas não era dimensão de análise; faltava sinalizar a
  janela de revisão do PCA (15/set–15/nov).
- **Decisão (do usuário):** **escopo leve** — filtro de exercício no Planejamento e nas Contratações
  + banner da janela de revisão na Governança, **sem reestruturar a fila**. O **escopo profundo**
  (fila/ciclos por exercício) foi **documentado como HU08.7** para guiar a produção.
- **Alternativas descartadas:** escopo profundo agora (mexeria em `buildFila`/ciclos — área sensível).
- **Entregue:** `planning.js` + `planejamento.html`, `contratacoes.js` + `contratacoes.html`,
  `status-pipeline.js`, `governanca.js`, `documento_de_visao.md` (HU08.7).
- **Verificação:** Chromium headless — filtros refletindo o exercício, bordas de `isJanelaRevisao`,
  banner presente/ausente.

### 2026-08-08 — Seed enriquecido + ciclo fechado — PR #9
- **Motivação:** o seed legado (11 pedidos) não exercitava as features novas.
- **Decisão (do usuário):** **substituir** por ~33 pedidos coerentes cobrindo os **25 status**, três
  exercícios, DFD/priorização/PNCP/avaliações, e **semear um ciclo do PCA fechado** com fotografia.
  Dados gerados de forma **canônica** (via gerador) para que `normalizeOrders` não altere nada.
- **Alternativas descartadas:** manter os 11 e só acrescentar (seed misto, meia demonstração).
- **Entregue:** `src/js/cbmdf_orders_seed.js`.
- **Verificação:** Chromium headless — 33 pedidos, 25 status, canonicidade, itens de PCA por
  exercício, PNCP, fila/override/urgência, ciclo fechado; 9 páginas sem erro de JS.

### 2026-08-08 — Convite flutuante de feedback (FAB) — PR #10
- **Motivação:** o protótipo existe para colher feedback; era preciso um convite em destaque em
  todas as páginas para o formulário de coleta.
- **Decisão (UX):** **botão flutuante (FAB)** discreto no canto inferior direito — persistente sem
  bloquear a tarefa; **dispensável por sessão** (some ao fechar, reaparece em sessão nova); injetado
  via `nav.js` (uma fonte, todas as páginas); link em nova aba, acessível por teclado.
- **Alternativas descartadas:** link no banner de protótipo (rola para fora, "cegueira de banner");
  os dois combinados (redundância).
- **Entregue:** `nav.js`, `style.css`, `status.css`.
- **Verificação:** Chromium headless — presença/atributos nas 9 páginas, foco por teclado, ciclo
  dispensar/reaparecer.

### 2026-08-08 — Matriz de Dotação de Material — PR #11
- **Motivação:** os pedidos nasciam sem baseline. A matriz dá a referência objetiva: o que cada
  setor **deveria ter** (prevista) × o que **tem** (atual); a **lacuna** ancora a solicitação.
- **Decisão (do usuário):** granularidade **por item**; entrega **completa** (base + página gerencial
  + integração no pedido); dados **semeados / somente leitura**. Refinamento próprio: **a quantidade
  sugerida desconta o que já está em pedidos em andamento** ("em atendimento").
- **Alternativas descartadas:** por classe CATMAT (não aponta o item exato); edição pela UI no
  protótipo (mais trabalho, adiado).
- **Entregue:** `cbmdf_dotacao_seed.js`, `dotacao.js`, `dotacao.html`, `dotacao-page.js`, `nav.js`,
  `index.html`, `script.js`, `planning.js`, `style.css`, `status.css`, `documento_de_visao.md`
  (ÉPICO 09).
- **Verificação:** Chromium headless — derivações (incl. desconto do em atendimento), necessidades,
  selo, aviso de excedente, página gerencial e `guardPage`; 10 páginas sem erro de JS.

---

## Decisões transversais (valem para toda a trilha)

- **Verificação sempre por Chromium headless (Playwright)**, dirigindo as páginas reais + inspeção
  do `localStorage` (não há suíte de testes no repo).
- **Derive-on-read:** preferir derivar de fontes existentes (trilha, pedidos) a persistir campos
  novos — evita migração e staleness.
- **UI compartilhada via `nav.js`:** banner de protótipo, seletor de perfil, link de Dotação e FAB
  são injetados num único ponto, sem editar os cabeçalhos de cada página.
- **Seeds com guarda `hasValidArray`:** só populam o `localStorage` quando ausente, preservando o
  estado do usuário.

## Backlog de evolução (decisões adiadas — com o porquê)

- **Dotação → priorização da governança** (HU09.3): usar a lacuna de dotação como critério explícito
  no score do Épico 08 (demanda amparada por baseline pesa mais que avulsa). *Adiado para depois de
  colher feedback.*
- **Edição da matriz de dotação pela UI** (HU09.3), com auditoria e integração a inventário/patrimônio.
  *Read-only no protótipo por escopo.*
- **Fila e ciclos por exercício** (HU08.7): escopar `buildFila`/fotografia por exercício. *Adiado por
  ser área sensível; escopo leve entregue na Etapa 5.*
- **Consolidação do Documento de Visão:** passar a limpo incorporando os épicos novos (PGC, Dotação)
  e as HUs de evolução. *Este registro é o insumo.*
