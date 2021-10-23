'use strict';

const {Router} = require(`express`);
const {APIUrl, HttpStatusCode} = require(`../../constants`);
const {
  articleExist,
  articleValidator,
  commentExist,
  commentValidator,
} = require(`../middleware`);

module.exports = (app, articleService, commentService) => {
  const route = new Router();
  app.use(APIUrl.ARTICLES, route);

  route.get(`/`, async (req, res) => {
    const {limit} = req.query;
    const articles = await articleService.findAll(limit);
    res.status(HttpStatusCode.OK).json(articles);
  });

  route.get(`/popular`, async (req, res) => {
    const {limit} = req.query;
    const articles = await articleService.findAllPopular(limit);
    res.status(HttpStatusCode.OK).json(articles);
  });

  route.get(`/comments`, async (req, res) => {
    const {limit} = req.query;
    const comments = await commentService.findAll(limit);
    res.status(HttpStatusCode.OK).json(comments);
  });

  route.get(`/:articleId`, articleExist(articleService), (req, res) => {
    const {article} = res.locals;
    res.status(HttpStatusCode.OK).json(article);
  });

  route.get(`/:articleId/comments`, articleExist(articleService), async (req, res) => {
    const {id} = res.locals;
    const comments = await commentService.findAllByArticle(id);
    res.status(HttpStatusCode.OK).json(comments);
  });

  route.get(`/:articleId/comments/:commentId`, [articleExist(articleService), commentExist(commentService)], (req, res) => {
    const {comment} = res.locals;
    res.status(HttpStatusCode.OK).json(comment);
  });

  route.post(`/`, articleValidator, async (req, res) => {
    const newArticle = await articleService.create(req.body);
    res.status(HttpStatusCode.OK).json(newArticle);
  });

  route.post(`/:articleId/comments`, [articleExist(articleService), commentValidator], async (req, res) => {
    const {article} = res.locals;
    const comment = req.body;
    const newComment = await commentService.create(article, comment);
    return res.status(HttpStatusCode.OK).json(newComment);
  });

  route.put(`/:articleId`, [articleExist(articleService), articleValidator], async (req, res) => {
    const {article} = res.locals;
    const updatedArticle = await articleService.update(article.id, req.body);
    res.status(HttpStatusCode.OK).json(updatedArticle);
  });

  const updateCommentMiddlewares = [articleExist(articleService), commentExist(commentService), commentValidator];

  route.put(`/:articleId/comments/:commentId`, updateCommentMiddlewares, async (req, res) => {
    const {article, comment} = res.locals;
    const update = req.body;
    const updatedComment = await commentService.update(article, comment.id, update);
    return res.status(HttpStatusCode.OK).json(updatedComment);
  });

  route.delete(`/:articleId`, articleExist(articleService), async (req, res) => {
    const {article} = res.locals;
    const deletedArticle = await articleService.drop(article.id);
    res.status(HttpStatusCode.OK).json(deletedArticle);
  });

  route.delete(`/:articleId/comments/:commentId`, [articleExist(articleService), commentExist(commentService)], async (req, res) => {
    const {article, comment} = res.locals;
    const deletedComment = await commentService.drop(article, comment.id);
    res.status(HttpStatusCode.OK).json(deletedComment);
  });
};
