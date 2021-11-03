'use strict';

const {
  HttpStatusCode,
  LoggerName,
} = require(`../../common/enums`);
const {getLogger} = require(`../../common/libs/logger`);

const logger = getLogger({
  name: LoggerName.API,
});


module.exports = (service) => async (req, res, next) => {
  const {commentId} = req.params;
  const comment = await service.findOne(commentId);

  if (!comment.length) {
    const message = `Comment with id ${commentId} not found`;
    logger.warn(message);
    return res.status(HttpStatusCode.NOT_FOUND).send(message);
  }

  res.locals.comment = comment;
  return next();
};
