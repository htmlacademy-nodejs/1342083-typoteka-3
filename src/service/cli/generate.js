'use strict';

const fs = require(`fs`).promises;
const chalk = require(`chalk`);
const {
  CategoryKey,
  CommentKey,
  ArticleKey,
  CliCommand,
  ExitCode,
} = require(`../../constants`);
const {
  MockCount,
  CategoriesRestrict,
  CommentsRestrict,
  ArticleCountRestrict,
  FilePath,
  FileName,
} = require(`./constants`);
const {
  getRandomId,
  getRandomArrayItem,
  getRandomBoolean,
} = require(`../../utils`);
const {
  generateCategory,
  generateUser,
  generateComment,
  generateArticle,
  getItems,
  readContent,
} = require(`./utils`);

const generateFullArticle = (count, mockTitles, mockSentences, mockCategories, mockComments) => {
  const categories = mockCategories.map((name) => {
    const category = generateCategory(name);
    category[CategoryKey.ID] = getRandomId();

    return category;
  });

  const users = Array.from(new Array(MockCount.USERS), () => {
    const user = generateUser();

    return user;
  });

  const comments = mockComments.map((text) => {
    const comment = generateComment(text);
    comment[CommentKey.ID] = getRandomId();
    comment[CommentKey.AUTHOR] = getRandomArrayItem(users);

    return comment;
  });

  return Array.from(new Array(count), () => {
    const hasComments = getRandomBoolean();

    const article = {
      [ArticleKey.ID]: getRandomId(),
      ...generateArticle(mockTitles, mockSentences),
      [ArticleKey.CATEGORIES]: getItems(categories, CategoriesRestrict.MIN, CategoriesRestrict.MAX),
      [ArticleKey.COMMENTS]: hasComments ? getItems(comments, CommentsRestrict.MIN, CommentsRestrict.MAX) : [],
      [ArticleKey.AUTHOR]: getRandomArrayItem(users),
    };

    return article;
  });
};

module.exports = {
  name: CliCommand.GENERATE,
  async run(args) {
    const [count] = args;
    const articleCount = Number.parseInt(count, 10) || ArticleCountRestrict.MIN;

    const [titles, sentences, categories, comments] = await Promise.all([
      readContent(FilePath.TITLES),
      readContent(FilePath.SENTENCES),
      readContent(FilePath.CATEGORIES),
      readContent(FilePath.COMMENTS),
    ]);

    if (articleCount > ArticleCountRestrict.MAX) {
      console.error(chalk.red(`Не больше ${ArticleCountRestrict.MAX} публикаций.`));
      process.exit(ExitCode.ERROR);
    }

    const content = generateFullArticle(articleCount, titles, sentences, categories, comments);
    const articles = JSON.stringify(content, null, 2);

    try {
      await fs.writeFile(FileName.JSON, articles);
      console.info(chalk.green(`Публикации (${articleCount}) успешно сгенерированы.`));
      process.exit(ExitCode.SUCCESS);
    } catch (err) {
      console.error(chalk.red(`Невозможно сохранить публикации.`));
      process.exit(ExitCode.ERROR);
    }
  },
};
