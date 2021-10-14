'use strict';

const {
  CommentKey,
  DATE_FORMAT_PATTERN,
} = require(`../../../constants`);
const {
  getRandomBoolean,
  getRandomId,
} = require(`../../../utils`);
const getItems = require(`./get-items`);
const getDate = require(`./get-date`);

const PAST_MONTH_LIMIT = 3;

const getComments = (comments, min, max) => {
  const hasComments = Boolean(getRandomBoolean());

  if (hasComments) {
    return getItems(comments, min, max).map((text) => ({
      [CommentKey.ID]: getRandomId(),
      [CommentKey.TEXT]: text,
      [CommentKey.CREATED_DATE]: getDate(PAST_MONTH_LIMIT, DATE_FORMAT_PATTERN),
    }));
  }

  return [];
};

module.exports = getComments;
