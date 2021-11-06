'use strict';

const Joi = require(`joi`);
const {
  UserKey,
  StringSchemaAlias,
} = require(`../enums`);

const MIN_PASSWORD_LENGTH = 6;
const NAME_PATTERN = /^[A-Za-z]+$/;

const RegisterMessage = {
  FIRST_NAME: `Имя содержит некорректные символы`,
  LAST_NAME: `Фамилия содержит некорректные символы`,
  EMAIL: `Некорректный электронный адрес`,
  PASSWORD: `Пароль содержит меньше ${MIN_PASSWORD_LENGTH}-ти символов`,
  PASSWORD_REPEATED: `Пароли не совпадают`,
};

const userSchema = Joi.object({
  [UserKey.EMAIL]: Joi
    .string()
    .email()
    .required()
    .messages({
      [StringSchemaAlias.EMAIL]: RegisterMessage.EMAIL
    }),

  [UserKey.FIRST_NAME]: Joi
    .string()
    .pattern(NAME_PATTERN)
    .required()
    .messages({
      [StringSchemaAlias.PATTERN_BASE]: RegisterMessage.FIRST_NAME
    }),

  [UserKey.LAST_NAME]: Joi
    .string()
    .pattern(NAME_PATTERN)
    .required()
    .messages({
      [StringSchemaAlias.PATTERN_BASE]: RegisterMessage.LAST_NAME
    }),

  [UserKey.PASSWORD]: Joi
    .string()
    .min(MIN_PASSWORD_LENGTH)
    .required()
    .messages({
      [StringSchemaAlias.MIN]: RegisterMessage.PASSWORD
    }),

  [UserKey.PASSWORD_REPEATED]: Joi
    .string()
    .min(MIN_PASSWORD_LENGTH)
    .valid(Joi.ref(UserKey.PASSWORD))
    .required()
    .messages({
      [StringSchemaAlias.MIN]: RegisterMessage.PASSWORD_REPEATED
    }),

  [UserKey.AVATAR]: Joi
    .string()
    .allow(null)
    .required(),

});

module.exports = {
  userSchema,
};
