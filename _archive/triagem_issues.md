# Triagem das Issues do GitHub — Backlog ou Descarte

> Avaliação das **18 issues abertas** do repositório (#15–#31, #35) contra os critérios do
> produto: a fronteira "planejar e governar × executar"
> ([Análise de Escopo — ERP](analise_escopo_erp.md)), o critério de admissão da
> [Auditoria de Coerência](auditoria_coerencia_prototipo.md) (jornada + evidência) e a
> [pesquisa com 20 servidores](pesquisa_servidores_2026.md). O resultado foi **executado**:
> as HUs aprovadas entraram no [Documento de Visão](documento_de_visao.md) e todas as issues
> foram comentadas e fechadas — **o backlog oficial do produto é o Documento de Visão**, não a
> lista de issues.

- **Data da triagem:** 11/08/2026, sobre as 18 issues abertas em `munizigor/comprascbmdf`.
- **Decisão do usuário:** comentar + fechar no GitHub e incorporar as aprovadas como HUs
  (registrada nesta conversa de evolução).

---

## 1. Método — quatro filtros, na ordem

1. **Fronteira do produto** — a demanda é de *planejamento/governança* (nosso domínio) ou de
   *execução* (Grifo/SISGEPAT/SIAFI)? Fora da fronteira → descarte com motivo.
2. **Duplicidade** — as issues #22–#28 e #31 registram as mesmas ideias dos "Insights" #15–#21
   em forma bruta. A duplicata fecha apontando a canônica; **refinamentos que só existem na
   duplicata são absorvidos pela HU** (nada se perde).
3. **Natureza** — é requisito de software ou **decisão institucional** que precisa ser tomada
   pelo Comitê/Direção *antes* de virar código? (Mesmo padrão da lacuna G da pesquisa: "tornar
   visível é função do software; decidir é função do Comitê".)
4. **Critério de admissão** (auditoria §1.1) — com jornada e evidência declaradas, a ideia vira
   HU no Documento de Visão. Nenhuma issue entrou para o protótipo: todas são evolução de
   produção, coerente com a poda em curso.

### Mapa de duplicidade

| Duplicata | Canônica | Refinamento absorvido pela HU |
| :--- | :--- | :--- |
| [#27](https://github.com/munizigor/comprascbmdf/issues/27) | [#19](https://github.com/munizigor/comprascbmdf/issues/19) | Janela **móvel de 12 meses**, independente do exercício financeiro |
| [#28](https://github.com/munizigor/comprascbmdf/issues/28) | [#18](https://github.com/munizigor/comprascbmdf/issues/18) | Exemplos de classes contínuas (água, luz, combustível, pneu) |
| [#25](https://github.com/munizigor/comprascbmdf/issues/25) | [#20](https://github.com/munizigor/comprascbmdf/issues/20) | Vínculo também aos indicadores do **PPA/LOA**, além do planejamento estratégico |
| [#26](https://github.com/munizigor/comprascbmdf/issues/26) | [#21](https://github.com/munizigor/comprascbmdf/issues/21) | Produto vinculado a **indicador de fundo** para justificar compra com FUSP (virou HU própria no Épico 10) |
| [#31](https://github.com/munizigor/comprascbmdf/issues/31) | [#21](https://github.com/munizigor/comprascbmdf/issues/21) | **Emendas e convênios** como fontes, além de fundos |

---

## 2. A tabela de triagem

Vereditos: **BACKLOG** (virou HU/épico/RNF no Documento de Visão) · **DUPLICADA** (fechada
apontando a canônica) · **DECISÃO INSTITUCIONAL** (não é software ainda; pendência do Comitê,
§3) · **DESMEMBRADA** (cada parte com seu veredito).

| Issue | Resumo | Fronteira | Evidência | Veredito | Destino |
| :--- | :--- | :--- | :--- | :--- | :--- |
| [#15](https://github.com/munizigor/comprascbmdf/issues/15) | Alerta de ARP próxima do vencimento | Dentro (planejar reposição) | CR5 — evitar emergencial; origem "atas vencendo" | **BACKLOG** | **HU05.3** |
| [#16](https://github.com/munizigor/comprascbmdf/issues/16) | Custeio via ARP com desembolso mensal pelo duodécimo | Dentro (planejamento financeiro; execução segue no SIAFI) | Lacuna A (75% — indefinição de recursos) | **BACKLOG** (com pré-condição de negócio) | **HU04.4** |
| [#17](https://github.com/munizigor/comprascbmdf/issues/17) | KPI de aging: dias entre empenho e liquidação | Dentro (indicador sobre a trilha) | Dado já existe no `historico[]`; KPIs §8 | **BACKLOG** | **HU04.5** |
| [#18](https://github.com/munizigor/comprascbmdf/issues/18) | Planejamento de despesas continuadas recorrentes | Dentro | CR1, CR5; lacuna D (maior gap temático) | **BACKLOG** (canônica) | **HU04.6** |
| [#19](https://github.com/munizigor/comprascbmdf/issues/19) | Projeção orçamentária por GND | Dentro | CR3; formato exigido pelo processo orçamentário | **BACKLOG** (canônica) | **HU04.7** |
| [#20](https://github.com/munizigor/comprascbmdf/issues/20) | Indicador de vínculo ao planejamento estratégico | Dentro | Campo `vinculoPlanejamento` já capturado no DFD — fecha o laço | **BACKLOG** (canônica) | **HU04.8** |
| [#21](https://github.com/munizigor/comprascbmdf/issues/21) | Dimensão "fonte de recurso / fundo" no modelo (estrutural) | Dentro | Lacuna A; FUSP/FISP/duodécimo recorrentes nas anotações | **BACKLOG** (canônica; épico novo) | **ÉPICO 10** (HU10.1) |
| [#22](https://github.com/munizigor/comprascbmdf/issues/22) | Reserva de contingência no planejamento do PCA | Dentro | Lacuna A; boas práticas orçamentárias | **BACKLOG** | **HU04.9** |
| [#23](https://github.com/munizigor/comprascbmdf/issues/23) | Definir matriz operacional × administrativa | — (não é software) | É a **lacuna G** da pesquisa (área-fim × área-meio) | **DECISÃO INSTITUCIONAL** | §3 (P1) |
| [#24](https://github.com/munizigor/comprascbmdf/issues/24) | % para suprimento de fundos e reserva de contingência por setorial | — (percentuais são política) | Lacuna A | **DECISÃO INSTITUCIONAL** (parte estrutural absorvida pela HU04.9) | §3 (P2) |
| [#25](https://github.com/munizigor/comprascbmdf/issues/25) | Contratação vinculada a indicadores do PPA/LOA/estratégia | — | — | **DUPLICADA** de #20 | refinamento na HU04.8 |
| [#26](https://github.com/munizigor/comprascbmdf/issues/26) | Produto vinculado a indicador de fundo (FUSP) | — | — | **DUPLICADA** de #21 | **HU10.2** |
| [#27](https://github.com/munizigor/comprascbmdf/issues/27) | Projeção 12 meses por GND e classe, independente de exercício | — | — | **DUPLICADA** de #19 | refinamento na HU04.7 |
| [#28](https://github.com/munizigor/comprascbmdf/issues/28) | Definir GNDs/classes de gastos contínuos | — | — | **DUPLICADA** de #18 | refinamento na HU04.6 |
| [#29](https://github.com/munizigor/comprascbmdf/issues/29) | Débito técnico: CATMAT/CATSER na base de inventário externa | Fronteira: a base é do Grifo/SISGEPAT — mas é **pré-requisito** da nossa integração | HU09.3 (carga atual via inventário) depende disso | **BACKLOG** (como dependência externa / RNF) | **§6.3 (RNF)** |
| [#30](https://github.com/munizigor/comprascbmdf/issues/30) | Solicitações do SubCmt Geral (5 itens) | mista | — | **DESMEMBRADA** (ver §2.1) | ver §2.1 |
| [#31](https://github.com/munizigor/comprascbmdf/issues/31) | Monitorar orçamento por Fundos, Emendas e Convênios | — | — | **DUPLICADA** de #21 | refinamento na HU10.1 |
| [#35](https://github.com/munizigor/comprascbmdf/issues/35) | Consumir dados do PNCP; 2026 sem input manual (compras realizadas + PCA pendente) | Dentro (estratégia de adoção/carga inicial) | Realidade de adoção: KPI 5 e o "frio de partida" da base | **BACKLOG** (épico novo) | **ÉPICO 11** (HU11.1) |

### 2.1 Desmembramento da #30 (Solicitações do SubCmt Geral)

| Item da issue | Veredito | Destino / motivo |
| :--- | :--- | :--- |
| Custeio continuado no PARF | **BACKLOG** (absorvido) | HU04.6 (despesas continuadas) |
| Incluir custeio para operações | **DECISÃO INSTITUCIONAL** (depende da matriz operacional × administrativa) | §3 (P1) + refinamento futuro da HU04.3 (cotas por finalidade) |
| Cota DIREP para diárias e passagens; separar diárias por curso/operação/representação | **BACKLOG** (refinamento com ressalva) | Refinamento da **HU04.3** (limites por setor **e por natureza/finalidade**). Ressalva de fronteira: diárias/passagens não são contratações — entram apenas como **cota financeira**, nunca como pedido no fluxo de compras. |
| Criar CSOs (máximo 5) e subportfólios | **DECISÃO INSTITUCIONAL** (estrutura de portfólio é definição organizacional) | §3 (P3); candidata estrutural futura após a definição |

---

## 3. Decisões institucionais pendentes (insumos para o Comitê)

Estas pendências **não viram requisito** até serem decididas — o software as materializa depois.
Registradas também na §7.3 do [Documento de Visão](documento_de_visao.md):

- **P1 — Matriz operacional × administrativa** (#23, parte da #30): definir o eixo área-fim ×
  área-meio (e se área-meio tem cota protegida) — exatamente a lacuna G da pesquisa. Quando
  decidido, pode virar critério/eixo no score do Épico 08.
- **P2 — Percentuais de suprimento de fundos e reserva de contingência por setorial** (#24):
  os *campos* estão previstos na HU04.9; os *percentuais* são política orçamentária do
  Comitê/EMG.
- **P3 — CSOs (máx. 5) e subportfólios** (#30): definição organizacional de portfólio de
  contratações; depois de definida, candidata a dimensão estrutural (agrupamento das
  contratações por CSO).

---

## 4. Resumo quantitativo

| Veredito | Issues | Qtd |
| :--- | :--- | :--- |
| BACKLOG → HU/épico/RNF no Documento de Visão | #15 #16 #17 #18 #19 #20 #21 #22 #29 #35 | 10 |
| DUPLICADA (refinamentos absorvidos) | #25 #26 #27 #28 #31 | 5 |
| DECISÃO INSTITUCIONAL | #23 #24 | 2 |
| DESMEMBRADA | #30 | 1 |
| **Total triado** | | **18** |

**Nenhuma issue foi perdida e nenhuma entrou para o protótipo** — todas as aprovadas são
evolução de produção, coerente com a poda proposta na
[Auditoria de Coerência](auditoria_coerencia_prototipo.md). O que entrou no Documento de Visão:
HU04.4–HU04.9, HU05.3, Épico 10 (HU10.1–10.2), Épico 11 (HU11.1), RNF de dependência externa
(§6.3) e a seção §7.3 de decisões pendentes.

---

## 5. Relação com os demais documentos

- [Documento de Visão](documento_de_visao.md) — destino das HUs; **backlog oficial do produto**.
- [Auditoria de Coerência](auditoria_coerencia_prototipo.md) — fonte do critério de admissão
  (jornada + evidência) usado no filtro 4.
- [Análise de Escopo — ERP](analise_escopo_erp.md) — fonte da fronteira usada no filtro 1.
- [Pesquisa com Servidores](pesquisa_servidores_2026.md) — evidências (lacunas A–H) e o padrão
  "decisão do Comitê antes de virar código" (lacuna G).
- [Registro de Evolução](registro_de_evolucao.md) — entrada cronológica desta triagem.
