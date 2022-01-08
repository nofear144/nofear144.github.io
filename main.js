var todoInput = document.querySelector("#inp_name_todo")
var addTodoBtn = document.querySelector("#btn_add_todo")
var listTodo = document.querySelector("#list_todo")

addTodoBtn.addEventListener("click", function (e) {
    if (todoInput.value === '') return
    createTodo.bind(listTodo, todoInput.value)()
    todoInput.value = ""
})


function createTodo(value) {
    var label = document.createElement("h1")
    var todolist = document.createElement("div")
    var headTodoContainer = document.createElement("div")
    var headTaskContainer = document.createElement("div")
    var input = document.createElement('input')
    var taskBtn = document.createElement("button")
    var deleteTodoBtn = document.createElement("button")
    var headerUnfinished = document.createElement("h3")
    var headerFinished = document.createElement("h3")
    var finishedTasks = document.createElement("div")
    var unfinishedTasks = document.createElement("div")

    finishedTasks.className = 'finished_task'
    unfinishedTasks.className = 'unfinished_task'
    headTaskContainer.className = 'headTask_Container'
    headTodoContainer.className = "head_todo_container"
    todolist.className = "todo"
    taskBtn.className = "add_btn"
    deleteTodoBtn.className = "deleteTodo_btn"
    input.className = "add_inp_task"
    headerUnfinished.className = 'header_tasks'
    headerFinished.className = 'header_tasks'

    headerUnfinished.innerHTML = "Unfinished Task"
    headerFinished.innerHTML = "Finished Task"
    label.innerHTML = value
    taskBtn.innerHTML = "+"
    deleteTodoBtn.innerHTML = "x"

    listTodo.appendChild(todolist)
    todolist.appendChild(headTodoContainer)
    headTodoContainer.appendChild(label)
    headTodoContainer.appendChild(deleteTodoBtn)
    todolist.appendChild(headTaskContainer)
    headTaskContainer.appendChild(input)
    headTaskContainer.appendChild(taskBtn)
    todolist.appendChild(headerUnfinished)
    todolist.appendChild(unfinishedTasks)
    todolist.appendChild(headerFinished)
    todolist.appendChild(finishedTasks)

    taskBtn.addEventListener("click",
        createTask.bind(todolist, input, finishedTasks, unfinishedTasks)
    )
    deleteTodoBtn.addEventListener("click", deleteTodo)
    saveToLocalStorage()
    return {todolist, finishedTasks, unfinishedTasks}

}

function deleteTodo() {
    var currentChild = this.parentNode
    var currentTodo = currentChild.parentNode
    var listTodo = currentTodo.parentNode
    listTodo.removeChild(currentTodo)
    saveToLocalStorage()
}

function createTask(input, finishedTasks, unfinishedTasks) {

    if (input.value === "") return
    var taskContainer = document.createElement("div")
    var taskName = document.createElement("div")
    var deleteBtn = document.createElement("button")
    var checkbox = document.createElement("input")

    taskContainer.className = "task_container"
    checkbox.type = "checkbox"
    checkbox.className = "checkbox_style"
    checkbox.innerHTML = "true"
    deleteBtn.innerHTML = "delete"
    taskName.innerHTML = input.value || input
    taskName.className = "task_text"

    unfinishedTasks.appendChild(taskContainer)
    taskContainer.appendChild(checkbox)
    taskContainer.appendChild(taskName)
    taskContainer.appendChild(deleteBtn)

    deleteBtn.addEventListener("click", deleteTask)
    checkbox.addEventListener('click', switchStatus.bind(taskContainer, finishedTasks, unfinishedTasks, checkbox))

    input.value = ""
    saveToLocalStorage()
    return {taskContainer, checkbox}

}

function deleteTask() {
    var task = this.parentNode
    var todo = task.parentNode
    todo.removeChild(task)
    saveToLocalStorage()
}


function switchStatus(finishedTasks, unfinishedTasks, checkbox) {
    if (checkbox.checked) {
        finishedTasks.appendChild(this)
    } else {
        unfinishedTasks.appendChild(this)
    }
    saveToLocalStorage()

}





//Set to LS ( LS use as a state in this App )
function saveToLocalStorage() {
    var todoArr = [];

    for (var i = 0; i < listTodo.children.length; i++) {

        var unfinishedTask = listTodo.children[i].getElementsByClassName("unfinished_task")[0].getElementsByClassName("task_text")
        var finishedTask = listTodo.children[i].getElementsByClassName("finished_task")[0].getElementsByClassName("task_text")
        todoArr.push({name: listTodo.children[i].getElementsByTagName("h1")[0].innerText})

        todoArr[i].unfinishedTask = []
        todoArr[i].finishedTask = []
        for (var j = 0; j < unfinishedTask.length; j++) {
            todoArr[i].unfinishedTask.push(unfinishedTask[j].innerText)
        }

        for (var l = 0; l < finishedTask.length; l++) {
            todoArr[i].finishedTask.push(finishedTask[l].innerText)
        }
    }

    localStorage.removeItem('todo')
    localStorage.setItem('todo', JSON.stringify(todoArr))
}

//Parse from LS
function loadFromLocalStorage() {
    return JSON.parse(localStorage.getItem("todo"))
}
var data = loadFromLocalStorage()
for (var i = 0; i < data.length; i++) {

    var savedTodo = createTodo(data[i].name)

    for (var j = 0; j < data[i].finishedTask.length; j++) {
        var savedTask = createTask(data[i].finishedTask[j], savedTodo.finishedTasks, savedTodo.unfinishedTasks)
        savedTask.checkbox.checked = true
        switchStatus.bind(savedTask.taskContainer,savedTodo.finishedTasks,savedTodo.unfinishedTasks,savedTask.checkbox)()
    }
    for (var l = 0; l < data[i].unfinishedTask.length; l++) {
        createTask(data[i].unfinishedTask[l], savedTodo.finishedTasks, savedTodo.unfinishedTasks)
    }

}



