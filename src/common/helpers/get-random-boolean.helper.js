'use strict';

const {getRandomInt} = require(`./get-random-int.helper`);

const getRandomBoolean = () => Boolean(getRandomInt(0, 1));

module.exports = {
  getRandomBoolean,
};
