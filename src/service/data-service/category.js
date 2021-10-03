'use strict';

class CategoryService {
  constructor(articles) {
    this._articles = Array.isArray(articles) ? articles : [];
  }

  findAll() {
    const categories = this._articles.reduce((acc, article) => {
      article.category.forEach((category) => acc.add(category));
      return acc;
    }, new Set());

    return [...categories];
  }
}

module.exports = CategoryService;
