'use strict';

const dayjs = require(`dayjs`);

const getCurrentDate = (formatPattern) => dayjs().format(formatPattern);

module.exports = {
  getCurrentDate,
};
