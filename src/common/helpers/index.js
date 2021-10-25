'use strict';

const {ensureArray} = require(`./ensure-array.helper`);
const {getArrayRandomIndex} = require(`./get-array-random-index.helper`);
const {getArrayRandomItem} = require(`./get-array-random-item.helper`);
const {getArrayRandomItems} = require(`./get-array-random-items.helper`);
const {getCurrentDate} = require(`./get-current-date.helper`);
const {getRandomBoolean} = require(`./get-random-boolean.helper`);
const {getRandomDate} = require(`./get-random-date.helper`);
const {getRandomEmail} = require(`./get-random-email.helper`);
const {getRandomId} = require(`./get-random-id.helper`);
const {getRandomInt} = require(`./get-random-int.helper`);
const {getSequelizeStringType} = require(`./get-sequelize-string-type.helper`);
const {formatSearchResult} = require(`./format-search-results.helper`);
const {humanizeDate} = require(`./humanize-date.helper`);
const {readContent} = require(`./read-content.helper`);
const {truncateString} = require(`./truncate-string.helper`);

module.exports = {
  ensureArray,
  getArrayRandomIndex,
  getArrayRandomItem,
  getArrayRandomItems,
  getCurrentDate,
  getRandomBoolean,
  getRandomDate,
  getRandomEmail,
  getRandomId,
  getRandomInt,
  getSequelizeStringType,
  formatSearchResult,
  humanizeDate,
  readContent,
  truncateString,
};
