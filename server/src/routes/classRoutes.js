const express = require('express');
const router = express.Router();
const classController = require('../controllers/classController');

// GET all classes
router.get('/', classController.getAllClasses);

// GET class by id
router.get('/:id', classController.getClassById);

// POST update streak and progress
router.post('/progress', classController.updateProgress);

module.exports = router;
