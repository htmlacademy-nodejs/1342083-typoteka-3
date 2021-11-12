'use strict';

const {Router} = require(`express`);
const {
  ArticlesRoute,
  HttpStatusCode,
} = require(`../../common/enums`);
const {adaptCommentToClient, adaptHotToClient} = require(`../../common/helpers`);
const {commentSchema} = require(`../../common/schemas`);
const {
  articleExist,
  articleValidator,
  validateRouteParams,
  validateSchema,
} = require(`../middlewares`);

const HOT_LIMIT = 4;

const articlesRouter = (app, articleService, commentService) => {
  const router = new Router();
  app.use(ArticlesRoute.MAIN, router);

  const existMiddlewares = [validateRouteParams, articleExist(articleService)];

  router.get(ArticlesRoute.ROOT, async (req, res) => {
    const {limit, offset} = req.query;

    const articles = await articleService.findPage({
      limit,
      offset,
    });

    res.status(HttpStatusCode.OK).json(articles);
  });

  router.post(ArticlesRoute.ROOT, articleValidator, async (req, res) => {
    const newArticle = await articleService.create(req.body);
    res.status(HttpStatusCode.CREATED).json(newArticle);
  });

  router.get(ArticlesRoute.HOT, async (req, res) => {
    const articles = await articleService.findAllPopular(req.query.limit);
    res.status(HttpStatusCode.OK).json(articles);
  });

  router.get(ArticlesRoute.$ARTICLE_ID, existMiddlewares, async (req, res) => {
    const article = await articleService.findOne(req.params.articleId);
    const comments = await commentService.findAllByArticle(req.params.articleId);
    res.status(HttpStatusCode.OK).json({article, comments});
  });

  router.put(ArticlesRoute.$ARTICLE_ID, existMiddlewares.concat(articleValidator), async (req, res) => {
    const updatedArticle = await articleService.update(req.params.articleId, req.body);
    res.status(HttpStatusCode.OK).json(updatedArticle);
  });

  router.delete(ArticlesRoute.$ARTICLE_ID, existMiddlewares, async (req, res) => {
    const deletedArticle = await articleService.drop(req.params.articleId);
    res.status(HttpStatusCode.OK).json(deletedArticle);
  });

  router.get(ArticlesRoute.$ARTICLE_ID_COMMENTS, existMiddlewares, async (req, res) => {
    const comments = await commentService.findAllByArticle(req.params.articleId);
    res.status(HttpStatusCode.OK).json(comments);
  });

  router.post(ArticlesRoute.$ARTICLE_ID_COMMENTS,
      existMiddlewares.concat(validateSchema(commentSchema)),
      async (req, res) => {
        const io = req.app.locals.socketio;
        const [comment] = await commentService.create(req.params.articleId, req.body);

        if (io) {
          const articles = await articleService.findAllPopular(HOT_LIMIT);

          io.emit(`comment:create`, adaptCommentToClient(comment));
          io.emit(`hot:update`, articles.map(adaptHotToClient));
        }

        res.status(HttpStatusCode.CREATED).json(comment);
      });
};

module.exports = {
  articlesRouter,
};
