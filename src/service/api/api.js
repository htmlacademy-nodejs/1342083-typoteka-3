'use strict';

const {Router} = require(`express`);
const sequelize = require(`../libs/sequelize`);
const defineModels = require(`../models`);
const articles = require(`./articles`);
const categories = require(`./categories`);
const search = require(`./search`);
const users = require(`./users`);
const {
  ArticleService,
  CategoryService,
  CommentService,
  SearchService,
  UserService,
} = require(`../data-services`);

const api = new Router();
defineModels(sequelize);

(async () => {
  await articles(api, new ArticleService(sequelize), new CommentService(sequelize));
  await categories(api, new ArticleService(sequelize), new CategoryService(sequelize));
  await search(api, new SearchService(sequelize));
  await users(api, new UserService(sequelize));
})();

module.exports = api;
