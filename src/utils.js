'use strict';

const {nanoid} = require(`nanoid`);
const {DateTime} = require(`luxon`);
const {DATE_FORMAT_PATTERN, RANDOM_SEPARATOR, MAX_ID_LENGTH} = require(`./constants`);

const compareDates = (firstDate, secondDate) => {
  return DateTime.fromFormat(secondDate, DATE_FORMAT_PATTERN) - DateTime.fromFormat(firstDate, DATE_FORMAT_PATTERN);
};

const getRandomIntInclusive = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min);
};

const shuffleArray = (array) => {
  return array
    .slice()
    .sort(() => Math.random() - RANDOM_SEPARATOR);
};

const getArrayRandomIndex = (array) => {
  const {length} = array;
  return getRandomIntInclusive(0, length - 1);
};

const getRandomArrayItem = (array) => {
  const index = getArrayRandomIndex(array);
  return array[index];
};

const getRandomArrayItems = (array, count) => {
  return shuffleArray(array).slice(0, count);
};

const getRandomId = (length = MAX_ID_LENGTH) => nanoid(length);

module.exports = {
  compareDates,
  getRandomIntInclusive,
  shuffleArray,
  getArrayRandomIndex,
  getRandomArrayItem,
  getRandomArrayItems,
  getRandomId,
};
