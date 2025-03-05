/*Importado de Bibliotecas */
// Bibliotecas externas
const { validationResult } = require("express-validator");

// Bibliotecas propias
const { handleHTTPError } = require("./handleResponse.util");

/* Codificación de Funciones */
const validateResults = (req, res, next) => {
    try {
        validationResult(req).throw();
        return next();
    }
    catch (err) {
        handleHTTPError(res, "The input could not be validated correctly");
    }
}

/* Exportado de Modulo */
module.exports = {
    validateResults
}