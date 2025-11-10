/**
 * Main application module - handles initialization and event binding
 */

import { Task } from './task.js'; 
import { markComplete, editTask, updateTaskList } from './ui-utils.js';
import { gridRating } from './rating.js';
import { saveData } from './save-load.js';

// Application state
var tasks = [];

// DOM elements
const button = document.getElementsByName('addTask')[0];
const taskIpt = document.getElementsByName('taskInput')[0];
const paragraph = document.getElementById('taskList');
const rateButton = document.getElementsByName('rateGrid')[0];
const saveButton = document.getElementById('saveData');
const loadButton = document.getElementById('loadData');



// Create bound functions with dependencies
const updateTaskListBound = () => updateTaskList(tasks, paragraph, editTaskBound);
const gridRatingBound = (reset = true) => gridRating(tasks, updateTaskListBound, reset);
const editTaskBound = editTask(tasks, updateTaskListBound, gridRatingBound);
const markCompleteBound = markComplete(tasks, updateTaskListBound);
const saveDataBound = () => saveData(tasks);

// Event handlers
function updateButton() {
  tasks.push(new Task(taskIpt.value));
  updateTaskListBound();
  taskIpt.value = '';
}

// Event bindings
button.addEventListener('click', updateButton);
taskIpt.addEventListener('keypress', function(event) {
  if (event.key === 'Enter') {
    event.preventDefault();
    updateButton();
  }
});

rateButton.addEventListener('click', gridRatingBound);
saveButton.addEventListener('click', saveDataBound);
