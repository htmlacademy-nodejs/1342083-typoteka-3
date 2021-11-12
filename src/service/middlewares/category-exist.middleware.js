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
  const {categoryId} = req.params;
  const category = await service.findOne(categoryId);

  if (!category) {
    const message = `Category with id ${categoryId} not found`;
    logger.warn(message);
    return res.status(HttpStatusCode.NOT_FOUND).send(message);
  }

  return next();
};
