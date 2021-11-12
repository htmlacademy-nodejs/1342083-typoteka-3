'use strict';

const sortErrorsByName = (errors) => {
  return errors.reduce((acc, error) => {
    if (!acc[error.name]) {
      acc[error.name] = [];
    }

    acc[error.name].push(error.message);
    return acc;
  }, {});
};

module.exports = {
  sortErrorsByName,
};
