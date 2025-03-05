/* Importado de Bibliotecas */
// Bibliotecas externas
const jwt = require("jsonwebtoken");

/* Definición de Constantes */
const JWT_SECRET = process.env.JWT_SECRET;
const NORMAL_TOKENS_EXPIRATION = "2h";

/* Codificación de Funciones */
const tokenSign = (user) => {
    const sign = jwt.sign(
        {
            _id: user._id,
            rol: user.rol
        },
        JWT_SECRET,
        {
            expiresIn: NORMAL_TOKENS_EXPIRATION
        }
    );
    return sign;
}

const verifyToken = (JWTToken) => {
    try {
        return jwt.verify(JWTToken, JWT_SECRET);
    }
    catch (err) {
        console.log(`ERROR [handleJWT.util / verifyToken]: + ${err}`);
    }
}

/* Exportado de Modulo */
module.exports = {
    tokenSign,
    verifyToken
}
