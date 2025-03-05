/*Importado de Bibliotecas */
// Bibliotecas externas
const { check } = require("express-validator");

// Bibliotecas propias
const validateResults = require("../utils/handleValidator.util");

/* Validaciones */
const validatorCreateLike = [

    check("user").exists().notEmpty(),
    check("post").exists().notEmpty(),

    (req, res, next) => {

        return validateResults(req, res, next);

    }
];

const validatorGetLike = [

    check("id").exists().notEmpty().isMongoId(),

    (req, res, next) => {

        return validateResults(req, res, next);

    }
]

/* Exportado de Modulo */
module.exports = {
    validatorCreateLike,
    validatorGetLike
}
