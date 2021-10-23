'use strict';

const {
  CategoryKey,
  ArticleKey,
  ArticleCategoryKey,
  CommentKey,
  UserKey,
} = require(`../../constants`);
const {
  getRandomArrayItem,
  truncateText,
  getRandomArrayItems,
  getRandomIntInclusive,
  getRandomBoolean,
  getRandomDate,
  generateRandomEmail,
  getItems,
  readContent,
  generateRandomDate,
  getArrayRandomIndex,
} = require(`../../utils`);

const FULL_TEXT_MIN_SIZE = 1;

const AnounceRestrict = {
  MIN: 1,
  MAX: 5,
};

const CategoryRestrict = {
  MIN: 1,
  MAX: 5,
};

const FilePath = {
  COMMENTS: `./data/comments.txt`,
  CATEGORIES: `./data/categories.txt`,
  SENTENCES: `./data/sentences.txt`,
  TITLES: `./data/titles.txt`,
};

const MaxLength = {
  ANNOUNCE: 250,
  FULL_TEXT: 100,
};

const MockCount = {
  USERS: 10,
  COMMENTS: 50,
};

const pictures = [
  `forest.jpg`,
  `sea.jpg`,
  `skyscraper.jpg`,
];

const firstNames = [
  `Евгений`,
  `Александр`,
  `Алёна`,
  `Мария`,
  `Женя`,
];

const lastNames = [
  `Петров`,
  `Марков`,
  `Фролова`,
  `Светлова`,
  `Кириченко`,
];

const passwordHashes = [
  `514a799c6f2d29cabe5ae12d512e1fb7`,
  `3d2b0e748f740ecd8d4d498a92dc52d6`,
  `596dbaa5ec53b8a8b8c213c0136d7b7e`,
  `dbf2054308f848873a3f6a2a35817185`,
  `d6b370b94ea255f28e6e3c5df79d73c7`,
];

const avatars = [
  `avatar-1.png`,
  `avatar-2.png`,
  `avatar-3.png`,
  `avatar-4.png`,
  `avatar-5.png`,
];

module.exports = async (count) => {
  const [mockTitles, mockSentences, mockCategories, mockComments] = await Promise.all([
    readContent(FilePath.TITLES),
    readContent(FilePath.SENTENCES),
    readContent(FilePath.CATEGORIES),
    readContent(FilePath.COMMENTS),
  ]);

  const categories = mockCategories.map((name) => {
    return {
      [CategoryKey.NAME]: name,
    };
  });

  const articles = Array.from(new Array(count), () => {
    const announce = getItems(mockSentences, AnounceRestrict.MIN, AnounceRestrict.MAX).join(` `);
    const fullText = getItems(mockSentences, FULL_TEXT_MIN_SIZE, mockSentences.length - 1).join(` `);

    return {
      [ArticleKey.TITLE]: getRandomArrayItem(mockTitles),
      [ArticleKey.PICTURE]: getRandomBoolean() ? getRandomArrayItem(pictures) : null,
      [ArticleKey.CREATED_DATE]: generateRandomDate(),
      [ArticleKey.ANNOUNCE]: truncateText(announce, MaxLength.ANNOUNCE),
      [ArticleKey.FULL_TEXT]: getRandomBoolean() ? truncateText(fullText, MaxLength.FULL_TEXT) : null,
    };
  });

  const users = Array.from(new Array(MockCount.USERS), () => {
    return {
      [UserKey.EMAIL]: generateRandomEmail(),
      [UserKey.FIRST_NAME]: getRandomArrayItem(firstNames),
      [UserKey.LAST_NAME]: getRandomArrayItem(lastNames),
      [UserKey.PASSWORD_HASH]: getRandomArrayItem(passwordHashes),
      [UserKey.AVATAR]: getRandomArrayItem(avatars),
    };
  });

  const comments = mockComments.map((text) => {
    return {
      [CommentKey.TEXT]: text,
      [CommentKey.CREATED_DATE]: getRandomDate(),
      [CommentKey.ARTICLE_ID]: getArrayRandomIndex(articles) + 1,
      [CommentKey.USER_ID]: getArrayRandomIndex(users) + 1,
    };
  });

  const categoriesIndexes = mockCategories.map((_category, index) => index);
  const articleCategories = articles.map((_article, articleIndex) => {
    const categoriesCount = getRandomIntInclusive(CategoryRestrict.MIN, CategoryRestrict.MAX);
    return getRandomArrayItems(categoriesIndexes, categoriesCount).sort().map((categoryIndex) => {
      return {
        [ArticleCategoryKey.ARTICLE_ID]: articleIndex + 1,
        [ArticleCategoryKey.CATEGORY_ID]: categoryIndex + 1,
      };
    });
  }).flat();

  return {
    categories,
    articles,
    users,
    comments,
    articleCategories,
  };
};
