'use strict';

const {ArticlesRoute} = require(`./articles-route.enum`);
const {MainRoute} = require(`./main-route.enum`);
const {MyRoute} = require(`./my-route.enum`);

const AppRoute = {
  MAIN: MainRoute.MAIN,
  REGISTER: MainRoute.REGISTER,
  LOGIN: MainRoute.LOGIN,
  LOGOUT: MainRoute.LOGOUT,
  ARTICLES: ArticlesRoute.MAIN,
  ARTICLES_$ARTICLE_ID: `${ArticlesRoute.MAIN}${ArticlesRoute.$ARTICLE_ID}`,
  ARTICLES_CATEGORY_$CATEGORY_ID: `${ArticlesRoute.MAIN}${ArticlesRoute.CATEGORY_$CATEGORY_ID}`,
  NOT_FOUND: MainRoute.NOT_FOUND,
  INTERNAL_SERVER_ERROR: MainRoute.INTERNAL_SERVER_ERROR,
  ARTICLES_ADD: `${ArticlesRoute.MAIN}${ArticlesRoute.ADD}`,
  ARTICLES_EDIT_$ARTICLE_ID: `${ArticlesRoute.MAIN}${ArticlesRoute.EDIT_$ARTICLE_ID}`,
  MY: MyRoute.MAIN,
  MY_$ARTICLE_ID: `${MyRoute.MAIN}${MyRoute.$ARTICLE_ID}`,
  MY_COMMENTS_$COMMENT_ID: `${MyRoute.MAIN}${MyRoute.COMMENTS_$COMMENT_ID}`,
  CATEGORIES: MainRoute.CATEGORIES,
  COMMENTS: `${MyRoute.MAIN}${MyRoute.COMMENTS}`,
  SEARCH: MainRoute.SEARCH,
};

module.exports = {
  AppRoute,
};
