'use strict';

const ArticlesRoute = {
  MAIN: `/articles`,
  ROOT: `/`,
  $ARTICLE_ID: `/:articleId`,
  $ARTICLE_ID_COMMENTS: `/:articleId/comments`,
  CATEGORY_$CATEGORY_ID: `/category/:categoryId`,
  ADD: `/add`,
  EDIT_$ARTICLE_ID: `/edit/:articleId`,
  HOT: `/popular`,
};

module.exports = {
  ArticlesRoute,
};
