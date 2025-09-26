import API from "./axios";


// Get all tasks
export const getTasks = () => API.get('/tasks');

// Create task
export const createTasks = (taskData) => API.post('/tasks', taskData);

// Update task
export const updateTasks = (taskId, taskData) => API.get(`/tasks/${taskId}`, taskData);

// Delete task
export const deleteTasks = (taskId) => API.get(`/tasks/${taskId}`);