'use strict';

const {getRandomInt} = require(`./get-random-int.helper`);
const {shuffleArray} = require(`./shuffle-array.helper`);

const getArrayRandomItems = (array, param = array.length - 1) => {
  if (typeof param === `object`) {
    const {min, max} = param;
    param = getRandomInt(min, max);
  }

  return shuffleArray(array).slice(0, param);
};

module.exports = {
  getArrayRandomItems,
};
