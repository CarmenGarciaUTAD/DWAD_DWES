// Importando bibliotecas
const express = require("express");
const cors = require("cors");
const morganBody = require("morgan-body");
const { IncomingWebhook } = require("@slack/webhook");
const swaggerUI = require("swagger-ui-express");
const swaggerSpecs = require("./api/docs/swagger.docs");


const { INTERNAL_SERVER_ERROR } = require("./api/utils/handleResponse.util");

// Bibliotecas propias
const mongooseDBConnect = require("./api/config/mongodb.config");
const { stream } = require("winston");
//const socialnetInfo = require(".socialnet");

// Cargamos el fichero de entorno
require("dotenv").config();

// Definicion de constantes
const PORT = process.env.PORT || 3000;
// Con el 3000 le indicamos que si no carga bien la variable, le asigne por defecto 3000

const SLACK_WEBHOOK = process.env.SLACK_WEBHOOK;
/* Webhook */
const webhook = new IncomingWebhook(SLACK_WEBHOOK);

/* Logger Stream */
const loggerStream = {
    write: message => {
        webhook.send({
            text: message
        });
    }
};

// Inicializamos el servidor web
const app = express();

// Le instalamos las políticas
app.use(cors());
app.use(express.json());
app.use("/api", require("./api/routes"));

/* Creacion de la ruta /api-docs que contendra la documentacion de nuestra API hecha con Swagger  */
app.use(
    "/api-docs",
    swaggerUI.serve,
    swaggerUI.setup(swaggerSpecs)
);

// Definimos las rutas de nuestra API
app.get("/", (req, res) => {
    res.send("Hello to the New Twitter!");
});

// Ruta 404 para cualquier ruta no definida
app.use((req, res) => {
    res.status(404).send("Error 404 page not found")
})

/* Inicialización del logger a Slack */
morganBody(app, {
    noColors: true,
    skip: function (req, res) {
        return res.statusCode < INTERNAL_SERVER_ERROR
    },
    stream: loggerStream
});

// Iniciamos el servidor a la escucha
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}...`);
    console.log(`Attempting to connect to mongooseDB...`);
    mongooseDBConnect();
});

module.exports = app;