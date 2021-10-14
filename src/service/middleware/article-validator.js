'use strict';

const {PublicationKey, HttpStatusCode} = require(`../../constants`);

const requiredKeys = [
  PublicationKey.TITLE,
  PublicationKey.CREATED_DATE,
  PublicationKey.ANNOUNCE,
  PublicationKey.CATEGORIES,
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
