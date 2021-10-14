'use strict';

const fs = require(`fs`).promises;
const chalk = require(`chalk`);
const {DEFAULT_ENCODING} = require(`../../../constants`);

const readContent = async (filePath) => {
  try {
    const content = await fs.readFile(filePath, DEFAULT_ENCODING);
    return content.trim().split(`\n`);
  } catch (err) {
    console.error(chalk.red(err));
    return [];
  }
};

module.exports = readContent;
