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

const ARTICLES_PER_PAGE = 8;

mainRouter.get(AppMainRoute.MAIN, async (req, res) => {
  let {
    page = 1,
  } = req.query;
  page = parseInt(page, 10);
  const limit = ARTICLES_PER_PAGE;
  const offset = (page - 1) * ARTICLES_PER_PAGE;

  const [
    categories,
    popularArticles,
    lastComments,
    {count, articles},
  ] = await Promise.all([
    api.getCategories(true),
    api.getPopularArticles(ContentLimit.POPULAR),
    api.getComents(ContentLimit.LAST_COMMENTS),
    api.getArticles({
      limit,
      offset
    }),
  ]);

  const totalPages = Math.ceil(count / ARTICLES_PER_PAGE);

  res.render(AppPage.MAIN, {
    categories,
    popularArticles,
    lastComments,
    articles,
    page,
    totalPages,
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
    hasQuery: typeof query === `string`,
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
