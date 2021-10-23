'use strict';

const {RANDOM_SEPARATOR} = require(`../constants`);

const shuffleArray = (array) => {
  return array
    .slice()
    .sort(() => Math.random() - RANDOM_SEPARATOR);
};

module.exports = {
  shuffleArray,
};
