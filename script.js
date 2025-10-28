
class Task {
  static nextId = 1;

  constructor(name) {
    this.name = name;
    this.isComplete = false;
    this.taskId = Task.nextId++;
    console.log('Created task with id ' + this.taskId);
    this.rating = 0;
  }

  completeTask() {
    this.isComplete = true;
  } 

  generateLabel() {
    const labelId = 'lbl' + this.taskId;
    const checkedStyle = 'text-decoration: line-through;';
    if (this.isComplete) {
      return '<label color="green" for="chk' + this.taskId + '" id="' + labelId + '" style="' + checkedStyle + '">' + this.name + ': ' + this.rating + '</label>';
    }
    return '<label color="blue" for="chk' + this.taskId + '" id="' + labelId + '">' + this.name + ': ' + this.rating + '</label>';
  }
  
  toggleComplete() {
    this.isComplete = !this.isComplete;
  }
  
}

function markComplete(event) {
  const labelId = event.target.id;
  const taskId = parseInt(labelId.replace('lbl', ''));
  const task = tasks.find(t => t.taskId === taskId);
  if (task) {
    task.toggleComplete();
    updateTaskList();
  }
}

function editTask(event) {
  const labelId = event.target.id;
  const taskId = parseInt(labelId.replace('lbl', ''));
  const task = tasks.find(t => t.taskId === taskId);
  if (task) {
    const newName = prompt('Edit task name:', task.name);
    if (newName !== null && newName.trim() !== '') {
      task.name = newName.trim();

      const ratingParagraph = document.getElementById('taskRating');
      if (ratingParagraph) {
        gridRating(false);
      }
      else {
        updateTaskList();
      }
    }
  }
}

function updateTaskList() {
  paragraph.innerHTML = '';
  var labels = [];
  var innie = '<ol type="1">';

  tasks.sort((a, b) => b.rating - a.rating);
  tasks.forEach(task => {
    console.log(task);
    innie += '<li>' + task.generateLabel() + '</li>';
    labels.push('lbl' + task.taskId);
  });
  innie += '</ol>';
  paragraph.innerHTML = innie;

  labels.forEach(labelId => {
    const lbl = document.getElementById(labelId);
    lbl.addEventListener('click', editTask);
  });
}

const button = document.getElementsByName('addTask')[0];
const taskIpt = document.getElementsByName('taskInput')[0];
const paragraph = document.getElementById('taskList');
var tasks = [];

button.addEventListener('click', updateButton);
taskIpt.addEventListener('keypress', function(event) {
  if (event.key === 'Enter') {
    event.preventDefault();
    updateButton();
  }
});

function updateButton() {
  tasks.push(new Task(taskIpt.value));

  updateTaskList();
  taskIpt.value = '';
}

function onClickChoose(event) {
  var lblId = event.target.id;
  var taskId = parseInt(lblId.replace('comp', ''));
  var task = tasks.find(t => t.taskId == taskId);
  task.rating += 1;
  updateTaskList();

  var comparisonParagraph = document.getElementById('taskComparison');
  comparisonParagraph.innerHTML = 'Picked ' + task.name + ' (new rating: ' + task.rating + ')';
}

const rateButton = document.getElementsByName('rateGrid')[0];
rateButton.addEventListener('click', gridRating);

var cellListeners = {};

function displayComparison(taskA, taskB) {
  const taskACell = document.getElementById('taskrow' + taskA.taskId);
  const taskBCell = document.getElementById('taskrow' + taskB.taskId);

  taskACell.style.backgroundColor = 'lightblue';
  taskBCell.style.backgroundColor = 'lightblue';

  var compareButton = document.getElementById('row' + taskA.taskId + 'col' + taskB.taskId);

  if (compareButton.value === 'Choose') {
    compareButton.value = taskA.name + ' vs ' + taskB.name;
  }

  if (cellListeners[taskACell.id]) {
    taskACell.removeEventListener('click', cellListeners[taskACell.id]);
  }
  if (cellListeners[taskBCell.id]) {
    taskBCell.removeEventListener('click', cellListeners[taskBCell.id]);
  }

  const aFunc = function() {
    chooseTask(taskACell, taskBCell, taskA, taskB, taskA);
  }
  const bFunc = function() {
    chooseTask(taskACell, taskBCell, taskA, taskB, taskB);
  }
  taskACell.addEventListener('click', aFunc);
  cellListeners[taskACell.id] = aFunc;
  taskBCell.addEventListener('click', bFunc);
  cellListeners[taskBCell.id] = bFunc;
}

function chooseTask(taskACell, taskBCell, taskA, taskB, selectedTask) {
  var compareButton = document.getElementById('row' + taskA.taskId + 'col' + taskB.taskId);
  const previousValue = compareButton.value;
  console.log('Previous value: ' + previousValue + ', selected: ' + selectedTask.name);
  
  if (previousValue != selectedTask.name) {
    selectedTask.rating += 1;

    var notSelectedTask = (selectedTask.taskId == taskA.taskId) ? taskB : taskA;
    console.log('Not selected task: ' + notSelectedTask.name);
    if (previousValue === notSelectedTask.name) {
      notSelectedTask.rating -= 1;
    }
  }
  
  compareButton.value = selectedTask.name;
  taskACell.style.backgroundColor = '';
  taskBCell.style.backgroundColor = '';
  if (cellListeners[taskACell.id]) {
    taskACell.removeEventListener('click', cellListeners[taskACell.id]);
  }
  if (cellListeners[taskBCell.id]) {
    taskBCell.removeEventListener('click', cellListeners[taskBCell.id]);
  }
  updateTaskList();
}

function compareTasks(event) {
  const cellId = event.target.id;
  const ids = cellId.match(/row(\d+)col(\d+)/);
  if (ids && ids.length === 3) {
    const row = parseInt(ids[1]);
    const col = parseInt(ids[2]);
    
    var taskA = tasks[row];
    var taskB = tasks[col];

    if (taskA && taskB) {
      displayComparison(taskA, taskB);
    }
  }
}

function displayComp(event) {
  console.log('Cell clicked: ' + event.target.id);
  const cellId = event.target.id;
  const ids = cellId.match(/row(\d+)col(\d+)/);
  const taskA = tasks.find(t => t.taskId == parseInt(ids[1]));
  const taskB = tasks.find(t => t.taskId == parseInt(ids[2]));
  console.log('Comparing tasks: ' + taskA.name + ' and ' + taskB.name);
  if (taskA && taskB) {
    displayComparison(taskA, taskB);
  }
}

function gridRating(reset = true) {
  const ratingParagraph = document.getElementById('taskRating');
  var ratingText = '<table class="rating-table">';
  var currTask = 0;
  var colTasks = {};

  tasks.forEach(task => {
    if (reset) {
      task.rating = 0;
    }
    currTask++;
    colTasks[currTask] = task;
    ratingText += '<tr id="row' + currTask + '">';
    for (var i = 1; i < currTask; i++) {
      ratingText += '<td><input type="button" class="table-button" id="row' + task.taskId + 'col' + colTasks[i].taskId + '" value="Choose" /></td>';
    }

    ratingText += '<td id="taskrow' + task.taskId + '">' + task.name + '</td></tr>';
  });
  ratingText += '</table>';
  ratingParagraph.innerHTML = ratingText;

  updateTaskList();

  for (var r = 1; r <= tasks.length; r++) {
    for (var c = 1; c < r; c++) {
      const cell = document.getElementById('row' + r + 'col' + c);
      if (cell) {
        cell.addEventListener('click', displayComp);
      }
    }
  }
}