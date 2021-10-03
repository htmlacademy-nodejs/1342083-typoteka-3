'use strict';

const {DateTime} = require(`luxon`);
const {
  getRandomArrayItems,
  getRandomIntInclusive,
  getRandomId,
} = require(`../../utils`);

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
  return getItems(comments, min, max).map((text) => ({
    id: getRandomId(),
    text,
  }));
};

module.exports = {
  getDate,
  getItems,
  getComments,
};
