'use strict';

const {getRandomId} = require(`../../utils`);

class ArticleService {
  constructor(articles) {
    this._articles = Array.isArray(articles) ? articles : [];
  }

  create(article) {
    const newArticle = {
      ...article,
      id: getRandomId(),
      comments: [],
    };

    this._articles = [...this._articles, newArticle];
    return newArticle;
  }

  drop(id) {
    const articleToDrop = this.findOne(id);

    if (!articleToDrop) {
      return null;
    }

    const index = this._findIndex(id);
    this._articles = [...this._articles.slice(0, index), ...this._articles.slice(index + 1)];

    return articleToDrop;
  }

  update(id, update) {
    const oldArticle = this.findOne(id);

    if (!oldArticle) {
      return null;
    }

    const index = this._findIndex(id);
    const updatedArticle = {...oldArticle, ...update};
    this._articles = [...this._articles.slice(0, index), updatedArticle, ...this._articles.slice(index + 1)];

    return updatedArticle;
  }

  findOne(id) {
    return this._articles.find((article) => article.id === id);
  }

  findAll() {
    return this._articles.slice();
  }

  _findIndex(id) {
    return this._articles.findIndex((article) => article.id === id);
  }
}

module.exports = ArticleService;
