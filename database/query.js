const { QueryTypes } = require("sequelize")
const sequelize = require("./connection")
function queryDB(id) {
    if (typeof id === "number") {
        return sequelize.query(
            `SELECT * FROM tarefas WHERE id =${id}`,
            { type: QueryTypes.SELECT }
        )
    }
    return sequelize.query(
        `SELECT * FROM tarefas`,
        { type: QueryTypes.SELECT }
    )
}
module.exports = queryDB