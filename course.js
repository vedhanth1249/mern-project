const express = require('express');
const router = express.Router();
const Course = require('../models/Course');

// Create a new course
router.post('/', async (req, res) => {
  try {
    const course = new Course(req.body);
    await course.save();
    res.status(201).json(course);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get all courses
router.get('/', async (req, res) => {
  try {
    const courses = await Course.find(); 
    res.json(courses);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update a course by ID
router.put('/:id', async (req, res) => {
  try {
    const updated = await Course.findByIdAndUpdate(
      req.params.id,         
      req.body,
      { new: true }
    );
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Delete a course by ID
router.delete('/:id', async (req, res) => {
  try {
    await Course.findByIdAndDelete(req.params.id); // ✅ Fixed: findByIdDelete → findByIdAndDelete
    res.json({ message: 'Deleted successfully' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;