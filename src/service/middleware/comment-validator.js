'use strict';

const {
  CommentKey,
  HttpStatusCode,
} = require(`../../common/enums`);

module.exports = (req, res, next) => {
  const comment = req.body;

  if (!comment[CommentKey.TEXT]) {
    return res.status(HttpStatusCode.BAD_REQUEST).send(`Bad request`);
  }

  return next();
};
