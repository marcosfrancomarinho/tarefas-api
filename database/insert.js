const model = require("./model")
function insertDataDB() {
    model.create({
        task: this.task,
        done: this.done
    })
}
module.exports = insertDataDB

