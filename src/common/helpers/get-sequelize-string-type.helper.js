'use strict';

const {DataTypes} = require(`sequelize`);

const getSequelizeStringType = (size) => {
  return size ? new DataTypes.STRING(size) : DataTypes.STRING;
};

module.exports = {
  getSequelizeStringType,
};
