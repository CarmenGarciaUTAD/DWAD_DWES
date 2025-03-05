/* Importado de Bibliotecas */
// Bibliotecas externas
const express = require("express");

// Bibliotecas propias
const {
    getFollows,
    getFollow,
    createFollow,
    updateFollow,
    deleteFollow
} = require("../controllers/follows.controller");
const { validatorGetFollow, validatorCreateFollow } = require("../validators/follows.validator.js");
const { authMiddleware } = require("../middlewares/session.middleware");
console.log("Controladores de Follow:", {
    getFollows,
    getFollow,
    createFollow,
    updateFollow,
    deleteFollow
});
/* Declaraciones Constantes */
const router = express.Router();

/* Definición de Rutas */
// GET ALL
router.get("/", authMiddleware, getFollows);

// GET BY ID
router.get("/:id", authMiddleware, validatorGetFollow, getFollow);

// CREATE
router.post("/", authMiddleware, validatorCreateFollow, createFollow);

// UPDATE
router.put("/:id", authMiddleware, validatorGetFollow, validatorCreateFollow, updateFollow);

// DELETE
router.delete("/:id", authMiddleware, validatorGetFollow, deleteFollow);

/* Exportado de Módulo */
module.exports = router;
