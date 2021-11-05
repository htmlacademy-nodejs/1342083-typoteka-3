'use strict';

const {getLogger} = require(`../../common/libs/logger`);
const {
  HttpStatusCode,
  LoggerName,
} = require(`../../common/enums`);
const {assembleErrorsSimple} = require(`../../common/helpers`);
const {routeParamsSchema} = require(`../../common/schemas`);

const logger = getLogger({
  name: LoggerName.API,
});

module.exports = (req, res, next) => {
  const {error} = routeParamsSchema.validate(req.params, {
    abortEarly: false,
  });

  if (error) {
    const errors = assembleErrorsSimple(error);
    logger.warn(errors);
    return res.status(HttpStatusCode.BAD_REQUEST).send(errors);
  }

  return next();
};
