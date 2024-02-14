const { QueryTypes } = require("sequelize")
const sequelize = require("./connection")
async function  queryDB(id) {
    if (typeof id === "number") {
        return await sequelize.query(
            `SELECT * FROM tarefas WHERE id =${id}`,
            { type: QueryTypes.SELECT }
        )
    }
    return await sequelize.query(
        `SELECT * FROM tarefas`,
        { type: QueryTypes.SELECT }
    )
}
module.exports = queryDB