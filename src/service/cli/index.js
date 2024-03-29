'use strict';

const filldb = require(`./filldb`);
const help = require(`./help`);
const version = require(`./version`);
const server = require(`./server`);

module.exports = {
  [filldb.name]: filldb,
  [help.name]: help,
  [version.name]: version,
  [server.name]: server,
};
