'use strict';

const {Router} = require(`express`);
const {getAPI} = require(`../api`);
const {upload} = require(`../storage`);
const {
  AppArticleRoute,
  AppRoute,
  AppPage,
  UserType,
  FormElementKey,
  ArticleKey,
  ContentLimit,
  DateFormatPattern,
} = require(`../../common/enums`);
const {
  ensureArray,
  getCurrentDate,
} = require(`../../common/helpers`);

const articlesRouter = new Router();
const api = getAPI();

articlesRouter.get(AppArticleRoute.MAIN, (_req, res) => {
  res.redirect(AppRoute.MAIN);
});

articlesRouter.get(AppArticleRoute.CATEGORY, async (req, res) => {
  let {
    page = 1,
  } = req.query;
  page = parseInt(page, 10);
  const limit = ContentLimit.PREVIEW_LIST;
  const offset = (page - 1) * ContentLimit.PREVIEW_LIST;

  const {id: categoryId} = req.params;
  const [
    category,
    categories,
    {count, articles},
  ] = await Promise.all([
    api.getCategory(categoryId),
    api.getCategories(true),
    api.getArticlesByCategory({
      categoryId,
      limit,
      offset,
    }),
  ]);

  const totalPages = Math.ceil(count / ContentLimit.PREVIEW_LIST);

  res.render(AppPage.CATEGORY, {
    category,
    articles,
    categories,
    page,
    totalPages,
    account: {
      type: UserType.USER,
    },
  });
});

articlesRouter.get(AppArticleRoute.ADD, async (_req, res) => {
  const categories = await api.getCategories();

  res.render(AppPage.ADMIN_ARTICLE, {
    article: {
      [ArticleKey.CREATED_DATE]: getCurrentDate(DateFormatPattern.MACHINE),
    },
    categories,
    account: {
      type: UserType.ADMIN,
    },
  });
});

articlesRouter.get(AppArticleRoute.EDIT, async (req, res) => {
  const {id} = req.params;
  const [
    article,
    categories,
  ] = await Promise.all([
    api.getArticle(id),
    api.getCategories(),
  ]);

  res.render(AppPage.ADMIN_ARTICLE, {
    article,
    categories,
    account: {
      type: UserType.ADMIN,
    },
  });
});

articlesRouter.get(AppArticleRoute.ARTICLE, async (req, res, next) => {
  const {headers, params} = req;

  try {
    const article = await api.getArticle(params.id);
    res.render(AppPage.ARTICLE, {
      article,
      backHref: headers.referer,
      account: {
        type: UserType.USER,
      },
    });
  } catch (error) {
    next();
  }
});

articlesRouter.post(AppArticleRoute.ADD, upload.single(FormElementKey.UPLOAD), async (req, res) => {
  const {body, file} = req;

  const article = {
    [ArticleKey.TITLE]: body[FormElementKey.TITLE],
    [ArticleKey.PICTURE]: file ? file[FormElementKey.PICTURE] : ``,
    [ArticleKey.CREATED_DATE]: body[FormElementKey.CREATED_DATE],
    [ArticleKey.ANNOUNCE]: body[FormElementKey.ANNOUNCE],
    [ArticleKey.FULL_TEXT]: body[FormElementKey.FULL_TEXT],
    [ArticleKey.CATEGORIES]: ensureArray(body[FormElementKey.CATEGORIES]),
  };

  try {
    await api.createArticle(article);
    res.redirect(AppRoute.MY);
  } catch (err) {
    const categories = await api.getCategories();

    res.render(AppPage.ADMIN_ARTICLE, {
      article,
      categories,
      account: {
        type: UserType.ADMIN,
      },
    });
  }
});

module.exports = articlesRouter;
