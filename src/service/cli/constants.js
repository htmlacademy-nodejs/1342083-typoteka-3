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

const PublicationCountRestrict = {
  MIN: 1,
  MAX: 1000,
};

module.exports = {
  FileName,
  FilePath,
  PublicationCountRestrict,
};
