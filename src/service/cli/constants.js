'use strict';

const CliCommand = {
  GENERATE: `--generate`,
  HELP: `--help`,
  VERSION: `--version`,
};

const DEFAULT_COMMAND = CliCommand.HELP;

const FilePath = {
  CATEGORIES: `./data/categories.txt`,
  SENTENCES: `./data/sentences.txt`,
  TITLES: `./data/titles.txt`,
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
};

const FULL_TEXT_RESTRICT_MIN = 1;

module.exports = {
  CliCommand,
  DEFAULT_COMMAND,
  FilePath,
  MocksConfig,
  FULL_TEXT_RESTRICT_MIN,
};
