'use strict';

const {getLogger} = require(`../lib/logger`);
const sequelize = require(`../lib/sequelize`);
const initDb = require(`../lib/init-db`);
const {
  CliCommand,
  ExitCode,
  ArticleCountRestrict,
} = require(`../../constants`);
const generateMocks = require(`../lib/generate-mocks`);

const logger = getLogger();

module.exports = {
  name: CliCommand.FILLDB,
  async run(args) {
    try {
      logger.info(`Trying to connect to database...`);
      await sequelize.authenticate();
    } catch (err) {
      logger.error(`An error occurred: ${err.message}`);
      process.exit(ExitCode.ERROR);
    }
    logger.info(`Connection to database established`);

    const [count] = args;
    const articleCount = Number.parseInt(count, 10) || ArticleCountRestrict.MIN;

    if (articleCount > ArticleCountRestrict.MAX) {
      logger.error(`Не больше ${ArticleCountRestrict.MAX} публикаций.`);
      process.exit(ExitCode.ERROR);
    }

    const mocks = await generateMocks(articleCount);
    console.log(mocks);
    await initDb(sequelize, mocks);
  },
};
