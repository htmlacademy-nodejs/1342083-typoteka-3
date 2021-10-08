'use strict';

const {ArticleKey, HttpStatusCode} = require(`../../constants`);

const requiredKeys = [
  ArticleKey.TITLE,
  ArticleKey.CREATED_DATE,
  ArticleKey.ANNOUNCE,
  ArticleKey.CATEGORIES,
];

module.exports = (req, res, next) => {
  const newArticle = req.body;
  const keys = Object.keys(newArticle);
  const keysExists = requiredKeys.every((key) => keys.includes(key) && newArticle[key].length);

  if (!keysExists) {
    return res.status(HttpStatusCode.BAD_REQUEST).send(`Bad request`);
  }

  return next();
};
