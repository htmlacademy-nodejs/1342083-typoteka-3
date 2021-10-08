'use strict';

const APP_PORT = 8080;

const AppPage = {
  ADMIN_ARTICLE: `pages/admin/article`,
  ADMIN_ARTICLES: `pages/admin/articles`,
  ADMIN_CATEGORIES: `pages/admin/categories`,
  ADMIN_COMMENTS: `pages/admin/comments`,
  ARTICLE: `pages/article`,
  CATEGORY: `pages/category`,
  ERROR_404: `pages/errors/404`,
  ERROR_500: `pages/errors/500`,
  LOGIN: `pages/login`,
  MAIN: `pages/main`,
  REGISTER: `pages/register`,
  SEARCH: `pages/search`,
};

const AppPath = {
  VIEWS_PATH: `templates`,
  PUBLIC_PATH: `public`,
  UPLOAD_PATH: `upload`,
};

const AppRoute = {
  MAIN: `/`,
  MY: `/my`,
  ARTICLES: `/articles`,
};

const ArticleRoute = {
  ADD: `/add`,
  ARTICLE: `/:id`,
  EDIT: `/edit/:id`,
  MAIN: `/`,
  CATEGORY: `/category/:id`,
};

const FormKey = {
  ANNOUNCE: `announcement`,
  CATEGORIES: `category`,
  CREATED_DATE: `date`,
  FULL_TEXT: `full-text`,
  PICTURE: `filename`,
  TITLE: `title`,
  UPLOAD: `upload`,
};

const MainRoute = {
  CATEGORIES: `/categories`,
  INTERNAL_SERVER_ERROR: `/500`,
  LOGIN: `/login`,
  LOGOUT: `/logout`,
  MAIN: `/`,
  NOT_FOUND: `/404`,
  REGISTER: `/register`,
  SEARCH: `/search`,
};

const MyRoute = {
  MAIN: `/`,
  COMMENTS: `/comments`,
};

module.exports = {
  APP_PORT,
  AppPage,
  AppRoute,
  AppPath,
  ArticleRoute,
  FormKey,
  MainRoute,
  MyRoute,
};
