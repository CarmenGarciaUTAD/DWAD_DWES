/* Importado de Bibliotecas */
// Bibliotecas externas
const express = require("express");

// Bibliotecas propias
const {
    getPosts,
    getPost,
    createPost,
    updatePost,
    deletePost
} = require("../controllers/posts.controller");
const { validatorGetPost, validatorCreatePost } = require("../validators/posts.validator.js");
const { authMiddleware } = require("../middlewares/session.middleware");

/* Declaraciones Constantes */
const router = express.Router();

/* Definición de Rutas */
// GET ALL
router.get("/", authMiddleware, getPosts);

// GET BY ID
router.get("/:id", authMiddleware, validatorGetPost, getPost);

// CREATE
router.post("/", authMiddleware, validatorCreatePost, createPost);

// UPDATE
router.put("/:id", authMiddleware, validatorGetPost, validatorCreatePost, updatePost);

// DELETE
router.delete("/:id", authMiddleware, validatorGetPost, deletePost);

/* Exportado de Módulo */
module.exports = router;