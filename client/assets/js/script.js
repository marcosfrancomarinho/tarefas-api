const $ = selector => {
    const element = document.querySelectorAll(selector)
    return element.length > 1 ? element : element[0]
}
const response = method => fetch("http://localhost:3000/", { ...method })
const hide = value => $(".card").classList[value]("hide")
const clear = () => { $("#task").value = ""; $("#task").focus() }
$(".btn-close").onclick = () => hide("add")
window.onload = async () => {
    const tasks = await response({
        headers: { "Content-Type": "application/json" },
        method: "GET",
    }).then(res => res)
    if (tasks.status == 200) {
        const tasksOfUser = (await tasks.json()).tasks
        const [container] = createElement.bind([
            {
                type: "div",
                class: "task-container"
            }
        ])()
        tasksOfUser.forEach(elm => container.appendChild(create.bind(elm)()))
        $(".response").appendChild(container)
        checkDone()
    }
}
function create() {
    const [content, task, alter] = createElement.bind([
        {
            type: "div",
            class: "task-content",
            done: this.done
        },
        {
            type: "div",
            class: "task",
            id: this.id,
            txt: this.task,
            event: done
        },
        {
            type: "img",
            class: "alter",
            id: this.id,
            done: this.done,
            task: this.task,
            event: editOrClear,
            src: "./assets/images/settings.png"
        }
    ])()
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
    hide("remove")
    $(".btn-delete").onclick = () => removeTask.bind(this)()
    $(".btn-edit").onclick = () => editTask.bind(this)()
}
function removeTask() {
    $(".task-container").removeChild(this.parentElement)
    const id = Number(this.id)
    const res = confirm("Deseja exluir esta tarefa?")
    hide("add")
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
function createElement() {
    const arr = []
    this.forEach(elm => {
        const element = document.createElement(elm.type)
        element.className = elm.class
        if (elm.id) element.id = elm.id
        if (elm.done != undefined) element.dataset.done = elm.done
        if (elm.task) element.dataset.task = elm.task
        if (elm.txt != undefined) element.innerText = elm.txt
        if (elm.src != undefined) element.src = elm.src
        if (elm.event != undefined) element.onclick = elm.event
        arr.push(element)
    })
    return arr
}
function editTask() {
    const div = this.parentElement.children[0]
    const id = Number(this.id)
    const task = this.dataset.task
    const done = this.dataset.done == 0 ? false : true
    $("#task").value = task
    $("#task").focus()
    hide("add")
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
        clear()
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
    clear()
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
