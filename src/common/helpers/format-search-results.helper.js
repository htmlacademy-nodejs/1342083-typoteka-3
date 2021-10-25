'use strict';

const formatSearchResult = (result, query) => {
  const startIndex = result.indexOf(query);
  const endIndex = startIndex + query.length;
  return `${result.slice(0, startIndex)} <b>${query}</b>${result.slice(endIndex)}`;
};

module.exports = {
  formatSearchResult,
};
