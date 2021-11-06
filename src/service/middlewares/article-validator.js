'use strict';

const {
  HttpStatusCode,
  LoggerName,
} = require(`../../common/enums`);
const {
  assembleErrorsSimple,
  assembleErrorsExtended,
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
    logger.warn(assembleErrorsSimple(error));
    const errors = assembleErrorsExtended(error);
    return res.status(HttpStatusCode.BAD_REQUEST).send(errors);
  }

  return next();
};
