'use strict';

const {
  HttpStatusCode,
  LoggerName,
} = require(`../../common/enums`);
const {assembleErrorsSimple} = require(`../../common/helpers`);
const {getLogger} = require(`../../common/libs/logger`);
const {commentSchema} = require(`../../common/schemas`);

const logger = getLogger({
  name: LoggerName.API,
});

module.exports = (req, res, next) => {
  const {error} = commentSchema.validate(req.body, {
    abortEarly: false,
  });

  if (error) {
    const message = assembleErrorsSimple(error);
    logger.warn(message);
    return res.status(HttpStatusCode.BAD_REQUEST).send(message);
  }

  return next();
};
