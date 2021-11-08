'use strict';

const {Router} = require(`express`);
const checkAuth = require(`../middlewares/check-auth`);
const checkIsAdmin = require(`../middlewares/check-is-admin`);
const {getAPI} = require(`../api`);
const {
  AppMyRoute,
  AppPage,
  ContentLimit,
} = require(`../../common/enums`);
const {
  calculatePagination,
  getTotalPages,
} = require(`../../common/helpers`);

const myRouter = new Router();
const api = getAPI();

myRouter.get(AppMyRoute.MAIN, [checkAuth, checkIsAdmin], async (req, res) => {
  const {user} = req.session;
  const {
    page,
    offset
  } = calculatePagination(ContentLimit.ARTICLES_LIST, req.query.page);

  const {
    count,
    articles,
  } = await api.getArticles({
    limit: ContentLimit.ARTICLES_LIST,
    offset,
  });
  const totalPages = getTotalPages(count, ContentLimit.ARTICLES_LIST);

  res.render(AppPage.ADMIN_ARTICLES, {
    articles,
    count,
    page,
    totalPages,
    user,
  });
});

myRouter.get(AppMyRoute.COMMENTS, [checkAuth, checkIsAdmin], async (req, res) => {
  const {user} = req.session;
  const {
    page,
    offset
  } = calculatePagination(ContentLimit.COMMENTS_LIST, req.query.page);

  const {
    count,
    comments,
  } = await api.getComents({
    limit: ContentLimit.COMMENTS_LIST,
    offset,
  });
  const totalPages = getTotalPages(count, ContentLimit.COMMENTS_LIST);

  res.render(AppPage.ADMIN_COMMENTS, {
    comments,
    count,
    page,
    totalPages,
    user,
  });
});

module.exports = myRouter;
