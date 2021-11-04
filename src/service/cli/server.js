'use strict';

const express = require(`express`);
const api = require(`../api`);
const sequelize = require(`../libs/sequelize`);
const {
  API_PREFIX,
  API_PORT,
} = require(`../../common/constants`);
const {
  LoggerName,
  HttpStatusCode,
  CliCommand,
  ExitCode,
} = require(`../../common/enums`);
const {getLogger} = require(`../../common/libs/logger`);

const logger = getLogger({
  name: LoggerName.API,
});

const app = express();
app.use(express.urlencoded({extended: false}));
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
  res.status(HttpStatusCode.NOT_FOUND).send(`404 - Not Found`);
});

app.use((err, _req, _res, _next) => {
  logger.error(`An error occurred on processing request: ${err.message}`);
});

module.exports = {
  name: CliCommand.SERVER,
  async run(args) {
    try {
      logger.info(`Trying to connect to database...`);
      await sequelize.authenticate();
    } catch (err) {
      logger.error(`An error occurred: ${err.message}`);
      process.exit(ExitCode.ERROR);
    }
    logger.info(`Connection to database established`);

    const [userPort] = args;
    const port = Number.parseInt(userPort, 10) || process.env.API_PORT || API_PORT;

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
