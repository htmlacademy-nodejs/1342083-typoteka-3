'use strict';

const Cli = require(`./cli`);
const {ADDITIONAL_ARGV_SPLIT_INDEX, DEFAULT_ARGV} = require(`../constants`);

const additionalArgv = process.argv.slice(ADDITIONAL_ARGV_SPLIT_INDEX);
const [command, count] = additionalArgv;

if (additionalArgv.length && Cli[command]) {
  Cli[command].run(count);
} else {
  Cli[DEFAULT_ARGV].run();
}
