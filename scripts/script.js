//код снизу
let task_list = document.getElementById('task_list')
let new_task = document.getElementById('new_task')
new_task.addEventListener('keydown', add_new_task_event)

// Загрузка задач при запуске страницы
window.addEventListener('load', load_tasks);

class Task {
    constructor(text) {
        this.text = text;
        this.isFavourite = false;
        // TODO: группы задач
        // this.group = null;
        // TODO: deadline
        // TODO: start time 
    }

    render() {
        let task_li = document.createElement('li');
        task_li.innerHTML = `<span>${XSS_attack_check(this.text)}</span>` + TASK_BUTTON_DELETE + 
        (this.isFavourite ? TASK_BUTTON_FAVOURITE_YES: TASK_BUTTON_FAVOURITE_NO) + TASK_BUTTON_EDIT;
        return task_li;
    }
}

// Добавление новой задачи
function add_new_task_event(event) {
    if (event.key === "Enter") {
        add_new_task()
    }
}

const TASK_BUTTON_DELETE = `
<button onclick="delete_task(this)">
<img alt='trash icon' src="images/icons/Trash3.png">
</button>`

const TASK_BUTTON_FAVOURITE_NO = `
<button id="notIsFavourite" onclick="toggle_favourite(this)">
<img alt='favourite icon' src="images/icons/Star.png">
</button>`

const TASK_BUTTON_FAVOURITE_YES = `
<button id="isFavourite" onclick="toggle_favourite(this)">
<img alt='favourite icon' src="images/icons/StarFull.png">
</button>`

const TASK_BUTTON_EDIT = `
<button onclick="edit_task(this)">
<img alt='change icon' src="images/icons/Edit 2.png">
</button>`

const TASK_UPDATE_BUTTONS = `
<button onclick="confirm_update_task(this)">
<img alt='confirm' src="images/icons/confirm.png">
</button>
<button onclick="cancel_task_update()">
<img alt='cancel' src="images/icons/cancel.png">
</button>
`

function add_new_task() {
    let new_task_li = document.createElement('li');
    new_task_obj = new Task(new_task.value);

    task_list.appendChild(new_task_obj.render());

    save_tasks();
    new_task.value = '';
    console.log('new task added');
}

// Удаление задач
function delete_task(button) {
    let deleting_li = button.parentElement;
    deleting_li.remove();
    save_tasks();
    console.log('deleted succesfuly');
}

// Работа с localStorage
function save_tasks() {
    const tasks = Array.from(task_list.children).map(li => li.querySelector('span').textContent);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function load_tasks() {
    const tasks = JSON.parse(localStorage.getItem('tasks') || '[]');
    tasks.forEach(task => {
        var new_task_obj = new Task(task);
        task_list.appendChild(new_task_obj.render());
    });
}

//
function edit_task(button){
    console.log('hello world');
    let updating_task = button.parentElement;

    updating_task.innerHTML = `<input value="${updating_task.textContent}">` + TASK_UPDATE_BUTTONS;

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
    let value = XSS_attack_check(input.value);
    updating_task.innerHTML = `<span>${value}</span>` + TASK_BUTTONS;
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

function XSS_attack_check(text){
    text = text.replaceAll('<', '&lt;');
    text = text.replaceAll('>', '&gt;');
    return text;
}

// Favourite task feature
function toggle_favourite(button) {
    let task_li = button.parentElement;
    let isFavourite = button.id === 'notIsFavourite';

    // Создаём новую кнопку
    const newButton = document.createElement('button');
    newButton.onclick = function() { toggle_favourite(this); };
    if (isFavourite) {
        newButton.id = 'isFavourite';
        newButton.innerHTML = `<img alt='favourite icon' src="images/icons/StarFull.png">`;
    } else {
        newButton.id = 'notIsFavourite';
        newButton.innerHTML = `<img alt='favourite icon' src="images/icons/Star.png">`;
    }

    // Заменяем старую кнопку на новую
    task_li.replaceChild(newButton, button);

    // Можно добавить обновление данных и сохранение
    save_tasks();
}