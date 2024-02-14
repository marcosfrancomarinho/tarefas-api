const { Sequelize } = require("sequelize")
const config = [
    "tarefasdb",
    "root",
    "00000",
    {
        host: "localhost",
        dialect: "mysql"
    }
]
const sequelize = new Sequelize(...config)
module.exports = sequelize