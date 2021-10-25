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

const api = new Router();
defineModels(sequelize);

(async () => {
  await articles(api, new ArticleService(sequelize), new CommentService(sequelize));
  await categories(api, new ArticleService(sequelize), new CategoryService(sequelize));
  await search(api, new SearchService(sequelize));
})();

module.exports = api;
