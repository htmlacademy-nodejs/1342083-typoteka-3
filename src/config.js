'use strict';

const dotenv = require(`dotenv`);
dotenv.config();

module.exports = {
  LOG_LEVEL: process.env.LOG_LEVEL,
  NODE_ENV: process.env.NODE_ENV,
};
