'use strict';

const {Router} = require(`express`);
const {
  articleExist,
  articleValidator,
  commentExist,
  commentValidator,
  validateRouteParams,
  validateSchema,
} = require(`../middlewares`);
const {
  ApiUrl,
  ApiArticlesRoute,
  HttpStatusCode,
} = require(`../../common/enums`);
const {commentSchema} = require(`../../common/schemas`);

module.exports = (app, articleService, commentService) => {
  const route = new Router();
  app.use(ApiUrl.ARTICLES, route);

  route.get(ApiArticlesRoute.MAIN, async (req, res) => {
    const {limit, offset} = req.query;

    const articles = await articleService.findPage({
      limit,
      offset,
    });

    res.status(HttpStatusCode.OK).json(articles);
  });

  route.post(
      ApiArticlesRoute.MAIN,
      articleValidator,
      async (req, res) => {
        const newArticle = await articleService.create(req.body);
        res.status(HttpStatusCode.OK).json(newArticle);
      }
  );

  route.get(ApiArticlesRoute.POPULAR, async (req, res) => {
    const articles = await articleService.findAllPopular(req.query.limit);
    res.status(HttpStatusCode.OK).json(articles);
  });

  route.get(ApiArticlesRoute.COMMENTS, async (req, res) => {
    const {limit, offset} = req.query;
    const comments = await commentService.findAll({
      limit,
      offset,
    });
    res.status(HttpStatusCode.OK).json(comments);
  });

  route.get(
      ApiArticlesRoute.$ARTICLE,
      [
        validateRouteParams,
        articleExist(articleService),
      ],
      async (req, res) => {
        const article = await articleService.findOne(req.params.articleId);
        res.status(HttpStatusCode.OK).json(article);
      }
  );

  route.put(
      ApiArticlesRoute.$ARTICLE,
      [
        validateRouteParams,
        articleExist(articleService),
        articleValidator,
      ],
      async (req, res) => {
        const updatedArticle = await articleService.update(req.params.articleId, req.body);
        res.status(HttpStatusCode.OK).json(updatedArticle);
      }
  );

  route.delete(
      ApiArticlesRoute.$ARTICLE,
      [
        validateRouteParams,
        articleExist(articleService),
      ],
      async (req, res) => {
        const deletedArticle = await articleService.drop(req.params.articleId);
        res.status(HttpStatusCode.OK).json(deletedArticle);
      }
  );

  route.get(
      ApiArticlesRoute.$ARTICLE_COMMENTS,
      [
        validateRouteParams,
        articleExist(articleService),
      ],
      async (req, res) => {
        const comments = await commentService.findAllByArticle(req.params.articleId);
        res.status(HttpStatusCode.OK).json(comments);
      }
  );

  route.post(
      ApiArticlesRoute.$ARTICLE_COMMENTS,
      [
        validateRouteParams,
        articleExist(articleService),
        validateSchema(commentSchema),
      ],
      async (req, res) => {
        const comment = await commentService.create(req.params.articleId, req.body);
        res.status(HttpStatusCode.OK).json(comment);
      }
  );

  route.get(
      ApiArticlesRoute.$ARTICLE_$COMMENT,
      [
        validateRouteParams,
        articleExist(articleService),
        commentExist(commentService),
      ],
      async (req, res) => {
        const comment = await commentService.findOne(req.params.commentId);
        res.status(HttpStatusCode.OK).json(comment);
      }
  );

  route.put(
      ApiArticlesRoute.$ARTICLE_$COMMENT,
      [
        validateRouteParams,
        articleExist(articleService),
        commentExist(commentService),
        commentValidator,
      ],
      async (req, res) => {
        const updatedComment = await commentService.update(req.params.commentId, req.body);
        res.status(HttpStatusCode.OK).json(updatedComment);
      }
  );

  route.delete(
      ApiArticlesRoute.$ARTICLE_$COMMENT,
      [
        validateRouteParams,
        articleExist(articleService),
        commentExist(commentService),
      ],
      async (req, res) => {
        const deletedComment = await commentService.drop(req.params.commentId);
        res.status(HttpStatusCode.OK).json(deletedComment);
      }
  );
};
