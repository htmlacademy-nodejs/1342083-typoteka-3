'use strict';

const {Router} = require(`express`);
const {
  AdminAction,
  AppPage,
  AppRoute,
  ContentLimit,
  FormElementKey,
  MainRoute,
} = require(`../../common/enums`);
const {
  calculatePagination,
  getTotalPages,
  getUserData,
} = require(`../../common/helpers`);
const {getAPI} = require(`../api`);
const {
  checkIsAdmin,
  checkIsAuthorized,
  redirectIsAuthorized,
} = require(`../middlewares`);
const {upload} = require(`../storage`);

const mainRouter = new Router();
const api = getAPI();

const authMiddlewares = [checkIsAuthorized, checkIsAdmin];

mainRouter.get(MainRoute.MAIN, async (req, res) => {
  const {user} = req.session;
  const {page, offset} = calculatePagination(ContentLimit.PREVIEW_LIST, req.query.page);
  const limit = ContentLimit.PREVIEW_LIST;
  const [
    categories,
    popularArticles,
    {comments: lastComments},
    {count, articles},
  ] = await Promise.all([
    api.getCategories(true),
    api.getPopularArticles(ContentLimit.POPULAR),
    api.getComents({limit: ContentLimit.LAST_COMMENTS}),
    api.getArticles({limit, offset}),
  ]);
  const totalPages = getTotalPages(count, ContentLimit.PREVIEW_LIST);

  res.render(AppPage.MAIN, {
    categories,
    popularArticles,
    lastComments,
    articles,
    page,
    totalPages,
    user,
  });
});

mainRouter.get(MainRoute.REGISTER, redirectIsAuthorized, (req, res) => {
  const {user} = req.session;

  if (user) {
    res.redirect(AppRoute.MAIN);
  }

  res.render(AppPage.REGISTER, {
    user,
  });
});

mainRouter.post(MainRoute.REGISTER, upload.single(FormElementKey.UPLOAD), async (req, res) => {
  const {body, file} = req;
  const userData = getUserData(body, file);

  try {
    await api.createUser(userData);
    res.redirect(AppRoute.LOGIN);
  } catch (err) {
    const {user} = req.session;
    const errors = err.response.data;

    res.render(AppPage.REGISTER, {
      user,
      userData: {...userData},
      errors,
    });
  }
});

mainRouter.get(MainRoute.LOGIN, redirectIsAuthorized, (req, res) => {
  const {user} = req.session;

  if (user) {
    res.redirect(AppRoute.MAIN);
  }

  res.render(AppPage.LOGIN, {
    user,
  });
});

mainRouter.post(MainRoute.LOGIN, async (req, res) => {
  try {
    const email = req.body[FormElementKey.EMAIL];
    const password = req.body[FormElementKey.PASSWORD];
    const user = await api.login(email, password);

    req.session.user = user;
    req.session.save(() => res.redirect(AppRoute.MAIN));
  } catch (err) {
    const {user} = req.session;
    const errors = err.response.data;

    res.render(AppPage.LOGIN, {
      user,
      errors,
    });
  }
});

mainRouter.get(MainRoute.LOGOUT, (req, res) => {
  delete req.session.user;
  res.redirect(AppRoute.MAIN);
});

mainRouter.get(MainRoute.SEARCH, async (req, res) => {
  const {user} = req.session;
  const {query} = req.query;
  const hasQuery = typeof query === `string`;

  if (!hasQuery) {
    return res.render(AppPage.SEARCH, {user});
  }

  const results = await api.search(query);

  return res.render(AppPage.SEARCH, {
    query,
    results,
    user,
  });
});

mainRouter.get(MainRoute.CATEGORIES, authMiddlewares, async (req, res) => {
  const {user} = req.session;
  const categories = await api.getCategories();

  res.render(AppPage.ADMIN_CATEGORIES, {
    categories,
    user,
  });
});

mainRouter.post(MainRoute.CATEGORIES, authMiddlewares, async (req, res) => {
  const {body} = req;

  try {
    await api.createCategory(body);
    res.redirect(AppRoute.CATEGORIES);
  } catch (err) {
    const {user} = req.session;
    const categories = await api.getCategories();
    const errors = err.response.data;
    const isAddErrors = true;
    const categoryName = body.name;

    res.render(AppPage.ADMIN_CATEGORIES, {
      categories,
      errors,
      isAddErrors,
      categoryName,
      user,
    });
  }
});

mainRouter.post(MainRoute.CATEGORIES_$ID, authMiddlewares, async (req, res) => {
  const {body} = req;
  const {categoryId} = req.params;
  const {action, ...category} = body;

  try {
    switch (action) {
      case AdminAction.DELETE: {
        await api.deleteCategory(categoryId);
        break;
      }
      case AdminAction.UPDATE: {
        await api.updateCategory(categoryId, category);
        break;
      }
    }

    res.redirect(AppRoute.CATEGORIES);
  } catch (err) {
    const {user} = req.session;
    const categories = await api.getCategories();
    const errors = err.response.data;

    res.render(AppPage.ADMIN_CATEGORIES, {
      categories,
      errors,
      invalidCategoryId: Number(categoryId),
      user,
    });
  }
});

module.exports = {
  mainRouter,
};
