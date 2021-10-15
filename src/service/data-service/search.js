'use strict';

const {
  ArticleKey,
} = require(`../../constants`);
const {
  compareDatesDescend,
} = require(`../../utils`);

class SearchService {
  constructor(articles) {
    this._articles = articles;
  }

  findAll(searchText) {
    return this._articles
      .filter((article) => article.title.includes(searchText))
      .sort((first, second) => compareDatesDescend(first[ArticleKey.CREATED_DATE], second[ArticleKey.CREATED_DATE]));
  }
}

module.exports = SearchService;
