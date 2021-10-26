'use strict';

const getTotalPages = (count, limit) => Math.ceil(count / limit);

module.exports = {
  getTotalPages,
};
