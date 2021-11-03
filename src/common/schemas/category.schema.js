'use strict';

const Joi = require(`joi`);
const {
  CategoryKey,
  CategoryNameSizeRestrict,
  StringSchemaAlias,
} = require(`../../common/enums`);

const CategoryNameErrorMessage = {
  MIN: `Название категории содержит меньше ${CategoryNameSizeRestrict.MIN} символов`,
  MAX: `Название категории содержит больше ${CategoryNameSizeRestrict.MAX} символов`,
  EMPTY: `Название категории не может быть пустым`
};

const categorySchema = Joi.object({
  [CategoryKey.NAME]: Joi
    .string()
    .min(CategoryNameSizeRestrict.MIN)
    .max(CategoryNameSizeRestrict.MAX)
    .required()
    .messages({
      [StringSchemaAlias.MIN]: CategoryNameErrorMessage.MIN,
      [StringSchemaAlias.MAX]: CategoryNameErrorMessage.MAX,
      [StringSchemaAlias.EMPTY]: CategoryNameErrorMessage.EMPTY,
    })
});

module.exports = {
  categorySchema,
};
