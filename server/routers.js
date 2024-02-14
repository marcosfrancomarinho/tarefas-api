const express = require("express")
const queryDB = require("../database/query")
const insertDB = require("../database/insert")
const deleteDB = require("../database/delete")
const { alterTaskOfDB, taskDone } = require("../database/alter")
const router = express.Router()
router.get("/", (req, res) => {
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
})
router.post("/", (req, res) => {
    insertDB.bind({
        task: req.body.task,
        done: req.body.done
    })()
    res.status(201)
    res.send({ status: 201 })
})
router.put("/", (req, res) => {
    if (req.body.alter) {
        alterTaskOfDB.bind({
            id: req.body.id,
            task: req.body.task,
        })()
    } else {
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
    }
    res.status(201)
    res.send({ status: 200 })
})
router.delete("/", (req, res) => {
    deleteDB(req.body.id)
    res.send({ status: 200 })
})
module.exports = router