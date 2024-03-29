'use strict';

const Joi = require(`joi`);
const {
  AnySchemaAlias,
  ArraySchemaAlias,
  ArticleAnnounceSizeRestrict,
  ArticleCategoriesSizeRestrict,
  ArticleFullTextSizeRestrict,
  ArticleKey,
  ArticleTitleSizeRestrict,
  NumberSchemaAlias,
  StringSchemaAlias,
} = require(`../../common/enums`);

const REQUIRED_MESSAGE = `Обязательное поле`;

const TitleMessage = {
  MIN: `Заголовок содержит меньше ${ArticleTitleSizeRestrict.MIN} символов`,
  MAX: `Заголовок содержит больше ${ArticleTitleSizeRestrict.MAX} символов`,
  EMPTY: `Не заполнен заголовок`,
};

const AnnounceMessage = {
  MIN: `Анонс содержит меньше ${ArticleAnnounceSizeRestrict.MIN} символов`,
  MAX: `Анонс содержит больше ${ArticleAnnounceSizeRestrict.MAX} символов`,
  EMPTY: `Не заполнен анонс`,
};

const FullTextMessage = {
  MAX: `Основной текст содержит больше ${ArticleFullTextSizeRestrict.MAX} символов`,
};

const CategoriesMessage = {
  MIN: `Нужно выбрать минимум ${ArticleCategoriesSizeRestrict.MIN} категорию`,
};

const UserIdMessage = {
  BASE: `Некорректный идентификатор пользователя`,
};

const articleSchema = Joi.object({
  [ArticleKey.TITLE]: Joi
    .string()
    .min(ArticleTitleSizeRestrict.MIN)
    .max(ArticleTitleSizeRestrict.MAX)
    .required()
    .messages({
      [StringSchemaAlias.MIN]: TitleMessage.MIN,
      [StringSchemaAlias.MAX]: TitleMessage.MAX,
      [StringSchemaAlias.EMPTY]: TitleMessage.EMPTY,
      [AnySchemaAlias.REQUIRED]: REQUIRED_MESSAGE,
    }),

  [ArticleKey.PICTURE]: Joi
    .string()
    .allow(null)
    .required(),

  [ArticleKey.CREATED_DATE]: Joi
    .string()
    .isoDate()
    .required(),

  [ArticleKey.ANNOUNCE]: Joi
    .string()
    .min(ArticleAnnounceSizeRestrict.MIN)
    .max(ArticleAnnounceSizeRestrict.MAX)
    .required()
    .messages({
      [StringSchemaAlias.MIN]: AnnounceMessage.MIN,
      [StringSchemaAlias.MAX]: AnnounceMessage.MAX,
      [StringSchemaAlias.EMPTY]: AnnounceMessage.EMPTY,
      [AnySchemaAlias.REQUIRED]: REQUIRED_MESSAGE,
    }),

  [ArticleKey.FULL_TEXT]: Joi
    .string()
    .max(ArticleFullTextSizeRestrict.MAX)
    .allow(null)
    .messages({
      [StringSchemaAlias.MAX]: FullTextMessage.MAX,
    }),

  [ArticleKey.CATEGORIES]: Joi
    .array()
    .min(ArticleCategoriesSizeRestrict.MIN)
    .required()
    .messages({
      [ArraySchemaAlias.MIN]: CategoriesMessage.MIN,
      [AnySchemaAlias.REQUIRED]: REQUIRED_MESSAGE,
    }),

  [ArticleKey.USER_ID]: Joi
    .number()
    .integer()
    .positive()
    .required()
    .messages({
      [NumberSchemaAlias.BASE]: UserIdMessage.BASE,
    }),
});

module.exports = {
  articleSchema,
};
