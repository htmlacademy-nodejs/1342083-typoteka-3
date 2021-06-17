'use strict';

const {RANDOM_SEPARATOR} = require(`./constants`);

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

module.exports = {
  getRandomIntInclusive,
  shuffleArray,
  getArrayRandomIndex,
  getRandomArrayItem,
  getRandomArrayItems,
};
