'use strict';

const {nanoid} = require(`nanoid`);
const dayjs = require(`dayjs`);
const {DATE_FORMAT_PATTERN, RANDOM_SEPARATOR, MAX_ID_LENGTH, DateOffsetUnit} = require(`./constants`);

const getRandomIntInclusive = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min);
};

const getRandomBoolean = () => Boolean(getRandomIntInclusive(0, 1));

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

const ensureArray = (value) => Array.isArray(value) ? value : [value];

const compareDates = (firstDate, secondDate) => {
  return dayjs(firstDate).isAfter(dayjs(secondDate));
};

const getCurrentDate = (formatPattern) => dayjs().format(formatPattern);

const getRandomDate = (offsetValue = 0, offsetUnit = DateOffsetUnit.DAY, formatPattern = DATE_FORMAT_PATTERN) => {
  return dayjs().add(offsetValue, offsetUnit).format(formatPattern);
};

const generateRandomEmail = () => `${nanoid()}@mail.com`;

module.exports = {
  compareDates,
  getCurrentDate,
  getRandomIntInclusive,
  getRandomBoolean,
  shuffleArray,
  getArrayRandomIndex,
  getRandomArrayItem,
  getRandomArrayItems,
  getRandomId,
  ensureArray,
  getRandomDate,
  generateRandomEmail
};
