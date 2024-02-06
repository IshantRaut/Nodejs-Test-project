const express = require('express');
const router = express.Router();

// Import the controllers
const blogController = require('../controllers/blogController');

router.get('/', blogController.getHomePage);

router.post('/create-post', blogController.createPost);

router.get('/blog/:postId', blogController.getBlogPost);

router.post('/blog/:postId/add-comment', blogController.addComment);

router.delete('/blog/:postId/comment/:commentId', blogController.deleteComment);

module.exports = router;
