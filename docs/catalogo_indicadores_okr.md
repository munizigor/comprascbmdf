# Catálogo Institucional de Indicadores e OKRs

> Este documento define **quais indicadores institucionais o CBMDF Marketplace se propõe a monitorar**,
> de onde cada um vem, como é calculado e o que ainda falta para calculá-lo. É o desdobramento da
> §8.4 e do **Épico 10** do [Documento de Visão](documento_de_visao.md) — que permanece a fonte
> oficial de escopo. Absorve e formaliza o catálogo de fórmulas da §2.7 de
> [contribuicoes_anotacoes_selof.md](contribuicoes_anotacoes_selof.md), apoia-se no mapa de práticas
> de [tcu_matrizes_relevancia_para_o_produto.md](tcu_matrizes_relevancia_para_o_produto.md) e
> materializa o item **F6** de [atribuicoes_selof_implementacoes_futuras.md](atribuicoes_selof_implementacoes_futuras.md).
>
> **Tudo neste documento é implementação futura.** Nenhum dos OKRs abaixo está implementado no
> protótipo, com exceção dos que o próprio produto já mede e que aqui aparecem apenas referenciados.

---

## 1. Propósito

Os cinco KPIs da §8 do Documento de Visão medem **o sucesso deste produto** — se o ciclo ficou mais
rápido, se a exceção foi contida, se as unidades adotaram a plataforma. São indicadores voltados para
dentro.

Existe um segundo conjunto, voltado para fora: os indicadores que a **instituição precisa cumprir**
independentemente deste produto — as metas do **PLANES 2025-2030**, a execução do **PPA/LOA**, e as
práticas de governança auditadas pelo **TCU**. O CBMDF é cobrado por eles hoje, e a maior parte do
dado que os alimenta nasce exatamente no ciclo de contratações que este produto orquestra.

Este catálogo liga os dois. Cada indicador institucional recebe uma ficha que declara sua origem
normativa, sua fórmula, sua meta, sua fonte de dado — e, sobretudo, **se o sistema consegue calculá-lo
hoje, e o que falta quando não consegue**. O objetivo não é publicar números: é tornar visível a
distância entre o que a instituição precisa medir e o que o dado coletado já permite medir.

---

## 2. Lista fechada — e por que isso não a congela

A §8 do Documento de Visão fixa a doutrina: *"um indicador só é cobrável quando tem linha de base,
meta numérica, prazo e fonte do dado"*. Um indicador digitado livremente por um usuário na interface
não atende a nenhum dos quatro. Não tem origem normativa, não tem responsável, não tem série
comparável entre ciclos e não serve como evidência perante o controle externo — vira número solto num
painel, exatamente o que a §8 se propôs a eliminar.

Por isso o catálogo é **fechado na interface**: a tela de Indicadores oferece **filtrar, ativar e
desativar** — nunca **criar**.

Fechado não significa congelado. O catálogo nasce com as fontes conhecidas hoje e existe justamente
para **receber os indicadores que a instituição vier a precisar depois**: o ciclo do PLANES que
suceder 2030, cada novo PPA, determinações de órgãos de controle, novos normativos internos, pedidos
do Comando. Ele cresce por um caminho definido — a **curadoria** da §7 — e cada entrada tem **ciclo de
vida próprio** (§4), porque as fontes que o alimentam mudam de quadriênio em quadriênio.

A regra em uma frase: **a interface é fechada, o catálogo é extensível, e a extensão passa por rito.**

---

## 3. Estrutura OKR adotada

| Elemento | O que é | De onde vem |
| :--- | :--- | :--- |
| **Objetivo (O)** | O resultado institucional pretendido, em linguagem de intenção — não é medido diretamente | Herdado de um Objetivo Estratégico do PLANES, de uma prática do TCU ou de um propósito declarado do produto |
| **Resultado-Chave (KR)** | O indicador com **meta numérica, prazo e fonte** que evidencia o avanço do objetivo | Um indicador oficial (IND. do PLANES, prática do TCU) ou um KPI do próprio produto |

O PLANES já opera nessa estrutura em tudo menos no nome: cada Objetivo Estratégico traz um *"Indicador
do Objetivo"* e um conjunto de *"Indicadores das Iniciativas"*, todos com meta numérica e prazo. A
adoção do vocabulário OKR aqui é uma camada de organização sobre o que a Corporação já produziu — não
uma metodologia concorrente.

---

## 4. A ficha do indicador

Cada entrada do catálogo é uma ficha com os campos abaixo. Uma ficha incompleta não sobe ao painel.

### Identificação e definição

| Campo | Conteúdo |
| :--- | :--- |
| `id` | Identificador estável (ex.: `KR2.1`) — não muda quando o título muda |
| `titulo` | Nome do indicador |
| `origem` | Norma e dispositivo: IND. do PLANES, prática do TCU, artigo do Regimento Interno, portaria, ou a solicitação que o originou |
| `tipo` | **resultado-chave** (evidencia o avanço de um objetivo) ou **acompanhamento** (monitor temático, sem objetivo — ver §7) |
| `objetivoOkr` | A qual objetivo (O1–O9) o KR pertence. Vazio quando `tipo: acompanhamento` |
| `definicaoOperacional` | O que exatamente se conta — em prosa, sem ambiguidade |
| `formula` | Numerador ÷ denominador, com as exclusões explícitas |
| `unidade` | %, dias, R$, índice, contagem |

### Cobrança

| Campo | Conteúdo |
| :--- | :--- |
| `linhaDeBase` | Ponto de partida, ou a declaração de que ainda não existe e como será coletado |
| `meta` | Valor numérico. **Nunca** "aumentar" ou "reduzir" |
| `prazo` | Quando a meta deve ser atingida |
| `periodicidade` | De quanto em quanto tempo se afere |
| `fonteDoDado` | Estrutura de dado, sistema ou documento de onde o número sai |
| `responsavel` | Área que responde pelo indicador |
| `limitesDeCobertura` | O que o número **não** enxerga — parte do indicador, não nota de rodapé |

### Estado e ciclo de vida

| Campo | Conteúdo |
| :--- | :--- |
| `estado` | Calculabilidade — a legenda da §5 |
| `dependencias` | O que falta: integração, atributo novo, ou item do roadmap (F1–F8) |
| `situacao` | **proposto** → **vigente** → **suspenso** → **aposentado** |
| `vigencia` | Ciclo a que pertence (ex.: *PLANES 2025-2030*, *PPA 2024-2027*) |
| `sucedidoPor` | `id` do indicador que o substitui no ciclo seguinte, quando houver |

O ciclo de vida é o que permite o catálogo envelhecer sem apagar história. **Indicador aposentado não
é removido**: sai do painel e permanece no catálogo com sua série. Um indicador do PLANES 2025-2030
que não tenha equivalente no ciclo seguinte continua explicando o que a Corporação mediu naquele
período — apagá-lo destruiria a única base de comparação entre ciclos.

`situacao: suspenso` cobre o caso intermediário: o indicador continua válido, mas a fonte ficou
indisponível no período (sistema fora do ar, integração interrompida, mudança de leiaute). Suspender
é honesto; continuar publicando o último valor conhecido não é.

---

## 5. Legenda de calculabilidade

| Símbolo | Estado | Significado |
| :--- | :--- | :--- |
| ● | **Calculável hoje** | O dado é coletado e o cálculo existe ou é trivial sobre o que existe |
| ◐ | **Dado coletado, cálculo ausente** | Nada falta na coleta; falta implementar a conta |
| ○ | **Requer novo atributo** | Falta um campo — sempre de lista fechada — no DFD ou no item de PCA |
| ◌ | **Requer integração externa** | Depende de SIAFI, PNCP, SEI, inventário ou de órgãos de controle |
| ▣ | **Indicador de contexto** | Aferido fora do sistema. O produto é **insumo**; o painel exibe sem calcular |

Os estados ◌ e ▣ não são desculpa para omitir o indicador. Ele entra no catálogo com a dependência
nomeada — é assim que "não temos esse dado" vira item de roadmap em vez de conversa de corredor.

---

## 6. Fontes do catálogo

Quatro conhecidas hoje, e uma deliberadamente aberta.

### 6.1 PLANES 2025-2030

[Planejamento Estratégico do CBMDF, ciclo 2025-2030](indicadores/planes_cbmdf_2025_2030.pdf)
(também disponível na
[página de transparência do CBMDF](https://www.cbm.df.gov.br/lai/download/planejamento-estrategico-do-cbmdf-ciclo-2025-2030/)).
Doze objetivos estratégicos distribuídos em sete temas. Quatro tocam este produto:

| OE | Tema | Objetivo | Relação com o produto |
| :--- | :--- | :--- | :--- |
| **OE 4** | Governança e Gestão | Consolidar as boas práticas de governança | O produto **gera a evidência** que o iGG audita |
| **OE 5** | Infraestrutura | Garantir a infraestrutura logística de suprimentos, bens e serviços | **Núcleo do produto** — IND. 5, 5.1, 5.2 e 5.4 |
| **OE 10** | Governança Digital | Intensificar o uso dos sistemas de informação na decisão | Dados abertos (IND. 10.3) e o próprio produto como sistema |
| **OE 11** | Finanças | Captar e gerir recursos financeiros para executar a estratégia | Execução orçamentária — IND. 11 e 11.2 |

Os demais (OE 1, 2, 3, 6, 7, 8, 9, 12) são operacionais, de ensino, de pessoal ou de relações
institucionais e **não entram** neste catálogo.

### 6.2 PPA, LDO e LOA — e o ciclo interno

O ciclo encadeado **PCA ⇄ PARF ⇄ POA/PLOA**, disciplinado pelas Portarias nº 18 e nº 17 de 30/06/2025
e descrito em [mapeamento_processo_as_is.md](mapeamento_processo_as_is.md). É a fonte dos indicadores
de execução e de aderência do planejado ao executado. O horizonte plurianual do PPA depende do item
**F1** do roadmap.

### 6.3 TCU — metodologia iGG / iESGo

As matrizes dos [Apêndice E](anexos/tcu_apendice_e_governanca_gestao_contratacoes.md) (contratações,
práticas 4310–4370) e [Apêndice F](anexos/tcu_apendice_f_governanca_gestao_orcamentaria.md)
(orçamentária, práticas 4410–4420) dizem **que evidência comprova boa governança**. O produto gera
várias delas — a leitura orientada está em
[tcu_matrizes_relevancia_para_o_produto.md](tcu_matrizes_relevancia_para_o_produto.md).

### 6.4 O próprio produto

Os cinco KPIs da §8 do [Documento de Visão](documento_de_visao.md), já implementados. Aparecem no
catálogo **por referência**, para que o painel institucional seja um só — a definição continua na §8.

### 6.5 Supervenientes — a categoria aberta

Esta é a categoria que garante que o catálogo não nasça datado. Cabem nela os indicadores que **ainda
não existem** e que a instituição pode vir a exigir:

* O **ciclo do PLANES que suceder 2030** e cada novo **PPA** — mudanças previsíveis de calendário.
* **Determinações e recomendações** de TCU, CGDF ou da auditoria interna, dirigidas a um processo
  específico, com prazo de atendimento próprio.
* **Novos normativos**: portarias do EMG ou do DEALF, alterações na Lei nº 14.133/2021, instruções do
  GDF sobre o E-PACC ou sobre transparência.
* **Pedidos do Comando, do EMG ou da SELOF** para acompanhar um tema pontual — uma classe de material
  crítica, um contrato sob atenção, um exercício com restrição orçamentária.
* **Indicadores nascidos da própria operação**, quando a série já coletada revelar um comportamento
  que vale monitorar. É o caso mais legítimo de todos: o dado veio primeiro, o indicador depois.

A ficha da §4 e o rito da §7 são **idênticos** para esta categoria. Muda apenas o campo `origem`.

---

## 7. Rito de inclusão de um indicador novo

É este rito que torna o catálogo extensível. Sem ele, "lista fechada" seria só uma forma elegante de
dizer "lista que ninguém pode mexer".

**Quem pode solicitar.** Qualquer área — SELOF, DEALF, EMG, Comando ou a própria unidade requisitante
— e também um órgão de controle, por determinação ou recomendação.

**O que a solicitação traz.** A ficha da §4, tão completa quanto possível. A ausência de meta
numérica, prazo ou fonte **não impede a solicitação**, mas mantém a entrada em `situacao: proposto`.
Um indicador proposto aparece no catálogo, é discutível e é rastreável — só não sobe ao painel
enquanto a ficha não fechar.

**Quem cura.** SELOF e DEALF em conjunto com o Planejamento. A curadoria verifica três coisas:

1. **Duplicidade** — o resultado pretendido já não é medido por um KR existente?
2. **Fronteira** — o indicador está dentro do recorte do produto (*planejar e governar o ciclo de
   aquisição*, conforme [analise_escopo_erp.md](analise_escopo_erp.md))? Indicador de pessoal, de
   patrimônio ou de atividade operacional não entra, por mais legítimo que seja.
3. **Viabilidade do dado** — de onde sai o número, e a que custo?

**Como entra.** Por alteração versionada do catálogo, revisada como se revisa código — nunca por
digitação em tela. Fica rastreável quem pediu, quem aprovou e a partir de quando o indicador vale.

**Se não for calculável.** Entra assim mesmo, marcado ◌ ou ▣, com a dependência nomeada. A lacuna
declarada é informação de gestão: é o que transforma uma limitação em item de roadmap.

**Nem toda solicitação é um Resultado-Chave.** A curadoria classifica cada pedido em um de dois tipos,
e essa é a primeira decisão a tomar:

* **Resultado-chave** — evidencia o avanço de um objetivo institucional, tem meta e prazo, e se
  encaixa em um dos objetivos O1–O9. Criar objetivo novo só se justifica quando o resultado
  pretendido não couber em nenhum — e a criação também passa pelo rito.
* **Acompanhamento** — um monitor temático que alguém precisa enxergar, sem que exista objetivo
  estratégico por trás: o valor contratado numa classe crítica de material, a execução de um contrato
  sob atenção, o comportamento de um exercício com restrição orçamentária. Não tem meta de objetivo;
  tem **vigência própria** e costuma nascer e morrer com o motivo que o gerou.

A distinção importa. Forçar todo pedido para dentro de um OKR produz objetivos artificiais e
resultados-chave que ninguém cobra — o painel incha e a estrutura perde sentido. Indicador de
acompanhamento entra no catálogo com a mesma ficha, o mesmo rito e o mesmo estado de calculabilidade;
apenas não pendura num objetivo, e aparece no painel em seção própria.

**Revisão periódica.** Ao fim de cada ciclo — do PLANES, do PPA, do exercício do PCA — a curadoria
percorre o catálogo e, para cada entrada, **revalida, suspende, sucede ou aposenta**, usando os campos
de ciclo de vida da §4.

---

## 8. Os OKRs

Nove objetivos. As metas marcadas *a fixar* trazem **quem** as fixará e **quando** — a doutrina da §8
da Visão não admite meta na forma "aumentar" ou "reduzir".

### O1 · Executar o orçamento que foi planejado

> **Origem:** PLANES OE 11 (Finanças) · TCU práticas 4412 e 4414 · PPA/LOA

| KR | Indicador | Origem | Meta | Fonte do dado | Estado |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **KR1.1** | Percentual de execução da LOA do FCDF — empenho ÷ dotação disponibilizada no ano | PLANES **IND. 11** | ≥ **95%** de empenho no exercício | SIAFI | ◌ |
| **KR1.2** | Percentual de execução do Plano de Aquisição e Controle do Orçamento | PLANES **IND. 5** | **+5 p.p.** sobre o exercício anterior | Itens de PCA × contratações concluídas | ◐ exige dois exercícios fechados |
| **KR1.3** | Índice de execução da despesa — empenhado e liquidado ÷ dotação | SELOF §2.7 · TCU **4412** | *a fixar* pela SELOF na 1ª aferição | Trilha, pelos gatilhos de empenho e liquidação | ◐ |
| **KR1.4** | Preservação orçamentária — LOA aprovada ÷ PLOA proposta | SELOF §2.7 | *a fixar* pela SELOF na 1ª aferição | PLOA do produto × LOA publicada | ○ LOA como entrada |

**Limite de cobertura:** o produto conhece o valor que **passou pela plataforma**. Enquanto não houver
integração com o SIAFI, KR1.1 e KR1.3 medem execução parcial, e o painel deve dizê-lo.

### O2 · Comprar melhor, não apenas comprar mais

> **Origem:** PLANES OE 5, **IND. 5.4 — Indicador de efetividade de compras e contratações**

Este é o objetivo de maior aderência ao produto em todo o PLANES, e o de achado mais relevante: o
IND. 5.4 é composto por quatro dimensões normalizadas em base 100, e **o protótipo já coleta duas
delas sem usá-las em nenhum indicador**.

| Dimensão (PLANES) | Normalização oficial | Onde já está no produto | Estado |
| :--- | :--- | :--- | :--- |
| **Qualidade** | Formulário do DEALF, perguntas em escala 1–5 → média **× 20** | `ratingCriteria` — cinco perguntas em escala 1–5 respondidas pelo requisitante ao final do pedido. Hoje alimenta apenas a média exibida no acompanhamento | ◐ |
| **Tempo** | Prazo em dias, influência **inversa**, teto estimado de 600 dias → **÷ 6** | Lead time DFD → entrega, já calculado sobre a trilha de auditoria | ● |
| **Redução percentual** | \|estimado − homologado\| ÷ estimado → **× 100** | O valor **estimado** existe no item; o **homologado** não é capturado | ○ |
| **Punições** | Recomendação = 2,5 · multa = 5, influência **inversa** → **× 20** | Não existe registro de apontamento de controle | ◌ |

| KR | Indicador | Origem | Meta | Estado |
| :--- | :--- | :--- | :--- | :--- |
| **KR2.1** | Índice de efetividade — percentual de compras na faixa **"Compra boa"** | PLANES **IND. 5.4** | ≥ **80%** das compras e contratações | ◐/○ duas de quatro dimensões disponíveis |
| **KR2.2** | Dimensão Qualidade normalizada | IND. 5.4 | componente de KR2.1 | ◐ |
| **KR2.3** | Dimensão Tempo normalizada | IND. 5.4 | componente de KR2.1 | ● |
| **KR2.4** | Dimensão Redução percentual | IND. 5.4 | componente de KR2.1 | ○ valor homologado |
| **KR2.5** | Dimensão Punições | IND. 5.4 | componente de KR2.1 | ◌ órgãos de controle |

**Nota de implementação:** KR2.1 não deve ser publicado com duas dimensões faltando. O caminho é
publicar KR2.2 e KR2.3 isoladamente — que já são informação útil — e declarar KR2.1 como não
reportável até que as quatro existam. Metade de um índice composto não é meio índice; é outro número.

### O3 · Instruir a demanda antes de contratar

> **Origem:** PLANES OE 5 (IND. 5.1 e 5.2) · TCU práticas 4330 e 4340

| KR | Indicador | Origem | Meta | Estado |
| :--- | :--- | :--- | :--- | :--- |
| **KR3.1** | Percentual de Termos de Referência aprovados no ano | PLANES **IND. 5.2** | ≥ **70%** | ○ o pipeline registra `TR Elaborado`, mas não distingue aprovado de devolvido — exige um ramo de devolução na etapa 3 |
| **KR3.2** | Percentual de execução dos projetos prioritários do comando | PLANES **IND. 5.1** | ≥ **90%** no ano | ○ exige marcar "projeto prioritário do comando" como atributo de lista fechada do item de PCA |
| **KR3.3** | Percentual de demandas com prontidão ≥ 4 ao entrar no ciclo | Produto — escala de prontidão da governança | *a fixar* pelo Planejamento após o 1º ciclo | ● |

KR3.3 não vem de norma externa: é o indicador que mede se a instrução prévia — o que o Épico 08 se
propôs a induzir — está de fato acontecendo. É um bom exemplo de indicador **nascido da operação**
(§6.5).

### O4 · Governar com evidência auditável

> **Origem:** PLANES OE 4 (IND. 4 e 4.1.1) · TCU Apêndices E e F

| KR | Indicador | Origem | Meta | Estado |
| :--- | :--- | :--- | :--- | :--- |
| **KR4.1** | Índice de Governança e Sustentabilidade (iESGo) e Índice Integrado de Governança e Gestão (iGG) | PLANES **IND. 4** e **IND. 4.1.1** | faixa **"Aprimorado"** | ▣ aferição do TCU — o produto é insumo, não calculador |
| **KR4.2** | Percentual de itens de PCA publicados no PNCP | TCU **4330** | **100%** | ● já apurado nos alertas do Planejamento |
| **KR4.3** | Percentual de transições excepcionais com justificativa e aprovador distinto do autor | TCU **4310** (integridade e segregação de funções) | **100%** | ● trilha de auditoria |
| **KR4.4** | Percentual de decisões de priorização com score registrado e explicável | TCU **4421** e **4422** | **100%** | ● |

KR4.1 é o exemplo canônico de **indicador de contexto**: o CBMDF é avaliado por ele, o produto
contribui materialmente para a nota, e ainda assim o sistema **não pode calculá-lo**. Exibi-lo com a
origem declarada e sem número inventado é o comportamento correto.

### O5 · Conter a exceção

> **Origem:** Produto — §8, KPI 4 · TCU práticas 4420 a 4422

| KR | Indicador | Origem | Meta | Estado |
| :--- | :--- | :--- | :--- | :--- |
| **KR5.1** | Percentual do valor contratado que entrou por urgência, fora da fila priorizada | [Visão §8, KPI 4](documento_de_visao.md) | ≤ **10%** do ciclo e **nenhum setor acima de 20%** | ● implementado |
| **KR5.2** | Percentual de compras emergenciais sobre o total | SELOF §2.7 | *a fixar* pela SELOF, com base no PNCP dos últimos 24 meses | ◐ recorte por dispensa emergencial |
| **KR5.3** | Demanda reprimida rolada para o exercício seguinte | SELOF §4 (backlog) | *a fixar* após o 1º ciclo fechado | ○ |

### O6 · Cumprir os prazos do ciclo

> **Origem:** Produto — §8, KPIs 1 e 2 · SELOF §2.6 e §2.7

| KR | Indicador | Origem | Meta | Estado |
| :--- | :--- | :--- | :--- | :--- |
| **KR6.1** | Tempo médio de tramitação, do DFD à entrega | [Visão §8, KPI 1](documento_de_visao.md) | ≤ **200 dias** em 12 meses | ● implementado |
| **KR6.2** | Cumprimento do SLA por macro-etapa | [Visão §8, KPI 2](documento_de_visao.md) | ≥ **80%** em 12 meses | ● implementado |
| **KR6.3** | Prazos médios entre marcos financeiros — empenho → liquidação → pagamento — e percentual de pagamentos no prazo | SELOF §2.6 e §2.7 | pagamento em ≤ **30 dias** corridos | ◐ os gatilhos de comprometimento, empenho, liquidação e pagamento já existem no pipeline |

KR6.3 é o melhor candidato imediato do catálogo: os quatro marcos já são registrados na trilha, com
autor e data. Falta apenas a conta.

### O7 · Cobrir a instituição e ancorar no baseline

> **Origem:** Produto — §8, KPI 5 · Épico 09 (Matriz de Dotação) · SELOF §2.7

| KR | Indicador | Origem | Meta | Estado |
| :--- | :--- | :--- | :--- | :--- |
| **KR7.1** | Percentual de unidades com ao menos um pedido registrado | [Visão §8, KPI 5](documento_de_visao.md) | ≥ **90%** das unidades | ● implementado |
| **KR7.2** | Percentual do valor institucional que passa pela plataforma | [Visão §8, KPI 5](documento_de_visao.md) | ≥ **70%** do valor | ◌ SIAFI — já declarado como não calculável na §8.3 da Visão |
| **KR7.3** | Cobertura média da dotação por setor — carga atual ÷ dotação prevista | Épico 09 | *a fixar* pela CESMA após a 1ª aferição da matriz | ● |
| **KR7.4** | Índice de ruptura de estoque e nível de atendimento de requisições | SELOF §2.7 | *a fixar* pela CESMA | ◌ depende de sistema de inventário |

### O8 · Ligar a compra à estratégia e ao plurianual

> **Origem:** Regimento Interno, Art. 61-II, III e V e Art. 69-X · PPA · roadmap F1, F2 e F6

| KR | Indicador | Origem | Meta | Estado |
| :--- | :--- | :--- | :--- | :--- |
| **KR8.1** | Percentual de demandas vinculadas a um objetivo estratégico do PLANES | RI **Art. 61-V** e **69-X** · **F6** | *a fixar* pela SELOF — proposta inicial: **100%** das demandas acima de um valor de corte | ○ |
| **KR8.2** | Percentual de itens de PCA classificados por programa de trabalho e ação do PPA | RI **Art. 61-III** · **F2** | *a fixar* pela SELOF | ○ |
| **KR8.3** | Grau de cumprimento das metas do PLANES atribuíveis à logística e às contratações | RI **Art. 61-V** | acompanha as metas dos IND. 5, 5.1, 5.2, 5.4 e 11 | ▣/◐ |
| **KR8.4** | Cobertura plurianual do PCA — demandas projetadas para o quadriênio | PPA · **F1** | *a fixar* pela SELOF | ○ |

**Âncora concreta do KR8.1.** O DFD já captura um campo de **vínculo ao planejamento**, hoje em texto
livre. Convertê-lo em seleção fechada dos doze objetivos estratégicos do PLANES é uma mudança pequena
que destrava, de uma vez, o KR8.1, o KR8.3 e o item F6 do roadmap. É o menor esforço com maior retorno
estratégico de todo este catálogo.

### O9 · Transparência ativa

> **Origem:** PLANES OE 10 (IND. 10.3) e OE 3 (IND. 3.2) · roadmap F7

| KR | Indicador | Origem | Meta | Estado |
| :--- | :--- | :--- | :--- | :--- |
| **KR9.1** | Percentual de execução do Plano de Dados Abertos na parcela de contratações | PLANES **IND. 10.3** | ≥ **50%** do Plano | ○/◌ |
| **KR9.2** | Contribuição do produto ao Índice de Transparência Ativa do CBMDF | PLANES **IND. 3.2** | acompanha a meta institucional do ITA | ▣ |

---

## 9. Mapa: dado coletado → indicador possível

A capacidade instalada. Cada estrutura de dado que o produto já mantém, e os indicadores que ela
sustenta — inclusive os que ainda não foram escritos.

| Estrutura de dado | O que registra | Indicadores que sustenta |
| :--- | :--- | :--- |
| **Trilha de auditoria** (`historico[]`) | Toda transição de status, com data, autor, perfil, tela de origem, justificativa, marca de excepcionalidade, aprovador e marca de migração | Tempo por etapa, lead time ponta a ponta, cumprimento de SLA, retrabalho e devoluções, taxa de arquivamento, transições excepcionais, segregação de funções (KR2.3, KR4.3, KR6.1, KR6.2) |
| **Gatilhos financeiros do pipeline** | Os marcos de comprometimento, empenho, liquidação e pagamento, cada um com sua data na trilha | Prazos entre marcos financeiros, percentual de pagamentos no prazo, índice de execução da despesa (KR1.3, KR6.3) |
| **Fotografia do ciclo do PCA** | O planejado congelado no fechamento de cada ciclo, com score, posição, valor e marca de ajuste manual | Aderência do planejado ao executado, taxa de arbítrio sobre a fila, desvio de posição (KR1.2, KR4.4) |
| **Avaliação do pedido** | Cinco critérios em escala 1–5 respondidos pelo requisitante: qualidade, fornecedor, tempo, equipe de compras e atendimento da necessidade | **Dimensão Qualidade do IND. 5.4**, satisfação do requisitante, desempenho de fornecedor (KR2.2) |
| **Priorização da demanda** | Criticidade, risco, obrigatoriedade legal e prontidão, com autor e data | Qualidade da instrução prévia, distribuição de criticidade, justificativa da fila (KR3.3, KR4.4) |
| **Matriz de dotação** | Dotação prevista × carga atual por setor e item, com lacuna e cobertura derivadas | Cobertura de baseline, déficit por unidade, ancoragem da demanda (KR7.3) |
| **Caracterização do DFD** | Exercício-alvo do PCA, data pretendida, serviço continuado e vínculo ao planejamento | Aderência ao prazo pretendido, recorrência de serviços, **vínculo estratégico** quando o campo virar lista fechada (KR8.1) |
| **Item do pedido** | Grupo e classe, tipo, tipo e natureza de despesa, quantidade, urgência, preço | Composição da despesa, contenção de urgência, agregação por classe (KR5.1, KR5.2) |

Duas leituras deste mapa merecem registro. A primeira: a **avaliação do pedido** é hoje o ativo mais
subutilizado do sistema — coletada de todo requisitante, exibida como média simples, e sem qualquer
indicador apoiado nela, apesar de ser exatamente a matéria-prima da dimensão Qualidade do indicador
oficial mais aderente ao produto. A segunda: os **marcos financeiros** já estão na trilha com data e
autor, o que torna os indicadores de tempo do catálogo SELOF (§2.7) uma questão de cálculo, não de
coleta.

---

## 10. O que fica fora

Registrado com o motivo, para não voltar como pergunta:

* **Indicadores de pessoal** — efetivo, folha, GSV, diárias, suprimento de fundos. Fora do domínio de
  contratações, conforme §3 de [contribuicoes_anotacoes_selof.md](contribuicoes_anotacoes_selof.md).
* **Indicadores de patrimônio e inventário** em si — pertencem ao SISGEPAT e ao SISMAT. O produto
  consome a carga atual como baseline (Épico 09), mas não a governa.
* **Indicadores operacionais do PLANES** — OE 1, 2, 3, 6, 7, 8, 9 e 12: tempo-resposta, vistorias,
  perícias, ensino, qualidade de vida, relações institucionais. Legítimos e cobrados, mas de outro
  domínio.
* **Redação dos relatórios institucionais** — Relatório de Gestão, Relatório de Atividades, TCA. O
  produto é fonte de insumo (item **F5** do roadmap), nunca o editor do documento.

Um indicador excluído aqui pode ser proposto de novo pelo rito da §7 — o que muda é que a curadoria
terá de justificar por que a fronteira do produto mudou.

---

## 11. Faseamento sugerido

| Onda | O que entra | Por quê |
| :--- | :--- | :--- |
| **1** | Os KR marcados ● e ◐ — KR2.2, KR2.3, KR3.3, KR4.2, KR4.3, KR4.4, KR6.3, KR7.3, KR1.3 | Nenhuma coleta nova. É cálculo sobre dado que já existe — o melhor custo × benefício do catálogo |
| **2** | Os KR marcados ○ — com destaque para **KR8.1** (vínculo ao PLANES por lista fechada) e **KR2.4** (valor homologado) | Atributos novos, todos de lista fechada. KR8.1 destrava o F6 e o alinhamento estratégico |
| **3** | Os KR marcados ◌ | Dependem das integrações previstas no RNF de integração com sistemas governamentais (§6.3 da Visão): SIAFI, PNCP, inventário |
| **contínua** | Os KR marcados ▣ e os supervenientes | Contexto institucional e o que a instituição vier a exigir. Alimentados por curadoria, no ritmo do rito da §7 |

A onda 1 tem uma propriedade rara: **entrega indicador institucional sem depender de nenhuma
integração e sem pedir um campo novo ao usuário.** É por ela que a implementação deve começar.

---

*Este catálogo é implementação futura em sua totalidade. A tela de Indicadores hoje existente
(cinco KPIs do produto) permanece como está até que o Épico 10 do
[Documento de Visão](documento_de_visao.md) seja desenvolvido.*
