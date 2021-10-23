'use strict';

const {Router} = require(`express`);
const {
  ApiUrl,
  ApiArticlesRoute,
  HttpStatusCode,
  ArticleKey,
  CommentKey,
} = require(`../../common/enums`);
const {
  articleExist,
  articleValidator,
  commentExist,
  commentValidator,
} = require(`../middleware`);

module.exports = (app, articleService, commentService) => {
  const route = new Router();
  app.use(ApiUrl.ARTICLES, route);

  route.get(ApiArticlesRoute.MAIN, async (req, res) => {
    const {limit} = req.query;
    const articles = await articleService.findAll(limit);
    res.status(HttpStatusCode.OK).json(articles);
  });

  route.post(ApiArticlesRoute.MAIN, articleValidator, async (req, res) => {
    const newArticle = await articleService.create(req.body);
    res.status(HttpStatusCode.OK).json(newArticle);
  });

  route.get(ApiArticlesRoute.POPULAR, async (req, res) => {
    const {limit} = req.query;
    const articles = await articleService.findAllPopular(limit);
    res.status(HttpStatusCode.OK).json(articles);
  });

  route.get(ApiArticlesRoute.COMMENTS, async (req, res) => {
    const {limit} = req.query;
    const comments = await commentService.findAll(limit);
    res.status(HttpStatusCode.OK).json(comments);
  });

  route.get(ApiArticlesRoute.$ARTICLE, articleExist(articleService), (_req, res) => {
    const {article} = res.locals;
    res.status(HttpStatusCode.OK).json(article);
  });

  route.put(ApiArticlesRoute.$ARTICLE, [articleExist(articleService), articleValidator], async (req, res) => {
    const {article} = res.locals;
    const updatedArticle = await articleService.update(article[ArticleKey.ID], req.body);
    res.status(HttpStatusCode.OK).json(updatedArticle);
  });

  route.delete(ApiArticlesRoute.$ARTICLE, articleExist(articleService), async (_req, res) => {
    const {article} = res.locals;
    const deletedArticle = await articleService.drop(article[ArticleKey.ID]);
    res.status(HttpStatusCode.OK).json(deletedArticle);
  });

  route.get(ApiArticlesRoute.$ARTICLE_COMMENTS, articleExist(articleService), async (_req, res) => {
    const {article} = res.locals;
    const comments = await commentService.findAllByArticle(article[ArticleKey.ID]);
    res.status(HttpStatusCode.OK).json(comments);
  });

  route.post(ApiArticlesRoute.$ARTICLE_COMMENTS, [articleExist(articleService), commentValidator], async (req, res) => {
    const {article} = res.locals;
    const comment = req.body;
    const newComment = await commentService.create(article, comment);
    return res.status(HttpStatusCode.OK).json(newComment);
  });

  route.get(ApiArticlesRoute.$ARTICLE_$COMMENT, [articleExist(articleService), commentExist(commentService)], (_req, res) => {
    const {comment} = res.locals;
    res.status(HttpStatusCode.OK).json(comment);
  });

  route.put(ApiArticlesRoute.$ARTICLE_$COMMENT, [articleExist(articleService), commentExist(commentService), commentValidator], async (req, res) => {
    const {article, comment} = res.locals;
    const update = req.body;
    const updatedComment = await commentService.update(article, comment[CommentKey.ID], update);
    return res.status(HttpStatusCode.OK).json(updatedComment);
  });

  route.delete(ApiArticlesRoute.$ARTICLE_$COMMENT, [articleExist(articleService), commentExist(commentService)], async (_req, res) => {
    const {article, comment} = res.locals;
    const deletedComment = await commentService.drop(article, comment[CommentKey.ID]);
    res.status(HttpStatusCode.OK).json(deletedComment);
  });
};
