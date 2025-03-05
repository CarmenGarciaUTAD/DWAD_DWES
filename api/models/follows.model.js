/* Importado de Bibliotecas */
// Bibliotecas externas
const mongoose = require("mongoose");

/* Esquema de Usuarios */
const FollowsScheme = new mongoose.Schema(

    {
        follower: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "users",
            required: true
        },
        following: {
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
module.exports = mongoose.model("follows", FollowsScheme);