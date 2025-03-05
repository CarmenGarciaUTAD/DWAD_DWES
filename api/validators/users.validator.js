/*Importado de Bibliotecas */
// Bibliotecas externas
const { check } = require("express-validator");

// Bibliotecas propias
const validateResults = require("../utils/handleValidator.util");

/* Validaciones */
const validatorCreateUser = [

    check("username").exists().notEmpty(),
    check("fullName").exists().notEmpty(),
    check("description").exists().notEmpty(),
    check("email").exists().notEmpty(),
    check("avatar").exists().notEmpty(),
    check("password").exists().notEmpty(),
    check("role").exists().notEmpty(),

    (req, res, next) => {

        return validateResults(req, res, next);

    }
];

const validatorGetUser = [

    check("id").exists().notEmpty().isMongoId(),

    (req, res, next) => {

        return validateResults(req, res, next);

    }
];

const validatorUpdateUser = [

    check("username").optional().notEmpty(),
    check("fullName").optional().notEmpty(),
    check("description").optional().notEmpty(),
    check("email").optional().notEmpty().isEmail(),
    check("avatar").optional().notEmpty(),
    check("password").optional().notEmpty(),
    check("role").optional().notEmpty(),

    check("id").exists().notEmpty().isMongoId(),

    (req, res, next) => {
        return validateResults(req, res, next);
    }
];

/* Exportado de Modulo */
module.exports = {
    validatorCreateUser,
    validatorGetUser,
    validatorUpdateUser
}
