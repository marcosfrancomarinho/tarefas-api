const { Sequelize } = require("sequelize")
const config = [
    "tarefasdb",
    "root",
    "*******",
    {
        host: "localhost",
        dialect: "mysql"
    }
]
const sequelize = new Sequelize(...config)
module.exports = sequelize