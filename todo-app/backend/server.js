const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// In-memory task storage
let tasks = [];

// Root Route
app.get('/', (req, res) => {
    res.send('Welcome to the To-Do App API');
});

// POST route to add tasks
app.post('/tasks', (req, res) => {
    const { task } = req.body;
    if (!task) {
        return res.status(400).json({ error: 'Task is required' });
    }
    tasks.push(task);
    res.status(201).json({ message: 'Task added', tasks });
});

// DELETE route to remove a task by its index
app.delete('/tasks/:index', (req, res) => {
    const { index } = req.params;

    if (index < 0 || index >= tasks.length) {
        return res.status(400).json({ error: 'Invalid task index' });
    }

    tasks.splice(index, 1); // Remove the task from the array
    res.status(200).json({ message: 'Task deleted', tasks });
});


// GET route to fetch tasks
app.get('/tasks', (req, res) => {
    res.status(200).json({ tasks });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
