# Apresentação — CBMDF Marketplace
### Roteiro de slides (pitch, 10 slides — baseado no [Documento de Visão](documento_de_visao.md))

> Cada bloco abaixo corresponde a um slide: título, conteúdo (bullets/tabelas prontos para colar) e notas do apresentador.

---

## Slide 1 — Capa
**CBMDF Marketplace**
Camada de Governança e Planejamento Logístico e Financeiro das Contratações e Aquisições do CBMDF

Agenda: Problema → Solução → Impacto → Plano de Ação → Termo de Abertura do Projeto

*Notas do apresentador:* Contextualizar rapidamente que se trata de uma proposta de sistema para organizar todo o ciclo de compras do CBMDF, do pedido do setor até o pagamento e a avaliação do fornecedor.

---

## Slide 2 — O Problema
- Setores do CBMDF solicitam materiais e serviços de forma **dispersa** (planilhas, ofícios, controles paralelos).
- **Sem visibilidade unificada** do andamento de cada pedido (DFD, TR, empenho, recebimento).
- **Sem consolidação automática** do impacto orçamentário no PCA/PLOA.
- Afeta toda a cadeia: setores requisitantes não sabem em que etapa está o pedido, a CESMA recebe demandas sem padronização, o Planejamento consolida PCA/PLOA manualmente, e a Direção decide com baixa previsibilidade e mais contratações emergenciais.

*Notas do apresentador:* O problema não é falta de processo, é falta de uma ferramenta única que una requisição, tramitação e orçamento.

---

## Slide 3 — A Causa-Raiz
> A causa-raiz **não é a periodicidade do Plano de Contratações Anual (PCA)** em si, mas a **ausência de um sistema institucional de governança** que transforme o planejamento das contratações em um **processo contínuo de gestão**.

- A periodicidade anual do PCA é apenas a **manifestação visível** dessa lacuna estrutural.
- Efeitos: baixa previsibilidade das demandas, fragilidade da priorização institucional, retrabalho, desarticulação entre os atores e aumento das contratações emergenciais.

*Notas do apresentador:* Slide-chave — a solução não pode ser "um formulário melhor", tem que endereçar a ausência de governança contínua.

---

## Slide 4 — A Solução: CBMDF Marketplace
- Uma plataforma única que cobre **todo o ciclo**: catálogo → carrinho → tramitação → contratações e atas → planejamento orçamentário/financeiro → avaliação do pedido.
- Mantra institucional: **"comprar melhor"** — reduzir compras pulverizadas, otimizar lotes de contratação, garantir contratações completas.
- **Planeja e governa; não executa.** O produto orquestra a federação de sistemas do setor público (Grifo, SISGEPAT, SIAFI, SEI, PNCP) em vez de substituí-los — a custódia logística e a execução financeiro-contábil permanecem nos sistemas donos desses registros. Não é um ERP: é a camada que hoje falta entre eles.
- Não é "um formulário melhor": é o instrumento que sustenta o **processo contínuo de governança das contratações** que hoje falta ao CBMDF.

*Notas do apresentador:* Ponte direta com a causa-raiz do slide anterior. Reforçar a fronteira "planejar/governar × executar" para prevenir a expectativa de que a solução seja um ERP.

---

## Slide 5 — Entrega incremental: cada Épico já é valor em produção
A solução **não depende de tudo pronto para ir ao ar**. Cada Épico do Documento de Visão é uma fatia funcional que pode ser lançada isoladamente — o Épico 01 já está prototipado e pode ir a produção primeiro; os demais se somam em ondas seguintes.

| Épico | Entrega | Status |
|---|---|---|
| 01 — Catálogo e Emissão de Pedidos | Setor monta e envia o pedido | ✅ Prototipado — pode ir a produção primeiro |
| 02 — Tramitação e Acompanhamento | Rastreio do status do pedido | ✅ Prototipado |
| 03 — Gestão de Contratações | Agrupamento de pedidos por classe | ✅ Prototipado |
| 04 — Gestão Orçamentária e Financeira | PCA/PLOA + limites por setor (SIAFI) | ✅ PCA/PLOA prototipado · limites a construir |
| 05 — Gestão de Atas (ARP) | Contratação ágil via atas vigentes | 🔧 A construir |
| 07 — Avaliação do Pedido | Requisitante avalia produto/fornecedor | 🔧 A construir |
| 06 — Assistente Virtual / IA | Orientação e sugestões correlatas | ⭐ Opcional / incremental |

*Notas do apresentador:* Este é o slide central da apresentação — cada linha da tabela é um incremento Scrum entregável e usável isoladamente, não um "tudo ou nada".

---

## Slide 6 — Impacto
**Benefícios por stakeholder:**
- **Requisitantes:** sabem o status do pedido e avaliam a experiência ao final.
- **CESMA / Gestor do Catálogo e Atas:** demandas padronizadas, atas sob controle, fornecedores avaliados.
- **Planejamento/Orçamento:** PCA/PLOA consolidados automaticamente, limites por setor monitorados.
- **Direção:** previsibilidade orçamentária, menos contratações emergenciais, decisões com dados atualizados.

**KPIs principais:**
| KPI | Meta |
|---|---|
| Tempo médio de tramitação (pedido → entregue) | Redução mensurável |
| Contratações emergenciais (fora do PCA) | Redução do volume |
| Diferença entre Planejado e Pago (PCA/PLOA) | Redução da divergência |
| Adoção pelos setores requisitantes | Uso recorrente |

---

## Slide 7 — Plano de Ação e Metodologia
- **Fases:** Validação do protótipo *(atual)* → Especificação técnica (backend, banco, autenticação) → Desenvolvimento incremental por épico → Homologação → Piloto → Expansão para todo o CBMDF.
- **Metodologia híbrida:** governança **PMI** (termo de abertura, marcos, riscos, partes interessadas) + execução **Scrum** (backlog por épico, sprints, entregas incrementais).
- Cada épico é um incremento entregável e testável com os usuários reais (requisitantes, CESMA, Planejamento) antes de avançar para o próximo.

---

# Termo de Abertura do Projeto (Project Charter)

## Slide 8 — Identificação, Justificativa e Escopo
- **Nome do projeto:** CBMDF Marketplace · **Patrocinador:** Comando/Direção do CBMDF · **Product Owner:** a definir · **Metodologia:** híbrida PMI + Scrum
- **Justificativa:** a causa-raiz é a ausência de um sistema institucional de governança contínua das contratações — não a periodicidade do PCA em si.
- **Objetivo:** implantar uma plataforma que transforme o planejamento em processo contínuo, sob o mantra **"comprar melhor"**.
- **Escopo incluso:** Épicos 01 a 05 e 07 (catálogo, tramitação, contratações, orçamento/financeiro, atas, avaliação) + integrações com Grifo, SISGEPAT, SEI, SIAFI e PNCP.
- **Escopo incremental/opcional:** Épico 06 — Assistente Virtual/IA, sem bloquear o Go-Live.
- **Fora de escopo:** módulos de licitação/pregão eletrônico; e a **execução** que permanece nos sistemas donos — custódia logística de estoque/patrimônio (Grifo/SISGEPAT) e execução financeiro-contábil (SIAFI). A solução planeja e orquestra, não executa esses registros.

## Slide 9 — Governança e Marcos
| Papel | Responsável |
|---|---|
| Sponsor | Comando/Direção do CBMDF |
| Product Owner | Representante do Planejamento/CESMA |
| Scrum Master | A definir |
| Equipe de Desenvolvimento | Equipe técnica do projeto |
| Stakeholders-chave | Requisitantes, CESMA, Gestor do Catálogo e Atas, Planejamento/Orçamento |

**Marcos macro (ondas de entrega por épico):**
1. Épicos 01-02 em produção (catálogo + tramitação)
2. Épico 03 (contratações) liberado
3. Épicos 04-05 (orçamento/financeiro + atas) e integrações liberados
4. Épico 07 (avaliação do pedido) liberado
5. Épico 06 (assistente/IA) — incremento opcional pós Go-Live

## Slide 10 — Riscos, Critérios de Sucesso e Aprovação
**Premissas e restrições:**
- Acesso à rede/intranet do CBMDF e disponibilidade das integrações Grifo/SISGEPAT/SEI/SIAFI/PNCP.
- Protótipo atual sem backend/autenticação; aderência à Lei nº 14.133/2021 e à LGPD; IA como componente incremental (Épico 06).

**Riscos preliminares:**
- Baixa adesão dos setores sem treinamento adequado.
- Atraso na arquitetura de backend impactar o cronograma.
- Tratar apenas o sintoma (periodicidade do PCA) sem endereçar a causa-raiz, reduzindo o projeto a "mais um formulário".

**Critérios de sucesso:** redução do tempo de tramitação · PCA/PLOA consolidados sem retrabalho · redução de contratações emergenciais · adoção recorrente pelos setores.

**Aprovação:**
`_____________________________`
Patrocinador — Comando/Direção do CBMDF

---
