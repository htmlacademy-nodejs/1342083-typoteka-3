'use strict';

const Joi = require(`joi`);
const {
  UserKey,
  StringSchemaAlias,
  AnySchemaAlias,
} = require(`../enums`);

const MIN_PASSWORD_LENGTH = 6;
const NAME_PATTERN = /^[A-Za-z]+$/;

const EmailMessage = {
  EMPTY: `Укажите электронный адрес`,
  EMAIL: `Некорректный электронный адрес`,
};

const FirstNameMessage = {
  EMPTY: `Укажите имя`,
  PATTERN_BASE: `Имя содержит некорректные символы`,
};

const LastNameMessage = {
  EMPTY: `Укажите фамилию`,
  PATTERN_BASE: `Фамилия содержит некорректные символы`,
};

const PasswordMessage = {
  EMPTY: `Укажите пароль`,
  MIN: `Пароль содержит меньше ${MIN_PASSWORD_LENGTH}-ти символов`,
};

const PasswordRepeatedMessage = {
  EMPTY: `Повторите пароль`,
  MIN: `Повторный пароль содержит меньше ${MIN_PASSWORD_LENGTH}-ти символов`,
  ONLY: `Пароли не совпадают`,
};

const userSchema = Joi.object({
  [UserKey.EMAIL]: Joi
    .string()
    .email()
    .required()
    .messages({
      [StringSchemaAlias.EMPTY]: EmailMessage.EMPTY,
      [StringSchemaAlias.EMAIL]: EmailMessage.EMAIL,
    }),

  [UserKey.FIRST_NAME]: Joi
    .string()
    .pattern(NAME_PATTERN)
    .required()
    .messages({
      [StringSchemaAlias.EMPTY]: FirstNameMessage.EMPTY,
      [StringSchemaAlias.PATTERN_BASE]: FirstNameMessage.PATTERN_BASE,
    }),

  [UserKey.LAST_NAME]: Joi
    .string()
    .pattern(NAME_PATTERN)
    .required()
    .messages({
      [StringSchemaAlias.EMPTY]: LastNameMessage.EMPTY,
      [StringSchemaAlias.PATTERN_BASE]: LastNameMessage.PATTERN_BASE,
    }),

  [UserKey.PASSWORD]: Joi
    .string()
    .min(MIN_PASSWORD_LENGTH)
    .required()
    .messages({
      [StringSchemaAlias.EMPTY]: PasswordMessage.EMPTY,
      [StringSchemaAlias.MIN]: PasswordMessage.MIN,
    }),

  [UserKey.PASSWORD_REPEATED]: Joi
    .string()
    .min(MIN_PASSWORD_LENGTH)
    .required()
    .valid(Joi.ref(UserKey.PASSWORD))
    .required()
    .messages({
      [StringSchemaAlias.EMPTY]: PasswordRepeatedMessage.EMPTY,
      [StringSchemaAlias.MIN]: PasswordRepeatedMessage.MIN,
      [AnySchemaAlias.ONLY]: PasswordRepeatedMessage.ONLY,
    }),

  [UserKey.AVATAR]: Joi
    .string()
    .allow(null)
    .required(),

});

module.exports = {
  userSchema,
};
