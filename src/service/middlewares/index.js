'use strict';

const articleExist = require(`./article-exist.middleware`);
const articleValidator = require(`./article-validator.middleware`);
const categoryExist = require(`./category-exist.middleware`);
const categoryIsNotEmpty = require(`./category-is-not-empty.middleware`);
const categoryValidator = require(`./category-validator.middleware`);
const commentExist = require(`./comment-exist.middleware`);
const commentValidator = require(`./comment-validator.middleware`);
const userValidator = require(`./user-validator.middleware`);
const validateRouteParams = require(`./validate-route-params.middleware`);
const validateSchema = require(`./validate-schema.middleware`);

module.exports = {
  articleExist,
  articleValidator,
  categoryExist,
  categoryIsNotEmpty,
  categoryValidator,
  commentExist,
  commentValidator,
  userValidator,
  validateRouteParams,
  validateSchema,
};
