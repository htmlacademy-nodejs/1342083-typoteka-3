'use strict';

const {Router} = require(`express`);
const sequelize = require(`../common/libs/sequelize.lib`);
const {
  ArticleService,
  CategoryService,
  CommentService,
  SearchService,
  UserService,
} = require(`./services`);
const defineModels = require(`./models`);
const {
  articlesRouter,
  categoriesRouter,
  commentsRouter,
  searchRouter,
  userRouter,
} = require(`./routers`);

const api = new Router();
defineModels(sequelize);

(async () => {
  const articleService = new ArticleService(sequelize);
  const categoryService = new CategoryService(sequelize);
  const commentsService = new CommentService(sequelize);
  const searchService = new SearchService(sequelize);
  const userService = new UserService(sequelize);

  articlesRouter(api, articleService, commentsService);
  categoriesRouter(api, articleService, categoryService);
  commentsRouter(api, commentsService);
  searchRouter(api, searchService);
  userRouter(api, userService);
})();

module.exports = {
  api,
};
