'use strict';

const {ArticleKey} = require(`../enums`);
const {truncateString} = require(`./truncate-string.helper`);

const adaptHotToClient = (rawHot) => {
  return {
    [ArticleKey.ID]: rawHot[ArticleKey.ID],
    [ArticleKey.ANNOUNCE]: truncateString(rawHot[ArticleKey.ANNOUNCE]),
    [ArticleKey.COMMENTS_COUNT]: rawHot[ArticleKey.COMMENTS_COUNT],
  };
};

module.exports = {
  adaptHotToClient,
};
