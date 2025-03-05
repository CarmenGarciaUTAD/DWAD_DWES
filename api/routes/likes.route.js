/* Importado de Bibliotecas */
// Bibliotecas externas
const express = require("express");

// Bibliotecas propias
const {
    getLikes,
    getLike,
    createLike,
    updateLike,
    deleteLike
} = require("../controllers/likes.controller");
const { validatorGetLike, validatorCreateLike } = require("../validators/likes.validator.js");
const { authMiddleware } = require("../middlewares/session.middleware");

/* Declaraciones Constantes */
const router = express.Router();

/* Definición de Rutas */
// GET ALL
router.get("/", authMiddleware, getLikes);

// GET BY ID
router.get("/:id", authMiddleware, validatorGetLike, getLike);

// CREATE
router.post("/", authMiddleware, validatorCreateLike, createLike);

// UPDATE
router.put("/:id", authMiddleware, validatorGetLike, validatorCreateLike, updateLike);

// DELETE
router.delete("/:id", authMiddleware, validatorGetLike, deleteLike);

/* Exportado de Módulo */
module.exports = router;