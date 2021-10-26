'use strict';

const {Sequelize} = require(`sequelize`);
const {
  CategoryKey,
  TableName,
  ArticleCategoryKey,
  ModelAlias,
  ModelName,
  SortOrder,
} = require(`../../common/enums`);

class CategoryService {
  constructor(sequelize) {
    this._Category = sequelize.models.Category;
    this._ArticleCategory = sequelize.models.ArticleCategory;
  }

  create(categoryPayload) {
    return this._Category.create(categoryPayload);
  }

  findOne(id) {
    return this._Category.findByPk(id, {
      raw: true,
    });
  }

  async findAll(needCount) {
    if (needCount) {
      const categories = await this._Category.findAll({
        attributes: [
          CategoryKey.ID,
          CategoryKey.NAME,
          [Sequelize.fn(`COUNT`, `${TableName.ARTICLES_CATEGORIES}.${ArticleCategoryKey.ARTICLE_ID}`), CategoryKey.COUNT],
        ],
        include: {
          model: this._ArticleCategory,
          as: ModelAlias.ARTICLES_CATEGORIES,
          attributes: [],
        },
        group: [
          Sequelize.col(`${ModelName.CATEGORY}.${CategoryKey.ID}`),
        ],
        order: [
          [CategoryKey.COUNT, SortOrder.DESC],
          [CategoryKey.NAME, SortOrder.DESC],
        ],
      });

      return categories.map((category) => category.get());
    }

    return this._Category.findAll({
      raw: true,
    });
  }
}

module.exports = CategoryService;
