'use strict';

const assembleErrorsSimple = (error) => {
  return error.details.map((err) => err.message);
};

module.exports = {
  assembleErrorsSimple,
};
