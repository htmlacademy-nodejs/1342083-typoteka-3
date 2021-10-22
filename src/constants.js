'use strict';

const ADDITIONAL_ARGV_SPLIT_INDEX = 2;
const API_PORT = 3000;
const API_PREFIX = `/api`;
const DATE_FORMAT_PATTERN = `YYYY-MM-DD`;
const DEFAULT_ENCODING = `utf-8`;
const MAX_ID_LENGTH = 6;
const MOCK_FILEPATH = `./mock.json`;
const RANDOM_SEPARATOR = 0.5;

const APIUrl = {
  ARTICLES: `/articles`,
  CATEGORIES: `/categories`,
  SEARCH: `/search`,
};

const CliCommand = {
  FILL: `--fill`,
  GENERATE: `--generate`,
  HELP: `--help`,
  SERVER: `--server`,
  VERSION: `--version`,
};

const Env = {
  DEVELOPMENT: `development`,
  PRODUCTION: `production`
};

const ExitCode = {
  ERROR: 1,
  SUCCESS: 0,
};

const HttpStatusCode = {
  OK: 200,
  BAD_REQUEST: 400,
  NOT_FOUND: 404,
  INTERNAL_SERVER_ERROR: 500,
};

const UserType = {
  ADMIN: `admin`,
  USER: `user`,
};

const CategoryKey = {
  ID: `id`,
  NAME: `name`,
};

const CommentKey = {
  ID: `id`,
  CREATED_DATE: `createdDate`,
  TEXT: `text`,
  AUTHOR: `author`,
  ARTICLE: `article`,
  ARTICLE_ID: `articleId`,
  USER_ID: `userId`,
};

const ArticleKey = {
  ID: `id`,
  TITLE: `title`,
  PICTURE: `picture`,
  CREATED_DATE: `createdDate`,
  ANNOUNCE: `announce`,
  FULL_TEXT: `fullText`,
  CATEGORIES: `categories`,
  COMMENTS: `comments`,
  AUTHOR: `author`,
  USER_ID: `userId`,
};

const UserKey = {
  ID: `id`,
  EMAIL: `email`,
  FIRST_NAME: `firstName`,
  LAST_NAME: `lastName`,
  PASSWORD_HASH: `passwordHash`,
  AVATAR: `avatar`,
};

const DateOffsetUnit = {
  DAY: `day`,
  WEEK: `week`,
  MONTH: `month`,
  YEAR: `year`,
};

const ModelName = {
  COMMENT: `Comment`,
  CATEGORY: `Category`,
  ARTICLE: `Article`,
  USER: `User`,
  ARTICLE_CATEGORY: `ArticleCategory`,
};

const TableName = {
  COMMENTS: `comments`,
  CATEGORIES: `categories`,
  ARTICLES: `articles`,
  USERS: `users`,
  ARTICLES_CATEGORIES: `articlesCategories`,
};

const ModelAliase = {
  ARTICLES: `articles`,
  CATEGORIES: `categories`,
  COMMENTS: `comments`,
  USERS: `users`,
  ARTICLES_CATEGORIES: `articles_categories`,
};

module.exports = {
  ADDITIONAL_ARGV_SPLIT_INDEX,
  API_PORT,
  API_PREFIX,
  DATE_FORMAT_PATTERN,
  DEFAULT_ENCODING,
  MAX_ID_LENGTH,
  MOCK_FILEPATH,
  RANDOM_SEPARATOR,
  APIUrl,
  CliCommand,
  Env,
  ExitCode,
  HttpStatusCode,
  UserType,
  CategoryKey,
  CommentKey,
  ArticleKey,
  UserKey,
  DateOffsetUnit,
  ModelName,
  TableName,
  ModelAliase,
};
