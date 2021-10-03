'use strict';

const {HttpStatusCode} = require(`../../constants`);

module.exports = (req, res, next) => {
  const comment = req.body;

  if (!comment.text) {
    return res.status(HttpStatusCode.BAD_REQUEST).send(`Bad request`);
  }

  return next();
};
