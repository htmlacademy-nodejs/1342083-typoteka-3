'use strict';

const {DateTime} = require(`luxon`);
const {getRandomIntInclusive} = require(`../../../utils`);

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

module.exports = getDate;
