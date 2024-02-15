const {model} = require("./model")
function insertDataDB() {
    return model.create({
        task: this.task,
        done: this.done
    })
}
module.exports = insertDataDB

