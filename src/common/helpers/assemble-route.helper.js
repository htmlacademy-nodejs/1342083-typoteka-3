'use strict';

const urlAssembler = require(`url-assembler`);

const assembleRoute = (template, params = {}) => {
  return urlAssembler().template(template).param(params).toString();
};

module.exports = {
  assembleRoute,
};
