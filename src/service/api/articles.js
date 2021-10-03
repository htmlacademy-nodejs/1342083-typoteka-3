'use strict';

const {Router} = require(`express`);
const {HttpStatusCode} = require(`../../constants`);
const {
  articleExist,
  articleValidator,
  commentExist,
  commentValidator,
} = require(`../middleware`);

const URL = `/articles`;

module.exports = (app, articleService, commentService) => {
  const route = new Router();
  app.use(URL, route);

  route.get(`/`, (req, res) => {
    const articles = articleService.findAll();
    res.status(HttpStatusCode.OK).json(articles);
  });

  route.get(`/:articleId`, articleExist(articleService), (req, res) => {
    const {article} = res.locals;
    res.status(HttpStatusCode.OK).json(article);
  });

  route.get(`/:articleId/comments`, articleExist(articleService), (req, res) => {
    const {article} = res.locals;
    const comments = commentService.findAll(article);
    res.status(HttpStatusCode.OK).json(comments);
  });

  route.get(`/:articleId/comments/:commentId`, [articleExist(articleService), commentExist(commentService)], (req, res) => {
    const {comment} = res.locals;
    res.status(HttpStatusCode.OK).json(comment);
  });

  route.post(`/`, articleValidator, (req, res) => {
    const newArticle = articleService.create(req.body);
    res.status(HttpStatusCode.OK).json(newArticle);
  });

  route.post(`/:articleId/comments`, [articleExist(articleService), commentValidator], (req, res) => {
    const {article} = res.locals;
    const comment = req.body;
    const newComment = commentService.create(article, comment);
    return res.status(HttpStatusCode.OK).json(newComment);
  });

  route.put(`/:articleId`, [articleExist(articleService), articleValidator], (req, res) => {
    const {article} = res.locals;
    const updatedArticle = articleService.update(article.id, req.body);
    res.status(HttpStatusCode.OK).json(updatedArticle);
  });

  const updateCommentMiddlewares = [articleExist(articleService), commentExist(commentService), commentValidator];

  route.put(`/:articleId/comments/:commentId`, updateCommentMiddlewares, (req, res) => {
    const {article, comment} = res.locals;
    const update = req.body;
    const updatedComment = commentService.update(article, comment.id, update);
    return res.status(HttpStatusCode.OK).json(updatedComment);
  });

  route.delete(`/:articleId`, articleExist(articleService), (req, res) => {
    const {article} = res.locals;
    const deletedArticle = articleService.drop(article.id);
    res.status(HttpStatusCode.OK).json(deletedArticle);
  });

  route.delete(`/:articleId/comments/:commentId`, [articleExist(articleService), commentExist(commentService)], (req, res) => {
    const {article, comment} = res.locals;
    const deletedComment = commentService.drop(article, comment.id);
    res.status(HttpStatusCode.OK).json(deletedComment);
  });
};
