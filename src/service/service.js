'use strict';

const Cli = require(`./cli`);
const {ADDITIONAL_ARGV_SPLIT_INDEX, CliCommand} = require(`../constants`);

const additionalArguments = process.argv.slice(ADDITIONAL_ARGV_SPLIT_INDEX);
const [userCommand, ...restArguments] = additionalArguments;

if (additionalArguments.length === 0 || !Cli[userCommand]) {
  Cli[CliCommand.HELP].run();
}

Cli[userCommand].run(restArguments);
