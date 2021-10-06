'use strict';

const {CommentKey, HttpStatusCode} = require(`../../constants`);

const requiredKeys = [
  CommentKey.TEXT,
  CommentKey.CREATED_DATE,
];

module.exports = (req, res, next) => {
  const comment = req.body;
  const keys = Object.keys(comment);
  const keysExists = requiredKeys.every((key) => keys.includes(key));

  if (!keysExists) {
    return res.status(HttpStatusCode.BAD_REQUEST).send(`Bad request`);
  }

  return next();
};
