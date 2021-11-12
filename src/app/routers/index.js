'use strict';

const {articlesRouter} = require(`./articles.router`);
const {mainRouter} = require(`./main.router`);
const {myRouter} = require(`./my.router`);

module.exports = {
  articlesRouter,
  mainRouter,
  myRouter,
};
