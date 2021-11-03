'use strict';

const {assembleArticleErrors} = require(`./assemble-article-errors.helper`);
const {assembleErrors} = require(`./assemble-errors.helper`);
const {assembleRoute} = require(`./assemble-route.helper`);
const {calculatePagination} = require(`./calculate-pagination.helper`);
const {ensureArray} = require(`./ensure-array.helper`);
const {formatSearchResult} = require(`./format-search-results.helper`);
const {getArrayRandomIndex} = require(`./get-array-random-index.helper`);
const {getArrayRandomItem} = require(`./get-array-random-item.helper`);
const {getArrayRandomItems} = require(`./get-array-random-items.helper`);
const {getArticleData} = require(`./get-article-data.helper`);
const {getCurrentDate} = require(`./get-current-date.helper`);
const {getRandomBoolean} = require(`./get-random-boolean.helper`);
const {getRandomDate} = require(`./get-random-date.helper`);
const {getRandomEmail} = require(`./get-random-email.helper`);
const {getRandomId} = require(`./get-random-id.helper`);
const {getRandomInt} = require(`./get-random-int.helper`);
const {getSequelizeStringType} = require(`./get-sequelize-string-type.helper`);
const {getTotalPages} = require(`./get-total-pages.helper`);
const {humanizeDate} = require(`./humanize-date.helper`);
const {readContent} = require(`./read-content.helper`);
const {truncateString} = require(`./truncate-string.helper`);

module.exports = {
  assembleArticleErrors,
  assembleErrors,
  assembleRoute,
  calculatePagination,
  ensureArray,
  formatSearchResult,
  getArrayRandomIndex,
  getArrayRandomItem,
  getArrayRandomItems,
  getArticleData,
  getCurrentDate,
  getRandomBoolean,
  getRandomDate,
  getRandomEmail,
  getRandomId,
  getRandomInt,
  getSequelizeStringType,
  getTotalPages,
  humanizeDate,
  readContent,
  truncateString,
};
