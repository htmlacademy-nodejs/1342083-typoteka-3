'use strict';

const ApiUrl = {
  ARTICLES: `/articles`,
  ARTICLES_POPULAR: `/articles/popular`,
  ARTICLES_COMMENTS: `/articles/comments`,

  ARTICLES_$ARTICLE: `/articles/:articleId`,
  ARTICLES_$ARTICLE_COMMENTS: `/articles/:articleId/comments`,

  COMMENTS: `/comments`,

  CATEGORIES: `/categories`,
  CATEGORIES_$CATEGORY: `/categories/:categoryId`,
  CATEGORIES_$CATEGORY_ARTICLES: `/categories/:categoryId/articles`,

  SEARCH: `/search`,
};

module.exports = {
  ApiUrl,
};
