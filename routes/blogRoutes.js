const express = require("express");
const router = express.Router();
const blogController = require("../controllers/blogController");

// Create a new blog
router.post("/", blogController.createBlog);

// Get all blogs
router.get("/", blogController.getAllBlogs);

// Get a single blog by ID
router.get("/:id", blogController.getBlogById);

// Update a blog by ID
router.put("/:id", blogController.updateBlog);

// Delete a blog by ID
router.delete("/:id", blogController.deleteBlog);

module.exports = router;
