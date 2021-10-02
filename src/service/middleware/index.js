'use strict';

const articleExist = require(`./article-exist`);
const commentExist = require(`./comment-exist`);
const articleValidator = require(`./article-validator`);

module.exports = {
  articleExist,
  commentExist,
  articleValidator,
};
