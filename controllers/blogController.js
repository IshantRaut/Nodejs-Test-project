const express = require('express');
const router = express.Router();
const BlogContent = require('../models/blogContent');
const BlogComments = require('../models/blogComments');

exports.getHomePage = (req, res, next) => {
  BlogContent.findAll({ include: BlogComments })
    .then(blogPosts => {
      res.render('index', { blogPosts });
    })
    .catch(error => {
      console.error(error);
      res.status(500).send('Server Error');
    });
};

exports.createPost = (req, res, next) => {
  const { blogTitle, blogAuthor, blogContent } = req.body;

  BlogContent.create({
    title: blogTitle,
    author: blogAuthor,
    content: blogContent,
  })
    .then(newPost => {
      res.redirect('/');
    })
    .catch(error => {
      console.error(error);
      res.status(500).send('Server Error');
    });
};

exports.getBlogPost = (req, res, next) => {
  const postId = req.params.postId;

  BlogContent.findByPk(postId, { include: [BlogComments] })
    .then(blogPost => {
      if (!blogPost) {
        return res.status(404).send('Blog post not found');
      }

      res.render('blogPost', { blogPost });
    })
    .catch(error => {
      console.error(error);
      res.status(500).send('Server Error');
    });
};

exports.addComment = (req, res, next) => {
  const postId = req.params.postId;
  const { commentedBy, comment } = req.body;

  if (!comment || comment.trim() === '') {
    return res.status(400).send('Please enter a comment.');
  }

  BlogComments.create({
    blogContentId: postId,
    commentedBy: commentedBy,
    comment: comment,
  })
    .then(newComment => {
      console.log('newComment',newComment)
      newComment.save();
      res.redirect(`/`);
    })
    .catch(error => {
      console.error(error);

      if (error.name === 'SequelizeDatabaseError') {
        return res.status(500).send('Error adding comment. Please try again later.');
      }

      res.status(500).send('Server Error');
    });
};

exports.deleteComment = (req, res, next) => {
  const postId = req.params.postId;
  const commentId = req.params.commentId;

  BlogComments.destroy({ where: { id: commentId } })
    .then(() => {
      res.redirect('/');
    })
    .catch(error => {
      console.error(error);
      res.status(500).send('Server Error');
    });
};