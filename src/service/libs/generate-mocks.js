'use strict';

const {
  FULL_TEXT_MIN_SIZE,
  PICTURES,
  FIRST_NAMES,
  LAST_NAMES,
  PASSWORD_HASHES,
  AVATARS,
} = require(`../../common/constants`);
const {
  FilePath,
  CategoryKey,
  AnnounceRestrict,
  ArticleKey,
  TextMaxLength,
  MockItemCount,
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
  getRandomEmail,
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
    };
  });

  const users = Array.from(new Array(MockItemCount.USERS), () => {
    return {
      [UserKey.EMAIL]: getRandomEmail(),
      [UserKey.FIRST_NAME]: getArrayRandomItem(FIRST_NAMES),
      [UserKey.LAST_NAME]: getArrayRandomItem(LAST_NAMES),
      [UserKey.PASSWORD_HASH]: getArrayRandomItem(PASSWORD_HASHES),
      [UserKey.AVATAR]: getArrayRandomItem(AVATARS),
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
