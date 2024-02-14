
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
        createList.bind(tasksOfUser)()
        checkDone()
    }
}
function createList() {
    const container = document.createElement("div")
    container.className = "task-container"
    this.forEach(elm => {
        const content = document.createElement("div")
        const task = document.createElement("div")
        const alter = document.createElement("img")
        alter.addEventListener("click", editOrClear)
        task.addEventListener("click", done)
        alter.src = "./assets/images/settings.png"
        task.innerText = elm.task
        task.className = "task"
        content.className = "task-content"
        alter.className = "alter"
        alter.id = elm.id
        alter.dataset.done = elm.done
        task.id = elm.id
        content.dataset.done = elm.done
        alter.dataset.task = elm.task
        content.appendChild(task)
        content.appendChild(alter)
        container.appendChild(content)
    })
    $(".response").appendChild(container)
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
    }
    $("#task").value = ""
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
    )
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