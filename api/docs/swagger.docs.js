/* Importado de Bibliotecas */
const swagger = require("swagger-jsdoc");

/* Opciones de swagger */
const options = {
    definition: {
        openapi: "3.0.3",
        info: {
            title: "API de pruebas DWES",
            version: "0.1.0",
            description:
                "This is a CRUD API application made with Express and documented with Swagger to learn API development",
            license: {
                name: "MIT",
                url: "https://spdx.org/licenses/MIT.html",
            },
            contact: {
                name: "Nombre Propietario",
                url: "URL de contacto",
                email: "Email de contacto",
            },
        },
        servers: [
            {
                url: "http://localhost:3000",
            },
        ],
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: "http",
                    scheme: "bearer",
                },
            },
            schemas: {
                user: {
                    type: "object",
                    required: ["username", "name", "email", "password", "description"],
                    properties: {
                        username: {
                            type: "string",
                            example: "user"
                        },
                        fullName: {
                            type: "string",
                            example: "Firstname Lastname"
                        },
                        description: {
                            type: "string",
                            example: "This is a description"
                        },
                        email: {
                            type: "string",
                            example: "user@gmail.com"
                        },
                        avatar: {
                            type: "string",
                            example: "This is a image"
                        },
                        password: {
                            type: "string",
                        },
                        role: {
                            type: "string",
                            example: "This is the role of user"
                        }

                    },
                }
            },
        },
    },
    apis: ["./api/routes/*.js"]
};

/* Exportado de Modulo */
module.exports = swagger(options);