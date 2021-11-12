'use strict';

const {getLogger} = require(`../common/libs/logger.lib`);
const {
  AppPage,
  HttpStatusCode,
  LoggerName,
} = require(`../common/enums`);

const logger = getLogger({name: LoggerName.APP});

const notFound = (req, res) => {
  const {user} = req.session;
  const error = HttpStatusCode.NOT_FOUND;
  logger.error(`Route ${req.url} not found`);

  res.status(HttpStatusCode.NOT_FOUND).render(AppPage.ERROR_404, {user, error});
};

const internalServerError = (err, req, res, _next) => {
  const {user} = req.session;
  const error = HttpStatusCode.INTERNAL_SERVER_ERROR;
  logger.error(err.message);

  res.status(error).render(AppPage.ERROR_500, {user, error});
};

module.exports = {
  internalServerError,
  notFound,
};


