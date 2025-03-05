/* Importado de Bibliotecas */
const { matchedData } = require("express-validator");
const likesModel = require("../models/likes.model");
const { handleHTTPResponse, handleHTTPError, INTERNAL_SERVER_ERROR } = require("../utils/handleResponse.util");

/* Codificación de Funciones */
// GET ALL
const getLikes = async (req, res) => {

    try {

        // Obtenemos los likes de la base de datos
        const data = await likesModel.find();
        handleHTTPResponse(res, "Likes retrieved successfully", data);

    }
    catch (err) {
        console.log(`[likes.controller | getLikes] ERROR: ${err}`);
        handleHTTPError(res, "Likes couldn’t be retrieved", INTERNAL_SERVER_ERROR);
    }

}

// GET BY ID
const getLike = async (req, res) => {

    try {

        // Obtenemos el ID de los parámetros de la URL y buscamos los likes en base a esa ID
        const { id } = matchedData(req);
        const data = await likesModel.findById(id);

        handleHTTPResponse(res, "Like retrieved successfully", data);

    }
    catch (err) {
        console.log(`[likes.controller | getLike] ERROR: ${err}`);
        handleHTTPError(res, "Like couldn’t be retrieved", INTERNAL_SERVER_ERROR);
    }

}

// CREATE
const createLike = async (req, res) => {

    try {

        // Obtenemos los datos del body
        const { body } = matchedData(req);

        // Introducimos el nuevo like en la base de datos
        const data = await likesModel.create(body);

        handleHTTPResponse(res, "Like created successfully", data);

    }
    catch (err) {

        console.log(`[likes.controller | createLike] ERROR: ${err}`);
        handleHTTPError(res, "Like couldn’t be created", INTERNAL_SERVER_ERROR);

    }

}

const updateLike = async (req, res) => {

    try {

        // Obtenemos los datos del like a modificar
        const { id, ...body } = matchedData(req);

        // Tratamos de realizar la actualización (si hubiese cualquier error saltaría excepción)
        const data = await likesModel.findByIdAndUpdate(id, body);

        handleHTTPResponse(res, "Like updated successfully", data);

    }
    catch (err) {

        console.log(`[likes.controller | updateLike] ERROR: ${err}`);
        handleHTTPError(res, "Like couldn’t be updated", INTERNAL_SERVER_ERROR);

    }

}

const deleteLike = async (req, res) => {

    try {

        // Obtenemos el id del like a eliminar
        const { id } = matchedData(req);

        // Tratamos de eliminar el like, si hubiese cualquier error lanzaría excepción
        const data = await likesModel.deleteOne({ _id: id });
        handleHTTPResponse(res, "Like deleted successfully", data);

    }
    catch (err) {

        console.log(`[likes.controller | deleteLike] ERROR: ${err}`);
        handleHTTPError(res, "Like couldn’t be deleted", INTERNAL_SERVER_ERROR);

    }

}

/* Exportado de Módulo */
module.exports = {
    getLikes,
    getLike,
    createLike,
    updateLike,
    deleteLike
}
