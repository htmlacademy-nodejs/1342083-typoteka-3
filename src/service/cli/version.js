'use strict';

const chulk = require(`chalk`);
const {ExitCode} = require(`../../constants`);
const packageJson = require(`../../../package.json`);

module.exports = {
  name: `--version`,
  run() {
    console.info(chulk.yellow(packageJson.version));
    process.exit(ExitCode.SUCCESS);
  }
};
