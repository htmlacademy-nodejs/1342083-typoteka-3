'use strict';

const {Router} = require(`express`);
const {getAPI} = require(`../api`);
const {
  AppMyRoute,
  AppPage,
  ContentLimit,
  UserType,
} = require(`../../common/enums`);
const {
  calculatePagination,
  getTotalPages,
} = require(`../../common/helpers`);

const myRouter = new Router();
const api = getAPI();

myRouter.get(AppMyRoute.MAIN, async (req, res) => {
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
    account: {
      type: UserType.ADMIN,
    },
  });
});

myRouter.get(AppMyRoute.COMMENTS, async (req, res) => {
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
    account: {
      type: UserType.ADMIN,
    },
  });
});

module.exports = myRouter;
