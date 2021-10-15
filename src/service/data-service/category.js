'use strict';

class CategoryService {
  constructor(articles) {
    this._articles = articles;
  }

  findAll() {
    const categories = this._articles.reduce((acc, article) => {
      article.categories.forEach((current) => {
        const containThisCategory = acc.find((saved) => saved.id === current.id);
        if (!containThisCategory) {
          acc.push(current);
        }
      });
      return acc;
    }, []);

    return categories;
  }
}

module.exports = CategoryService;
