const model = require("./model")
function insertDataDB() {
    model.create({
        id: this.id,
        task: this.task,
        done: this.done
    })
}
module.exports = insertDataDB

