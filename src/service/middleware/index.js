'use strict';

const articleExist = require(`./article-exist`);
const articleValidator = require(`./article-validator`);
const commentExist = require(`./comment-exist`);
const commentValidator = require(`./comment-validator`);

module.exports = {
  articleValidator,
  articleExist,
  commentExist,
  commentValidator,
};
