# PLANO — Carga do PCA 2027 no PNCP

Épico: **Publicar o Rol de Demandas 2027 como PCA no PNCP, via API, sem
transcrição manual.** Análise em [PROBLEMA.md](PROBLEMA.md); desenho completo no
plano aprovado em 12/08/2026.

Alvo: CNPJ **05448380000145** (FCDF), unidades **170394** (CBMDF, 902 itens) e
**170495** (assistência médica, 1.462 itens). Ensaio obrigatório em
`treina.pncp.gov.br`.

## Fase 0 — Registro

- [x] `.claude/PROBLEMA.md` — A3 da análise
- [x] `.claude/PLANO.md` — este arquivo
- [x] `.gitignore` cobrindo `.env`, `data/_log/` e o cache do cliente
- [x] Tabelas de referência CATMAT/CATSER versionadas em `data/referencia/`
      (658 + 312 classes)

## Fase 1 — Spike no treino (descartável) — **GATE**

Como piloto da carga, quero saber se a API aceita o formato desenhado, para não
escrever 500 linhas em cima de uma suposição.

- [x] Login devolve o token no header `Authorization`
- [x] A API confere permissão por órgão: `401` ao tentar o CNPJ do FCDF com a
      credencial de treino. Publicar por engano em outra corporação é impossível.
      **Consequência: alguém precisa de permissão no CNPJ do FCDF para a produção.**
- [ ] A API aceita `codigoItem` nulo com `catalogo: 1`
- [ ] A API aceita classe CATSER de 4 dígitos (o PGC envia o grupo de 3)
- [ ] Tamanho de lote que passa sem erro (500? 2.000?)
- [ ] `DELETE` do plano de teste funciona — o caminho de rollback existe

Comando: `python tools/pncp/_spike_treina.py` (padrão CBMDF/24104, onde a
credencial de treino escreve).

Critério de aceitação: as quatro respostas registradas com a saída real da API.
Resposta negativa em qualquer uma reabre o mapeamento antes da Fase 2.

## Fase 2 — Regras puras (TDD)

Como responsável pela carga, quero que a conversão planilha → item do PNCP seja
uma função pura e testada, para que o erro apareça no teste e não no ato público.

- [x] `tests/test_catalogo.py` + `tools/pncp/catalogo.py` — valida a classe
      contra CATMAT/CATSER, devolve o nome canônico, resolve o código ambíguo
      pelo elemento de despesa, sugere classe para os 22 sem código, numera os
      grupos de contratação e preserva os já congelados
- [x] `tests/test_pca.py` + `tools/pncp/pca.py` — parser de moeda pt-BR,
      simplificação da descrição em quatro passos, sufixo da natureza de despesa,
      categoria por elemento, mês → `dataDesejada`, unidade de fornecimento
      extraída da descrição, item bloqueado, numeração por plano

Duas exceções ao elemento de despesa, ambas com fundamento e com teste:
seção 1 do CATSER (grupos 111–183) → Soluções de TIC; manutenção empenhada em
4490.51 → Serviços de Engenharia, não Obra (Lei 14.133/2021, art. 6º, XII).

Critério de aceitação: **91 testes verdes**; nenhuma função de regra lê o relógio
ou faz I/O; ano sempre parâmetro.

## Fase 3 — Geração offline — **GATE**

Como Navegador, quero ver o que será publicado e o que o dado não sustenta,
antes de qualquer envio.

- [x] `tools/pncp/gerar_pca.py` → `pca_2027_completo.json` (2.311),
      `pca_2027_170394.json` (849) e `pca_2027_170495.json` (1.462)
- [x] `data/referencia/grupos_contratacao.json` — 172 grupos, códigos 300 a 471
- [x] `data/pca_2027_pendencias.csv` — 1.249 linhas, por demandante e motivo
- [x] Conferência: 2.311 publicáveis + 53 bloqueados = 2.364 itens;
      R$ 564.637.127,83 batendo ao centavo com a origem
- [ ] **Aceite do Navegador sobre o relatório de pendências**

## Fase 4 — Carga completa no treino

- [ ] `tools/pncp/cliente.py` e `autenticacao.py` (escrita autenticada, com log)
- [ ] `tools/pncp/publicar_pca.py` — `--dry-run` e treino por padrão
- [ ] Publicar os dois planos no treino
- [ ] `tools/pncp/conferir_pca.py` — publicado × payload, campo a campo
- [ ] `DELETE` dos planos de teste

Critério de aceitação: zero divergência na conferência; evidência com a saída
real dos comandos.

## Fase 5 — Produção — **GATE do Navegador**

Bloqueada até a decisão: **a fonte do PCA 2027 é o PGC ou esta carga?**

- [ ] Decisão registrada
- [ ] Checklist: suíte verde, payload revisado, credencial de produção,
      unidade conferida pelo nome retornado, rollback definido, janela combinada
- [ ] Publicação e conferência
- [ ] `docs/publicacao_pca_pncp.md` e `docs/CHANGELOG.md`
