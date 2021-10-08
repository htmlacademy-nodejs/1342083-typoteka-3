'use strict';

const dotenv = require(`dotenv`);
const dotenvExpand = require(`dotenv-expand`);

const myEnv = dotenv.config();
dotenvExpand(myEnv);

module.exports = {
  LOG_LEVEL: process.env.LOG_LEVEL,
  NODE_ENV: process.env.NODE_ENV,
};
