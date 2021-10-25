'use strict';

const dayjs = require(`dayjs`);
const {getArrayRandomItem} = require(`./get-array-random-item.helper`);
const {DateOffsetUnit} = require(`../enums`);

const getRandomDate = () => {
  const randomValue = Math.ceil(Math.random() * 10000);
  const offsetValue = getArrayRandomItem([randomValue, randomValue * -1]);
  const offsetUnit = DateOffsetUnit.MINUTE;

  return dayjs().add(offsetValue, offsetUnit).toISOString();
};

module.exports = {
  getRandomDate,
};
