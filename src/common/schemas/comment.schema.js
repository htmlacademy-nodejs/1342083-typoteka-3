'use strict';

const Joi = require(`joi`);
const {
  CommentKey,
  StringSchemaAlias,
} = require(`../../common/enums`);

const COMMENT_MIN_LENGTH = 20;

const CommentErrorMessage = {
  TEXT: `Комментарий содержит меньше 20 символов`,
};

const commentSchema = Joi.object({
  [CommentKey.TEXT]: Joi
    .string()
    .min(COMMENT_MIN_LENGTH)
    .required()
    .messages({
      [StringSchemaAlias.MIN]: CommentErrorMessage.TEXT,
    })
});

module.exports = {
  commentSchema,
};
