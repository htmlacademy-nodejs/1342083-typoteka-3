'use strict';

const fs = require(`fs`).promises;
const chalk = require(`chalk`);
const {
  DATE_FORMAT_PATTERN,
  DEFAULT_ENCODING,
  CliCommand,
  ExitCode,
} = require(`../../constants`);
const {
  getRandomArrayItem,
  getRandomId,
} = require(`../../utils`);
const {
  getDate,
  getItems,
  getComments,
} = require(`./utils`);

const FULL_TEXT_MIN_SIZE = 1;
const OUTPUT_FILE_NAME = `mock.json`;
const PAST_MONTH_LIMIT = 3;

const AnounceRestrict = {
  MIN: 1,
  MAX: 5,
};

const CategoryRestrict = {
  MIN: 1,
  MAX: 3,
};

const CommentsRestrict = {
  MIN: 0,
  MAX: 5,
};

const FilePath = {
  COMMENTS: `./data/comments.txt`,
  CATEGORIES: `./data/categories.txt`,
  SENTENCES: `./data/sentences.txt`,
  TITLES: `./data/titles.txt`,
};

const PublicationsCountRestrict = {
  MIN: 1,
  MAX: 1000,
};

const publicationGenerator = (count, titles, sentences, categories, comments) => {
  return Array.from(new Array(count), () => {
    return {
      id: getRandomId(),
      title: getRandomArrayItem(titles),
      createdDate: getDate(PAST_MONTH_LIMIT, DATE_FORMAT_PATTERN),
      announce: getItems(sentences, AnounceRestrict.MIN, AnounceRestrict.MAX).join(` `),
      fullText: getItems(sentences, FULL_TEXT_MIN_SIZE, sentences.length - 1).join(` `),
      сategory: getItems(categories, CategoryRestrict.MIN, CategoryRestrict.MAX),
      comments: getComments(comments, CommentsRestrict.MIN, CommentsRestrict.MAX),
    };
  });
};

const readContent = async (filePath) => {
  try {
    const content = await fs.readFile(filePath, DEFAULT_ENCODING);
    return content.trim().split(`\n`);
  } catch (err) {
    console.error(chalk.red(err));
    return [];
  }
};

module.exports = {
  name: CliCommand.GENERATE,
  async run(args) {
    const [count] = args;
    const countPublication = Number.parseInt(count, 10) || PublicationsCountRestrict.MIN;

    const titles = await readContent(FilePath.TITLES);
    const sentences = await readContent(FilePath.SENTENCES);
    const categories = await readContent(FilePath.CATEGORIES);
    const comments = await readContent(FilePath.COMMENTS);

    if (countPublication > PublicationsCountRestrict.MAX) {
      console.error(chalk.red(`Не больше ${PublicationsCountRestrict.MAX} публикаций.`));
      process.exit(ExitCode.ERROR);
    }

    const content = publicationGenerator(countPublication, titles, sentences, categories, comments);
    const publications = JSON.stringify(content, null, 2);

    try {
      await fs.writeFile(OUTPUT_FILE_NAME, publications);
      console.info(chalk.green(`Публикации (${countPublication}) успешно сгенерированы.`));
      process.exit(ExitCode.SUCCESS);
    } catch (err) {
      console.error(chalk.red(`Невозможно сохранить публикации.`));
      process.exit(ExitCode.ERROR);
    }
  },
};
