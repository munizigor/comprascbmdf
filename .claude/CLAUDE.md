# CLAUDE.md — [NOME DO PROJETO]

<!--
TEMPLATE — Instruções de preenchimento (apagar este bloco ao finalizar):

- Este arquivo é gerado no gate da Fase 3 (design aprovado), conforme o
  CLAUDE.md global. Ele ESPECIALIZA o global — não repita nada que já
  está lá (contrato de pareamento, ciclo de fases, TDD, gates, /clear).
  Instrução duplicada consome atenção do modelo e cria conflito de versão.
- Regra de ouro: aqui entra apenas o que é ESPECÍFICO deste projeto e
  ESTÁVEL entre sessões. Decisão de iteração vai em .claude/PLANO.md;
  documentação extensa vai em ./docs/ (referencie, não cole).
- Mantenha enxuto: o mais importante no topo. Se passar de ~120 linhas,
  mova conteúdo para ./docs/ e deixe só o ponteiro.
- O arquivo cresce organicamente: durante a construção, use `#` no início
  de uma mensagem para gravar correções aqui sem editar na mão.
-->

## Contexto de Negócio (3 linhas, máximo)

<!-- Se o projeto passou pelo modo descoberta, preencher a partir do POV e
     da persona registrados em .claude/DESCOBERTA.md. -->

[O que o sistema faz, para quem, e qual problema resolve. Ex.: "API de
interoperabilidade entre centrais de despacho 193 (CBMDF) e 192 (SAMU/DF).
Usuários: operadores de despacho. Restrições: LGPD, contrato FHIR R4."]

## Stack Travada (sem alternativas — decidida no gate da Fase 3)

- Runtime: [ex.: Node.js 22 LTS + TypeScript 5.x, `strict: true`]
- Backend: [ex.: NestJS 11]
- Banco: [ex.: PostgreSQL 16 + Prisma 6]
- Cache/filas: [ex.: Redis 7 — ou remover linha se não usar]
- Mensageria: [ex.: RabbitMQ — ou remover linha se não usar]
- Testes: [ex.: Jest + Supertest; testcontainers para integração]
- Lint/format: [ex.: ESLint + Prettier, config no repo]
- Ambiente: [ex.: Docker Compose (`compose.yaml` na raiz)]

Desvio desta stack = parar e consultar o Navegador. Não sugerir troca.

## Comandos

<!-- O modelo usa exatamente estes comandos. Se o projeto usa make,
     pnpm, poetry etc., ajuste aqui E no settings.json (allow). -->

- `npm run test` — suíte completa com cobertura
- `npm run test:watch` — TDD loop
- `npm run check` — lint + type-check + testes (gate antes de commit)
- `npm run dev` — sobe ambiente local
- `npx prisma migrate dev --name <nome>` — nova migração

## Arquitetura e Estrutura

<!-- Resumo em ~10 linhas. O desenho completo vive em ./docs/arquitetura.md -->

```
src/
├── domain/          # entidades e regras de negócio puras (sem I/O)
├── application/     # casos de uso; orquestram domain + ports
├── infrastructure/  # Prisma, Redis, filas — implementações de ports
└── api/             # controllers, DTOs, validação de entrada
```

- Dependências apontam para dentro: `api → application → domain`.
  `domain` não importa nada das outras camadas.
- Detalhes: ver `./docs/arquitetura.md` e `./docs/modelo-dados.md`.

## Convenções Específicas do Projeto

<!-- Só o que difere do óbvio ou do global. Exemplos comuns: -->

- Nomes de domínio em pt-BR (`Ocorrencia`, `Despacho`); resto do código em inglês.
- Timestamps de domínio sempre em `America/Sao_Paulo`; persistência em UTC.
- Erros de negócio: exceções tipadas de `src/domain/errors/`; nunca `throw new Error(string)`.
- DTOs de entrada validados com [ex.: class-validator/Zod]; nada entra em `application` sem validação.
- [Regra de integração externa, se houver. Ex.: "Payloads FHIR validados
  contra o profile em ./docs/contratos/ antes de enviar."]

## Estratégia de Testes (metas deste projeto)

- `domain`: unit puros, sem I/O — cobertura mínima [95]%
- `application`: unit com fakes/mocks de ports — [90]%
- `infrastructure`: integração com banco real via testcontainers
- `api`: contract tests contra o schema OpenAPI
- CI bloqueia merge com cobertura global < [85]% ou suíte vermelha

## O que NUNCA fazer (específico deste projeto)

- Não editar migrações já aplicadas; sempre criar nova migração.
- Não usar `any` ou `@ts-ignore` sem comentário justificando em uma linha.
- Não criar endpoint sem atualizar o contrato OpenAPI e o teste de contrato.
- [Adicionar proibições descobertas durante a construção — via `#`]

## Lições Aprendidas

<!-- Seção alimentada pelo atalho `#` durante as sessões. Podar
     periodicamente: o que virou convenção sobe para a seção acima;
     o que ficou obsoleto sai. -->

- [vazio no início do projeto]
