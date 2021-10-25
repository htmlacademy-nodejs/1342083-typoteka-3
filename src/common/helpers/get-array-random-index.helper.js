'use strict';

const {getRandomInt} = require(`./get-random-int.helper`);

const getArrayRandomIndex = (array) => getRandomInt(0, array.length - 1);

module.exports = {
  getArrayRandomIndex,
};
