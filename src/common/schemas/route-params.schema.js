'use strict';

const Joi = require(`joi`);
const {
  NumberSchemaAlias,
  RouteParam,
} = require(`../enums`);

const ArticleIdErrorMessage = {
  BASE: `Article id must be a number`,
  MIN: `Article id must be greater than or equal to 1`,
};

const CategoryIdErrorMessage = {
  BASE: `Category id must be a number`,
  MIN: `Category id must be greater than or equal to 1`,
};

const CommentIdErrorMessage = {
  BASE: `Comment id must be a number`,
  MIN: `Comment id must be greater than or equal to 1`,
};

const routeParamsSchema = Joi.object({
  [RouteParam.ARTICLE_ID]: Joi
    .number()
    .integer()
    .min(1)
    .messages({
      [NumberSchemaAlias.BASE]: ArticleIdErrorMessage.BASE,
      [NumberSchemaAlias.MIN]: ArticleIdErrorMessage.MIN,
    }),
  [RouteParam.CATEGORY_ID]: Joi
    .number()
    .integer()
    .min(1)
    .messages({
      [NumberSchemaAlias.BASE]: CategoryIdErrorMessage.BASE,
      [NumberSchemaAlias.MIN]: CategoryIdErrorMessage.MIN,
    }),
  [RouteParam.COMMENT_ID]: Joi
    .number()
    .integer()
    .min(1)
    .messages({
      [NumberSchemaAlias.BASE]: CommentIdErrorMessage.BASE,
      [NumberSchemaAlias.MIN]: CommentIdErrorMessage.MIN,
    }),
});

module.exports = {
  routeParamsSchema,
};
