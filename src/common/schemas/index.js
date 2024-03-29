'use strict';

const {articleSchema} = require(`./article.schema`);
const {categorySchema} = require(`./category.schema`);
const {commentSchema} = require(`./comment.schema`);
const {routeParamsSchema} = require(`./route-params.schema`);
const {userSchema} = require(`./user.schema`);

module.exports = {
  articleSchema,
  categorySchema,
  commentSchema,
  routeParamsSchema,
  userSchema,
};
