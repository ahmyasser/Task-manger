//Define UI Vars
const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');

//load event listeners
loadEventlisteners();

function loadEventlisteners() {
    // Load Tasks from local storage
    document.addEventListener('DOMContentLoaded', loadTasks);
    // Submit form
    form.addEventListener('submit', addTask);
    // Remove task
    taskList.addEventListener('click', removeTask);
    // Clear task event
    clearBtn.addEventListener('click', clearTasks);
    // Filter tasks event
    filter.addEventListener('keyup', filterTasks);
}

//Add Task
function addTask(e) {
    if (taskInput.value === '') {
        alert('Add a task');
    }
    // Create li element
    const li = document.createElement('li');
    // Add class
    li.className = 'collection-item';
    // Create text node and appernd to li
    li.appendChild(document.createTextNode(taskInput.value));
    // Create new link element
    const link = document.createElement('a');
    // Add class
    link.className = 'delete-item secondary-content';
    // Add icon html
    link.innerHTML = '<i class="fa fa-remove"></i>';
    // Append the link to li
    li.appendChild(link);
    // Append li to ul
    taskList.appendChild(li);
    // Store to local Storage
    storeTaskInLocalStorage(taskInput.value);
    // Clear input
    taskInput.value = '';

    e.preventDefault();
}
// Store Tasks to LS
function storeTaskInLocalStorage(task) {
    let tasks;
    if (!localStorage.getItem('tasks')) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    tasks.push(task);

    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Remove Task
function removeTask(e) {
    if (e.target.parentElement.classList.contains('delete-item')) {
        if (confirm('Are You Sure?')) {
            e.target.parentElement.parentElement.remove();
            removeFromLocalStorage(e.target);
        }

    }
}
// Remove from local storage
function removeFromLocalStorage(task) {
    let tasks;
    if (localStorage.getItem('tasks')) {
        tasks = JSON.parse(localStorage.getItem('tasks'));
        tasks.forEach(function(element, index) {
            if (element !== task.textContent) {
                tasks.splice(index, 1)
            }

        });;
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }
}


// Filter Tasks
function filterTasks(e) {
    const text = e.target.value.toLowerCase();
    document.querySelectorAll('.collection-item').forEach(function(task) {
        const item = task.firstChild.textContent;
        if (item.toLowerCase().indexOf(text) != -1) {
            task.style.display = 'block';

        } else {
            task.style.display = 'none';
        }
    });

}
// Load Tasks

function loadTasks(e) {
    let tasks;
    if (!localStorage.getItem('tasks')) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    tasks.forEach(task => {
        console.log('in');
        // Create li element
        const li = document.createElement('li');
        // Add class
        li.className = 'collection-item';
        // Create text node and appernd to li
        li.appendChild(document.createTextNode(task));
        // Create new link element
        const link = document.createElement('a');
        // Add class
        link.className = 'delete-item secondary-content';
        // Add icon html
        link.innerHTML = '<i class="fa fa-remove"></i>';
        // Append the link to li
        li.appendChild(link);
        // Append li to ul
        taskList.appendChild(li);
    });
}

// Clear Tasks
function clearTasks() {
    while (taskList.firstChild) {
        taskList.removeChild(taskList.firstChild)
    }
    // Clear tasks from local storage
    clearTasksFromLocalStorage();
}
// Clear tasks from local storage
clearTasksFromLocalStorage() {
    localStorage.clear();
}