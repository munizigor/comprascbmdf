# Contribuições das anotações da SELOF para o produto

Avaliação de duas coletâneas de anotações da área de Planejamento/Logística (SELOF) sobre gestão
orçamentária, financeira e logística do CBMDF, com o recorte do que **pode contribuir para este
protótipo** (a Central de Compras). Não é uma transcrição: é uma **curadoria** — o que já está
coberto, o que são oportunidades de evolução e o que pertence ao ecossistema maior (fora do escopo
do protótipo).

> Fontes: `Anotações` (brainstorm) e `SELOF/Indicadores` (catálogo de indicadores + "Projeto Gestão
> Integrada de Recursos do CBMDF"). Links internos de trabalho (rascunhos em ferramentas de IA,
> planilhas, contatos) foram omitidos por não pertencerem à documentação do produto; as referências
> públicas estão na seção final.
>
> A triagem complementar, feita a partir das **atribuições regimentais** da SELOF (Arts. 59, 61 e 69
> do Regimento Interno), está em
> [atribuicoes_selof_implementacoes_futuras.md](atribuicoes_selof_implementacoes_futuras.md).

## Panorama das anotações

- **Problema-raiz declarado:** *"Hoje quem chega primeiro leva o orçamento."* A proposta é monitorar
  o **ciclo de vida dos recursos** — orçamento, finanças e logística como partes de um todo — e não
  só "receber mais", mas "gastar melhor".
- É exatamente o problema que este protótipo ataca: dar **baseline, priorização e rastreabilidade**
  às demandas, em vez de atendê-las por ordem de chegada.
- O material vai muito além do protótipo (integração com SIAFI/SIGGO/PNCP/SEI, BI, automações,
  política institucional, indicadores de pessoal/GSV/diárias). Aqui filtramos o que é **acionável no
  produto**.

## 1. Conexões diretas com o que o protótipo já faz

As anotações validam decisões que já tomamos:

| Anotação | Já entregue no protótipo |
|---|---|
| "Flexibilidade por **classe** no Compras.gov e **granularidade por item** internamente" | Item de PCA por (exercício × classe CATMAT) com itens por baixo — Etapa 3 |
| Cadeia **Comprometido → Empenhado → Liquidado → Pago** | Pipeline de status + flags de orçamento (`getStatusFlags`) |
| **Segregação de funções** (solicita/aprova/executa) | Gates de aprovação com aprovador ≠ autor — Etapa 2 |
| **Comprometimento/execução** acompanhados por status | Telas de Orçamento (comprometido/empenhado/liquidado/pago) |
| Usar **inventário/patrimônio** para o que a unidade tem × precisa | Matriz de Dotação (prevista × atual × lacuna) — PR #11 |
| **Motivação explícita** de cada decisão | Trilha de auditoria (`historico`) com justificativa/autor |
| **Publicação/transparência** (PNCP) | Publicação no PNCP derivada da trilha — Etapa 4 |
| Responsável = **pessoa**, não órgão | Pedido vinculado a usuário (id/matrícula/setor) |

## 2. Oportunidades de evolução do protótipo (derivadas das anotações)

Cada item traz a ideia, o que agrega e a âncora no protótipo.

### 2.1 Classificação semafórica da demanda (Verde / Amarelo / Vermelho)
- **Ideia (anotação):** Verde = dentro do PLOA; Amarelo = até ~25% além do PLOA → caminho de **ARP**;
  Vermelho = **banco de demanda** (Rol de Demandas). "Todos podem pedir — mas no Rol de Demandas, não
  no PCA."
- **Agrega:** um triânio claro de tratamento por disponibilidade orçamentária, evitando inflar o PCA.
- **Âncora:** combina Matriz de Dotação (lacuna) + orçamento setorial + status; o "banco de demanda"
  já existe em espírito nos pendentes/`Arquivado`.

### 2.2 Demanda reprimida → próximo PCA
- **Ideia:** registrar o que **não** foi atendido por falta de previsão e levar ao próximo exercício;
  indicadores "% de demandas não atendidas por falta de previsão" e "nº de pedidos barrados".
- **Agrega:** fecha o ciclo do planejamento anual e justifica reforço orçamentário.
- **Âncora:** exercício do PCA (Etapa 5) + status `Arquivado`/pendentes → marcar "reprimida" e
  recolocar no exercício seguinte.

### 2.3 Dotação com estado e essencialidade do bem
- **Ideia:** "Se o bem está em ótimo estado, precisa trocar? É essencial ou supérfluo?" Usar o estado
  do patrimônio, não só a contagem.
- **Agrega:** qualifica a lacuna da dotação (repor o essencial/deteriorado antes do supérfluo/novo).
- **Âncora:** estende a Matriz de Dotação (hoje só quantidade prevista × atual) com **condição** e
  **essencialidade** por item; conecta ao critério de priorização.

### 2.4 Fonte de recurso como dimensão
- **Ideia:** coluna **Fonte** no PCA (emendas federais/distritais, **FCDF**, TransfereGov, FUSP,
  convênios, créditos adicionais/extraordinários); monitorar vencimento de emendas e restos a pagar.
- **Agrega:** rastreabilidade de origem do recurso — decisão comum em órgão público.
- **Âncora:** nova dimensão em Planejamento/Orçamento, ao lado de exercício e natureza de despesa.

### 2.5 Limites orçamentários por classe e por unidade
- **Ideia:** "Limite orçamentário por **CSO** e por **Classe de Material**"; ao abrir processo, o
  solicitante **declara saldo** (ou que a despesa cabe no saldo).
- **Agrega:** guarda-corpo que impede pedir além do teto — reforça o baseline.
- **Âncora:** estende o orçamento setorial (`budget.js`) com teto por classe e um gate de "declaração
  de saldo" no fluxo do pedido.

### 2.6 Prazos, lead time e planejamento retroativo
- **Ideia:** incluir **data estimada de entrega** e derivar marcos retroativos (se entrega = X, o
  processo inicia em X−180, o TR em X−110…); indicadores de **tempo** por etapa (Comprometimento→
  Empenho→Liquidação→Pagamento) com metas (ex.: ≤ 7 dias úteis; pagamento nunca > 30 dias corridos).
- **Agrega:** transforma o SLA por etapa (já existente) em **cronograma para trás** e cobrança de prazo.
- **Âncora:** o app já tem `dataPretendida` (DFD) e SLA por macro-etapa — falta o cálculo retroativo
  e os indicadores de tempo entre marcos.

### 2.7 Catálogo de indicadores para a tela de Indicadores
As anotações trazem um catálogo pronto (objetivo + fórmula + unidade + meta) diretamente aplicável a
`indicadores.html`:
- **Execução:** índice de execução da despesa (empenhada/liquidada ÷ dotação), quociente de execução.
- **Logísticos:** nível de atendimento de requisições, **índice de ruptura de estoque**, giro de
  estoque, valor do estoque, **% de compras emergenciais**, % de não conformidade de entregas.
- **Tempo:** prazos médios Empenho→Liquidação→Pagamento e **% de pagamentos dentro do prazo**.
- **Estratégicos:** preservação orçamentária **PLOA × LOA** (quanto da proposta sobreviveu), grau de
  cumprimento de metas do **PLANES**.
- **Custo/eficiência:** custo por ocorrência, por militar, por habitante (para prestação de contas).
- **Risco/conformidade:** % de processos com apontamento de auditoria, itens **pagos e não entregues**.

> **Absorvido e formalizado.** Este catálogo de fórmulas foi consolidado em
> [catalogo_indicadores_okr.md](catalogo_indicadores_okr.md), que acrescenta a cada indicador o que
> faltava aqui — origem normativa, linha de base, prazo, responsável e **estado de calculabilidade**
> contra o dado que o sistema já coleta — e o organiza junto aos indicadores do PLANES, do PPA e das
> matrizes do TCU. Os itens estratégicos desta lista (PLOA × LOA e cumprimento de metas do PLANES)
> viraram os KR1.4 e KR8.3; os de tempo, o KR6.3; os logísticos, o KR7.4.

### 2.8 Alertas e gestão por exceção
- **Ideia:** níveis de alerta (amarelo/vermelho) para saldo crítico, demora no empenho/pagamento,
  execução acima da distribuição **duodecimal**, previsão estourando o teto em > 30%, comprometimentos
  não atualizados, obras paradas há X dias, itens pagos e não entregues.
- **Agrega:** "gestão por exceção" — o sistema chama a atenção só quando algo foge do esperado.
- **Âncora:** o protótipo já tem alertas em Planejamento e pílulas de SLA; dá para generalizar num
  motor de alertas por limiar.

### 2.9 ARP (Ata de Registro de Preços) e banco de demanda
- **Ideia:** demandas fora do teto viram **ARP**; consultar **saldo de ARP**; compras do PCA do ano
  seguinte já podem caminhar para ARP.
- **Agrega:** um segundo trilho de contratação além do PCA do exercício.
- **Âncora:** hoje o pipeline termina o planejamento no PCA; ARP seria um ramo/entidade nova.

### 2.10 Predição orçamentária e de demanda
- **Ideia:** série temporal de execução (5 anos), projeção com métodos estatísticos (Prophet / *Think
  Stats*) para antecipar picos e execução.
- **Agrega:** planejamento preditivo em vez de reativo.
- **Âncora:** conceitual no protótipo (dados fictícios), mas encaixa nos Indicadores como visão futura.

## 3. Fora do escopo do protótipo (ecossistema / programa maior)

Relevantes como **contexto e roadmap institucional**, mas não são o protótipo:
- **Integração com sistemas de verdade:** SIAFI, SIGGO, SigmaNet, SISGEPAT, SISMAT (cautela de EPI),
  SEI, PNCP/PGC, Compras.gov, SICAF, Contrata+, ETP Digital, SIOP/SIASG, Tesouro Gerencial.
- **Coleta automatizada e BI:** Apps Script, **n8n**, sincronização de painéis, APIs de andamento do SEI.
- **Política institucional:** publicação da Política Orçamentária, Financeira e Logística do CBMDF
  (harmonizando PARF, PCA e demais portarias) — governança, não sistema.
- **Indicadores de pessoal/GSV/diárias e patrimônio** detalhados (folha, inativos, suprimento de
  fundos, TGRL, inventário) — pertencem ao programa SELOF, não à Central de Compras.

## 4. Backlog candidato (aderência ao protótipo × esforço)

| Oportunidade | Aderência | Esforço | Observação |
|---|---|---|---|
| Classificação Verde/Amarelo/Vermelho da demanda | Alta | Médio | Usa dotação + orçamento + status |
| Demanda reprimida → próximo PCA | Alta | Baixo/Médio | Usa exercício + `Arquivado`/pendentes |
| Estado/essencialidade na Matriz de Dotação | Alta | Baixo | Estende o objeto de dotação |
| Indicadores do catálogo SELOF em `indicadores.html` | Alta | Médio | Fórmulas prontas — consolidadas em [catalogo_indicadores_okr.md](catalogo_indicadores_okr.md); a onda 1 é só cálculo sobre dado existente |
| Prazos retroativos + indicadores de tempo | Média/Alta | Médio | Estende SLA e `dataPretendida` |
| Fonte de recurso como dimensão | Média | Médio | Nova coluna em PCA/PLOA |
| Limite por classe/CSO + declaração de saldo | Média | Médio/Alto | Estende `budget.js` + gate no pedido |
| Motor de alertas por limiar (gestão por exceção) | Média | Médio | Generaliza alertas atuais |
| ARP / banco de demanda | Média | Alto | Novo trilho de contratação |
| Predição (série temporal) | Baixa (protótipo) | Alto | Melhor como visão futura |

**Recomendação de entrada:** os três primeiros (classificação semafórica, demanda reprimida, estado
na dotação) têm alta aderência e baixo/médio esforço, reaproveitam o que já existe e reforçam
diretamente o baseline — bons candidatos ao próximo incremento.

## 5. Glossário (como aparece nas anotações)

- **PCA / PLOA / LOA / LDO / PPA** — instrumentos de planejamento e orçamento (anual/plurianual).
- **PNCP** — Portal Nacional de Contratações Públicas (publicação/transparência).
- **DFD / ETP / TR** — Documento de Formalização da Demanda / Estudo Técnico Preliminar / Termo de Referência.
- **ARP** — Ata de Registro de Preços.
- **FCDF** — Fundo Constitucional do DF (fonte de recurso das forças do DF).
- **PARF** — plano tratado nas anotações como uma **"LOA interna"** do CBMDF.
- **CSO** — unidade que gera/controla demanda no fluxo interno e assina o TR (conforme as anotações).
- **EMG / PM6** — instâncias que disciplinam o planejamento e avalizam remanejamentos/ARP.
- **GSV** — Gratificação por Serviço Voluntário.
- **PLANES** — Planejamento Estratégico do CBMDF (ciclo 2025–2030).
- **Restos a Pagar (RAP)** — despesas empenhadas e não pagas no exercício.
- **Sistemas internos citados:** INOVA, Grifo, GSVWeb, SISGEPAT, SigmaNet, SISMAT.

## 6. Referências públicas citadas

- Decreto DF 39.736/2019 — <https://www.sinj.df.gov.br/sinj/Norma/5961832d2d6948a38fd8168088a7ed5b/Decreto_39736_28_03_2019.html>
- Planejamento Estratégico do CBMDF (ciclo 2025–2030) — <https://www.cbm.df.gov.br/lai/download/planejamento-estrategico-do-cbmdf-ciclo-2025-2030/>
- Relatório de Gestão CBMDF 2024 (TCU) — <https://www.cbm.df.gov.br/lai/wp-content/uploads/2025/01/RELATORIO-DE-GESTAO-CBMDF-2024-TCU-VERSAO-7.pdf>
- IESGO / TCU (Índice de Governança) — <https://iesgo.tcu.gov.br/>
- "SICX e o mundo novo da Lei 14.133/2021" (JOTA) — <https://www.jota.info/opiniao-e-analise/artigos/sicx-e-o-mundo-novo-da-lei-14-133-2021>

---

*Este documento é uma leitura orientada ao produto; a visão institucional completa (Projeto Gestão
Integrada de Recursos / SELOF) é mais ampla e serve de norte de longo prazo.*
