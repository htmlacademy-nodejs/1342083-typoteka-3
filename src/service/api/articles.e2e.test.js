'use strict';

const {beforeAll, describe, expect, test} = require(`@jest/globals`);
const express = require(`express`);
const request = require(`supertest`);
const articles = require(`./articles`);
const {ArticleService, CommentService} = require(`../data-service`);
const {HttpStatusCode} = require(`../../constants`);

const mockData = [
  {
    id: `141QYG`,
    title: `Обзор новейшего смартфона`,
    createdDate: `2021-07-11 09:06:58`,
    announce: `Простые ежедневные упражнения помогут достичь успеха. Золотое сечение — соотношение двух величин, гармоническая пропорция.`,
    fullText: `Игры и программирование разные вещи. Не стоит идти в программисты, если вам нравятся только игры. Ёлки — это не просто красивое дерево. Это прочная древесина. Программировать не настолько сложно, как об этом говорят. Вы можете достичь всего. Стоит только немного постараться и запастись книгами. Бороться с прокрастинацией несложно. Просто действуйте. Маленькими шагами. Собрать камни бесконечности легко, если вы прирожденный герой. Первая большая ёлка была установлена только в 1938 году. Золотое сечение — соотношение двух величин, гармоническая пропорция. Процессор заслуживает особого внимания. Он обязательно понравится геймерам со стажем. Из под его пера вышло 8 платиновых альбомов. Этот смартфон — настоящая находка. Большой и яркий экран, мощнейший процессор — всё это в небольшом гаджете. Помните, небольшое количество ежедневных упражнений лучше, чем один раз, но много.`,
    categories: [
      `Музыка`,
      `Без рамки`
    ],
    comments: [
      {
        id: `1a8mkI`,
        text: `Плюсую, но слишком много буквы!`,
        createdDate: `2021-08-04 13:12:35`
      },
      {
        id: `-3HraO`,
        text: `Мне не нравится ваш стиль. Ощущение, что вы меня поучаете.`,
        createdDate: `2021-09-29 08:14:32`
      }
    ]
  },
  {
    id: `4tlsue`,
    title: `Борьба с прокрастинацией`,
    createdDate: `2021-09-30 14:49:55`,
    announce: `Программировать не настолько сложно, как об этом говорят. Помните, небольшое количество ежедневных упражнений лучше, чем один раз, но много. Вы можете достичь всего. Стоит только немного постараться и запастись книгами. Первая большая ёлка была установлена только в 1938 году.`,
    fullText: `Помните, небольшое количество ежедневных упражнений лучше, чем один раз, но много. Ёлки — это не просто красивое дерево. Это прочная древесина. Первая большая ёлка была установлена только в 1938 году. Как начать действовать? Для начала просто соберитесь. Игры и программирование разные вещи. Не стоит идти в программисты, если вам нравятся только игры. Достичь успеха помогут ежедневные повторения. Из под его пера вышло 8 платиновых альбомов. Собрать камни бесконечности легко, если вы прирожденный герой. Альбом стал настоящим открытием года. Мощные гитарные рифы и скоростные соло-партии не дадут заскучать. Программировать не настолько сложно, как об этом говорят. Он написал больше 30 хитов. Золотое сечение — соотношение двух величин, гармоническая пропорция. Процессор заслуживает особого внимания. Он обязательно понравится геймерам со стажем. Вы можете достичь всего. Стоит только немного постараться и запастись книгами. Рок-музыка всегда ассоциировалась с протестами. Так ли это на самом деле?, Это один из лучших рок-музыкантов. Этот смартфон — настоящая находка. Большой и яркий экран, мощнейший процессор — всё это в небольшом гаджете.`,
    categories: [
      `Деревья`
    ],
    comments: [
      {
        id: `1u2U_D`,
        text: `Это где ж такие красоты?`,
        createdDate: `2021-08-28 13:46:36`
      },
      {
        id: `LrCzYm`,
        text: `Совсем немного...`,
        createdDate: `2021-08-09 17:51:09`
      },
      {
        id: `Y_qlDD`,
        text: `Согласен с автором!`,
        createdDate: `2021-08-19 06:51:17`
      },
      {
        id: `A6U801`,
        text: `Мне кажется или я уже читал это где-то?`,
        createdDate: `2021-07-15 03:06:24`
      }
    ]
  },
  {
    id: `IqaQNq`,
    title: `Лучшие рок-музыканты 20-века`,
    createdDate: `2021-08-02 17:14:14`,
    announce: `Он написал больше 30 хитов. Освоить вёрстку несложно. Возьмите книгу новую книгу и закрепите все упражнения на практике. Первая большая ёлка была установлена только в 1938 году. Игры и программирование разные вещи. Не стоит идти в программисты, если вам нравятся только игры.`,
    fullText: `Золотое сечение — соотношение двух величин, гармоническая пропорция. Бороться с прокрастинацией несложно. Просто действуйте. Маленькими шагами.`,
    categories: [
      `Музыка`
    ],
    comments: [
      {
        id: `jldphN`,
        text: `Это где ж такие красоты?`,
        createdDate: `2021-09-24 08:41:06`
      },
      {
        id: `s_xidX`,
        text: `Хочу такую же футболку :-)`,
        createdDate: `2021-09-21 13:29:54`
      },
      {
        id: `axKFWn`,
        text: `Совсем немного...`,
        createdDate: `2021-09-12 06:05:49`
      }
    ]
  },
  {
    id: `IUcV6O`,
    title: `Как собрать камни бесконечности`,
    createdDate: `2021-08-26 13:53:34`,
    announce: `Этот смартфон — настоящая находка. Большой и яркий экран, мощнейший процессор — всё это в небольшом гаджете. Помните, небольшое количество ежедневных упражнений лучше, чем один раз, но много. Из под его пера вышло 8 платиновых альбомов. Бороться с прокрастинацией несложно. Просто действуйте. Маленькими шагами. Достичь успеха помогут ежедневные повторения.`,
    fullText: `Достичь успеха помогут ежедневные повторения. Ёлки — это не просто красивое дерево. Это прочная древесина. Из под его пера вышло 8 платиновых альбомов. Первая большая ёлка была установлена только в 1938 году. Вы можете достичь всего. Стоит только немного постараться и запастись книгами. Этот смартфон — настоящая находка. Большой и яркий экран, мощнейший процессор — всё это в небольшом гаджете. Простые ежедневные упражнения помогут достичь успеха. Золотое сечение — соотношение двух величин, гармоническая пропорция. Собрать камни бесконечности легко, если вы прирожденный герой. Процессор заслуживает особого внимания. Он обязательно понравится геймерам со стажем. Программировать не настолько сложно, как об этом говорят. Он написал больше 30 хитов. Помните, небольшое количество ежедневных упражнений лучше, чем один раз, но много. Освоить вёрстку несложно. Возьмите книгу новую книгу и закрепите все упражнения на практике.`,
    categories: [
      `Кино`
    ],
    comments: []
  },
  {
    id: `fkMqSS`,
    title: `Рок — это протест`,
    createdDate: `2021-07-30 00:23:23`,
    announce: `Рок-музыка всегда ассоциировалась с протестами. Так ли это на самом деле?,`,
    fullText: `Первая большая ёлка была установлена только в 1938 году. Ёлки — это не просто красивое дерево. Это прочная древесина. Он написал больше 30 хитов. Достичь успеха помогут ежедневные повторения. Простые ежедневные упражнения помогут достичь успеха. Это один из лучших рок-музыкантов. Этот смартфон — настоящая находка. Большой и яркий экран, мощнейший процессор — всё это в небольшом гаджете. Собрать камни бесконечности легко, если вы прирожденный герой. Помните, небольшое количество ежедневных упражнений лучше, чем один раз, но много. Золотое сечение — соотношение двух величин, гармоническая пропорция. Альбом стал настоящим открытием года. Мощные гитарные рифы и скоростные соло-партии не дадут заскучать. Вы можете достичь всего. Стоит только немного постараться и запастись книгами. Как начать действовать? Для начала просто соберитесь. Освоить вёрстку несложно. Возьмите книгу новую книгу и закрепите все упражнения на практике. Рок-музыка всегда ассоциировалась с протестами. Так ли это на самом деле?, Программировать не настолько сложно, как об этом говорят.`,
    categories: [
      `Кино`,
      `IT`
    ],
    comments: [
      {
        id: `2Zp0Zd`,
        text: `Совсем немного...`,
        createdDate: `2021-07-14 16:40:58`
      },
      {
        id: `RblbNT`,
        text: `Это где ж такие красоты?`,
        createdDate: `2021-09-07 01:16:26`
      }
    ]
  }
];

const newArticle = {
  title: `Как начать программировать`,
  createdDate: `2021-08-03 17:14:17`,
  announce: `Не стоит идти в программисты, если вам нравятся только игры.`,
  categories: [`Деревья`, `Кино`],
};

const articleUpdate = {
  title: `Обзор новейшего телефона`,
  createdDate: `2021-07-14 19:16:23`,
  announce: `Первая большая ёлка была установлена только в 1938 году.`,
  categories: [`Без рамки`],
};

const newComment = {
  text: `Золотое сечение — соотношение двух величин, гармоническая пропорция`,
};

const invalidComment = {
  description: newComment.text,
};

const createAPI = () => {
  const data = JSON.parse(JSON.stringify(mockData));
  const app = express();
  app.use(express.json());
  articles(app, new ArticleService(data), new CommentService());

  return app;
};

describe(`API вернет список публикаций`, () => {
  const app = createAPI();
  let response;

  beforeAll(async () => {
    response = await request(app).get(`/articles`);
  });

  test(`Сервер вернет 200`, () => {
    expect(response.statusCode).toBe(HttpStatusCode.OK);
  });

  test(`Сервер вернет массив с 5 публикациями`, () => {
    expect(Array.isArray(response.body)).toBeTruthy();
    expect(response.body.length).toBe(5);
  });

  test(`id первой публикации равен "141QYG"`, () => {
    expect(response.body[0].id).toBe(`141QYG`);
  });
});

describe(`API вернет публикацию с определенным id`, () => {
  const app = createAPI();
  let response;

  beforeAll(async () => {
    response = await request(app).get(`/articles/141QYG`);
  });

  test(`Сервер вернет публикацию с id "141QYG"`, async () => {
    expect(response.body.id).toBe(`141QYG`);
  });

  test(`Сервер вернет публикацию с заголовком "Обзор новейшего смартфона"`, async () => {
    expect(response.body.title).toBe(`Обзор новейшего смартфона`);
  });

  test(`Сервер вернет 404, если публикация не найдена`, async () => {
    await request(app).get(`/articles/ohNo`).expect(HttpStatusCode.NOT_FOUND);
  });
});

describe(`API вернет список комментариев`, () => {
  const app = createAPI();
  let response;

  beforeAll(async () => {
    response = await request(app).get(`/articles/141QYG/comments`);
  });

  test(`Сервер вернет 200`, () => {
    expect(response.statusCode).toBe(HttpStatusCode.OK);
  });

  test(`Сервер вернет 2 комментария`, () => {
    expect(response.body.length).toBe(2);
  });

  test(`id первого комментария равен "1a8mkI"`, () => {
    expect(response.body[0].id).toBe(`1a8mkI`);
  });

  test(`Сервер вернет 404, если публикация не найдена`, async () => {
    await request(app).get(`/articles/ohNo/comments`).expect(HttpStatusCode.NOT_FOUND);
  });
});

describe(`API вернет комментарий с определенным id`, () => {
  const app = createAPI();
  let response;

  beforeAll(async () => {
    response = await request(app).get(`/articles/141QYG/comments/1a8mkI`);
  });

  test(`Сервер вернет 200`, () => {
    expect(response.statusCode).toBe(HttpStatusCode.OK);
  });

  test(`id комментария равен "1a8mkI"`, () => {
    expect(response.body.id).toBe(`1a8mkI`);
  });

  test(`Текст комментария равен "Плюсую, но слишком много буквы!"`, () => {
    expect(response.body.text).toBe(`Плюсую, но слишком много буквы!`);
  });

  test(`Сервер вернет 404, если комментарий не найден`, async () => {
    await request(app).get(`/articles/141QYG/comments/notFound`).expect(HttpStatusCode.NOT_FOUND);
  });
});

describe(`API добавляет новую публикацию`, () => {
  const app = createAPI();
  let response;

  beforeAll(async () => {
    response = await request(app).post(`/articles`).send(newArticle);
  });

  test(`Сервер вернет 200`, () => {
    expect(response.statusCode).toBe(HttpStatusCode.OK);
  });

  test(`Количество публикаций равно 6`, async () => {
    const customResponse = await request(app).get(`/articles`);
    expect(customResponse.body.length).toBe(6);
  });

  test(`Сервер вернет новую публикацию с заголовком "Как начать программировать"`, () => {
    expect(response.body.title).toBe(`Как начать программировать`);
  });

  test(`Сервер вернет 400, если новая публикация невалидна`, async () => {
    for (const key of Object.keys(newArticle)) {
      const invalidArticle = {...newArticle};
      delete invalidArticle[key];
      await request(app).post(`/articles`).send(invalidArticle).expect(HttpStatusCode.BAD_REQUEST);
    }
  });
});

describe(`API добавляет новый комментарий`, () => {
  const app = createAPI();

  let response;

  beforeAll(async () => {
    response = await request(app).post(`/articles/141QYG/comments`).send(newComment);
  });

  test(`Сервер вернет 200`, () => {
    expect(response.statusCode).toBe(HttpStatusCode.OK);
  });

  test(`Текст нового комментария равен "Золотое сечение — соотношение двух величин, гармоническая пропорция"`, () => {
    expect(response.body.text).toBe(`Золотое сечение — соотношение двух величин, гармоническая пропорция`);
  });

  test(`Сервер вернет 400, если новый комментарий невалидный`, async () => {
    await request(app).post(`/articles/141QYG/comments`).send(invalidComment).expect(HttpStatusCode.BAD_REQUEST);
  });

  test(`Сервер вернет 400, если публикации не существует`, async () => {
    await request(app).post(`/articles/notFound/comments`).send(newComment).expect(HttpStatusCode.NOT_FOUND);
  });
});

describe(`API обновляет публикацию`, () => {
  const app = createAPI();

  test(`Сервер вернет 200`, async () => {
    await request(app).put(`/articles/141QYG`).send(articleUpdate).expect(HttpStatusCode.OK);
  });

  test(`Количество публикаций равно 5`, async () => {
    await request(app).get(`/articles`).expect((res) => expect(res.body.length).toBe(5));
  });

  test(`Заголовок публикации с id "141QYG" равен "Обзор новейшего телефона"`, async () => {
    await request(app).get(`/articles/141QYG`).expect((res) => expect(res.body.title).toBe(`Обзор новейшего телефона`));
  });

  test(`Сервер вернет 400, если обновление невалидно`, async () => {
    for (const key of Object.keys(articleUpdate)) {
      const invalidUpdate = {...articleUpdate};
      delete invalidUpdate[key];
      await request(app).put(`/articles/141QYG`).send(invalidUpdate).expect(HttpStatusCode.BAD_REQUEST);
    }
  });

  test(`Сервер вернет 404, если публикация не найдена`, async () => {
    await request(app).put(`/articles/notFound`).send(articleUpdate).expect(HttpStatusCode.NOT_FOUND);
  });
});

describe(`API обновляет комментарий`, () => {
  const app = createAPI();

  test(`Сервер вернет 200`, async () => {
    await request(app).put(`/articles/141QYG/comments/1a8mkI`).send(newComment).expect(HttpStatusCode.OK);
  });

  test(`Количество комментариев равно 2`, async () => {
    await request(app).get(`/articles/141QYG/comments`).expect((res) => expect(res.body.length).toBe(2));
  });

  test(`Текст комментария с id "1a8mkI" равен "Золотое сечение — соотношение двух величин, гармоническая пропорция"`, async () => {
    await request(app).get(`/articles/141QYG/comments/1a8mkI`)
      .expect((res) => expect(res.body.text).toBe(`Золотое сечение — соотношение двух величин, гармоническая пропорция`));
  });

  test(`Сервер вернет 400, если обновление невалидно`, async () => {
    await request(app).put(`/articles/141QYG/comments/1a8mkI`).send(invalidComment).expect(HttpStatusCode.BAD_REQUEST);
  });

  test(`Сервер вернет 404, если комментарий не найден`, async () => {
    await request(app).put(`/articles/141QYG/comments/notFound`).send(articleUpdate).expect(HttpStatusCode.NOT_FOUND);
  });

  test(`Сервер вернет 404, если публикация не найдена`, async () => {
    await request(app).put(`/articles/notFound/comments/1a8mkI`).send(articleUpdate).expect(HttpStatusCode.NOT_FOUND);
  });
});

describe(`API удаляет публикацию`, () => {
  const app = createAPI();
  let response;

  beforeAll(async () => {
    response = await request(app).delete(`/articles/141QYG`);
  });

  test(`Сервер вернет 200`, () => {
    expect(response.statusCode).toBe(HttpStatusCode.OK);
  });

  test(`Заголовок удаленной публикации равен "Обзор новейшего смартфона"`, () => {
    expect(response.body.title).toBe(`Обзор новейшего смартфона`);
  });

  test(`Количество публикаций равно 4`, async () => {
    await request(app).get(`/articles`).expect((res) => expect(res.body.length).toBe(4));
  });

  test(`Сервер вернет 404 при обращении к удаленной публикации`, async () => {
    await request(app).get(`/articles/141QYG`).expect(HttpStatusCode.NOT_FOUND);
  });

  test(`Сервер вернет 404 при попытке удалить несуществующую публикацию`, async () => {
    await request(app).delete(`/articles/notFound`).expect(HttpStatusCode.NOT_FOUND);
  });
});

describe(`API удаляет комментарий`, () => {
  const app = createAPI();
  let response;

  beforeAll(async () => {
    response = await request(app).delete(`/articles/141QYG/comments/1a8mkI`);
  });

  test(`Сервер вернет 200`, () => {
    expect(response.statusCode).toBe(HttpStatusCode.OK);
  });

  test(`Текст удаленного комментария равен "Плюсую, но слишком много буквы!"`, () => {
    expect(response.body.text).toBe(`Плюсую, но слишком много буквы!`);
  });

  test(`Количество комментариев равно 1`, async () => {
    await request(app).get(`/articles/141QYG/comments`).expect((res) => expect(res.body.length).toBe(1));
  });

  test(`Сервер вернет 404 при обращении к удаленному комментарию`, async () => {
    await request(app).get(`/articles/141QYG/comments/1a8mkI`).expect(HttpStatusCode.NOT_FOUND);
  });

  test(`Сервер вернет 404 при попытке удалить несуществующий комментарий`, async () => {
    await request(app).delete(`/articles/141QYG/comments/notFound`).expect(HttpStatusCode.NOT_FOUND);
  });
});
