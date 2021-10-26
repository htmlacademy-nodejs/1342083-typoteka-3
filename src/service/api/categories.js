'use strict';

const {Router} = require(`express`);
const {
  ApiUrl,
  ApiCategoriesRoute,
  HttpStatusCode,
} = require(`../../common/enums`);

module.exports = (app, articleService, categoryService) => {
  const route = new Router();
  app.use(ApiUrl.CATEGORIES, route);

  route.get(ApiCategoriesRoute.MAIN, async (req, res) => {
    const {count} = req.query;
    const categories = await categoryService.findAll(count);
    res.status(HttpStatusCode.OK).json(categories);
  });

  route.get(ApiCategoriesRoute.CATEGORY, async (req, res) => {
    const {categoryId} = req.params;
    const category = await categoryService.findOne(categoryId);
    res.status(HttpStatusCode.OK).json(category);
  });

  route.get(ApiCategoriesRoute.ARTICLES, async (req, res) => {
    const {
      categoryId,
    } = req.params;

    const {
      limit,
      offset,
    } = req.query;

    const articles = await articleService.findAllByCategory({
      categoryId,
      limit,
      offset,
    });

    res.status(HttpStatusCode.OK).json(articles);
  });
};
