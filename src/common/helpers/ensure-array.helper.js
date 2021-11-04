'use strict';

const ensureArray = (value) => {
  if (!value) {
    return [];
  }

  return Array.isArray(value) ? value : [value];
};

module.exports = {
  ensureArray,
};
