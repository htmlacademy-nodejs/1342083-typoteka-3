'use strict';

const {CommentKey, UserKey} = require(`../enums`);
const {truncateString} = require(`./truncate-string.helper`);

const adaptCommentToClient = (rawComment) => {
  return {
    [CommentKey.ID]: rawComment[CommentKey.ID],
    [CommentKey.CREATED_DATE]: rawComment[CommentKey.CREATED_DATE],
    [CommentKey.TEXT]: truncateString(rawComment[CommentKey.TEXT]),
    [CommentKey.ARTICLE_ID]: rawComment[CommentKey.ARTICLE_ID],
    [UserKey.FIRST_NAME]: rawComment[CommentKey.USERS][UserKey.FIRST_NAME],
    [UserKey.LAST_NAME]: rawComment[CommentKey.USERS][UserKey.LAST_NAME],
    [UserKey.AVATAR]: rawComment[CommentKey.USERS][UserKey.AVATAR],
  };
};

module.exports = {
  adaptCommentToClient,
};
