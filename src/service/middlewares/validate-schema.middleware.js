'use strict';

const {HttpStatusCode} = require(`../../common/enums`);
const {assembleErrors} = require(`../../common/helpers`);

module.exports = (schema) => (req, res, next) => {
  const {error} = schema.validate(req.body, {
    abortEarly: false,
  });

  if (error) {
    const message = assembleErrors(error);
    return res.status(HttpStatusCode.BAD_REQUEST).send(message);
  }

  return next();
};
