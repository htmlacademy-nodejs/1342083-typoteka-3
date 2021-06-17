'use strict';

const Cli = require(`./cli`);
const {ADDITIONAL_ARGV_SPLIT_INDEX} = require(`../constants`);
const {DEFAULT_COMMAND} = require(`./cli/constants`);

const additionalArguments = process.argv.slice(ADDITIONAL_ARGV_SPLIT_INDEX);
const [userCommand, ...restArguments] = additionalArguments;

if (additionalArguments.length === 0 || !Cli[userCommand]) {
  Cli[DEFAULT_COMMAND].run();
}

Cli[userCommand].run(restArguments);
