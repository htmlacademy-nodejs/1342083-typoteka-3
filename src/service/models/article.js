'use strict';

const {
  DataTypes,
  Model,
} = require(`sequelize`);
const {
  ArticleKey,
  StringSize,
  ModelName,
  TableName,
} = require(`../../common/enums`);
const {getSequelizeStringType} = require(`../../common/helpers`);

class Article extends Model {}

module.exports = (sequelize) => Article.init({
  [ArticleKey.TITLE]: {
    type: getSequelizeStringType(StringSize[ArticleKey.TITLE]),
    allowNull: false,
  },
  [ArticleKey.PICTURE]: getSequelizeStringType(StringSize[ArticleKey.PICTURE]),
  [ArticleKey.CREATED_DATE]: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
  [ArticleKey.ANNOUNCE]: {
    type: getSequelizeStringType(StringSize[ArticleKey.ANNOUNCE]),
    allowNull: false,
  },
  [ArticleKey.FULL_TEXT]: getSequelizeStringType(StringSize[ArticleKey.FULL_TEXT]),
}, {
  sequelize,
  modelName: ModelName.ARTICLE,
  tableName: TableName.ARTICLES,
  timestamps: false,
});
