'use strict';

const {Router} = require(`express`);
const {getAPI} = require(`../api`);
const {upload} = require(`../storage`);
const {
  PublicationKey,
  UserType,
} = require(`../../constants`);
const {ensureArray} = require(`../../utils`);
const {
  AppPage,
  AppRoute,
  ArticleRoute,
  FormKey,
} = require(`../constants`);

const articlesRouter = new Router();
const api = getAPI();

articlesRouter.get(ArticleRoute.MAIN, (req, res) => {
  res.redirect(AppRoute.MAIN);
});

articlesRouter.get(ArticleRoute.CATEGORY, async (req, res) => {
  const {id} = req.params;
  const [articles, categories] = await Promise.all([
    api.getArticles(),
    api.getCategories(),
  ]);

  res.render(AppPage.CATEGORY, {
    articles,
    categories,
    currentCategory: categories.find((category) => category.id === id),
    account: {
      type: UserType.USER,
    },
  });
});

articlesRouter.get(ArticleRoute.ADD, async (req, res) => {
  const categories = await api.getCategories();

  res.render(AppPage.ADMIN_ARTICLE, {
    article: {},
    categories,
    account: {
      type: UserType.ADMIN,
    },
  });
});

articlesRouter.get(ArticleRoute.EDIT, async (req, res) => {
  const {id} = req.params;
  const [article, categories] = await Promise.all([
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

articlesRouter.get(ArticleRoute.ARTICLE, async (req, res, next) => {
  const {id} = req.params;

  try {
    const article = await api.getArticle(id);
    res.render(AppPage.ARTICLE, {
      article,
      account: {
        type: UserType.USER,
      },
    });
  } catch (error) {
    next();
  }

});

articlesRouter.post(ArticleRoute.ADD, upload.single(FormKey.UPLOAD), async (req, res) => {
  const {body, file} = req;

  const article = {
    [PublicationKey.TITLE]: body[FormKey.TITLE],
    [PublicationKey.PICTURE]: file ? file[FormKey.PICTURE] : ``,
    [PublicationKey.CREATED_DATE]: body[FormKey.CREATED_DATE],
    [PublicationKey.ANNOUNCE]: body[FormKey.ANNOUNCE],
    [PublicationKey.FULL_TEXT]: body[FormKey.FULL_TEXT],
    [PublicationKey.CATEGORIES]: ensureArray(body[FormKey.CATEGORIES]),
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
