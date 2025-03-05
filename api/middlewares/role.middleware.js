const { handleHTTPError, FORBIDDEN, INTERNAL_SERVER_ERROR } = require("../utils/handleResponse.util");

/* Codificación de Funciones */
const checkRol = (roles) => (req, res, next) => {
    try {
        // Obtenemos el rol del usuario
        const { user } = req;
        const userRol = user.role;

        // Comprobamos que el del usuario se entre entre los que permitimos
        const checkValueRol = roles.includes(userRol);
        if (!checkValueRol) {
            handleHTTPError(res, "NOT_ALLOWED", FORBIDDEN);
            return;
        }
        next();
    }
    catch (err) {
        // Mostrar el error
        console - log("ERROR[rol.middleware / checkRol]: \n" + err);
        handleHTTPError(res, "ERROR_PERMISSIONS", INTERNAL_SERVER_ERROR);
    }
}

/*Exportado del modulo */
module.exports = { checkRol };
