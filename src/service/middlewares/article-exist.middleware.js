'use strict';

const {
  HttpStatusCode,
  LoggerName,
} = require(`../../common/enums`);
const {getLogger} = require(`../../common/libs/logger.lib`);

const logger = getLogger({
  name: LoggerName.API,
});

module.exports = (service) => async (req, res, next) => {
  const {articleId} = req.params;
  const article = await service.findOne(articleId);

  if (!article) {
    const message = `Article with id ${articleId} not found`;
    logger.warn(message);
    return res.status(HttpStatusCode.NOT_FOUND).send(message);
  }

  return next();
};
