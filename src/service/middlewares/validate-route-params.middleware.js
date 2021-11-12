'use strict';

const {
  HttpStatusCode,
  LoggerName,
} = require(`../../common/enums`);
const {assembleErrors} = require(`../../common/helpers`);
const {getLogger} = require(`../../common/libs/logger.lib`);
const {routeParamsSchema} = require(`../../common/schemas`);

const logger = getLogger({
  name: LoggerName.API,
});

module.exports = (req, res, next) => {
  const {error} = routeParamsSchema.validate(req.params, {
    abortEarly: false,
  });

  if (error) {
    const errors = assembleErrors(error);
    logger.warn(errors);
    return res.status(HttpStatusCode.BAD_REQUEST).send(errors);
  }

  return next();
};
