'use strict';

const fs = require(`fs`).promises;
const chalk = require(`chalk`);
const {DateTime} = require(`luxon`);
const {ExitCode} = require(`../../constants`);
const {
  getRandomIntInclusive,
  getRandomArrayItem,
  getRandomArrayItems,
  getRandomId,
} = require(`../../utils`);
const {
  CliCommand,
  FilePath,
  MocksConfig,
} = require(`./constants`);

const getTitle = (titles) => getRandomArrayItem(titles);

const getDate = () => {
  const now = DateTime.now();
  const past = now.minus({
    month: MocksConfig.PAST_MONTH_LIMIT,
  });

  const nowTs = now.valueOf();
  const pastTs = past.valueOf();
  const randomTs = getRandomIntInclusive(nowTs, pastTs);

  return DateTime
    .fromMillis(randomTs)
    .toFormat(MocksConfig.DATE_FORMAT);
};

const getSentences = (sentences, min, max) => {
  const count = getRandomIntInclusive(min, max);
  return getRandomArrayItems(sentences, count).join(` `);
};

const getAnounce = (sentences) => {
  const {MIN, MAX} = MocksConfig.ANOUNCE_RESTRICT;
  return getSentences(sentences, MIN, MAX);
};

const getFullText = (sentences) =>
  getSentences(sentences, MocksConfig.FULL_TEXT_RESTRICT_MIN, sentences.length - 1);

const getCategories = (categories) => {
  const count = getRandomIntInclusive(MocksConfig.CATEGORY_RESTRICT.MIN, MocksConfig.CATEGORY_RESTRICT.MAX);
  return getRandomArrayItems(categories, count);
};

const getComments = (comments) => {
  const count = getRandomIntInclusive(MocksConfig.COMMENTS_RESTRICT.MIN, MocksConfig.COMMENTS_RESTRICT.MAX);
  return getRandomArrayItems(comments, count).map((text) => ({
    id: getRandomId(),
    text,
  }));
};

const publicationGenerator = (count, titles, sentences, categories, comments) => {
  return Array.from(new Array(count), () => {
    return {
      id: getRandomId(),
      title: getTitle(titles),
      createdDate: getDate(),
      announce: getAnounce(sentences),
      fullText: getFullText(sentences),
      сategory: getCategories(categories),
      comments: getComments(comments),
    };
  });
};

const readContent = async (filePath) => {
  try {
    const content = await fs.readFile(filePath, `utf-8`);
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
    const countPublication = Number.parseInt(count, 10) || MocksConfig.DEFAULT_COUNT;

    const titles = await readContent(FilePath.TITLES);
    const sentences = await readContent(FilePath.SENTENCES);
    const categories = await readContent(FilePath.CATEGORIES);
    const comments = await readContent(FilePath.COMMENTS);

    if (countPublication > MocksConfig.MAX_COUNT) {
      console.error(chalk.red(`Не больше ${MocksConfig.MAX_COUNT} публикаций.`));
      process.exit(ExitCode.ERROR);
    }

    const content = publicationGenerator(countPublication, titles, sentences, categories, comments);
    const publications = JSON.stringify(content, null, 2);

    try {
      await fs.writeFile(MocksConfig.FILE_NAME, publications);
      console.info(chalk.green(`Публикации (${countPublication}) успешно сгенерированы.`));
      process.exit(ExitCode.SUCCESS);
    } catch (err) {
      console.error(chalk.red(`Невозможно сохранить публикации.`));
      process.exit(ExitCode.ERROR);
    }
  },
};
