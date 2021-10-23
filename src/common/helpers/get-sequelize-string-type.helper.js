'use strict';

const {DataTypes} = require(`sequelize`);

const getSequelizeStringType = (size) => {
  // eslint-disable-next-line new-cap
  return size ? DataTypes.STRING(size) : DataTypes.STRING;
};

module.exports = {
  getSequelizeStringType,
};
