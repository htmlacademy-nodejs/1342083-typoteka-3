'use strict';

const {
  getRandomArrayItems,
  getRandomIntInclusive,
} = require(`../../../utils`);

const getItems = (categories, min, max) => {
  const count = getRandomIntInclusive(min, max);
  return getRandomArrayItems(categories, count);
};

module.exports = getItems;
