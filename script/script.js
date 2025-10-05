(function () {
  const spec = {
    openapi: "3.0.0",
    info: {
      title: "Endpoints API - Consulta.AI!",
      version: "1.0.0",
      description: "Essa documentação compõem todos os endpoint utilizados pelo aplicativo Consulta.AI! em suas funcionalidades principais."
    },
    servers: [
    ],
    paths: {
      "/get_context": {
        get: {
          tags: ["Funcionalidades do App"],
          summary: "Obter doença aleatório conforme a dificuldade.",
          parameters: [
            { name: "difficult", in: "query",  type: "string", enum: ["EASY", "MEDIUM", "HARD"], default: "EASY", description: "Dificuldade do contexto" },
          ],
          responses: {
            "200": {
              description: "Retorna uma doença registrada no banco",
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                    properties: {
                      error: {type: "boolean", default: false},
                      data: { type: "object", $ref: "#/components/schemas/Context" },
                    }
                  }
                }
              }
            },
            "400": {
              description: "Dificuldade não enviada na query",
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                    properties: {
                      error: {type: "boolean", default: true},
                      data: { type: "object", properties: {
                        error: {type: "string", default: "Bad Request"}
                      }},
                    }
                  }
                }
              }
            },
            "500": {
              description: "Erro interno",
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                    properties: {
                      error: {type: "boolean", default: true},
                      data: { type: "object", properties: {
                        error: {type: "string", default: "Internal Server Error"}
                      }},
                    }
                  }
                }
              }
            }
          }
        },
      },
      "/chat": {
        post: {
          tags: ["Funcionalidades do App"],
          summary: "Realiza interação com usuário",
          description: "Endpoint que recebe mensagem do usuário e retorna resposta do chat.",
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: {
                  $ref: '#/components/schemas/ChatInput'
                }
              }
            }
          },
          parameters: [
            {
              name: "x-session-id",
              in: "header",
              required: true,
              schema: { type: "string" },
              description: "Identificador da sessão do usuário"
            }
          ],
          responses: {
            200: {
              description: "Resposta do chat enviada com sucesso",
              content: {
                "application/json": {
                  schema: {
                    $ref: '#/components/schemas/ChatOutput'
                  }
                }
              }
            },
            400: {
              description: "Erro de validação ZOD",
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                    properties: {
                      error: {type: "boolean", default: true},
                      data: { type: "object", properties: {
                        message: {type: "string", default: "Erro na validação ZOD"}
                      }},
                    }
                  }
                }
              }
            },
            500: {
              description: "Erro interno",
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                    properties: {
                      error: {type: "boolean", default: true},
                      data: { type: "object", properties: {
                        message: {type: "string", default: "Erro ao processar a solicitação: Nome do erro"}
                      }},
                    }
                  }
                }
              }
            }
          }
        }
      },

      "/generate_grade": {
        post : {
          tags: ["Funcionalidades do App"],
          summary: "Gera a nota de atendimento e recomendações",
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: { 
                  type: "object",
                  properties: {
                    chat_finished: { type: "string", description: "Token base64 com o chat completo"}
                  },
                  example: {
                    chat_finished: "eyJpZCI6MTIzLCJjaGF0IjpbeyJtZXNzYWdlIjoiSGVsbG8ifV19"
                  }
                }
              }
            },
          },
          responses: {
            200: {
              description: "Retorna nota com recomendações",
                content: {
                  "application/json": {
                    schema: {
                      $ref: '#/components/schemas/GradeRecommendation'
                    }
                  }
                }
            },
            400: {
              description: "Erro de validação ZOD",
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                    properties: {
                      error: {type: "boolean", default: true},
                      data: { type: "object", properties: {
                        message: {type: "string", default: "Erro na validação ZOD"}
                      }},
                    }
                  }
                }
              }
            },
            500: {
              description: "Erro interno",
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                    properties: {
                      error: {type: "boolean", default: true},
                      data: { type: "object", properties: {
                        error: {type: "string", default: "Internal Server Error"}
                      }},
                    }
                  }
                }
              }
            }
          }
        }
      },
      "/feedback": {
        post : {
          tags: ["Funcionalidades do App"],
          summary: "Registra feedbacks do app",
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: { 
                  type: "object",
                  properties: {
                    message: { type: "string", description: "Feedback de avaliação do aplicativo"}
                  },
                  example: {
                    message: "Achei interessante a ideia, mas pode melhorar nisso..."
                  }
                }
              }
            },
          },
          responses: {
            200: {
              description: "Feedback enviado com sucesso",
                content: {
                  "application/json": {
                    schema: {
                      type: "object",
                      properties: {
                        error: {type: "boolean", default: false},
                        data: { 
                          type: "object", 
                          properties: {
                            id: { type: "string", default: "d4f5e7c8-3a91-4b2e-8f3c-9e1b6d2f4a7c" }
                          }
                        },
                      }
                    }
                  }
                }
            },
            400: {
              description: "Mensagem não encontrada",
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                    properties: {
                      error: {type: "boolean", default: true},
                      data: { type: "object", properties: {
                        error: {type: "string", default: "Bad Request"}
                      }},
                    }
                  }
                }
              }
            },
            500: {
              description: "Erro interno",
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                    properties: {
                      error: {type: "boolean", default: true},
                      data: { type: "object", properties: {
                        error: {type: "string", default: "Internal Server Error"}
                      }},
                    }
                  }
                }
              }
            }
          }
        }
      },
    },
    components: {
      schemas: {
        Context: {
          type: "object",
          properties: {
            id: { type: "string" },
            name: { type: "string", description: "Nome da doença" },
            symptoms: { type: "string",  description: "Sintomas da doença"},
            treatment: { type: "string", description: "Tratamento da doença" },
          }
        },
        ChatInput : {
          type: "object",
          properties: {
            doctorName: { type: "string", description: "Nome do médico" },
            message: { type: "string", description: "Mensagem do usuário" },
            token: { type: "string", description: "Historico de chat em base64" }
          },
          required: ["doctorName", "message", "token"],
          example: {
            doctorName: "Fulano",
            message: "Olá, preciso de orientação",
            token: "eyJpZCI6MTIzLCJjaGF0IjpbXX0=" // base64
          }
        },
        ChatOutput : {
          type: "object",
          properties: {
            error: {type: "boolean", default: false},
            data :{
              type: "object",
              properties: {
                id: { type: "string" },
                message: { type: "string", description: "Resposta do chat" },
                token: { type: "string", description: "Historico de chat em base64" }
              }
            }
          },
          example: {
            error: false,
            data: {
              id: "d4f5e7c8-3a91-4b2e-8f3c-9e1b6d2f4a7c",
              message: "Olá! Como posso ajudá-lo hoje?",
              token: "eyJpZCI6MTIzLCJjaGF0IjpbeyJtZXNzYWdlIjoiSGVsbG8ifV19"
            }
          }
        },
        GradeRecommendation: {
          type: "object",
          properties: {
            error: {type: "boolean", default: false},
            data: { 
              type: "object", 
              properties: {
                score: {type: "number", description: "Nota do usuário"},
                recommendation: {
                  type: "array", 
                  description: "Recomendações de mudanças de atendimento",
                  items: {
                    type: "object",
                    properties: {
                      name: {type: "string"},
                      description: {type: "string"}
                    }
                  } 
                }
              }
            },
          },
          example: {
            error: false,
            data: {
              score: 45,
              recommendation: [
                {
                  name: "Titulo da recomendação 1",
                  description: "Descrição da recomendação 1"
                }
              ]
            }
          }
        }
      },
      // securitySchemes: {
      //   bearerAuth: { type: "http", scheme: "bearer", bearerFormat: "JWT" }
      // }
    },
    // security: [{ bearerAuth: [] }],
    tags: [
      { name: "Funcionalidades do App", description: "Rotas relacionadas às funcionalidades do aplicativo"},
      { name: "Funcionalidades Administrativas", description: "Rotas para gerenciamento e administração do sistema"},
    ]
  };

  window.onload = function () {
    const ui = SwaggerUIBundle({
      spec: spec,
      dom_id: "#swagger-ui",
      deepLinking: true,
      presets: [SwaggerUIBundle.presets.apis, SwaggerUIStandalonePreset],
      layout: "BaseLayout",
      docExpansion: "list",
      defaultModelsExpandDepth: 2,
      defaultModelExpandDepth: 2
    });

    window.ui = ui;
  };
})();
