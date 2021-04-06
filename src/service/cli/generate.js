'use strict';

const fs = require(`fs`);
const chalk = require(`chalk`);
const {DateTime} = require(`luxon`);
const {ExitCode} = require(`../../constants`);
const {
  getRandomIntInclusive,
  getRandomArrayItem,
  getRandomArrayItems,
} = require(`../../utils`);

const FILE_NAME = `mock.json`;
const DEFAULT_COUNT = 1;
const MAX_COUNT = 1000;
const PAST_MONTH_LIMIT = 3;
const DATE_FORMAT = `yyyy-LL-dd HH:mm:ss`;

const {
  TITLES,
  ANOUNCES,
  CATEGORIES,
} = require(`./text-content`);

const AnounceRestrict = {
  min: 1,
  max: 5,
};

const FullTextRestrict = {
  min: 1,
  max: ANOUNCES.length - 1,
};

const CategoryRestrict = {
  min: 1,
  max: 3,
};

const getTitle = () => getRandomArrayItem(TITLES);

const getDate = () => {
  const now = DateTime.now();
  const past = now.minus({
    month: PAST_MONTH_LIMIT,
  });

  const nowTs = now.valueOf();
  const pastTs = past.valueOf();
  const randomTs = getRandomIntInclusive(nowTs, pastTs);

  return DateTime.fromMillis(randomTs).toFormat(DATE_FORMAT);
};

const getSentences = ({min = 1, max = 1}) => {
  const count = getRandomIntInclusive(min, max);

  return getRandomArrayItems(ANOUNCES, count).join(` `);
};

const getAnounce = () => getSentences(AnounceRestrict);

const getFullText = () => getSentences(FullTextRestrict);

const getCategories = () => {
  const count = getRandomIntInclusive(CategoryRestrict.min, CategoryRestrict.max);
  return getRandomArrayItems(CATEGORIES, count);
};

const publicationGenerator = (count) => {
  return Array(count).fill(``).map(() => {
    return {
      title: getTitle(),
      createdDate: getDate(),
      announce: getAnounce(),
      fullText: getFullText(),
      сategory: getCategories(),
    };
  });
};

module.exports = {
  name: `--generate`,
  run(count) {
    count = parseInt(count, 10) || DEFAULT_COUNT;

    if (count > MAX_COUNT) {
      console.error(chalk.red(`Не больше ${MAX_COUNT} публикаций.`));
      process.exit(ExitCode.ERROR);
    }

    const data = publicationGenerator(count);
    const publications = JSON.stringify(data, null, 2);

    fs.writeFile(FILE_NAME, publications, (err) => {
      if (err) {
        console.error(chalk.red(`Невозможно сохранить публикации.`));
        process.exit(ExitCode.ERROR);
      }

      console.info(chalk.green(`Публикации (${count}) успешно сгенерированы.`));
      process.exit(ExitCode.SUCCESS);
    });
  },
};
