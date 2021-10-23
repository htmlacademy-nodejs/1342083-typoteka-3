'use strict';

const {Op} = require(`sequelize`);
const {
  ArticleKey, ModelAlias, Order,
} = require(`../../constants`);

class SearchService {
  constructor(sequelize) {
    this._Article = sequelize.models.Article;
  }

  async findAll(searchText) {
    const articles = await this._Article.findAll({
      where: {
        [ArticleKey.TITLE]: {
          [Op.substring]: searchText,
        },
      },
      include: [ModelAlias.CATEGORIES],
      order: [
        [ArticleKey.CREATED_DATE, SortOrder.DESC],
      ],
    });

    return articles.map((article) => article.get());
  }
}

module.exports = SearchService;
