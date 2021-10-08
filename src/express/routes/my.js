'use strict';

const {Router} = require(`express`);
const {getAPI} = require(`../api`);
const {UserType} = require(`../../constants`);
const {
  MyRoute,
  AppPage,
} = require(`../constants`);

const myRouter = new Router();
const api = getAPI();

myRouter.get(MyRoute.MAIN, async (req, res) => {
  const articles = await api.getArticles();

  res.render(AppPage.ADMIN_ARTICLES, {
    articles,
    account: {
      type: UserType.ADMIN,
    },
  });
});

myRouter.get(MyRoute.COMMENTS, async (req, res) => {
  const articles = await api.getArticles();

  res.render(AppPage.ADMIN_COMMENTS, {
    articles,
    account: {
      type: UserType.ADMIN,
    },
  });
});

module.exports = myRouter;
