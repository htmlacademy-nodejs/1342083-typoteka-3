'use strict';

const chulk = require(`chalk`);
const packageJson = require(`../../../package.json`);
const {ExitCode} = require(`../../constants`);
const {CliCommand} = require(`./constants`);

module.exports = {
  name: CliCommand.VERSION,
  run() {
    console.info(chulk.blue(packageJson.version));
    process.exit(ExitCode.SUCCESS);
  }
};
