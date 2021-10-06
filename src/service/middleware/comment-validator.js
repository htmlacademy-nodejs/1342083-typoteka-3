'use strict';

const {CommentKey, HttpStatusCode} = require(`../../constants`);

module.exports = (req, res, next) => {
  const comment = req.body;

  if (!comment[CommentKey.TEXT]) {
    return res.status(HttpStatusCode.BAD_REQUEST).send(`Bad request`);
  }

  return next();
};
