'use strict';

const articleExist = require(`./article-exist`);
const articleValidator = require(`./article-validator`);
const commentExist = require(`./comment-exist`);
const commentValidator = require(`./comment-validator`);
const validateRouteParams = require(`./validate-route-params`);
const validateSchema = require(`./validate-schema`);

module.exports = {
  articleValidator,
  articleExist,
  commentExist,
  commentValidator,
  validateRouteParams,
  validateSchema,
};
