'use strict';

const getRandomIntInclusive = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);

  return Math.floor(Math.random() * (max - min + 1) + min);
};

const shuffleArray = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));

    [array[i], array[j]] = [array[j], array[i]];
  }
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
  const arrayCopy = [...array];
  shuffleArray(arrayCopy);

  return arrayCopy.slice(0, count);
};

module.exports = {
  getRandomIntInclusive,
  shuffleArray,
  getArrayRandomIndex,
  getRandomArrayItem,
  getRandomArrayItems,
};
