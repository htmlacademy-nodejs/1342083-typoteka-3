'use strict';

const Sequelize = require(`sequelize`);
const {DEFAULT_DB_DIALECT} = require(`../../common/constants`);
const {LogLevel} = require(`../../common/enums`);
const {
  DB_HOST,
  DB_PORT,
  DB_NAME,
  DB_USER,
  DB_PASSWORD,
  DB_DIALECT,
  LOG_LEVEL,
} = process.env;

const somethingIsNotDefined = [
  DB_HOST,
  DB_PORT,
  DB_NAME,
  DB_USER,
  DB_PASSWORD,
].some((variable) => variable === undefined);

if (somethingIsNotDefined) {
  throw new Error(`One or more environmental variables are not defined`);
}

module.exports = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
  host: DB_HOST,
  port: DB_PORT,
  dialect: DB_DIALECT || DEFAULT_DB_DIALECT,
  pool: {
    min: 0,
    max: 5,
    acquire: 10000,
    idle: 10000
  },
  logging: LOG_LEVEL === LogLevel.DEBUG,
});
