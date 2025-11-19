

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

  generateLabel() {
    const labelId = 'lbl' + this.taskId;
    let lblHtml = '<label class="dropdown" id="' + labelId + '"';
    const checkedStyle = 'text-decoration: line-through; color: gray;';
    if (this.isComplete) {
      lblHtml += ' style="' + checkedStyle + '"'; 
    }
    lblHtml += '>' + this.name;
    if (!this.isComplete) {
      lblHtml += ': ' + this.rating;
    }
    lblHtml += this.generateTaskMenu() + '</label>';
    return lblHtml;
  }

  generateTaskMenu() {
    let menu = '<ul class="dropdown-content">';
    menu += '<li id="edit-' + this.taskId + '">Edit</li>'
    menu += '<li id="delete-' + this.taskId + '">Delete</li>'
    menu += '<li id="complete-' + this.taskId + '">Mark as ' + 
    (this.isComplete ? 'In Progress' : 'Complete') + '</li>';
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
    this.rating = this.isComplete ? -1 : 0;
  }
  
}