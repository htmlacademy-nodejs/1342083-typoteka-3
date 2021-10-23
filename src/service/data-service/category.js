'use strict';

const Sequelize = require(`sequelize`);
const {
  CategoryKey,
  ModelName,
  ModelAlias,
  SortOrder,
} = require(`../../constants`);

class CategoryService {
  constructor(sequelize) {
    this._Category = sequelize.models.Category;
    this._ArticleCategory = sequelize.models.ArticleCategory;
  }

  async findAll(needCount) {
    if (needCount) {
      const result = await this._Category.findAll({
        group: [Sequelize.col(`${ModelName.CATEGORY}.${CategoryKey.ID}`)],
        attributes: [
          CategoryKey.ID,
          CategoryKey.NAME,
          [Sequelize.fn(`COUNT`, `*`), CategoryKey.COUNT],
        ],
        include: [{
          model: this._ArticleCategory,
          as: ModelAlias.ARTICLES_CATEGORIES,
          attributes: [],
        }],
        order: [
          [CategoryKey.COUNT, SortOrder.DESC],
        ],
      });

      return result.map((item) => item.get());
    }

    return await this._Category.findAll({
      raw: true,
    });
  }
}

module.exports = CategoryService;
