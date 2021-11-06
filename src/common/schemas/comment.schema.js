'use strict';

const Joi = require(`joi`);
const {
  CommentKey,
  NumberSchemaAlias,
  StringSchemaAlias,
} = require(`../../common/enums`);

const COMMENT_MIN_LENGTH = 20;

const CommentErrorMessage = {
  TEXT: `Комментарий содержит меньше 20 символов`,
  USER_ID: `Некорректный идентификатор пользователя`,
};

const commentSchema = Joi.object({
  [CommentKey.TEXT]: Joi
    .string()
    .min(COMMENT_MIN_LENGTH)
    .required()
    .messages({
      [StringSchemaAlias.MIN]: CommentErrorMessage.TEXT,
    }),

  [CommentKey.USER_ID]: Joi
    .number()
    .integer()
    .positive()
    .required()
    .messages({
      [NumberSchemaAlias.BASE]: CommentErrorMessage.USER_ID
    }),
});

module.exports = {
  commentSchema,
};
