'use strict';

const {
  HttpStatusCode,
  LoggerName,
} = require(`../../common/enums`);
const {assembleErrors} = require(`../../common/helpers`);
const {getLogger} = require(`../../common/libs/logger.lib`);
const {commentSchema} = require(`../../common/schemas`);

const logger = getLogger({
  name: LoggerName.API,
});

module.exports = (req, res, next) => {
  const {error} = commentSchema.validate(req.body, {
    abortEarly: false,
  });

  if (error) {
    const message = assembleErrors(error);
    logger.warn(message);
    return res.status(HttpStatusCode.BAD_REQUEST).send(message);
  }

  return next();
};
