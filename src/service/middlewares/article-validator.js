'use strict';

const {
  HttpStatusCode,
  LoggerName,
} = require(`../../common/enums`);
const {
  assembleErrors,
  assembleArticleErrors,
} = require(`../../common/helpers`);
const {getLogger} = require(`../../common/libs/logger`);
const {articleSchema} = require(`../../common/schemas`);

const logger = getLogger({
  name: LoggerName.API,
});

module.exports = (req, res, next) => {
  const {error} = articleSchema.validate(req.body, {
    abortEarly: false,
  });

  if (error) {
    logger.warn(assembleErrors(error));
    const errors = assembleArticleErrors(error);
    return res.status(HttpStatusCode.BAD_REQUEST).send(errors);
  }

  return next();
};
