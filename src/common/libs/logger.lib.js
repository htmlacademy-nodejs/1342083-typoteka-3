'use strict';

const pino = require(`pino`);
const {LOG_FILE} = require(`../constants`);
const {
  EnvMode,
  LogLevel,
  LoggerName,
} = require(`../enums`);

const isDevMode = process.env.NODE_ENV === EnvMode.DEVELOPMENT;
const defaultLogLevel = isDevMode ? LogLevel.INFO : LogLevel.ERROR;

const logger = pino({
  name: LoggerName.BASE_LOGGER,
  level: process.env.LOG_LEVEL || defaultLogLevel,
  prettyPrint: true,
}, isDevMode ? process.stdout : pino.destination(LOG_FILE));

module.exports = {
  logger,
  getLogger(options = {}) {
    return logger.child(options);
  }
};
