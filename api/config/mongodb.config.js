

/* Importado de Bicliotecas */
const mongoose = require("mongoose");

/* Codificacion de Funciones */
const dbConnect = async () => {
    try {
        /* Declaraciones Constantes */
        const DB_URI = process.env.DB_URI;
        mongoose.set('strictQuery', false);
        await mongoose.connect(DB_URI, {
            //useNewUrlParser: true,
            //useUnifiedTopology: true,
        });
        console.log("[MongoDB Config]  MongoDB connected...");
    } catch (error) {
        console.error("[MongoDB Config]  Error while connecting to MongoDB...", error);
    }

};

/* Exportado de Modulo */
module.exports = dbConnect;