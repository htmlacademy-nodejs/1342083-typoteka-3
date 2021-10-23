'use strict';

const Cli = require(`./cli`);
const {ARGV_SPLIT_INDEX} = require(`../common/constants`);
const {CliCommand} = require(`../common/enums`);

const additionalArguments = process.argv.slice(ARGV_SPLIT_INDEX);
const [userCommand, ...restArguments] = additionalArguments;

if (additionalArguments.length === 0 || !Cli[userCommand]) {
  Cli[CliCommand.HELP].run();
}

Cli[userCommand].run(restArguments);
