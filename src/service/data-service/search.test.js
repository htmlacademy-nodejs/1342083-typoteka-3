'use strict';

const {beforeAll, describe, expect, test} = require(`@jest/globals`);
const SearchService = require(`./search`);

const mockData = [
  {
    id: `Pja2we`,
    title: `Как начать программировать`,
    createdDate: `2021-07-17 12:01:37`,
    announce: `Освоить вёрстку несложно. Возьмите книгу новую книгу и закрепите все упражнения на практике. Ёлки — это не просто красивое дерево. Это прочная древесина. Это один из лучших рок-музыкантов. Процессор заслуживает особого внимания. Он обязательно понравится геймерам со стажем. Программировать не настолько сложно, как об этом говорят.`,
    fullText: `Этот смартфон — настоящая находка. Большой и яркий экран, мощнейший процессор — всё это в небольшом гаджете. Программировать не настолько сложно, как об этом говорят. Игры и программирование разные вещи. Не стоит идти в программисты, если вам нравятся только игры. Вы можете достичь всего. Стоит только немного постараться и запастись книгами. Он написал больше 30 хитов. Из под его пера вышло 8 платиновых альбомов. Процессор заслуживает особого внимания. Он обязательно понравится геймерам со стажем. Золотое сечение — соотношение двух величин, гармоническая пропорция. Помните, небольшое количество ежедневных упражнений лучше, чем один раз, но много. Первая большая ёлка была установлена только в 1938 году. Достичь успеха помогут ежедневные повторения. Освоить вёрстку несложно. Возьмите книгу новую книгу и закрепите все упражнения на практике. Как начать действовать? Для начала просто соберитесь.`,
    categories: [
      `Разное`
    ],
    comments: [
      {
        id: `Uxjtbf`,
        text: `Плюсую, но слишком много буквы!`
      },
      {
        id: `IyOCkw`,
        text: `Совсем немного...`
      }
    ]
  },
  {
    id: `5ka3Xc`,
    title: `Борьба с прокрастинацией`,
    createdDate: `2021-08-30 22:02:37`,
    announce: `Первая большая ёлка была установлена только в 1938 году.`,
    fullText: `Первая большая ёлка была установлена только в 1938 году. Этот смартфон — настоящая находка. Большой и яркий экран, мощнейший процессор — всё это в небольшом гаджете. Альбом стал настоящим открытием года. Мощные гитарные рифы и скоростные соло-партии не дадут заскучать. Простые ежедневные упражнения помогут достичь успеха. Освоить вёрстку несложно. Возьмите книгу новую книгу и закрепите все упражнения на практике. Помните, небольшое количество ежедневных упражнений лучше, чем один раз, но много. Как начать действовать? Для начала просто соберитесь. Золотое сечение — соотношение двух величин, гармоническая пропорция. Он написал больше 30 хитов. Вы можете достичь всего. Стоит только немного постараться и запастись книгами. Ёлки — это не просто красивое дерево. Это прочная древесина. Это один из лучших рок-музыкантов. Собрать камни бесконечности легко, если вы прирожденный герой. Из под его пера вышло 8 платиновых альбомов. Игры и программирование разные вещи. Не стоит идти в программисты, если вам нравятся только игры. Бороться с прокрастинацией несложно. Просто действуйте. Маленькими шагами. Программировать не настолько сложно, как об этом говорят.`,
    categories: [
      `Разное`,
      `Кино`,
      `Без рамки`
    ],
    comments: [
      {
        id: `ALZ1mj`,
        text: `Мне не нравится ваш стиль. Ощущение, что вы меня поучаете.`
      }
    ]
  },
  {
    id: `InTK25`,
    title: `Борьба с прокрастинацией`,
    createdDate: `2021-08-19 16:30:16`,
    announce: `Золотое сечение — соотношение двух величин, гармоническая пропорция. Этот смартфон — настоящая находка. Большой и яркий экран, мощнейший процессор — всё это в небольшом гаджете.`,
    fullText: `Из под его пера вышло 8 платиновых альбомов. Ёлки — это не просто красивое дерево. Это прочная древесина. Он написал больше 30 хитов. Как начать действовать? Для начала просто соберитесь. Простые ежедневные упражнения помогут достичь успеха. Первая большая ёлка была установлена только в 1938 году. Вы можете достичь всего. Стоит только немного постараться и запастись книгами. Этот смартфон — настоящая находка. Большой и яркий экран, мощнейший процессор — всё это в небольшом гаджете. Процессор заслуживает особого внимания. Он обязательно понравится геймерам со стажем. Золотое сечение — соотношение двух величин, гармоническая пропорция. Бороться с прокрастинацией несложно. Просто действуйте. Маленькими шагами.`,
    categories: [
      `Программирование`,
      `Без рамки`
    ],
    comments: [
      {
        id: `SHtmOU`,
        text: `Плюсую, но слишком много буквы!`
      },
      {
        id: `TIWiff`,
        text: `Планируете записать видосик на эту тему?`
      }
    ]
  },
  {
    id: `j-DlC5`,
    title: `Самый лучший музыкальный альбом этого года`,
    createdDate: `2021-07-10 12:19:40`,
    announce: `Золотое сечение — соотношение двух величин, гармоническая пропорция. Собрать камни бесконечности легко, если вы прирожденный герой. Помните, небольшое количество ежедневных упражнений лучше, чем один раз, но много. Рок-музыка всегда ассоциировалась с протестами. Так ли это на самом деле?,`,
    fullText: `Это один из лучших рок-музыкантов. Бороться с прокрастинацией несложно. Просто действуйте. Маленькими шагами. Первая большая ёлка была установлена только в 1938 году. Программировать не настолько сложно, как об этом говорят.`,
    categories: [
      `Музыка`
    ],
    comments: [
      {
        id: `Zn-I-q`,
        text: `Это где ж такие красоты?`
      },
      {
        id: `dWe1Nu`,
        text: `Мне кажется или я уже читал это где-то?`
      },
      {
        id: `TblP5K`,
        text: `Совсем немного...`
      },
      {
        id: `bBYgoh`,
        text: `Мне не нравится ваш стиль. Ощущение, что вы меня поучаете.`
      }
    ]
  },
  {
    id: `4_uNbt`,
    title: `Ёлки. История деревьев`,
    createdDate: `2021-07-11 01:25:27`,
    announce: `Он написал больше 30 хитов. Программировать не настолько сложно, как об этом говорят. Этот смартфон — настоящая находка. Большой и яркий экран, мощнейший процессор — всё это в небольшом гаджете.`,
    fullText: `Ёлки — это не просто красивое дерево. Это прочная древесина. Игры и программирование разные вещи. Не стоит идти в программисты, если вам нравятся только игры. Первая большая ёлка была установлена только в 1938 году. Простые ежедневные упражнения помогут достичь успеха. Этот смартфон — настоящая находка. Большой и яркий экран, мощнейший процессор — всё это в небольшом гаджете. Процессор заслуживает особого внимания. Он обязательно понравится геймерам со стажем. Освоить вёрстку несложно. Возьмите книгу новую книгу и закрепите все упражнения на практике.`,
    categories: [
      `Программирование`,
      `Деревья`,
      `За жизнь`
    ],
    comments: []
  }
];

describe(`SearchService возвращает результаты поиска`, () => {
  let service;
  let searchResults;

  beforeAll(() => {
    service = new SearchService(mockData);
    searchResults = service.findAll(`Борьба с прокрастинацией`);
  });

  test(`Возвращает 2 публикации по запросу "Борьба с прокрастинацией"`, () => {
    expect(searchResults.length).toBe(2);
  });

  test(`Возвращает 2 публикации в порядке от самых новых к самым старым`, () => {
    expect(searchResults[0].createdDate).toBe(`2021-08-30 22:02:37`);
    expect(searchResults[1].createdDate).toBe(`2021-08-19 16:30:16`);
  });

  test(`Возвращает пустой массив, если ничего не найдено`, () => {
    expect(service.findAll(`To be, or not to be`)).toEqual([]);
  });
});
