/* Importado de Bibliotecas */
const { matchedData } = require("express-validator");
const postsModel = require("../models/posts.model");
const { handleHTTPResponse, handleHTTPError, INTERNAL_SERVER_ERROR } = require("../utils/handleResponse.util");

/* Codificación de Funciones */
// GET ALL
const getPosts = async (req, res) => {

    try {

        // Obtenemos los posts de la base de datos
        const data = await postsModel.find();
        handleHTTPResponse(res, "Posts retrieved successfully", data);

    }
    catch (err) {
        console.log(`[posts.controller | getPosts] ERROR: ${err}`);
        handleHTTPError(res, "Posts couldn’t be retrieved", INTERNAL_SERVER_ERROR);
    }

}

// GET BY ID
const getPost = async (req, res) => {

    try {

        // Obtenemos el ID de los parámetros de la URL y buscamos los posts en base a esa ID
        const { id } = matchedData(req);
        const data = await postsModel.findById(id);

        handleHTTPResponse(res, "Post retrieved successfully", data);

    }
    catch (err) {
        console.log(`[posts.controller | getPost] ERROR: ${err}`);
        handleHTTPError(res, "Post couldn’t be retrieved", INTERNAL_SERVER_ERROR);
    }

}

// CREATE
const createPost = async (req, res) => {

    try {

        // Obtenemos los datos del body
        const { body } = matchedData(req);

        // Introducimos el nuevo post en la base de datos
        const data = await postsModel.create(body);

        handleHTTPResponse(res, "Post created successfully", data);

    }
    catch (err) {

        console.log(`[posts.controller | createPost] ERROR: ${err}`);
        handleHTTPError(res, "Post couldn’t be created", INTERNAL_SERVER_ERROR);

    }

}

const updatePost = async (req, res) => {

    try {

        // Obtenemos los datos del post a modificar
        const { id, ...body } = matchedData(req);

        // Tratamos de realizar la actualización (si hubiese cualquier error saltaría excepción)
        const data = await postsModel.findByIdAndUpdate(id, body);

        handleHTTPResponse(res, "Post updated successfully", data);

    }
    catch (err) {

        console.log(`[posts.controller | updatePost] ERROR: ${err}`);
        handleHTTPError(res, "Post couldn’t be updated", INTERNAL_SERVER_ERROR);

    }

}

const deletePost = async (req, res) => {

    try {

        // Obtenemos el id del post a eliminar
        const { id } = matchedData(req);

        // Tratamos de eliminar el post, si hubiese cualquier error lanzaría excepción
        const data = await postsModel.deleteOne({ _id: id });
        handleHTTPResponse(res, "Post deleted successfully", data);

    }
    catch (err) {

        console.log(`[posts.controller | deletePost] ERROR: ${err}`);
        handleHTTPError(res, "Post couldn’t be deleted", INTERNAL_SERVER_ERROR);

    }

}

/* Exportado de Módulo */
module.exports = {
    getPosts,
    getPost,
    createPost,
    updatePost,
    deletePost
}
