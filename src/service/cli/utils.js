'use strict';

const {DateTime} = require(`luxon`);
const {CommentKey, DATE_FORMAT_PATTERN} = require(`../../constants`);
const {
  getRandomArrayItems,
  getRandomBoolean,
  getRandomIntInclusive,
  getRandomId,
} = require(`../../utils`);

const PAST_MONTH_LIMIT = 3;

const getDate = (pastMonthLimit, formatPattern) => {
  const now = DateTime.now();
  const past = now.minus({
    month: pastMonthLimit,
  });

  const nowTs = now.valueOf();
  const pastTs = past.valueOf();
  const randomTs = getRandomIntInclusive(nowTs, pastTs);

  return DateTime
    .fromMillis(randomTs)
    .toFormat(formatPattern);
};

const getItems = (categories, min, max) => {
  const count = getRandomIntInclusive(min, max);
  return getRandomArrayItems(categories, count);
};

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

module.exports = {
  getDate,
  getItems,
  getComments,
};
