/* Importado de Bibliotecas */
// Bibliotecas externas
const mongoose = require("mongoose");

/* Esquema de Usuarios */
const UsersScheme = new mongoose.Schema(

    {
        username: {
            type: String,
            unique: true,
            required: true
        },
        fullName: {
            type: String,
            required: true
        },
        description: {
            type: String,
            default: ""
        },
        email: {
            type: String,
            unique: true,
            required: true
        },
        avatar: {
            type: String,
            default: ""
        },
        password: {
            type: String,
            required: true
        },
        role: {
            type: String,
            enum: ["user", "admin"],
            default: "user"
        }
    },
    {
        timestamp: true,
        versionKey: false
    }

);

/* Exportado de Módulo */
module.exports = mongoose.model("users", UsersScheme);