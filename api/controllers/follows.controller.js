/* Importado de Bibliotecas */
const { matchedData } = require("express-validator");
const followsModel = require("../models/follows.model");
const { handleHTTPResponse, handleHTTPError, INTERNAL_SERVER_ERROR } = require("../utils/handleResponse.util");

/* Codificación de Funciones */
// GET ALL
const getFollows = async (req, res) => {

    try {

        // Obtenemos los follows de la base de datos
        const data = await followsModel.find();
        handleHTTPResponse(res, "Follows retrieved successfully", data);

    }
    catch (err) {
        console.log(`[follows.controller | getFollows] ERROR: ${err}`);
        handleHTTPError(res, "Follows couldn’t be retrieved", INTERNAL_SERVER_ERROR);
    }

}

// GET BY ID
const getFollow = async (req, res) => {

    try {

        // Obtenemos el ID de los parámetros de la URL y buscamos los follows en base a esa ID
        const { id } = matchedData(req);
        const data = await followsModel.findById(id);
        handleHTTPResponse(res, "Follow retrieved successfully", data);

    }
    catch (err) {
        console.log(`[follows.controller | getFollow] ERROR: ${err}`);
        handleHTTPError(res, "Follow couldn’t be retrieved", INTERNAL_SERVER_ERROR);
    }

}

// CREATE
const createFollow = async (req, res) => {

    try {

        // Obtenemos los datos del body
        const { body } = matchedData(req);
        // Introducimos el nuevo follow en la base de datos
        const data = await followsModel.create(body);
        handleHTTPResponse(res, "Follow created successfully", data);

    }
    catch (err) {

        console.log(`[follows.controller | createFollow] ERROR: ${err}`);
        handleHTTPError(res, "Follow couldn’t be created", INTERNAL_SERVER_ERROR);

    }

}

const updateFollow = async (req, res) => {

    try {

        // Obtenemos los datos del follow a modificar
        const { id, ...body } = matchedData(req);

        // Tratamos de realizar la actualización (si hubiese cualquier error saltaría excepción)
        const data = await followsModel.findByIdAndUpdate(id, body);
        handleHTTPResponse(res, "Follow updated successfully", data);


    }
    catch (err) {

        console.log(`[follows.controller | updateFollow] ERROR: ${err}`);
        handleHTTPError(res, "Follow couldn’t be updated", INTERNAL_SERVER_ERROR);

    }

}

const deleteFollow = async (req, res) => {

    try {

        // Obtenemos el id del follow a eliminar
        const { id } = matchedData(req);

        // Tratamos de eliminar el follow, si hubiese cualquier error lanzaría excepción
        const data = await followsModel.deleteOne({ _id: id });
        handleHTTPResponse(res, "Follow deleted successfully", data);

    }
    catch (err) {

        console.log(`[follows.controller | deleteFollow] ERROR: ${err}`);
        handleHTTPError(res, "Follow couldn’t be deleted", INTERNAL_SERVER_ERROR);

    }

}

/* Exportado de Módulo */
module.exports = {
    getFollows,
    getFollow,
    createFollow,
    updateFollow,
    deleteFollow
}
