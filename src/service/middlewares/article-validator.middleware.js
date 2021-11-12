'use strict';

const {
  HttpStatusCode,
  LoggerName,
} = require(`../../common/enums`);
const {assembleErrors} = require(`../../common/helpers`);
const {getLogger} = require(`../../common/libs/logger.lib`);
const {articleSchema} = require(`../../common/schemas`);

const logger = getLogger({
  name: LoggerName.API,
});

module.exports = (req, res, next) => {
  const {error} = articleSchema.validate(req.body, {
    abortEarly: false,
  });

  if (error) {
    const errors = assembleErrors(error);
    logger.warn(errors);
    return res.status(HttpStatusCode.BAD_REQUEST).send(errors);
  }

  return next();
};
