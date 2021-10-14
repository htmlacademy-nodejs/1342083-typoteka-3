'use strict';

const fs = require(`fs`).promises;
const chalk = require(`chalk`);
const {
  CliCommand,
  ExitCode,
} = require(`../../constants`);
const {
  FileName,
  FilePath,
  PublicationCountRestrict,
} = require(`./constants`);
const {
  generatePublication,
  readContent,
} = require(`./utils`);

module.exports = {
  name: CliCommand.GENERATE,
  async run(args) {
    const [count] = args;
    const publicationCount = Number.parseInt(count, 10) || PublicationCountRestrict.MIN;

    const [titles, sentences, categories, comments] = await Promise.all([
      readContent(FilePath.TITLES),
      readContent(FilePath.SENTENCES),
      readContent(FilePath.CATEGORIES),
      readContent(FilePath.COMMENTS),
    ]);

    if (publicationCount > PublicationCountRestrict.MAX) {
      console.error(chalk.red(`Не больше ${PublicationCountRestrict.MAX} публикаций.`));
      process.exit(ExitCode.ERROR);
    }

    const content = generatePublication(publicationCount, titles, sentences, categories, comments);
    const publications = JSON.stringify(content, null, 2);

    try {
      await fs.writeFile(FileName.JSON, publications);
      console.info(chalk.green(`Публикации (${publicationCount}) успешно сгенерированы.`));
      process.exit(ExitCode.SUCCESS);
    } catch (err) {
      console.error(chalk.red(`Невозможно сохранить публикации.`));
      process.exit(ExitCode.ERROR);
    }
  },
};
