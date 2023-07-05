import '../styles/modern-normalize.css';
import '../styles/style.css';

// global scope variables (accessible to funtions)
const taskform = document.getElementById('todo-form');
const taskInput = document.getElementById('todo-input');
const taskList = document.getElementById('task-list');
const clearAll = document.getElementById('clear');

function addTask(e) {
	e.preventDefault();
	const newTask = taskInput.value;

	// validate input
	if (newTask === '') {
		alert('Please add a task.');
		return;
	}
	// create task
	const li = document.createElement('li');
	li.className = 'task-list__item';
	const p = createP();
	const div = createDiv('control-btns');
	const icon = createIcon('fa-regular fa-circle');

	p.append(icon, document.createTextNode(' ' + newTask));

	const editBtn = createBTn('btn edit-btn');
	editBtn.appendChild(document.createTextNode('Edit'));
	const deleteBtn = createBTn('btn delete-btn');
	deleteBtn.appendChild(document.createTextNode('Delete'));

	div.append(editBtn, deleteBtn);

	li.append(p, div);

	taskList.appendChild(li);
	checkUI();
	taskInput.value = '';
}

function createP() {
	const p = document.createElement('p');
	return p;
}

function createIcon(classes) {
	const icon = document.createElement('i');
	icon.className = classes;
	return icon;
}

function createDiv(classes) {
	const div = document.createElement('div');
	div.className = classes;
	return div;
}

function createBTn(classes) {
	const button = document.createElement('button');
	button.className = classes;
	return button;
}

function deleteTask(e) {
	if (e.target.classList.contains('delete-btn')) {
		e.target.parentElement.parentElement.remove();
	} else {
		console.log('failed');
	}
	checkUI();
}

function clear(e) {
	e.preventDefault();
	while (taskList.firstChild) {
		taskList.removeChild(taskList.firstChild);
	}
	checkUI();
}

function checkUI() {
	const tasks = taskList.querySelectorAll('li');
	const tasksHeading = document.querySelector('.task-list-box__subtitle');
	if (tasks.length === 0) {
		clearAll.style.display = 'none';
		tasksHeading.textContent = 'list is empty';
	} else {
		clearAll.style.display = 'inline-block';
		tasksHeading.textContent = 'Tasks list';
	}
}

// Event Listeners
taskform.addEventListener('submit', addTask);
taskList.addEventListener('click', deleteTask);
clearAll.addEventListener('click', clear);

checkUI();
