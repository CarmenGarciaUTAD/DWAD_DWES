const ENGINE_DB = process.env.ENGINE_DB
const pathModels = (ENGINE_DB === 'nosql') ? './nosql/' : './mysql/'

const models = {
    //tracksModel: require(pathModels + 'tracks.model.js'),
    followsModel: require("./follows.model"),
    likesModel: require("./likes.model"),
    postsModel: require("./posts.model"),
    usersModel: require("./users.model")
}

module.exports = models