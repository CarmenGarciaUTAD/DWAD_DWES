/* Importado de Bibliotecas */
// Bibliotecas externas
const bcryptjs = require("bcryptjs");

/* Definición de Constantes */
const SALT_ROUNDS = 10;

/* Codificación de Funciones */
const hashPassword = async (password) => {

    const hash = await bcryptjs.hash(password, SALT_ROUNDS);
    return hash;

}

// Comparación de contraseña con su hash
const comparePassword = async (password, hash) => {

    const result = await bcryptjs.compare(password, hash);
    return result;

}

/* Exportado de Modulo */
module.exports = {
    hashPassword,
    comparePassword
}
