'use strict';

const {ArticlesRoute} = require(`./articles-route.enum`);
const {CategoriesRoute} = require(`./categories-route.enum`);
const {CommentsRoute} = require(`./comments-route.enum`);
const {SearchRoute} = require(`./search-route.enum`);
const {UserRoute} = require(`./user-route.enum`);

const ApiRoute = {
  ARTICLES: ArticlesRoute.MAIN,
  ARTICLES_POPULAR: `${ArticlesRoute.MAIN}${ArticlesRoute.POPULAR}`,
  ARTICLES_$ARTICLE_ID: `${ArticlesRoute.MAIN}${ArticlesRoute.$ARTICLE_ID}`,
  ARTICLES_$ARTICLE_ID_COMMENTS: `${ArticlesRoute.MAIN}${ArticlesRoute.$ARTICLE_ID_COMMENTS}`,
  COMMENTS: CommentsRoute.MAIN,
  COMMENTS_$COMMENT: `${CommentsRoute.MAIN}${CommentsRoute.$COMMENT_ID}`,
  CATEGORIES: CategoriesRoute.MAIN,
  CATEGORIES_$CATEGORY_ID: `${CategoriesRoute.MAIN}${CategoriesRoute.$CATEGORY_ID}`,
  CATEGORIES_$CATEGORY_ID_ARTICLES: `${CategoriesRoute.MAIN}${CategoriesRoute.$CATEGORY_ID_ARTICLES}`,
  SEARCH: SearchRoute.MAIN,
  USER: UserRoute.MAIN,
  USER_AUTH: `${UserRoute.MAIN}${UserRoute.AUTH}`,
};

module.exports = {
  ApiRoute,
};
