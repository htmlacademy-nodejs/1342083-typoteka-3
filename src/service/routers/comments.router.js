'use strict';

const {Router} = require(`express`);
const {
  CommentsRoute,
  HttpStatusCode,
} = require(`../../common/enums`);
const {
  commentExist,
  validateRouteParams,
} = require(`../middlewares`);

const commentsRouter = (app, commentService) => {
  const router = new Router();
  app.use(CommentsRoute.MAIN, router);

  const commentsMiddlewares = [validateRouteParams, commentExist(commentService)];

  router.get(CommentsRoute.ROOT, async (req, res) => {
    const {limit, offset} = req.query;
    const comments = await commentService.findAll({
      limit,
      offset,
    });
    res.status(HttpStatusCode.OK).json(comments);
  });

  router.get(CommentsRoute.$COMMENT_ID, commentsMiddlewares, async (req, res) => {
    const comment = await commentService.findOne(req.params.commentId);
    res.status(HttpStatusCode.OK).json(comment);
  });

  router.delete(CommentsRoute.$COMMENT_ID, commentsMiddlewares, async (req, res) => {
    const deletedComment = await commentService.drop(req.params.commentId);
    res.status(HttpStatusCode.OK).json(deletedComment);
  });
};

module.exports = {
  commentsRouter,
};
