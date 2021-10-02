'use strict';

const ADDITIONAL_ARGV_SPLIT_INDEX = 2;
const DEFAULT_COMMAND = `--help`;
const DEFAULT_ENCODING = `utf-8`;
const MAX_ID_LENGTH = 6;
const MOCK_FILEPATH = `./mock.json`;
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
  DEFAULT_ENCODING,
  MAX_ID_LENGTH,
  MOCK_FILEPATH,
  RANDOM_SEPARATOR,
  CliCommand,
  ExitCode,
  HttpStatusCode,
};
