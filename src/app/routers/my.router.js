'use strict';

const {Router} = require(`express`);
const {
  AppPage,
  AppRoute,
  ContentLimit,
  MyRoute,
} = require(`../../common/enums`);
const {
  calculatePagination,
  getTotalPages,
} = require(`../../common/helpers`);
const {getAPI} = require(`../api`);
const {
  checkIsAdmin,
  checkIsAuthorized,
} = require(`../middlewares`);

const myRouter = new Router();
const api = getAPI();

const authMiddlewares = [checkIsAuthorized, checkIsAdmin];

myRouter.get(MyRoute.ROOT, authMiddlewares, async (req, res) => {
  const {user} = req.session;
  const {page, offset} = calculatePagination(ContentLimit.ARTICLES_LIST, req.query.page);
  const limit = ContentLimit.ARTICLES_LIST;
  const {count, articles} = await api.getArticles({limit, offset});
  const totalPages = getTotalPages(count, ContentLimit.ARTICLES_LIST);

  res.render(AppPage.ADMIN_ARTICLES, {
    articles,
    count,
    page,
    totalPages,
    user,
  });
});

myRouter.post(MyRoute.$ARTICLE_ID, authMiddlewares, async (req, res) => {
  const {articleId} = req.params;
  await api.deleteArticle(articleId);
  res.redirect(AppRoute.MY);
});

myRouter.get(MyRoute.COMMENTS, authMiddlewares, async (req, res) => {
  const {user} = req.session;
  const {page, offset} = calculatePagination(ContentLimit.COMMENTS_LIST, req.query.page);
  const limit = ContentLimit.COMMENTS_LIST;
  const {count, comments} = await api.getComents({limit, offset});
  const totalPages = getTotalPages(count, ContentLimit.COMMENTS_LIST);

  res.render(AppPage.ADMIN_COMMENTS, {
    comments,
    count,
    page,
    totalPages,
    user,
  });
});

myRouter.post(MyRoute.COMMENTS_$COMMENT_ID, authMiddlewares, async (req, res) => {
  const {commentId} = req.params;
  await api.deleteComment(commentId);
  res.redirect(AppRoute.COMMENTS);
});

module.exports = {
  myRouter,
};
