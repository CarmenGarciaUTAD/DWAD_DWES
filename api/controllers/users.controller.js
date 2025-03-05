

/* Importado de Bibliotecas */
const { matchedData } = require("express-validator");
const usersModel = require("../models/users.model");
const { handleHTTPResponse, handleHTTPError, INTERNAL_SERVER_ERROR } = require("../utils/handleResponse.util");

/* Codificación de Funciones */
// GET ALL
const getUsers = async (req, res) => {

    try {

        // Obtenemos los usuarios de la base de datos
        const data = await usersModel.find();
        handleHTTPResponse(res, "Users retrieved successfully", data);

    }
    catch (err) {
        console.log(`[users.controller | getUsers] ERROR: ${err}`);
        handleHTTPError(res, "Users couldn’t be retrieved", INTERNAL_SERVER_ERROR);
    }

}

// GET BY ID
const getUser = async (req, res) => {

    try {

        // Obtenemos el ID de los parámetros de la URL y buscamos a los usuarios en base a esa ID
        const { id } = matchedData(req);
        const data = await usersModel.findById(id);

        handleHTTPResponse(res, "User retrieved successfully", data);

    }
    catch (err) {
        console.log(`[users.controller | getUser] ERROR: ${err}`);
        handleHTTPError(res, "User couldn’t be retrieved", INTERNAL_SERVER_ERROR);
    }

}

// CREATE
const createUser = async (req, res) => {

    try {

        // Obtenemos los datos del body
        const { body } = matchedData(req);

        // Introducimos al nuevo usuario en la base de datos (si ya está repetido el username o el email daría error, por lo que saltaría excepción)
        const data = await usersModel.create(body);

        handleHTTPResponse(res, "User created successfully", data);

    }
    catch (err) {

        console.log(`[users.controller | createUser] ERROR: ${err}`);
        handleHTTPError(res, "User couldn’t be created", INTERNAL_SERVER_ERROR);

    }

}

const updateUser = async (req, res) => {

    try {

        // Obtenemos los datos del usuario a modificar
        const { id, ...body } = matchedData(req);

        // Tratamos de realizar la actualización (si hubiese cualquier error saltaría excepción)
        const data = await usersModel.findByIdAndUpdate(id, body);

        handleHTTPResponse(res, "User updated successfully", data);

    }
    catch (err) {

        console.log(`[users.controller | updateUser] ERROR: ${err}`);
        handleHTTPError(res, "User couldn’t be updated", INTERNAL_SERVER_ERROR);

    }

}

const deleteUser = async (req, res) => {

    try {

        // Obtenemos el id del usuario a eliminar
        const { id } = matchedData(req);

        // Tratamos de eliminar al usuario, si hubiese cualquier error lanzaría excepción
        const data = await usersModel.deleteOne({ _id: id });
        handleHTTPResponse(res, "User deleted successfully", data);

    }
    catch (err) {

        console.log(`[users.controller | deleteUser] ERROR: ${err}`);
        handleHTTPError(res, "User couldn’t be deleted", INTERNAL_SERVER_ERROR);

    }

}

/* Exportado de Módulo */
module.exports = {
    getUsers,
    getUser,
    createUser,
    updateUser,
    deleteUser
}
