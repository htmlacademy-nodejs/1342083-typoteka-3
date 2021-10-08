'use strict';

const {beforeAll, describe, expect, test} = require(`@jest/globals`);
const express = require(`express`);
const request = require(`supertest`);
const categories = require(`./categories`);
const {CategoryService} = require(`../data-service`);
const {HttpStatusCode} = require(`../../constants`);

const mockData = [
  {
    id: `9FNFVU`,
    title: `Самый лучший музыкальный альбом этого года`,
    createdDate: `2021-09-08 04:40:32`,
    announce: `Рок-музыка всегда ассоциировалась с протестами. Так ли это на самом деле?, Это один из лучших рок-музыкантов. Вы можете достичь всего. Стоит только немного постараться и запастись книгами.`,
    fullText: `Золотое сечение — соотношение двух величин, гармоническая пропорция. Этот смартфон — настоящая находка. Большой и яркий экран, мощнейший процессор — всё это в небольшом гаджете. Как начать действовать? Для начала просто соберитесь. Рок-музыка всегда ассоциировалась с протестами. Так ли это на самом деле?, Вы можете достичь всего. Стоит только немного постараться и запастись книгами. Альбом стал настоящим открытием года. Мощные гитарные рифы и скоростные соло-партии не дадут заскучать. Бороться с прокрастинацией несложно. Просто действуйте. Маленькими шагами. Первая большая ёлка была установлена только в 1938 году. Освоить вёрстку несложно. Возьмите книгу новую книгу и закрепите все упражнения на практике. Процессор заслуживает особого внимания. Он обязательно понравится геймерам со стажем. Программировать не настолько сложно, как об этом говорят. Помните, небольшое количество ежедневных упражнений лучше, чем один раз, но много. Собрать камни бесконечности легко, если вы прирожденный герой. Простые ежедневные упражнения помогут достичь успеха. Ёлки — это не просто красивое дерево. Это прочная древесина.`,
    categories: [
      `Кино`
    ],
    comments: [
      {
        id: `gYIHLN`,
        text: `Мне кажется или я уже читал это где-то?`
      },
      {
        id: `LkKZ6p`,
        text: `Совсем немного...`
      }
    ]
  },
  {
    id: `rXnrWH`,
    title: `Борьба с прокрастинацией`,
    createdDate: `2021-07-28 23:20:14`,
    announce: `Достичь успеха помогут ежедневные повторения. Золотое сечение — соотношение двух величин, гармоническая пропорция. Помните, небольшое количество ежедневных упражнений лучше, чем один раз, но много. Этот смартфон — настоящая находка. Большой и яркий экран, мощнейший процессор — всё это в небольшом гаджете. Собрать камни бесконечности легко, если вы прирожденный герой.`,
    fullText: `Ёлки — это не просто красивое дерево. Это прочная древесина. Первая большая ёлка была установлена только в 1938 году. Программировать не настолько сложно, как об этом говорят. Освоить вёрстку несложно. Возьмите книгу новую книгу и закрепите все упражнения на практике. Бороться с прокрастинацией несложно. Просто действуйте. Маленькими шагами. Он написал больше 30 хитов. Простые ежедневные упражнения помогут достичь успеха. Помните, небольшое количество ежедневных упражнений лучше, чем один раз, но много.`,
    categories: [
      `За жизнь`
    ],
    comments: [
      {
        id: `5PZylU`,
        text: `Хочу такую же футболку :-)`
      },
      {
        id: `C4RBiO`,
        text: `Плюсую, но слишком много буквы!`
      },
      {
        id: `mHrC5r`,
        text: `Давно не пользуюсь стационарными компьютерами. Ноутбуки победили.`
      },
      {
        id: `o2kbWX`,
        text: `Мне не нравится ваш стиль. Ощущение, что вы меня поучаете.`
      },
      {
        id: `bURf1E`,
        text: `Мне кажется или я уже читал это где-то?`
      }
    ]
  },
  {
    id: `G2dKCb`,
    title: `Как перестать беспокоиться и начать жить`,
    createdDate: `2021-09-16 04:11:12`,
    announce: `Бороться с прокрастинацией несложно. Просто действуйте. Маленькими шагами.`,
    fullText: `Альбом стал настоящим открытием года. Мощные гитарные рифы и скоростные соло-партии не дадут заскучать. Он написал больше 30 хитов. Собрать камни бесконечности легко, если вы прирожденный герой. Ёлки — это не просто красивое дерево. Это прочная древесина. Бороться с прокрастинацией несложно. Просто действуйте. Маленькими шагами. Освоить вёрстку несложно. Возьмите книгу новую книгу и закрепите все упражнения на практике. Простые ежедневные упражнения помогут достичь успеха. Как начать действовать? Для начала просто соберитесь.`,
    categories: [
      `Разное`
    ],
    comments: [
      {
        id: `MvsuBF`,
        text: `Давно не пользуюсь стационарными компьютерами. Ноутбуки победили.`
      },
      {
        id: `kOQ9l2`,
        text: `Плюсую, но слишком много буквы!`
      }
    ]
  },
  {
    id: `w1emEY`,
    title: `Учим HTML и CSS`,
    createdDate: `2021-09-14 21:38:51`,
    announce: `Из под его пера вышло 8 платиновых альбомов. Рок-музыка всегда ассоциировалась с протестами. Так ли это на самом деле?, Как начать действовать? Для начала просто соберитесь. Процессор заслуживает особого внимания. Он обязательно понравится геймерам со стажем.`,
    fullText: `Как начать действовать? Для начала просто соберитесь. Достичь успеха помогут ежедневные повторения. Этот смартфон — настоящая находка. Большой и яркий экран, мощнейший процессор — всё это в небольшом гаджете. Процессор заслуживает особого внимания. Он обязательно понравится геймерам со стажем. Рок-музыка всегда ассоциировалась с протестами. Так ли это на самом деле?, Бороться с прокрастинацией несложно. Просто действуйте. Маленькими шагами. Простые ежедневные упражнения помогут достичь успеха. Освоить вёрстку несложно. Возьмите книгу новую книгу и закрепите все упражнения на практике. Из под его пера вышло 8 платиновых альбомов.`,
    categories: [
      `За жизнь`,
      `Деревья`
    ],
    comments: [
      {
        id: `-dZoql`,
        text: `Это где ж такие красоты?`
      },
      {
        id: `II31Vk`,
        text: `Хочу такую же футболку :-)`
      },
      {
        id: `9vUMOr`,
        text: `Совсем немного...`
      },
      {
        id: `yylBf2`,
        text: `Мне кажется или я уже читал это где-то?`
      }
    ]
  },
  {
    id: `sUITCa`,
    title: `Как начать программировать`,
    createdDate: `2021-08-10 13:36:38`,
    announce: `Рок-музыка всегда ассоциировалась с протестами. Так ли это на самом деле?, Этот смартфон — настоящая находка. Большой и яркий экран, мощнейший процессор — всё это в небольшом гаджете.`,
    fullText: `Бороться с прокрастинацией несложно. Просто действуйте. Маленькими шагами. Этот смартфон — настоящая находка. Большой и яркий экран, мощнейший процессор — всё это в небольшом гаджете. Ёлки — это не просто красивое дерево. Это прочная древесина. Первая большая ёлка была установлена только в 1938 году. Альбом стал настоящим открытием года. Мощные гитарные рифы и скоростные соло-партии не дадут заскучать. Помните, небольшое количество ежедневных упражнений лучше, чем один раз, но много. Простые ежедневные упражнения помогут достичь успеха. Он написал больше 30 хитов. Достичь успеха помогут ежедневные повторения. Процессор заслуживает особого внимания. Он обязательно понравится геймерам со стажем. Игры и программирование разные вещи. Не стоит идти в программисты, если вам нравятся только игры. Рок-музыка всегда ассоциировалась с протестами. Так ли это на самом деле?,`,
    categories: [
      `Программирование`,
      `Деревья`
    ],
    comments: [
      {
        id: `k0mi9V`,
        text: `Мне кажется или я уже читал это где-то?`
      },
      {
        id: `0huC6i`,
        text: `Плюсую, но слишком много буквы!`
      }
    ]
  }
];

const mockCategories = [`Кино`, `За жизнь`, `Разное`, `Деревья`, `Программирование`];

const app = express();
app.use(express.json());
categories(app, new CategoryService(mockData));

describe(`API возвращает доступные категории`, () => {
  let response;

  beforeAll(async () => {
    response = await request(app).get(`/categories`);
  });

  test(`Статус ответа 200`, () => {
    expect(response.statusCode).toBe(HttpStatusCode.OK);
  });

  test(`Количество категорий равно 5`, () => {
    expect(response.body.length).toBe(5);
  });

  test(`Возвращает определенный список категорий`, () => {
    expect(response.body).toEqual(mockCategories);
  });
});
