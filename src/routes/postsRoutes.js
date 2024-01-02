const express = require('express');
const { dbQueryWithData } = require('../helper');

const postRouter = express.Router();

// GET /api/posts/1 - grazina viena posta
postRouter.get('/posts/:postId', async (req, res) => {
  const postId = +req.params.postId;
  const sql = 'SELECT * FROM posts WHERE post_id=?';
  const [rows, error] = await dbQueryWithData(sql, [postId]);

  console.log('error ===', error);

  if (rows.length === 1) {
    res.json(rows[0]);
    return;
  }
  if (rows.length === 0) {
    res.status(400).json({ msg: 'Post not found' });
    return;
  }
  res.status(400).json(rows);
});

// GET /api/posts - grazina visus postus
postRouter.get('/posts', async (req, res) => {
  // const sql = 'SELECT * FROM posts';
  const sql = `
  SELECT posts.post_id, posts.title, posts.author, posts.date, posts.body, COUNT(post_comments.comm_id) AS comment_count
  FROM posts
  LEFT JOIN post_comments
  ON posts.post_id=post_comments.post_id
  GROUP BY posts.title
  `;
  const [rows, error] = await dbQueryWithData(sql);

  console.log('error ===', error);

  if (rows?.length > 0) {
    res.json(rows);
    return;
  }
  res.status(500).json(rows);
});

module.exports = postRouter;
