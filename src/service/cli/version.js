'use strict';

const chulk = require(`chalk`);
const packageJson = require(`../../../package.json`);
const {
  CliCommand,
  ExitCode,
} = require(`../../common/enums`);

module.exports = {
  name: CliCommand.VERSION,
  run() {
    console.info(chulk.blue(packageJson.version));
    process.exit(ExitCode.SUCCESS);
  }
};
