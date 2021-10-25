'use strict';

const {nanoid} = require(`nanoid`);
const {MAX_ID_LENGTH} = require(`../constants`);

const getRandomId = (length = MAX_ID_LENGTH) => nanoid(length);

module.exports = {
  getRandomId,
};
