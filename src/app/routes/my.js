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

myRouter.get(AppMyRoute.MAIN, async (_req, res) => {
  const articles = await api.getAllArticles(ContentLimit.ARTICLES_LIST);

  res.render(AppPage.ADMIN_ARTICLES, {
    articles,
    account: {
      type: UserType.ADMIN,
    },
  });
});

myRouter.get(AppMyRoute.COMMENTS, async (_req, res) => {
  const comments = await api.getAllComments(ContentLimit.COMMENTS_LIST);

  res.render(AppPage.ADMIN_COMMENTS, {
    comments,
    account: {
      type: UserType.ADMIN,
    },
  });
});

module.exports = myRouter;
