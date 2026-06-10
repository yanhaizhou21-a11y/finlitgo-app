import express from 'express';
const router = express.Router();
import * as classController from '../controllers/classController.js';
import { requireSupabaseAuth, requireAdmin } from '../middleware/supabaseAuthMiddleware.js';

// GET all classes (public)
router.get('/', classController.getAllClasses);

// GET class by id (public)
router.get('/:id', classController.getClassById);

// POST update streak and progress (authenticated user)
router.post('/progress', requireSupabaseAuth, classController.updateProgress);

// Admin Routes (CRUD) — require auth + admin role
router.post('/', requireSupabaseAuth, requireAdmin, classController.createClass);
router.put('/:id', requireSupabaseAuth, requireAdmin, classController.updateClass);
router.delete('/:id', requireSupabaseAuth, requireAdmin, classController.deleteClass);

export default router;
