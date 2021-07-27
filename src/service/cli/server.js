'use strict';

const express = require(`express`);
const fs = require(`fs`).promises;
const chalk = require(`chalk`);
const {CliCommand, ServerConfig, FilePath, HttpStatusCode} = require(`./constants`);

module.exports = {
  name: CliCommand.SERVER,
  async run(args) {
    const [userPort] = args;
    const port = Number.parseInt(userPort, 10) || ServerConfig.DEFAULT_PORT;

    const app = express();
    app.use(express.json());

    app.get(`/posts`, async (req, res) => {
      let mocks = null;

      try {
        const content = await fs.readFile(FilePath.MOCK, `utf-8`);
        mocks = JSON.parse(content);
      } catch (err) {
        console.error(chalk.red(err));
        mocks = [];
      }

      res.json(mocks);
    });

    app.use((req, res) => res.status(HttpStatusCode.NOT_FOUND).send(ServerConfig.NOT_FOUND_TEXT));

    app.listen(port, (err) => {
      if (err) {
        console.error(chalk.red(err));
      }

      console.info(chalk.green(`Сервер запущен: http://localhost:${port}`));
    });
  },
};
