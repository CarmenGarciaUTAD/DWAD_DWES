/* Importado de Bibliotecas */
// Bibliotecas externas
const express = require("express");

// Bibliotecas propias
const { registerUser, loginUser } = require("../controllers/auth.controller");
const { validatorRegister, validatorLogin } = require("../validators/auth.validator");

/* Declaraciones Constantes */
const router = express.Router();

/* Rutas */
// Register
/**
 *  @openapi
 *  /api/auth/register:
 *  post:
 *      tags:
 *      - Users
 *      summary: Register user
 *      description: Register a new user in the system
 *      requestBody:
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: "#/components/schemas/user"
 *      responses:
 *          '200':
 *              description: Returns if the user has been registered successfully
 *          '400':
 *              description: Validation error
 *          '500':
 *              description: Server error
 */
router.post("/register", validatorRegister, registerUser);

// Login
/**
 *  @openapi
 *  /api/auth/login:
 *  post:
 *      tags:
 *      - Users
 *      summary: Login user
 *      description: Register a new user in the system
 *      requestBody:
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: "#/components/schemas/user"
 *      responses:
 *          '200':
 *              description: Returns if the user has been registered successfully
 *          '400':
 *              description: Validation error
 *          '500':
 *              description: Server error
 */
router.post("/login", validatorLogin, loginUser);

/* Exportado de Modulo */
module.exports = router;