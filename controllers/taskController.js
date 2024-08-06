// controllers/taskController.js

const Task = require("../models/Task");

const getTasks = async (req, res) => {
  try {
    const tasks = await Task.find();
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
};

const createTask = async (req, res) => {
  const { title, description, dueDate } = req.body;

  try {
    const newTask = new Task({
      title,
      description,
      dueDate,
    });

    const task = await newTask.save();
    res.json(task);
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
};

const updateTask = async (req, res) => {
  const { id } = req.params;
  const { title, description, completed, dueDate } = req.body;

  try {
    let task = await Task.findById(id);

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    task.title = title || task.title;
    task.description = description || task.description;
    task.completed = completed || task.completed;
    task.dueDate = dueDate || task.dueDate;

    await task.save();
    res.json(task);
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
};

const deleteTask = async (req, res) => {
  const { id } = req.params;

  try {
    const task = await Task.findById(id);

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    await task.remove();
    res.json({ message: "Task removed" });
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
};

module.exports = {
  getTasks,
  createTask,
  updateTask,
  deleteTask,
};
