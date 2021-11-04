'use strict';

const {
  DataTypes,
  Model,
} = require(`sequelize`);
const {
  ArticleKey,
  ArticleTitleSizeRestrict,
  ArticleAnnounceSizeRestrict,
  ArticleFullTextSizeRestrict,
  ArticlePictureNameSizeRestrict,
  ModelName,
  TableName,
} = require(`../../common/enums`);
const {getSequelizeStringType} = require(`../../common/helpers`);

class Article extends Model {}

module.exports = (sequelize) => Article.init({
  [ArticleKey.TITLE]: {
    type: getSequelizeStringType(ArticleTitleSizeRestrict.MAX),
    allowNull: false,
  },
  [ArticleKey.PICTURE]: getSequelizeStringType(ArticlePictureNameSizeRestrict.MAX),
  [ArticleKey.CREATED_DATE]: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
  [ArticleKey.ANNOUNCE]: {
    type: getSequelizeStringType(ArticleAnnounceSizeRestrict.MAX),
    allowNull: false,
  },
  [ArticleKey.FULL_TEXT]: getSequelizeStringType(ArticleFullTextSizeRestrict.MAX),
}, {
  sequelize,
  modelName: ModelName.ARTICLE,
  tableName: TableName.ARTICLES,
  timestamps: false,
});
