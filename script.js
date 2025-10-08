
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
    lbl.addEventListener('click', markComplete);
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

function displayComparison(taskA, taskB) {
  const comparisonParagraph = document.getElementById('taskComparison');
  comparisonParagraph.innerHTML = '';
  var innie = '<label id="comp' + taskA.taskId + '">' + taskA.name + '</label> vs <label id="comp' + taskB.taskId + '">' + taskB.name + '</label>';
  comparisonParagraph.innerHTML = innie;

  const labelA = document.getElementById('comp' + taskA.taskId);
  const labelB = document.getElementById('comp' + taskB.taskId);
  labelA.addEventListener('click', onClickChoose);
  labelB.addEventListener('click', onClickChoose);

  var compareButton = document.getElementById('row' + taskA.taskId + 'col' + taskB.taskId);
  compareButton.disabled = true;
  compareButton.value = 'Picked';
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

function gridRating() {
  const ratingParagraph = document.getElementById('taskRating');
  var ratingText = '<table border="1">';
  var currTask = 0;
  var colTasks = {};

  tasks.forEach(task => {
    task.rating = 0;
    currTask++;
    colTasks[currTask] = task;
    ratingText += '<tr id="row' + currTask + '">';
    for (var i = 1; i < currTask; i++) {
      ratingText += '<td><input type="button" id="row' + task.taskId + 'col' + colTasks[i].taskId + '" value="Choose" /></td>';
    }
    
    ratingText += '<td>' + task.name + '</td></tr>';
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