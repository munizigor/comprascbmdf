# Auditoria de Coerência do Protótipo — Funcionalidade × Jornada × Evidência

> **Estado: proposta para decisão.** Este documento mapeia cada funcionalidade do protótipo
> contra (a) a jornada de perfil que ela serve e (b) a evidência que a sustenta — a
> [pesquisa com 20 servidores](pesquisa_servidores_2026.md) e os cinco efeitos da causa-raiz
> (§2.2 do [Documento de Visão](documento_de_visao.md)). Nenhuma funcionalidade foi removida ou
> alterada por este documento: os vereditos são **propostas**, no mesmo rito da §7 da pesquisa
> (nada é implementado sem aprovação explícita).

- **Data da análise:** 10/08/2026, sobre `main` em `05e6643` (após o PR #33).
- **Motivação:** o protótipo ficou **parrudo e incoerente** — engenharia disciplinada
  (núcleo único, derive-on-read, trilha de auditoria, seeds canônicos), mas acumulando ideias
  que ora se sobrepõem, ora se contrapõem. Este documento é o instrumento de poda: separa o que
  **demonstra a espinha dorsal** do que deve **migrar para o Documento de Visão como HU futura**.

---

## 1. Método

### 1.1 Critério de permanência

Uma funcionalidade **fica no protótipo** somente se atender às duas condições:

1. **Aparece em uma das quatro jornadas de demonstração** (§2) — se nenhum roteiro de perfil
   passa por ela, ela não está sendo demonstrada, está apenas ocupando superfície.
2. **Tem evidência que a sustente** — um efeito da causa-raiz (§2.2 da visão) ou um achado da
   pesquisa com os servidores (lacunas A–H, §3–§5 daquele documento).

O que falhar no critério **não é descartado**: migra para o Documento de Visão como HU futura,
preservando a ideia sem sobrecarregar a demonstração. Este é também o **critério de admissão
para ideias novas** daqui em diante: antes de virar código, a ideia precisa declarar a jornada
em que aparece e a evidência que a sustenta.

### 1.2 Vereditos

| Veredito | Significado |
| :--- | :--- |
| ✅ **FICA** | Serve à espinha dorsal; permanece no protótipo como está. |
| 👁️ **FICA + EXPOR** | O dado fica — mas a pesquisa mostra que ele precisa chegar ao solicitante (recomendação §7 da pesquisa, **pendente de aprovação**). |
| 🔀 **RESOLVER** | Duas ideias boas em contradição. Coexistir não é opção: exige decisão registrada no [Registro de Evolução](registro_de_evolucao.md) (§4 detalha cada conflito). |
| 📄 **MIGRA** | Ideia interessante sem jornada ou sem evidência: sai do protótipo e vira HU no Documento de Visão (§5 lista as HUs propostas). |

### 1.3 Abreviações de evidência

- **CR1–CR5** — efeitos da causa-raiz (visão §2.2): CR1 baixa previsibilidade das demandas ·
  CR2 fragilidade da priorização · CR3 retrabalho de consolidação · CR4 desarticulação entre
  atores · CR5 aumento das contratações emergenciais.
- **A–H** — lacunas da pesquisa (§5.2): A teto invisível (75%) · B prazo não chega ao
  requisitante · C calendário de contratações · D ciclo de vida/validade/consumo ·
  E checklist documental · F ponto focal por etapa · G área-fim × área-meio · H capacidade/vazão.
- **GUT** — validação independente do score pelo SELOG/COMOP, POMED/SEGEP e SELOF (pesquisa §3).
- **PGC / Lei 14.133** — fidelidade ao processo real (Compras.gov.br, PNCP), que é requisito
  organizacional (visão §7.1), não achado de pesquisa.

---

## 2. As quatro jornadas de demonstração (espinha dorsal)

O protótipo existe para colher feedback sobre **um** ciclo:
**lacuna de dotação → DFD → priorização → PCA → tramitação → entrega**. Cada perfil percorre um
trecho desse ciclo — e a demonstração deve ser roteirizada por jornada, não por página:

| # | Jornada | Perfil | Roteiro |
| :--- | :--- | :--- | :--- |
| **J1** | **Pedir com referência** | Solicitante | Vê as necessidades de dotação da unidade → monta o pedido no catálogo → caracteriza o DFD (exercício, criticidade, risco) → acompanha posição na fila e trilha do pedido. |
| **J2** | **Julgar e tramitar** | Gestor setorial / de tramitação | Julga a fila setorial (aprovar / suplementar / urgência com 2º aprovador) → aprova o DFD (gates, devolução para ajuste) → tramita o pedido pelas 6 macro-etapas, com SLA e trilha de auditoria. |
| **J3** | **Decidir entre concorrentes** | Comitê de Governança | Vê a fila priorizada com o "Por quê?" do score → exerce exceção com custo político (override) → abre/fecha ciclo com ata e fotografia → monitora a contenção de urgência por setor. |
| **J4** | **Consolidar e cobrar** | Planejamento / Diretoria | Consolida PCA/PLOA por exercício → confere itens de PCA e publicação PNCP → administra tetos orçamentários → cobra os 5 KPIs contra linha de base e meta. |

**Papel da narrativa (resolve o maior conflito aparente):** a Matriz de Dotação e o score da
fila **não competem** — a dotação responde *"o que pedir"* (J1, antes do pedido existir); o
score responde *"o que atender primeiro"* (J3, entre pedidos existentes). A UI e o roteiro de
demonstração devem contar essa sequência explicitamente; hoje elas parecem dois sistemas de
prioridade paralelos.

---

## 3. A tabela — funcionalidade × jornada × evidência × veredito

### 3.1 Catálogo e emissão do pedido (`index.html`, `script.js`)

| Funcionalidade | Jornada | Evidência | Veredito | Por quê |
| :--- | :--- | :--- | :--- | :--- |
| Catálogo com busca textual (nome/descrição/CATMAT) e filtro por categoria | J1 | CR3; base do PGC | ✅ FICA | Porta de entrada da J1; sem catálogo não há demanda estruturada. |
| Wizard de 4 passos (selecionar → necessidade → revisar → confirmar) | J1 | CR1 | ✅ FICA | Organiza a captura do DFD sem impor formulário técnico ao solicitante. |
| Caracterização do DFD (exercício do PCA, data pretendida, serviço continuado, vínculo ao planejamento) | J1 | PGC; CR1 | ✅ FICA | Fidelidade ao PGC — decisão dos PRs #7–#8, verificada. |
| Declaração de criticidade e risco no pedido (insumo do score) | J1→J3 | GUT; CR2 | ✅ FICA | Segregação de quem pontua o quê, validada em campo pelo SELOG/COMOP. |
| Necessidades de dotação no catálogo + selo de dotação no card + aviso de excedente na revisão | J1 | D (parcial); CR1 | ✅ FICA | É o "pedir com referência, não do improviso" — âncora da J1. |
| Desconto do "em atendimento" na quantidade sugerida | J1 | CR1, CR3 | ✅ FICA | Evita pedir o que já vem; refinamento do PR #11. |
| **Urgência por item no carrinho** | — | — | 🔀 RESOLVER | Conflita com criticidade/risco do DFD: dois insumos de priorização paralelos (conflito C2, §4). |
| **Favoritos por usuário + toggle "somente favoritos"** | — | — | 📄 MIGRA | Conveniência de e-commerce sem citação na pesquisa e sem efeito de causa-raiz; nenhuma jornada passa por ela. |
| **Ordenação por relevância / mais solicitados / recentes** | — | — | 📄 MIGRA | Sem evidência; "mais solicitados" duplica os chips de personalização. Busca + categoria bastam para a demonstração. |
| **Personalização: "itens mais solicitados da unidade" e "últimas solicitações"** | (J1) | — | 📄 MIGRA | Ideia boa de recorrência — mas a versão com evidência é outra: a lacuna **D** pede *previsão de consumo*, não atalho de recompra. Migra para o épico de ciclo de vida (§5). |
| Seletor de usuário (troca de identidade) | J1–J4 | mecânica de demo | ✅ FICA | Sem autenticação no protótipo, é o que permite demonstrar perfis. |

### 3.2 Navegação e infraestrutura de demonstração (`nav.js`, `emptystate.js`, `core.js`)

| Funcionalidade | Jornada | Evidência | Veredito | Por quê |
| :--- | :--- | :--- | :--- | :--- |
| Banner "PROTÓTIPO — dados fictícios" | todas | honestidade da demo | ✅ FICA | — |
| Seletor de perfil (solicitante/gestor/compras) com visibilidade `data-profiles` | todas | mecânica de demo | ✅ FICA | É o eixo que materializa as jornadas. |
| FAB de feedback (formulário) | todas | propósito do protótipo | ✅ FICA | O protótipo existe para colher feedback; o FAB é o instrumento. |
| Núcleo único de dados, normalização e backfill (`core.js`) | todas | CR3 | ✅ FICA | Fundação técnica — unificou 6 cópias de `formatPrice` (pesquisa §4). |
| Empty states acessíveis | todas | RNF usabilidade | ✅ FICA | — |

### 3.3 Acompanhamento pelo solicitante (`acompanhe.html`, `acompanhe.js`)

| Funcionalidade | Jornada | Evidência | Veredito | Por quê |
| :--- | :--- | :--- | :--- | :--- |
| Busca e filtros de pedidos (texto, usuário, status) | J1 | CR4 | ✅ FICA | — |
| Trilha do pedido (timeline do `historico[]`) | J1 | §4 da pesquisa ("saber em que pé está"); CR4 | ✅ FICA | Resposta direta à comunicação direcional ruim (2,85/5). |
| Posição na fila + score decomposto no pedido (HU08.6), com marca de override | J1 | CR2, CR4; GUT | ✅ FICA | O solicitante vê a conta que o preteriu — antídoto da articulação informal. |
| **Previsão de prazo / SLA da etapa atual** | J1 | **B**; POMED, PODON (500 dias) | 👁️ FICA + EXPOR | O dado existe (`getSituacaoSla` em `audit.js`) mas o solicitante não o vê — `acompanhe.js` não referencia SLA. Exposição pendente de aprovação (§7 da pesquisa). |
| **Teto/saldo orçamentário da unidade no fluxo do solicitante** | J1 | **A (75%)**; "lista de papai noel" | 👁️ FICA + EXPOR | Calculado em `budget.js`, visível só a gestor/compras. É a dor dominante da amostra. |
| **Avaliação do pedido em 5 critérios (estrelas, liberada em "Pedido Entregue")** | — | — | 📄 MIGRA | Épico 07 completo e funcional — mas **nenhum dos 20 servidores pediu avaliação**. Fecha um ciclo que a demonstração não percorre (nenhum roteiro chega a "Pedido Entregue" com avaliação). Migra de volta ao Épico 07 como evolução. |

### 3.4 Tramitação e gestão de demandas (`status.html`, `status.js`, `status-pipeline.js`, `audit.js`)

| Funcionalidade | Jornada | Evidência | Veredito | Por quê |
| :--- | :--- | :--- | :--- | :--- |
| Pipeline de 25 status em 6 macro-etapas | J2 | PGC; restrição organizacional (visão §7.1) | ✅ FICA | É a especificação-por-exemplo do fluxo real. Na demonstração, navegar por macro-etapa (6), não por status (25). |
| Sub-fluxo do DFD com gates (aprovador ≠ autor) e devolução para ajuste | J2 | PGC; segregação de funções | ✅ FICA | Decisão dos PRs #7–#8, com verificação. |
| **Atalho setorial `Em Análise → Incluído no PCA` (sem gate)** | — | — | 🔀 RESOLVER | Convive com o caminho formal e o contradiz (conflito C1, §4). |
| Inclusão por urgência com motivo ≥ 30 caracteres + 2º aprovador | J2, J3 | **CR5**; §4 da pesquisa ("conter, não contabilizar") | ✅ FICA | Núcleo da contenção de emergenciais. |
| Trilha de auditoria: ponto único de mutação, autor/perfil/tela/motivo, excepcionalidade marcada | J2 | CR3; E ("idas e vindas") | ✅ FICA | Fundação dos KPIs 1 e 2; retrocesso rotulado responde à dor do PODON. |
| SLA por macro-etapa na gestão (`getSituacaoSla`) | J2 | B; KPI 2 | ✅ FICA | Já exposto ao gestor; a pendência é a exposição ao solicitante (§3.3). |

### 3.5 Governança (`governanca.html`, `governanca.js`)

| Funcionalidade | Jornada | Evidência | Veredito | Por quê |
| :--- | :--- | :--- | :--- | :--- |
| Fila priorizada com score 40/30/20/10 e decomposição "Por quê?" | J3 | **GUT** (validação independente); CR2 | ✅ FICA | O achado mais forte da pesquisa sustenta exatamente isto. |
| Desempate estável (score → data → protocolo) | J3 | CR2 | ✅ FICA | — |
| Override manual com motivo ≥ 20 caracteres, expirando no ciclo | J3 | CR2; SELOF ("tudo fica priorizado") | ✅ FICA | Exceção com custo político — sem ela o score seria irreal. |
| Ciclos quadrimestrais com ata e fotografia congelada | J3 | CR1; §4 ("contínuo, não anual") | ✅ FICA | Materializa a causa-raiz: planejamento como processo contínuo. |
| Painel de contenção de urgência por setor (meta 10%, alerta 20%) | J3, J4 | **CR5**; KPI 4 | ✅ FICA | — |
| Banner da janela de revisão do PCA (15/set–15/nov) | J3 | PGC | ✅ FICA | — |
| **Fila e fotografia misturando exercícios** | J3 | HU08.7 já documenta | 🔀 RESOLVER | Decisão consciente do PR #8, mas invisível ao usuário (conflito C4, §4). |

### 3.6 Contratações (`contratacoes.html`, `contratacoes.js`)

| Funcionalidade | Jornada | Evidência | Veredito | Por quê |
| :--- | :--- | :--- | :--- | :--- |
| Item de PCA por (exercício × classe), numeração determinística, DFDs de origem | J4 | PGC; CR3 | ✅ FICA | Consolidação correta — corrigiu o agrupamento por texto. |
| Publicação PNCP derivada da trilha (formal × atalho distinguidos) | J4 | Lei 14.133 | ✅ FICA | Marco de transparência; o "não consta publicado" vira sinal de governança. |
| Filtros por exercício, classe e busca | J4 | CR3 | ✅ FICA | — |
| Exclusão/restauração de grupos e itens | J4 | HU03.1 | ✅ FICA | Curadoria mínima da consolidação. |
| **Inclusão manual de item de contratação (formulário de 12 campos)** | — | — | 🔀 RESOLVER | Cria demanda **por fora** do DFD: sem score, sem dotação, sem gate — contradiz a jornada de governança que o resto do produto conta (conflito C3, §4). |

### 3.7 Planejamento e orçamento (`planejamento.html`, `planning.js`, `orcamento-*.html`, `budget.js`)

| Funcionalidade | Jornada | Evidência | Veredito | Por quê |
| :--- | :--- | :--- | :--- | :--- |
| Resumo executivo (PCA geral/setorial, PLOA) + alertas | J4 | CR3 | ✅ FICA | — |
| Relatórios PCA (tipo × classe; setor × tipo × classe) com os 5 estágios da despesa + saldo | J4 | CR3; formato oficial | ✅ FICA | — |
| Relatório PLOA (tipo × natureza de despesa) | J4 | CR3; formato oficial | ✅ FICA | — |
| Filtro por exercício | J4 | PGC (Etapa 5) | ✅ FICA | — |
| Exportação CSV dos pedidos | J4 | CR3 (SELOF consolida à mão hoje) | ✅ FICA | — |
| Cobertura de dotação como indicador do planejamento | J4 | HU09.2 | ✅ FICA | — |
| Tetos corporativos e setoriais de Custeio/Investimento, com saldo não alocado | J4 | **A (75%)** | ✅ FICA | A dor dominante da amostra é a razão de ser desta tela — o pendente é expor o resultado ao solicitante (§3.3). |
| **Duas páginas de orçamento (geral + setorial) além do planejamento** | J4 | A | 🔀 RESOLVER | Três telas exibem cortes setoriais de dinheiro com papéis pouco distintos (conflito C5, §4). |
| **Gráfico Chart.js (CDN externo) orçamento × planejado × contratado** | (J4) | — | 📄 MIGRA | Único ponto do protótipo dependente de CDN; a tabela ao lado carrega a mesma informação. Vira nota de UI para produção. |

### 3.8 Dotação, indicadores e dados (`dotacao*.js/html`, `indicadores.*`, seeds)

| Funcionalidade | Jornada | Evidência | Veredito | Por quê |
| :--- | :--- | :--- | :--- | :--- |
| Matriz de Dotação: prevista × atual × lacuna × cobertura, por setor e item | J1, J4 | D (parcial); GPRAM à mão | ✅ FICA | Baseline objetivo — âncora da J1 e indicador da J4. |
| Painel gerencial da dotação (déficits/excedentes, read-only) | J4 | HU09.2 | ✅ FICA | — |
| Painel de 5 KPIs com valor atual × linha de base × meta/prazo, e rodapé de cobertura da base | J4 | B; KPIs §8 da visão | ✅ FICA | Um número sem linha de base não permite cobrar; é a tela da "cobrança". |
| Seed canônico (33 pedidos, 25 status, 3 exercícios, ciclo fechado) | todas | mecânica de demo | ✅ FICA | Sem ele nenhuma jornada é demonstrável. |
| Guarda `hasValidArray` (seed não sobrescreve estado do usuário) | todas | decisão transversal | ✅ FICA | — |

---

## 4. Conflitos a resolver por decisão (não por coexistência)

Cada item abaixo é um par de ideias boas que, somadas, se contrapõem. A proposta de resolução
acompanha cada um; a decisão final deve virar entrada no
[Registro de Evolução](registro_de_evolucao.md).

### C1 — Caminho formal do DFD × atalho setorial
O sub-fluxo com gates (aprovador ≠ autor, publicação PNCP derivada do gate formal) convive com
a aresta direta `Em Análise Setorial / Aguardando Suplementação → Incluído no PCA`, preservada
no PR #7 "para não quebrar o `budget.js`". Dois caminhos para o mesmo estado com semânticas de
governança opostas.
**Proposta:** o caminho formal vira o único da demonstração; o atalho, se mantido, passa a ser
transição excepcional explícita (exige a marcação de excepcionalidade da trilha), e o ajuste no
`budget.js` é feito de uma vez.

### C2 — Urgência por item (carrinho) × criticidade/risco do DFD
Dois insumos de priorização declarados pelo mesmo ator em momentos diferentes. A urgência por
item veio da metáfora de e-commerce; a criticidade/risco é o insumo real do score (Épico 08),
validado pela GUT.
**Proposta:** remover a urgência por item da UI do carrinho; manter o campo internamente apenas
para o backfill de legado previsto na HU08.1 (derivar criticidade de pedidos antigos). A
prioridade passa a ser declarada uma única vez, no DFD.

### C3 — Inclusão manual de item de contratação × governança do fluxo
O formulário da tela de Contratações insere demanda diretamente no plano, sem DFD, sem score,
sem âncora de dotação e sem gate — exatamente o "pedido avulso" que o produto existe para
reduzir. A HU03.2 é legítima (demandas fora do catálogo existem), mas a implementação atual
contorna a governança.
**Proposta:** retirar o formulário da demonstração; reescrever a HU03.2 no Documento de Visão
com a regra "item manual gera registro equivalente ao DFD (com criticidade/risco e trilha)".

### C4 — Exercício como dimensão × fila/ciclos que misturam exercícios
O exercício é capturado, filtra Planejamento/Contratações e materializa o Item de PCA — mas
`buildFila` e a fotografia do ciclo misturam anos. Decisão consciente (HU08.7, para conter
risco), porém invisível para quem usa.
**Proposta:** manter o escopo (não mexer em `buildFila` no protótipo), mas **declarar na UI da
Governança** que a fila exibida abrange todos os exercícios, com link/nota da HU08.7. Conflito
resolvido por transparência, não por código.

### C5 — Três telas de dinheiro setorial (Orçamento Geral, Orçamento Setorial, Planejamento)
Papéis que se sobrepõem aos olhos do usuário de feedback: tetos/alocação (orçamento) e demanda
agregada (planejamento) aparecem como três páginas irmãs.
**Proposta:** manter as duas funções, mas com papéis nomeados na própria UI — "Orçamento
(teto: quanto há)" e "Planejamento (demanda: quanto se quer)" — e avaliar a fusão das duas
páginas de orçamento em uma com filtro de setor. Decisão de UX, baixo risco.

### C6 — Nome "Marketplace" × produto "camada de governança"
O reposicionamento (governança/orquestração, PR de visão) já foi feito nos documentos, mas o
protótipo carrega heranças da metáfora de marketplace: favoritos, ordenação por popularidade,
avaliação por estrelas, urgência no carrinho. As migrações propostas na §3 (favoritos,
ordenação, personalização, avaliação) e o C2 resolvem este conflito na prática — o que
permanece do "marketplace" é o que serve à governança: catálogo, carrinho e acompanhamento.

---

## 5. O que migra para o Documento de Visão (HUs propostas)

Nada se perde: cada funcionalidade removida da demonstração vira uma HU futura, com a evidência
que ainda lhe falta declarada como critério de retorno.

| HU proposta | Origem no protótipo | Épico de destino | Condição de retorno |
| :--- | :--- | :--- | :--- |
| **HU01.3 — Conveniências de catálogo** (favoritos, ordenação por popularidade/recência) | `script.js` (favoritos, `sortSelect`) | Épico 01 | Evidência de uso real no piloto (telemetria) ou pedido explícito dos usuários. |
| **HU06.4 — Recorrência e recompra assistida** (itens mais solicitados, últimas solicitações → previsão de consumo) | `renderPersonalization` | Épico 06 | Absorvida pela evolução da lacuna **D** (ciclo de vida/consumo) — a versão com evidência é *prever reposição*, não *repetir pedido*. |
| **HU07.1 (reescopo) — Avaliação do pedido** | `acompanhe.js` (estrelas, 5 critérios) | Épico 07 | Retorna quando houver jornada de recebimento real (produção) ou demanda dos usuários no feedback. |
| **HU03.2 (reescrita) — Item manual com governança** | formulário de `contratacoes.html` | Épico 03 | Item manual passa a gerar registro equivalente ao DFD (criticidade/risco, trilha, âncora). |
| **Nota de UI — visualização gráfica do orçamento** | Chart.js em `orcamento-geral.html` | RNF/produção | Design System gov.br na produção; sem CDN externo. |

Já documentadas anteriormente (mantidas como estão): **HU08.7** (fila/ciclos por exercício),
**HU09.3** (edição da matriz + lacuna de dotação no score), e o backlog do
[Registro de Evolução](registro_de_evolucao.md).

---

## 6. Resumo quantitativo

| Veredito | Quantidade | Leitura |
| :--- | :--- | :--- |
| ✅ FICA | 38 | A espinha dorsal é a grande maioria — o protótipo **não precisa encolher muito, precisa focar**. |
| 👁️ FICA + EXPOR | 2 | Teto orçamentário e previsão de prazo: os dados existem; falta chegarem ao solicitante (dor de 75% da amostra). Pendente de aprovação (§7 da pesquisa). |
| 🔀 RESOLVER | 6 | C1–C6: pares de ideias boas em contradição. Cada um exige uma decisão registrada, não coexistência. |
| 📄 MIGRA | 5 | Favoritos, ordenação, personalização, avaliação e o gráfico CDN: ideias preservadas como HUs, fora da demonstração. |

**Conclusão:** a incoerência do protótipo não está na quantidade de funcionalidades — está em
(1) seis conflitos não decididos, (2) duas informações vitais calculadas mas escondidas de quem
mais precisa delas, e (3) cinco conveniências herdadas da metáfora de marketplace que diluem a
narrativa de governança. Resolvidos os três grupos, o protótipo volta a contar uma única
história: *pedir com referência, decidir com critério, cobrar com linha de base*.

---

## 7. Relação com os demais documentos

- [Documento de Visão](documento_de_visao.md) — destino das HUs migradas (§5) e fonte dos
  efeitos da causa-raiz (§2.2) usados como evidência.
- [Pesquisa com Servidores](pesquisa_servidores_2026.md) — fonte das evidências A–H e da
  validação GUT; o rito de "diagnóstico sem implementação" da §7 é o mesmo adotado aqui.
- [Registro de Evolução](registro_de_evolucao.md) — onde cada decisão sobre os conflitos C1–C6
  deve ser registrada quando tomada.
