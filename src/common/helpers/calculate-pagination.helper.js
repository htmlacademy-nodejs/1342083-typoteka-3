'use strict';

const DEFAULT_PAGE = 1;

const calculatePagination = (limit, page = DEFAULT_PAGE) => {
  page = parseInt(page, 10);
  const offset = (page - 1) * limit;
  return {page, offset};
};

module.exports = {
  calculatePagination,
};
