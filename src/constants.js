'use strict';

const ADDITIONAL_ARGV_SPLIT_INDEX = 2;
const API_PREFIX = `/api`;
const DATE_FORMAT_PATTERN = `yyyy-LL-dd HH:mm:ss`;
const DEFAULT_ENCODING = `utf-8`;
const MAX_ID_LENGTH = 6;
const MOCK_FILEPATH = `./mock.json`;
const RANDOM_SEPARATOR = 0.5;

const APIUrl = {
  ARTICLES: `/articles`,
  CATEGORIES: `/categories`,
  SEARCH: `/search`,
};

const ArticleKey = {
  ID: `id`,
  TITLE: `title`,
  PICTURE: `picture`,
  CREATED_DATE: `createdDate`,
  ANNOUNCE: `announce`,
  FULL_TEXT: `fullText`,
  CATEGORY: `category`,
  COMMENTS: `comments`,
};

const CliCommand = {
  GENERATE: `--generate`,
  HELP: `--help`,
  SERVER: `--server`,
  VERSION: `--version`,
};

const ExitCode = {
  ERROR: 1,
  SUCCESS: 0,
};

const HttpStatusCode = {
  OK: 200,
  BAD_REQUEST: 400,
  NOT_FOUND: 404,
};

module.exports = {
  ADDITIONAL_ARGV_SPLIT_INDEX,
  API_PREFIX,
  DATE_FORMAT_PATTERN,
  DEFAULT_ENCODING,
  MAX_ID_LENGTH,
  MOCK_FILEPATH,
  RANDOM_SEPARATOR,
  APIUrl,
  ArticleKey,
  CliCommand,
  ExitCode,
  HttpStatusCode,
};
