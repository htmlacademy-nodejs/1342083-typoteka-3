'use strict';

const {
  DataTypes,
  Model,
} = require(`sequelize`);
const {
  UserKey,
  StringSize,
  ModelName,
  TableName,
} = require(`../../common/enums`);
const {getSequelizeStringType} = require(`../../common/helpers`);

class User extends Model {}

module.exports = (sequelize) => User.init({
  [UserKey.EMAIL]: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  [UserKey.FIRST_NAME]: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  [UserKey.LAST_NAME]: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  [UserKey.PASSWORD_HASH]: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  [UserKey.AVATAR]: getSequelizeStringType(StringSize[UserKey.AVATAR])
}, {
  sequelize,
  modelName: ModelName.USER,
  tableName: TableName.USERS,
  timestamps: false,
});
