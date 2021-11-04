'use strict';

const AppRoute = {
  ARTICLES: `/articles`,
  ARTICLES_ADD: `/articles/add`,
  ARTICLE: `/articles/:articleId`,
  CATEGORY: `/articles/category`,
  CATEGORIES: `/categories`,
  COMMENTS: `/my/comments`,
  INTERNAL_SERVER_ERROR: `/500`,
  LOGIN: `/login`,
  LOGOUT: `/logout`,
  MAIN: `/`,
  MY: `/my`,
  NOT_FOUND: `/404`,
  SEARCH: `/search`,
  REGISTER: `/register`,
};

module.exports = {
  AppRoute,
};
