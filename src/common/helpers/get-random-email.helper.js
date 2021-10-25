'use strict';

const {nanoid} = require(`nanoid`);

const getRandomEmail = () => `${nanoid()}@mail.com`;

module.exports = {
  getRandomEmail,
};
