'use strict';

class CategoryService {
  constructor(articles) {
    this._articles = articles;
  }

  findAll() {
    if (Array.isArray(this._articles)) {
      const categories = this._articles.reduce((acc, article) => {
        article.сategory.forEach((category) => acc.add(category));
        return acc;
      }, new Set());

      return [...categories];
    }

    return [];
  }
}

module.exports = CategoryService;
