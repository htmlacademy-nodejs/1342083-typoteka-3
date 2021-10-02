'use strict';

const {Router} = require(`express`);
const articles = require(`./articles`);
const categories = require(`./categories`);
const search = require(`./search`);
const {
  ArticleService,
  CategoryService,
  CommentService,
  SearchService,
} = require(`../data-service`);
const getMockData = require(`../lib/get-mock-data`)();
const {MOCK_FILEPATH} = require(`../../constants`);

const app = new Router();

(async () => {
  const mockData = await getMockData(MOCK_FILEPATH);

  articles(app, new ArticleService(mockData), new CommentService());
  categories(app, new CategoryService(mockData));
  search(app, new SearchService(mockData));
})();

module.exports = app;
