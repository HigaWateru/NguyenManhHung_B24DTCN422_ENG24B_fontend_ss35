let tasks = JSON.parse(localStorage.getItem("tasks")) || []
let ul = document.getElementById("taskList")
function addTask(){
    let task = document.getElementById("taskInput").value
    if(task === "")alert("Vui lòng nhập công việc")
    else {
        tasks.push(task)
        localStorage.setItem("tasks", JSON.stringify(tasks))
        renderTask(tasks)
        document.getElementById("taskInput").value = ""
    }
}
function renderTask(tasks){
    ul.innerHTML = ''
    tasks.forEach(task => {
        let li = document.createElement("li")
        li.innerHTML += `
            <span>${task}</span>
            <div class="btn">
                <button onclick="editTask('${task}')">Sửa</button><button onclick="deleteTask('${task}')">Xoá</button>
            </div>
        `
        ul.appendChild(li)
    })
}

function editTask(task) {
    let editInput = prompt("Nhập công việc mới:", task)
    if (editInput === "") alert("Vui lòng nhập công việc")
    else {
        let index = tasks.indexOf(task)
        tasks[index] = editInput
        localStorage.setItem("tasks", JSON.stringify(tasks))
        renderTask(tasks)
    }
}

function deleteTask(task) {
    if (confirm("Bạn có chắc muốn xoá công việc này?")) {
        let index = tasks.indexOf(task)
        tasks.splice(index, 1)
        localStorage.setItem("tasks", JSON.stringify(tasks))
        renderTask(tasks)
    }
}
renderTask(tasks)