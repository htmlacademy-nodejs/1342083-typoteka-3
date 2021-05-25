'use strict';

const CliCommand = {
  GENERATE: `--generate`,
  HELP: `--help`,
  VERSION: `--version`,
};

const DEFAULT_COMMAND = CliCommand.HELP;

const MocksConfig = {
  FILE_NAME: `mock.json`,
  DEFAULT_COUNT: 1,
  MAX_COUNT: 1000,
  PAST_MONTH_LIMIT: 3,
  DATE_FORMAT: `yyyy-LL-dd HH:mm:ss`,
  TITLES: [
    `Ёлки. История деревьев`,
    `Как перестать беспокоиться и начать жить`,
    `Как достигнуть успеха не вставая с кресла`,
    `Обзор новейшего смартфона`,
    `Лучшие рок-музыканты 20-века`,
    `Как начать программировать`,
    `Учим HTML и CSS`,
    `Что такое золотое сечение`,
    `Как собрать камни бесконечности`,
    `Борьба с прокрастинацией`,
    `Рок — это протест`,
    `Самый лучший музыкальный альбом этого года`,
  ],
  ANOUNCES: [
    `Ёлки — это не просто красивое дерево. Это прочная древесина.`,
    `Первая большая ёлка была установлена только в 1938 году.`,
    `Вы можете достичь всего. Стоит только немного постараться и запастись книгами.`,
    `Этот смартфон — настоящая находка. Большой и яркий экран, мощнейший процессор — всё это в небольшом гаджете.`,
    `Золотое сечение — соотношение двух величин, гармоническая пропорция.`,
    `Собрать камни бесконечности легко, если вы прирожденный герой.`,
    `Освоить вёрстку несложно. Возьмите книгу новую книгу и закрепите все упражнения на практике.`,
    `Бороться с прокрастинацией несложно. Просто действуйте. Маленькими шагами.`,
    `Программировать не настолько сложно, как об этом говорят.`,
    `Простые ежедневные упражнения помогут достичь успеха.`,
    `Это один из лучших рок-музыкантов.`,
    `Он написал больше 30 хитов.`,
    `Из под его пера вышло 8 платиновых альбомов.`,
    `Процессор заслуживает особого внимания. Он обязательно понравится геймерам со стажем.`,
    `Рок-музыка всегда ассоциировалась с протестами. Так ли это на самом деле?`,
    `Достичь успеха помогут ежедневные повторения.`,
    `Помните, небольшое количество ежедневных упражнений лучше, чем один раз, но много.`,
    `Как начать действовать? Для начала просто соберитесь.`,
    `Игры и программирование разные вещи. Не стоит идти в программисты, если вам нравятся только игры.`,
    `Альбом стал настоящим открытием года. Мощные гитарные рифы и скоростные соло-партии не дадут заскучать.`,
  ],
  CATEGORIES: [
    `Деревья`,
    `За жизнь`,
    `Без рамки`,
    `Разное`,
    `IT`,
    `Музыка`,
    `Кино`,
    `Программирование`,
    `Железо`,
  ],
};

const AnounceRestrict = {
  MIN: 1,
  MAX: 5,
};

const FullTextRestrict = {
  MIN: 1,
  MAX: MocksConfig.ANOUNCES.length - 1,
};

const CategoryRestrict = {
  MIN: 1,
  MAX: 3,
};

module.exports = {
  CliCommand,
  DEFAULT_COMMAND,
  MocksConfig,
  AnounceRestrict,
  FullTextRestrict,
  CategoryRestrict,
};
