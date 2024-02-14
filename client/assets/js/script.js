
const response = (method) => fetch("http://localhost:3000/", { ...method })
const $ = selector => {
    const element = document.querySelectorAll(selector)
    return element.length > 1 ? element : element[0]
}
$(".btn-close").onclick = () => $(".card").classList.add("hide")

window.onload = async () => {
    const tasks = await response({
        headers: { "Content-Type": "application/json" },
        method: "GET",
    }).then(res => res)
    if (tasks.status == 200) {
        const tasksOfUser = (await tasks.json()).tasks
        const container = document.createElement("div")
        container.className = "task-container"
        tasksOfUser.forEach(elm => container.appendChild(create.bind(elm)()))
        $(".response").appendChild(container)
        checkDone()
    }
}
function create() {
    const content = document.createElement("div")
    const task = document.createElement("div")
    const alter = document.createElement("img")
    content.className = "task-content"
    task.className = "task"
    alter.className = "alter"
    alter.addEventListener("click", editOrClear)
    task.addEventListener("click", done)
    alter.src = "./assets/images/settings.png"
    task.innerText = this.task
    alter.id = this.id
    alter.dataset.done = this.done
    task.id = this.id
    content.dataset.done = this.done
    alter.dataset.task = this.task
    content.appendChild(task)
    content.appendChild(alter)
    return content
}
function done() {
    const div = this.parentElement.classList
    const id = Number(this.id)
    if (div.toggle("done")) {
        response(
            {
                headers: {
                    "Content-Type": "application/json",
                },
                method: "PUT",
                body: JSON.stringify({
                    done: true,
                    id: id
                }),
            }
        )
    } else {
        response(
            {
                headers: {
                    "Content-Type": "application/json",
                },
                method: "PUT",
                body: JSON.stringify({
                    done: false,
                    id: id
                }),
            }
        )
    }
}
function editOrClear() {
    $(".card").classList.remove("hide")
    $(".btn-delete").onclick = () => removeTask.bind(this)()
    $(".btn-edit").onclick = () => editTask.bind(this)()
}
function removeTask() {
    $(".task-container").removeChild(this.parentElement)
    const id = Number(this.id)
    const res = confirm("Deseja exluir esta tarefa?")
    $(".card").classList.add("hide")
    if (res) {
        response(
            {
                headers: {
                    "Content-Type": "application/json",
                },
                method: "DELETE",
                body: JSON.stringify({
                    id: id,
                }),
            }
        )
    }
}
function editTask() {
    const div = this.parentElement.children[0]
    const id = Number(this.id)
    const task = this.dataset.task
    const done = this.dataset.done == 0 ? false : true
    $("#task").value = task
    $("#task").focus()
    $(".card").classList.add("hide")
    $(".btn-add").onclick = (event) => {
        event.preventDefault()
        div.innerText = $("#task").value
        response(
            {
                headers: {
                    "Content-Type": "application/json",
                },
                method: "PUT",
                body: JSON.stringify({
                    id: id,
                    task: $("#task").value,
                    alter: true,
                    done: done
                }),
            }
        )
        $("#task").value = ""
    }
}
$(".btn-add").onclick = async (event) => {
    event.preventDefault()
    await response(
        {
            headers: {
                "Content-Type": "application/json",
            },
            method: "POST",
            body: JSON.stringify({
                task: $("#task").value,
                done: false
            }),
        }
    ).then(res => res.json()).then(arr => {
        const task = (create.bind(arr.tasks[0]))()
        $(".task-container").appendChild(task)
    })
}
function checkDone() {
    document.querySelectorAll(".task-content").forEach(elm => {
        if (elm.dataset.done == 1) {
            elm.classList.add("done")
        } else {
            elm.classList.remove("done")
        }
    })
}