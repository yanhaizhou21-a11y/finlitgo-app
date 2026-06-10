import express from 'express';
const router = express.Router();
import * as blogController from '../controllers/blogController.js';
import { requireSupabaseAuth, requireAdmin } from '../middleware/supabaseAuthMiddleware.js';

// GET all blogs (public)
router.get('/', blogController.getAllBlogs);

// GET single blog by ID (public)
router.get('/:id', blogController.getBlogById);

// Mutation routes — require auth + admin role
router.post('/', requireSupabaseAuth, requireAdmin, blogController.createBlog);
router.put('/:id', requireSupabaseAuth, requireAdmin, blogController.updateBlog);
router.delete('/:id', requireSupabaseAuth, requireAdmin, blogController.deleteBlog);

export default router;
