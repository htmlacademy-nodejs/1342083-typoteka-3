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
const {
  calculatePagination,
  getTotalPages,
} = require(`../../common/helpers`);

const mainRouter = new Router();
const api = getAPI();

mainRouter.get(AppMainRoute.MAIN, async (req, res) => {
  const {
    page,
    offset
  } = calculatePagination(ContentLimit.PREVIEW_LIST, req.query.page);

  const [
    categories,
    popularArticles,
    {comments: lastComments},
    {count, articles},
  ] = await Promise.all([
    api.getCategories(true),
    api.getPopularArticles(ContentLimit.POPULAR),
    api.getComents({
      limit: ContentLimit.LAST_COMMENTS,
    }),
    api.getArticles({
      limit: ContentLimit.PREVIEW_LIST,
      offset
    }),
  ]);

  const totalPages = getTotalPages(count, ContentLimit.PREVIEW_LIST);

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
    query,
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

mainRouter.post(
    AppMainRoute.CATEGORIES,
    async (req, res) => {
      try {
        await api.createCategory(req.body);
        res.redirect(AppRoute.CATEGORIES);
      } catch (err) {
        const validationErrors = err.response.data;
        const categories = await api.getCategories();

        res.render(AppPage.ADMIN_CATEGORIES, {
          categories,
          account: {
            type: UserType.ADMIN,
          },
          validationErrors,
        });
      }
    }
);

module.exports = mainRouter;
