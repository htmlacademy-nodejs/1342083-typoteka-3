'use strict';

const ArticleKey = require(`./article-key.enum`);
const UserKey = require(`./user-key.enum`);

const StringSize = {
  [ArticleKey.TITLE]: 250,
  [ArticleKey.PICTURE]: 50,
  [ArticleKey.ANNOUNCE]: 250,
  [ArticleKey.FULL_TEXT]: 1000,
  [UserKey.AVATAR]: 50,
};

module.exports = {
  StringSize,
};
