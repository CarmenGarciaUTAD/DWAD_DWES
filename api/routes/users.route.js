/* Importado de Bibliotecas */
// Bibliotecas externas
const express = require("express");

// Bibliotecas propias
const { checkRol } = require("../middlewares/role.middleware");

// Bibliotecas propias
const {
    getUsers,
    getUser,
    createUser,
    updateUser,
    deleteUser
} = require("../controllers/users.controller");
const { validatorGetUser, validatorCreateUser, validatorUpdateUser } = require("../validators/users.validator.js");
const { authMiddleware } = require("../middlewares/session.middleware");

/* Declaraciones Constantes */
const router = express.Router();

/**
 * @openapi
 * /api/auth/users:
 *  get:
 *      tags:
 *      - User
 *      summary: Get users in the System
 *      description: ‘’
 *      responses:
 *          ‘200’:
 *              description: Returns the users
 *          ‘500’:
 *              description: Server error
 *      security:
 *          - bearerAuth: []
*/
router.get("/users", authMiddleware, getUsers)

/**
 *  @openapi
 *  /api/users/{id}:
 *  put:
 *      tags:
 *      - Users
 *      summary: Update user
 *      description: Update a user in the system
 *      parameters:
 *          -   name: id
 *              in: path
 *              description: id that need to be updated
 *              required: true
 *              schema:
 *                  type: string
 *      requestBody:
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: "#/components/schemas/user"
 *      responses:
 *          '200':
 *              description: Returns if the user has been updated propperly
 *          '400':
 *              description: Validaation error
 *          '401':
 *              description: Authentication / Authorization error
 *          '404':
 *              description: User not found
 *          '500':
 *              description: Server error
 *      security:
 *          - bearerAuth: []
 */
router.put("/update/:id", authMiddleware, checkRol(["admin"]), validatorGetUser, validatorUpdateUser, updateUser)

/* Definición de Rutas */
// GET ALL
router.get("/", authMiddleware, getUsers);

// GET BY ID
router.get("/:id", authMiddleware, validatorGetUser, getUser);

// CREATE
router.post("/", authMiddleware, validatorCreateUser, createUser);

// UPDATE
router.put("/:id", authMiddleware, validatorGetUser, validatorCreateUser, updateUser);

// DELETE
router.delete("/:id", authMiddleware, validatorGetUser, deleteUser);

/* Exportado de Módulo */
module.exports = router;