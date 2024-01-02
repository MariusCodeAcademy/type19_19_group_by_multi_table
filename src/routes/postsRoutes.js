const express = require('express');

const postRouter = express.Router();

// GET /api/posts/1 - grazina viena posta
postRouter.get('/api/posts/:postId', async (req, res) => {
  res.json('grazina viena posta');
});

// GET /api/posts - grazina visus postus

module.exports = postRouter;
