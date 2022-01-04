var todoInput = document.querySelector("#inp_name_todo")
var addTodoBtn = document.querySelector("#btn_add_todo")
var listTodo = document.querySelector("#list_todo")

addTodoBtn.addEventListener("click", function (e) {
    if (todoInput.value === '') return
    createTodo.bind(listTodo,todoInput.value)()
})



function createTodo(value) {
    var label = document.createElement("h1")
    var todolist = document.createElement("div")
    var input = document.createElement('input')
    var taskButton = document.createElement("button")


    todolist.className = "todo"
    taskButton.className = "add_btn"
    input.className = "add_inp_task"
    taskButton.id = "add_btn"
    label.innerHTML = value
    taskButton.innerHTML = "+"

    listTodo.appendChild(todolist)
    todolist.appendChild(label)
    todolist.appendChild(input)
    todolist.appendChild(taskButton)

    taskButton.addEventListener("click",
        createTask.bind(todolist, input)
    )
}

function createTask(input) {

    var task = document.createElement("div")
    task.innerHTML = input.value
    this.appendChild(task)

}
