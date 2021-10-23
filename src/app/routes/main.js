'use strict';

const {Router} = require(`express`);
const {getAPI} = require(`../api`);
const {
  AppMainRoute,
  ContentLimit,
  AppPage,
  UserType,
  AppRoute,
} = require(`../../common/enums`);

const mainRouter = new Router();
const api = getAPI();

mainRouter.get(AppMainRoute.MAIN, async (_req, res) => {
  const [
    categories,
    popularArticles,
    lastComments,
    articles,
  ] = await Promise.all([
    api.getCategories(true),
    api.getPopularArticles(ContentLimit.POPULAR),
    api.getAllComments(ContentLimit.LAST_COMMENTS),
    api.getAllArticles(ContentLimit.PREVIEW_LIST),
  ]);

  res.render(AppPage.MAIN, {
    categories,
    popularArticles,
    lastComments,
    articles,
    account: {
      type: UserType.ADMIN,
    },
  });
});

mainRouter.get(AppMainRoute.REGISTER, (_req, res) => {
  res.render(AppPage.REGISTER, {
    account: {},
  });
});

mainRouter.get(AppMainRoute.LOGIN, (_req, res) => {
  res.render(AppPage.LOGIN, {
    account: {},
  });
});

mainRouter.get(AppMainRoute.LOGOUT, (_req, res) => {
  res.redirect(AppRoute.MAIN);
});

mainRouter.get(AppMainRoute.SEARCH, async (req, res) => {
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

mainRouter.get(AppMainRoute.CATEGORIES, async (_req, res) => {
  const categories = await api.getCategories();

  res.render(AppPage.ADMIN_CATEGORIES, {
    categories,
    account: {
      type: UserType.ADMIN,
    },
  });
});

module.exports = mainRouter;
