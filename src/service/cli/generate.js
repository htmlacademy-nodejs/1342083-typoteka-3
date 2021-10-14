'use strict';

const fs = require(`fs`).promises;
const chalk = require(`chalk`);
const {
  CategoryKey,
  CommentKey,
  PublicationKey,
  CliCommand,
  ExitCode,
} = require(`../../constants`);
const {
  MockCount,
  CategoriesRestrict,
  CommentsRestrict,
  PublicationCountRestrict,
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
  generatePublication,
  getItems,
  readContent,
} = require(`./utils`);

const generateFullPublication = (count, mockTitles, mockSentences, mockCategories, mockComments) => {
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

    const publication = {
      [PublicationKey.ID]: getRandomId(),
      ...generatePublication(mockTitles, mockSentences),
      [PublicationKey.CATEGORIES]: getItems(categories, CategoriesRestrict.MIN, CategoriesRestrict.MAX),
      [PublicationKey.COMMENTS]: hasComments ? getItems(comments, CommentsRestrict.MIN, CommentsRestrict.MAX) : [],
      [PublicationKey.AUTHOR]: getRandomArrayItem(users),
    };

    return publication;
  });
};

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

    const content = generateFullPublication(publicationCount, titles, sentences, categories, comments);
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
