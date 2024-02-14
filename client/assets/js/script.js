let tasksOfUser = null
const response = (method) => fetch("http://localhost:3000/", { ...method })
const $ = selector => {
    const element = document.querySelectorAll(selector)
    return element.length > 1 ? element : element[0]
}
window.onload = async () => {
    const tasks = await response().then(res => res)
    if (tasks.status == 200) {
        tasksOfUser = (await tasks.json()).tasks
        createList.bind(tasksOfUser)()
    }
}
function createList() {
    const container = document.createElement("div")
    container.className = "task-container"
    this.forEach(elm => {
        const content = document.createElement("div")
        const task = document.createElement("div")
        const alter = document.createElement("button")
        alter.addEventListener("click", editOrClear)
        task.addEventListener("click", done)
        alter.innerText = "OK"
        task.innerText = elm.task
        task.className = "task"
        content.className = "task-content"
        alter.className = "alter"
        alter.dataset.id = elm.id
        alter.dataset.done = elm.done
        alter.dataset.task = elm.task
        content.appendChild(alter)
        content.appendChild(task)
        container.appendChild(content)
    })
    $(".response").appendChild(container)
}
function done() {
    alert("feita")
}
function editOrClear() {
    $(".card").classList.add("show")
    $(".btn-delete").onclick = () => removeTask.bind(this)()
    $(".btn-edit").onclick = () => editTask.bind(this)()
}
function removeTask() {
    const id = Number(this.dataset.id)
    const res = confirm("Deseja exluir esta tarefa?")
    $(".card").classList.remove("show")
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
    const id = Number(this.dataset.id)
    const task = this.dataset.task
    $("#task").value = task
    $(".btn-add").innerText = "ALTERAR"
    $(".card").classList.remove("show")
    $(".btn-add").onclick = (event) => {
        event.preventDefault()
        response(
            {
                headers: {
                    "Content-Type": "application/json",
                },
                method: "PUT",
                body: JSON.stringify({
                    id: id,
                    task: $("#task").value,
                    alter: true
                }),
            }
        )
    }
}
$(".btn-add").onclick = (event) => {
    event.preventDefault()
    const id = tasksOfUser.length + 1
    response(
        {
            headers: {
                "Content-Type": "application/json",
            },
            method: "POST",
            body: JSON.stringify({
                id: id,
                task: $("#task").value,
                done: false
            }),
        }
    )
}