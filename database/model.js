const { DataTypes } = require("sequelize")
const sequelize = require("./connection")
const model = sequelize.define("tarefas", {
    id: {
        autoIncrement: false,
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
    },
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

// sequelize.authenticate()
// .then(() => console.log("connected database"))
// .catch(error => console.log(error))

// model.sync({force:true})

module.exports = model