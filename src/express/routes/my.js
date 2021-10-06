'use strict';

const {Router} = require(`express`);
const {getAPI} = require(`../api`);

const myRouter = new Router();
const api = getAPI();

myRouter.get(`/`, async (req, res) => {
  const articles = await api.getArticles();
  res.render(`admin/articles`, {articles});
});

myRouter.get(`/comments`, async (req, res) => {
  const articles = await api.getArticles();
  res.render(`admin/comments`, {articles});
});

module.exports = myRouter;
