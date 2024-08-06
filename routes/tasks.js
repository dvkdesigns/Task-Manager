// routes/tasks.js

const express = require("express");
const router = express.Router();
const Task = require("../models/Task");

// @route   POST /api/tasks
// @desc    Create a task
router.post("/", async (req, res) => {
  const { title, description, completed } = req.body;

  try {
    const newTask = new Task({
      title,
      description,
      completed,
    });

    const task = await newTask.save();
    res.json(task);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route   GET /api/tasks
// @desc    Get all tasks
router.get("/", async (req, res) => {
  try {
    const tasks = await Task.find();
    res.json(tasks);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route   PUT /api/tasks/:id
// @desc    Update a task
router.put("/:id", async (req, res) => {
  const { title, description, completed } = req.body;

  try {
    let task = await Task.findById(req.params.id);

    if (!task) return res.status(404).json({ msg: "Task not found" });

    task.title = title;
    task.description = description;
    task.completed = completed;

    task = await Task.findByIdAndUpdate(
      req.params.id,
      { $set: task },
      { new: true }
    );

    res.json(task);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route   DELETE /api/tasks/:id
// @desc    Delete a task
router.delete("/:id", async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) return res.status(404).json({ msg: "Task not found" });

    await Task.findByIdAndDelete(req.params.id);

    res.json({ msg: "Task removed" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
