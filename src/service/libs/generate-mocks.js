'use strict';

const passwordUtils = require(`../../common/libs/password`);
const {
  FULL_TEXT_MIN_SIZE,
  PICTURES,
} = require(`../../common/constants`);
const {
  FilePath,
  CategoryKey,
  AnnounceRestrict,
  ArticleKey,
  TextMaxLength,
  UserKey,
  CommentsRestrict,
  CommentKey,
  CategoriesRestrict,
  ArticleCategoryKey,
} = require(`../../common/enums`);
const {
  readContent,
  getArrayRandomItem,
  getArrayRandomItems,
  getRandomBoolean,
  getRandomDate,
  truncateString,
  getRandomInt,
  getArrayRandomIndex
} = require(`../../common/helpers`);

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

  const users = [
    {
      [UserKey.EMAIL]: `jerde@example.com`,
      [UserKey.FIRST_NAME]: `Kendall`,
      [UserKey.LAST_NAME]: `Jerde`,
      [UserKey.PASSWORD_HASH]: await passwordUtils.hash(`jerde@example.com`),
      [UserKey.AVATAR]: `avatar-1.png`,
    },
    {
      [UserKey.EMAIL]: `medhurst@example.com`,
      [UserKey.FIRST_NAME]: `Shanna`,
      [UserKey.LAST_NAME]: `Medhurst`,
      [UserKey.PASSWORD_HASH]: await passwordUtils.hash(`medhurst@example.com`),
      [UserKey.AVATAR]: `avatar-2.png`,
    },
    {
      [UserKey.EMAIL]: `johnson@example.com`,
      [UserKey.FIRST_NAME]: `Eva`,
      [UserKey.LAST_NAME]: `Johnson`,
      [UserKey.PASSWORD_HASH]: await passwordUtils.hash(`johnson@example.com`),
      [UserKey.AVATAR]: `avatar-3.png`,
    },
    {
      [UserKey.EMAIL]: `kautzer@example.com`,
      [UserKey.FIRST_NAME]: `Lera`,
      [UserKey.LAST_NAME]: `Kautzer`,
      [UserKey.PASSWORD_HASH]: await passwordUtils.hash(`kautzer@example.com`),
      [UserKey.AVATAR]: `avatar-4.png`,
    },
    {
      [UserKey.EMAIL]: `ebert@example.com`,
      [UserKey.FIRST_NAME]: `Foster`,
      [UserKey.LAST_NAME]: `Ebert`,
      [UserKey.PASSWORD_HASH]: await passwordUtils.hash(`ebert@example.com`),
      [UserKey.AVATAR]: `avatar-5.png`,
    },
  ];

  const articles = Array.from(new Array(count), () => {
    const announce = getArrayRandomItems(mockSentences, {
      min: AnnounceRestrict.MIN,
      max: AnnounceRestrict.MAX,
    }).join(` `);

    const fullText = getArrayRandomItems(mockSentences, {
      min: FULL_TEXT_MIN_SIZE,
      max: mockSentences.length - 1,
    }).join(` `);

    return {
      [ArticleKey.TITLE]: getArrayRandomItem(mockTitles),
      [ArticleKey.PICTURE]: getRandomBoolean() ? getArrayRandomItem(PICTURES) : null,
      [ArticleKey.CREATED_DATE]: getRandomDate(),
      [ArticleKey.ANNOUNCE]: truncateString(announce, TextMaxLength.ANNOUNCE),
      [ArticleKey.FULL_TEXT]: getRandomBoolean() ? truncateString(fullText, TextMaxLength.FULL_TEXT) : null,
      [ArticleKey.USER_ID]: getArrayRandomIndex(users) + 1,
    };
  });

  const comments = articles.map(() => {
    const comentsCount = getRandomInt(CommentsRestrict.MIN, CommentsRestrict.MAX);
    return Array.from(new Array(comentsCount), () => {
      return {
        [CommentKey.TEXT]: getArrayRandomItem(mockComments),
        [CommentKey.CREATED_DATE]: getRandomDate(),
        [CommentKey.ARTICLE_ID]: getArrayRandomIndex(articles) + 1,
        [CommentKey.USER_ID]: getArrayRandomIndex(users) + 1,
      };

    });
  }).flat();

  const categoriesIndexes = mockCategories.map((_category, index) => index);
  const articleCategories = articles.map((_article, articleIndex) => {
    const categoriesCount = getRandomInt(CategoriesRestrict.MIN, CategoriesRestrict.MAX);
    return getArrayRandomItems(categoriesIndexes, categoriesCount).sort().map((categoryIndex) => {
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
