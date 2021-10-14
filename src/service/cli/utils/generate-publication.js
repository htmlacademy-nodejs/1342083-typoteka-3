'use strict';

const {
  DATE_FORMAT_PATTERN,
  PublicationKey,
} = require(`../../../constants`);
const {
  getRandomArrayItem,
  getRandomBoolean,
  getRandomId,
} = require(`../../../utils`);
const getDate = require(`./get-date`);
const getItems = require(`./get-items`);
const getComments = require(`./get-comments`);

const FULL_TEXT_MIN_SIZE = 1;
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

const generatePublication = (count, titles, sentences, categories, comments) => {
  return Array.from(new Array(count), () => {
    const hasPicture = Boolean(getRandomBoolean());
    const hasFullText = Boolean(getRandomBoolean());

    const article = {
      [PublicationKey.ID]: getRandomId(),
      [PublicationKey.TITLE]: getRandomArrayItem(titles),
      [PublicationKey.CREATED_DATE]: getDate(PAST_MONTH_LIMIT, DATE_FORMAT_PATTERN),
      [PublicationKey.ANNOUNCE]: getItems(sentences, AnounceRestrict.MIN, AnounceRestrict.MAX).join(` `),
      [PublicationKey.CATEGORIES]: getItems(categories, CategoriesRestrict.MIN, CategoriesRestrict.MAX),
      [PublicationKey.COMMENTS]: getComments(comments, CommentsRestrict.MIN, CommentsRestrict.MAX),
    };

    if (hasPicture) {
      article[PublicationKey.PICTURE] = getRandomArrayItem(PICTURES);
    }

    if (hasFullText) {
      article[PublicationKey.FULL_TEXT] = getItems(sentences, FULL_TEXT_MIN_SIZE, sentences.length - 1).join(` `);
    }

    return article;
  });
};

module.exports = generatePublication;
