'use strict';

const dayjs = require(`dayjs`);

const DateOffsetUnit = {
  YEAR: `year`,
  MONTH: `month`,
  WEEK: `week`,
  DAY: `day`,
  HOUR: `hour`,
  MINUTE: `minute`,
};

const getRandomDate = () => {
  const randomValue = Math.ceil(Math.random() * 10000) * -1;
  const offsetUnit = DateOffsetUnit.MINUTE;

  return dayjs().add(randomValue, offsetUnit).toISOString();
};

module.exports = {
  getRandomDate,
};
