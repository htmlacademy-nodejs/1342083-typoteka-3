'use strict';

const dotenv = require(`dotenv`);
const dotenvExpand = require(`dotenv-expand`);

const myEnv = dotenv.config();
dotenvExpand(myEnv);

module.exports = {
  DB_HOST: process.env.DB_HOST,
  DB_PORT: process.env.DB_PORT,
  DB_NAME: process.env.DB_NAME,
  DB_USER: process.env.DB_USER,
  DB_PASSWORD: process.env.DB_PASSWORD,
  LOG_LEVEL: process.env.LOG_LEVEL,
  NODE_ENV: process.env.NODE_ENV,
};
