'use strict';

const chulk = require(`chalk`);
const {getLogger} = require(`../../common/libs/logger.lib`);
const sequelize = require(`../../common/libs/sequelize.lib`);
const generateMocks = require(`../libs/generate-mocks.lib`);
const initDb = require(`../libs/init-db.lib`);
const {
  CliCommand,
  ExitCode,
} = require(`../../common/enums`);

const ArticlesCountRestrict = {
  MIN: 10,
  MAX: 1000,
};

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
    const articleCount = Number.parseInt(count, 10) || ArticlesCountRestrict.MIN;

    if (articleCount > ArticlesCountRestrict.MAX) {
      console.error(chulk.red(`Не больше ${ArticlesCountRestrict.MAX} публикаций.`));
      process.exit(ExitCode.ERROR);
    }

    const mocks = await generateMocks(articleCount);
    await initDb(sequelize, mocks);
  },
};
