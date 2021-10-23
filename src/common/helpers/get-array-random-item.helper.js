'use strict';

const {getArrayRandomIndex} = require(`./get-array-random-index.helper`);

const getArrayRandomItem = (array) => {
  const index = getArrayRandomIndex(array);
  return array[index];
};

module.exports = {
  getArrayRandomItem,
};
