'use strict';

const {Model} = require(`sequelize`);
const {
  ModelName,
  TableName,
} = require(`../../common/enums`);

class ArticleCategory extends Model {}

module.exports = (sequelize) => ArticleCategory.init({}, {
  sequelize,
  modelName: ModelName.ARTICLE_CATEGORY,
  tableName: TableName.ARTICLES_CATEGORIES,
  timestamps: false,
});
