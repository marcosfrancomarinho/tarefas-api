const { QueryTypes } = require("sequelize")
const sequelize = require("./connection")

function removeTask(id) {
    sequelize.query(
        `DELETE FROM tarefas WHERE id = ${id}`,
        { type: QueryTypes.DELETE }
    )
}
module.exports = removeTask