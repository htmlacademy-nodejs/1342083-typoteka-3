'use strict';

const {Router} = require(`express`);
const {getAPI} = require(`../api`);
const {HttpStatusCode} = require(`../../constants`);

const mainRouter = new Router();
const api = getAPI();

mainRouter.get(`/`, async (req, res) => {
  const articles = await api.getArticles();
  const categories = await api.getCategories();

  res.render(`pages/main`, {
    articles,
    categories,
    account: {
      type: `guest`,
    },
  });
});

mainRouter.get(`/register`, (req, res) => {
  res.render(`pages/register`, {
    account: {
      type: `guest`,
    },
  });
});

mainRouter.get(`/login`, (req, res) => {
  res.render(`pages/login`, {
    account: {
      type: `guest`,
    },
  });
});

mainRouter.get(`/search`, async (req, res) => {
  const {query} = req.query;
  const results = await api.search(query);

  res.render(`pages/search`, {
    query,
    results,
    account: {
      type: `user`,
    },
  });
});

mainRouter.get(`/categories`, async (req, res) => {
  const categories = await api.getCategories();

  res.render(`pages/admin/categories`, {
    categories,
    account: {
      type: `admin`,
    },
  });
});

mainRouter.get(`/404`, (req, res) => {
  res.render(`pages/errors/404`, {
    account: {
      type: `guest`,
      error: HttpStatusCode.NOT_FOUND
    },
  });
});

mainRouter.get(`/500`, (req, res) => {
  res.render(`pages/errors/500`, {
    account: {
      type: `guest`,
      error: HttpStatusCode.INTERNAL_SERVER_ERROR,
    },
  });
});

module.exports = mainRouter;
