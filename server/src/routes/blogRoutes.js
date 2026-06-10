import express from 'express';
const router = express.Router();
import * as blogController from '../controllers/blogController.js';

// GET all blogs
router.get('/', blogController.getAllBlogs);

// GET single blog by ID
router.get('/:id', blogController.getBlogById);

// POST new blog
router.post('/', blogController.createBlog);

// PUT update blog
router.put('/:id', blogController.updateBlog);

// DELETE blog
router.delete('/:id', blogController.deleteBlog);

export default router;
