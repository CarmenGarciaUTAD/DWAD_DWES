/*Importado de Bibliotecas */
// Bibliotecas externas
const { check } = require("express-validator");

// Bibliotecas propias
const validateResults = require("../utils/handleValidator.util");

/* Validaciones */
const validatorCreatePost = [

    check("owner").exists().notEmpty(),
    check("content").exists().notEmpty(),
    check("image").exists().notEmpty(),

    (req, res, next) => {

        return validateResults(req, res, next);

    }
];

const validatorGetPost = [

    check("id").exists().notEmpty().isMongoId(),

    (req, res, next) => {

        return validateResults(req, res, next);

    }
]

/* Exportado de Modulo */
module.exports = {
    validatorCreatePost,
    validatorGetPost
}
