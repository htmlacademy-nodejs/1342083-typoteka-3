'use strict';

const {DataTypes, Model} = require(`sequelize`);
const {
  CategoryKey,
  ModelName,
  TableName,
} = require(`../../constants`);

class Category extends Model {}

module.exports = (sequelize) => Category.init({
  [CategoryKey.NAME]: {
    type: DataTypes.STRING,
    allowNull: false,
  }
}, {
  sequelize,
  modelName: ModelName.CATEGORY,
  tableName: TableName.CATEGORIES,
  timestamps: false,
});
