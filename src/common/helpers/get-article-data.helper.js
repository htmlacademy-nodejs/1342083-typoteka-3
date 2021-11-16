'use strict';

const {
  ArticleKey,
  FormElementKey,
  CategoryKey,
} = require(`../enums`);
const {ensureArray} = require(`./ensure-array.helper`);

const getArticleData = (body, file) => {
  const createdDate = new Date(body[FormElementKey.PUBLICATION_DATE]).toISOString();
  const categories = ensureArray(body[FormElementKey.CATEGORY]).map((category) => ({
    [CategoryKey.ID]: Number(category),
  }));
  const picture = file?.filename ?? body[FormElementKey.PICTURE] ?? null;


  return {
    [ArticleKey.TITLE]: body[FormElementKey.TITLE],
    [ArticleKey.PICTURE]: picture,
    [ArticleKey.CREATED_DATE]: createdDate,
    [ArticleKey.ANNOUNCE]: body[FormElementKey.ANNOUNCE],
    [ArticleKey.FULL_TEXT]: body[FormElementKey.FULL_TEXT] || null,
    [ArticleKey.CATEGORIES]: categories,
  };
};

module.exports = {
  getArticleData,
};
