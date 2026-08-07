# PRD — Manutenções de UX do CBMDF Marketplace (Central de Compras CBMDF)

## Contexto

Uma auditoria heurística de UX (documento anexado pelo usuário) avaliou o protótipo em 6,3/10, com potencial de 9/10. O diagnóstico central é que o sistema hoje expõe **uma única navegação global para três personas muito diferentes** (Solicitante, Gestor da unidade, Compras/Planejamento), o que gera ambiguidade (ex.: "Acompanhar" vs "Gerir pedidos"), sobrecarga cognitiva e páginas de gestão (Planejamento, Orçamento) que são tabelas administrativas em vez de dashboards. O objetivo desta manutenção é reorganizar a arquitetura de informação em torno de personas e tarefas, elevar o fluxo de solicitação a um padrão de e-commerce guiado, dar tratamento adequado a estados vazios, e transformar Planejamento/Orçamento em painéis gerenciais — sem introduzir backend/autenticação real, já que o projeto é um protótipo estático (HTML/CSS/JS puro, sem build, `localStorage` como "banco de dados").

**Realidade técnica confirmada na exploração do código:**
- 7 páginas HTML na raiz (MPA, sem framework/router): `index.html` (catálogo/carrinho), `acompanhe.html`, `status.html` ("Gerir Pedidos"), `contratacoes.html`, `planejamento.html`, `orcamento-geral.html`, `orcamento-setorial.html`.
- Cada página repete o mesmo bloco de header (`.header-inner` com `.actions`) — não há include/partial, então mudanças de navegação precisam ser replicadas nas 7 páginas.
- Não há autenticação real; existe apenas um seletor de usuário decorativo em `index.html` (`src/js/script.js`, array `users[]` com `{nome, matricula, setor}`).
- `src/js/pedidos.js` e `src/css/pedidos.css` são código órfão (não referenciados por nenhum HTML) — candidatos a remoção.
- Não existe biblioteca de gráficos nem estado vazio padronizado como componente.
- `docs/documento_de_visao.md` já documenta 4 personas pretendidas (Requisitante, Gestor de Tramitação, Gestor de Contratações, Gestor do Catálogo e Atas) e cita RBAC como lacuna conhecida — este PRD simplifica para 3 perfis de navegação (Solicitante, Gestor, Compras/Planejamento), compatível com essa visão.

**Decisões já validadas com o usuário:**
1. Perfis de navegação serão simulados por um **seletor de perfil no header**, persistido em `localStorage`, sem autenticação real.
2. Gráficos (Planejamento/Orçamento) usarão **Chart.js via CDN** (primeira dependência externa do projeto).
3. Este PRD cobre **todas as HUs**; a implementação será **faseada** — Fase 1 primeiro, validação do usuário, depois as fases seguintes.

---

## Épicos e Histórias de Usuário (HUs)

### Fase 1 — Fundação de Arquitetura de Informação e Navegação

**E1. Navegação por perfil**
- **HU01** — Como usuário do sistema, quero selecionar meu perfil (Solicitante / Gestor / Compras-Planejamento) em um controle no cabeçalho, para que o menu mostre apenas as opções relevantes para minha função.
  - Critérios: controle de perfil visível em todas as 7 páginas; escolha persiste em `localStorage` (`cbmdf_profile`) entre páginas; menu filtra itens por perfil conforme mapeamento da auditoria (Solicitante: Início/Nova solicitação/Meus pedidos; Gestor: Painel/Demandas da unidade/Orçamento/Aprovações; Compras/Planejamento: Demandas/Contratações/PCA/Orçamento/Indicadores); perfil default = Solicitante.
  - Técnico: novo `src/js/nav.js` compartilhado, injetado em todas as páginas; links de nav recebem `data-profiles="solicitante gestor compras"`; header replicado nas 7 páginas atualizado de forma consistente.

**E2. Diferenciação entre "Acompanhar" e "Gerir" pedidos**
- **HU02** — Como Solicitante, quero que a página de acompanhamento se chame "Meus pedidos" (em vez de "Acompanhe seu pedido"), para entender imediatamente que ali vejo o status das minhas solicitações.
  - Técnico: atualizar título/label/hero em `acompanhe.html` e todos os links de nav que apontam para ela.
- **HU03** — Como Gestor/Compras, quero que a página de gestão se chame "Gestão de demandas" (em vez de "Gerir Pedidos"), para diferenciá-la claramente da tela do solicitante.
  - Técnico: atualizar título/label/hero em `status.html` e nav.
- **HU04** — Como desenvolvedor mantendo o código, quero remover os arquivos órfãos `src/js/pedidos.js` e `src/css/pedidos.css`, para eliminar código morto que não é referenciado por nenhuma página.

**E5. Lotação em destaque + personalização**
- **HU05** — Como usuário logado (simulado), quero ver meu nome e minha lotação em destaque no cabeçalho de todas as páginas (não só na home), para ter certeza de qual contexto/unidade estou operando.
  - Critérios: bloco "Olá, {nome} · Lotação: {setor}" visível em todas as páginas quando um usuário está selecionado; ao trocar de usuário na home, a lotação exibida nas demais páginas reflete a troca (via `localStorage`).
- **HU06** — Como Solicitante, quero ver na home um bloco "Itens mais solicitados pela minha unidade" e "Últimas solicitações", para agilizar pedidos recorrentes sem precisar buscar do zero.
  - Técnico: calcular a partir de `cbmdf_orders` filtrando por `usuario.setor`.

**E10. Governança — aviso de protótipo**
- **HU07** — Como qualquer visitante do sistema, quero ver um aviso permanente e visível de que se trata de um protótipo com dados fictícios, para não confundir os dados exibidos com informações reais da corporação.
  - Critérios: faixa/banner "PROTÓTIPO — Dados fictícios para fins de demonstração" em todas as 7 páginas, com estilo discreto mas persistente (não é um dismissible que some).

---

### Fase 2 — Fluxo de Solicitação e Catálogo

**E3. Rebranding institucional**
- **HU08** — Como Solicitante, quero que a página inicial se apresente como "Central de Compras CBMDF" (em vez de "Marketplace CBMDF"), com o subtítulo "Encontre materiais e serviços e faça sua solicitação em poucos minutos", para que a linguagem seja institucional e não pareça um app de e-commerce comum.
  - Técnico: atualizar `.brand`/hero em `index.html`; manter "Marketplace" apenas como conceito interno/nome de projeto onde não for texto visível ao usuário.

**E4. Fluxo de solicitação em etapas**
- **HU09** — Como Solicitante, quero que o envio da requisição siga um fluxo guiado em etapas (Selecionar itens → Informar necessidade/justificativa → Revisar → Confirmar), em vez de um único botão "Enviar requisição" direto no catálogo, para reduzir erros de quantidade, unidade, item errado ou solicitação duplicada.
  - Critérios: botão do carrinho passa a ser "Revisar solicitação →"; nova tela/etapa de revisão lista itens, quantidades e permite adicionar justificativa antes da confirmação final; indicador de progresso (steps) visível; submissão só ocorre na etapa de confirmação.
  - Técnico: novo componente de steps em `src/css/style.css` (ou novo `src/css/steps.css`); lógica de estado de etapa em `src/js/script.js` (`submitOrder` passa a ser o passo final, não o clique único).

**E6. Catálogo inteligente**
- **HU10** — Como Solicitante, quero que cada card de produto mostre categoria, código CATMAT/CATSER, unidade de medida, valor estimado e disponibilidade, para decidir com mais segurança antes de adicionar ao pedido.
  - Técnico: enriquecer `products[]` em `src/js/script.js` com os campos novos; atualizar template de card.
- **HU11** — Como Solicitante, quero filtrar/ordenar o catálogo por "Mais solicitados", "Recentes", "Favoritos" e buscar por nome ou por código CATMAT/CATSER, além de categoria, para encontrar itens mais rápido.
  - Critérios: "Mais solicitados" calculado a partir do histórico em `cbmdf_orders`; "Favoritos" persistido em `localStorage` por usuário; busca aceita texto livre e código.

---

### Fase 3 — Empty States e Acessibilidade

**E7. Empty states orientativos**
- **HU12** — Como usuário de qualquer tela com listas (Meus pedidos, Gestão de demandas, Contratações, Orçamento setorial), quero que, ao não haver resultados, a tela mostre uma mensagem orientativa com call-to-action (ex.: "Você ainda não realizou solicitações" + botão "Nova solicitação"), em vez de apenas exibir contadores zerados, para não sentir que o sistema está quebrado ou incompleto.
  - Técnico: padronizar um componente `.empty-state` (título + descrição + CTA opcional) reutilizado em `acompanhe.js`, `status.js`, `contratacoes.js`, `planning.js`, `budget.js`, substituindo os textos genéricos atuais.

**E11. Alinhamento ao Design System de Governo (acessibilidade)**
- **HU13** — Como usuário navegando por teclado ou usando leitor de tela, quero estados de foco visíveis, contraste adequado e ordem de tabulação lógica nos componentes principais (botões, links de navegação, formulários, tabelas), para conseguir usar o sistema sem depender do mouse.
  - Critérios: `:focus-visible` com contorno visível em todos os elementos interativos; contraste mínimo AA nas cores de texto sobre fundo; revisão dos `data-profiles`/steps/empty-states novos para não quebrar leitura por leitor de tela (uso de `aria-label`/`aria-current` onde fizer sentido).
  - Nota: esta HU cobre os ajustes estruturais viáveis num protótipo estático; uma auditoria WCAG completa (mencionada no feedback como fora do escopo de leitura estrutural) não está incluída.

---

### Fase 4 — Dashboards Gerenciais

**E8. Planejamento como dashboard**
- **HU14** — Como Gestor/Compras-Planejamento, quero que a página de Planejamento abra com um resumo executivo (PCA Geral: valor total, nº de contratações, % planejado; PCA Setorial: nº de unidades e demandas; PLOA: valor solicitado) antes das tabelas detalhadas, para entender a situação geral sem precisar ler tabelas linha a linha.
  - Técnico: novo bloco de cards KPI no topo de `planejamento.html`, calculado a partir dos mesmos agregados já produzidos por `src/js/planning.js`; tabelas atuais continuam abaixo, agora como detalhe.
- **HU15** — Como Gestor/Compras-Planejamento, quero ver alertas de atenção no Planejamento (ex.: "X demandas ainda não classificadas", "Y unidades ultrapassaram o limite previsto", "% de demandas com contratação correspondente"), para agir proativamente em vez de descobrir problemas navegando pelas tabelas.
  - Técnico: novas regras derivadas de `cbmdf_orders`/`cbmdf_budget_config` em `planning.js`.

**E9. Orçamento com visão gerencial e gráfico**
- **HU16** — Como Gestor, quero ver na Visão Geral do Orçamento um gráfico "Orçamento × Planejado × Contratado × Disponível" (Chart.js via CDN), complementando os cards e a tabela por setor já existentes, para visualizar a execução orçamentária de forma mais rápida que uma tabela.
  - Técnico: incluir `<script src="chart.js via CDN">` em `orcamento-geral.html`; novo canvas/gráfico alimentado por `computeBudgetSnapshot()` (já existente em `src/js/budget.js`).

---

## Fora de escopo nesta rodada
- Autenticação/RBAC real (permanece simulado via seletor de perfil).
- Backend/API/banco de dados real (mantém `localStorage`).
- Auditoria formal WCAG completa.

## Verificação
- Como é um app estático sem build, a verificação é feita abrindo cada `.html` em navegador (`python3 -m http.server` na raiz do repo, ou abrir o arquivo diretamente) e testando manualmente: troca de perfil no header reflete no menu em todas as páginas; fluxo de solicitação completo (catálogo → steps → confirmação → aparece em Meus pedidos); empty states aparecendo corretamente ao limpar `localStorage`; dashboards de Planejamento/Orçamento renderizando com os dados semeados por `cbmdf_orders_seed.js`.
- Sem framework de testes automatizados no projeto — validação é exploratória/manual página a página, cobrindo os 3 perfis.

## Ordem de execução após aprovação
1. Apresentar este PRD para aprovação (este documento).
2. Implementar **Fase 1** (HU01–HU07).
3. Pausar para validação do usuário.
4. Seguir com Fases 2, 3 e 4 mediante confirmação a cada etapa.
