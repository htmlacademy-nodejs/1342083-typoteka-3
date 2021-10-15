'use strict';

const {Router} = require(`express`);
const {getAPI} = require(`../api`);
const {
  UserType,
} = require(`../../constants`);
const {
  AppPage,
  AppRoute,
  MainRoute,
} = require(`../constants`);

const mainRouter = new Router();
const api = getAPI();

mainRouter.get(MainRoute.MAIN, async (req, res) => {
  const articles = await api.getArticles();
  const categories = await api.getCategories();

  res.render(AppPage.MAIN, {
    articles,
    categories,
    account: {
      type: UserType.ADMIN,
    },
  });
});

mainRouter.get(MainRoute.REGISTER, (req, res) => {
  res.render(AppPage.REGISTER, {
    account: {},
  });
});

mainRouter.get(MainRoute.LOGIN, (req, res) => {
  res.render(AppPage.LOGIN, {
    account: {},
  });
});

mainRouter.get(MainRoute.LOGOUT, (req, res) => {
  res.redirect(AppRoute.MAIN);
});

mainRouter.get(MainRoute.SEARCH, async (req, res) => {
  const {query} = req.query;
  const results = await api.search(query);

  res.render(AppPage.SEARCH, {
    query,
    results,
    account: {
      type: UserType.USER,
    },
  });
});

mainRouter.get(MainRoute.CATEGORIES, async (req, res) => {
  const categories = await api.getCategories();

  res.render(AppPage.ADMIN_CATEGORIES, {
    categories,
    account: {
      type: UserType.ADMIN,
    },
  });
});

module.exports = mainRouter;
