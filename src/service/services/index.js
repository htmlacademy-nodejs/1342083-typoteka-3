'use strict';

const ArticleService = require(`./article.service`);
const CategoryService = require(`./category.service`);
const CommentService = require(`./comment.service`);
const SearchService = require(`./search.service`);
const UserService = require(`./user.service`);

module.exports = {
  ArticleService,
  CategoryService,
  CommentService,
  SearchService,
  UserService,
};
