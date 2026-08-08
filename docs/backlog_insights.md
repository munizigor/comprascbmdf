# Backlog de Insights — Candidatas a História de Usuário

> **Origem:** triagem de anotações de trabalho (bloco de notas / Google Tasks),
> filtradas pelas que têm aderência ao produto. São **candidatas** — ainda
> pendentes do crivo "vira US ou não" e de priorização. Redigidas no formato das
> HUs do [Documento de Visão](documento_de_visao.md) para facilitar a promoção a
> backlog oficial.

| # | Insight | Épico relacionado | Estado |
| :-- | :--- | :--- | :--- |
| 1 | Alerta de ARP próxima do vencimento | 05 — Atas | Candidata |
| 2 | Custeio via ARP com cronograma de desembolso mensal | 04/05 | Candidata |
| 3 | KPI de aging: empenho sem liquidação | 04 — Financeiro | Candidata |
| 4 | Planejamento de despesas continuadas (GNDs recorrentes) | 04 — Financeiro | Candidata |
| 5 | Projeção orçamentária por Grupo de Natureza de Despesa (GND) | 04 — PLOA | Candidata |
| 6 | Indicadores de vínculo ao planejamento estratégico | 04/Indicadores | Candidata |
| 7 | Dimensão "fonte de recurso / fundo" no modelo de dados | Transversal | Candidata (estrutural) |

---

## Insight 1 — Alerta de ARP próxima do vencimento

* **Origem (anotação):** "Startar demanda mobiliário — Atas vencendo."
* **Como:** Gestor do Catálogo e Atas / Gestor de Contratações
* **Eu quero:** Ser alertado quando uma Ata de Registro de Preços se aproximar do fim da vigência (e ao esgotar saldo)
* **Para que:** Eu inicie a demanda de reposição **antes** de a ata vencer, evitando ruptura de fornecimento e contratação emergencial.
* **Critérios de aceite (preliminares):**
  * Cada ARP exibe dias restantes de vigência e saldo disponível.
  * O sistema sinaliza atas a vencer dentro de uma janela configurável (ex.: 90/60/30 dias).
  * A partir do alerta, é possível abrir uma nova demanda já pré-vinculada à classe/itens da ata.
* **Observações:** depende do Épico 05 (cadastro/vigência/saldo de ARP).

---

## Insight 2 — Custeio via ARP com cronograma de desembolso mensal

* **Origem (anotação):** "Perguntar pro Kleber se podemos seguir com todos os Custeios como ARP. Sobrando dinheiro vamos executando. Ideal seria liquidarmos o duodécimo e ir empenhando um pouco acima ao mês."
* **Como:** Planejamento/Orçamento
* **Eu quero:** Planejar as despesas de custeio como ARPs e acompanhar um cronograma de desembolso mensal ancorado no duodécimo
* **Para que:** A execução seja distribuída ao longo do ano (empenho um pouco acima do duodécimo/mês), aproveitando saldo disponível sem estourar o teto.
* **Critérios de aceite (preliminares):**
  * É possível marcar contratações de custeio como "executáveis via ARP".
  * O painel financeiro mostra o previsto mensal (duodécimo) × empenhado × liquidado × pago.
  * Alerta quando o ritmo mensal de empenho diverge do planejado (acima/abaixo).
* **Observações:** é a materialização da "gestão financeira ativa" (HU04.3) combinada ao Épico 05; decisão de negócio a validar com o Planejamento antes de virar requisito.

---

## Insight 3 — KPI de aging: empenho sem liquidação

* **Origem (anotação):** "Aferir há quantos dias a despesa empenhada não tem liquidação."
* **Como:** Planejamento/Diretoria
* **Eu quero:** Ver há quantos dias cada despesa empenhada está sem liquidação, e a distribuição desse tempo por setor/natureza
* **Para que:** Eu identifique empenhos "parados" e atue antes que virem restos a pagar ou devolução de recurso.
* **Critérios de aceite (preliminares):**
  * Indicador de dias médios entre "Nota de Empenho Emitida" e "Liquidado".
  * Lista de empenhos acima de um limite de dias (ex.: > 60 dias sem liquidar).
  * Recorte por setor e por natureza de despesa.
* **Observações:** novo KPI para `indicadores.html`; a data-fonte é o `historico[]` do pedido (já existe a trilha de status).

---

## Insight 4 — Planejamento de despesas continuadas (GNDs recorrentes)

* **Origem (anotação):** "Definir GNDs contínuas (Água, Luz, Combustível, pneu etc)."
* **Como:** Planejamento/Orçamento
* **Eu quero:** Cadastrar e planejar despesas continuadas recorrentes (água, luz, combustível, pneu etc.) com projeção anual
* **Para que:** O PCA/PLOA já contemple o gasto recorrente sem depender de o setor lembrar de requisitar item a item.
* **Critérios de aceite (preliminares):**
  * Marcação de itens/classes como despesa continuada (reaproveita o campo `servicoContinuado` do DFD).
  * Projeção anual estimada a partir do histórico/consumo médio.
  * Esses itens entram automaticamente na consolidação do PCA/PLOA do exercício.
* **Observações:** conecta-se ao Épico 06 (sugestões de reposição por histórico), mas funciona por regra determinística.

---

## Insight 5 — Projeção orçamentária por Grupo de Natureza de Despesa (GND)

* **Origem (anotação):** "Projeção de GNDs pelo relatório completo."
* **Como:** Planejamento/Diretoria
* **Eu quero:** Visualizar a projeção orçamentária agregada por Grupo de Natureza de Despesa (GND), a partir do relatório completo de pedidos
* **Para que:** Eu tenha a visão do PLOA no formato de GND exigido pelo processo orçamentário.
* **Critérios de aceite (preliminares):**
  * Relatório PLOA agrega valores por GND, além da natureza de despesa detalhada.
  * Colunas Planejado/Comprometido/Empenhado/Liquidado/Pago/Saldo por GND.
  * Exportável (CSV) junto ao relatório atual.
* **Observações:** extensão do relatório existente (`planning.js` / HU04.2).

---

## Insight 6 — Indicadores de vínculo ao planejamento estratégico

* **Origem (anotação):** "Inserir indicadores de planejamento estratégico no projeto."
* **Como:** Direção / Planejamento
* **Eu quero:** Medir quanto das contratações está vinculado a objetivos/metas do planejamento estratégico
* **Para que:** A Direção enxergue o alinhamento entre o que se compra e a estratégia institucional.
* **Critérios de aceite (preliminares):**
  * O painel de indicadores mostra % (e valor) de demandas com `vinculoPlanejamento` preenchido.
  * Recorte por objetivo/meta estratégica e por setor.
  * Demandas sem vínculo declarado são sinalizadas.
* **Observações:** o campo `vinculoPlanejamento` já é capturado no DFD, mas ainda não é usado nos indicadores — este insight fecha o laço.

---

## Insight 7 — Dimensão "fonte de recurso / fundo" no modelo de dados *(estrutural)*

* **Origem (anotações):** menções recorrentes a **FUSP** (SEI 11730/2026-05), **FISP** (aeronave, obras) e ao **duodécimo**.
* **Como:** Planejamento/Orçamento
* **Eu quero:** Registrar a fonte de recurso/fundo de cada demanda (ex.: FUSP, FISP, duodécimo/tesouro, emenda)
* **Para que:** Os relatórios PCA/PLOA e o acompanhamento financeiro reflitam a origem do recurso, não só a natureza da despesa.
* **Critérios de aceite (preliminares):**
  * O item/pedido passa a ter um campo "fonte de recurso/fundo".
  * PCA/PLOA e o painel financeiro permitem recorte e subtotais por fonte/fundo.
  * Alertas de teto/saldo passam a considerar a fonte, quando aplicável.
* **Observações:** é o insight **estrutural** — hoje o modelo tem `tipoDespesa` e `naturezaDespesa`, mas **não** tem fonte/fundo. Habilita de uma vez o rastreio de FUSP/FISP/duodécimo. Requer avaliação de impacto no esquema de dados e nas integrações (SIAFI).

---

## Fora deste backlog (registrado para contexto)

Anotações identificadas como de **outros projetos ou administrativas**, sem
impacto no produto: motor/requisitos de deduplicação e comparação de ocorrências
(projeto de ocorrências de segurança pública), Hermes/BID, itens acadêmicos
(mestrado/SINESP, Lattes, CEOE), agenda pessoal e tarefas administrativas
diversas. A parte de **folha de pagamento (SIAPE)** citada junto ao SIAFI está
**fora do escopo** desta solução — o produto planeja e governa contratações, não
executa folha; apenas o acesso ao DW do SIAFI é pertinente às integrações.
