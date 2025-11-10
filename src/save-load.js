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


