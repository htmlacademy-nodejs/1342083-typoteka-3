'use strict';

const {DataTypes, Model} = require(`sequelize`);
const {
  CommentKey,
  ModelName,
  TableName,
} = require(`../../constants`);

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
}, {
  sequelize,
  modelName: ModelName.COMMENT,
  tableName: TableName.COMMENTS,
});
