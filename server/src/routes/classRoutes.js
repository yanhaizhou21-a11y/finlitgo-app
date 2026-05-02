import express from 'express';
const router = express.Router();
import * as classController from '../controllers/classController.js';

// GET all classes
router.get('/', classController.getAllClasses);

// GET class by id
router.get('/:id', classController.getClassById);

// POST update streak and progress
router.post('/progress', classController.updateProgress);

// Admin Routes (CRUD)
router.post('/', classController.createClass);
router.put('/:id', classController.updateClass);
router.delete('/:id', classController.deleteClass);

export default router;
