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
    var input = document.createElement('input')
    var taskBtn = document.createElement("button")
    var deleteTodoBtn = document.createElement("button")
    var finishedTasks = document.createElement("div")
    var unfinishedTasks = document.createElement("div")

    finishedTasks.className = 'finished_task'
    unfinishedTasks.className = 'unfinished_task'

    headTodoContainer.className = "head_todo_container"
    todolist.className = "todo"
    taskBtn.className = "add_btn"
    deleteTodoBtn.className = "add_btn"
    input.className = "add_inp_task"
    label.innerHTML = value
    taskBtn.innerHTML = "+"
    deleteTodoBtn.innerHTML = "x"

    listTodo.appendChild(todolist)
    todolist.appendChild(headTodoContainer)
    headTodoContainer.appendChild(label)
    headTodoContainer.appendChild(deleteTodoBtn)
    todolist.appendChild(input)
    todolist.appendChild(taskBtn)
    todolist.appendChild(finishedTasks)
    todolist.appendChild(unfinishedTasks)


    taskBtn.addEventListener("click",
        createTask.bind(todolist, input, finishedTasks, unfinishedTasks)
    )
    deleteTodoBtn.addEventListener("click", deleteTodo)
}
function deleteTodo() {
    var currentChild = this.parentNode
    var currentTodo = currentChild.parentNode
    var listTodo = currentTodo.parentNode

    listTodo.removeChild(currentTodo)
}

function createTask(input, finishedTasks, unfinishedTasks) {

    if (input.value === "") return
    var taskContainer = document.createElement("div")
    var taskName = document.createElement("div")
    var deleteBtn = document.createElement("button")
    var checkbox = document.createElement("input")

    taskContainer.className = "task_container"
    checkbox.type = "checkbox"
    checkbox.innerHTML = "true"
    deleteBtn.innerHTML = "delete"
    taskName.innerHTML = input.value

    this.appendChild(taskContainer)
    taskContainer.appendChild(checkbox)
    taskContainer.appendChild(taskName)
    taskContainer.appendChild(deleteBtn)

    deleteBtn.addEventListener("click", deleteTask)
    checkbox.addEventListener('click', switchStatus.bind(taskContainer, finishedTasks, unfinishedTasks, checkbox))

    input.value = ""
}

function deleteTask() {
    var task = this.parentNode
    var todo = task.parentNode
    todo.removeChild(task)
}



function switchStatus(finishedTasks, unfinishedTasks, checkbox) {
    if (checkbox.checked) {
        finishedTasks.appendChild(this)
    } else {
        unfinishedTasks.appendChild(this)
    }
}


