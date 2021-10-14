'use strict';

const {nanoid} = require(`nanoid`);
const {DateTime} = require(`luxon`);
const dayjs = require(`dayjs`);
const {DATE_FORMAT_PATTERN, RANDOM_SEPARATOR, MAX_ID_LENGTH, DateOffsetUnit} = require(`./constants`);

const compareDates = (firstDate, secondDate) => {
  return DateTime.fromFormat(secondDate, DATE_FORMAT_PATTERN) - DateTime.fromFormat(firstDate, DATE_FORMAT_PATTERN);
};

const getCurrentDate = (formatPattern) => DateTime.now().toFormat(formatPattern);

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

const getDate = (offsetValue = 0, offsetUnit = DateOffsetUnit.DAY, formatPattern = DATE_FORMAT_PATTERN) => {
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
  getDate,
  generateRandomEmail
};
