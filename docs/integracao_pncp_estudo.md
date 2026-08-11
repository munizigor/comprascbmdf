# Estudo Técnico — Orquestração das Bases de Governança via PNCP

**Spike exploratório.** Data da coleta: 11/08/2026. Nenhuma decisão de arquitetura
foi tomada; o objetivo foi medir o que as APIs abertas do PNCP entregam de fato
para o propósito de integrar **planejado** (PCA) e **contratado** (Contratos.gov).

Identificadores usados: PCA sob CNPJ do CBMDF `08977914000119` (unidade 24104);
contratações sob o órgão superior FCDF `05448380000145`, UASG `170394`
(id de unidade `5541` na busca do portal).

---

## 1. As três APIs abertas — são três, não uma

O Swagger indicado na demanda cobre apenas a primeira. As outras duas só aparecem
observando o tráfego do portal e um segundo `api-docs`.

| API | Base | Endpoints | Papel | Rate limit |
| :-- | :-- | :-- | :-- | :-- |
| **PNCP** | `/api/pncp/v1` | 109 paths | Dado granular por órgão/ano/sequencial. É a fonte dos itens. | não observado |
| **Consulta** | `/api/consulta/v1` | 12 paths | Consultas paginadas **por período** — é o mecanismo de sincronização incremental. | **HTTP 429, janela ~60s** |
| **Busca** | `/api/search/` | 1 path | Índice Elasticsearch do portal. Não documentado. Único caminho para "tudo do CBMDF". | não observado |

Detalhes operacionais medidos:

- O parâmetro `status` é **obrigatório** em `/api/search/`, mas um valor inválido
  é silenciosamente ignorado e devolve a base inteira — é assim que se obtém o
  universo completo. Os status válidos para edital (`recebendo_proposta` 12,
  `propostas_encerradas` 54, `encerradas` 665) somam exatamente o total de 731,
  confirmando que são exaustivos.
- `/api/consulta/` devolve **429** após poucas dezenas de chamadas e libera em
  ~60s. `/api/pncp/` sustentou 12 requisições concorrentes a ~0,22s cada sem
  bloqueio. Qualquer integração precisa tratar as duas de formas diferentes.
- `tamanhoPagina` mínimo é 10 em vários endpoints (erro 400 abaixo disso).

---

## 2. O que a coleta trouxe

| Base | Registros | Valor |
| :-- | --: | --: |
| PCA 2026 (seq. 4, publicado 22/06/2026) | 2.192 itens | R$ 385.947.088,28 |
| PCA 2025 | 300 itens | R$ 4.458.599,00 |
| PCA 2024 | 234 itens | R$ 15.311.424,26 |
| Editais/avisos (2021–2026) | 731 | — |
| Atas de registro de preços | 70 (47 vigentes) | — |
| Contratos (2022–2026) | 879 (583 vigentes) | — |
| Itens efetivamente contratados em 2026 | 287 | R$ 56.172.818,71 |

O salto de 300 → 2.192 itens entre o PCA 2025 e o 2026 **não é crescimento
orçamentário nem mudança de patamar de planejamento**: 2026 foi o primeiro
exercício em que o CBMDF publicou seu planejamento no PNCP. Os números de 2024 e
2025 são publicações parciais e não servem de linha de base — qualquer série
histórica de PCA deve começar em 2026.

---

## 3. A cadeia que **funciona**

Testado sobre os 258 contratos de 2026:

```
Contratação (edital)  ──→  Ata (SRP)  ──→  Contrato  ──→  Empenho
        │                                      │
        └── itens + resultados                 └── termos, histórico, documentos
```

| Elo | Campo | Preenchimento |
| :-- | :-- | --: |
| Contrato → Contratação | `numeroControlePncpCompra` | **100%** (258/258) |
| Contrato → Ata | `numeroControlePncpAta` | 12% (31/258) |
| Contrato → Processo SEI | `processo` | **100%** |

Empenhos **não** estão no endpoint `/empenhos` (404). Aparecem como contratos de
`tipoContrato.id = 7` ("Empenho") — 401 dos 879 registros. Quem for consumir a
base precisa saber disso, ou vai contar contrato e empenho como a mesma coisa.

**Descoberta lateral relevante:** 49 dos 258 contratos de 2026 (19%, R$ 11,03
milhões) apontam para contratações de **outros órgãos** — são adesões a atas:
PMDF (27), SEEC/DF (18) e Ministério da Justiça (4). O dado de carona já está
disponível e mensurável, sem esforço adicional.

---

## 4. O elo que **não** funciona: PCA × contratado

Este é o achado central, e ele contraria a premissa da demanda.

**Existe** o endpoint `GET /v1/orgaos/{cnpj}/pca/{ano}/{seq}/itens/contratacao?numeroContratacao=…`,
que ligaria item planejado a contratação. Testado com cinco formatos de
`numeroContratacao` (número de controle PNCP, `146/2025`, `2025/146`, `146`,
variante do CBMDF) — **todos retornam 404 "Não existem itens para os critérios
informados"**. O CBMDF não preenche esse vínculo.

Pelos dois lados a chave está ausente:

- Nos **2.192 itens do PCA**, nenhum campo aponta para contratação (só existe
  `grupoContratacaoCodigo`, que é classificação de material, não número de compra).
- Nos itens de **contratação**, os campos de catálogo (`catalogo`,
  `catalogoCodigoItem`, `categoriaItemCatalogo`) vêm **nulos**.

Sobra inferir pela descrição. Medi três estratégias sobre os 287 itens
contratados em 2026:

| Estratégia | Itens casados | Valor contratado coberto |
| :-- | --: | --: |
| Cosseno TF-IDF na descrição inteira (limiar 0,55) | 7,3% | 1,9% |
| **Cabeça da descrição, 1 token** | **54,7%** | **89,0%** |
| Cabeça da descrição, 2 tokens | 22,0% | 29,1% |

O melhor resultado (89% do valor) é enganoso. Ao usá-lo para inferir o grupo de
contratação e comparar planejado × contratado, saem execuções de **12.030%**
(Combustíveis), **2.116%** (Material veterinário) e **1.710%** (Serviços de
Aviação) — atribuições erradas, não desempenho. E o cosseno produz falsos
positivos grosseiros: o item "Corda" (R$ 382.742) casou com "PUXADOR corda"
(R$ 721,65).

A raiz é que as duas bases descrevem o mesmo objeto em níveis diferentes de
catálogo: a contratação usa o nome curto do PDM ("Roupa proteção fim
específico"), o PCA usa a descrição longa ("MACACÃO DE PROTEÇÃO, TIPO TYVEK:
material 100% polietileno…").

> **Conclusão:** o cruzamento PCA × contratado **não é automatizável com
> confiança** a partir dos dados abertos. Ou o CBMDF passa a preencher o vínculo
> na origem (o campo existe no PNCP), ou é preciso uma tabela de-para curada
> internamente. Um número de "execução do PCA" calculado por similaridade textual
> seria apresentável, mas errado — e erro em indicador de governança custa mais
> caro que ausência de indicador.

---

## 5. Qualidade dos dados — o que não sustenta decisão

Medido, não estimado:

| Achado | Medição | Consequência |
| :-- | :-- | :-- |
| `valorOrcamentoExercicio` zerado | 2.192 de 2.192 itens | Não dá para saber quanto do PCA cai no exercício. |
| `unidadeRequisitante` sem granularidade | 2.192 de 2.192 = "CBMDF" | Hoje não se abre o PCA por setor. **Mas é preenchimento, não limitação da API** — ver §5.1. |
| `dataDesejada` toda em dezembro | 2.192 de 2.192 = 2026-12 | Não há calendário de contratação utilizável; o campo foi preenchido formalmente. |
| Valor de contrato replicado | R$ 74,3 mi repetido em 23 contratos; R$ 50 mi em 17 | **85,1% do agregado de R$ 2,86 bi é artefato.** O valor real deduplicado é R$ 426,3 mi. |
| Contratos de valor R$ 1,00 | 221 registros | Credenciamentos sem valor definido distorcem qualquer média. |

Além disso, 77 itens do PCA 2025 reaparecem no PCA 2026 com descrição idêntica, e
66 itens estão nos três planos (2024, 2025 e 2026) — indício de arrastamento de
demanda não executada, mensurável.

**Perfil das contratações** (731 editais): Inexigibilidade 368, Dispensa 222,
Pregão Eletrônico 129, Credenciamento 9, Concorrência 3. Desde 2024, **77–79% das
contratações por ano são dispensa ou inexigibilidade** — estável, não uma
anomalia de um exercício.

### 5.1 A granularidade por GSO não exige UASG nova

A primeira versão deste estudo concluiu que os dados por setor teriam de vir de
uma base interna. **Estava errado.** A verificação do schema mostra o contrário:

- Em `IncluirPlanoContratacaoItemDTO`, `unidadeRequisitante` é
  `type: string, maxLength: 255` e **não é obrigatório**. É um rótulo de texto
  livre por item do PCA — não uma unidade de registro.
- O mesmo campo existe em `RetificarParcialPlanoContratacaoItemDTO`, ou seja,
  pode ser corrigido item a item por `PATCH`, sem republicar o plano inteiro.
- Outros órgãos já o usam assim: a Administração Regional do SCIA preenche
  `"RA-SCIA"` nos itens do seu PCA 2026.

Basta escrever `DEALF`, `COMOP`, `DEPCT`… no campo, na origem — e o PCA passa a
ser abrível por GSO **pelo próprio PNCP**, sem sistema novo.

**Criar UASGs seria a solução cara para um problema que um campo resolve**, por
três razões:

1. **UASG e GSO são camadas diferentes.** Pela planilha
   `Modelo Distribuicao Orcamento por GSO.xlsx`, o CBMDF tem **2 UASGs e 8
   GSOs** — 170394 (R$ 199,2 mi: DEALF 36,5%, COMOP 36%, DEPCT 18,5%, GABCG
   3,5%, DERHU 2%, DESEG 2%, SUBCG 1,5%) e 170495 (R$ 253,2 mi: DISAU 100%). O
   GSO é dimensão de rateio *dentro* da UASG. As duas UASGs existentes já são as
   que fazem sentido: o Fundo de Saúde é gestora separada porque é dinheiro
   separado.
2. **Fragmentaria as compras.** Hoje tudo é contratado na 170394. Nove UASGs
   viram nove unidades de contratação, com operadores e licitações próprias —
   o oposto do mantra "comprar melhor" (reduzir compras pulverizadas, otimizar
   lotes de contratação).
3. **Quebraria a consulta e a série.** Toda query ao PNCP passaria a varrer nove
   unidades, e o histórico se parte no corte.

*Fora do escopo desta medição:* a viabilidade administrativa de criar UASG no
SIASG/Compras.gov — questão para o DEALF e o órgão setorial.

---

## 6. O que dá para construir **hoje**, sem depender do elo quebrado

Cinco funcionalidades validadas com dado real nesta coleta:

1. **Radar de vigência de atas.** 47 atas vigentes, **21 vencem em até 180 dias**;
   23 venceram nos últimos 12 meses. Cada vencimento é uma janela de recontratação
   com prazo conhecido. Já produz a lista ordenada por data.
2. **Radar de vencimento de contratos.** 583 vigentes, distribuídos em 22 (0–90d),
   141 (91–180d), 55 (181–365d), 365 (>365d).
3. **Base de preços homologados.** `…/compras/{ano}/{seq}/itens/{n}/resultados`
   devolve fornecedor, CNPJ, porte (ME/EPP), quantidade e **valor unitário
   homologado**. É preço real pago pelo CBMDF — insumo direto para o catálogo do
   Marketplace e para estimativa de novas contratações.
4. **Painel de economia em licitação.** `valorTotalEstimado` × `valorTotalHomologado`
   por contratação dá a economia efetiva, item a item.
5. **Radar de carona nacional.** A busca aceita texto livre em âmbito nacional —
   atas vigentes de outros órgãos para o que o CBMDF planeja comprar. O mecanismo
   funciona, mas a query precisa ser por descrição de item; buscar pelo nome do
   grupo é impreciso (a busca por "Aeronaves" retornou material de construção da
   Marinha).

A funcionalidade 5 tem par natural com o dado do §3: o CBMDF já adere a atas de
PMDF, SEEC e MJSP — o radar tornaria essa prática sistemática em vez de reativa.

---

## 7. Restrições para qualquer integração futura

- **Cache local obrigatório.** O rate limit de `/api/consulta/` inviabiliza
  consulta ao vivo. O modelo tem de ser: sincronização periódica via endpoints
  `/atualizacao` (que aceitam janela de datas) → base local → aplicação lê a base.
- **Janela de 30 dias** em `/instrumentoscobranca/inclusao` (erro 422 acima disso).
- Cliente HTTP: o `curl` do Git/mingw falha no handshake TLS com o PNCP (rc 56);
  o do Windows funciona. Com `--retry`, é preciso escrever em arquivo e não em
  stdout — senão as respostas parciais se concatenam e corrompem o JSON.
- O portal só devolve 100 registros por página; a paginação funciona e foi usada
  para obter as bases completas.

---

## 8. Recomendação

A demanda pedia integrar planejado e contratado. **A parte "contratado" está
pronta e é sólida** — cadeia 100% rastreável de contrato até edital, com preços,
fornecedores, prazos e adesões. **A parte "planejado × contratado" está bloqueada
na origem**, e o desbloqueio é de processo, não de tecnologia: preencher o número
da contratação no item do PCA, no sistema onde o PCA é montado.

Sugiro, nesta ordem:

1. Entregar as funcionalidades do §6, que não dependem do elo quebrado e já geram
   valor mensurável (vencimentos, preços, economia).
2. Levar ao SELOF/COMAP a questão do vínculo PCA ↔ contratação — se o
   preenchimento passar a ocorrer, o cruzamento vira consulta a um endpoint que já
   existe, sem heurística.
3. Só então construir o indicador de execução do PCA.

Sobre a granularidade por GSO, vale o mesmo diagnóstico: é preenchimento, não
tecnologia. O campo `unidadeRequisitante` já aceita o rótulo do setor (§5.1) —
não é preciso criar UASG nenhuma, e criar seria contraproducente. Preenchê-lo na
origem resolve, sem subir sistema.

Isso não desfaz a fronteira do Documento de Visão, apenas a precisa: o PNCP
continua sendo fonte do que foi **publicado**, não do que foi **requisitado** —
mas o que é publicado pode carregar o setor de origem, e hoje não carrega.

---

*Scripts do spike (cliente com cache e retry, coletor paralelo, três motores de
cruzamento) estão no diretório de trabalho da sessão e podem ser migrados para o
repositório se o estudo for aprovado.*
