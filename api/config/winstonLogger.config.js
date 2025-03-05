/* Importado de Bibliotecas */
const { createLogger, format, transports } = require("winston");
const { MESSAGE } = require("triple-beam");
const { combine, timestamp, label } = format;

/* Formatos */
const generalFormat = format((info) => {
    const { level, message, timestamp } = info;
    info[MESSAGE] = `LOG(${timestamp}) ${level}: ${message}`;
    return info;
});

/* Loggers */
// App
const appLogger = createLogger({

    format: combine(
        label({ label: "APP", message: true }),
        timestamp(),
        generalFormat()
    ),
    transports: [
        new transports.Console({
            level: "silly"
        })
    ]
});

// JWT
const jwtLogger = createLogger({

    format: combine(
        label({ label: "JWT", message: true }),
        timestamp(),
        generalFormat()
    ),
    transports: [
        new transports.Console({
            level: "silly"
        })
    ]
});

/* Exportado de Modulos */
module.exports = {
    appLogger,
    jwtLogger
}