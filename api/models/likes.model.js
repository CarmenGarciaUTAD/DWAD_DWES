/* Importado de Bibliotecas */
// Bibliotecas externas
const mongoose = require("mongoose");

/* Esquema de Usuarios */
const LikesScheme = new mongoose.Schema(

    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "users",
            required: true
        },
        post: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "posts",
            required: true
        }
    },
    {
        timestamp: true,
        versionKey: false
    }

);

/* Exportado de Módulo */
module.exports = mongoose.model("likes", LikesScheme);