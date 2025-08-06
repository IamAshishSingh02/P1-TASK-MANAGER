const express = require('express');
const Task = require('../models/Task');
const auth = require('../middleware/authMiddleware');

const router = express.Router();

// Get all tasks for user
router.get('/', auth, async (req, res) => {
  const tasks = await Task.find({ userId: req.user });
  res.json(tasks);
});

// Add new task
router.post('/', auth, async (req, res) => {
  const newTask = new Task({ ...req.body, userId: req.user });
  await newTask.save();
  res.json(newTask);
});

// Update task
router.put('/:id', auth, async (req, res) => {
  const updatedTask = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updatedTask);
});

// Delete task
router.delete('/:id', auth, async (req, res) => {
  await Task.findByIdAndDelete(req.params.id);
  res.json({ message: 'Task deleted' });
});

module.exports = router;