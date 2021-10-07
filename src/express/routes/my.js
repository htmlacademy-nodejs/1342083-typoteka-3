'use strict';

const {Router} = require(`express`);
const {getAPI} = require(`../api`);

const myRouter = new Router();
const api = getAPI();

myRouter.get(`/`, async (req, res) => {
  const articles = await api.getArticles();

  res.render(`pages/admin/articles`, {
    articles,
    account: {
      type: `admin`,
    },
  });
});

myRouter.get(`/comments`, async (req, res) => {
  const articles = await api.getArticles();

  res.render(`pages/admin/comments`, {
    articles,
    account: {
      type: `admin`,
    },
  });
});

module.exports = myRouter;
