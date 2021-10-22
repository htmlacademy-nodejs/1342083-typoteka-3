'use strict';

const {DataTypes, Model} = require(`sequelize`);
const {
  ArticleKey,
  ModelName,
  TableName,
} = require(`../../constants`);
const {
  getLimitedSequelizeStringType,
} = require(`../../utils`);

const StringSize = {
  [ArticleKey.TITLE]: 250,
  [ArticleKey.PICTURE]: 50,
  [ArticleKey.ANNOUNCE]: 250,
  [ArticleKey.FULL_TEXT]: 1000,
};

class Article extends Model {}

module.exports = (sequelize) => Article.init({
  [ArticleKey.TITLE]: {
    type: getLimitedSequelizeStringType(StringSize[ArticleKey.TITLE]),
    allowNull: false,
  },
  [ArticleKey.PICTURE]: getLimitedSequelizeStringType(StringSize[ArticleKey.PICTURE]),
  [ArticleKey.CREATED_DATE]: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
  [ArticleKey.ANNOUNCE]: {
    type: getLimitedSequelizeStringType(StringSize[ArticleKey.ANNOUNCE]),
    allowNull: false,
  },
  [ArticleKey.FULL_TEXT]: getLimitedSequelizeStringType(StringSize[ArticleKey.FULL_TEXT]),
}, {
  sequelize,
  modelName: ModelName.ARTICLE,
  tableName: TableName.ARTICLES,
  timestamps: false,
});
