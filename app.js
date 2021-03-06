const express = require('express');
const { sendArticles, sendArticlesById, patchArticle } = require('./controllers/articles')
const { sendTopics } = require('./controllers/topics')
const { sendCommentsById, publishCommentById, deleteCommentById } = require('./controllers/comments')
const { sendUsers } = require('./controllers/users')
const { getEndpoints } = require('./controllers/api');

const app = express();

app.use(express.json());


app.get('/api', getEndpoints)

app.get('/api/topics', sendTopics);

app.get('/api/articles', sendArticles);

app.get('/api/articles/:article_id', sendArticlesById);

app.get('/api/articles/:article_id/comments', sendCommentsById);

app.get('/api/users', sendUsers);

app.patch('/api/articles/:article_id', patchArticle);

app.post('/api/articles/:article_id/comments', publishCommentById)

app.delete('/api/comments/:comment_id', deleteCommentById)

////////////////////
// Error handling //
///////////////////


app.use((err, req, res, next) => {
  if (err.status !== undefined) {
    res.status(err.status).send({ message: err.message })
  }
  res.status(400).send({ message: 'bad request' });
  next(err)
});

app.use((err, req, res, next) => {
  // console.log(err)
  res.status(500).send({ message: 'server error' });
  next(err)
})

app.all('/*', (req, res) => {
  res.status(404).send({ message: 'not found' });
});


module.exports = app;
