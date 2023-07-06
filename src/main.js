import '../styles/modern-normalize.css';
import '../styles/style.css';

// global scope variables (accessible to funtions)
const taskform = document.getElementById('todo-form');
const taskInput = document.getElementById('todo-input');
const taskList = document.getElementById('task-list');
const clearAll = document.getElementById('clear');
const addTaskBtn = taskform.querySelector('.header__add-btn');
let isEditMode = false;
const task = document.querySelectorAll('.task-list__item');

function displayTasks() {
	const tasksFromStorage = getTasksFromStorage();

	tasksFromStorage.forEach((task) => addTaskToDOM(task));
	checkUI();
}

function onAddTaskSubmit(e) {
	e.preventDefault();
	const newTask = taskInput.value;

	// validate input
	if (newTask === '') {
		alert('Please add a task.');
		return;
	}

	if (isEditMode) {
		const taskToEdit = taskList.querySelector('.edit-mode');

		deleteTaskFromStorage(taskToEdit.querySelector('p').textContent.trim());

		taskToEdit.classList.remove('edit-mode');
		taskToEdit.remove();
		isEditMode = false;
	}

	addTaskToDOM(newTask);
	addTaskToStorage(newTask);

	checkUI();
	taskInput.value = '';
}

function addTaskToDOM(task) {
	// create a task
	const li = document.createElement('li');
	li.className = 'task-list__item';
	const p = createP();
	const div = createDiv('control-btns');
	const icon = createIcon('fa-regular fa-circle');

	p.append(icon, document.createTextNode(' ' + task));

	const editBtn = createBTn('btn edit-btn');
	editBtn.appendChild(document.createTextNode('Edit'));
	const deleteBtn = createBTn('btn delete-btn');
	deleteBtn.appendChild(document.createTextNode('Delete'));

	div.append(editBtn, deleteBtn);

	li.append(p, div);

	taskList.appendChild(li);
}

function addTaskToStorage(task) {
	const tasksFromStorage = getTasksFromStorage();

	tasksFromStorage.push(task);

	localStorage.setItem('tasks', JSON.stringify(tasksFromStorage));
}

function getTasksFromStorage() {
	let tasksFromStorage;

	if (localStorage.getItem('tasks') === null) {
		tasksFromStorage = [];
	} else {
		tasksFromStorage = JSON.parse(localStorage.getItem('tasks'));
	}
	return tasksFromStorage;
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
	}
	// TO BE VERIFIED
	const task = e.target.parentElement.parentElement
		.querySelector('p')
		.textContent.trim();
	deleteTaskFromStorage(task);
	checkUI();
}

function deleteTaskFromStorage(task) {
	let tasksFromStorage = getTasksFromStorage();

	tasksFromStorage = tasksFromStorage.filter((t) => t !== task);

	localStorage.setItem('tasks', JSON.stringify(tasksFromStorage));
}

function editTask(e) {
	if (e.target.classList.contains('edit-btn')) {
		isEditMode = true;
		const task = e.target.parentElement.parentElement;
		taskList
			.querySelectorAll('li')
			.forEach((t) => t.classList.remove('edit-mode'));
		task.classList.add('edit-mode');
		addTaskBtn.style.backgroundColor = '#60c689';
		addTaskBtn.value = 'Update task';
		taskInput.value = task.querySelector('p').textContent.trim();
	}
}

function clear(e) {
	e.preventDefault();
	while (taskList.firstChild) {
		taskList.removeChild(taskList.firstChild);
	}
	localStorage.removeItem('tasks');
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
		tasksHeading.textContent = 'TODO LIST';
	}

	addTaskBtn.style.backgroundColor = '#c2185b';
	addTaskBtn.value = 'Add task';

	isEditMode = false;
}

function onClickTask(e) {
	const task = e.target.parentElement.parentElement;
	// delete
	if (e.target.classList.contains('delete-btn')) {
		task.remove();
		deleteTaskFromStorage(task.querySelector('p').textContent.trim());
		checkUI();
	} else if (e.target.classList.contains('edit-btn')) {
		// edit
		isEditMode = true;

		taskList
			.querySelectorAll('li')
			.forEach((t) => t.classList.remove('edit-mode'));

		task.classList.add('edit-mode');
		addTaskBtn.style.backgroundColor = '#60c689';
		addTaskBtn.value = 'Update task';
		taskInput.value = task.querySelector('p').textContent.trim();
	} else {
		// done
	}
}

function init() {
	// Event Listeners
	taskform.addEventListener('submit', onAddTaskSubmit);
	taskList.addEventListener('click', onClickTask);
	// taskList.addEventListener('click', editTask);
	clearAll.addEventListener('click', clear);
	document.addEventListener('DOMContentLoaded', displayTasks);
	checkUI();
}

init();
