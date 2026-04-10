const express = require('express');
const router = express.Router();
const blogController = require('../controllers/blogController');

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

module.exports = router;
