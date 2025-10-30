/**
 * UI utility functions for task management
 */

export function markComplete(tasks, updateTaskListFn) {
  return function(event) {
    const labelId = event.target.id;
    const taskId = parseInt(labelId.replace('lbl', ''));
    const task = tasks.find(t => t.taskId === taskId);
    if (task) {
      task.toggleComplete();
      updateTaskListFn();
    }
  };
}

export function editTask(tasks, updateTaskListFn, gridRatingFn) {
  return function(event) {
    const labelId = event.target.id;
    const taskId = parseInt(labelId.replace('lbl', ''));
    const task = tasks.find(t => t.taskId === taskId);
    if (task) {
      const newName = prompt('Edit task name:', task.name);
      if (newName !== null && newName.trim() !== '') {
        task.name = newName.trim();

        const ratingParagraph = document.getElementById('taskRating');
        if (ratingParagraph) {
          gridRatingFn(false);
        }
        else {
          updateTaskListFn();
        }
      }
    }
  };
}

export function updateTaskList(tasks, paragraph, editTaskHandler) {
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
    lbl.addEventListener('click', editTaskHandler);
  });
}