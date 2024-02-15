const { DataTypes } = require("sequelize")
const sequelize = require("./connection")
const model = sequelize.define("tarefas", {
    task: {
        autoIncrement: false,
        type: DataTypes.STRING,
        allowNull: false,
    },
    done: {
        autoIncrement: false,
        type: DataTypes.BOOLEAN,
        allowNull: false
    }
})
function createTableAndAuthenticate() {
    sequelize.authenticate()
        .then(() => {
            console.log("connected database")
            model.sync({ force: true })
        })
        .catch(error => console.log(error))
}
module.exports = { model, createTableAndAuthenticate }