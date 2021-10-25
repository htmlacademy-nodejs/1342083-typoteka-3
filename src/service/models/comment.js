'use strict';

const {
  DataTypes,
  Model,
} = require(`sequelize`);
const {
  CommentKey,
  ModelName,
  TableName,
} = require(`../../common/enums`);

class Comment extends Model {}

module.exports = (sequelize) => Comment.init({
  [CommentKey.TEXT]: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  [CommentKey.CREATED_DATE]: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
  [CommentKey.USER_ID]: DataTypes.INTEGER,
  [CommentKey.ARTICLE_ID]: DataTypes.INTEGER,
}, {
  sequelize,
  modelName: ModelName.COMMENT,
  tableName: TableName.COMMENTS,
  timestamps: false,
});
