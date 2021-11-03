'use strict';

const {Router} = require(`express`);
const {
  validateRouteParams,
  validateSchema,
} = require(`../middlewares`);
const {
  ApiUrl,
  ApiCategoriesRoute,
  HttpStatusCode,
} = require(`../../common/enums`);
const {categorySchema} = require(`../../common/schemas`);

module.exports = (app, articleService, categoryService) => {
  const route = new Router();
  app.use(ApiUrl.CATEGORIES, route);

  route.get(ApiCategoriesRoute.MAIN, async (req, res) => {
    const categories = await categoryService.findAll(req.query.needCount);
    res.status(HttpStatusCode.OK).json(categories);
  });

  route.post(
      ApiCategoriesRoute.MAIN,
      validateSchema(categorySchema),
      async (req, res) => {
        const category = await categoryService.create(req.body);
        res.status(HttpStatusCode.OK).json(category);
      }
  );

  route.get(
      ApiCategoriesRoute.$CATEGORY,
      validateRouteParams,
      async (req, res) => {
        const category = await categoryService.findOne(req.params.categoryId);
        res.status(HttpStatusCode.OK).json(category);
      }
  );

  route.get(
      ApiCategoriesRoute.$CATEGORY_ARTICLES,
      validateRouteParams,
      async (req, res) => {
        const {categoryId} = req.params;
        const {limit, offset} = req.query;

        const articles = await articleService.findAllByCategory({
          categoryId,
          limit,
          offset,
        });

        res.status(HttpStatusCode.OK).json(articles);
      }
  );
};
