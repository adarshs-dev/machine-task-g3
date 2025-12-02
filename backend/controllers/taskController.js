import Task from "../models/Task.js";
import path from "path";

// Create task
export const createTask = async (req, res) => {
  const { title, dueDate, status } = req.body;
  if (!title || !dueDate)
    return res.status(400).json({ message: "Title and dueDate are required" });
  const taskData = {
    user: req.user._id,
    title,
    dueDate: new Date(dueDate),
    status: status || "todo",
  };
  if (req.file) {
    taskData.attachment = path.join(
      process.env.UPLOADS_DIR || "uploads",
      req.file.filename
    );
  }
  const task = await Task.create(taskData);
  res.status(201).json(task);
};

// Get tasks for logged-in user
export const getTasks = async (req, res) => {
  // Simple list — could add pagination/filters as bonus
  const tasks = await Task.find({ user: req.user._id }).sort({ createdAt: -1 });
  res.json(tasks);
};

// Update task
export const updateTask = async (req, res) => {
  const { id } = req.params;
  const task = await Task.findById(id);
  if (!task) return res.status(404).json({ message: "Task not found" });
  if (task.user.toString() !== req.user._id.toString())
    return res.status(401).json({ message: "Not authorized" });

  const { title, dueDate, status } = req.body;
  if (title !== undefined) task.title = title;
  if (dueDate !== undefined) task.dueDate = new Date(dueDate);
  if (status !== undefined) task.status = status;

  if (req.file) {
    // replace attachment
    task.attachment = path.join(
      process.env.UPLOADS_DIR || "uploads",
      req.file.filename
    );
  }

  const updated = await task.save();
  res.json(updated);
};

// Delete task
export const deleteTask = async (req, res) => {
  const { id } = req.params;
  const task = await Task.findById(id);
  if (!task) return res.status(404).json({ message: "Task not found" });
  if (task.user.toString() !== req.user._id.toString())
    return res.status(401).json({ message: "Not authorized" });
  await Task.deleteOne({ _id: id });
  res.json({ message: "Task removed" });
};
