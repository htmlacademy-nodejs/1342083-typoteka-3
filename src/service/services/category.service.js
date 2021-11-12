'use strict';

const {
  Sequelize,
  Op: Operator,
} = require(`sequelize`);
const {
  ArticleCategoryKey,
  CategoryKey,
  ModelAlias,
  ModelName,
  SortOrder,
  TableName,
} = require(`../../common/enums`);

class CategoryService {
  constructor(sequelize) {
    this._Category = sequelize.models.Category;
    this._ArticleCategory = sequelize.models.ArticleCategory;
  }

  create(categoryPayload) {
    return this._Category.create(categoryPayload);
  }

  async update(id, update) {
    const updatedCategory = await this._Category.update(update, {
      where: {
        [CategoryKey.ID]: id,
      },
      plain: true,
    });

    return Boolean(updatedCategory);
  }

  async drop(id) {
    const deletedRows = await this._Category.destroy({
      where: {
        [CategoryKey.ID]: id,
      },
    });

    return Boolean(deletedRows);
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
          duplicating: false,
        },
        group: [
          Sequelize.col(`${ModelName.CATEGORY}.${CategoryKey.ID}`),
        ],
        having: Sequelize.where(
            Sequelize.fn(`COUNT`, Sequelize.col(`${TableName.ARTICLES_CATEGORIES}.${ArticleCategoryKey.CATEGORY_ID}`)),
            {[Operator.gte]: 1}
        ),
        order: [
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
