/*Importado de Bibliotecas */
// Bibliotecas externas
const { check } = require("express-validator");

// Bibliotecas propias
const validateResults = require("../utils/handleValidator.util");

/* Validaciones */
const validatorCreateFollow = [

    check("follower").exists().notEmpty(),
    check("following").exists().notEmpty(),

    (req, res, next) => {

        return validateResults(req, res, next);

    }
];

const validatorGetFollow = [

    check("id").exists().notEmpty().isMongoId(),

    (req, res, next) => {

        return validateResults(req, res, next);

    }
]

/* Exportado de Modulo */
module.exports = {
    validatorCreateFollow,
    validatorGetFollow
}
