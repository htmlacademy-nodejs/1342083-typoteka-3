'use strict';

const fs = require(`fs`).promises;
const chalk = require(`chalk`);
const {DEFAULT_ENCODING} = require(`../constants`);

const readContent = async (filePath, encoding = DEFAULT_ENCODING) => {
  try {
    const content = await fs.readFile(filePath, encoding);
    return content.trim().split(`\n`);
  } catch (err) {
    console.error(chalk.red(err));
    return [];
  }
};

module.exports = {
  readContent,
};
