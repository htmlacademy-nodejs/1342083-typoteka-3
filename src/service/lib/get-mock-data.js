'use strict';

const fs = require(`fs`).promises;
const {DEFAULT_ENCODING} = require(`../../constants`);

const createGetMockData = () => {
  let data = [];

  return async (filePath) => {
    if (data.length) {
      return data;
    }

    try {
      const content = await fs.readFile(filePath, DEFAULT_ENCODING);
      data = JSON.parse(content);
    } catch (err) {
      data = [];
    }

    return data;
  };
};

module.exports = createGetMockData;
