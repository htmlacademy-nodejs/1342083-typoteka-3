'use strict';

const ADDITIONAL_ARGV_SPLIT_INDEX = 2;
const DEFAULT_COMMAND = `--help`;
const MAX_ID_LENGTH = 6;
const RANDOM_SEPARATOR = 0.5;

const CliCommand = {
  GENERATE: `--generate`,
  HELP: DEFAULT_COMMAND,
  VERSION: `--version`,
  SERVER: `--server`,
};

const ExitCode = {
  ERROR: 1,
  SUCCESS: 0,
};

const HttpStatusCode = {
  OK: 200,
  NOT_FOUND: 404,
};

module.exports = {
  ADDITIONAL_ARGV_SPLIT_INDEX,
  DEFAULT_COMMAND,
  MAX_ID_LENGTH,
  RANDOM_SEPARATOR,
  CliCommand,
  ExitCode,
  HttpStatusCode,
};
