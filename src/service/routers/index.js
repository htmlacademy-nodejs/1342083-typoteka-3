'use strict';

const {articlesRouter} = require(`./articles.router`);
const {categoriesRouter} = require(`./categories.router`);
const {commentsRouter} = require(`./comments.router`);
const {searchRouter} = require(`./search.router`);
const {userRouter} = require(`./user.router`);

module.exports = {
  articlesRouter,
  categoriesRouter,
  commentsRouter,
  searchRouter,
  userRouter,
};
