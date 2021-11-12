'use strict';

const MainRoute = {
  MAIN: `/`,
  REGISTER: `/register`,
  LOGIN: `/login`,
  LOGOUT: `/logout`,
  NOT_FOUND: `/400`,
  INTERNAL_SERVER_ERROR: `/500`,
  CATEGORIES: `/categories`,
  SEARCH: `/search`,
  CATEGORIES_$ID: `/categories/:categoryId`,
};

module.exports = {
  MainRoute,
};
