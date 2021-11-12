'use strict';

const {Router} = require(`express`);
const {
  CategoriesRoute,
  HttpStatusCode,
} = require(`../../common/enums`);
const {
  categoryExist,
  categoryIsNotEmpty,
  validateRouteParams,
  categoryValidator,
} = require(`../middlewares`);

const categoriesRouter = (app, articleService, categoryService) => {
  const router = new Router();
  const updateCategoryMiddlewares = [validateRouteParams, categoryExist(categoryService), categoryValidator];
  const deleteCategoryMiddlewares = [
    validateRouteParams,
    categoryExist(categoryService),
    categoryIsNotEmpty(articleService),
  ];
  const getArticlesByCategoryMiddlewares = [validateRouteParams, categoryExist(categoryService)];

  app.use(CategoriesRoute.MAIN, router);

  router.get(CategoriesRoute.ROOT, async (req, res) => {
    const categories = await categoryService.findAll(req.query.needCount);
    res.status(HttpStatusCode.OK).json(categories);
  });

  router.post(CategoriesRoute.ROOT, categoryValidator, async (req, res) => {
    const category = await categoryService.create(req.body);
    res.status(HttpStatusCode.OK).json(category);
  });

  router.get(CategoriesRoute.$CATEGORY_ID, [validateRouteParams, categoryExist(categoryService)], async (req, res) => {
    const category = await categoryService.findOne(req.params.categoryId);
    res.status(HttpStatusCode.OK).json(category);
  });

  router.put(CategoriesRoute.$CATEGORY_ID, updateCategoryMiddlewares, async (req, res) => {
    const category = await categoryService.update(req.params.categoryId, req.body);
    res.status(HttpStatusCode.OK).json(category);
  });

  router.delete(CategoriesRoute.$CATEGORY_ID, deleteCategoryMiddlewares, async (req, res) => {
    const {categoryId} = req.params;
    const category = await categoryService.drop(categoryId);

    return res.status(HttpStatusCode.OK).json(category);
  });

  router.get(CategoriesRoute.$CATEGORY_ID_ARTICLES, getArticlesByCategoryMiddlewares, async (req, res) => {
    const {categoryId} = req.params;
    const {limit, offset} = req.query;

    const articles = await articleService.findAllByCategory({
      categoryId,
      limit,
      offset,
    });

    res.status(HttpStatusCode.OK).json(articles);
  });
};

module.exports = {
  categoriesRouter,
};
