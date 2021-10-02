'use strict';

const express = require(`express`);
const fs = require(`fs`).promises;
const chalk = require(`chalk`);
const {DEFAULT_ENCODING, MOCK_FILEPATH, CliCommand, HttpStatusCode} = require(`../../constants`);

const DEFAULT_PORT = 3000;
const NOT_FOUND_TEXT = `404 - Not Found`;

module.exports = {
  name: CliCommand.SERVER,
  async run(args) {
    const [userPort] = args;
    const port = Number.parseInt(userPort, 10) || DEFAULT_PORT;

    const app = express();
    app.use(express.json());

    app.get(`/posts`, async (req, res) => {
      let mocks = null;

      try {
        const content = await fs.readFile(MOCK_FILEPATH, DEFAULT_ENCODING);
        mocks = JSON.parse(content);
      } catch (err) {
        console.error(chalk.red(err));
        mocks = [];
      }

      res.json(mocks);
    });

    app.use((req, res) => res.status(HttpStatusCode.NOT_FOUND).send(NOT_FOUND_TEXT));

    app.listen(port, (err) => {
      if (err) {
        console.error(chalk.red(err));
      }
    });
  },
};
