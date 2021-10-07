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

mainRouter.get(`/register`, (req, res) => res.render(`register`));
mainRouter.get(`/login`, (req, res) => res.render(`login`));

mainRouter.get(`/search`, async (req, res) => {
  const {query} = req.query;
  const results = await api.search(query);

  res.render(`search`, {query, results});
});

mainRouter.get(`/categories`, async (req, res) => {
  const categories = await api.getCategories();

  res.render(`admin/categories`, {categories});
});

mainRouter.get(`/404`, (req, res) => res.render(`errors/404`));
mainRouter.get(`/500`, (req, res) => res.render(`errors/500`));

module.exports = mainRouter;
