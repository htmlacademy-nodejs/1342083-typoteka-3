'use strict';

const {Router} = require(`express`);
const {getAPI} = require(`../api`);
const {
  AppMyRoute,
  AppPage,
  ContentLimit,
  UserType,
} = require(`../../common/enums`);

const myRouter = new Router();
const api = getAPI();

myRouter.get(AppMyRoute.MAIN, async (req, res) => {
  let {
    page = 1,
  } = req.query;
  page = parseInt(page, 10);
  const limit = ContentLimit.ARTICLES_LIST;
  const offset = (page - 1) * ContentLimit.ARTICLES_LIST;

  const {
    count,
    articles,
  } = await api.getArticles({
    limit,
    offset,
  });
  const totalPages = Math.ceil(count / ContentLimit.ARTICLES_LIST);

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
  let {
    page = 1,
  } = req.query;
  page = parseInt(page, 10);
  const limit = ContentLimit.COMMENTS_LIST;
  const offset = (page - 1) * ContentLimit.COMMENTS_LIST;

  const {
    count,
    comments,
  } = await api.getComents({
    limit,
    offset,
  });
  const totalPages = Math.ceil(count / ContentLimit.COMMENTS_LIST);

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
