'use strict';

const {
  API_PORT,
  API_PREFIX,
  TIMEOUT,
  API_URL,
} = require(`./api.constants`);
const {
  APP_PORT,
} = require(`./app.constants`);
const {
  ARGV_SPLIT_INDEX,
} = require(`./cli.constants`);
const {
  DEFAULT_ENCODING,
} = require(`./fs.constants`);
const {
  MAX_ID_LENGTH,
} = require(`./id.constants`);
const {
  LOG_FILE,
} = require(`./logger.constants`);
const {
  FULL_TEXT_MIN_SIZE,
  PICTURES,
} = require(`./mock.constants`);
const {
  RANDOM_SEPARATOR,
} = require(`./random.constants`);
const {
  FILE_TYPES,
  RANDOM_NAME_LENGTH,
  UPLOAD_DIR,
} = require(`./storage.constants`);
const {
  LENGTH_TO_TRUNCATE,
} = require(`./various.constants`);

module.exports = {
  API_PORT,
  API_PREFIX,
  TIMEOUT,
  API_URL,
  APP_PORT,
  ARGV_SPLIT_INDEX,
  DEFAULT_ENCODING,
  MAX_ID_LENGTH,
  LOG_FILE,
  FULL_TEXT_MIN_SIZE,
  PICTURES,
  RANDOM_SEPARATOR,
  FILE_TYPES,
  RANDOM_NAME_LENGTH,
  UPLOAD_DIR,
  LENGTH_TO_TRUNCATE,
};
