'use strict';

const {
  HttpStatusCode,
  CategoryKey,
} = require(`../../common/enums`);
const {getError} = require(`../../common/helpers`);

const ERROR_MESSAGE = `Категория не может быть удалена, если ей принадлежит хотя бы одна публикация`;

module.exports = (service) => async (req, res, next) => {
  const {categoryId} = req.params;
  const {count} = await service.findAllByCategory({categoryId});

  if (count) {
    return res.status(HttpStatusCode.BAD_REQUEST).json([getError(CategoryKey.NAME, ERROR_MESSAGE)]);
  }

  return next();
};
