# A3 — Publicação do PCA 2027 do CBMDF no PNCP

## Contexto

O Plano de Contratações Anual é obrigação da Lei 14.133/2021: o órgão publica no
PNCP o que pretende contratar no exercício seguinte. O CBMDF consolidou as
demandas de 2027 no *Rol de Demandas* — planilha com **2.364 itens, R$ 564,6 mi,
12 demandantes** (`data/CBMDF - Rol de Demandas 2027 - _GERAL.csv`).

Em 12/08/2026, consulta à API do PNCP confirma: **não existe PCA 2027 publicado**
para o CBMDF em nenhum CNPJ e em nenhum ambiente (`404`).

## Problema e causa-raiz

**Problema:** a distância entre a planilha e o plano publicado é vencida hoje por
digitação manual, item a item, no sistema de origem. Com 2.364 itens isso não
escala — e o histórico mostra o efeito: o PCA 2026 do CBMDF foi ao ar em
**22/06/2026**, quase seis meses dentro do exercício que deveria planejar.

**Causa-raiz:** não existe caminho automatizado entre o instrumento onde o CBMDF
consolida a demanda (planilha) e o instrumento onde a lei exige publicidade
(PNCP). A API de escrita do PNCP existe e é documentada, mas nunca foi usada
pelo CBMDF — nenhum código de autenticação ou publicação foi escrito até aqui.

**Consequência de segunda ordem:** sem carga automatizada, o dado publicado
perde granularidade. Nos planos existentes o `unidadeRequisitante` vem vazio ou
com "CBMDF" em 100% dos itens — não se sabe, no dado público, qual setor pediu o
quê. A planilha tem essa informação na coluna `DEMANDANTE` e ela se perde na
transcrição manual.

## Necessidades de negócio

| # | Necessidade | Fonte |
| :-- | :-- | :-- |
| 1 | Publicar o PCA 2027 no PNCP dentro do prazo legal | Lei 14.133/2021; `docs/mapeamento_processo_as_is.md` (Portaria nº 18/2025) |
| 2 | Eliminar a transcrição manual de 2.364 itens | `docs/documento_de_visao.md`, Épico 12 — Adoção e Carga Inicial via PNCP (issue #35) |
| 3 | Preservar o demandante item a item no dado público | `docs/integracao_pncp_estudo.md` §5.1 — `unidadeRequisitante` é texto livre por item, hoje desperdiçado |
| 4 | Saber, antes de publicar, o que o dado de origem não sustenta | Achado desta análise: 1.260 itens sem unidade de fornecimento, 221 sem mês, 12 sem valor |
| 5 | Publicar com classificação CATMAT/CATSER real, não convenção interna | Decisão do Navegador, 12/08/2026 |

## Restrições

- Stack travada: Python 3 **somente stdlib**, sem dependência externa.
- Escrita no PNCP exige credencial com permissão no CNPJ do FCDF
  `05448380000145` — órgão compartilhado com PMDF e PCDF. Erro de unidade
  publica no plano de outra corporação.
- Toda publicação é ato irreversível de efeito externo: exige aprovação
  explícita do Navegador e ensaio prévio em `treina.pncp.gov.br`.
- O PCA da unidade 170394 é hoje mantido pelo PGC/Compras.gov.br. Quem é a fonte
  do PCA 2027 — o PGC ou esta carga — é decisão de processo ainda em aberto.

## Critérios de sucesso (outcome)

| Critério | Medida |
| :-- | :-- |
| O plano publicado corresponde à demanda consolidada | Consolidado do PNCP = payload, item a item e centavo a centavo |
| O setor demandante é identificável no dado público | `unidadeRequisitante` preenchido em 100% dos itens publicados |
| A carga deixa de ser trabalho manual | Da planilha ao plano publicado em uma sessão, sem digitação item a item |
| O que o dado não sustenta é visível, não silenciado | Relatório de pendências por demandante, entregue antes da publicação |
| Nada é publicado sem ensaio | Carga completa validada no treino antes de qualquer envio à produção |
