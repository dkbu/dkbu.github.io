/**
 * UI utility functions for task management
 */

export function markComplete(tasks, updateTaskListFn, gridRatingFn) {
  return function(event) {
    const labelId = event.target.id;
    const taskId = parseInt(labelId.replace('complete-', ''));
    const task = tasks.find(t => t.taskId === taskId);
    if (task) {
      task.toggleComplete();
      updateTaskListFn();
      gridRatingFn();
    }
  };
}

export function editTask(tasks, updateTaskListFn, gridRatingFn) {
  console.log('Creating editTask handler');
  return function(event) {
    if (!event || !event.target) {
      console.log('Invalid event in editTask handler');
      return;
    }
    
    let taskId;
    const targetId = event.target.id;
    console.log('editTask event for element id: ' + targetId);
    
    // Handle both label clicks (lbl) and menu item clicks (edit-)
    if (targetId.startsWith('lbl')) {
      taskId = parseInt(targetId.replace('lbl', ''));
    } else if (targetId.startsWith('edit-')) {
      taskId = parseInt(targetId.replace('edit-', ''));
    } else {
      console.log('Unknown element clicked:', targetId);
      return;
    }
    
    const task = tasks.find(t => t.taskId === taskId);
    if (task) {
      console.log('Found task to edit:', task.name);
      if (task.editHandler()) {
        console.log('Task edited successfully');
        const ratingParagraph = document.getElementById('taskRating');
        if (ratingParagraph && ratingParagraph.innerHTML.trim() !== '') {
          gridRatingFn(false);
        } else {
          updateTaskListFn();
        }
      }
    } else {
      console.log('Task not found for ID:', taskId);
    }
  };
}

export function deleteTask(tasks, updateTaskListFn, gridRatingFn) {
  return function(event) {
    const labelId = event.target.id;
    console.log('deleteTask event for element id: ' + labelId);

    let taskId = null;
    if (labelId.startsWith('delete-')) {
      taskId = parseInt(labelId.replace('delete-', ''));
    }
    else if (labelId.startsWith('lbl')) {
      taskId = parseInt(labelId.replace('lbl', ''));
    }
    if (taskId !== null) {
      const taskIndex = tasks.findIndex(t => t.taskId === taskId);
      if (taskIndex !== -1) {
        tasks.splice(taskIndex, 1);
        updateTaskListFn();
        gridRatingFn();
      }
    }
  };
}

export function updateTaskList(tasks, paragraph, editTaskHandler, deleteTaskHandler, markCompleteHandler) {
  paragraph.innerHTML = '';
  var labels = [];
  var innie = '<ol type="1">';

  tasks.sort((a, b) => b.rating - a.rating);
  tasks.forEach(task => {
    console.log(task);
    innie += '<li class="drop-container">' + task.generateLabel() + '</li>';
  });
  innie += '</ol>';
  paragraph.innerHTML = innie;

  tasks.forEach(task => {
    console.log('Setting up events for task:', task.taskId);
    task.linkTaskMenuEvents(editTaskHandler, deleteTaskHandler, markCompleteHandler);
  });
}