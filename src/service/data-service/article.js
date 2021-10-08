'use strict';

const {ArticleKey} = require(`../../constants`);
const {
  getRandomId,
} = require(`../../utils`);

class ArticleService {
  constructor(articles) {
    this._articles = articles;
  }

  create(article) {
    const newArticle = {
      ...article,
      [ArticleKey.ID]: getRandomId(),
      [ArticleKey.COMMENTS]: [],
    };

    this._articles = [...this._articles, newArticle];
    return newArticle;
  }

  drop(id) {
    const articleToDrop = this.findOne(id);

    if (!articleToDrop) {
      return null;
    }

    this._articles = this._articles.filter((article) => article.id !== id);

    return articleToDrop;
  }

  update(id, update) {
    const oldArticle = this.findOne(id);

    if (!oldArticle) {
      return null;
    }

    const updatedArticle = {...oldArticle, ...update};
    this._articles = this._articles.map((article) => {
      if (article.id === id) {
        return updatedArticle;
      }

      return article;
    });

    return updatedArticle;
  }

  findOne(id) {
    return this._articles.find((article) => article.id === id);
  }

  findAll() {
    return this._articles.slice();
  }
}

module.exports = ArticleService;
