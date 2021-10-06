'use strict';

const {Router} = require(`express`);
const {getAPI} = require(`../api`);

const myRouter = new Router();
const api = getAPI();

myRouter.get(`/`, async (req, res) => {
  const articles = await api.getArticles();
  res.render(`admin/articles`, {articles});
});

myRouter.get(`/`, (req, res) => res.render(`admin/publications`));
myRouter.get(`/comments`, (req, res) => res.render(`admin/comments`));

module.exports = myRouter;
