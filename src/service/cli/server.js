'use strict';

const express = require(`express`);
const chalk = require(`chalk`);
const api = require(`../api`);
const {
  API_PREFIX,
  CliCommand,
  HttpStatusCode,
} = require(`../../constants`);

const DEFAULT_PORT = 3000;
const NOT_FOUND_TEXT = `404 - Not Found`;

module.exports = {
  name: CliCommand.SERVER,
  async run(args) {
    const [userPort] = args;
    const port = Number.parseInt(userPort, 10) || DEFAULT_PORT;

    const app = express();
    app.use(express.json());

    app.use(API_PREFIX, api);
    app.use((req, res) => res.status(HttpStatusCode.NOT_FOUND).send(NOT_FOUND_TEXT));

    app.listen(port, (err) => {
      if (err) {
        console.error(chalk.red(err));
      }
    });
  },
};
