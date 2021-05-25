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
const {
  MocksConfig,
  AnounceRestrict,
  FullTextRestrict,
  CategoryRestrict
} = require(`./constants`);

const getTitle = () => getRandomArrayItem(MocksConfig.TITLES);

const getDate = () => {
  const now = DateTime.now();
  const past = now.minus({
    month: MocksConfig.PAST_MONTH_LIMIT,
  });

  const nowTs = now.valueOf();
  const pastTs = past.valueOf();
  const randomTs = getRandomIntInclusive(nowTs, pastTs);

  return DateTime
    .fromMillis(randomTs)
    .toFormat(MocksConfig.DATE_FORMAT);
};

const getSentences = ({MIN, MAX}) => {
  const count = getRandomIntInclusive(MIN, MAX);
  return getRandomArrayItems(MocksConfig.ANOUNCES, count).join(` `);
};

const getAnounce = () => {
  return getSentences(AnounceRestrict);
};

const getFullText = () => getSentences(FullTextRestrict);

const getCategories = () => {
  const count = getRandomIntInclusive(CategoryRestrict.MIN, CategoryRestrict.MAX);
  return getRandomArrayItems(MocksConfig.CATEGORIES, count);
};

const publicationGenerator = (count) => {
  return Array.from(new Array(count), () => {
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
  run(args) {
    const [count] = args;
    const countPublication = Number.parseInt(count, 10) || MocksConfig.DEFAULT_COUNT;

    if (countPublication > MocksConfig.MAX_COUNT) {
      console.error(chalk.red(`Не больше ${MocksConfig.MAX_COUNT} публикаций.`));
      process.exit(ExitCode.ERROR);
    }

    const data = publicationGenerator(countPublication);
    const publications = JSON.stringify(data, null, 2);

    fs.writeFile(MocksConfig.FILE_NAME, publications, (err) => {
      if (err) {
        console.error(chalk.red(`Невозможно сохранить публикации.`));
        process.exit(ExitCode.ERROR);
      }

      console.info(chalk.green(`Публикации (${countPublication}) успешно сгенерированы.`));
      process.exit(ExitCode.SUCCESS);
    });
  },
};
