'use strict';

const FileName = {
  SQL: `fill-db.sql`,
  JSON: `mock.json`,
};

const FilePath = {
  COMMENTS: `./data/comments.txt`,
  CATEGORIES: `./data/categories.txt`,
  SENTENCES: `./data/sentences.txt`,
  TITLES: `./data/titles.txt`,
};

const MockCount = {
  USERS: 10,
  COMMENTS: 50,
};

const CategoriesRestrict = {
  MIN: 1,
  MAX: 5,
};

const CommentsRestrict = {
  MIN: 1,
  MAX: 5,
};

const PublicationCountRestrict = {
  MIN: 1,
  MAX: 1000,
};

module.exports = {
  FileName,
  FilePath,
  MockCount,
  CategoriesRestrict,
  CommentsRestrict,
  PublicationCountRestrict,
};
