'use strict';

const chulk = require(`chalk`);
const {getLogger} = require(`../../common/libs/logger`);
const sequelize = require(`../libs/sequelize`);
const generateMocks = require(`../libs/generate-mocks`);
const initDb = require(`../libs/init-db`);
const {
  CliCommand,
  ExitCode,
  ArticleCountRestrict,
} = require(`../../common/enums`);

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
      console.error(chulk.red(`Не больше ${ArticleCountRestrict.MAX} публикаций.`));
      process.exit(ExitCode.ERROR);
    }

    const mocks = await generateMocks(articleCount);
    await initDb(sequelize, mocks);
  },
};
