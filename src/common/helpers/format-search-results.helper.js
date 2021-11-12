'use strict';

const formatSearchResult = (result, query) => result.split(query).join(`<b>${query}</b>`);

module.exports = {
  formatSearchResult,
};
