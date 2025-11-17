

export class Task {
  static nextId = 1;

  constructor(name, rating = 0) {
    this.name = name;
    this.isComplete = false;
    this.taskId = Task.nextId++;
    console.log('Created task with id ' + this.taskId);
    this.rating = rating;

    this.editHandler = this.editHandler.bind(this);
    this.linkTaskMenuEvents = this.linkTaskMenuEvents.bind(this);
    this.generateLabel = this.generateLabel.bind(this);
    this.toggleComplete = this.toggleComplete.bind(this);
  }

  completeTask() {
    this.isComplete = true;
  } 

  generateLabel() {
    const labelId = 'lbl' + this.taskId;
    /*const checkedStyle = 'text-decoration: line-through;';
    if (this.isComplete) {
      return '<label color="green" for="chk' + this.taskId + '" id="' + labelId + '" style="' + checkedStyle + '">' + this.name + ': ' + this.rating + '</label>';
    }*/
    return '<label class="dropdown" id="' + labelId + '">' 
    + this.name + ': ' + this.rating + this.generateTaskMenu() +
    '</label>';
  }

  generateTaskMenu() {
    let menu = '<ul class="dropdown-content">';
    menu += '<li id="edit-' + this.taskId + '">Edit</li>'
    menu += '<li id="delete-' + this.taskId + '">Delete</li>'
    //menu += '<li id="complete-' + this.taskId + '">Mark as Complete</li>'
    menu += '</ul>';
    return menu;
  }

  editHandler() {
    const newName = prompt('Edit task name:', this.name);
    if (newName !== null && newName.trim() !== '') {
      this.name = newName.trim();
      return true;
    }
    return false;
  }

  linkTaskMenuEvents(editHandler, deleteHandler, completeHandler) {
    console.log('Linking events for task id ' + this.taskId);
    const editElement = document.getElementById('edit-' + this.taskId);
    const deleteElement = document.getElementById('delete-' + this.taskId);
    const completeElement = document.getElementById('complete-' + this.taskId);
    
    if (editElement) {
      console.log('Found edit element for task', this.taskId, '- adding click listener');
      editElement.addEventListener('click', editHandler);
      console.log('Linked edit event for task id ' + this.taskId);
    } else {
      console.log('Edit element not found for task', this.taskId);
    }
    
    if (deleteElement) {
      deleteElement.addEventListener('click', deleteHandler);
    }
    if (completeElement) {
      completeElement.addEventListener('click', completeHandler);
    }
  }

  toggleComplete() {
    this.isComplete = !this.isComplete;
  }
  
}