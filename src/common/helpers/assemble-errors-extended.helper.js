'use strict';

const {
  ArticleKey,
  FormElementKey,
} = require(`../enums`);

const articleKeyToFieldKey = {
  [ArticleKey.TITLE]: FormElementKey.TITLE,
  [ArticleKey.PICTURE]: FormElementKey.PICTURE,
  [ArticleKey.CREATED_DATE]: FormElementKey.PUBLICATION_DATE,
  [ArticleKey.ANNOUNCE]: FormElementKey.ANNOUNCE,
  [ArticleKey.FULL_TEXT]: FormElementKey.FULL_TEXT,
  [ArticleKey.CATEGORIES]: FormElementKey.CATEGORY,
  [ArticleKey.COMMENTS]: FormElementKey.ANNOUNCE,
};

const assembleErrorsExtended = (error) => {
  return error.details.reduce((acc, err) => {
    const field = articleKeyToFieldKey[err.context.key];

    if (!acc[field]) {
      acc[field] = [];
    }

    acc[field].push(err.message);
    return acc;
  }, {});
};

module.exports = {
  assembleErrorsExtended,
};
