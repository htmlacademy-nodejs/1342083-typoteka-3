'use strict';

const {LENGTH_TO_TRUNCATE} = require(`../constants`);

const truncateString = (string, maxLength = LENGTH_TO_TRUNCATE) => {
  const ending = `…`;
  const hasMore = string.length > maxLength;
  return hasMore ? string.slice(0, maxLength - ending.length).trim() + ending : string;
};

module.exports = {
  truncateString,
};
