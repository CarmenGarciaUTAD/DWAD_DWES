const express = require("express")
const fs = require("fs")
const router = express.Router()

const removeExtension = (fileName) => {
    // Solo la primera parte del split (lo de antes del primer punto)
    return fileName.split(".").shift()
}

// Devuelve el nombre de los ficheros que se encuentran dentro del directorio actual (_diname)
fs.readdirSync(__dirname).filter((file) => {
    const name = removeExtension(file) // index, tracks y en el futuro: users, storage
    if (name != 'index') {
        router.use('/' + name, require('./' + name + '.route')) //localhost:3000/api/tracks
    }
})

module.exports = router;