//код снизу
let task_list = document.getElementById('task_list')
let new_task = document.getElementById('new_task')
new_task.addEventListener('keydown', add_new_task_event)

// Загрузка задач при запуске страницы
window.addEventListener('load', load_tasks);

// Добавление новой задачи
function add_new_task_event(event) {
    if (event.key === "Enter") {
        add_new_task()
    }
}

const task_buttons = `
<button onclick="delete_task(this)">
<img alt='trash icon' src="images/icons/Trash3.png">
</button>
<button>
<img alt='favourite icon' src="images/icons/Star.png">
</button>
<button onclick="edit_task(this)">
<img alt='change icon' src="images/icons/Edit 2.png">
</button>`

const task_update_buttons = `
<button onclick="confirm_update_task(this)">
<img alt='confirm' src="images/icons/confirm.png">
</button>
<button onclick="cancel_task_update()">
<img alt='cancel' src="images/icons/cancel.png">
</button>
`

function add_new_task() {
    let new_task_li = document.createElement('li');
    //шедевро код от шедевро разработчика
    new_task_li.innerHTML = `<span>${XSL_attack_chechout(new_task.value)}</span>` + task_buttons;

    task_list.appendChild(new_task_li);

    save_tasks();
    console.log('new task added');
}

// Удаление задач
function delete_task(button) {
    // TODO Удаление задачи
    let deleting_li = button.parentElement;
    deleting_li.remove();
    save_tasks();
    console.log('deleted succesfuly');
}

// Работа с localStorage
function save_tasks() {
    const tasks = Array.from(task_list.children).map(li => li.textContent);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function load_tasks() {
    const tasks = JSON.parse(localStorage.getItem('tasks') || '[]');
    tasks.forEach(task => {
        let new_task_li = document.createElement('li')
        new_task_li.innerHTML = `<span> ${ XSL_attack_chechout(task)}</span>` + task_buttons;
        task_list.appendChild(new_task_li);
    });
}

function edit_task(button){
    console.log('hello world');
    let updating_task = button.parentElement;

    updating_task.innerHTML = `<input value="${updating_task.textContent}">` + task_update_buttons;

    const input = updating_task.querySelector('input');
    input.addEventListener('keydown', function(event) {
        if (event.key === "Enter") {
            update_task(input, updating_task);
        }
    });
}

function confirm_update_task(button){
    let updating_task = button.parentElement;
    const input = updating_task.querySelector('input');

    update_task(input, updating_task);
}

function update_task(input, updating_task){
    let value = XSL_attack_chechout(input.value);
    updating_task.innerHTML = `<span>${value}</span>` + task_buttons;
    save_tasks();
    console.log('task updated');
}

function cancel_task_update(){
    refresh_task_board();
    console.log('task update cancelled');
}

function refresh_task_board(){
    let task_list = document.getElementById('task_list');
    task_list.innerHTML = '';
    load_tasks();
}

function XSL_attack_chechout(text){
    text = text.replaceAll('<', '&lt;');
    text = text.replaceAll('>', '&gt;');
    return text;
}
