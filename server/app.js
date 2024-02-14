const express = require("express")
const cors = require("cors")
const bodyParser = require("body-parser")
const queryDB = require("../database/query")
const insertDB = require("../database/insert")
const deleteDB = require("../database/delete")
const { alterTaskOfDB, taskDone } = require("../database/alter")
const app = express()

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json({ type: 'application/json' }))
app.use(cors())
app.post("/", (req, res) => postClient(req, res))
app.get("/", (req, res) => getClient(req, res))
app.put("/", (req, res) => putClient(req, res))
app.delete("/", (req, res) => deleteClient(req, res))

function getClient(req, res) {
    if (Object.keys(req.query).length > 0) {
        queryDB(Number(req.query.id)).then(data => {
            res.status(200)
            res.type("json")
            res.send(JSON.stringify({ tasks: data }))
        })
    } else {
        queryDB().then(data => {
            res.status(200)
            res.type("json")
            res.send(JSON.stringify({ tasks: data }))
        })
    }
}
function postClient(req, res) {
    insertDB.bind({
        id: Number(req.body.id),
        task: req.body.task,
        done: req.body.done
    })()
    res.status(201)
    res.send({ status: 201 })
    next()
}
function putClient(req, res) {
    if (req.body.done) {
        taskDone.bind({
            id: req.body.id,
            done: true
        })()
    } else {
        taskDone.bind({
            id: req.body.id,
            done: false
        })()
    }
    if (req.body.alter) {
        alterTaskOfDB.bind({
            id: req.body.id,
            task: req.body.task
        })()
    }
    res.status(201)
    res.send({ status: 200 })
    next()
}
function deleteClient(req, res) {
    deleteDB(Number(req.body.id))
    res.send({ status: 200 })
}
app.listen(3000, () => console.log("server online"))
