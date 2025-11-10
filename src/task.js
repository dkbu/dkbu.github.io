export class Task {
  static nextId = 1;

  constructor(name, rating = 0) {
    this.name = name;
    this.isComplete = false;
    this.taskId = Task.nextId++;
    console.log('Created task with id ' + this.taskId);
    this.rating = rating;
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