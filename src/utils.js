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

const compareDatesDescend = (firstDate, secondDate) => {
  const parsedFirstDate = dayjs(firstDate);
  const parsedSecondDate = dayjs(secondDate);

  if (parsedFirstDate.isBefore(parsedSecondDate)) {
    return 1;
  }

  if (parsedFirstDate.isAfter(parsedSecondDate)) {
    return -1;
  }

  return 0;
};

const getCurrentDate = (formatPattern) => dayjs().format(formatPattern);

const getRandomDate = (offsetValue = 0, offsetUnit = DateOffsetUnit.DAY, formatPattern = DATE_FORMAT_PATTERN) => {
  return dayjs().add(offsetValue, offsetUnit).format(formatPattern);
};

const generateRandomEmail = () => `${nanoid()}@mail.com`;

const getLastItem = (items) => items[items.length - 1];

module.exports = {
  compareDatesDescend,
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
  generateRandomEmail,
  getLastItem,
};
