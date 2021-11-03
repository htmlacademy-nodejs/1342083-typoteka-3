'use strict';

const assembleErrors = (error) => {
  return error.details.map((err) => err.message);
};

module.exports = {
  assembleErrors,
};
