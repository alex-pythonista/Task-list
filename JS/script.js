// Define UI element

let form = document.querySelector('#task-form');
let tasklist = document.querySelector('ul');
let clearBtn = document.querySelector('#clear-task-btn');
let filter = document.querySelector('#task-filter');
let taskInput = document.querySelector('#new-task');

// Define event Listeners
form.addEventListener('submit', addTask);
tasklist.addEventListener('click', removeTask);
clearBtn.addEventListener('click', clear);
filter.addEventListener('keyup', filterTask);
document.addEventListener('DOMContentLoaded', getTasks);

// Define function
// Add task
function addTask(e) {
    if (taskInput.value === '') {
        alert('Add a task!');
    } else {
        // create li element
        let li = document.createElement('li');
        li.appendChild(document.createTextNode(taskInput.value + " "));
        let link = document.createElement('a');
        link.href = "#";
        link.innerHTML = 'x';
        li.appendChild(link);
        tasklist.appendChild(li);
        storeTaskInLocalStorage(taskInput.value);
        taskInput.value = '';
    }
    e.preventDefault();
}

// Remove Task
function removeTask(e) {
    if (e.target.hasAttribute('href')) {
        if (confirm("Are you sure?")) {
            let ele = e.target.parentElement;
            ele.remove();
            removeFromLS(ele);
        }   
    }
    
}

// Clear Task
function clear(e) {
    tasklist.innerHTML = "";

    // Faster
    while(tasklist.firstChild) {
        tasklist.removeChild(tasklist.firstChild);
    };
    localStorage.clear();
};

// Filter task
function filterTask(e) {
    let text = e.target.value.toLowerCase();
    document.querySelectorAll('li').forEach(task => {
        let item = task.firstChild.textContent;
        if (item.toLocaleLowerCase().indexOf(text)!= -1) {
            task.style.display = 'block';
        } else {
            task.style.display = 'none';
        }
    })
}

// Local storage

function storeTaskInLocalStorage(task) {
    let tasks;
    if (localStorage.getItem('tasks') === null) {
        tasks = [];
    }
    else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));

}

function getTasks() {
    let tasks;
    if (localStorage.getItem('tasks') === null) {
        tasks = [];
    }
    else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    tasks.forEach(task => {
        let li = document.createElement('li');
        li.appendChild(document.createTextNode(task + " "));
        let link = document.createElement('a');
        link.href = "#";
        link.innerHTML = 'x';
        li.appendChild(link);
        tasklist.appendChild(li);
    })
}

function removeFromLS(taskItem) {
    let tasks;
    if (localStorage.getItem('tasks') === null) {
        tasks = [];
    }
    else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    let li = taskItem;
    li.removeChild(li.lastChild);

    tasks.forEach((task, index) => {
        if (li.textContent.trim() === task) {
            tasks.splice(index, 1);
        }
    });

    localStorage.setItem('tasks', JSON.stringify(tasks));

}