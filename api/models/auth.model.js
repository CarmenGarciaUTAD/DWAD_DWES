/* Importado de Bibliotecas */
// Bibliotecas externas
const mongoose = require("mongoose");

/* Esquema de Usuarios */
const AuthScheme = new mongoose.Schema(

    {
        username: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "users",
            required: true
        },
        email: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "users",
            required: true
        },
        password: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "users",
            required: true
        }
    },
    {
        timestamp: true,
        versionKey: false
    }

);

/* Exportado de Módulo */
module.exports = mongoose.model("auths", AuthScheme);