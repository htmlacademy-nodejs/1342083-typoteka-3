'use strict';

const fs = require(`fs`).promises;
const chalk = require(`chalk`);
const {
  CommentKey,
  ArticleKey,
  CliCommand,
  ExitCode,
} = require(`../../constants`);
const {
  MockCount,
  ArticleCountRestrict,
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
  generateArticle,
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

  const articles = Array.from(new Array(count), () => {
    const article = generateArticle(mockTitles, mockSentences, true);
    article[ArticleKey.USER_ID] = getArrayRandomIndex(users) + 1;
    return article;
  });

  const comments = Array.from(new Array(MockCount.COMMENTS), () => {
    const text = getRandomArrayItem(mockComments);
    const comment = generateComment(text);
    comment[CommentKey.ARTICLE_ID] = getArrayRandomIndex(articles) + 1;
    comment[CommentKey.USER_ID] = getArrayRandomIndex(users) + 1;

    return comment;
  });

  const articlesСategories = articles.map((article, index) => {
    const articleId = index + 1;
    const categoriesCount = getRandomIntInclusive(0, categories.length);
    const selectedCategories = getItems(categories, CategoriesRestrict.MIN, categoriesCount);

    return selectedCategories.map((category) => {
      return {
        articleId,
        categoryId: categories.indexOf(category) + 1,
      };
    });
  }).flat();

  return `
INSERT INTO categories(name) VALUES
${wrapRows(categories)};

INSERT INTO users(email, first_name, last_name, password_hash, avatar) VALUES
${wrapRows(users)};

ALTER TABLE articles DISABLE TRIGGER ALL;
INSERT INTO articles(title, picture, created_date, announce, full_text, user_id) VALUES
${wrapRows(articles)};
ALTER TABLE articles ENABLE TRIGGER ALL;

ALTER TABLE comments DISABLE TRIGGER ALL;
INSERT INTO comments(text, created_date, article_id, user_id) VALUES
${wrapRows(comments)};
ALTER TABLE comments ENABLE TRIGGER ALL;

ALTER TABLE articles_categories DISABLE TRIGGER ALL;
INSERT INTO articles_categories(article_id, category_id) VALUES
${wrapRows(articlesСategories)};
ALTER TABLE articles_categories ENABLE TRIGGER ALL;`.trim();
};

module.exports = {
  name: CliCommand.FILL,
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

    const content = generateQuery(articleCount, titles, sentences, categories, comments);

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
