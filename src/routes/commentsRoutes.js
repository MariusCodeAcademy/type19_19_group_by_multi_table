// susikurti routeri
const express = require('express');
const { dbQueryWithData } = require('../helper');

const commentsRouter = express.Router();
// export import

// GET /api/comments/post/1 - grazina visus komentarus kurie yra parayti po to postu kurio id yra 1
commentsRouter.get('/comments/post/:postId', async (req, res) => {
  const postId = +req.params.postId;
  const sql = 'SELECT * FROM post_comments WHERE post_id=?';
  const [rows, error] = await dbQueryWithData(sql, [postId]);

  console.log('error ===', error);

  if (rows?.length > 0) {
    res.json(rows);
    return;
  }
  if (rows?.length === 0) {
    res.status(400).json({ msg: 'no comments found' });
    return;
  }
  res.status(400).json(rows);
});

// POST /api/comments/post/1 - sukurs nauja komentara po pirmu postu

// GET /api/comments/1 - grazina visus komentarus

module.exports = commentsRouter;
