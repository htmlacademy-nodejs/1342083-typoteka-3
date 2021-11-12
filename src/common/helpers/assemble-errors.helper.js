'use strict';

const assembleErrors = (errors) => {
  return errors.details.map((err) => ({
    name: err.context.label,
    message: err.message,
  }));
};

module.exports = {
  assembleErrors,
};
