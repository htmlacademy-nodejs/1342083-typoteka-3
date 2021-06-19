'use strict';

const CliCommand = {
  GENERATE: `--generate`,
  HELP: `--help`,
  VERSION: `--version`,
  SERVER: `--server`,
};

const DEFAULT_COMMAND = CliCommand.HELP;

const FilePath = {
  CATEGORIES: `./data/categories.txt`,
  SENTENCES: `./data/sentences.txt`,
  TITLES: `./data/titles.txt`,
  MOCK: `./mock.json`,
};

const MocksConfig = {
  FILE_NAME: `mock.json`,
  DEFAULT_COUNT: 1,
  MAX_COUNT: 1000,
  PAST_MONTH_LIMIT: 3,
  DATE_FORMAT: `yyyy-LL-dd HH:mm:ss`,
  ANOUNCE_RESTRICT: {
    MIN: 1,
    MAX: 5,
  },
  CATEGORY_RESTRICT: {
    MIN: 1,
    MAX: 3,
  },
  FULL_TEXT_RESTRICT_MIN: 1,
};

const ServerConfig = {
  DEFAULT_PORT: 3000,
  NOT_FOUND_TEXT: `404 - Not Found`,
};

const HttpStatusCode = {
  OK: 200,
  NOT_FOUND: 404,
};

const ContentType = {
  HTML: `text/html; charset=UTF-8`,
};

module.exports = {
  CliCommand,
  DEFAULT_COMMAND,
  FilePath,
  MocksConfig,
  ServerConfig,
  HttpStatusCode,
  ContentType,
};
