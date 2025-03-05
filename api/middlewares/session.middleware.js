/* Importado de Bibliotecas */
const { handleHTTPError, UNAUTHORIZED } = require("../utils/handleResponse.util");
const { verifyToken } = require("../utils/handleJWT.util");
const { userModel } = require("../models");

/* Codificación de Funciones */
const authMiddleware = async (req, res, next) => {

    try {
        // Comprobamos que nos han introducido el token
        if (!req.headers.authorization) {
            handleHTTPError(res, "NOT_TOKEN", UNAUTHORIZED);
            return;
        }

        // Recibimos como valor del token Bearer <TOKEN>, nos quedamos con el token
        const token = req.headers.authorization.split(' ').pop();

        // Comprobamos que el token tiene el formato correcto
        if (!token || token === '') {
            handleHTTPError(res, "INVALID_TOKEN_FORMAT", UNAUTHORIZED);
            return;
        }

        // Obtenemos el Payload del token
        const tokenData = verifyToken(token);
        if (!tokenData) {
            handleHTTPError(res, "NOT_PAYLOAD_DATA");
            return;
        }

        // Obtenemos al usuario y lo pasamos a los siguientes pasos
        const query = {
            _id: tokenData._id
        }

        const user = await userModel.findOne(query);
        if (!user) {
            handleHTTPError(res, "USER_NOT_FOUND", UNAUTHORIZED);
            return;
        }

        // Guardamos el usuario en la request para que los controladores posteriores puedan acceder a él
        req.user = user;

        // Continuamos con la ejecución del siguiente middleware o controlador
        next();

    }
    catch (err) {
        // Mostramos el error en la consola
        console.log("ERROR[session.middleware / authMiddleware]: \n" + err);
        handleHTTPError(res, "NOT_SESSION", UNAUTHORIZED);
    }
}

/* Exportado de Modulo */
module.exports = { authMiddleware };
