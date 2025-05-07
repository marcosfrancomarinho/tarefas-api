const { QueryTypes } = require("sequelize")
const sequelize = require("./connection")
function alterTaskOfDB() {
    sequelize.query(
        `UPDATE tarefas SET task = "${this.task}" WHERE id = ${this.id}`,
        { type: QueryTypes.UPDATE }
    )
}
function taskDone() {
    sequelize.query(
        `UPDATE tarefas SET done = ${this.done} WHERE id = ${this.id}`,
        { type: QueryTypes.UPDATE }
    )
}
module.exports = { taskDone, alterTaskOfDB }