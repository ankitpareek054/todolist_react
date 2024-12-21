const API_URL = 'http://localhost:5000';

// Function to fetch and display tasks
async function fetchTasks() {
    const response = await fetch(`${API_URL}/tasks`);
    const data = await response.json();
    const taskList = document.getElementById('task-list');
    taskList.innerHTML = '';

    data.tasks.forEach((task, index) => {
        const li = document.createElement('li');
        li.textContent = task;

        // Create Delete Button
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.style.marginLeft = '10px';
        deleteButton.onclick = () => deleteTask(index);

        li.appendChild(deleteButton);
        taskList.appendChild(li);
    });
}

// Function to add a new task
async function addTask(event) {
    event.preventDefault();
    const taskInput = document.getElementById('task-input');
    const task = taskInput.value;

    if (!task) return;

    await fetch(`${API_URL}/tasks`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ task }),
    });

    taskInput.value = '';
    fetchTasks();
}

// Function to delete a task
async function deleteTask(index) {
    await fetch(`${API_URL}/tasks/${index}`, {
        method: 'DELETE',
    });
    fetchTasks();
}

// Event listener for form submission
document.getElementById('task-form').addEventListener('submit', addTask);

// Initial fetch of tasks
fetchTasks();
