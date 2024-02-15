const { Sequelize } = require("sequelize")
const config = [
    "tarefasdb",
    "root",
    "151822",
    {
        host: "localhost",
        dialect: "mysql"
    }
]
const sequelize = new Sequelize(...config)
module.exports = sequelize
const { createTableAndAuthenticate } = require("./model")

