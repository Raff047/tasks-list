import '../styles/modern-normalize.css';
import '../styles/style.css';

const nameInput = document.getElementById('name');
const taskform = document.getElementById('todo-form');
const taskInput = document.getElementById('todo-input');
const taskList = document.getElementById('task-list');
const clearAll = document.getElementById('clear');
const addTaskBtn = taskform.querySelector('.header__add-btn');
let isEditMode = false;

function displayName() {
	const username = localStorage.getItem('username');
	nameInput.value = username;

	nameInput.addEventListener('change', (e) => {
		localStorage.setItem('username', e.target.value);
	});
}

function displayTasks() {
	const tasksFromStorage = getTasksFromStorage();

	tasksFromStorage.forEach((task) => addTaskToDOM(task.task, task.category));

	displayName();
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
		const category = taskToEdit.querySelector('.icon').classList[1];
		deleteTaskFromStorage(
			taskToEdit.querySelector('label').textContent.trim(),
			category
		);

		taskToEdit.classList.remove('edit-mode');
		taskToEdit.remove();
		isEditMode = false;
	}

	// Get the selected category
	const selectedRadio = document.querySelector(
		'input[name="category"]:checked'
	);
	const selectedCategory = selectedRadio ? selectedRadio.value : '';

	if (selectedCategory === '') {
		alert('Please select a category.');
		return;
	}

	addTaskToDOM(newTask, selectedCategory);
	addTaskToStorage(newTask, selectedCategory);

	checkUI();
	taskInput.value = '';
}

function addTaskToDOM(task, category) {
	// create a task
	const li = document.createElement('li');
	li.className = 'task-list__item';
	const label = createLabel();
	const checkbox = createCheckbox();
	const span = createSpan('icon');
	const div = createDiv('control-btns');

	label.append(checkbox, span, document.createTextNode(' ' + task));

	// Add category icon
	span.classList.add(category);

	const editBtn = createBTn('btn edit-btn');
	editBtn.appendChild(document.createTextNode('Edit'));
	const deleteBtn = createBTn('btn delete-btn');
	deleteBtn.appendChild(document.createTextNode('Delete'));

	div.append(editBtn, deleteBtn);

	li.append(label, div);

	taskList.appendChild(li);
}

function addTaskToStorage(task, category) {
	const tasksFromStorage = getTasksFromStorage();

	tasksFromStorage.push({ task, category });

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

function createLabel() {
	const label = document.createElement('label');
	return label;
}

function createCheckbox() {
	const checkbox = document.createElement('input');
	checkbox.type = 'checkbox';
	return checkbox;
}

function createSpan(classes) {
	const span = document.createElement('span');
	span.classList.add(classes);
	return span;
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

function deleteTaskFromStorage(taskText, category) {
	let tasksFromStorage = getTasksFromStorage();

	tasksFromStorage = tasksFromStorage.filter(
		(task) => task.task !== taskText || task.category !== category
	);

	localStorage.setItem('tasks', JSON.stringify(tasksFromStorage));
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
	const taskTextContent = task.querySelector('label').textContent.trim();
	const category = task.querySelector('.icon').classList[1];
	// delete
	if (e.target.classList.contains('delete-btn')) {
		deleteTaskFromStorage(taskTextContent.trim(), category);
		task.remove();
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
		taskInput.value = taskTextContent;
	} else {
		// done
	}
}

function init() {
	// Event Listeners
	taskform.addEventListener('submit', onAddTaskSubmit);
	taskList.addEventListener('click', onClickTask);
	clearAll.addEventListener('click', clear);
	document.addEventListener('DOMContentLoaded', displayTasks);
	checkUI();
}

init();
