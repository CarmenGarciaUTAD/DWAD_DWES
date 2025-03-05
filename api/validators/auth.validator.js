/* Importado de Bibliotecas */
// Bibliotecas externas
const { check } = require("express-validator");
const { validateResults } = require("../utils/handleValidator.util");

/* Validaciones */
// Registro de usuario
const validatorRegister = [
    check("username").exists().notEmpty().isLength({ min: 3, max: 99 }),
    check("fullName").exists().notEmpty().isLength({ min: 3, max: 99 }),
    check("description").exists().notEmpty().isLength({ min: 3, max: 99 }),
    check("email").exists().notEmpty().isEmail(),
    check("avatar").exists().notEmpty(),
    check("password").exists().notEmpty().isLength({ min: 8, max: 30 }),
    check("role").exists().notEmpty(),

    (req, res, next) => {
        return validateResults(req, res, next);
    }
];

// Login de usuarios
const validatorLogin = [
    check("email").exists().notEmpty().isEmail(),
    check("password").exists().notEmpty().isLength({ min: 8, max: 30 }),

    (req, res, next) => {
        return validateResults(req, res, next);
    }
];

/* Exportado de Modulo */
module.exports = {
    validatorRegister,
    validatorLogin
}