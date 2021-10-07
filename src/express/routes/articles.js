'use strict';

const {Router} = require(`express`);
const {getAPI} = require(`../api`);
const {ArticleKey} = require(`../../constants`);
const {ensureArray} = require(`../../utils`);
const {upload} = require(`../storage`);

const articlesRouter = new Router();
const api = getAPI();

articlesRouter.get(`/category/:id`, async (req, res) => {
  const {id} = req.params;
  const [articles, categories] = await Promise.all([
    api.getArticles(),
    api.getCategories(),
  ]);

  res.render(`pages/category`, {
    articles,
    categories,
    currentCategory: id,
    account: {
      type: `user`,
    },
  });
});

articlesRouter.get(`/add`, async (req, res) => {
  const categories = await api.getCategories();

  res.render(`pages/admin/article`, {
    article: {},
    categories,
    account: {
      type: `admin`,
    },
  });
});

articlesRouter.get(`/edit/:id`, async (req, res) => {
  const {id} = req.params;
  const [article, categories] = await Promise.all([
    api.getArticle(id),
    api.getCategories(),
  ]);

  res.render(`pages/admin/article`, {
    article,
    categories,
    account: {
      type: `admin`,
    },
  });
});

articlesRouter.get(`/:id`, async (req, res) => {
  const {id} = req.params;
  const article = await api.getArticle(id);

  res.render(`pages/article`, {
    article,
    account: {
      type: `user`,
    },
  });
});

articlesRouter.post(`/add`, upload.single(`avatar`), async (req, res) => {
  const {body, file} = req;

  const article = {
    [ArticleKey.TITLE]: body[`title`],
    [ArticleKey.PICTURE]: file ? file.filename : ``,
    [ArticleKey.CREATED_DATE]: body[`date`],
    [ArticleKey.ANNOUNCE]: body[`announcement`],
    [ArticleKey.FULL_TEXT]: body[`full-text`],
    [ArticleKey.CATEGORIES]: ensureArray(body[`category`]),
  };

  try {
    await api.createArticle(article);
    res.redirect(`/my`);
  } catch (err) {
    const categories = await api.getCategories();

    res.render(`pages/admin/article`, {
      article,
      categories,
      account: {
        type: `admin`,
      },
    });
  }
});

module.exports = articlesRouter;
