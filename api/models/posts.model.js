/* Importado de Bibliotecas */
// Bibliotecas externas
const mongoose = require("mongoose");

/* Esquema de Usuarios */
const PostsScheme = new mongoose.Schema(

    {
        owner: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "users",
            required: true
        },
        content: {
            type: String,
            required: true
        },
        image: {
            type: String,
            default: ""
        }
    },
    {
        timestamp: true,
        versionKey: false
    }

);

/* Exportado de Módulo */
module.exports = mongoose.model("posts", PostsScheme);