'use strict';

const fs = require(`fs`).promises;
const chalk = require(`chalk`);
const {
  DATE_FORMAT_PATTERN,
  DEFAULT_ENCODING,
  ArticleKey,
  CliCommand,
  ExitCode,
} = require(`../../constants`);
const {
  getRandomArrayItem,
  getRandomBoolean,
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
const PICTURES = [
  `forest.jpg`,
  `sea.jpg`,
  `skyscraper.jpg`,
];

const AnounceRestrict = {
  MIN: 1,
  MAX: 5,
};

const CategoriesRestrict = {
  MIN: 1,
  MAX: 3,
};

const CommentsRestrict = {
  MIN: 1,
  MAX: 5,
};

const FilePath = {
  COMMENTS: `./data/comments.txt`,
  CATEGORIES: `./data/categories.txt`,
  SENTENCES: `./data/sentences.txt`,
  TITLES: `./data/titles.txt`,
};

const ArticlesCountRestrict = {
  MIN: 1,
  MAX: 1000,
};

const articleGenerator = (count, titles, sentences, categories, comments) => {
  return Array.from(new Array(count), () => {
    const hasPicture = Boolean(getRandomBoolean());
    const hasFullText = Boolean(getRandomBoolean());

    const article = {
      [ArticleKey.ID]: getRandomId(),
      [ArticleKey.TITLE]: getRandomArrayItem(titles),
      [ArticleKey.CREATED_DATE]: getDate(PAST_MONTH_LIMIT, DATE_FORMAT_PATTERN),
      [ArticleKey.ANNOUNCE]: getItems(sentences, AnounceRestrict.MIN, AnounceRestrict.MAX).join(` `),
      [ArticleKey.CATEGORIES]: getItems(categories, CategoriesRestrict.MIN, CategoriesRestrict.MAX),
      [ArticleKey.COMMENTS]: getComments(comments, CommentsRestrict.MIN, CommentsRestrict.MAX),
    };

    if (hasPicture) {
      article[ArticleKey.PICTURE] = getRandomArrayItem(PICTURES);
    }

    if (hasFullText) {
      article[ArticleKey.FULL_TEXT] = getItems(sentences, FULL_TEXT_MIN_SIZE, sentences.length - 1).join(` `);
    }

    return article;
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
    const articleCount = Number.parseInt(count, 10) || ArticlesCountRestrict.MIN;

    const titles = await readContent(FilePath.TITLES);
    const sentences = await readContent(FilePath.SENTENCES);
    const categories = await readContent(FilePath.CATEGORIES);
    const comments = await readContent(FilePath.COMMENTS);

    if (articleCount > ArticlesCountRestrict.MAX) {
      console.error(chalk.red(`Не больше ${ArticlesCountRestrict.MAX} публикаций.`));
      process.exit(ExitCode.ERROR);
    }

    const content = articleGenerator(articleCount, titles, sentences, categories, comments);
    const articles = JSON.stringify(content, null, 2);

    try {
      await fs.writeFile(OUTPUT_FILE_NAME, articles);
      console.info(chalk.green(`Публикации (${articleCount}) успешно сгенерированы.`));
      process.exit(ExitCode.SUCCESS);
    } catch (err) {
      console.error(chalk.red(`Невозможно сохранить публикации.`));
      process.exit(ExitCode.ERROR);
    }
  },
};
