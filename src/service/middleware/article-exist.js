'use strict';

const {HttpStatusCode} = require(`../../common/enums`);

module.exports = (service) => async (req, res, next) => {
  const {articleId} = req.params;
  const article = await service.findOne(articleId);

  if (!article) {
    return res.status(HttpStatusCode.NOT_FOUND).send(`Article with id "${articleId}" not found!`);
  }

  res.locals.article = article;
  return next();
};
