import { Task } from './task.js'; 

export function saveData(tasks) {
    console.log('Saving data...');
    const data = tasks.map(task => ({
    name: task.name,
    rating: task.rating
    }));

    var file = new Blob([JSON.stringify(data)], {type: 'application/json'});
    const a = document.getElementById('savedData');
    a.innerHTML = 'Download saved tasks';
    a.href = URL.createObjectURL(file);
    a.download = 'taskData.json';
    a.textContent = 'Download saved tasks';
}

export function handleFileSelect(event, tasks, updateTaskList, gridRating) {
    const file = event.target.files[0];
    if (!file) {
        return;
    }
    const reader = new FileReader();
    reader.onload = function(e) {
        const contents = e.target.result;
        const data = JSON.parse(contents);
        tasks.length = 0; // Clear existing tasks
        data.forEach(item => {
            tasks.push(new Task(item.name, item.rating));
        });
        updateTaskList();
        gridRating();
    };
    reader.readAsText(file);
}