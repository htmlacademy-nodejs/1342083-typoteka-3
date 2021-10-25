'use strict';

const ApiArticlesRoute = {
  MAIN: `/`,
  POPULAR: `/popular`,
  COMMENTS: `/comments`,
  $ARTICLE: `/:articleId`,
  $ARTICLE_COMMENTS: `/:articleId/comments`,
  $ARTICLE_$COMMENT: `/:articleId/comments/:commentId`,
};

module.exports = {
  ApiArticlesRoute,
};
