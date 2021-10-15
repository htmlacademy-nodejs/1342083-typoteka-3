'use strict';

const fs = require(`fs`).promises;
const chalk = require(`chalk`);
const {
  DateOffsetUnit,
  CategoryKey,
  CommentKey,
  UserKey,
  PublicationKey,
  DEFAULT_ENCODING,
} = require(`../../constants`);
const {
  getRandomDate,
  generateRandomEmail,
  getRandomIntInclusive,
  getRandomArrayItems,
  getRandomBoolean,
  getRandomArrayItem,
} = require(`../../utils`);

const DATE_OFFSET = 3;
const FULL_TEXT_MIN_SIZE = 1;

const AnounceRestrict = {
  MIN: 1,
  MAX: 5,
};

const MaxLength = {
  ANNOUNCE: 250,
  FULL_TEXT: 100,
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

const generateRandomDate = () => {
  const offsetValue = getRandomIntInclusive(-DATE_OFFSET, DATE_OFFSET);
  const offsetUnit = getRandomArrayItem([DateOffsetUnit.DAY, DateOffsetUnit.MONTH, DateOffsetUnit.WEEK]);
  return getRandomDate(offsetValue, offsetUnit);
};

const getItems = (items, min, max) => {
  const count = getRandomIntInclusive(min, max);
  return getRandomArrayItems(items, count);
};

const generateCategory = (name) => {
  const category = {
    [CategoryKey.NAME]: name,
  };

  return category;
};

const generateComment = (text) => {
  const comment = {
    [CommentKey.TEXT]: text,
    [CommentKey.CREATED_DATE]: generateRandomDate(),
  };

  return comment;
};

const generateUser = () => {
  const user = {
    [UserKey.EMAIL]: generateRandomEmail(),
    [UserKey.FIRST_NAME]: getRandomArrayItem(firstNames),
    [UserKey.LAST_NAME]: getRandomArrayItem(lastNames),
    [UserKey.PASSWORD_HASH]: getRandomArrayItem(passwordHashes),
    [UserKey.AVATAR]: getRandomArrayItem(avatars),
  };

  return user;
};

const truncateText = (text, length) => {
  const ellipsis = `...`;
  return text.slice(0, length - ellipsis.length) + ellipsis;
};

const generatePublication = (titles, sentences, allKeys) => {
  const announce = getItems(sentences, AnounceRestrict.MIN, AnounceRestrict.MAX).join(` `);
  const fullText = getItems(sentences, FULL_TEXT_MIN_SIZE, sentences.length - 1).join(` `);

  const publication = {
    [PublicationKey.TITLE]: getRandomArrayItem(titles),
    [PublicationKey.PICTURE]: getRandomArrayItem(pictures),
    [PublicationKey.CREATED_DATE]: generateRandomDate(),
    [PublicationKey.ANNOUNCE]: truncateText(announce, MaxLength.ANNOUNCE),
    [PublicationKey.FULL_TEXT]: truncateText(fullText, MaxLength.FULL_TEXT),
  };

  if (!allKeys) {
    const hasPicture = getRandomBoolean();
    const hasFullText = getRandomBoolean();

    if (!hasPicture) {
      delete publication[PublicationKey.PICTURE];
    }

    if (!hasFullText) {
      delete publication[PublicationKey.FULL_TEXT];
    }
  }

  return publication;
};

const readContent = async (filePath) => {
  try {
    const content = await fs.readFile(filePath, DEFAULT_ENCODING);
    return content.trim().split(`\n`);
  } catch (err) {
    console.error(chalk.red(err));
    return [];
  }
};

module.exports = {
  generateRandomDate,
  getItems,
  generateCategory,
  generateComment,
  generateUser,
  generatePublication,
  readContent,
};
