'use strict';

const {Router} = require(`express`);
const {getAPI} = require(`../api`);

const articlesRouter = new Router();
const api = getAPI();

articlesRouter.get(`/category/:id`, (req, res) => res.render(`publications-by-category`));
articlesRouter.get(`/add`, (req, res) => res.render(`admin/add-new-post-empty`));

articlesRouter.get(`/edit/:id`, async (req, res) => {
  const {id} = req.params;
  const [article, categories] = await Promise.all([
    api.getArticle(id),
    api.getCategories(),
  ]);

  res.render(`admin/edit`, {article, categories});
});

articlesRouter.get(`/:id`, (req, res) => res.render(`post`));

module.exports = articlesRouter;
