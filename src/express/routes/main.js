'use strict';

const {Router} = require(`express`);
const {getAPI} = require(`../api`);

const mainRouter = new Router();
const api = getAPI();

mainRouter.get(`/`, async (req, res) => {
  const articles = await api.getArticles();
  const categories = await api.getCategories();
  res.render(`main`, {articles, categories});
});

mainRouter.get(`/my`, async (req, res) => {
  const articles = await api.getArticles();
  res.render(`my`, {articles});
});

mainRouter.get(`/register`, (req, res) => res.render(`register`));
mainRouter.get(`/login`, (req, res) => res.render(`login`));
mainRouter.get(`/search`, (req, res) => res.render(`search`));
mainRouter.get(`/categories`, (req, res) => res.render(`admin/categories`));
mainRouter.get(`/404`, (req, res) => res.render(`errors/404`));
mainRouter.get(`/500`, (req, res) => res.render(`errors/500`));

module.exports = mainRouter;
