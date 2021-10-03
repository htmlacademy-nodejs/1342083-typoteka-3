'use strict';

const {compareDates} = require(`../../utils`);

class SearchService {
  constructor(articles) {
    this._articles = articles;
  }

  findAll(searchText) {
    return this._articles
      .filter((article) => article.title.includes(searchText))
      .sort((first, second) => compareDates(first.createdDate, second.createdDate));
  }
}

module.exports = SearchService;
