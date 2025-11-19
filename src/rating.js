/**
 * Rating system functionality for task comparison
 */

var cellListeners = {};

export function onClickChoose(tasks, updateTaskListFn) {
  return function(event) {
    var lblId = event.target.id;
    var taskId = parseInt(lblId.replace('comp', ''));
    var task = tasks.find(t => t.taskId == taskId);
    task.rating += 1;
    updateTaskListFn();

    var comparisonParagraph = document.getElementById('taskComparison');
    comparisonParagraph.innerHTML = 'Picked ' + task.name + ' (new rating: ' + task.rating + ')';
  };
}

export function displayComparison(taskA, taskB, tasks, updateTaskListFn) {
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
    chooseTask(taskACell, taskBCell, taskA, taskB, taskA, updateTaskListFn);
  }
  const bFunc = function() {
    chooseTask(taskACell, taskBCell, taskA, taskB, taskB, updateTaskListFn);
  }
  taskACell.addEventListener('click', aFunc);
  cellListeners[taskACell.id] = aFunc;
  taskBCell.addEventListener('click', bFunc);
  cellListeners[taskBCell.id] = bFunc;
}

export function chooseTask(taskACell, taskBCell, taskA, taskB, selectedTask, updateTaskListFn) {
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
  compareButton.classList.add('picked_table_button');
  taskACell.style.backgroundColor = '';
  taskBCell.style.backgroundColor = '';
  if (cellListeners[taskACell.id]) {
    taskACell.removeEventListener('click', cellListeners[taskACell.id]);
  }
  if (cellListeners[taskBCell.id]) {
    taskBCell.removeEventListener('click', cellListeners[taskBCell.id]);
  }
  updateTaskListFn();
}

export function compareTasks(tasks, updateTaskListFn) {
  return function(event) {
    const cellId = event.target.id;
    const ids = cellId.match(/row(\d+)col(\d+)/);
    if (ids && ids.length === 3) {
      const row = parseInt(ids[1]);
      const col = parseInt(ids[2]);
      
      var taskA = tasks[row];
      var taskB = tasks[col];

      if (taskA && taskB) {
        displayComparison(taskA, taskB, tasks, updateTaskListFn);
      }
    }
  };
}

export function displayComp(tasks, updateTaskListFn) {
  return function(event) {
    console.log('Cell clicked: ' + event.target.id);
    const cellId = event.target.id;
    const ids = cellId.match(/row(\d+)col(\d+)/);
    const taskA = tasks.find(t => t.taskId == parseInt(ids[1]));
    const taskB = tasks.find(t => t.taskId == parseInt(ids[2]));
    console.log('Comparing tasks: ' + taskA.name + ' and ' + taskB.name);
    if (taskA && taskB) {
      displayComparison(taskA, taskB, tasks, updateTaskListFn);
    }
  };
}

export function gridRating(tasks, updateTaskListFn, reset = true) {
  const ratingParagraph = document.getElementById('taskRating');
  var ratingText = '<table class="rating-table">';
  var currTask = 0;
  var colTasks = {};

  tasks.forEach(task => {
    if (task.isComplete) {
      return;
    }
    if (reset) {
      task.rating = 0;
    }
    currTask++;
    colTasks[currTask] = task;
    ratingText += '<tr id="row' + task.taskId + '">';
    for (var i = 1; i < currTask; i++) {
      ratingText += '<td><input type="button" class="table-button rating-table-text" id="row' + task.taskId + 'col' + colTasks[i].taskId + '" value="Choose" /></td>';
    }

    ratingText += '<td class="rating-table-text" id="taskrow' + task.taskId + '">' + task.name + '</td></tr>';
  });
  ratingText += '</table>';
  ratingParagraph.innerHTML = ratingText;

  updateTaskListFn();

  const displayCompHandler = displayComp(tasks, updateTaskListFn);

  const cells = document.getElementsByClassName('table-button');
  Array.from(cells).forEach(cell => {
    cell.addEventListener('click', displayCompHandler);
  });
}