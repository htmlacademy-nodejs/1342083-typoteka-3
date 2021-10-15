'use strict';

const fs = require(`fs`).promises;
const chalk = require(`chalk`);
const {
  CommentKey,
  PublicationKey,
  CliCommand,
  ExitCode,
} = require(`../../constants`);
const {
  MockCount,
  PublicationCountRestrict,
  FilePath,
  FileName,
  CategoriesRestrict,
} = require(`./constants`);

const {
  getRandomArrayItem,
  getArrayRandomIndex,
  getRandomIntInclusive,
} = require(`../../utils`);
const {
  generateCategory,
  generateUser,
  generateComment,
  generatePublication,
  getItems,
  readContent,
} = require(`./utils`);

const wrapRow = (items) => `(${Object.values(items).map((value) => {
  return typeof value === `string` ? `'${value}'` : value;
}).join(`, `)})`;
const wrapRows = (items) => items.map(wrapRow).join(`,\n`);

const generateQuery = (count, mockTitles, mockSentences, mockCategories, mockComments) => {
  const categories = mockCategories.map(generateCategory);
  const users = Array.from(new Array(MockCount.USERS), generateUser);

  const publications = Array.from(new Array(count), () => {
    const publication = generatePublication(mockTitles, mockSentences, true);
    publication[PublicationKey.USER_ID] = getArrayRandomIndex(users) + 1;
    return publication;
  });

  const comments = Array.from(new Array(MockCount.COMMENTS), () => {
    const text = getRandomArrayItem(mockComments);
    const comment = generateComment(text);
    comment[CommentKey.PUBLICATION_ID] = getArrayRandomIndex(publications);
    comment[CommentKey.USER_ID] = getArrayRandomIndex(users);

    return comment;
  });

  const publicationsСategories = publications.map((publication, index) => {
    const publicationId = index + 1;
    const categoriesCount = getRandomIntInclusive(0, categories.length);
    const selectedCategories = getItems(categories, CategoriesRestrict.MIN, categoriesCount);

    return selectedCategories.map((category) => {
      return {
        publicationId,
        categoryId: categories.indexOf(category) + 1,
      };
    });
  }).flat();

  return `
INSERT INTO categories(name) VALUES
${wrapRows(categories)};

INSERT INTO users(email, first_name, last_name, password_hash, avatar) VALUES
${wrapRows(users)};

ALTER TABLE publications DISABLE TRIGGER ALL;
INSERT INTO publications(title, picture, created_date, announce, full_text, user_id) VALUES
${wrapRows(publications)};
ALTER TABLE publications ENABLE TRIGGER ALL;

ALTER TABLE comments DISABLE TRIGGER ALL;
INSERT INTO comments(text, created_date, publication_id, user_id) VALUES
${wrapRows(comments)};
ALTER TABLE comments ENABLE TRIGGER ALL;

ALTER TABLE publications_categories DISABLE TRIGGER ALL;
INSERT INTO publications_categories(publication_id, category_id) VALUES
${wrapRows(publicationsСategories)};
ALTER TABLE publications_categories ENABLE TRIGGER ALL;`.trim();
};

module.exports = {
  name: CliCommand.FILL,
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

    const content = generateQuery(publicationCount, titles, sentences, categories, comments);

    try {
      await fs.writeFile(FileName.SQL, content);
      console.info(chalk.green(`Запрос на создание таблиц успешно сгенерирован.`));
      process.exit(ExitCode.SUCCESS);
    } catch (err) {
      console.error(chalk.red(`Невозможно сгенерировать запрос.`));
      process.exit(ExitCode.ERROR);
    }
  },
};
