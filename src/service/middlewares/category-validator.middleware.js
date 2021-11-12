'use strict';

const {HttpStatusCode} = require(`../../common/enums`);
const {assembleErrors} = require(`../../common/helpers`);
const {categorySchema} = require(`../../common/schemas`);

module.exports = (req, res, next) => {
  const {error} = categorySchema.validate(req.body, {
    abortEarly: false,
  });

  if (error) {
    const errors = assembleErrors(error);
    return res.status(HttpStatusCode.BAD_REQUEST).send(errors);
  }

  return next();
};
