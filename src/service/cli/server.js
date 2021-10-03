'use strict';

const express = require(`express`);
const api = require(`../api`);
const {getLogger} = require(`../lib/logger`);
const {
  API_PREFIX,
  CliCommand,
  ExitCode,
  HttpStatusCode,
} = require(`../../constants`);

const DEFAULT_PORT = 3000;
const NOT_FOUND_TEXT = `404 - Not Found`;

const app = express();
app.use(express.json());

app.use((req, res, next) => {
  logger.debug(`Request on route ${req.url}`);
  res.on(`finish`, () => {
    logger.info(`Response status code ${res.statusCode}`);
  });
  next();
});

app.use(API_PREFIX, api);

app.use((req, res) => {
  logger.error(`Route not found: ${req.url}`);
  res.status(HttpStatusCode.NOT_FOUND).send(NOT_FOUND_TEXT);
});

app.use((err, _req, _res, _next) => {
  logger.error(`An error occurred on processing request: ${err.message}`);
});

const logger = getLogger({
  name: `api`,
});

module.exports = {
  name: CliCommand.SERVER,
  async run(args) {
    const [userPort] = args;
    const port = Number.parseInt(userPort, 10) || DEFAULT_PORT;

    try {
      app.listen(port, (err) => {
        if (err) {
          return logger.error(`An error occured on server creation: ${err.message}`);
        }

        return logger.info(`Listening to connections on ${port}`);
      });

    } catch (err) {
      logger.error(`An error occured: ${err.message}`);
      process.exit(ExitCode.ERROR);
    }
  },
};
