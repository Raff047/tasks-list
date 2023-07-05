import '../styles/modern-normalize.css';
import '../styles/style.css';

// global scope variables (accessible to funtions)
const taskform = document.getElementById('todo-form');
const taskInput = document.getElementById('todo-input');
const taskList = document.getElementById('task-list');

function addTask(e) {
	e.preventDefault();

	// validate input
	if (taskInput.value === '') {
		alert('Please add a task.');
		return;
	}
	console.log('success');
}

// Event Listeners
taskform.addEventListener('submit', addTask);
