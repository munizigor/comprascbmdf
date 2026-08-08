(function preloadCbmdfData() {
  const storageKey = 'cbmdf_orders';
  const ciclosKey = 'cbmdf_pca_ciclos';

  const seededOrders = [
    {
      "id": "PED-2027-0001",
      "data": "10/02/2026, 12:00:00",
      "criadoEm": "2026-02-10T12:00:00Z",
      "status": "DFD Registrado",
      "observacoes": "DEA para viatura de resgate; unidade sem equipamento operante.",
      "exercicioPca": 2027,
      "dfd": {
        "dataPretendida": "2027-03-31",
        "servicoContinuado": false,
        "vinculoPlanejamento": "Objetivo 3 — resposta a emergências cardiorrespiratórias"
      },
      "usuario": {
        "id": 2,
        "nome": "Carlos Eduardo",
        "matricula": "CBMDF-1047",
        "setor": "CESMA"
      },
      "itens": [
        {
          "id": 11,
          "nome": "Desfibrilador Externo Automático (DEA)",
          "categoria": "saude",
          "grupoCodigo": "65",
          "grupoNome": "EQUIPAMENTOS E ARTIGOS PARA USO MÉDICO, DENTÁRIO E VETERINÁRIO",
          "classeCodigo": "6515",
          "classeNome": "INSTRUMENTOS, EQUIPAMENTOS E SUPRIMENTOS MÉDICOS E CIRÚRGICOS",
          "tipo": "MATERIAL",
          "tipoDespesa": "Investimento",
          "naturezaDespesa": "4.4.90.52",
          "quantidade": 1,
          "urgencia": "alta",
          "precoUnitario": 6800,
          "subtotal": 6800,
          "itemUid": "PED-2027-0001-I1"
        }
      ],
      "priorizacao": {
        "criticidade": 5,
        "risco": 4,
        "obrigatoriedadeLegal": false,
        "prontidao": 1,
        "declaradoEm": "2026-02-10T12:00:00Z"
      },
      "avaliacao": {
        "criterios": {
          "qualidadeProduto": null,
          "fornecedor": null,
          "tempoProjeto": null,
          "comunicacaoSuporte": null,
          "atendeuExpectativa": null
        },
        "finalizada": false,
        "atualizadoEm": null,
        "finalizadoEm": null
      },
      "historico": [
        {
          "de": null,
          "para": "DFD Registrado",
          "em": "2026-02-10T12:00:00Z",
          "por": {
            "id": 2,
            "nome": "Carlos Eduardo",
            "matricula": "CBMDF-1047"
          },
          "perfil": "solicitante",
          "origem": "index.html",
          "justificativa": "Solicitação registrada pelo requisitante.",
          "excepcional": false,
          "aprovador": null,
          "migrado": false
        }
      ]
    },
    {
      "id": "PED-2027-0002",
      "data": "12/02/2026, 12:00:00",
      "criadoEm": "2026-02-12T12:00:00Z",
      "status": "DFD Registrado",
      "observacoes": "Reposição anual de vestuário operacional.",
      "exercicioPca": 2027,
      "dfd": {
        "dataPretendida": "2027-03-31",
        "servicoContinuado": false,
        "vinculoPlanejamento": "Reposição de EPI — exigência normativa"
      },
      "usuario": {
        "id": 4,
        "nome": "João Pedro",
        "matricula": "CBMDF-1108",
        "setor": "DIMAT"
      },
      "itens": [
        {
          "id": 1,
          "nome": "Capacete de proteção tático",
          "categoria": "seguranca",
          "grupoCodigo": "84",
          "grupoNome": "VESTUÁRIOS, EQUIPAMENTOS INDIVIDUAIS E INSÍGNIAS",
          "classeCodigo": "8415",
          "classeNome": "VESTUÁRIO PARA FINS ESPECIAIS",
          "tipo": "MATERIAL",
          "tipoDespesa": "Investimento",
          "naturezaDespesa": "4.4.90.52",
          "quantidade": 20,
          "urgencia": "normal",
          "precoUnitario": 125,
          "subtotal": 2500,
          "itemUid": "PED-2027-0002-I1"
        },
        {
          "id": 7,
          "nome": "Colete reflexivo operacional",
          "categoria": "seguranca",
          "grupoCodigo": "84",
          "grupoNome": "VESTUÁRIOS, EQUIPAMENTOS INDIVIDUAIS E INSÍGNIAS",
          "classeCodigo": "8415",
          "classeNome": "VESTUÁRIO PARA FINS ESPECIAIS",
          "tipo": "MATERIAL",
          "tipoDespesa": "Custeio",
          "naturezaDespesa": "3.3.90.30",
          "quantidade": 20,
          "urgencia": "normal",
          "precoUnitario": 72.5,
          "subtotal": 1450,
          "itemUid": "PED-2027-0002-I2"
        }
      ],
      "priorizacao": {
        "criticidade": 3,
        "risco": 3,
        "obrigatoriedadeLegal": true,
        "prontidao": 4,
        "declaradoEm": "2026-02-12T12:00:00Z",
        "instruidoPor": {
          "id": 3,
          "nome": "Fernanda Silva",
          "matricula": "CBMDF-1091"
        },
        "instruidoEm": "2026-02-15T12:00:00Z"
      },
      "avaliacao": {
        "criterios": {
          "qualidadeProduto": null,
          "fornecedor": null,
          "tempoProjeto": null,
          "comunicacaoSuporte": null,
          "atendeuExpectativa": null
        },
        "finalizada": false,
        "atualizadoEm": null,
        "finalizadoEm": null
      },
      "historico": [
        {
          "de": null,
          "para": "DFD Registrado",
          "em": "2026-02-12T12:00:00Z",
          "por": {
            "id": 4,
            "nome": "João Pedro",
            "matricula": "CBMDF-1108"
          },
          "perfil": "solicitante",
          "origem": "index.html",
          "justificativa": "Solicitação registrada pelo requisitante.",
          "excepcional": false,
          "aprovador": null,
          "migrado": false
        }
      ]
    },
    {
      "id": "PED-2027-0003",
      "data": "14/02/2026, 12:00:00",
      "criadoEm": "2026-02-14T12:00:00Z",
      "status": "DFD Aprovado pela Unidade",
      "observacoes": "Reposição de mangueiras e extintores da guarnição.",
      "exercicioPca": 2027,
      "dfd": {
        "dataPretendida": "2027-03-31",
        "servicoContinuado": false,
        "vinculoPlanejamento": "Manutenção da capacidade de combate a incêndio"
      },
      "usuario": {
        "id": 1,
        "nome": "Ana Beatriz",
        "matricula": "CBMDF-1023",
        "setor": "COMOP"
      },
      "itens": [
        {
          "id": 3,
          "nome": "Mangueira de incêndio 20m",
          "categoria": "seguranca",
          "grupoCodigo": "42",
          "grupoNome": "EQUIPAMENTO PARA COMBATE A INCÊNDIO, RESGATE E SEGURANÇA",
          "classeCodigo": "4210",
          "classeNome": "EQUIPAMENTOS PARA COMBATE A INCÊNDIO",
          "tipo": "MATERIAL",
          "tipoDespesa": "Investimento",
          "naturezaDespesa": "4.4.90.52",
          "quantidade": 10,
          "urgencia": "alta",
          "precoUnitario": 490,
          "subtotal": 4900,
          "itemUid": "PED-2027-0003-I1"
        },
        {
          "id": 4,
          "nome": "Extintor ABC 4kg",
          "categoria": "seguranca",
          "grupoCodigo": "42",
          "grupoNome": "EQUIPAMENTO PARA COMBATE A INCÊNDIO, RESGATE E SEGURANÇA",
          "classeCodigo": "4210",
          "classeNome": "EQUIPAMENTOS PARA COMBATE A INCÊNDIO",
          "tipo": "MATERIAL",
          "tipoDespesa": "Custeio",
          "naturezaDespesa": "3.3.90.30",
          "quantidade": 15,
          "urgencia": "normal",
          "precoUnitario": 158,
          "subtotal": 2370,
          "itemUid": "PED-2027-0003-I2"
        }
      ],
      "priorizacao": {
        "criticidade": 4,
        "risco": 4,
        "obrigatoriedadeLegal": false,
        "prontidao": 1,
        "declaradoEm": "2026-02-14T12:00:00Z",
        "override": {
          "posicao": 1,
          "justificativa": "Ajuste manual: prioridade determinada pelo Comitê de Governança.",
          "por": {
            "id": 5,
            "nome": "Maria Oliveira",
            "matricula": "CBMDF-1122"
          },
          "em": "2026-02-19T12:00:00Z"
        }
      },
      "avaliacao": {
        "criterios": {
          "qualidadeProduto": null,
          "fornecedor": null,
          "tempoProjeto": null,
          "comunicacaoSuporte": null,
          "atendeuExpectativa": null
        },
        "finalizada": false,
        "atualizadoEm": null,
        "finalizadoEm": null
      },
      "historico": [
        {
          "de": null,
          "para": "DFD Registrado",
          "em": "2026-02-14T12:00:00Z",
          "por": {
            "id": 1,
            "nome": "Ana Beatriz",
            "matricula": "CBMDF-1023"
          },
          "perfil": "solicitante",
          "origem": "index.html",
          "justificativa": "Solicitação registrada pelo requisitante.",
          "excepcional": false,
          "aprovador": null,
          "migrado": false
        },
        {
          "de": "DFD Registrado",
          "para": "DFD Aprovado pela Unidade",
          "em": "2026-02-19T12:00:00Z",
          "por": {
            "id": 1,
            "nome": "Ana Beatriz",
            "matricula": "CBMDF-1023"
          },
          "perfil": "gestor",
          "origem": "status.html",
          "justificativa": "Demanda validada pela autoridade da unidade requisitante.",
          "excepcional": false,
          "aprovador": {
            "id": 1,
            "nome": "Ana Beatriz",
            "matricula": "CBMDF-1023"
          },
          "migrado": false
        }
      ]
    },
    {
      "id": "PED-2027-0004",
      "data": "16/02/2026, 12:00:00",
      "criadoEm": "2026-02-16T12:00:00Z",
      "status": "DFD Aprovado pela Unidade",
      "observacoes": "Sem criticidade declarada — nota derivada da urgência.",
      "exercicioPca": 2027,
      "dfd": {
        "dataPretendida": "2027-03-31",
        "servicoContinuado": false,
        "vinculoPlanejamento": "Apoio a inspeções noturnas"
      },
      "usuario": {
        "id": 5,
        "nome": "Maria Oliveira",
        "matricula": "CBMDF-1122",
        "setor": "COMAP"
      },
      "itens": [
        {
          "id": 6,
          "nome": "Lanterna tática recarregável",
          "categoria": "manutencao",
          "grupoCodigo": "62",
          "grupoNome": "LÂMPADAS E ACCSSÓRIOS DE ILUMINAÇÃO",
          "classeCodigo": "6230",
          "classeNome": "LÂMPADAS ELÉTRICAS PORTÁTEIS E DISPOSITIVOS DE FIXAÇÃO",
          "tipo": "MATERIAL",
          "tipoDespesa": "Custeio",
          "naturezaDespesa": "3.3.90.30",
          "quantidade": 8,
          "urgencia": "media",
          "precoUnitario": 86,
          "subtotal": 688,
          "itemUid": "PED-2027-0004-I1"
        }
      ],
      "priorizacao": {
        "criticidade": null,
        "risco": null,
        "obrigatoriedadeLegal": false,
        "prontidao": 1,
        "declaradoEm": null
      },
      "avaliacao": {
        "criterios": {
          "qualidadeProduto": null,
          "fornecedor": null,
          "tempoProjeto": null,
          "comunicacaoSuporte": null,
          "atendeuExpectativa": null
        },
        "finalizada": false,
        "atualizadoEm": null,
        "finalizadoEm": null
      },
      "historico": [
        {
          "de": null,
          "para": "DFD Registrado",
          "em": "2026-02-16T12:00:00Z",
          "por": {
            "id": 5,
            "nome": "Maria Oliveira",
            "matricula": "CBMDF-1122"
          },
          "perfil": "solicitante",
          "origem": "index.html",
          "justificativa": "Solicitação registrada pelo requisitante.",
          "excepcional": false,
          "aprovador": null,
          "migrado": false
        },
        {
          "de": "DFD Registrado",
          "para": "DFD Aprovado pela Unidade",
          "em": "2026-02-21T12:00:00Z",
          "por": {
            "id": 1,
            "nome": "Ana Beatriz",
            "matricula": "CBMDF-1023"
          },
          "perfil": "gestor",
          "origem": "status.html",
          "justificativa": "Demanda validada pela autoridade da unidade requisitante.",
          "excepcional": false,
          "aprovador": {
            "id": 1,
            "nome": "Ana Beatriz",
            "matricula": "CBMDF-1023"
          },
          "migrado": false
        }
      ]
    },
    {
      "id": "PED-2027-0005",
      "data": "18/02/2026, 12:00:00",
      "criadoEm": "2026-02-18T12:00:00Z",
      "status": "Em Análise Setorial",
      "observacoes": "",
      "exercicioPca": 2027,
      "dfd": {
        "dataPretendida": "2027-03-31",
        "servicoContinuado": false,
        "vinculoPlanejamento": "Comunicação operacional"
      },
      "usuario": {
        "id": 3,
        "nome": "Fernanda Silva",
        "matricula": "CBMDF-1091",
        "setor": "DITIC"
      },
      "itens": [
        {
          "id": 5,
          "nome": "Rádio comunicador portátil HT",
          "categoria": "manutencao",
          "grupoCodigo": "58",
          "grupoNome": "EQUIPAMENTOS DE COMUNICAÇÃO, DETECÇÃO E RADIAÇÃO COERENTE",
          "classeCodigo": "5820",
          "classeNome": "EQUIPAMENTOS DE COMUNICAÇÃO DE RÁDIO E TELEVISÃO, EXCETO AÉREOS",
          "tipo": "MATERIAL",
          "tipoDespesa": "Investimento",
          "naturezaDespesa": "4.4.90.52",
          "quantidade": 6,
          "urgencia": "normal",
          "precoUnitario": 220,
          "subtotal": 1320,
          "itemUid": "PED-2027-0005-I1"
        }
      ],
      "priorizacao": {
        "criticidade": 2,
        "risco": 3,
        "obrigatoriedadeLegal": false,
        "prontidao": 1,
        "declaradoEm": "2026-02-18T12:00:00Z"
      },
      "avaliacao": {
        "criterios": {
          "qualidadeProduto": null,
          "fornecedor": null,
          "tempoProjeto": null,
          "comunicacaoSuporte": null,
          "atendeuExpectativa": null
        },
        "finalizada": false,
        "atualizadoEm": null,
        "finalizadoEm": null
      },
      "historico": [
        {
          "de": null,
          "para": "DFD Registrado",
          "em": "2026-02-18T12:00:00Z",
          "por": {
            "id": 3,
            "nome": "Fernanda Silva",
            "matricula": "CBMDF-1091"
          },
          "perfil": "solicitante",
          "origem": "index.html",
          "justificativa": "Solicitação registrada pelo requisitante.",
          "excepcional": false,
          "aprovador": null,
          "migrado": false
        },
        {
          "de": "DFD Registrado",
          "para": "DFD Aprovado pela Unidade",
          "em": "2026-02-23T12:00:00Z",
          "por": {
            "id": 1,
            "nome": "Ana Beatriz",
            "matricula": "CBMDF-1023"
          },
          "perfil": "gestor",
          "origem": "status.html",
          "justificativa": "Demanda validada pela autoridade da unidade requisitante.",
          "excepcional": false,
          "aprovador": {
            "id": 1,
            "nome": "Ana Beatriz",
            "matricula": "CBMDF-1023"
          },
          "migrado": false
        },
        {
          "de": "DFD Aprovado pela Unidade",
          "para": "Em Análise Setorial",
          "em": "2026-02-28T12:00:00Z",
          "por": {
            "id": 3,
            "nome": "Fernanda Silva",
            "matricula": "CBMDF-1091"
          },
          "perfil": "compras",
          "origem": "status.html",
          "justificativa": null,
          "excepcional": false,
          "aprovador": null,
          "migrado": false
        }
      ]
    },
    {
      "id": "PED-2027-0006",
      "data": "20/02/2026, 12:00:00",
      "criadoEm": "2026-02-20T12:00:00Z",
      "status": "Em Análise Setorial",
      "observacoes": "Kits de APH para ambulâncias.",
      "exercicioPca": 2027,
      "dfd": {
        "dataPretendida": "2027-03-31",
        "servicoContinuado": false,
        "vinculoPlanejamento": "Atendimento pré-hospitalar"
      },
      "usuario": {
        "id": 2,
        "nome": "Carlos Eduardo",
        "matricula": "CBMDF-1047",
        "setor": "CESMA"
      },
      "itens": [
        {
          "id": 8,
          "nome": "Kit de primeiros socorros APH",
          "categoria": "higiene",
          "grupoCodigo": "65",
          "grupoNome": "EQUIPAMENTOS E ARTIGOS PARA USO MÉDICO, DENTÁRIO E VETERINÁRIO",
          "classeCodigo": "6510",
          "classeNome": "MATERIAIS CIRÚRGICOS PARA CURATIVOS",
          "tipo": "MATERIAL",
          "tipoDespesa": "Custeio",
          "naturezaDespesa": "3.3.90.30",
          "quantidade": 12,
          "urgencia": "alta",
          "precoUnitario": 135,
          "subtotal": 1620,
          "itemUid": "PED-2027-0006-I1"
        }
      ],
      "priorizacao": {
        "criticidade": 4,
        "risco": 5,
        "obrigatoriedadeLegal": true,
        "prontidao": 5,
        "declaradoEm": "2026-02-20T12:00:00Z",
        "instruidoPor": {
          "id": 3,
          "nome": "Fernanda Silva",
          "matricula": "CBMDF-1091"
        },
        "instruidoEm": "2026-02-23T12:00:00Z"
      },
      "avaliacao": {
        "criterios": {
          "qualidadeProduto": null,
          "fornecedor": null,
          "tempoProjeto": null,
          "comunicacaoSuporte": null,
          "atendeuExpectativa": null
        },
        "finalizada": false,
        "atualizadoEm": null,
        "finalizadoEm": null
      },
      "historico": [
        {
          "de": null,
          "para": "DFD Registrado",
          "em": "2026-02-20T12:00:00Z",
          "por": {
            "id": 2,
            "nome": "Carlos Eduardo",
            "matricula": "CBMDF-1047"
          },
          "perfil": "solicitante",
          "origem": "index.html",
          "justificativa": "Solicitação registrada pelo requisitante.",
          "excepcional": false,
          "aprovador": null,
          "migrado": false
        },
        {
          "de": "DFD Registrado",
          "para": "DFD Aprovado pela Unidade",
          "em": "2026-02-25T12:00:00Z",
          "por": {
            "id": 1,
            "nome": "Ana Beatriz",
            "matricula": "CBMDF-1023"
          },
          "perfil": "gestor",
          "origem": "status.html",
          "justificativa": "Demanda validada pela autoridade da unidade requisitante.",
          "excepcional": false,
          "aprovador": {
            "id": 1,
            "nome": "Ana Beatriz",
            "matricula": "CBMDF-1023"
          },
          "migrado": false
        },
        {
          "de": "DFD Aprovado pela Unidade",
          "para": "Em Análise Setorial",
          "em": "2026-03-02T12:00:00Z",
          "por": {
            "id": 3,
            "nome": "Fernanda Silva",
            "matricula": "CBMDF-1091"
          },
          "perfil": "compras",
          "origem": "status.html",
          "justificativa": null,
          "excepcional": false,
          "aprovador": null,
          "migrado": false
        }
      ]
    },
    {
      "id": "PED-2027-0007",
      "data": "22/02/2026, 12:00:00",
      "criadoEm": "2026-02-22T12:00:00Z",
      "status": "Aguardando Suplementação",
      "observacoes": "Saldo do setor insuficiente; suplementação solicitada.",
      "exercicioPca": 2027,
      "dfd": {
        "dataPretendida": "2027-03-31",
        "servicoContinuado": false,
        "vinculoPlanejamento": "Salvamento em altura"
      },
      "usuario": {
        "id": 4,
        "nome": "João Pedro",
        "matricula": "CBMDF-1108",
        "setor": "DIMAT"
      },
      "itens": [
        {
          "id": 13,
          "nome": "Cinto / Baudrier para Salvamento em Altura",
          "categoria": "seguranca",
          "grupoCodigo": "42",
          "grupoNome": "EQUIPAMENTO PARA COMBATE A INCÊNDIO, RESGATE E SEGURANÇA",
          "classeCodigo": "4240",
          "classeNome": "EQUIPAMENTO PARA SEGURANÇA E SALVAMENTO",
          "tipo": "MATERIAL",
          "tipoDespesa": "Investimento",
          "naturezaDespesa": "4.4.90.52",
          "quantidade": 4,
          "urgencia": "normal",
          "precoUnitario": 890,
          "subtotal": 3560,
          "itemUid": "PED-2027-0007-I1"
        }
      ],
      "priorizacao": {
        "criticidade": 3,
        "risco": 2,
        "obrigatoriedadeLegal": false,
        "prontidao": 1,
        "declaradoEm": "2026-02-22T12:00:00Z"
      },
      "avaliacao": {
        "criterios": {
          "qualidadeProduto": null,
          "fornecedor": null,
          "tempoProjeto": null,
          "comunicacaoSuporte": null,
          "atendeuExpectativa": null
        },
        "finalizada": false,
        "atualizadoEm": null,
        "finalizadoEm": null
      },
      "historico": [
        {
          "de": null,
          "para": "DFD Registrado",
          "em": "2026-02-22T12:00:00Z",
          "por": {
            "id": 4,
            "nome": "João Pedro",
            "matricula": "CBMDF-1108"
          },
          "perfil": "solicitante",
          "origem": "index.html",
          "justificativa": "Solicitação registrada pelo requisitante.",
          "excepcional": false,
          "aprovador": null,
          "migrado": false
        },
        {
          "de": "DFD Registrado",
          "para": "DFD Aprovado pela Unidade",
          "em": "2026-02-27T12:00:00Z",
          "por": {
            "id": 1,
            "nome": "Ana Beatriz",
            "matricula": "CBMDF-1023"
          },
          "perfil": "gestor",
          "origem": "status.html",
          "justificativa": "Demanda validada pela autoridade da unidade requisitante.",
          "excepcional": false,
          "aprovador": {
            "id": 1,
            "nome": "Ana Beatriz",
            "matricula": "CBMDF-1023"
          },
          "migrado": false
        },
        {
          "de": "DFD Aprovado pela Unidade",
          "para": "Em Análise Setorial",
          "em": "2026-03-04T12:00:00Z",
          "por": {
            "id": 3,
            "nome": "Fernanda Silva",
            "matricula": "CBMDF-1091"
          },
          "perfil": "compras",
          "origem": "status.html",
          "justificativa": null,
          "excepcional": false,
          "aprovador": null,
          "migrado": false
        },
        {
          "de": "Em Análise Setorial",
          "para": "Aguardando Suplementação",
          "em": "2026-03-09T12:00:00Z",
          "por": {
            "id": 3,
            "nome": "Fernanda Silva",
            "matricula": "CBMDF-1091"
          },
          "perfil": "compras",
          "origem": "orcamento-setorial.html",
          "justificativa": "Saldo setorial insuficiente; suplementação solicitada.",
          "excepcional": false,
          "aprovador": null,
          "migrado": false
        }
      ]
    },
    {
      "id": "PED-2027-0008",
      "data": "24/02/2026, 12:00:00",
      "criadoEm": "2026-02-24T12:00:00Z",
      "status": "DFD Devolvido para Ajuste",
      "observacoes": "Devolvido para detalhar especificação.",
      "exercicioPca": 2027,
      "dfd": {
        "dataPretendida": "2027-03-31",
        "servicoContinuado": false,
        "vinculoPlanejamento": "Limpeza e desinfecção"
      },
      "usuario": {
        "id": 1,
        "nome": "Ana Beatriz",
        "matricula": "CBMDF-1023",
        "setor": "COMOP"
      },
      "itens": [
        {
          "id": 9,
          "nome": "Água sanitária 5L",
          "categoria": "higiene",
          "grupoCodigo": "79",
          "grupoNome": "EQUIPAMENTOS E MATERIAIS PARA LIMPEZA",
          "classeCodigo": "7930",
          "classeNome": "COMPOSTOS E PREPARADOS PARA LIMPEZA E POLIMENTO",
          "tipo": "MATERIAL",
          "tipoDespesa": "Custeio",
          "naturezaDespesa": "3.3.90.30",
          "quantidade": 30,
          "urgencia": "normal",
          "precoUnitario": 24.9,
          "subtotal": 747,
          "itemUid": "PED-2027-0008-I1"
        }
      ],
      "priorizacao": {
        "criticidade": 1,
        "risco": 1,
        "obrigatoriedadeLegal": false,
        "prontidao": 1,
        "declaradoEm": "2026-02-24T12:00:00Z"
      },
      "avaliacao": {
        "criterios": {
          "qualidadeProduto": null,
          "fornecedor": null,
          "tempoProjeto": null,
          "comunicacaoSuporte": null,
          "atendeuExpectativa": null
        },
        "finalizada": false,
        "atualizadoEm": null,
        "finalizadoEm": null
      },
      "historico": [
        {
          "de": null,
          "para": "DFD Registrado",
          "em": "2026-02-24T12:00:00Z",
          "por": {
            "id": 1,
            "nome": "Ana Beatriz",
            "matricula": "CBMDF-1023"
          },
          "perfil": "solicitante",
          "origem": "index.html",
          "justificativa": "Solicitação registrada pelo requisitante.",
          "excepcional": false,
          "aprovador": null,
          "migrado": false
        },
        {
          "de": "DFD Registrado",
          "para": "DFD Devolvido para Ajuste",
          "em": "2026-03-01T12:00:00Z",
          "por": {
            "id": 1,
            "nome": "Ana Beatriz",
            "matricula": "CBMDF-1023"
          },
          "perfil": "gestor",
          "origem": "status.html",
          "justificativa": "Devolvido: especificação técnica incompleta; refazer o DFD.",
          "excepcional": false,
          "aprovador": null,
          "migrado": false
        }
      ]
    },
    {
      "id": "PED-2027-0009",
      "data": "26/02/2026, 12:00:00",
      "criadoEm": "2026-02-26T12:00:00Z",
      "status": "Consolidado em Item de PCA",
      "observacoes": "",
      "exercicioPca": 2027,
      "dfd": {
        "dataPretendida": "2027-03-31",
        "servicoContinuado": false,
        "vinculoPlanejamento": "Imobilização de vítimas"
      },
      "usuario": {
        "id": 5,
        "nome": "Maria Oliveira",
        "matricula": "CBMDF-1122",
        "setor": "COMAP"
      },
      "itens": [
        {
          "id": 12,
          "nome": "Prancha Rígida de Imobilização com Tirantes",
          "categoria": "seguranca",
          "grupoCodigo": "42",
          "grupoNome": "EQUIPAMENTO PARA COMBATE A INCÊNDIO, RESGATE E SEGURANÇA",
          "classeCodigo": "4240",
          "classeNome": "EQUIPAMENTO PARA SEGURANÇA E SALVAMENTO",
          "tipo": "MATERIAL",
          "tipoDespesa": "Investimento",
          "naturezaDespesa": "4.4.90.52",
          "quantidade": 6,
          "urgencia": "normal",
          "precoUnitario": 450,
          "subtotal": 2700,
          "itemUid": "PED-2027-0009-I1"
        }
      ],
      "priorizacao": {
        "criticidade": 4,
        "risco": 4,
        "obrigatoriedadeLegal": false,
        "prontidao": 4,
        "declaradoEm": "2026-02-26T12:00:00Z",
        "instruidoPor": {
          "id": 3,
          "nome": "Fernanda Silva",
          "matricula": "CBMDF-1091"
        },
        "instruidoEm": "2026-03-01T12:00:00Z"
      },
      "avaliacao": {
        "criterios": {
          "qualidadeProduto": null,
          "fornecedor": null,
          "tempoProjeto": null,
          "comunicacaoSuporte": null,
          "atendeuExpectativa": null
        },
        "finalizada": false,
        "atualizadoEm": null,
        "finalizadoEm": null
      },
      "historico": [
        {
          "de": null,
          "para": "DFD Registrado",
          "em": "2026-02-26T12:00:00Z",
          "por": {
            "id": 5,
            "nome": "Maria Oliveira",
            "matricula": "CBMDF-1122"
          },
          "perfil": "solicitante",
          "origem": "index.html",
          "justificativa": "Solicitação registrada pelo requisitante.",
          "excepcional": false,
          "aprovador": null,
          "migrado": false
        },
        {
          "de": "DFD Registrado",
          "para": "DFD Aprovado pela Unidade",
          "em": "2026-03-03T12:00:00Z",
          "por": {
            "id": 1,
            "nome": "Ana Beatriz",
            "matricula": "CBMDF-1023"
          },
          "perfil": "gestor",
          "origem": "status.html",
          "justificativa": "Demanda validada pela autoridade da unidade requisitante.",
          "excepcional": false,
          "aprovador": {
            "id": 1,
            "nome": "Ana Beatriz",
            "matricula": "CBMDF-1023"
          },
          "migrado": false
        },
        {
          "de": "DFD Aprovado pela Unidade",
          "para": "Em Análise Setorial",
          "em": "2026-03-08T12:00:00Z",
          "por": {
            "id": 3,
            "nome": "Fernanda Silva",
            "matricula": "CBMDF-1091"
          },
          "perfil": "compras",
          "origem": "status.html",
          "justificativa": null,
          "excepcional": false,
          "aprovador": null,
          "migrado": false
        },
        {
          "de": "Em Análise Setorial",
          "para": "Consolidado em Item de PCA",
          "em": "2026-03-13T12:00:00Z",
          "por": {
            "id": 3,
            "nome": "Fernanda Silva",
            "matricula": "CBMDF-1091"
          },
          "perfil": "compras",
          "origem": "status.html",
          "justificativa": null,
          "excepcional": false,
          "aprovador": null,
          "migrado": false
        }
      ]
    },
    {
      "id": "PED-2027-0010",
      "data": "28/02/2026, 12:00:00",
      "criadoEm": "2026-02-28T12:00:00Z",
      "status": "PCA Aguardando Aprovação",
      "observacoes": "",
      "exercicioPca": 2027,
      "dfd": {
        "dataPretendida": "2027-03-31",
        "servicoContinuado": false,
        "vinculoPlanejamento": "Combate a incêndio"
      },
      "usuario": {
        "id": 2,
        "nome": "Carlos Eduardo",
        "matricula": "CBMDF-1047",
        "setor": "CESMA"
      },
      "itens": [
        {
          "id": 3,
          "nome": "Mangueira de incêndio 20m",
          "categoria": "seguranca",
          "grupoCodigo": "42",
          "grupoNome": "EQUIPAMENTO PARA COMBATE A INCÊNDIO, RESGATE E SEGURANÇA",
          "classeCodigo": "4210",
          "classeNome": "EQUIPAMENTOS PARA COMBATE A INCÊNDIO",
          "tipo": "MATERIAL",
          "tipoDespesa": "Investimento",
          "naturezaDespesa": "4.4.90.52",
          "quantidade": 8,
          "urgencia": "normal",
          "precoUnitario": 490,
          "subtotal": 3920,
          "itemUid": "PED-2027-0010-I1"
        }
      ],
      "priorizacao": {
        "criticidade": 4,
        "risco": 3,
        "obrigatoriedadeLegal": false,
        "prontidao": 3,
        "declaradoEm": "2026-02-28T12:00:00Z",
        "instruidoPor": {
          "id": 3,
          "nome": "Fernanda Silva",
          "matricula": "CBMDF-1091"
        },
        "instruidoEm": "2026-03-03T12:00:00Z"
      },
      "avaliacao": {
        "criterios": {
          "qualidadeProduto": null,
          "fornecedor": null,
          "tempoProjeto": null,
          "comunicacaoSuporte": null,
          "atendeuExpectativa": null
        },
        "finalizada": false,
        "atualizadoEm": null,
        "finalizadoEm": null
      },
      "historico": [
        {
          "de": null,
          "para": "DFD Registrado",
          "em": "2026-02-28T12:00:00Z",
          "por": {
            "id": 2,
            "nome": "Carlos Eduardo",
            "matricula": "CBMDF-1047"
          },
          "perfil": "solicitante",
          "origem": "index.html",
          "justificativa": "Solicitação registrada pelo requisitante.",
          "excepcional": false,
          "aprovador": null,
          "migrado": false
        },
        {
          "de": "DFD Registrado",
          "para": "DFD Aprovado pela Unidade",
          "em": "2026-03-05T12:00:00Z",
          "por": {
            "id": 1,
            "nome": "Ana Beatriz",
            "matricula": "CBMDF-1023"
          },
          "perfil": "gestor",
          "origem": "status.html",
          "justificativa": "Demanda validada pela autoridade da unidade requisitante.",
          "excepcional": false,
          "aprovador": {
            "id": 1,
            "nome": "Ana Beatriz",
            "matricula": "CBMDF-1023"
          },
          "migrado": false
        },
        {
          "de": "DFD Aprovado pela Unidade",
          "para": "Em Análise Setorial",
          "em": "2026-03-10T12:00:00Z",
          "por": {
            "id": 3,
            "nome": "Fernanda Silva",
            "matricula": "CBMDF-1091"
          },
          "perfil": "compras",
          "origem": "status.html",
          "justificativa": null,
          "excepcional": false,
          "aprovador": null,
          "migrado": false
        },
        {
          "de": "Em Análise Setorial",
          "para": "Consolidado em Item de PCA",
          "em": "2026-03-15T12:00:00Z",
          "por": {
            "id": 3,
            "nome": "Fernanda Silva",
            "matricula": "CBMDF-1091"
          },
          "perfil": "compras",
          "origem": "status.html",
          "justificativa": null,
          "excepcional": false,
          "aprovador": null,
          "migrado": false
        },
        {
          "de": "Consolidado em Item de PCA",
          "para": "PCA Aguardando Aprovação",
          "em": "2026-03-20T12:00:00Z",
          "por": {
            "id": 3,
            "nome": "Fernanda Silva",
            "matricula": "CBMDF-1091"
          },
          "perfil": "compras",
          "origem": "status.html",
          "justificativa": null,
          "excepcional": false,
          "aprovador": null,
          "migrado": false
        }
      ]
    },
    {
      "id": "PED-2027-0011",
      "data": "02/03/2026, 12:00:00",
      "criadoEm": "2026-03-02T12:00:00Z",
      "status": "Incluído no PCA",
      "observacoes": "Publicado no PNCP via aprovação formal.",
      "exercicioPca": 2027,
      "dfd": {
        "dataPretendida": "2027-03-31",
        "servicoContinuado": false,
        "vinculoPlanejamento": "EPI"
      },
      "usuario": {
        "id": 4,
        "nome": "João Pedro",
        "matricula": "CBMDF-1108",
        "setor": "DIMAT"
      },
      "itens": [
        {
          "id": 1,
          "nome": "Capacete de proteção tático",
          "categoria": "seguranca",
          "grupoCodigo": "84",
          "grupoNome": "VESTUÁRIOS, EQUIPAMENTOS INDIVIDUAIS E INSÍGNIAS",
          "classeCodigo": "8415",
          "classeNome": "VESTUÁRIO PARA FINS ESPECIAIS",
          "tipo": "MATERIAL",
          "tipoDespesa": "Investimento",
          "naturezaDespesa": "4.4.90.52",
          "quantidade": 30,
          "urgencia": "normal",
          "precoUnitario": 125,
          "subtotal": 3750,
          "itemUid": "PED-2027-0011-I1"
        }
      ],
      "priorizacao": {
        "criticidade": 3,
        "risco": 3,
        "obrigatoriedadeLegal": false,
        "prontidao": 4,
        "declaradoEm": "2026-03-02T12:00:00Z",
        "instruidoPor": {
          "id": 3,
          "nome": "Fernanda Silva",
          "matricula": "CBMDF-1091"
        },
        "instruidoEm": "2026-03-05T12:00:00Z"
      },
      "avaliacao": {
        "criterios": {
          "qualidadeProduto": null,
          "fornecedor": null,
          "tempoProjeto": null,
          "comunicacaoSuporte": null,
          "atendeuExpectativa": null
        },
        "finalizada": false,
        "atualizadoEm": null,
        "finalizadoEm": null
      },
      "historico": [
        {
          "de": null,
          "para": "DFD Registrado",
          "em": "2026-03-02T12:00:00Z",
          "por": {
            "id": 4,
            "nome": "João Pedro",
            "matricula": "CBMDF-1108"
          },
          "perfil": "solicitante",
          "origem": "index.html",
          "justificativa": "Solicitação registrada pelo requisitante.",
          "excepcional": false,
          "aprovador": null,
          "migrado": false
        },
        {
          "de": "DFD Registrado",
          "para": "DFD Aprovado pela Unidade",
          "em": "2026-03-07T12:00:00Z",
          "por": {
            "id": 1,
            "nome": "Ana Beatriz",
            "matricula": "CBMDF-1023"
          },
          "perfil": "gestor",
          "origem": "status.html",
          "justificativa": "Demanda validada pela autoridade da unidade requisitante.",
          "excepcional": false,
          "aprovador": {
            "id": 1,
            "nome": "Ana Beatriz",
            "matricula": "CBMDF-1023"
          },
          "migrado": false
        },
        {
          "de": "DFD Aprovado pela Unidade",
          "para": "Em Análise Setorial",
          "em": "2026-03-12T12:00:00Z",
          "por": {
            "id": 3,
            "nome": "Fernanda Silva",
            "matricula": "CBMDF-1091"
          },
          "perfil": "compras",
          "origem": "status.html",
          "justificativa": null,
          "excepcional": false,
          "aprovador": null,
          "migrado": false
        },
        {
          "de": "Em Análise Setorial",
          "para": "Consolidado em Item de PCA",
          "em": "2026-03-17T12:00:00Z",
          "por": {
            "id": 3,
            "nome": "Fernanda Silva",
            "matricula": "CBMDF-1091"
          },
          "perfil": "compras",
          "origem": "status.html",
          "justificativa": null,
          "excepcional": false,
          "aprovador": null,
          "migrado": false
        },
        {
          "de": "Consolidado em Item de PCA",
          "para": "PCA Aguardando Aprovação",
          "em": "2026-03-22T12:00:00Z",
          "por": {
            "id": 3,
            "nome": "Fernanda Silva",
            "matricula": "CBMDF-1091"
          },
          "perfil": "compras",
          "origem": "status.html",
          "justificativa": null,
          "excepcional": false,
          "aprovador": null,
          "migrado": false
        },
        {
          "de": "PCA Aguardando Aprovação",
          "para": "Incluído no PCA",
          "em": "2026-03-27T12:00:00Z",
          "por": {
            "id": 3,
            "nome": "Fernanda Silva",
            "matricula": "CBMDF-1091"
          },
          "perfil": "compras",
          "origem": "status.html",
          "justificativa": "Aprovado pela autoridade competente e publicado no PNCP.",
          "excepcional": false,
          "aprovador": {
            "id": 5,
            "nome": "Maria Oliveira",
            "matricula": "CBMDF-1122"
          },
          "migrado": false
        }
      ]
    },
    {
      "id": "PED-2027-0012",
      "data": "04/03/2026, 12:00:00",
      "criadoEm": "2026-03-04T12:00:00Z",
      "status": "Incluído no PCA (Urgência)",
      "observacoes": "Inclusão por urgência aprovada pelo comitê.",
      "exercicioPca": 2027,
      "dfd": {
        "dataPretendida": "2027-03-31",
        "servicoContinuado": false,
        "vinculoPlanejamento": "Emergência cardiorrespiratória"
      },
      "usuario": {
        "id": 1,
        "nome": "Ana Beatriz",
        "matricula": "CBMDF-1023",
        "setor": "COMOP"
      },
      "itens": [
        {
          "id": 11,
          "nome": "Desfibrilador Externo Automático (DEA)",
          "categoria": "saude",
          "grupoCodigo": "65",
          "grupoNome": "EQUIPAMENTOS E ARTIGOS PARA USO MÉDICO, DENTÁRIO E VETERINÁRIO",
          "classeCodigo": "6515",
          "classeNome": "INSTRUMENTOS, EQUIPAMENTOS E SUPRIMENTOS MÉDICOS E CIRÚRGICOS",
          "tipo": "MATERIAL",
          "tipoDespesa": "Investimento",
          "naturezaDespesa": "4.4.90.52",
          "quantidade": 1,
          "urgencia": "alta",
          "precoUnitario": 6800,
          "subtotal": 6800,
          "itemUid": "PED-2027-0012-I1"
        }
      ],
      "priorizacao": {
        "criticidade": 5,
        "risco": 5,
        "obrigatoriedadeLegal": false,
        "prontidao": 1,
        "declaradoEm": "2026-03-04T12:00:00Z"
      },
      "avaliacao": {
        "criterios": {
          "qualidadeProduto": null,
          "fornecedor": null,
          "tempoProjeto": null,
          "comunicacaoSuporte": null,
          "atendeuExpectativa": null
        },
        "finalizada": false,
        "atualizadoEm": null,
        "finalizadoEm": null
      },
      "historico": [
        {
          "de": null,
          "para": "DFD Registrado",
          "em": "2026-03-04T12:00:00Z",
          "por": {
            "id": 1,
            "nome": "Ana Beatriz",
            "matricula": "CBMDF-1023"
          },
          "perfil": "solicitante",
          "origem": "index.html",
          "justificativa": "Solicitação registrada pelo requisitante.",
          "excepcional": false,
          "aprovador": null,
          "migrado": false
        },
        {
          "de": "DFD Registrado",
          "para": "DFD Aprovado pela Unidade",
          "em": "2026-03-09T12:00:00Z",
          "por": {
            "id": 1,
            "nome": "Ana Beatriz",
            "matricula": "CBMDF-1023"
          },
          "perfil": "gestor",
          "origem": "status.html",
          "justificativa": "Demanda validada pela autoridade da unidade requisitante.",
          "excepcional": false,
          "aprovador": {
            "id": 1,
            "nome": "Ana Beatriz",
            "matricula": "CBMDF-1023"
          },
          "migrado": false
        },
        {
          "de": "DFD Aprovado pela Unidade",
          "para": "Em Análise Setorial",
          "em": "2026-03-14T12:00:00Z",
          "por": {
            "id": 3,
            "nome": "Fernanda Silva",
            "matricula": "CBMDF-1091"
          },
          "perfil": "compras",
          "origem": "status.html",
          "justificativa": null,
          "excepcional": false,
          "aprovador": null,
          "migrado": false
        },
        {
          "de": "Em Análise Setorial",
          "para": "Incluído no PCA (Urgência)",
          "em": "2026-03-19T12:00:00Z",
          "por": {
            "id": 3,
            "nome": "Fernanda Silva",
            "matricula": "CBMDF-1091"
          },
          "perfil": "compras",
          "origem": "status.html",
          "justificativa": "Inclusão por urgência: risco iminente à continuidade do socorro.",
          "excepcional": false,
          "aprovador": {
            "id": 5,
            "nome": "Maria Oliveira",
            "matricula": "CBMDF-1122"
          },
          "migrado": false
        }
      ]
    },
    {
      "id": "PED-2027-0013",
      "data": "06/03/2026, 12:00:00",
      "criadoEm": "2026-03-06T12:00:00Z",
      "status": "Incluído no PCA",
      "observacoes": "Incluído pelo atalho setorial (cabe no saldo) — sem publicação formal no PNCP.",
      "exercicioPca": 2027,
      "dfd": {
        "dataPretendida": "2027-03-31",
        "servicoContinuado": false,
        "vinculoPlanejamento": "Comunicação"
      },
      "usuario": {
        "id": 3,
        "nome": "Fernanda Silva",
        "matricula": "CBMDF-1091",
        "setor": "DITIC"
      },
      "itens": [
        {
          "id": 5,
          "nome": "Rádio comunicador portátil HT",
          "categoria": "manutencao",
          "grupoCodigo": "58",
          "grupoNome": "EQUIPAMENTOS DE COMUNICAÇÃO, DETECÇÃO E RADIAÇÃO COERENTE",
          "classeCodigo": "5820",
          "classeNome": "EQUIPAMENTOS DE COMUNICAÇÃO DE RÁDIO E TELEVISÃO, EXCETO AÉREOS",
          "tipo": "MATERIAL",
          "tipoDespesa": "Investimento",
          "naturezaDespesa": "4.4.90.52",
          "quantidade": 4,
          "urgencia": "normal",
          "precoUnitario": 220,
          "subtotal": 880,
          "itemUid": "PED-2027-0013-I1"
        }
      ],
      "priorizacao": {
        "criticidade": 3,
        "risco": 3,
        "obrigatoriedadeLegal": false,
        "prontidao": 1,
        "declaradoEm": "2026-03-06T12:00:00Z"
      },
      "avaliacao": {
        "criterios": {
          "qualidadeProduto": null,
          "fornecedor": null,
          "tempoProjeto": null,
          "comunicacaoSuporte": null,
          "atendeuExpectativa": null
        },
        "finalizada": false,
        "atualizadoEm": null,
        "finalizadoEm": null
      },
      "historico": [
        {
          "de": null,
          "para": "DFD Registrado",
          "em": "2026-03-06T12:00:00Z",
          "por": {
            "id": 3,
            "nome": "Fernanda Silva",
            "matricula": "CBMDF-1091"
          },
          "perfil": "solicitante",
          "origem": "index.html",
          "justificativa": "Solicitação registrada pelo requisitante.",
          "excepcional": false,
          "aprovador": null,
          "migrado": false
        },
        {
          "de": "DFD Registrado",
          "para": "DFD Aprovado pela Unidade",
          "em": "2026-03-11T12:00:00Z",
          "por": {
            "id": 1,
            "nome": "Ana Beatriz",
            "matricula": "CBMDF-1023"
          },
          "perfil": "gestor",
          "origem": "status.html",
          "justificativa": "Demanda validada pela autoridade da unidade requisitante.",
          "excepcional": false,
          "aprovador": {
            "id": 1,
            "nome": "Ana Beatriz",
            "matricula": "CBMDF-1023"
          },
          "migrado": false
        },
        {
          "de": "DFD Aprovado pela Unidade",
          "para": "Em Análise Setorial",
          "em": "2026-03-16T12:00:00Z",
          "por": {
            "id": 3,
            "nome": "Fernanda Silva",
            "matricula": "CBMDF-1091"
          },
          "perfil": "compras",
          "origem": "status.html",
          "justificativa": null,
          "excepcional": false,
          "aprovador": null,
          "migrado": false
        },
        {
          "de": "Em Análise Setorial",
          "para": "Incluído no PCA",
          "em": "2026-03-21T12:00:00Z",
          "por": {
            "id": 3,
            "nome": "Fernanda Silva",
            "matricula": "CBMDF-1091"
          },
          "perfil": "compras",
          "origem": "orcamento-setorial.html",
          "justificativa": "Aprovado pela autoridade competente e publicado no PNCP.",
          "excepcional": false,
          "aprovador": null,
          "migrado": false
        }
      ]
    },
    {
      "id": "PED-2027-0014",
      "data": "08/03/2026, 12:00:00",
      "criadoEm": "2026-03-08T12:00:00Z",
      "status": "Arquivado",
      "observacoes": "Arquivado por falta de cobertura no PCA.",
      "exercicioPca": 2027,
      "dfd": {
        "dataPretendida": "2027-03-31",
        "servicoContinuado": false,
        "vinculoPlanejamento": "Calçados"
      },
      "usuario": {
        "id": 5,
        "nome": "Maria Oliveira",
        "matricula": "CBMDF-1122",
        "setor": "COMAP"
      },
      "itens": [
        {
          "id": 2,
          "nome": "Bota de combate e salvamento",
          "categoria": "seguranca",
          "grupoCodigo": "84",
          "grupoNome": "VESTUÁRIOS, EQUIPAMENTOS INDIVIDUAIS E INSÍGNIAS",
          "classeCodigo": "8430",
          "classeNome": "CALÇADOS MASCULINOS",
          "tipo": "MATERIAL",
          "tipoDespesa": "Custeio",
          "naturezaDespesa": "3.3.90.30",
          "quantidade": 10,
          "urgencia": "normal",
          "precoUnitario": 320,
          "subtotal": 3200,
          "itemUid": "PED-2027-0014-I1"
        }
      ],
      "priorizacao": {
        "criticidade": 2,
        "risco": 2,
        "obrigatoriedadeLegal": false,
        "prontidao": 1,
        "declaradoEm": "2026-03-08T12:00:00Z"
      },
      "avaliacao": {
        "criterios": {
          "qualidadeProduto": null,
          "fornecedor": null,
          "tempoProjeto": null,
          "comunicacaoSuporte": null,
          "atendeuExpectativa": null
        },
        "finalizada": false,
        "atualizadoEm": null,
        "finalizadoEm": null
      },
      "historico": [
        {
          "de": null,
          "para": "DFD Registrado",
          "em": "2026-03-08T12:00:00Z",
          "por": {
            "id": 5,
            "nome": "Maria Oliveira",
            "matricula": "CBMDF-1122"
          },
          "perfil": "solicitante",
          "origem": "index.html",
          "justificativa": "Solicitação registrada pelo requisitante.",
          "excepcional": false,
          "aprovador": null,
          "migrado": false
        },
        {
          "de": "DFD Registrado",
          "para": "DFD Aprovado pela Unidade",
          "em": "2026-03-13T12:00:00Z",
          "por": {
            "id": 1,
            "nome": "Ana Beatriz",
            "matricula": "CBMDF-1023"
          },
          "perfil": "gestor",
          "origem": "status.html",
          "justificativa": "Demanda validada pela autoridade da unidade requisitante.",
          "excepcional": false,
          "aprovador": {
            "id": 1,
            "nome": "Ana Beatriz",
            "matricula": "CBMDF-1023"
          },
          "migrado": false
        },
        {
          "de": "DFD Aprovado pela Unidade",
          "para": "Em Análise Setorial",
          "em": "2026-03-18T12:00:00Z",
          "por": {
            "id": 3,
            "nome": "Fernanda Silva",
            "matricula": "CBMDF-1091"
          },
          "perfil": "compras",
          "origem": "status.html",
          "justificativa": null,
          "excepcional": false,
          "aprovador": null,
          "migrado": false
        },
        {
          "de": "Em Análise Setorial",
          "para": "Arquivado",
          "em": "2026-03-23T12:00:00Z",
          "por": {
            "id": 3,
            "nome": "Fernanda Silva",
            "matricula": "CBMDF-1091"
          },
          "perfil": "compras",
          "origem": "status.html",
          "justificativa": "Arquivado: demanda sem cobertura no PCA do exercício.",
          "excepcional": false,
          "aprovador": null,
          "migrado": false
        }
      ]
    },
    {
      "id": "PED-2028-0001",
      "data": "10/06/2026, 12:00:00",
      "criadoEm": "2026-06-10T12:00:00Z",
      "status": "Incluído no PCA",
      "observacoes": "Mesma classe 4210 do exercício 2027 → item de PCA separado por ano.",
      "exercicioPca": 2028,
      "dfd": {
        "dataPretendida": "2028-03-31",
        "servicoContinuado": false,
        "vinculoPlanejamento": "Combate a incêndio — exercício 2028"
      },
      "usuario": {
        "id": 2,
        "nome": "Carlos Eduardo",
        "matricula": "CBMDF-1047",
        "setor": "CESMA"
      },
      "itens": [
        {
          "id": 3,
          "nome": "Mangueira de incêndio 20m",
          "categoria": "seguranca",
          "grupoCodigo": "42",
          "grupoNome": "EQUIPAMENTO PARA COMBATE A INCÊNDIO, RESGATE E SEGURANÇA",
          "classeCodigo": "4210",
          "classeNome": "EQUIPAMENTOS PARA COMBATE A INCÊNDIO",
          "tipo": "MATERIAL",
          "tipoDespesa": "Investimento",
          "naturezaDespesa": "4.4.90.52",
          "quantidade": 6,
          "urgencia": "normal",
          "precoUnitario": 490,
          "subtotal": 2940,
          "itemUid": "PED-2028-0001-I1"
        },
        {
          "id": 4,
          "nome": "Extintor ABC 4kg",
          "categoria": "seguranca",
          "grupoCodigo": "42",
          "grupoNome": "EQUIPAMENTO PARA COMBATE A INCÊNDIO, RESGATE E SEGURANÇA",
          "classeCodigo": "4210",
          "classeNome": "EQUIPAMENTOS PARA COMBATE A INCÊNDIO",
          "tipo": "MATERIAL",
          "tipoDespesa": "Custeio",
          "naturezaDespesa": "3.3.90.30",
          "quantidade": 10,
          "urgencia": "normal",
          "precoUnitario": 158,
          "subtotal": 1580,
          "itemUid": "PED-2028-0001-I2"
        }
      ],
      "priorizacao": {
        "criticidade": 4,
        "risco": 3,
        "obrigatoriedadeLegal": false,
        "prontidao": 4,
        "declaradoEm": "2026-06-10T12:00:00Z",
        "instruidoPor": {
          "id": 3,
          "nome": "Fernanda Silva",
          "matricula": "CBMDF-1091"
        },
        "instruidoEm": "2026-06-13T12:00:00Z"
      },
      "avaliacao": {
        "criterios": {
          "qualidadeProduto": null,
          "fornecedor": null,
          "tempoProjeto": null,
          "comunicacaoSuporte": null,
          "atendeuExpectativa": null
        },
        "finalizada": false,
        "atualizadoEm": null,
        "finalizadoEm": null
      },
      "historico": [
        {
          "de": null,
          "para": "DFD Registrado",
          "em": "2026-06-10T12:00:00Z",
          "por": {
            "id": 2,
            "nome": "Carlos Eduardo",
            "matricula": "CBMDF-1047"
          },
          "perfil": "solicitante",
          "origem": "index.html",
          "justificativa": "Solicitação registrada pelo requisitante.",
          "excepcional": false,
          "aprovador": null,
          "migrado": false
        },
        {
          "de": "DFD Registrado",
          "para": "DFD Aprovado pela Unidade",
          "em": "2026-06-15T12:00:00Z",
          "por": {
            "id": 1,
            "nome": "Ana Beatriz",
            "matricula": "CBMDF-1023"
          },
          "perfil": "gestor",
          "origem": "status.html",
          "justificativa": "Demanda validada pela autoridade da unidade requisitante.",
          "excepcional": false,
          "aprovador": {
            "id": 1,
            "nome": "Ana Beatriz",
            "matricula": "CBMDF-1023"
          },
          "migrado": false
        },
        {
          "de": "DFD Aprovado pela Unidade",
          "para": "Em Análise Setorial",
          "em": "2026-06-20T12:00:00Z",
          "por": {
            "id": 3,
            "nome": "Fernanda Silva",
            "matricula": "CBMDF-1091"
          },
          "perfil": "compras",
          "origem": "status.html",
          "justificativa": null,
          "excepcional": false,
          "aprovador": null,
          "migrado": false
        },
        {
          "de": "Em Análise Setorial",
          "para": "Consolidado em Item de PCA",
          "em": "2026-06-25T12:00:00Z",
          "por": {
            "id": 3,
            "nome": "Fernanda Silva",
            "matricula": "CBMDF-1091"
          },
          "perfil": "compras",
          "origem": "status.html",
          "justificativa": null,
          "excepcional": false,
          "aprovador": null,
          "migrado": false
        },
        {
          "de": "Consolidado em Item de PCA",
          "para": "PCA Aguardando Aprovação",
          "em": "2026-06-30T12:00:00Z",
          "por": {
            "id": 3,
            "nome": "Fernanda Silva",
            "matricula": "CBMDF-1091"
          },
          "perfil": "compras",
          "origem": "status.html",
          "justificativa": null,
          "excepcional": false,
          "aprovador": null,
          "migrado": false
        },
        {
          "de": "PCA Aguardando Aprovação",
          "para": "Incluído no PCA",
          "em": "2026-07-05T12:00:00Z",
          "por": {
            "id": 3,
            "nome": "Fernanda Silva",
            "matricula": "CBMDF-1091"
          },
          "perfil": "compras",
          "origem": "status.html",
          "justificativa": "Aprovado pela autoridade competente e publicado no PNCP.",
          "excepcional": false,
          "aprovador": {
            "id": 5,
            "nome": "Maria Oliveira",
            "matricula": "CBMDF-1122"
          },
          "migrado": false
        }
      ]
    },
    {
      "id": "PED-2028-0002",
      "data": "14/06/2026, 12:00:00",
      "criadoEm": "2026-06-14T12:00:00Z",
      "status": "Consolidado em Item de PCA",
      "observacoes": "",
      "exercicioPca": 2028,
      "dfd": {
        "dataPretendida": "2028-03-31",
        "servicoContinuado": false,
        "vinculoPlanejamento": "EPI — exercício 2028"
      },
      "usuario": {
        "id": 4,
        "nome": "João Pedro",
        "matricula": "CBMDF-1108",
        "setor": "DIMAT"
      },
      "itens": [
        {
          "id": 1,
          "nome": "Capacete de proteção tático",
          "categoria": "seguranca",
          "grupoCodigo": "84",
          "grupoNome": "VESTUÁRIOS, EQUIPAMENTOS INDIVIDUAIS E INSÍGNIAS",
          "classeCodigo": "8415",
          "classeNome": "VESTUÁRIO PARA FINS ESPECIAIS",
          "tipo": "MATERIAL",
          "tipoDespesa": "Investimento",
          "naturezaDespesa": "4.4.90.52",
          "quantidade": 25,
          "urgencia": "normal",
          "precoUnitario": 125,
          "subtotal": 3125,
          "itemUid": "PED-2028-0002-I1"
        }
      ],
      "priorizacao": {
        "criticidade": 3,
        "risco": 3,
        "obrigatoriedadeLegal": false,
        "prontidao": 1,
        "declaradoEm": "2026-06-14T12:00:00Z"
      },
      "avaliacao": {
        "criterios": {
          "qualidadeProduto": null,
          "fornecedor": null,
          "tempoProjeto": null,
          "comunicacaoSuporte": null,
          "atendeuExpectativa": null
        },
        "finalizada": false,
        "atualizadoEm": null,
        "finalizadoEm": null
      },
      "historico": [
        {
          "de": null,
          "para": "DFD Registrado",
          "em": "2026-06-14T12:00:00Z",
          "por": {
            "id": 4,
            "nome": "João Pedro",
            "matricula": "CBMDF-1108"
          },
          "perfil": "solicitante",
          "origem": "index.html",
          "justificativa": "Solicitação registrada pelo requisitante.",
          "excepcional": false,
          "aprovador": null,
          "migrado": false
        },
        {
          "de": "DFD Registrado",
          "para": "DFD Aprovado pela Unidade",
          "em": "2026-06-19T12:00:00Z",
          "por": {
            "id": 1,
            "nome": "Ana Beatriz",
            "matricula": "CBMDF-1023"
          },
          "perfil": "gestor",
          "origem": "status.html",
          "justificativa": "Demanda validada pela autoridade da unidade requisitante.",
          "excepcional": false,
          "aprovador": {
            "id": 1,
            "nome": "Ana Beatriz",
            "matricula": "CBMDF-1023"
          },
          "migrado": false
        },
        {
          "de": "DFD Aprovado pela Unidade",
          "para": "Em Análise Setorial",
          "em": "2026-06-24T12:00:00Z",
          "por": {
            "id": 3,
            "nome": "Fernanda Silva",
            "matricula": "CBMDF-1091"
          },
          "perfil": "compras",
          "origem": "status.html",
          "justificativa": null,
          "excepcional": false,
          "aprovador": null,
          "migrado": false
        },
        {
          "de": "Em Análise Setorial",
          "para": "Consolidado em Item de PCA",
          "em": "2026-06-29T12:00:00Z",
          "por": {
            "id": 3,
            "nome": "Fernanda Silva",
            "matricula": "CBMDF-1091"
          },
          "perfil": "compras",
          "origem": "status.html",
          "justificativa": null,
          "excepcional": false,
          "aprovador": null,
          "migrado": false
        }
      ]
    },
    {
      "id": "PED-2028-0003",
      "data": "18/06/2026, 12:00:00",
      "criadoEm": "2026-06-18T12:00:00Z",
      "status": "DFD Registrado",
      "observacoes": "Demanda antecipada para 2028.",
      "exercicioPca": 2028,
      "dfd": {
        "dataPretendida": "2028-03-31",
        "servicoContinuado": false,
        "vinculoPlanejamento": "Fardamento — exercício 2028"
      },
      "usuario": {
        "id": 1,
        "nome": "Ana Beatriz",
        "matricula": "CBMDF-1023",
        "setor": "COMOP"
      },
      "itens": [
        {
          "id": 10,
          "nome": "Uniforme operacional (CBMDF)",
          "categoria": "manutencao",
          "grupoCodigo": "84",
          "grupoNome": "VESTUÁRIOS, EQUIPAMENTOS INDIVIDUAIS E INSÍGNIAS",
          "classeCodigo": "8405",
          "classeNome": "VESTUÁRIO EXTERNO MASCULINO",
          "tipo": "MATERIAL",
          "tipoDespesa": "Custeio",
          "naturezaDespesa": "3.3.90.30",
          "quantidade": 40,
          "urgencia": "normal",
          "precoUnitario": 245,
          "subtotal": 9800,
          "itemUid": "PED-2028-0003-I1"
        }
      ],
      "priorizacao": {
        "criticidade": 2,
        "risco": 2,
        "obrigatoriedadeLegal": false,
        "prontidao": 1,
        "declaradoEm": "2026-06-18T12:00:00Z"
      },
      "avaliacao": {
        "criterios": {
          "qualidadeProduto": null,
          "fornecedor": null,
          "tempoProjeto": null,
          "comunicacaoSuporte": null,
          "atendeuExpectativa": null
        },
        "finalizada": false,
        "atualizadoEm": null,
        "finalizadoEm": null
      },
      "historico": [
        {
          "de": null,
          "para": "DFD Registrado",
          "em": "2026-06-18T12:00:00Z",
          "por": {
            "id": 1,
            "nome": "Ana Beatriz",
            "matricula": "CBMDF-1023"
          },
          "perfil": "solicitante",
          "origem": "index.html",
          "justificativa": "Solicitação registrada pelo requisitante.",
          "excepcional": false,
          "aprovador": null,
          "migrado": false
        }
      ]
    },
    {
      "id": "PED-2026-0001",
      "data": "05/09/2025, 12:00:00",
      "criadoEm": "2025-09-05T12:00:00Z",
      "status": "ETP em Elaboração",
      "observacoes": "",
      "exercicioPca": 2026,
      "dfd": {
        "dataPretendida": "2026-06-30",
        "servicoContinuado": false,
        "vinculoPlanejamento": "Comunicação"
      },
      "usuario": {
        "id": 3,
        "nome": "Fernanda Silva",
        "matricula": "CBMDF-1091",
        "setor": "DITIC"
      },
      "itens": [
        {
          "id": 5,
          "nome": "Rádio comunicador portátil HT",
          "categoria": "manutencao",
          "grupoCodigo": "58",
          "grupoNome": "EQUIPAMENTOS DE COMUNICAÇÃO, DETECÇÃO E RADIAÇÃO COERENTE",
          "classeCodigo": "5820",
          "classeNome": "EQUIPAMENTOS DE COMUNICAÇÃO DE RÁDIO E TELEVISÃO, EXCETO AÉREOS",
          "tipo": "MATERIAL",
          "tipoDespesa": "Investimento",
          "naturezaDespesa": "4.4.90.52",
          "quantidade": 10,
          "urgencia": "normal",
          "precoUnitario": 220,
          "subtotal": 2200,
          "itemUid": "PED-2026-0001-I1"
        }
      ],
      "priorizacao": {
        "criticidade": 3,
        "risco": 3,
        "obrigatoriedadeLegal": false,
        "prontidao": 4,
        "declaradoEm": "2025-09-05T12:00:00Z",
        "instruidoPor": {
          "id": 3,
          "nome": "Fernanda Silva",
          "matricula": "CBMDF-1091"
        },
        "instruidoEm": "2025-09-08T12:00:00Z"
      },
      "avaliacao": {
        "criterios": {
          "qualidadeProduto": null,
          "fornecedor": null,
          "tempoProjeto": null,
          "comunicacaoSuporte": null,
          "atendeuExpectativa": null
        },
        "finalizada": false,
        "atualizadoEm": null,
        "finalizadoEm": null
      },
      "historico": [
        {
          "de": null,
          "para": "DFD Registrado",
          "em": "2025-09-05T12:00:00Z",
          "por": {
            "id": 3,
            "nome": "Fernanda Silva",
            "matricula": "CBMDF-1091"
          },
          "perfil": "solicitante",
          "origem": "index.html",
          "justificativa": "Solicitação registrada pelo requisitante.",
          "excepcional": false,
          "aprovador": null,
          "migrado": false
        },
        {
          "de": "DFD Registrado",
          "para": "DFD Aprovado pela Unidade",
          "em": "2025-09-10T12:00:00Z",
          "por": {
            "id": 1,
            "nome": "Ana Beatriz",
            "matricula": "CBMDF-1023"
          },
          "perfil": "gestor",
          "origem": "status.html",
          "justificativa": "Demanda validada pela autoridade da unidade requisitante.",
          "excepcional": false,
          "aprovador": {
            "id": 1,
            "nome": "Ana Beatriz",
            "matricula": "CBMDF-1023"
          },
          "migrado": false
        },
        {
          "de": "DFD Aprovado pela Unidade",
          "para": "Em Análise Setorial",
          "em": "2025-09-15T12:00:00Z",
          "por": {
            "id": 3,
            "nome": "Fernanda Silva",
            "matricula": "CBMDF-1091"
          },
          "perfil": "compras",
          "origem": "status.html",
          "justificativa": null,
          "excepcional": false,
          "aprovador": null,
          "migrado": false
        },
        {
          "de": "Em Análise Setorial",
          "para": "Consolidado em Item de PCA",
          "em": "2025-09-20T12:00:00Z",
          "por": {
            "id": 3,
            "nome": "Fernanda Silva",
            "matricula": "CBMDF-1091"
          },
          "perfil": "compras",
          "origem": "status.html",
          "justificativa": null,
          "excepcional": false,
          "aprovador": null,
          "migrado": false
        },
        {
          "de": "Consolidado em Item de PCA",
          "para": "PCA Aguardando Aprovação",
          "em": "2025-09-25T12:00:00Z",
          "por": {
            "id": 3,
            "nome": "Fernanda Silva",
            "matricula": "CBMDF-1091"
          },
          "perfil": "compras",
          "origem": "status.html",
          "justificativa": null,
          "excepcional": false,
          "aprovador": null,
          "migrado": false
        },
        {
          "de": "PCA Aguardando Aprovação",
          "para": "Incluído no PCA",
          "em": "2025-09-30T12:00:00Z",
          "por": {
            "id": 3,
            "nome": "Fernanda Silva",
            "matricula": "CBMDF-1091"
          },
          "perfil": "compras",
          "origem": "status.html",
          "justificativa": "Aprovado pela autoridade competente e publicado no PNCP.",
          "excepcional": false,
          "aprovador": {
            "id": 5,
            "nome": "Maria Oliveira",
            "matricula": "CBMDF-1122"
          },
          "migrado": false
        },
        {
          "de": "Incluído no PCA",
          "para": "ETP em Elaboração",
          "em": "2025-10-05T12:00:00Z",
          "por": {
            "id": 3,
            "nome": "Fernanda Silva",
            "matricula": "CBMDF-1091"
          },
          "perfil": "compras",
          "origem": "status.html",
          "justificativa": null,
          "excepcional": false,
          "aprovador": null,
          "migrado": false
        }
      ]
    },
    {
      "id": "PED-2026-0002",
      "data": "08/09/2025, 12:00:00",
      "criadoEm": "2025-09-08T12:00:00Z",
      "status": "Pesquisa de Preços",
      "observacoes": "",
      "exercicioPca": 2026,
      "dfd": {
        "dataPretendida": "2026-06-30",
        "servicoContinuado": false,
        "vinculoPlanejamento": "APH"
      },
      "usuario": {
        "id": 2,
        "nome": "Carlos Eduardo",
        "matricula": "CBMDF-1047",
        "setor": "CESMA"
      },
      "itens": [
        {
          "id": 8,
          "nome": "Kit de primeiros socorros APH",
          "categoria": "higiene",
          "grupoCodigo": "65",
          "grupoNome": "EQUIPAMENTOS E ARTIGOS PARA USO MÉDICO, DENTÁRIO E VETERINÁRIO",
          "classeCodigo": "6510",
          "classeNome": "MATERIAIS CIRÚRGICOS PARA CURATIVOS",
          "tipo": "MATERIAL",
          "tipoDespesa": "Custeio",
          "naturezaDespesa": "3.3.90.30",
          "quantidade": 20,
          "urgencia": "normal",
          "precoUnitario": 135,
          "subtotal": 2700,
          "itemUid": "PED-2026-0002-I1"
        }
      ],
      "priorizacao": {
        "criticidade": 4,
        "risco": 4,
        "obrigatoriedadeLegal": false,
        "prontidao": 4,
        "declaradoEm": "2025-09-08T12:00:00Z",
        "instruidoPor": {
          "id": 3,
          "nome": "Fernanda Silva",
          "matricula": "CBMDF-1091"
        },
        "instruidoEm": "2025-09-11T12:00:00Z"
      },
      "avaliacao": {
        "criterios": {
          "qualidadeProduto": null,
          "fornecedor": null,
          "tempoProjeto": null,
          "comunicacaoSuporte": null,
          "atendeuExpectativa": null
        },
        "finalizada": false,
        "atualizadoEm": null,
        "finalizadoEm": null
      },
      "historico": [
        {
          "de": null,
          "para": "DFD Registrado",
          "em": "2025-09-08T12:00:00Z",
          "por": {
            "id": 2,
            "nome": "Carlos Eduardo",
            "matricula": "CBMDF-1047"
          },
          "perfil": "solicitante",
          "origem": "index.html",
          "justificativa": "Solicitação registrada pelo requisitante.",
          "excepcional": false,
          "aprovador": null,
          "migrado": false
        },
        {
          "de": "DFD Registrado",
          "para": "DFD Aprovado pela Unidade",
          "em": "2025-09-13T12:00:00Z",
          "por": {
            "id": 1,
            "nome": "Ana Beatriz",
            "matricula": "CBMDF-1023"
          },
          "perfil": "gestor",
          "origem": "status.html",
          "justificativa": "Demanda validada pela autoridade da unidade requisitante.",
          "excepcional": false,
          "aprovador": {
            "id": 1,
            "nome": "Ana Beatriz",
            "matricula": "CBMDF-1023"
          },
          "migrado": false
        },
        {
          "de": "DFD Aprovado pela Unidade",
          "para": "Em Análise Setorial",
          "em": "2025-09-18T12:00:00Z",
          "por": {
            "id": 3,
            "nome": "Fernanda Silva",
            "matricula": "CBMDF-1091"
          },
          "perfil": "compras",
          "origem": "status.html",
          "justificativa": null,
          "excepcional": false,
          "aprovador": null,
          "migrado": false
        },
        {
          "de": "Em Análise Setorial",
          "para": "Consolidado em Item de PCA",
          "em": "2025-09-23T12:00:00Z",
          "por": {
            "id": 3,
            "nome": "Fernanda Silva",
            "matricula": "CBMDF-1091"
          },
          "perfil": "compras",
          "origem": "status.html",
          "justificativa": null,
          "excepcional": false,
          "aprovador": null,
          "migrado": false
        },
        {
          "de": "Consolidado em Item de PCA",
          "para": "PCA Aguardando Aprovação",
          "em": "2025-09-28T12:00:00Z",
          "por": {
            "id": 3,
            "nome": "Fernanda Silva",
            "matricula": "CBMDF-1091"
          },
          "perfil": "compras",
          "origem": "status.html",
          "justificativa": null,
          "excepcional": false,
          "aprovador": null,
          "migrado": false
        },
        {
          "de": "PCA Aguardando Aprovação",
          "para": "Incluído no PCA",
          "em": "2025-10-03T12:00:00Z",
          "por": {
            "id": 3,
            "nome": "Fernanda Silva",
            "matricula": "CBMDF-1091"
          },
          "perfil": "compras",
          "origem": "status.html",
          "justificativa": "Aprovado pela autoridade competente e publicado no PNCP.",
          "excepcional": false,
          "aprovador": {
            "id": 5,
            "nome": "Maria Oliveira",
            "matricula": "CBMDF-1122"
          },
          "migrado": false
        },
        {
          "de": "Incluído no PCA",
          "para": "ETP em Elaboração",
          "em": "2025-10-08T12:00:00Z",
          "por": {
            "id": 3,
            "nome": "Fernanda Silva",
            "matricula": "CBMDF-1091"
          },
          "perfil": "compras",
          "origem": "status.html",
          "justificativa": null,
          "excepcional": false,
          "aprovador": null,
          "migrado": false
        },
        {
          "de": "ETP em Elaboração",
          "para": "Pesquisa de Preços",
          "em": "2025-10-13T12:00:00Z",
          "por": {
            "id": 3,
            "nome": "Fernanda Silva",
            "matricula": "CBMDF-1091"
          },
          "perfil": "compras",
          "origem": "status.html",
          "justificativa": null,
          "excepcional": false,
          "aprovador": null,
          "migrado": false
        }
      ]
    },
    {
      "id": "PED-2026-0003",
      "data": "11/09/2025, 12:00:00",
      "criadoEm": "2025-09-11T12:00:00Z",
      "status": "TR Elaborado",
      "observacoes": "",
      "exercicioPca": 2026,
      "dfd": {
        "dataPretendida": "2026-06-30",
        "servicoContinuado": false,
        "vinculoPlanejamento": "Salvamento"
      },
      "usuario": {
        "id": 4,
        "nome": "João Pedro",
        "matricula": "CBMDF-1108",
        "setor": "DIMAT"
      },
      "itens": [
        {
          "id": 12,
          "nome": "Prancha Rígida de Imobilização com Tirantes",
          "categoria": "seguranca",
          "grupoCodigo": "42",
          "grupoNome": "EQUIPAMENTO PARA COMBATE A INCÊNDIO, RESGATE E SEGURANÇA",
          "classeCodigo": "4240",
          "classeNome": "EQUIPAMENTO PARA SEGURANÇA E SALVAMENTO",
          "tipo": "MATERIAL",
          "tipoDespesa": "Investimento",
          "naturezaDespesa": "4.4.90.52",
          "quantidade": 8,
          "urgencia": "normal",
          "precoUnitario": 450,
          "subtotal": 3600,
          "itemUid": "PED-2026-0003-I1"
        }
      ],
      "priorizacao": {
        "criticidade": 4,
        "risco": 4,
        "obrigatoriedadeLegal": false,
        "prontidao": 5,
        "declaradoEm": "2025-09-11T12:00:00Z",
        "instruidoPor": {
          "id": 3,
          "nome": "Fernanda Silva",
          "matricula": "CBMDF-1091"
        },
        "instruidoEm": "2025-09-14T12:00:00Z"
      },
      "avaliacao": {
        "criterios": {
          "qualidadeProduto": null,
          "fornecedor": null,
          "tempoProjeto": null,
          "comunicacaoSuporte": null,
          "atendeuExpectativa": null
        },
        "finalizada": false,
        "atualizadoEm": null,
        "finalizadoEm": null
      },
      "historico": [
        {
          "de": null,
          "para": "DFD Registrado",
          "em": "2025-09-11T12:00:00Z",
          "por": {
            "id": 4,
            "nome": "João Pedro",
            "matricula": "CBMDF-1108"
          },
          "perfil": "solicitante",
          "origem": "index.html",
          "justificativa": "Solicitação registrada pelo requisitante.",
          "excepcional": false,
          "aprovador": null,
          "migrado": false
        },
        {
          "de": "DFD Registrado",
          "para": "DFD Aprovado pela Unidade",
          "em": "2025-09-16T12:00:00Z",
          "por": {
            "id": 1,
            "nome": "Ana Beatriz",
            "matricula": "CBMDF-1023"
          },
          "perfil": "gestor",
          "origem": "status.html",
          "justificativa": "Demanda validada pela autoridade da unidade requisitante.",
          "excepcional": false,
          "aprovador": {
            "id": 1,
            "nome": "Ana Beatriz",
            "matricula": "CBMDF-1023"
          },
          "migrado": false
        },
        {
          "de": "DFD Aprovado pela Unidade",
          "para": "Em Análise Setorial",
          "em": "2025-09-21T12:00:00Z",
          "por": {
            "id": 3,
            "nome": "Fernanda Silva",
            "matricula": "CBMDF-1091"
          },
          "perfil": "compras",
          "origem": "status.html",
          "justificativa": null,
          "excepcional": false,
          "aprovador": null,
          "migrado": false
        },
        {
          "de": "Em Análise Setorial",
          "para": "Consolidado em Item de PCA",
          "em": "2025-09-26T12:00:00Z",
          "por": {
            "id": 3,
            "nome": "Fernanda Silva",
            "matricula": "CBMDF-1091"
          },
          "perfil": "compras",
          "origem": "status.html",
          "justificativa": null,
          "excepcional": false,
          "aprovador": null,
          "migrado": false
        },
        {
          "de": "Consolidado em Item de PCA",
          "para": "PCA Aguardando Aprovação",
          "em": "2025-10-01T12:00:00Z",
          "por": {
            "id": 3,
            "nome": "Fernanda Silva",
            "matricula": "CBMDF-1091"
          },
          "perfil": "compras",
          "origem": "status.html",
          "justificativa": null,
          "excepcional": false,
          "aprovador": null,
          "migrado": false
        },
        {
          "de": "PCA Aguardando Aprovação",
          "para": "Incluído no PCA",
          "em": "2025-10-06T12:00:00Z",
          "por": {
            "id": 3,
            "nome": "Fernanda Silva",
            "matricula": "CBMDF-1091"
          },
          "perfil": "compras",
          "origem": "status.html",
          "justificativa": "Aprovado pela autoridade competente e publicado no PNCP.",
          "excepcional": false,
          "aprovador": {
            "id": 5,
            "nome": "Maria Oliveira",
            "matricula": "CBMDF-1122"
          },
          "migrado": false
        },
        {
          "de": "Incluído no PCA",
          "para": "ETP em Elaboração",
          "em": "2025-10-11T12:00:00Z",
          "por": {
            "id": 3,
            "nome": "Fernanda Silva",
            "matricula": "CBMDF-1091"
          },
          "perfil": "compras",
          "origem": "status.html",
          "justificativa": null,
          "excepcional": false,
          "aprovador": null,
          "migrado": false
        },
        {
          "de": "ETP em Elaboração",
          "para": "Pesquisa de Preços",
          "em": "2025-10-16T12:00:00Z",
          "por": {
            "id": 3,
            "nome": "Fernanda Silva",
            "matricula": "CBMDF-1091"
          },
          "perfil": "compras",
          "origem": "status.html",
          "justificativa": null,
          "excepcional": false,
          "aprovador": null,
          "migrado": false
        },
        {
          "de": "Pesquisa de Preços",
          "para": "TR Elaborado",
          "em": "2025-10-21T12:00:00Z",
          "por": {
            "id": 3,
            "nome": "Fernanda Silva",
            "matricula": "CBMDF-1091"
          },
          "perfil": "compras",
          "origem": "status.html",
          "justificativa": null,
          "excepcional": false,
          "aprovador": null,
          "migrado": false
        }
      ]
    },
    {
      "id": "PED-2026-0004",
      "data": "14/09/2025, 12:00:00",
      "criadoEm": "2025-09-14T12:00:00Z",
      "status": "Reserva Orçamentária Confirmada",
      "observacoes": "Reserva confirmada — valor comprometido.",
      "exercicioPca": 2026,
      "dfd": {
        "dataPretendida": "2026-06-30",
        "servicoContinuado": false,
        "vinculoPlanejamento": "Combate a incêndio"
      },
      "usuario": {
        "id": 1,
        "nome": "Ana Beatriz",
        "matricula": "CBMDF-1023",
        "setor": "COMOP"
      },
      "itens": [
        {
          "id": 3,
          "nome": "Mangueira de incêndio 20m",
          "categoria": "seguranca",
          "grupoCodigo": "42",
          "grupoNome": "EQUIPAMENTO PARA COMBATE A INCÊNDIO, RESGATE E SEGURANÇA",
          "classeCodigo": "4210",
          "classeNome": "EQUIPAMENTOS PARA COMBATE A INCÊNDIO",
          "tipo": "MATERIAL",
          "tipoDespesa": "Investimento",
          "naturezaDespesa": "4.4.90.52",
          "quantidade": 12,
          "urgencia": "normal",
          "precoUnitario": 490,
          "subtotal": 5880,
          "itemUid": "PED-2026-0004-I1"
        }
      ],
      "priorizacao": {
        "criticidade": 4,
        "risco": 4,
        "obrigatoriedadeLegal": false,
        "prontidao": 5,
        "declaradoEm": "2025-09-14T12:00:00Z",
        "instruidoPor": {
          "id": 3,
          "nome": "Fernanda Silva",
          "matricula": "CBMDF-1091"
        },
        "instruidoEm": "2025-09-17T12:00:00Z"
      },
      "avaliacao": {
        "criterios": {
          "qualidadeProduto": null,
          "fornecedor": null,
          "tempoProjeto": null,
          "comunicacaoSuporte": null,
          "atendeuExpectativa": null
        },
        "finalizada": false,
        "atualizadoEm": null,
        "finalizadoEm": null
      },
      "historico": [
        {
          "de": null,
          "para": "DFD Registrado",
          "em": "2025-09-14T12:00:00Z",
          "por": {
            "id": 1,
            "nome": "Ana Beatriz",
            "matricula": "CBMDF-1023"
          },
          "perfil": "solicitante",
          "origem": "index.html",
          "justificativa": "Solicitação registrada pelo requisitante.",
          "excepcional": false,
          "aprovador": null,
          "migrado": false
        },
        {
          "de": "DFD Registrado",
          "para": "DFD Aprovado pela Unidade",
          "em": "2025-09-19T12:00:00Z",
          "por": {
            "id": 1,
            "nome": "Ana Beatriz",
            "matricula": "CBMDF-1023"
          },
          "perfil": "gestor",
          "origem": "status.html",
          "justificativa": "Demanda validada pela autoridade da unidade requisitante.",
          "excepcional": false,
          "aprovador": {
            "id": 1,
            "nome": "Ana Beatriz",
            "matricula": "CBMDF-1023"
          },
          "migrado": false
        },
        {
          "de": "DFD Aprovado pela Unidade",
          "para": "Em Análise Setorial",
          "em": "2025-09-24T12:00:00Z",
          "por": {
            "id": 3,
            "nome": "Fernanda Silva",
            "matricula": "CBMDF-1091"
          },
          "perfil": "compras",
          "origem": "status.html",
          "justificativa": null,
          "excepcional": false,
          "aprovador": null,
          "migrado": false
        },
        {
          "de": "Em Análise Setorial",
          "para": "Consolidado em Item de PCA",
          "em": "2025-09-29T12:00:00Z",
          "por": {
            "id": 3,
            "nome": "Fernanda Silva",
            "matricula": "CBMDF-1091"
          },
          "perfil": "compras",
          "origem": "status.html",
          "justificativa": null,
          "excepcional": false,
          "aprovador": null,
          "migrado": false
        },
        {
          "de": "Consolidado em Item de PCA",
          "para": "PCA Aguardando Aprovação",
          "em": "2025-10-04T12:00:00Z",
          "por": {
            "id": 3,
            "nome": "Fernanda Silva",
            "matricula": "CBMDF-1091"
          },
          "perfil": "compras",
          "origem": "status.html",
          "justificativa": null,
          "excepcional": false,
          "aprovador": null,
          "migrado": false
        },
        {
          "de": "PCA Aguardando Aprovação",
          "para": "Incluído no PCA",
          "em": "2025-10-09T12:00:00Z",
          "por": {
            "id": 3,
            "nome": "Fernanda Silva",
            "matricula": "CBMDF-1091"
          },
          "perfil": "compras",
          "origem": "status.html",
          "justificativa": "Aprovado pela autoridade competente e publicado no PNCP.",
          "excepcional": false,
          "aprovador": {
            "id": 5,
            "nome": "Maria Oliveira",
            "matricula": "CBMDF-1122"
          },
          "migrado": false
        },
        {
          "de": "Incluído no PCA",
          "para": "ETP em Elaboração",
          "em": "2025-10-14T12:00:00Z",
          "por": {
            "id": 3,
            "nome": "Fernanda Silva",
            "matricula": "CBMDF-1091"
          },
          "perfil": "compras",
          "origem": "status.html",
          "justificativa": null,
          "excepcional": false,
          "aprovador": null,
          "migrado": false
        },
        {
          "de": "ETP em Elaboração",
          "para": "Pesquisa de Preços",
          "em": "2025-10-19T12:00:00Z",
          "por": {
            "id": 3,
            "nome": "Fernanda Silva",
            "matricula": "CBMDF-1091"
          },
          "perfil": "compras",
          "origem": "status.html",
          "justificativa": null,
          "excepcional": false,
          "aprovador": null,
          "migrado": false
        },
        {
          "de": "Pesquisa de Preços",
          "para": "TR Elaborado",
          "em": "2025-10-24T12:00:00Z",
          "por": {
            "id": 3,
            "nome": "Fernanda Silva",
            "matricula": "CBMDF-1091"
          },
          "perfil": "compras",
          "origem": "status.html",
          "justificativa": null,
          "excepcional": false,
          "aprovador": null,
          "migrado": false
        },
        {
          "de": "TR Elaborado",
          "para": "Reserva Orçamentária Confirmada",
          "em": "2025-10-29T12:00:00Z",
          "por": {
            "id": 3,
            "nome": "Fernanda Silva",
            "matricula": "CBMDF-1091"
          },
          "perfil": "compras",
          "origem": "status.html",
          "justificativa": null,
          "excepcional": false,
          "aprovador": null,
          "migrado": false
        }
      ]
    },
    {
      "id": "PED-2026-0005",
      "data": "17/09/2025, 12:00:00",
      "criadoEm": "2025-09-17T12:00:00Z",
      "status": "Edital Publicado",
      "observacoes": "Serviço continuado (CATSER).",
      "exercicioPca": 2026,
      "dfd": {
        "dataPretendida": "2026-06-30",
        "servicoContinuado": true,
        "vinculoPlanejamento": "Manutenção da frota (serviço continuado)"
      },
      "usuario": {
        "id": 5,
        "nome": "Maria Oliveira",
        "matricula": "CBMDF-1122",
        "setor": "COMAP"
      },
      "itens": [
        {
          "id": 14,
          "nome": "Serviço de Manutenção Preventiva de VTRs",
          "categoria": "manutencao",
          "grupoCodigo": "852",
          "grupoNome": "SERVIÇOS DE INVESTIGAÇÃO E SEGURANÇA",
          "classeCodigo": "8529",
          "classeNome": "OUTROS SERVIÇOS DE SEGURANÇA",
          "tipo": "SERVIÇO",
          "tipoDespesa": "Custeio",
          "naturezaDespesa": "3.3.90.39",
          "quantidade": 1,
          "urgencia": "normal",
          "precoUnitario": 3500,
          "subtotal": 3500,
          "itemUid": "PED-2026-0005-I1"
        }
      ],
      "priorizacao": {
        "criticidade": 3,
        "risco": 3,
        "obrigatoriedadeLegal": false,
        "prontidao": 4,
        "declaradoEm": "2025-09-17T12:00:00Z",
        "instruidoPor": {
          "id": 3,
          "nome": "Fernanda Silva",
          "matricula": "CBMDF-1091"
        },
        "instruidoEm": "2025-09-20T12:00:00Z"
      },
      "avaliacao": {
        "criterios": {
          "qualidadeProduto": null,
          "fornecedor": null,
          "tempoProjeto": null,
          "comunicacaoSuporte": null,
          "atendeuExpectativa": null
        },
        "finalizada": false,
        "atualizadoEm": null,
        "finalizadoEm": null
      },
      "historico": [
        {
          "de": null,
          "para": "DFD Registrado",
          "em": "2025-09-17T12:00:00Z",
          "por": {
            "id": 5,
            "nome": "Maria Oliveira",
            "matricula": "CBMDF-1122"
          },
          "perfil": "solicitante",
          "origem": "index.html",
          "justificativa": "Solicitação registrada pelo requisitante.",
          "excepcional": false,
          "aprovador": null,
          "migrado": false
        },
        {
          "de": "DFD Registrado",
          "para": "DFD Aprovado pela Unidade",
          "em": "2025-09-22T12:00:00Z",
          "por": {
            "id": 1,
            "nome": "Ana Beatriz",
            "matricula": "CBMDF-1023"
          },
          "perfil": "gestor",
          "origem": "status.html",
          "justificativa": "Demanda validada pela autoridade da unidade requisitante.",
          "excepcional": false,
          "aprovador": {
            "id": 1,
            "nome": "Ana Beatriz",
            "matricula": "CBMDF-1023"
          },
          "migrado": false
        },
        {
          "de": "DFD Aprovado pela Unidade",
          "para": "Em Análise Setorial",
          "em": "2025-09-27T12:00:00Z",
          "por": {
            "id": 3,
            "nome": "Fernanda Silva",
            "matricula": "CBMDF-1091"
          },
          "perfil": "compras",
          "origem": "status.html",
          "justificativa": null,
          "excepcional": false,
          "aprovador": null,
          "migrado": false
        },
        {
          "de": "Em Análise Setorial",
          "para": "Consolidado em Item de PCA",
          "em": "2025-10-02T12:00:00Z",
          "por": {
            "id": 3,
            "nome": "Fernanda Silva",
            "matricula": "CBMDF-1091"
          },
          "perfil": "compras",
          "origem": "status.html",
          "justificativa": null,
          "excepcional": false,
          "aprovador": null,
          "migrado": false
        },
        {
          "de": "Consolidado em Item de PCA",
          "para": "PCA Aguardando Aprovação",
          "em": "2025-10-07T12:00:00Z",
          "por": {
            "id": 3,
            "nome": "Fernanda Silva",
            "matricula": "CBMDF-1091"
          },
          "perfil": "compras",
          "origem": "status.html",
          "justificativa": null,
          "excepcional": false,
          "aprovador": null,
          "migrado": false
        },
        {
          "de": "PCA Aguardando Aprovação",
          "para": "Incluído no PCA",
          "em": "2025-10-12T12:00:00Z",
          "por": {
            "id": 3,
            "nome": "Fernanda Silva",
            "matricula": "CBMDF-1091"
          },
          "perfil": "compras",
          "origem": "status.html",
          "justificativa": "Aprovado pela autoridade competente e publicado no PNCP.",
          "excepcional": false,
          "aprovador": {
            "id": 5,
            "nome": "Maria Oliveira",
            "matricula": "CBMDF-1122"
          },
          "migrado": false
        },
        {
          "de": "Incluído no PCA",
          "para": "ETP em Elaboração",
          "em": "2025-10-17T12:00:00Z",
          "por": {
            "id": 3,
            "nome": "Fernanda Silva",
            "matricula": "CBMDF-1091"
          },
          "perfil": "compras",
          "origem": "status.html",
          "justificativa": null,
          "excepcional": false,
          "aprovador": null,
          "migrado": false
        },
        {
          "de": "ETP em Elaboração",
          "para": "Pesquisa de Preços",
          "em": "2025-10-22T12:00:00Z",
          "por": {
            "id": 3,
            "nome": "Fernanda Silva",
            "matricula": "CBMDF-1091"
          },
          "perfil": "compras",
          "origem": "status.html",
          "justificativa": null,
          "excepcional": false,
          "aprovador": null,
          "migrado": false
        },
        {
          "de": "Pesquisa de Preços",
          "para": "TR Elaborado",
          "em": "2025-10-27T12:00:00Z",
          "por": {
            "id": 3,
            "nome": "Fernanda Silva",
            "matricula": "CBMDF-1091"
          },
          "perfil": "compras",
          "origem": "status.html",
          "justificativa": null,
          "excepcional": false,
          "aprovador": null,
          "migrado": false
        },
        {
          "de": "TR Elaborado",
          "para": "Reserva Orçamentária Confirmada",
          "em": "2025-11-01T12:00:00Z",
          "por": {
            "id": 3,
            "nome": "Fernanda Silva",
            "matricula": "CBMDF-1091"
          },
          "perfil": "compras",
          "origem": "status.html",
          "justificativa": null,
          "excepcional": false,
          "aprovador": null,
          "migrado": false
        },
        {
          "de": "Reserva Orçamentária Confirmada",
          "para": "Edital Publicado",
          "em": "2025-11-06T12:00:00Z",
          "por": {
            "id": 3,
            "nome": "Fernanda Silva",
            "matricula": "CBMDF-1091"
          },
          "perfil": "compras",
          "origem": "status.html",
          "justificativa": null,
          "excepcional": false,
          "aprovador": null,
          "migrado": false
        }
      ]
    },
    {
      "id": "PED-2026-0006",
      "data": "20/09/2025, 12:00:00",
      "criadoEm": "2025-09-20T12:00:00Z",
      "status": "Em Seleção de Fornecedor",
      "observacoes": "",
      "exercicioPca": 2026,
      "dfd": {
        "dataPretendida": "2026-06-30",
        "servicoContinuado": false,
        "vinculoPlanejamento": "Calçados"
      },
      "usuario": {
        "id": 2,
        "nome": "Carlos Eduardo",
        "matricula": "CBMDF-1047",
        "setor": "CESMA"
      },
      "itens": [
        {
          "id": 2,
          "nome": "Bota de combate e salvamento",
          "categoria": "seguranca",
          "grupoCodigo": "84",
          "grupoNome": "VESTUÁRIOS, EQUIPAMENTOS INDIVIDUAIS E INSÍGNIAS",
          "classeCodigo": "8430",
          "classeNome": "CALÇADOS MASCULINOS",
          "tipo": "MATERIAL",
          "tipoDespesa": "Custeio",
          "naturezaDespesa": "3.3.90.30",
          "quantidade": 15,
          "urgencia": "normal",
          "precoUnitario": 320,
          "subtotal": 4800,
          "itemUid": "PED-2026-0006-I1"
        }
      ],
      "priorizacao": {
        "criticidade": 3,
        "risco": 3,
        "obrigatoriedadeLegal": false,
        "prontidao": 1,
        "declaradoEm": "2025-09-20T12:00:00Z"
      },
      "avaliacao": {
        "criterios": {
          "qualidadeProduto": null,
          "fornecedor": null,
          "tempoProjeto": null,
          "comunicacaoSuporte": null,
          "atendeuExpectativa": null
        },
        "finalizada": false,
        "atualizadoEm": null,
        "finalizadoEm": null
      },
      "historico": [
        {
          "de": null,
          "para": "DFD Registrado",
          "em": "2025-09-20T12:00:00Z",
          "por": {
            "id": 2,
            "nome": "Carlos Eduardo",
            "matricula": "CBMDF-1047"
          },
          "perfil": "solicitante",
          "origem": "index.html",
          "justificativa": "Solicitação registrada pelo requisitante.",
          "excepcional": false,
          "aprovador": null,
          "migrado": false
        },
        {
          "de": "DFD Registrado",
          "para": "DFD Aprovado pela Unidade",
          "em": "2025-09-25T12:00:00Z",
          "por": {
            "id": 1,
            "nome": "Ana Beatriz",
            "matricula": "CBMDF-1023"
          },
          "perfil": "gestor",
          "origem": "status.html",
          "justificativa": "Demanda validada pela autoridade da unidade requisitante.",
          "excepcional": false,
          "aprovador": {
            "id": 1,
            "nome": "Ana Beatriz",
            "matricula": "CBMDF-1023"
          },
          "migrado": false
        },
        {
          "de": "DFD Aprovado pela Unidade",
          "para": "Em Análise Setorial",
          "em": "2025-09-30T12:00:00Z",
          "por": {
            "id": 3,
            "nome": "Fernanda Silva",
            "matricula": "CBMDF-1091"
          },
          "perfil": "compras",
          "origem": "status.html",
          "justificativa": null,
          "excepcional": false,
          "aprovador": null,
          "migrado": false
        },
        {
          "de": "Em Análise Setorial",
          "para": "Consolidado em Item de PCA",
          "em": "2025-10-05T12:00:00Z",
          "por": {
            "id": 3,
            "nome": "Fernanda Silva",
            "matricula": "CBMDF-1091"
          },
          "perfil": "compras",
          "origem": "status.html",
          "justificativa": null,
          "excepcional": false,
          "aprovador": null,
          "migrado": false
        },
        {
          "de": "Consolidado em Item de PCA",
          "para": "PCA Aguardando Aprovação",
          "em": "2025-10-10T12:00:00Z",
          "por": {
            "id": 3,
            "nome": "Fernanda Silva",
            "matricula": "CBMDF-1091"
          },
          "perfil": "compras",
          "origem": "status.html",
          "justificativa": null,
          "excepcional": false,
          "aprovador": null,
          "migrado": false
        },
        {
          "de": "PCA Aguardando Aprovação",
          "para": "Incluído no PCA",
          "em": "2025-10-15T12:00:00Z",
          "por": {
            "id": 3,
            "nome": "Fernanda Silva",
            "matricula": "CBMDF-1091"
          },
          "perfil": "compras",
          "origem": "status.html",
          "justificativa": "Aprovado pela autoridade competente e publicado no PNCP.",
          "excepcional": false,
          "aprovador": {
            "id": 5,
            "nome": "Maria Oliveira",
            "matricula": "CBMDF-1122"
          },
          "migrado": false
        },
        {
          "de": "Incluído no PCA",
          "para": "ETP em Elaboração",
          "em": "2025-10-20T12:00:00Z",
          "por": {
            "id": 3,
            "nome": "Fernanda Silva",
            "matricula": "CBMDF-1091"
          },
          "perfil": "compras",
          "origem": "status.html",
          "justificativa": null,
          "excepcional": false,
          "aprovador": null,
          "migrado": false
        },
        {
          "de": "ETP em Elaboração",
          "para": "Pesquisa de Preços",
          "em": "2025-10-25T12:00:00Z",
          "por": {
            "id": 3,
            "nome": "Fernanda Silva",
            "matricula": "CBMDF-1091"
          },
          "perfil": "compras",
          "origem": "status.html",
          "justificativa": null,
          "excepcional": false,
          "aprovador": null,
          "migrado": false
        },
        {
          "de": "Pesquisa de Preços",
          "para": "TR Elaborado",
          "em": "2025-10-30T12:00:00Z",
          "por": {
            "id": 3,
            "nome": "Fernanda Silva",
            "matricula": "CBMDF-1091"
          },
          "perfil": "compras",
          "origem": "status.html",
          "justificativa": null,
          "excepcional": false,
          "aprovador": null,
          "migrado": false
        },
        {
          "de": "TR Elaborado",
          "para": "Reserva Orçamentária Confirmada",
          "em": "2025-11-04T12:00:00Z",
          "por": {
            "id": 3,
            "nome": "Fernanda Silva",
            "matricula": "CBMDF-1091"
          },
          "perfil": "compras",
          "origem": "status.html",
          "justificativa": null,
          "excepcional": false,
          "aprovador": null,
          "migrado": false
        },
        {
          "de": "Reserva Orçamentária Confirmada",
          "para": "Edital Publicado",
          "em": "2025-11-09T12:00:00Z",
          "por": {
            "id": 3,
            "nome": "Fernanda Silva",
            "matricula": "CBMDF-1091"
          },
          "perfil": "compras",
          "origem": "status.html",
          "justificativa": null,
          "excepcional": false,
          "aprovador": null,
          "migrado": false
        },
        {
          "de": "Edital Publicado",
          "para": "Em Seleção de Fornecedor",
          "em": "2025-11-14T12:00:00Z",
          "por": {
            "id": 3,
            "nome": "Fernanda Silva",
            "matricula": "CBMDF-1091"
          },
          "perfil": "compras",
          "origem": "status.html",
          "justificativa": null,
          "excepcional": false,
          "aprovador": null,
          "migrado": false
        }
      ]
    },
    {
      "id": "PED-2026-0007",
      "data": "23/09/2025, 12:00:00",
      "criadoEm": "2025-09-23T12:00:00Z",
      "status": "Nota de Empenho Emitida",
      "observacoes": "Empenhado.",
      "exercicioPca": 2026,
      "dfd": {
        "dataPretendida": "2026-06-30",
        "servicoContinuado": false,
        "vinculoPlanejamento": "Fardamento"
      },
      "usuario": {
        "id": 4,
        "nome": "João Pedro",
        "matricula": "CBMDF-1108",
        "setor": "DIMAT"
      },
      "itens": [
        {
          "id": 1,
          "nome": "Capacete de proteção tático",
          "categoria": "seguranca",
          "grupoCodigo": "84",
          "grupoNome": "VESTUÁRIOS, EQUIPAMENTOS INDIVIDUAIS E INSÍGNIAS",
          "classeCodigo": "8415",
          "classeNome": "VESTUÁRIO PARA FINS ESPECIAIS",
          "tipo": "MATERIAL",
          "tipoDespesa": "Investimento",
          "naturezaDespesa": "4.4.90.52",
          "quantidade": 20,
          "urgencia": "normal",
          "precoUnitario": 125,
          "subtotal": 2500,
          "itemUid": "PED-2026-0007-I1"
        },
        {
          "id": 10,
          "nome": "Uniforme operacional (CBMDF)",
          "categoria": "manutencao",
          "grupoCodigo": "84",
          "grupoNome": "VESTUÁRIOS, EQUIPAMENTOS INDIVIDUAIS E INSÍGNIAS",
          "classeCodigo": "8405",
          "classeNome": "VESTUÁRIO EXTERNO MASCULINO",
          "tipo": "MATERIAL",
          "tipoDespesa": "Custeio",
          "naturezaDespesa": "3.3.90.30",
          "quantidade": 20,
          "urgencia": "normal",
          "precoUnitario": 245,
          "subtotal": 4900,
          "itemUid": "PED-2026-0007-I2"
        }
      ],
      "priorizacao": {
        "criticidade": 3,
        "risco": 3,
        "obrigatoriedadeLegal": false,
        "prontidao": 4,
        "declaradoEm": "2025-09-23T12:00:00Z",
        "instruidoPor": {
          "id": 3,
          "nome": "Fernanda Silva",
          "matricula": "CBMDF-1091"
        },
        "instruidoEm": "2025-09-26T12:00:00Z"
      },
      "avaliacao": {
        "criterios": {
          "qualidadeProduto": null,
          "fornecedor": null,
          "tempoProjeto": null,
          "comunicacaoSuporte": null,
          "atendeuExpectativa": null
        },
        "finalizada": false,
        "atualizadoEm": null,
        "finalizadoEm": null
      },
      "historico": [
        {
          "de": null,
          "para": "DFD Registrado",
          "em": "2025-09-23T12:00:00Z",
          "por": {
            "id": 4,
            "nome": "João Pedro",
            "matricula": "CBMDF-1108"
          },
          "perfil": "solicitante",
          "origem": "index.html",
          "justificativa": "Solicitação registrada pelo requisitante.",
          "excepcional": false,
          "aprovador": null,
          "migrado": false
        },
        {
          "de": "DFD Registrado",
          "para": "DFD Aprovado pela Unidade",
          "em": "2025-09-28T12:00:00Z",
          "por": {
            "id": 1,
            "nome": "Ana Beatriz",
            "matricula": "CBMDF-1023"
          },
          "perfil": "gestor",
          "origem": "status.html",
          "justificativa": "Demanda validada pela autoridade da unidade requisitante.",
          "excepcional": false,
          "aprovador": {
            "id": 1,
            "nome": "Ana Beatriz",
            "matricula": "CBMDF-1023"
          },
          "migrado": false
        },
        {
          "de": "DFD Aprovado pela Unidade",
          "para": "Em Análise Setorial",
          "em": "2025-10-03T12:00:00Z",
          "por": {
            "id": 3,
            "nome": "Fernanda Silva",
            "matricula": "CBMDF-1091"
          },
          "perfil": "compras",
          "origem": "status.html",
          "justificativa": null,
          "excepcional": false,
          "aprovador": null,
          "migrado": false
        },
        {
          "de": "Em Análise Setorial",
          "para": "Consolidado em Item de PCA",
          "em": "2025-10-08T12:00:00Z",
          "por": {
            "id": 3,
            "nome": "Fernanda Silva",
            "matricula": "CBMDF-1091"
          },
          "perfil": "compras",
          "origem": "status.html",
          "justificativa": null,
          "excepcional": false,
          "aprovador": null,
          "migrado": false
        },
        {
          "de": "Consolidado em Item de PCA",
          "para": "PCA Aguardando Aprovação",
          "em": "2025-10-13T12:00:00Z",
          "por": {
            "id": 3,
            "nome": "Fernanda Silva",
            "matricula": "CBMDF-1091"
          },
          "perfil": "compras",
          "origem": "status.html",
          "justificativa": null,
          "excepcional": false,
          "aprovador": null,
          "migrado": false
        },
        {
          "de": "PCA Aguardando Aprovação",
          "para": "Incluído no PCA",
          "em": "2025-10-18T12:00:00Z",
          "por": {
            "id": 3,
            "nome": "Fernanda Silva",
            "matricula": "CBMDF-1091"
          },
          "perfil": "compras",
          "origem": "status.html",
          "justificativa": "Aprovado pela autoridade competente e publicado no PNCP.",
          "excepcional": false,
          "aprovador": {
            "id": 5,
            "nome": "Maria Oliveira",
            "matricula": "CBMDF-1122"
          },
          "migrado": false
        },
        {
          "de": "Incluído no PCA",
          "para": "ETP em Elaboração",
          "em": "2025-10-23T12:00:00Z",
          "por": {
            "id": 3,
            "nome": "Fernanda Silva",
            "matricula": "CBMDF-1091"
          },
          "perfil": "compras",
          "origem": "status.html",
          "justificativa": null,
          "excepcional": false,
          "aprovador": null,
          "migrado": false
        },
        {
          "de": "ETP em Elaboração",
          "para": "Pesquisa de Preços",
          "em": "2025-10-28T12:00:00Z",
          "por": {
            "id": 3,
            "nome": "Fernanda Silva",
            "matricula": "CBMDF-1091"
          },
          "perfil": "compras",
          "origem": "status.html",
          "justificativa": null,
          "excepcional": false,
          "aprovador": null,
          "migrado": false
        },
        {
          "de": "Pesquisa de Preços",
          "para": "TR Elaborado",
          "em": "2025-11-02T12:00:00Z",
          "por": {
            "id": 3,
            "nome": "Fernanda Silva",
            "matricula": "CBMDF-1091"
          },
          "perfil": "compras",
          "origem": "status.html",
          "justificativa": null,
          "excepcional": false,
          "aprovador": null,
          "migrado": false
        },
        {
          "de": "TR Elaborado",
          "para": "Reserva Orçamentária Confirmada",
          "em": "2025-11-07T12:00:00Z",
          "por": {
            "id": 3,
            "nome": "Fernanda Silva",
            "matricula": "CBMDF-1091"
          },
          "perfil": "compras",
          "origem": "status.html",
          "justificativa": null,
          "excepcional": false,
          "aprovador": null,
          "migrado": false
        },
        {
          "de": "Reserva Orçamentária Confirmada",
          "para": "Edital Publicado",
          "em": "2025-11-12T12:00:00Z",
          "por": {
            "id": 3,
            "nome": "Fernanda Silva",
            "matricula": "CBMDF-1091"
          },
          "perfil": "compras",
          "origem": "status.html",
          "justificativa": null,
          "excepcional": false,
          "aprovador": null,
          "migrado": false
        },
        {
          "de": "Edital Publicado",
          "para": "Em Seleção de Fornecedor",
          "em": "2025-11-17T12:00:00Z",
          "por": {
            "id": 3,
            "nome": "Fernanda Silva",
            "matricula": "CBMDF-1091"
          },
          "perfil": "compras",
          "origem": "status.html",
          "justificativa": null,
          "excepcional": false,
          "aprovador": null,
          "migrado": false
        },
        {
          "de": "Em Seleção de Fornecedor",
          "para": "Nota de Empenho Emitida",
          "em": "2025-11-22T12:00:00Z",
          "por": {
            "id": 3,
            "nome": "Fernanda Silva",
            "matricula": "CBMDF-1091"
          },
          "perfil": "compras",
          "origem": "status.html",
          "justificativa": null,
          "excepcional": false,
          "aprovador": null,
          "migrado": false
        }
      ]
    },
    {
      "id": "PED-2026-0008",
      "data": "26/09/2025, 12:00:00",
      "criadoEm": "2025-09-26T12:00:00Z",
      "status": "Ordem de Fornecimento Emitida",
      "observacoes": "",
      "exercicioPca": 2026,
      "dfd": {
        "dataPretendida": "2026-06-30",
        "servicoContinuado": false,
        "vinculoPlanejamento": "Iluminação"
      },
      "usuario": {
        "id": 3,
        "nome": "Fernanda Silva",
        "matricula": "CBMDF-1091",
        "setor": "DITIC"
      },
      "itens": [
        {
          "id": 6,
          "nome": "Lanterna tática recarregável",
          "categoria": "manutencao",
          "grupoCodigo": "62",
          "grupoNome": "LÂMPADAS E ACCSSÓRIOS DE ILUMINAÇÃO",
          "classeCodigo": "6230",
          "classeNome": "LÂMPADAS ELÉTRICAS PORTÁTEIS E DISPOSITIVOS DE FIXAÇÃO",
          "tipo": "MATERIAL",
          "tipoDespesa": "Custeio",
          "naturezaDespesa": "3.3.90.30",
          "quantidade": 10,
          "urgencia": "normal",
          "precoUnitario": 86,
          "subtotal": 860,
          "itemUid": "PED-2026-0008-I1"
        }
      ],
      "priorizacao": {
        "criticidade": 2,
        "risco": 3,
        "obrigatoriedadeLegal": false,
        "prontidao": 1,
        "declaradoEm": "2025-09-26T12:00:00Z"
      },
      "avaliacao": {
        "criterios": {
          "qualidadeProduto": null,
          "fornecedor": null,
          "tempoProjeto": null,
          "comunicacaoSuporte": null,
          "atendeuExpectativa": null
        },
        "finalizada": false,
        "atualizadoEm": null,
        "finalizadoEm": null
      },
      "historico": [
        {
          "de": null,
          "para": "DFD Registrado",
          "em": "2025-09-26T12:00:00Z",
          "por": {
            "id": 3,
            "nome": "Fernanda Silva",
            "matricula": "CBMDF-1091"
          },
          "perfil": "solicitante",
          "origem": "index.html",
          "justificativa": "Solicitação registrada pelo requisitante.",
          "excepcional": false,
          "aprovador": null,
          "migrado": false
        },
        {
          "de": "DFD Registrado",
          "para": "DFD Aprovado pela Unidade",
          "em": "2025-10-01T12:00:00Z",
          "por": {
            "id": 1,
            "nome": "Ana Beatriz",
            "matricula": "CBMDF-1023"
          },
          "perfil": "gestor",
          "origem": "status.html",
          "justificativa": "Demanda validada pela autoridade da unidade requisitante.",
          "excepcional": false,
          "aprovador": {
            "id": 1,
            "nome": "Ana Beatriz",
            "matricula": "CBMDF-1023"
          },
          "migrado": false
        },
        {
          "de": "DFD Aprovado pela Unidade",
          "para": "Em Análise Setorial",
          "em": "2025-10-06T12:00:00Z",
          "por": {
            "id": 3,
            "nome": "Fernanda Silva",
            "matricula": "CBMDF-1091"
          },
          "perfil": "compras",
          "origem": "status.html",
          "justificativa": null,
          "excepcional": false,
          "aprovador": null,
          "migrado": false
        },
        {
          "de": "Em Análise Setorial",
          "para": "Consolidado em Item de PCA",
          "em": "2025-10-11T12:00:00Z",
          "por": {
            "id": 3,
            "nome": "Fernanda Silva",
            "matricula": "CBMDF-1091"
          },
          "perfil": "compras",
          "origem": "status.html",
          "justificativa": null,
          "excepcional": false,
          "aprovador": null,
          "migrado": false
        },
        {
          "de": "Consolidado em Item de PCA",
          "para": "PCA Aguardando Aprovação",
          "em": "2025-10-16T12:00:00Z",
          "por": {
            "id": 3,
            "nome": "Fernanda Silva",
            "matricula": "CBMDF-1091"
          },
          "perfil": "compras",
          "origem": "status.html",
          "justificativa": null,
          "excepcional": false,
          "aprovador": null,
          "migrado": false
        },
        {
          "de": "PCA Aguardando Aprovação",
          "para": "Incluído no PCA",
          "em": "2025-10-21T12:00:00Z",
          "por": {
            "id": 3,
            "nome": "Fernanda Silva",
            "matricula": "CBMDF-1091"
          },
          "perfil": "compras",
          "origem": "status.html",
          "justificativa": "Aprovado pela autoridade competente e publicado no PNCP.",
          "excepcional": false,
          "aprovador": {
            "id": 5,
            "nome": "Maria Oliveira",
            "matricula": "CBMDF-1122"
          },
          "migrado": false
        },
        {
          "de": "Incluído no PCA",
          "para": "ETP em Elaboração",
          "em": "2025-10-26T12:00:00Z",
          "por": {
            "id": 3,
            "nome": "Fernanda Silva",
            "matricula": "CBMDF-1091"
          },
          "perfil": "compras",
          "origem": "status.html",
          "justificativa": null,
          "excepcional": false,
          "aprovador": null,
          "migrado": false
        },
        {
          "de": "ETP em Elaboração",
          "para": "Pesquisa de Preços",
          "em": "2025-10-31T12:00:00Z",
          "por": {
            "id": 3,
            "nome": "Fernanda Silva",
            "matricula": "CBMDF-1091"
          },
          "perfil": "compras",
          "origem": "status.html",
          "justificativa": null,
          "excepcional": false,
          "aprovador": null,
          "migrado": false
        },
        {
          "de": "Pesquisa de Preços",
          "para": "TR Elaborado",
          "em": "2025-11-05T12:00:00Z",
          "por": {
            "id": 3,
            "nome": "Fernanda Silva",
            "matricula": "CBMDF-1091"
          },
          "perfil": "compras",
          "origem": "status.html",
          "justificativa": null,
          "excepcional": false,
          "aprovador": null,
          "migrado": false
        },
        {
          "de": "TR Elaborado",
          "para": "Reserva Orçamentária Confirmada",
          "em": "2025-11-10T12:00:00Z",
          "por": {
            "id": 3,
            "nome": "Fernanda Silva",
            "matricula": "CBMDF-1091"
          },
          "perfil": "compras",
          "origem": "status.html",
          "justificativa": null,
          "excepcional": false,
          "aprovador": null,
          "migrado": false
        },
        {
          "de": "Reserva Orçamentária Confirmada",
          "para": "Edital Publicado",
          "em": "2025-11-15T12:00:00Z",
          "por": {
            "id": 3,
            "nome": "Fernanda Silva",
            "matricula": "CBMDF-1091"
          },
          "perfil": "compras",
          "origem": "status.html",
          "justificativa": null,
          "excepcional": false,
          "aprovador": null,
          "migrado": false
        },
        {
          "de": "Edital Publicado",
          "para": "Em Seleção de Fornecedor",
          "em": "2025-11-20T12:00:00Z",
          "por": {
            "id": 3,
            "nome": "Fernanda Silva",
            "matricula": "CBMDF-1091"
          },
          "perfil": "compras",
          "origem": "status.html",
          "justificativa": null,
          "excepcional": false,
          "aprovador": null,
          "migrado": false
        },
        {
          "de": "Em Seleção de Fornecedor",
          "para": "Nota de Empenho Emitida",
          "em": "2025-11-25T12:00:00Z",
          "por": {
            "id": 3,
            "nome": "Fernanda Silva",
            "matricula": "CBMDF-1091"
          },
          "perfil": "compras",
          "origem": "status.html",
          "justificativa": null,
          "excepcional": false,
          "aprovador": null,
          "migrado": false
        },
        {
          "de": "Nota de Empenho Emitida",
          "para": "Ordem de Fornecimento Emitida",
          "em": "2025-11-30T12:00:00Z",
          "por": {
            "id": 3,
            "nome": "Fernanda Silva",
            "matricula": "CBMDF-1091"
          },
          "perfil": "compras",
          "origem": "status.html",
          "justificativa": null,
          "excepcional": false,
          "aprovador": null,
          "migrado": false
        }
      ]
    },
    {
      "id": "PED-2026-0009",
      "data": "29/09/2025, 12:00:00",
      "criadoEm": "2025-09-29T12:00:00Z",
      "status": "Em Trânsito ou Fabricação",
      "observacoes": "",
      "exercicioPca": 2026,
      "dfd": {
        "dataPretendida": "2026-06-30",
        "servicoContinuado": false,
        "vinculoPlanejamento": "Salvamento em altura"
      },
      "usuario": {
        "id": 1,
        "nome": "Ana Beatriz",
        "matricula": "CBMDF-1023",
        "setor": "COMOP"
      },
      "itens": [
        {
          "id": 13,
          "nome": "Cinto / Baudrier para Salvamento em Altura",
          "categoria": "seguranca",
          "grupoCodigo": "42",
          "grupoNome": "EQUIPAMENTO PARA COMBATE A INCÊNDIO, RESGATE E SEGURANÇA",
          "classeCodigo": "4240",
          "classeNome": "EQUIPAMENTO PARA SEGURANÇA E SALVAMENTO",
          "tipo": "MATERIAL",
          "tipoDespesa": "Investimento",
          "naturezaDespesa": "4.4.90.52",
          "quantidade": 6,
          "urgencia": "normal",
          "precoUnitario": 890,
          "subtotal": 5340,
          "itemUid": "PED-2026-0009-I1"
        }
      ],
      "priorizacao": {
        "criticidade": 3,
        "risco": 3,
        "obrigatoriedadeLegal": false,
        "prontidao": 1,
        "declaradoEm": "2025-09-29T12:00:00Z"
      },
      "avaliacao": {
        "criterios": {
          "qualidadeProduto": null,
          "fornecedor": null,
          "tempoProjeto": null,
          "comunicacaoSuporte": null,
          "atendeuExpectativa": null
        },
        "finalizada": false,
        "atualizadoEm": null,
        "finalizadoEm": null
      },
      "historico": [
        {
          "de": null,
          "para": "DFD Registrado",
          "em": "2025-09-29T12:00:00Z",
          "por": {
            "id": 1,
            "nome": "Ana Beatriz",
            "matricula": "CBMDF-1023"
          },
          "perfil": "solicitante",
          "origem": "index.html",
          "justificativa": "Solicitação registrada pelo requisitante.",
          "excepcional": false,
          "aprovador": null,
          "migrado": false
        },
        {
          "de": "DFD Registrado",
          "para": "DFD Aprovado pela Unidade",
          "em": "2025-10-04T12:00:00Z",
          "por": {
            "id": 1,
            "nome": "Ana Beatriz",
            "matricula": "CBMDF-1023"
          },
          "perfil": "gestor",
          "origem": "status.html",
          "justificativa": "Demanda validada pela autoridade da unidade requisitante.",
          "excepcional": false,
          "aprovador": {
            "id": 1,
            "nome": "Ana Beatriz",
            "matricula": "CBMDF-1023"
          },
          "migrado": false
        },
        {
          "de": "DFD Aprovado pela Unidade",
          "para": "Em Análise Setorial",
          "em": "2025-10-09T12:00:00Z",
          "por": {
            "id": 3,
            "nome": "Fernanda Silva",
            "matricula": "CBMDF-1091"
          },
          "perfil": "compras",
          "origem": "status.html",
          "justificativa": null,
          "excepcional": false,
          "aprovador": null,
          "migrado": false
        },
        {
          "de": "Em Análise Setorial",
          "para": "Consolidado em Item de PCA",
          "em": "2025-10-14T12:00:00Z",
          "por": {
            "id": 3,
            "nome": "Fernanda Silva",
            "matricula": "CBMDF-1091"
          },
          "perfil": "compras",
          "origem": "status.html",
          "justificativa": null,
          "excepcional": false,
          "aprovador": null,
          "migrado": false
        },
        {
          "de": "Consolidado em Item de PCA",
          "para": "PCA Aguardando Aprovação",
          "em": "2025-10-19T12:00:00Z",
          "por": {
            "id": 3,
            "nome": "Fernanda Silva",
            "matricula": "CBMDF-1091"
          },
          "perfil": "compras",
          "origem": "status.html",
          "justificativa": null,
          "excepcional": false,
          "aprovador": null,
          "migrado": false
        },
        {
          "de": "PCA Aguardando Aprovação",
          "para": "Incluído no PCA",
          "em": "2025-10-24T12:00:00Z",
          "por": {
            "id": 3,
            "nome": "Fernanda Silva",
            "matricula": "CBMDF-1091"
          },
          "perfil": "compras",
          "origem": "status.html",
          "justificativa": "Aprovado pela autoridade competente e publicado no PNCP.",
          "excepcional": false,
          "aprovador": {
            "id": 5,
            "nome": "Maria Oliveira",
            "matricula": "CBMDF-1122"
          },
          "migrado": false
        },
        {
          "de": "Incluído no PCA",
          "para": "ETP em Elaboração",
          "em": "2025-10-29T12:00:00Z",
          "por": {
            "id": 3,
            "nome": "Fernanda Silva",
            "matricula": "CBMDF-1091"
          },
          "perfil": "compras",
          "origem": "status.html",
          "justificativa": null,
          "excepcional": false,
          "aprovador": null,
          "migrado": false
        },
        {
          "de": "ETP em Elaboração",
          "para": "Pesquisa de Preços",
          "em": "2025-11-03T12:00:00Z",
          "por": {
            "id": 3,
            "nome": "Fernanda Silva",
            "matricula": "CBMDF-1091"
          },
          "perfil": "compras",
          "origem": "status.html",
          "justificativa": null,
          "excepcional": false,
          "aprovador": null,
          "migrado": false
        },
        {
          "de": "Pesquisa de Preços",
          "para": "TR Elaborado",
          "em": "2025-11-08T12:00:00Z",
          "por": {
            "id": 3,
            "nome": "Fernanda Silva",
            "matricula": "CBMDF-1091"
          },
          "perfil": "compras",
          "origem": "status.html",
          "justificativa": null,
          "excepcional": false,
          "aprovador": null,
          "migrado": false
        },
        {
          "de": "TR Elaborado",
          "para": "Reserva Orçamentária Confirmada",
          "em": "2025-11-13T12:00:00Z",
          "por": {
            "id": 3,
            "nome": "Fernanda Silva",
            "matricula": "CBMDF-1091"
          },
          "perfil": "compras",
          "origem": "status.html",
          "justificativa": null,
          "excepcional": false,
          "aprovador": null,
          "migrado": false
        },
        {
          "de": "Reserva Orçamentária Confirmada",
          "para": "Edital Publicado",
          "em": "2025-11-18T12:00:00Z",
          "por": {
            "id": 3,
            "nome": "Fernanda Silva",
            "matricula": "CBMDF-1091"
          },
          "perfil": "compras",
          "origem": "status.html",
          "justificativa": null,
          "excepcional": false,
          "aprovador": null,
          "migrado": false
        },
        {
          "de": "Edital Publicado",
          "para": "Em Seleção de Fornecedor",
          "em": "2025-11-23T12:00:00Z",
          "por": {
            "id": 3,
            "nome": "Fernanda Silva",
            "matricula": "CBMDF-1091"
          },
          "perfil": "compras",
          "origem": "status.html",
          "justificativa": null,
          "excepcional": false,
          "aprovador": null,
          "migrado": false
        },
        {
          "de": "Em Seleção de Fornecedor",
          "para": "Nota de Empenho Emitida",
          "em": "2025-11-28T12:00:00Z",
          "por": {
            "id": 3,
            "nome": "Fernanda Silva",
            "matricula": "CBMDF-1091"
          },
          "perfil": "compras",
          "origem": "status.html",
          "justificativa": null,
          "excepcional": false,
          "aprovador": null,
          "migrado": false
        },
        {
          "de": "Nota de Empenho Emitida",
          "para": "Ordem de Fornecimento Emitida",
          "em": "2025-12-03T12:00:00Z",
          "por": {
            "id": 3,
            "nome": "Fernanda Silva",
            "matricula": "CBMDF-1091"
          },
          "perfil": "compras",
          "origem": "status.html",
          "justificativa": null,
          "excepcional": false,
          "aprovador": null,
          "migrado": false
        },
        {
          "de": "Ordem de Fornecimento Emitida",
          "para": "Em Trânsito ou Fabricação",
          "em": "2025-12-08T12:00:00Z",
          "por": {
            "id": 3,
            "nome": "Fernanda Silva",
            "matricula": "CBMDF-1091"
          },
          "perfil": "compras",
          "origem": "status.html",
          "justificativa": null,
          "excepcional": false,
          "aprovador": null,
          "migrado": false
        }
      ]
    },
    {
      "id": "PED-2026-0010",
      "data": "02/10/2025, 12:00:00",
      "criadoEm": "2025-10-02T12:00:00Z",
      "status": "Recebimento Provisório",
      "observacoes": "",
      "exercicioPca": 2026,
      "dfd": {
        "dataPretendida": "2026-06-30",
        "servicoContinuado": false,
        "vinculoPlanejamento": "APH"
      },
      "usuario": {
        "id": 5,
        "nome": "Maria Oliveira",
        "matricula": "CBMDF-1122",
        "setor": "COMAP"
      },
      "itens": [
        {
          "id": 8,
          "nome": "Kit de primeiros socorros APH",
          "categoria": "higiene",
          "grupoCodigo": "65",
          "grupoNome": "EQUIPAMENTOS E ARTIGOS PARA USO MÉDICO, DENTÁRIO E VETERINÁRIO",
          "classeCodigo": "6510",
          "classeNome": "MATERIAIS CIRÚRGICOS PARA CURATIVOS",
          "tipo": "MATERIAL",
          "tipoDespesa": "Custeio",
          "naturezaDespesa": "3.3.90.30",
          "quantidade": 15,
          "urgencia": "normal",
          "precoUnitario": 135,
          "subtotal": 2025,
          "itemUid": "PED-2026-0010-I1"
        }
      ],
      "priorizacao": {
        "criticidade": 4,
        "risco": 4,
        "obrigatoriedadeLegal": false,
        "prontidao": 1,
        "declaradoEm": "2025-10-02T12:00:00Z"
      },
      "avaliacao": {
        "criterios": {
          "qualidadeProduto": null,
          "fornecedor": null,
          "tempoProjeto": null,
          "comunicacaoSuporte": null,
          "atendeuExpectativa": null
        },
        "finalizada": false,
        "atualizadoEm": null,
        "finalizadoEm": null
      },
      "historico": [
        {
          "de": null,
          "para": "DFD Registrado",
          "em": "2025-10-02T12:00:00Z",
          "por": {
            "id": 5,
            "nome": "Maria Oliveira",
            "matricula": "CBMDF-1122"
          },
          "perfil": "solicitante",
          "origem": "index.html",
          "justificativa": "Solicitação registrada pelo requisitante.",
          "excepcional": false,
          "aprovador": null,
          "migrado": false
        },
        {
          "de": "DFD Registrado",
          "para": "DFD Aprovado pela Unidade",
          "em": "2025-10-07T12:00:00Z",
          "por": {
            "id": 1,
            "nome": "Ana Beatriz",
            "matricula": "CBMDF-1023"
          },
          "perfil": "gestor",
          "origem": "status.html",
          "justificativa": "Demanda validada pela autoridade da unidade requisitante.",
          "excepcional": false,
          "aprovador": {
            "id": 1,
            "nome": "Ana Beatriz",
            "matricula": "CBMDF-1023"
          },
          "migrado": false
        },
        {
          "de": "DFD Aprovado pela Unidade",
          "para": "Em Análise Setorial",
          "em": "2025-10-12T12:00:00Z",
          "por": {
            "id": 3,
            "nome": "Fernanda Silva",
            "matricula": "CBMDF-1091"
          },
          "perfil": "compras",
          "origem": "status.html",
          "justificativa": null,
          "excepcional": false,
          "aprovador": null,
          "migrado": false
        },
        {
          "de": "Em Análise Setorial",
          "para": "Consolidado em Item de PCA",
          "em": "2025-10-17T12:00:00Z",
          "por": {
            "id": 3,
            "nome": "Fernanda Silva",
            "matricula": "CBMDF-1091"
          },
          "perfil": "compras",
          "origem": "status.html",
          "justificativa": null,
          "excepcional": false,
          "aprovador": null,
          "migrado": false
        },
        {
          "de": "Consolidado em Item de PCA",
          "para": "PCA Aguardando Aprovação",
          "em": "2025-10-22T12:00:00Z",
          "por": {
            "id": 3,
            "nome": "Fernanda Silva",
            "matricula": "CBMDF-1091"
          },
          "perfil": "compras",
          "origem": "status.html",
          "justificativa": null,
          "excepcional": false,
          "aprovador": null,
          "migrado": false
        },
        {
          "de": "PCA Aguardando Aprovação",
          "para": "Incluído no PCA",
          "em": "2025-10-27T12:00:00Z",
          "por": {
            "id": 3,
            "nome": "Fernanda Silva",
            "matricula": "CBMDF-1091"
          },
          "perfil": "compras",
          "origem": "status.html",
          "justificativa": "Aprovado pela autoridade competente e publicado no PNCP.",
          "excepcional": false,
          "aprovador": {
            "id": 5,
            "nome": "Maria Oliveira",
            "matricula": "CBMDF-1122"
          },
          "migrado": false
        },
        {
          "de": "Incluído no PCA",
          "para": "ETP em Elaboração",
          "em": "2025-11-01T12:00:00Z",
          "por": {
            "id": 3,
            "nome": "Fernanda Silva",
            "matricula": "CBMDF-1091"
          },
          "perfil": "compras",
          "origem": "status.html",
          "justificativa": null,
          "excepcional": false,
          "aprovador": null,
          "migrado": false
        },
        {
          "de": "ETP em Elaboração",
          "para": "Pesquisa de Preços",
          "em": "2025-11-06T12:00:00Z",
          "por": {
            "id": 3,
            "nome": "Fernanda Silva",
            "matricula": "CBMDF-1091"
          },
          "perfil": "compras",
          "origem": "status.html",
          "justificativa": null,
          "excepcional": false,
          "aprovador": null,
          "migrado": false
        },
        {
          "de": "Pesquisa de Preços",
          "para": "TR Elaborado",
          "em": "2025-11-11T12:00:00Z",
          "por": {
            "id": 3,
            "nome": "Fernanda Silva",
            "matricula": "CBMDF-1091"
          },
          "perfil": "compras",
          "origem": "status.html",
          "justificativa": null,
          "excepcional": false,
          "aprovador": null,
          "migrado": false
        },
        {
          "de": "TR Elaborado",
          "para": "Reserva Orçamentária Confirmada",
          "em": "2025-11-16T12:00:00Z",
          "por": {
            "id": 3,
            "nome": "Fernanda Silva",
            "matricula": "CBMDF-1091"
          },
          "perfil": "compras",
          "origem": "status.html",
          "justificativa": null,
          "excepcional": false,
          "aprovador": null,
          "migrado": false
        },
        {
          "de": "Reserva Orçamentária Confirmada",
          "para": "Edital Publicado",
          "em": "2025-11-21T12:00:00Z",
          "por": {
            "id": 3,
            "nome": "Fernanda Silva",
            "matricula": "CBMDF-1091"
          },
          "perfil": "compras",
          "origem": "status.html",
          "justificativa": null,
          "excepcional": false,
          "aprovador": null,
          "migrado": false
        },
        {
          "de": "Edital Publicado",
          "para": "Em Seleção de Fornecedor",
          "em": "2025-11-26T12:00:00Z",
          "por": {
            "id": 3,
            "nome": "Fernanda Silva",
            "matricula": "CBMDF-1091"
          },
          "perfil": "compras",
          "origem": "status.html",
          "justificativa": null,
          "excepcional": false,
          "aprovador": null,
          "migrado": false
        },
        {
          "de": "Em Seleção de Fornecedor",
          "para": "Nota de Empenho Emitida",
          "em": "2025-12-01T12:00:00Z",
          "por": {
            "id": 3,
            "nome": "Fernanda Silva",
            "matricula": "CBMDF-1091"
          },
          "perfil": "compras",
          "origem": "status.html",
          "justificativa": null,
          "excepcional": false,
          "aprovador": null,
          "migrado": false
        },
        {
          "de": "Nota de Empenho Emitida",
          "para": "Ordem de Fornecimento Emitida",
          "em": "2025-12-06T12:00:00Z",
          "por": {
            "id": 3,
            "nome": "Fernanda Silva",
            "matricula": "CBMDF-1091"
          },
          "perfil": "compras",
          "origem": "status.html",
          "justificativa": null,
          "excepcional": false,
          "aprovador": null,
          "migrado": false
        },
        {
          "de": "Ordem de Fornecimento Emitida",
          "para": "Em Trânsito ou Fabricação",
          "em": "2025-12-11T12:00:00Z",
          "por": {
            "id": 3,
            "nome": "Fernanda Silva",
            "matricula": "CBMDF-1091"
          },
          "perfil": "compras",
          "origem": "status.html",
          "justificativa": null,
          "excepcional": false,
          "aprovador": null,
          "migrado": false
        },
        {
          "de": "Em Trânsito ou Fabricação",
          "para": "Recebimento Provisório",
          "em": "2025-12-16T12:00:00Z",
          "por": {
            "id": 3,
            "nome": "Fernanda Silva",
            "matricula": "CBMDF-1091"
          },
          "perfil": "compras",
          "origem": "status.html",
          "justificativa": null,
          "excepcional": false,
          "aprovador": null,
          "migrado": false
        }
      ]
    },
    {
      "id": "PED-2026-0011",
      "data": "05/10/2025, 12:00:00",
      "criadoEm": "2025-10-05T12:00:00Z",
      "status": "Recebimento Rejeitado (Aguardando Substituição)",
      "observacoes": "Lote rejeitado na conferência.",
      "exercicioPca": 2026,
      "dfd": {
        "dataPretendida": "2026-06-30",
        "servicoContinuado": false,
        "vinculoPlanejamento": "Combate a incêndio"
      },
      "usuario": {
        "id": 2,
        "nome": "Carlos Eduardo",
        "matricula": "CBMDF-1047",
        "setor": "CESMA"
      },
      "itens": [
        {
          "id": 4,
          "nome": "Extintor ABC 4kg",
          "categoria": "seguranca",
          "grupoCodigo": "42",
          "grupoNome": "EQUIPAMENTO PARA COMBATE A INCÊNDIO, RESGATE E SEGURANÇA",
          "classeCodigo": "4210",
          "classeNome": "EQUIPAMENTOS PARA COMBATE A INCÊNDIO",
          "tipo": "MATERIAL",
          "tipoDespesa": "Custeio",
          "naturezaDespesa": "3.3.90.30",
          "quantidade": 20,
          "urgencia": "normal",
          "precoUnitario": 158,
          "subtotal": 3160,
          "itemUid": "PED-2026-0011-I1"
        }
      ],
      "priorizacao": {
        "criticidade": 3,
        "risco": 3,
        "obrigatoriedadeLegal": false,
        "prontidao": 1,
        "declaradoEm": "2025-10-05T12:00:00Z"
      },
      "avaliacao": {
        "criterios": {
          "qualidadeProduto": null,
          "fornecedor": null,
          "tempoProjeto": null,
          "comunicacaoSuporte": null,
          "atendeuExpectativa": null
        },
        "finalizada": false,
        "atualizadoEm": null,
        "finalizadoEm": null
      },
      "historico": [
        {
          "de": null,
          "para": "DFD Registrado",
          "em": "2025-10-05T12:00:00Z",
          "por": {
            "id": 2,
            "nome": "Carlos Eduardo",
            "matricula": "CBMDF-1047"
          },
          "perfil": "solicitante",
          "origem": "index.html",
          "justificativa": "Solicitação registrada pelo requisitante.",
          "excepcional": false,
          "aprovador": null,
          "migrado": false
        },
        {
          "de": "DFD Registrado",
          "para": "DFD Aprovado pela Unidade",
          "em": "2025-10-10T12:00:00Z",
          "por": {
            "id": 1,
            "nome": "Ana Beatriz",
            "matricula": "CBMDF-1023"
          },
          "perfil": "gestor",
          "origem": "status.html",
          "justificativa": "Demanda validada pela autoridade da unidade requisitante.",
          "excepcional": false,
          "aprovador": {
            "id": 1,
            "nome": "Ana Beatriz",
            "matricula": "CBMDF-1023"
          },
          "migrado": false
        },
        {
          "de": "DFD Aprovado pela Unidade",
          "para": "Em Análise Setorial",
          "em": "2025-10-15T12:00:00Z",
          "por": {
            "id": 3,
            "nome": "Fernanda Silva",
            "matricula": "CBMDF-1091"
          },
          "perfil": "compras",
          "origem": "status.html",
          "justificativa": null,
          "excepcional": false,
          "aprovador": null,
          "migrado": false
        },
        {
          "de": "Em Análise Setorial",
          "para": "Consolidado em Item de PCA",
          "em": "2025-10-20T12:00:00Z",
          "por": {
            "id": 3,
            "nome": "Fernanda Silva",
            "matricula": "CBMDF-1091"
          },
          "perfil": "compras",
          "origem": "status.html",
          "justificativa": null,
          "excepcional": false,
          "aprovador": null,
          "migrado": false
        },
        {
          "de": "Consolidado em Item de PCA",
          "para": "PCA Aguardando Aprovação",
          "em": "2025-10-25T12:00:00Z",
          "por": {
            "id": 3,
            "nome": "Fernanda Silva",
            "matricula": "CBMDF-1091"
          },
          "perfil": "compras",
          "origem": "status.html",
          "justificativa": null,
          "excepcional": false,
          "aprovador": null,
          "migrado": false
        },
        {
          "de": "PCA Aguardando Aprovação",
          "para": "Incluído no PCA",
          "em": "2025-10-30T12:00:00Z",
          "por": {
            "id": 3,
            "nome": "Fernanda Silva",
            "matricula": "CBMDF-1091"
          },
          "perfil": "compras",
          "origem": "status.html",
          "justificativa": "Aprovado pela autoridade competente e publicado no PNCP.",
          "excepcional": false,
          "aprovador": {
            "id": 5,
            "nome": "Maria Oliveira",
            "matricula": "CBMDF-1122"
          },
          "migrado": false
        },
        {
          "de": "Incluído no PCA",
          "para": "ETP em Elaboração",
          "em": "2025-11-04T12:00:00Z",
          "por": {
            "id": 3,
            "nome": "Fernanda Silva",
            "matricula": "CBMDF-1091"
          },
          "perfil": "compras",
          "origem": "status.html",
          "justificativa": null,
          "excepcional": false,
          "aprovador": null,
          "migrado": false
        },
        {
          "de": "ETP em Elaboração",
          "para": "Pesquisa de Preços",
          "em": "2025-11-09T12:00:00Z",
          "por": {
            "id": 3,
            "nome": "Fernanda Silva",
            "matricula": "CBMDF-1091"
          },
          "perfil": "compras",
          "origem": "status.html",
          "justificativa": null,
          "excepcional": false,
          "aprovador": null,
          "migrado": false
        },
        {
          "de": "Pesquisa de Preços",
          "para": "TR Elaborado",
          "em": "2025-11-14T12:00:00Z",
          "por": {
            "id": 3,
            "nome": "Fernanda Silva",
            "matricula": "CBMDF-1091"
          },
          "perfil": "compras",
          "origem": "status.html",
          "justificativa": null,
          "excepcional": false,
          "aprovador": null,
          "migrado": false
        },
        {
          "de": "TR Elaborado",
          "para": "Reserva Orçamentária Confirmada",
          "em": "2025-11-19T12:00:00Z",
          "por": {
            "id": 3,
            "nome": "Fernanda Silva",
            "matricula": "CBMDF-1091"
          },
          "perfil": "compras",
          "origem": "status.html",
          "justificativa": null,
          "excepcional": false,
          "aprovador": null,
          "migrado": false
        },
        {
          "de": "Reserva Orçamentária Confirmada",
          "para": "Edital Publicado",
          "em": "2025-11-24T12:00:00Z",
          "por": {
            "id": 3,
            "nome": "Fernanda Silva",
            "matricula": "CBMDF-1091"
          },
          "perfil": "compras",
          "origem": "status.html",
          "justificativa": null,
          "excepcional": false,
          "aprovador": null,
          "migrado": false
        },
        {
          "de": "Edital Publicado",
          "para": "Em Seleção de Fornecedor",
          "em": "2025-11-29T12:00:00Z",
          "por": {
            "id": 3,
            "nome": "Fernanda Silva",
            "matricula": "CBMDF-1091"
          },
          "perfil": "compras",
          "origem": "status.html",
          "justificativa": null,
          "excepcional": false,
          "aprovador": null,
          "migrado": false
        },
        {
          "de": "Em Seleção de Fornecedor",
          "para": "Nota de Empenho Emitida",
          "em": "2025-12-04T12:00:00Z",
          "por": {
            "id": 3,
            "nome": "Fernanda Silva",
            "matricula": "CBMDF-1091"
          },
          "perfil": "compras",
          "origem": "status.html",
          "justificativa": null,
          "excepcional": false,
          "aprovador": null,
          "migrado": false
        },
        {
          "de": "Nota de Empenho Emitida",
          "para": "Ordem de Fornecimento Emitida",
          "em": "2025-12-09T12:00:00Z",
          "por": {
            "id": 3,
            "nome": "Fernanda Silva",
            "matricula": "CBMDF-1091"
          },
          "perfil": "compras",
          "origem": "status.html",
          "justificativa": null,
          "excepcional": false,
          "aprovador": null,
          "migrado": false
        },
        {
          "de": "Ordem de Fornecimento Emitida",
          "para": "Em Trânsito ou Fabricação",
          "em": "2025-12-14T12:00:00Z",
          "por": {
            "id": 3,
            "nome": "Fernanda Silva",
            "matricula": "CBMDF-1091"
          },
          "perfil": "compras",
          "origem": "status.html",
          "justificativa": null,
          "excepcional": false,
          "aprovador": null,
          "migrado": false
        },
        {
          "de": "Em Trânsito ou Fabricação",
          "para": "Recebimento Provisório",
          "em": "2025-12-19T12:00:00Z",
          "por": {
            "id": 3,
            "nome": "Fernanda Silva",
            "matricula": "CBMDF-1091"
          },
          "perfil": "compras",
          "origem": "status.html",
          "justificativa": null,
          "excepcional": false,
          "aprovador": null,
          "migrado": false
        },
        {
          "de": "Recebimento Provisório",
          "para": "Recebimento Rejeitado (Aguardando Substituição)",
          "em": "2025-12-24T12:00:00Z",
          "por": {
            "id": 3,
            "nome": "Fernanda Silva",
            "matricula": "CBMDF-1091"
          },
          "perfil": "compras",
          "origem": "status.html",
          "justificativa": "Recebimento rejeitado na conferência; aguardando substituição pelo fornecedor.",
          "excepcional": false,
          "aprovador": null,
          "migrado": false
        }
      ]
    },
    {
      "id": "PED-2026-0012",
      "data": "08/10/2025, 12:00:00",
      "criadoEm": "2025-10-08T12:00:00Z",
      "status": "Recebimento Definitivo",
      "observacoes": "",
      "exercicioPca": 2026,
      "dfd": {
        "dataPretendida": "2026-06-30",
        "servicoContinuado": false,
        "vinculoPlanejamento": "Salvamento"
      },
      "usuario": {
        "id": 4,
        "nome": "João Pedro",
        "matricula": "CBMDF-1108",
        "setor": "DIMAT"
      },
      "itens": [
        {
          "id": 12,
          "nome": "Prancha Rígida de Imobilização com Tirantes",
          "categoria": "seguranca",
          "grupoCodigo": "42",
          "grupoNome": "EQUIPAMENTO PARA COMBATE A INCÊNDIO, RESGATE E SEGURANÇA",
          "classeCodigo": "4240",
          "classeNome": "EQUIPAMENTO PARA SEGURANÇA E SALVAMENTO",
          "tipo": "MATERIAL",
          "tipoDespesa": "Investimento",
          "naturezaDespesa": "4.4.90.52",
          "quantidade": 8,
          "urgencia": "normal",
          "precoUnitario": 450,
          "subtotal": 3600,
          "itemUid": "PED-2026-0012-I1"
        }
      ],
      "priorizacao": {
        "criticidade": 4,
        "risco": 4,
        "obrigatoriedadeLegal": false,
        "prontidao": 1,
        "declaradoEm": "2025-10-08T12:00:00Z"
      },
      "avaliacao": {
        "criterios": {
          "qualidadeProduto": null,
          "fornecedor": null,
          "tempoProjeto": null,
          "comunicacaoSuporte": null,
          "atendeuExpectativa": null
        },
        "finalizada": false,
        "atualizadoEm": null,
        "finalizadoEm": null
      },
      "historico": [
        {
          "de": null,
          "para": "DFD Registrado",
          "em": "2025-10-08T12:00:00Z",
          "por": {
            "id": 4,
            "nome": "João Pedro",
            "matricula": "CBMDF-1108"
          },
          "perfil": "solicitante",
          "origem": "index.html",
          "justificativa": "Solicitação registrada pelo requisitante.",
          "excepcional": false,
          "aprovador": null,
          "migrado": false
        },
        {
          "de": "DFD Registrado",
          "para": "DFD Aprovado pela Unidade",
          "em": "2025-10-13T12:00:00Z",
          "por": {
            "id": 1,
            "nome": "Ana Beatriz",
            "matricula": "CBMDF-1023"
          },
          "perfil": "gestor",
          "origem": "status.html",
          "justificativa": "Demanda validada pela autoridade da unidade requisitante.",
          "excepcional": false,
          "aprovador": {
            "id": 1,
            "nome": "Ana Beatriz",
            "matricula": "CBMDF-1023"
          },
          "migrado": false
        },
        {
          "de": "DFD Aprovado pela Unidade",
          "para": "Em Análise Setorial",
          "em": "2025-10-18T12:00:00Z",
          "por": {
            "id": 3,
            "nome": "Fernanda Silva",
            "matricula": "CBMDF-1091"
          },
          "perfil": "compras",
          "origem": "status.html",
          "justificativa": null,
          "excepcional": false,
          "aprovador": null,
          "migrado": false
        },
        {
          "de": "Em Análise Setorial",
          "para": "Consolidado em Item de PCA",
          "em": "2025-10-23T12:00:00Z",
          "por": {
            "id": 3,
            "nome": "Fernanda Silva",
            "matricula": "CBMDF-1091"
          },
          "perfil": "compras",
          "origem": "status.html",
          "justificativa": null,
          "excepcional": false,
          "aprovador": null,
          "migrado": false
        },
        {
          "de": "Consolidado em Item de PCA",
          "para": "PCA Aguardando Aprovação",
          "em": "2025-10-28T12:00:00Z",
          "por": {
            "id": 3,
            "nome": "Fernanda Silva",
            "matricula": "CBMDF-1091"
          },
          "perfil": "compras",
          "origem": "status.html",
          "justificativa": null,
          "excepcional": false,
          "aprovador": null,
          "migrado": false
        },
        {
          "de": "PCA Aguardando Aprovação",
          "para": "Incluído no PCA",
          "em": "2025-11-02T12:00:00Z",
          "por": {
            "id": 3,
            "nome": "Fernanda Silva",
            "matricula": "CBMDF-1091"
          },
          "perfil": "compras",
          "origem": "status.html",
          "justificativa": "Aprovado pela autoridade competente e publicado no PNCP.",
          "excepcional": false,
          "aprovador": {
            "id": 5,
            "nome": "Maria Oliveira",
            "matricula": "CBMDF-1122"
          },
          "migrado": false
        },
        {
          "de": "Incluído no PCA",
          "para": "ETP em Elaboração",
          "em": "2025-11-07T12:00:00Z",
          "por": {
            "id": 3,
            "nome": "Fernanda Silva",
            "matricula": "CBMDF-1091"
          },
          "perfil": "compras",
          "origem": "status.html",
          "justificativa": null,
          "excepcional": false,
          "aprovador": null,
          "migrado": false
        },
        {
          "de": "ETP em Elaboração",
          "para": "Pesquisa de Preços",
          "em": "2025-11-12T12:00:00Z",
          "por": {
            "id": 3,
            "nome": "Fernanda Silva",
            "matricula": "CBMDF-1091"
          },
          "perfil": "compras",
          "origem": "status.html",
          "justificativa": null,
          "excepcional": false,
          "aprovador": null,
          "migrado": false
        },
        {
          "de": "Pesquisa de Preços",
          "para": "TR Elaborado",
          "em": "2025-11-17T12:00:00Z",
          "por": {
            "id": 3,
            "nome": "Fernanda Silva",
            "matricula": "CBMDF-1091"
          },
          "perfil": "compras",
          "origem": "status.html",
          "justificativa": null,
          "excepcional": false,
          "aprovador": null,
          "migrado": false
        },
        {
          "de": "TR Elaborado",
          "para": "Reserva Orçamentária Confirmada",
          "em": "2025-11-22T12:00:00Z",
          "por": {
            "id": 3,
            "nome": "Fernanda Silva",
            "matricula": "CBMDF-1091"
          },
          "perfil": "compras",
          "origem": "status.html",
          "justificativa": null,
          "excepcional": false,
          "aprovador": null,
          "migrado": false
        },
        {
          "de": "Reserva Orçamentária Confirmada",
          "para": "Edital Publicado",
          "em": "2025-11-27T12:00:00Z",
          "por": {
            "id": 3,
            "nome": "Fernanda Silva",
            "matricula": "CBMDF-1091"
          },
          "perfil": "compras",
          "origem": "status.html",
          "justificativa": null,
          "excepcional": false,
          "aprovador": null,
          "migrado": false
        },
        {
          "de": "Edital Publicado",
          "para": "Em Seleção de Fornecedor",
          "em": "2025-12-02T12:00:00Z",
          "por": {
            "id": 3,
            "nome": "Fernanda Silva",
            "matricula": "CBMDF-1091"
          },
          "perfil": "compras",
          "origem": "status.html",
          "justificativa": null,
          "excepcional": false,
          "aprovador": null,
          "migrado": false
        },
        {
          "de": "Em Seleção de Fornecedor",
          "para": "Nota de Empenho Emitida",
          "em": "2025-12-07T12:00:00Z",
          "por": {
            "id": 3,
            "nome": "Fernanda Silva",
            "matricula": "CBMDF-1091"
          },
          "perfil": "compras",
          "origem": "status.html",
          "justificativa": null,
          "excepcional": false,
          "aprovador": null,
          "migrado": false
        },
        {
          "de": "Nota de Empenho Emitida",
          "para": "Ordem de Fornecimento Emitida",
          "em": "2025-12-12T12:00:00Z",
          "por": {
            "id": 3,
            "nome": "Fernanda Silva",
            "matricula": "CBMDF-1091"
          },
          "perfil": "compras",
          "origem": "status.html",
          "justificativa": null,
          "excepcional": false,
          "aprovador": null,
          "migrado": false
        },
        {
          "de": "Ordem de Fornecimento Emitida",
          "para": "Em Trânsito ou Fabricação",
          "em": "2025-12-17T12:00:00Z",
          "por": {
            "id": 3,
            "nome": "Fernanda Silva",
            "matricula": "CBMDF-1091"
          },
          "perfil": "compras",
          "origem": "status.html",
          "justificativa": null,
          "excepcional": false,
          "aprovador": null,
          "migrado": false
        },
        {
          "de": "Em Trânsito ou Fabricação",
          "para": "Recebimento Provisório",
          "em": "2025-12-22T12:00:00Z",
          "por": {
            "id": 3,
            "nome": "Fernanda Silva",
            "matricula": "CBMDF-1091"
          },
          "perfil": "compras",
          "origem": "status.html",
          "justificativa": null,
          "excepcional": false,
          "aprovador": null,
          "migrado": false
        },
        {
          "de": "Recebimento Provisório",
          "para": "Recebimento Definitivo",
          "em": "2025-12-27T12:00:00Z",
          "por": {
            "id": 3,
            "nome": "Fernanda Silva",
            "matricula": "CBMDF-1091"
          },
          "perfil": "compras",
          "origem": "status.html",
          "justificativa": null,
          "excepcional": false,
          "aprovador": null,
          "migrado": false
        }
      ]
    },
    {
      "id": "PED-2026-0013",
      "data": "11/10/2025, 12:00:00",
      "criadoEm": "2025-10-11T12:00:00Z",
      "status": "Liquidado",
      "observacoes": "Liquidado.",
      "exercicioPca": 2026,
      "dfd": {
        "dataPretendida": "2026-06-30",
        "servicoContinuado": false,
        "vinculoPlanejamento": "Combate a incêndio"
      },
      "usuario": {
        "id": 1,
        "nome": "Ana Beatriz",
        "matricula": "CBMDF-1023",
        "setor": "COMOP"
      },
      "itens": [
        {
          "id": 3,
          "nome": "Mangueira de incêndio 20m",
          "categoria": "seguranca",
          "grupoCodigo": "42",
          "grupoNome": "EQUIPAMENTO PARA COMBATE A INCÊNDIO, RESGATE E SEGURANÇA",
          "classeCodigo": "4210",
          "classeNome": "EQUIPAMENTOS PARA COMBATE A INCÊNDIO",
          "tipo": "MATERIAL",
          "tipoDespesa": "Investimento",
          "naturezaDespesa": "4.4.90.52",
          "quantidade": 10,
          "urgencia": "normal",
          "precoUnitario": 490,
          "subtotal": 4900,
          "itemUid": "PED-2026-0013-I1"
        }
      ],
      "priorizacao": {
        "criticidade": 4,
        "risco": 4,
        "obrigatoriedadeLegal": false,
        "prontidao": 1,
        "declaradoEm": "2025-10-11T12:00:00Z"
      },
      "avaliacao": {
        "criterios": {
          "qualidadeProduto": null,
          "fornecedor": null,
          "tempoProjeto": null,
          "comunicacaoSuporte": null,
          "atendeuExpectativa": null
        },
        "finalizada": false,
        "atualizadoEm": null,
        "finalizadoEm": null
      },
      "historico": [
        {
          "de": null,
          "para": "DFD Registrado",
          "em": "2025-10-11T12:00:00Z",
          "por": {
            "id": 1,
            "nome": "Ana Beatriz",
            "matricula": "CBMDF-1023"
          },
          "perfil": "solicitante",
          "origem": "index.html",
          "justificativa": "Solicitação registrada pelo requisitante.",
          "excepcional": false,
          "aprovador": null,
          "migrado": false
        },
        {
          "de": "DFD Registrado",
          "para": "DFD Aprovado pela Unidade",
          "em": "2025-10-16T12:00:00Z",
          "por": {
            "id": 1,
            "nome": "Ana Beatriz",
            "matricula": "CBMDF-1023"
          },
          "perfil": "gestor",
          "origem": "status.html",
          "justificativa": "Demanda validada pela autoridade da unidade requisitante.",
          "excepcional": false,
          "aprovador": {
            "id": 1,
            "nome": "Ana Beatriz",
            "matricula": "CBMDF-1023"
          },
          "migrado": false
        },
        {
          "de": "DFD Aprovado pela Unidade",
          "para": "Em Análise Setorial",
          "em": "2025-10-21T12:00:00Z",
          "por": {
            "id": 3,
            "nome": "Fernanda Silva",
            "matricula": "CBMDF-1091"
          },
          "perfil": "compras",
          "origem": "status.html",
          "justificativa": null,
          "excepcional": false,
          "aprovador": null,
          "migrado": false
        },
        {
          "de": "Em Análise Setorial",
          "para": "Consolidado em Item de PCA",
          "em": "2025-10-26T12:00:00Z",
          "por": {
            "id": 3,
            "nome": "Fernanda Silva",
            "matricula": "CBMDF-1091"
          },
          "perfil": "compras",
          "origem": "status.html",
          "justificativa": null,
          "excepcional": false,
          "aprovador": null,
          "migrado": false
        },
        {
          "de": "Consolidado em Item de PCA",
          "para": "PCA Aguardando Aprovação",
          "em": "2025-10-31T12:00:00Z",
          "por": {
            "id": 3,
            "nome": "Fernanda Silva",
            "matricula": "CBMDF-1091"
          },
          "perfil": "compras",
          "origem": "status.html",
          "justificativa": null,
          "excepcional": false,
          "aprovador": null,
          "migrado": false
        },
        {
          "de": "PCA Aguardando Aprovação",
          "para": "Incluído no PCA",
          "em": "2025-11-05T12:00:00Z",
          "por": {
            "id": 3,
            "nome": "Fernanda Silva",
            "matricula": "CBMDF-1091"
          },
          "perfil": "compras",
          "origem": "status.html",
          "justificativa": "Aprovado pela autoridade competente e publicado no PNCP.",
          "excepcional": false,
          "aprovador": {
            "id": 5,
            "nome": "Maria Oliveira",
            "matricula": "CBMDF-1122"
          },
          "migrado": false
        },
        {
          "de": "Incluído no PCA",
          "para": "ETP em Elaboração",
          "em": "2025-11-10T12:00:00Z",
          "por": {
            "id": 3,
            "nome": "Fernanda Silva",
            "matricula": "CBMDF-1091"
          },
          "perfil": "compras",
          "origem": "status.html",
          "justificativa": null,
          "excepcional": false,
          "aprovador": null,
          "migrado": false
        },
        {
          "de": "ETP em Elaboração",
          "para": "Pesquisa de Preços",
          "em": "2025-11-15T12:00:00Z",
          "por": {
            "id": 3,
            "nome": "Fernanda Silva",
            "matricula": "CBMDF-1091"
          },
          "perfil": "compras",
          "origem": "status.html",
          "justificativa": null,
          "excepcional": false,
          "aprovador": null,
          "migrado": false
        },
        {
          "de": "Pesquisa de Preços",
          "para": "TR Elaborado",
          "em": "2025-11-20T12:00:00Z",
          "por": {
            "id": 3,
            "nome": "Fernanda Silva",
            "matricula": "CBMDF-1091"
          },
          "perfil": "compras",
          "origem": "status.html",
          "justificativa": null,
          "excepcional": false,
          "aprovador": null,
          "migrado": false
        },
        {
          "de": "TR Elaborado",
          "para": "Reserva Orçamentária Confirmada",
          "em": "2025-11-25T12:00:00Z",
          "por": {
            "id": 3,
            "nome": "Fernanda Silva",
            "matricula": "CBMDF-1091"
          },
          "perfil": "compras",
          "origem": "status.html",
          "justificativa": null,
          "excepcional": false,
          "aprovador": null,
          "migrado": false
        },
        {
          "de": "Reserva Orçamentária Confirmada",
          "para": "Edital Publicado",
          "em": "2025-11-30T12:00:00Z",
          "por": {
            "id": 3,
            "nome": "Fernanda Silva",
            "matricula": "CBMDF-1091"
          },
          "perfil": "compras",
          "origem": "status.html",
          "justificativa": null,
          "excepcional": false,
          "aprovador": null,
          "migrado": false
        },
        {
          "de": "Edital Publicado",
          "para": "Em Seleção de Fornecedor",
          "em": "2025-12-05T12:00:00Z",
          "por": {
            "id": 3,
            "nome": "Fernanda Silva",
            "matricula": "CBMDF-1091"
          },
          "perfil": "compras",
          "origem": "status.html",
          "justificativa": null,
          "excepcional": false,
          "aprovador": null,
          "migrado": false
        },
        {
          "de": "Em Seleção de Fornecedor",
          "para": "Nota de Empenho Emitida",
          "em": "2025-12-10T12:00:00Z",
          "por": {
            "id": 3,
            "nome": "Fernanda Silva",
            "matricula": "CBMDF-1091"
          },
          "perfil": "compras",
          "origem": "status.html",
          "justificativa": null,
          "excepcional": false,
          "aprovador": null,
          "migrado": false
        },
        {
          "de": "Nota de Empenho Emitida",
          "para": "Ordem de Fornecimento Emitida",
          "em": "2025-12-15T12:00:00Z",
          "por": {
            "id": 3,
            "nome": "Fernanda Silva",
            "matricula": "CBMDF-1091"
          },
          "perfil": "compras",
          "origem": "status.html",
          "justificativa": null,
          "excepcional": false,
          "aprovador": null,
          "migrado": false
        },
        {
          "de": "Ordem de Fornecimento Emitida",
          "para": "Em Trânsito ou Fabricação",
          "em": "2025-12-20T12:00:00Z",
          "por": {
            "id": 3,
            "nome": "Fernanda Silva",
            "matricula": "CBMDF-1091"
          },
          "perfil": "compras",
          "origem": "status.html",
          "justificativa": null,
          "excepcional": false,
          "aprovador": null,
          "migrado": false
        },
        {
          "de": "Em Trânsito ou Fabricação",
          "para": "Recebimento Provisório",
          "em": "2025-12-25T12:00:00Z",
          "por": {
            "id": 3,
            "nome": "Fernanda Silva",
            "matricula": "CBMDF-1091"
          },
          "perfil": "compras",
          "origem": "status.html",
          "justificativa": null,
          "excepcional": false,
          "aprovador": null,
          "migrado": false
        },
        {
          "de": "Recebimento Provisório",
          "para": "Recebimento Definitivo",
          "em": "2025-12-30T12:00:00Z",
          "por": {
            "id": 3,
            "nome": "Fernanda Silva",
            "matricula": "CBMDF-1091"
          },
          "perfil": "compras",
          "origem": "status.html",
          "justificativa": null,
          "excepcional": false,
          "aprovador": null,
          "migrado": false
        },
        {
          "de": "Recebimento Definitivo",
          "para": "Liquidado",
          "em": "2026-01-04T12:00:00Z",
          "por": {
            "id": 3,
            "nome": "Fernanda Silva",
            "matricula": "CBMDF-1091"
          },
          "perfil": "compras",
          "origem": "status.html",
          "justificativa": null,
          "excepcional": false,
          "aprovador": null,
          "migrado": false
        }
      ]
    },
    {
      "id": "PED-2026-0014",
      "data": "14/10/2025, 12:00:00",
      "criadoEm": "2025-10-14T12:00:00Z",
      "status": "Pago",
      "observacoes": "Pago.",
      "exercicioPca": 2026,
      "dfd": {
        "dataPretendida": "2026-06-30",
        "servicoContinuado": false,
        "vinculoPlanejamento": "Comunicação"
      },
      "usuario": {
        "id": 3,
        "nome": "Fernanda Silva",
        "matricula": "CBMDF-1091",
        "setor": "DITIC"
      },
      "itens": [
        {
          "id": 5,
          "nome": "Rádio comunicador portátil HT",
          "categoria": "manutencao",
          "grupoCodigo": "58",
          "grupoNome": "EQUIPAMENTOS DE COMUNICAÇÃO, DETECÇÃO E RADIAÇÃO COERENTE",
          "classeCodigo": "5820",
          "classeNome": "EQUIPAMENTOS DE COMUNICAÇÃO DE RÁDIO E TELEVISÃO, EXCETO AÉREOS",
          "tipo": "MATERIAL",
          "tipoDespesa": "Investimento",
          "naturezaDespesa": "4.4.90.52",
          "quantidade": 8,
          "urgencia": "normal",
          "precoUnitario": 220,
          "subtotal": 1760,
          "itemUid": "PED-2026-0014-I1"
        }
      ],
      "priorizacao": {
        "criticidade": 3,
        "risco": 3,
        "obrigatoriedadeLegal": false,
        "prontidao": 1,
        "declaradoEm": "2025-10-14T12:00:00Z"
      },
      "avaliacao": {
        "criterios": {
          "qualidadeProduto": null,
          "fornecedor": null,
          "tempoProjeto": null,
          "comunicacaoSuporte": null,
          "atendeuExpectativa": null
        },
        "finalizada": false,
        "atualizadoEm": null,
        "finalizadoEm": null
      },
      "historico": [
        {
          "de": null,
          "para": "DFD Registrado",
          "em": "2025-10-14T12:00:00Z",
          "por": {
            "id": 3,
            "nome": "Fernanda Silva",
            "matricula": "CBMDF-1091"
          },
          "perfil": "solicitante",
          "origem": "index.html",
          "justificativa": "Solicitação registrada pelo requisitante.",
          "excepcional": false,
          "aprovador": null,
          "migrado": false
        },
        {
          "de": "DFD Registrado",
          "para": "DFD Aprovado pela Unidade",
          "em": "2025-10-19T12:00:00Z",
          "por": {
            "id": 1,
            "nome": "Ana Beatriz",
            "matricula": "CBMDF-1023"
          },
          "perfil": "gestor",
          "origem": "status.html",
          "justificativa": "Demanda validada pela autoridade da unidade requisitante.",
          "excepcional": false,
          "aprovador": {
            "id": 1,
            "nome": "Ana Beatriz",
            "matricula": "CBMDF-1023"
          },
          "migrado": false
        },
        {
          "de": "DFD Aprovado pela Unidade",
          "para": "Em Análise Setorial",
          "em": "2025-10-24T12:00:00Z",
          "por": {
            "id": 3,
            "nome": "Fernanda Silva",
            "matricula": "CBMDF-1091"
          },
          "perfil": "compras",
          "origem": "status.html",
          "justificativa": null,
          "excepcional": false,
          "aprovador": null,
          "migrado": false
        },
        {
          "de": "Em Análise Setorial",
          "para": "Consolidado em Item de PCA",
          "em": "2025-10-29T12:00:00Z",
          "por": {
            "id": 3,
            "nome": "Fernanda Silva",
            "matricula": "CBMDF-1091"
          },
          "perfil": "compras",
          "origem": "status.html",
          "justificativa": null,
          "excepcional": false,
          "aprovador": null,
          "migrado": false
        },
        {
          "de": "Consolidado em Item de PCA",
          "para": "PCA Aguardando Aprovação",
          "em": "2025-11-03T12:00:00Z",
          "por": {
            "id": 3,
            "nome": "Fernanda Silva",
            "matricula": "CBMDF-1091"
          },
          "perfil": "compras",
          "origem": "status.html",
          "justificativa": null,
          "excepcional": false,
          "aprovador": null,
          "migrado": false
        },
        {
          "de": "PCA Aguardando Aprovação",
          "para": "Incluído no PCA",
          "em": "2025-11-08T12:00:00Z",
          "por": {
            "id": 3,
            "nome": "Fernanda Silva",
            "matricula": "CBMDF-1091"
          },
          "perfil": "compras",
          "origem": "status.html",
          "justificativa": "Aprovado pela autoridade competente e publicado no PNCP.",
          "excepcional": false,
          "aprovador": {
            "id": 5,
            "nome": "Maria Oliveira",
            "matricula": "CBMDF-1122"
          },
          "migrado": false
        },
        {
          "de": "Incluído no PCA",
          "para": "ETP em Elaboração",
          "em": "2025-11-13T12:00:00Z",
          "por": {
            "id": 3,
            "nome": "Fernanda Silva",
            "matricula": "CBMDF-1091"
          },
          "perfil": "compras",
          "origem": "status.html",
          "justificativa": null,
          "excepcional": false,
          "aprovador": null,
          "migrado": false
        },
        {
          "de": "ETP em Elaboração",
          "para": "Pesquisa de Preços",
          "em": "2025-11-18T12:00:00Z",
          "por": {
            "id": 3,
            "nome": "Fernanda Silva",
            "matricula": "CBMDF-1091"
          },
          "perfil": "compras",
          "origem": "status.html",
          "justificativa": null,
          "excepcional": false,
          "aprovador": null,
          "migrado": false
        },
        {
          "de": "Pesquisa de Preços",
          "para": "TR Elaborado",
          "em": "2025-11-23T12:00:00Z",
          "por": {
            "id": 3,
            "nome": "Fernanda Silva",
            "matricula": "CBMDF-1091"
          },
          "perfil": "compras",
          "origem": "status.html",
          "justificativa": null,
          "excepcional": false,
          "aprovador": null,
          "migrado": false
        },
        {
          "de": "TR Elaborado",
          "para": "Reserva Orçamentária Confirmada",
          "em": "2025-11-28T12:00:00Z",
          "por": {
            "id": 3,
            "nome": "Fernanda Silva",
            "matricula": "CBMDF-1091"
          },
          "perfil": "compras",
          "origem": "status.html",
          "justificativa": null,
          "excepcional": false,
          "aprovador": null,
          "migrado": false
        },
        {
          "de": "Reserva Orçamentária Confirmada",
          "para": "Edital Publicado",
          "em": "2025-12-03T12:00:00Z",
          "por": {
            "id": 3,
            "nome": "Fernanda Silva",
            "matricula": "CBMDF-1091"
          },
          "perfil": "compras",
          "origem": "status.html",
          "justificativa": null,
          "excepcional": false,
          "aprovador": null,
          "migrado": false
        },
        {
          "de": "Edital Publicado",
          "para": "Em Seleção de Fornecedor",
          "em": "2025-12-08T12:00:00Z",
          "por": {
            "id": 3,
            "nome": "Fernanda Silva",
            "matricula": "CBMDF-1091"
          },
          "perfil": "compras",
          "origem": "status.html",
          "justificativa": null,
          "excepcional": false,
          "aprovador": null,
          "migrado": false
        },
        {
          "de": "Em Seleção de Fornecedor",
          "para": "Nota de Empenho Emitida",
          "em": "2025-12-13T12:00:00Z",
          "por": {
            "id": 3,
            "nome": "Fernanda Silva",
            "matricula": "CBMDF-1091"
          },
          "perfil": "compras",
          "origem": "status.html",
          "justificativa": null,
          "excepcional": false,
          "aprovador": null,
          "migrado": false
        },
        {
          "de": "Nota de Empenho Emitida",
          "para": "Ordem de Fornecimento Emitida",
          "em": "2025-12-18T12:00:00Z",
          "por": {
            "id": 3,
            "nome": "Fernanda Silva",
            "matricula": "CBMDF-1091"
          },
          "perfil": "compras",
          "origem": "status.html",
          "justificativa": null,
          "excepcional": false,
          "aprovador": null,
          "migrado": false
        },
        {
          "de": "Ordem de Fornecimento Emitida",
          "para": "Em Trânsito ou Fabricação",
          "em": "2025-12-23T12:00:00Z",
          "por": {
            "id": 3,
            "nome": "Fernanda Silva",
            "matricula": "CBMDF-1091"
          },
          "perfil": "compras",
          "origem": "status.html",
          "justificativa": null,
          "excepcional": false,
          "aprovador": null,
          "migrado": false
        },
        {
          "de": "Em Trânsito ou Fabricação",
          "para": "Recebimento Provisório",
          "em": "2025-12-28T12:00:00Z",
          "por": {
            "id": 3,
            "nome": "Fernanda Silva",
            "matricula": "CBMDF-1091"
          },
          "perfil": "compras",
          "origem": "status.html",
          "justificativa": null,
          "excepcional": false,
          "aprovador": null,
          "migrado": false
        },
        {
          "de": "Recebimento Provisório",
          "para": "Recebimento Definitivo",
          "em": "2026-01-02T12:00:00Z",
          "por": {
            "id": 3,
            "nome": "Fernanda Silva",
            "matricula": "CBMDF-1091"
          },
          "perfil": "compras",
          "origem": "status.html",
          "justificativa": null,
          "excepcional": false,
          "aprovador": null,
          "migrado": false
        },
        {
          "de": "Recebimento Definitivo",
          "para": "Liquidado",
          "em": "2026-01-07T12:00:00Z",
          "por": {
            "id": 3,
            "nome": "Fernanda Silva",
            "matricula": "CBMDF-1091"
          },
          "perfil": "compras",
          "origem": "status.html",
          "justificativa": null,
          "excepcional": false,
          "aprovador": null,
          "migrado": false
        },
        {
          "de": "Liquidado",
          "para": "Pago",
          "em": "2026-01-12T12:00:00Z",
          "por": {
            "id": 3,
            "nome": "Fernanda Silva",
            "matricula": "CBMDF-1091"
          },
          "perfil": "compras",
          "origem": "status.html",
          "justificativa": null,
          "excepcional": false,
          "aprovador": null,
          "migrado": false
        }
      ]
    },
    {
      "id": "PED-2026-0015",
      "data": "17/10/2025, 12:00:00",
      "criadoEm": "2025-10-17T12:00:00Z",
      "status": "Pedido Entregue",
      "observacoes": "Entregue e avaliado.",
      "exercicioPca": 2026,
      "dfd": {
        "dataPretendida": "2026-06-30",
        "servicoContinuado": false,
        "vinculoPlanejamento": "Fardamento"
      },
      "usuario": {
        "id": 2,
        "nome": "Carlos Eduardo",
        "matricula": "CBMDF-1047",
        "setor": "CESMA"
      },
      "itens": [
        {
          "id": 1,
          "nome": "Capacete de proteção tático",
          "categoria": "seguranca",
          "grupoCodigo": "84",
          "grupoNome": "VESTUÁRIOS, EQUIPAMENTOS INDIVIDUAIS E INSÍGNIAS",
          "classeCodigo": "8415",
          "classeNome": "VESTUÁRIO PARA FINS ESPECIAIS",
          "tipo": "MATERIAL",
          "tipoDespesa": "Investimento",
          "naturezaDespesa": "4.4.90.52",
          "quantidade": 20,
          "urgencia": "normal",
          "precoUnitario": 125,
          "subtotal": 2500,
          "itemUid": "PED-2026-0015-I1"
        }
      ],
      "priorizacao": {
        "criticidade": 3,
        "risco": 3,
        "obrigatoriedadeLegal": false,
        "prontidao": 1,
        "declaradoEm": "2025-10-17T12:00:00Z"
      },
      "avaliacao": {
        "criterios": {
          "qualidadeProduto": 5,
          "fornecedor": 4,
          "tempoProjeto": 4,
          "comunicacaoSuporte": 5,
          "atendeuExpectativa": 5
        },
        "finalizada": true,
        "atualizadoEm": "2026-05-05T12:00:00Z",
        "finalizadoEm": "2026-05-05T12:00:00Z"
      },
      "historico": [
        {
          "de": null,
          "para": "DFD Registrado",
          "em": "2025-10-17T12:00:00Z",
          "por": {
            "id": 2,
            "nome": "Carlos Eduardo",
            "matricula": "CBMDF-1047"
          },
          "perfil": "solicitante",
          "origem": "index.html",
          "justificativa": "Solicitação registrada pelo requisitante.",
          "excepcional": false,
          "aprovador": null,
          "migrado": false
        },
        {
          "de": "DFD Registrado",
          "para": "DFD Aprovado pela Unidade",
          "em": "2025-10-22T12:00:00Z",
          "por": {
            "id": 1,
            "nome": "Ana Beatriz",
            "matricula": "CBMDF-1023"
          },
          "perfil": "gestor",
          "origem": "status.html",
          "justificativa": "Demanda validada pela autoridade da unidade requisitante.",
          "excepcional": false,
          "aprovador": {
            "id": 1,
            "nome": "Ana Beatriz",
            "matricula": "CBMDF-1023"
          },
          "migrado": false
        },
        {
          "de": "DFD Aprovado pela Unidade",
          "para": "Em Análise Setorial",
          "em": "2025-10-27T12:00:00Z",
          "por": {
            "id": 3,
            "nome": "Fernanda Silva",
            "matricula": "CBMDF-1091"
          },
          "perfil": "compras",
          "origem": "status.html",
          "justificativa": null,
          "excepcional": false,
          "aprovador": null,
          "migrado": false
        },
        {
          "de": "Em Análise Setorial",
          "para": "Consolidado em Item de PCA",
          "em": "2025-11-01T12:00:00Z",
          "por": {
            "id": 3,
            "nome": "Fernanda Silva",
            "matricula": "CBMDF-1091"
          },
          "perfil": "compras",
          "origem": "status.html",
          "justificativa": null,
          "excepcional": false,
          "aprovador": null,
          "migrado": false
        },
        {
          "de": "Consolidado em Item de PCA",
          "para": "PCA Aguardando Aprovação",
          "em": "2025-11-06T12:00:00Z",
          "por": {
            "id": 3,
            "nome": "Fernanda Silva",
            "matricula": "CBMDF-1091"
          },
          "perfil": "compras",
          "origem": "status.html",
          "justificativa": null,
          "excepcional": false,
          "aprovador": null,
          "migrado": false
        },
        {
          "de": "PCA Aguardando Aprovação",
          "para": "Incluído no PCA",
          "em": "2025-11-11T12:00:00Z",
          "por": {
            "id": 3,
            "nome": "Fernanda Silva",
            "matricula": "CBMDF-1091"
          },
          "perfil": "compras",
          "origem": "status.html",
          "justificativa": "Aprovado pela autoridade competente e publicado no PNCP.",
          "excepcional": false,
          "aprovador": {
            "id": 5,
            "nome": "Maria Oliveira",
            "matricula": "CBMDF-1122"
          },
          "migrado": false
        },
        {
          "de": "Incluído no PCA",
          "para": "ETP em Elaboração",
          "em": "2025-11-16T12:00:00Z",
          "por": {
            "id": 3,
            "nome": "Fernanda Silva",
            "matricula": "CBMDF-1091"
          },
          "perfil": "compras",
          "origem": "status.html",
          "justificativa": null,
          "excepcional": false,
          "aprovador": null,
          "migrado": false
        },
        {
          "de": "ETP em Elaboração",
          "para": "Pesquisa de Preços",
          "em": "2025-11-21T12:00:00Z",
          "por": {
            "id": 3,
            "nome": "Fernanda Silva",
            "matricula": "CBMDF-1091"
          },
          "perfil": "compras",
          "origem": "status.html",
          "justificativa": null,
          "excepcional": false,
          "aprovador": null,
          "migrado": false
        },
        {
          "de": "Pesquisa de Preços",
          "para": "TR Elaborado",
          "em": "2025-11-26T12:00:00Z",
          "por": {
            "id": 3,
            "nome": "Fernanda Silva",
            "matricula": "CBMDF-1091"
          },
          "perfil": "compras",
          "origem": "status.html",
          "justificativa": null,
          "excepcional": false,
          "aprovador": null,
          "migrado": false
        },
        {
          "de": "TR Elaborado",
          "para": "Reserva Orçamentária Confirmada",
          "em": "2025-12-01T12:00:00Z",
          "por": {
            "id": 3,
            "nome": "Fernanda Silva",
            "matricula": "CBMDF-1091"
          },
          "perfil": "compras",
          "origem": "status.html",
          "justificativa": null,
          "excepcional": false,
          "aprovador": null,
          "migrado": false
        },
        {
          "de": "Reserva Orçamentária Confirmada",
          "para": "Edital Publicado",
          "em": "2025-12-06T12:00:00Z",
          "por": {
            "id": 3,
            "nome": "Fernanda Silva",
            "matricula": "CBMDF-1091"
          },
          "perfil": "compras",
          "origem": "status.html",
          "justificativa": null,
          "excepcional": false,
          "aprovador": null,
          "migrado": false
        },
        {
          "de": "Edital Publicado",
          "para": "Em Seleção de Fornecedor",
          "em": "2025-12-11T12:00:00Z",
          "por": {
            "id": 3,
            "nome": "Fernanda Silva",
            "matricula": "CBMDF-1091"
          },
          "perfil": "compras",
          "origem": "status.html",
          "justificativa": null,
          "excepcional": false,
          "aprovador": null,
          "migrado": false
        },
        {
          "de": "Em Seleção de Fornecedor",
          "para": "Nota de Empenho Emitida",
          "em": "2025-12-16T12:00:00Z",
          "por": {
            "id": 3,
            "nome": "Fernanda Silva",
            "matricula": "CBMDF-1091"
          },
          "perfil": "compras",
          "origem": "status.html",
          "justificativa": null,
          "excepcional": false,
          "aprovador": null,
          "migrado": false
        },
        {
          "de": "Nota de Empenho Emitida",
          "para": "Ordem de Fornecimento Emitida",
          "em": "2025-12-21T12:00:00Z",
          "por": {
            "id": 3,
            "nome": "Fernanda Silva",
            "matricula": "CBMDF-1091"
          },
          "perfil": "compras",
          "origem": "status.html",
          "justificativa": null,
          "excepcional": false,
          "aprovador": null,
          "migrado": false
        },
        {
          "de": "Ordem de Fornecimento Emitida",
          "para": "Em Trânsito ou Fabricação",
          "em": "2025-12-26T12:00:00Z",
          "por": {
            "id": 3,
            "nome": "Fernanda Silva",
            "matricula": "CBMDF-1091"
          },
          "perfil": "compras",
          "origem": "status.html",
          "justificativa": null,
          "excepcional": false,
          "aprovador": null,
          "migrado": false
        },
        {
          "de": "Em Trânsito ou Fabricação",
          "para": "Recebimento Provisório",
          "em": "2025-12-31T12:00:00Z",
          "por": {
            "id": 3,
            "nome": "Fernanda Silva",
            "matricula": "CBMDF-1091"
          },
          "perfil": "compras",
          "origem": "status.html",
          "justificativa": null,
          "excepcional": false,
          "aprovador": null,
          "migrado": false
        },
        {
          "de": "Recebimento Provisório",
          "para": "Recebimento Definitivo",
          "em": "2026-01-05T12:00:00Z",
          "por": {
            "id": 3,
            "nome": "Fernanda Silva",
            "matricula": "CBMDF-1091"
          },
          "perfil": "compras",
          "origem": "status.html",
          "justificativa": null,
          "excepcional": false,
          "aprovador": null,
          "migrado": false
        },
        {
          "de": "Recebimento Definitivo",
          "para": "Liquidado",
          "em": "2026-01-10T12:00:00Z",
          "por": {
            "id": 3,
            "nome": "Fernanda Silva",
            "matricula": "CBMDF-1091"
          },
          "perfil": "compras",
          "origem": "status.html",
          "justificativa": null,
          "excepcional": false,
          "aprovador": null,
          "migrado": false
        },
        {
          "de": "Liquidado",
          "para": "Pago",
          "em": "2026-01-15T12:00:00Z",
          "por": {
            "id": 3,
            "nome": "Fernanda Silva",
            "matricula": "CBMDF-1091"
          },
          "perfil": "compras",
          "origem": "status.html",
          "justificativa": null,
          "excepcional": false,
          "aprovador": null,
          "migrado": false
        },
        {
          "de": "Pago",
          "para": "Pedido Entregue",
          "em": "2026-01-20T12:00:00Z",
          "por": {
            "id": 3,
            "nome": "Fernanda Silva",
            "matricula": "CBMDF-1091"
          },
          "perfil": "compras",
          "origem": "status.html",
          "justificativa": null,
          "excepcional": false,
          "aprovador": null,
          "migrado": false
        }
      ]
    },
    {
      "id": "PED-2026-0016",
      "data": "20/10/2025, 12:00:00",
      "criadoEm": "2025-10-20T12:00:00Z",
      "status": "Pedido Entregue",
      "observacoes": "Entregue — aguardando avaliação do requisitante.",
      "exercicioPca": 2026,
      "dfd": {
        "dataPretendida": "2026-06-30",
        "servicoContinuado": false,
        "vinculoPlanejamento": "APH"
      },
      "usuario": {
        "id": 5,
        "nome": "Maria Oliveira",
        "matricula": "CBMDF-1122",
        "setor": "COMAP"
      },
      "itens": [
        {
          "id": 8,
          "nome": "Kit de primeiros socorros APH",
          "categoria": "higiene",
          "grupoCodigo": "65",
          "grupoNome": "EQUIPAMENTOS E ARTIGOS PARA USO MÉDICO, DENTÁRIO E VETERINÁRIO",
          "classeCodigo": "6510",
          "classeNome": "MATERIAIS CIRÚRGICOS PARA CURATIVOS",
          "tipo": "MATERIAL",
          "tipoDespesa": "Custeio",
          "naturezaDespesa": "3.3.90.30",
          "quantidade": 10,
          "urgencia": "normal",
          "precoUnitario": 135,
          "subtotal": 1350,
          "itemUid": "PED-2026-0016-I1"
        }
      ],
      "priorizacao": {
        "criticidade": 4,
        "risco": 4,
        "obrigatoriedadeLegal": false,
        "prontidao": 1,
        "declaradoEm": "2025-10-20T12:00:00Z"
      },
      "avaliacao": {
        "criterios": {
          "qualidadeProduto": null,
          "fornecedor": null,
          "tempoProjeto": null,
          "comunicacaoSuporte": null,
          "atendeuExpectativa": null
        },
        "finalizada": false,
        "atualizadoEm": null,
        "finalizadoEm": null
      },
      "historico": [
        {
          "de": null,
          "para": "DFD Registrado",
          "em": "2025-10-20T12:00:00Z",
          "por": {
            "id": 5,
            "nome": "Maria Oliveira",
            "matricula": "CBMDF-1122"
          },
          "perfil": "solicitante",
          "origem": "index.html",
          "justificativa": "Solicitação registrada pelo requisitante.",
          "excepcional": false,
          "aprovador": null,
          "migrado": false
        },
        {
          "de": "DFD Registrado",
          "para": "DFD Aprovado pela Unidade",
          "em": "2025-10-25T12:00:00Z",
          "por": {
            "id": 1,
            "nome": "Ana Beatriz",
            "matricula": "CBMDF-1023"
          },
          "perfil": "gestor",
          "origem": "status.html",
          "justificativa": "Demanda validada pela autoridade da unidade requisitante.",
          "excepcional": false,
          "aprovador": {
            "id": 1,
            "nome": "Ana Beatriz",
            "matricula": "CBMDF-1023"
          },
          "migrado": false
        },
        {
          "de": "DFD Aprovado pela Unidade",
          "para": "Em Análise Setorial",
          "em": "2025-10-30T12:00:00Z",
          "por": {
            "id": 3,
            "nome": "Fernanda Silva",
            "matricula": "CBMDF-1091"
          },
          "perfil": "compras",
          "origem": "status.html",
          "justificativa": null,
          "excepcional": false,
          "aprovador": null,
          "migrado": false
        },
        {
          "de": "Em Análise Setorial",
          "para": "Consolidado em Item de PCA",
          "em": "2025-11-04T12:00:00Z",
          "por": {
            "id": 3,
            "nome": "Fernanda Silva",
            "matricula": "CBMDF-1091"
          },
          "perfil": "compras",
          "origem": "status.html",
          "justificativa": null,
          "excepcional": false,
          "aprovador": null,
          "migrado": false
        },
        {
          "de": "Consolidado em Item de PCA",
          "para": "PCA Aguardando Aprovação",
          "em": "2025-11-09T12:00:00Z",
          "por": {
            "id": 3,
            "nome": "Fernanda Silva",
            "matricula": "CBMDF-1091"
          },
          "perfil": "compras",
          "origem": "status.html",
          "justificativa": null,
          "excepcional": false,
          "aprovador": null,
          "migrado": false
        },
        {
          "de": "PCA Aguardando Aprovação",
          "para": "Incluído no PCA",
          "em": "2025-11-14T12:00:00Z",
          "por": {
            "id": 3,
            "nome": "Fernanda Silva",
            "matricula": "CBMDF-1091"
          },
          "perfil": "compras",
          "origem": "status.html",
          "justificativa": "Aprovado pela autoridade competente e publicado no PNCP.",
          "excepcional": false,
          "aprovador": {
            "id": 5,
            "nome": "Maria Oliveira",
            "matricula": "CBMDF-1122"
          },
          "migrado": false
        },
        {
          "de": "Incluído no PCA",
          "para": "ETP em Elaboração",
          "em": "2025-11-19T12:00:00Z",
          "por": {
            "id": 3,
            "nome": "Fernanda Silva",
            "matricula": "CBMDF-1091"
          },
          "perfil": "compras",
          "origem": "status.html",
          "justificativa": null,
          "excepcional": false,
          "aprovador": null,
          "migrado": false
        },
        {
          "de": "ETP em Elaboração",
          "para": "Pesquisa de Preços",
          "em": "2025-11-24T12:00:00Z",
          "por": {
            "id": 3,
            "nome": "Fernanda Silva",
            "matricula": "CBMDF-1091"
          },
          "perfil": "compras",
          "origem": "status.html",
          "justificativa": null,
          "excepcional": false,
          "aprovador": null,
          "migrado": false
        },
        {
          "de": "Pesquisa de Preços",
          "para": "TR Elaborado",
          "em": "2025-11-29T12:00:00Z",
          "por": {
            "id": 3,
            "nome": "Fernanda Silva",
            "matricula": "CBMDF-1091"
          },
          "perfil": "compras",
          "origem": "status.html",
          "justificativa": null,
          "excepcional": false,
          "aprovador": null,
          "migrado": false
        },
        {
          "de": "TR Elaborado",
          "para": "Reserva Orçamentária Confirmada",
          "em": "2025-12-04T12:00:00Z",
          "por": {
            "id": 3,
            "nome": "Fernanda Silva",
            "matricula": "CBMDF-1091"
          },
          "perfil": "compras",
          "origem": "status.html",
          "justificativa": null,
          "excepcional": false,
          "aprovador": null,
          "migrado": false
        },
        {
          "de": "Reserva Orçamentária Confirmada",
          "para": "Edital Publicado",
          "em": "2025-12-09T12:00:00Z",
          "por": {
            "id": 3,
            "nome": "Fernanda Silva",
            "matricula": "CBMDF-1091"
          },
          "perfil": "compras",
          "origem": "status.html",
          "justificativa": null,
          "excepcional": false,
          "aprovador": null,
          "migrado": false
        },
        {
          "de": "Edital Publicado",
          "para": "Em Seleção de Fornecedor",
          "em": "2025-12-14T12:00:00Z",
          "por": {
            "id": 3,
            "nome": "Fernanda Silva",
            "matricula": "CBMDF-1091"
          },
          "perfil": "compras",
          "origem": "status.html",
          "justificativa": null,
          "excepcional": false,
          "aprovador": null,
          "migrado": false
        },
        {
          "de": "Em Seleção de Fornecedor",
          "para": "Nota de Empenho Emitida",
          "em": "2025-12-19T12:00:00Z",
          "por": {
            "id": 3,
            "nome": "Fernanda Silva",
            "matricula": "CBMDF-1091"
          },
          "perfil": "compras",
          "origem": "status.html",
          "justificativa": null,
          "excepcional": false,
          "aprovador": null,
          "migrado": false
        },
        {
          "de": "Nota de Empenho Emitida",
          "para": "Ordem de Fornecimento Emitida",
          "em": "2025-12-24T12:00:00Z",
          "por": {
            "id": 3,
            "nome": "Fernanda Silva",
            "matricula": "CBMDF-1091"
          },
          "perfil": "compras",
          "origem": "status.html",
          "justificativa": null,
          "excepcional": false,
          "aprovador": null,
          "migrado": false
        },
        {
          "de": "Ordem de Fornecimento Emitida",
          "para": "Em Trânsito ou Fabricação",
          "em": "2025-12-29T12:00:00Z",
          "por": {
            "id": 3,
            "nome": "Fernanda Silva",
            "matricula": "CBMDF-1091"
          },
          "perfil": "compras",
          "origem": "status.html",
          "justificativa": null,
          "excepcional": false,
          "aprovador": null,
          "migrado": false
        },
        {
          "de": "Em Trânsito ou Fabricação",
          "para": "Recebimento Provisório",
          "em": "2026-01-03T12:00:00Z",
          "por": {
            "id": 3,
            "nome": "Fernanda Silva",
            "matricula": "CBMDF-1091"
          },
          "perfil": "compras",
          "origem": "status.html",
          "justificativa": null,
          "excepcional": false,
          "aprovador": null,
          "migrado": false
        },
        {
          "de": "Recebimento Provisório",
          "para": "Recebimento Definitivo",
          "em": "2026-01-08T12:00:00Z",
          "por": {
            "id": 3,
            "nome": "Fernanda Silva",
            "matricula": "CBMDF-1091"
          },
          "perfil": "compras",
          "origem": "status.html",
          "justificativa": null,
          "excepcional": false,
          "aprovador": null,
          "migrado": false
        },
        {
          "de": "Recebimento Definitivo",
          "para": "Liquidado",
          "em": "2026-01-13T12:00:00Z",
          "por": {
            "id": 3,
            "nome": "Fernanda Silva",
            "matricula": "CBMDF-1091"
          },
          "perfil": "compras",
          "origem": "status.html",
          "justificativa": null,
          "excepcional": false,
          "aprovador": null,
          "migrado": false
        },
        {
          "de": "Liquidado",
          "para": "Pago",
          "em": "2026-01-18T12:00:00Z",
          "por": {
            "id": 3,
            "nome": "Fernanda Silva",
            "matricula": "CBMDF-1091"
          },
          "perfil": "compras",
          "origem": "status.html",
          "justificativa": null,
          "excepcional": false,
          "aprovador": null,
          "migrado": false
        },
        {
          "de": "Pago",
          "para": "Pedido Entregue",
          "em": "2026-01-23T12:00:00Z",
          "por": {
            "id": 3,
            "nome": "Fernanda Silva",
            "matricula": "CBMDF-1091"
          },
          "perfil": "compras",
          "origem": "status.html",
          "justificativa": null,
          "excepcional": false,
          "aprovador": null,
          "migrado": false
        }
      ]
    }
  ];

  const seededCiclos = [
    {
      "id": "PCA-2026-Q1",
      "ano": 2026,
      "quadrimestre": 1,
      "rotulo": "1º quadrimestre de 2026",
      "periodo": "janeiro a abril",
      "status": "fechado",
      "abertoEm": "2026-01-15T12:00:00Z",
      "abertoPor": {
        "id": 5,
        "nome": "Maria Oliveira",
        "matricula": "CBMDF-1122"
      },
      "fechadoEm": "2026-04-30T12:00:00Z",
      "fechadoPor": {
        "id": 5,
        "nome": "Maria Oliveira",
        "matricula": "CBMDF-1122"
      },
      "justificativa": "Ata de fechamento do 1º quadrimestre de 2026: fila priorizada consolidada e fotografada para o PCA.",
      "fotografia": [
        {
          "protocolo": "PED-2027-0006",
          "setor": "CESMA",
          "solicitante": "Carlos Eduardo",
          "valor": 1620,
          "score": 92,
          "posicao": 1,
          "status": "Em Análise Setorial",
          "urgencia": false,
          "ajusteManual": false
        },
        {
          "protocolo": "PED-2027-0002",
          "setor": "DIMAT",
          "solicitante": "João Pedro",
          "valor": 3950,
          "score": 70,
          "posicao": 2,
          "status": "DFD Registrado",
          "urgencia": false,
          "ajusteManual": false
        },
        {
          "protocolo": "PED-2027-0001",
          "setor": "CESMA",
          "solicitante": "Carlos Eduardo",
          "valor": 6800,
          "score": 66,
          "posicao": 3,
          "status": "DFD Registrado",
          "urgencia": false,
          "ajusteManual": false
        },
        {
          "protocolo": "PED-2027-0003",
          "setor": "COMOP",
          "solicitante": "Ana Beatriz",
          "valor": 7270,
          "score": 58,
          "posicao": 4,
          "status": "DFD Aprovado pela Unidade",
          "urgencia": false,
          "ajusteManual": true
        }
      ]
    }
  ];

  function hasValidArray(value) {
    if (!value) {
      return false;
    }

    try {
      const parsed = JSON.parse(value);
      return Array.isArray(parsed) && parsed.length > 0;
    } catch (error) {
      return false;
    }
  }

  if (!hasValidArray(localStorage.getItem(storageKey))) {
    localStorage.setItem(storageKey, JSON.stringify(seededOrders));
  }

  if (!hasValidArray(localStorage.getItem(ciclosKey))) {
    localStorage.setItem(ciclosKey, JSON.stringify(seededCiclos));
  }
})();
