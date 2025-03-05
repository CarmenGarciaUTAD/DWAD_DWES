/* Importado de Bibliotecas */
const { matchedData } = require("express-validator");

// Bibliotecas propias
const { usersModel } = require("../models");
const { handleHTTPResponse, handleHTTPError, UNAUTHORIZED, NOT_FOUND, INTERNAL_SERVER_ERROR } = require("../utils/handleResponse.util");
const { hashPassword, comparePassword } = require("../utils/handlePassword.util");
const { tokenSign } = require("../utils/handleJWT.util");

/* Codificación de Funciones */
// Registro de usuario
const registerUser = async (req, res) => {
    try {
        // Nos quedamos con el body de la petición
        req = matchedData(req);

        // Generamos la contraseña hasheada, la introducimos en el body y  generamos el nuevo usuario en la base de datos
        const hashedPassword = await hashPassword(req.password);
        const body = {
            ...req, password: hashedPassword
        };
        const dataUser = await usersModel.create(body);

        // Eliminamos el atributo password de la respuesta para no mandarla
        dataUser.set("password", undefined, { strict: false });

        // Mandamos el token de sesión junto a la información del usuario
        const data = {
            token: await tokenSign(dataUser),
            user: dataUser
        }

        handleHTTPResponse(res, "User signed up successfully", data);
    }
    catch (err) {
        // Mostramos el error
        console.log("ERROR[auth.controller / resgisterUser]: \n" + err);
        handleHTTPError(res, "ERROR_REGISTER_USER", INTERNAL_SERVER_ERROR);
    }
}

//Login del usuario
const loginUser = async (req, res) => {
    try {
        // Nos quedamos con el body de la petición
        req = matchedData(req);

        // Buscamos al usuario con el mail introducido
        const user = await usersModel.findOne({ email: req.email }).select("password name role email");

        // Comprobamos que el usuario exista
        if (!user) {
            handleHTTPError(res, "USER_NOT_EXISTS", NOT_FOUND);
            return;
        }

        // Comprobamos la contraseña
        const check = await comparePassword(req.password, user.password);
        if (!check) {
            handleHTTPError(res, "INVALID_PASSWORD", UNAUTHORIZED);
            return;
        }

        // Devolvemos el usuario quitando la contraseña
        user.set("password", undefined, { strict: false });
        const data = {
            token: await tokenSign(user),
            user
        }

        handleHTTPResponse(res, "Authentication success", data);
    }
    catch (err) {
        // Mostramos el error
        console.log("ERROR[auth.controller / loginUser]: \n" + err);
        handleHTTPError(res, "ERROR_LOGIN_USER", INTERNAL_SERVER_ERROR);
    }
}

/* Exportado de Modulo */
module.exports = {
    registerUser,
    loginUser
}