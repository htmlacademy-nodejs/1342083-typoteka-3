'use strict';

const {Router} = require(`express`);
const sequelize = require(`../lib/sequelize`);
const defineModels = require(`../models`);
const articles = require(`./articles`);
const categories = require(`./categories`);
const search = require(`./search`);
const {
  ArticleService,
  CategoryService,
  CommentService,
  SearchService,
} = require(`../data-service`);

const app = new Router();
defineModels(sequelize);

(async () => {
  articles(app, new ArticleService(sequelize), new CommentService(sequelize));
  categories(app, new CategoryService(sequelize));
  search(app, new SearchService(sequelize));
})();

module.exports = app;
