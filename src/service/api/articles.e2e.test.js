'use strict';

const {beforeAll, describe, expect, test} = require(`@jest/globals`);
const Sequelize = require(`sequelize`);
const express = require(`express`);
const request = require(`supertest`);
const articles = require(`./articles`);
const {
  ArticleService,
  CommentService,
} = require(`../data-services`);
const initDb = require(`../libs/init-db`);
const {
  ArticleKey,
  HttpStatusCode,
  CommentKey,
} = require(`../../common/enums`);
const mocks = require(`../../common/mocks`);

const articleUpdate = {
  [ArticleKey.TITLE]: `Обзор новейшего телефона`,
  [ArticleKey.CREATED_DATE]: `2021-10-26T22:09:58.240Z`,
  [ArticleKey.ANNOUNCE]: `Первая большая ёлка была установлена только в 1938 году.`,
  [ArticleKey.CATEGORIES]: [1],
};
const newComment = {
  [CommentKey.TEXT]: `Золотое сечение — соотношение двух величин, гармоническая пропорция`,
};
const invalidComment = {
  description: newComment.text,
};

const createAPI = () => {
  const mockDB = new Sequelize(`sqlite::memory:`, {
    logging: false,
  });
  const app = express();
  app.use(express.json());

  beforeAll(async () => {
    await initDb(mockDB, mocks);
    articles(app, new ArticleService(mockDB), new CommentService(mockDB));
  });

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

  test(`Сервер вернет массив с 3 публикациями`, () => {
    expect(Array.isArray(response.body.articles)).toBeTruthy();
    expect(response.body.count).toBe(3);
  });

  test(`id первой публикации равен 1`, () => {
    expect(response.body.articles[0].id).toBe(1);
  });
});

describe(`API вернет публикацию с определенным id`, () => {
  const app = createAPI();
  let response;

  beforeAll(async () => {
    response = await request(app).get(`/articles/1`);
  });

  test(`Сервер вернет публикацию с id 1`, async () => {
    expect(response.body.id).toBe(1);
  });

  test(`Сервер вернет публикацию с заголовком "Что такое золотое сечение"`, async () => {
    expect(response.body.title).toBe(`Что такое золотое сечение`);
  });

  test(`Сервер вернет 404, если публикация не найдена`, async () => {
    await request(app).get(`/articles/4`).expect(HttpStatusCode.NOT_FOUND);
  });
});

describe(`API вернет список комментариев`, () => {
  const app = createAPI();
  let response;

  beforeAll(async () => {
    response = await request(app).get(`/articles/1/comments`);
  });

  test(`Сервер вернет 200`, () => {
    expect(response.statusCode).toBe(HttpStatusCode.OK);
  });

  test(`Сервер вернет 1 комментарий`, () => {
    expect(response.body.length).toBe(1);
  });

  test(`Текст первого комментария равен "Давно не пользуюсь стационарными компьютерами. Ноутбуки победили."`, () => {
    expect(response.body[0].text).toBe(`Давно не пользуюсь стационарными компьютерами. Ноутбуки победили.`);
  });

  test(`Сервер вернет 404, если публикация не найдена`, async () => {
    await request(app).get(`/articles/4/comments`).expect(HttpStatusCode.NOT_FOUND);
  });
});

describe(`API добавляет новую публикацию`, () => {
  const app = createAPI();
  const newArticle = {
    [ArticleKey.TITLE]: `Как начать программировать`,
    [ArticleKey.CREATED_DATE]: `2021-10-26T18:48:58.239Z`,
    [ArticleKey.ANNOUNCE]: `Не стоит идти в программисты, если вам нравятся только игры.`,
    [ArticleKey.CATEGORIES]: [2],
  };
  let response;

  beforeAll(async () => {
    response = await request(app).post(`/articles`).send(newArticle);
  });

  test(`Сервер вернет 200`, () => {
    expect(response.statusCode).toBe(HttpStatusCode.OK);
  });

  test(`Количество публикаций равно 4`, async () => {
    const customResponse = await request(app).get(`/articles`);
    expect(customResponse.body.count).toBe(4);
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

describe(`API обновляет публикацию`, () => {
  const app = createAPI();

  test(`Сервер вернет 200`, async () => {
    await request(app).put(`/articles/1`).send(articleUpdate).expect(HttpStatusCode.OK);
  });

  test(`Количество публикаций равно 3`, async () => {
    await request(app).get(`/articles`).expect((res) => expect(res.body.count).toBe(3));
  });

  test(`Заголовок публикации с id 1 равен "Обзор новейшего телефона"`, async () => {
    await request(app).get(`/articles/1`).expect((res) => expect(res.body.title).toBe(`Обзор новейшего телефона`));
  });

  test(`Сервер вернет 400, если обновление невалидно`, async () => {
    for (const key of Object.keys(articleUpdate)) {
      const invalidUpdate = {...articleUpdate};
      delete invalidUpdate[key];
      await request(app).put(`/articles/1`).send(invalidUpdate).expect(HttpStatusCode.BAD_REQUEST);
    }
  });

  test(`Сервер вернет 404, если публикация не найдена`, async () => {
    await request(app).put(`/articles/4`).send(articleUpdate).expect(HttpStatusCode.NOT_FOUND);
  });
});

describe(`API удаляет публикацию`, () => {
  const app = createAPI();
  let response;

  beforeAll(async () => {
    response = await request(app).delete(`/articles/1`);
  });

  test(`Сервер вернет 200`, () => {
    expect(response.statusCode).toBe(HttpStatusCode.OK);
  });

  test(`Вернет булево truthy-значение после удаления`, () => {
    expect(response.body).toBeTruthy();
  });

  test(`Количество публикаций равно 2`, async () => {
    await request(app).get(`/articles`).expect((res) => expect(res.body.count).toBe(2));
  });

  test(`Сервер вернет 404 при обращении к удаленной публикации`, async () => {
    await request(app).get(`/articles/1`).expect(HttpStatusCode.NOT_FOUND);
  });
});

describe(`API добавляет новый комментарий`, () => {
  const app = createAPI();
  let response;

  beforeAll(async () => {
    response = await request(app).post(`/articles/1/comments`).send(newComment);
  });

  test(`Сервер вернет 200`, () => {
    expect(response.statusCode).toBe(HttpStatusCode.OK);
  });

  test(`Текст нового комментария равен "Золотое сечение — соотношение двух величин, гармоническая пропорция"`, () => {
    expect(response.body.text).toBe(`Золотое сечение — соотношение двух величин, гармоническая пропорция`);
  });

  test(`Сервер вернет 400, если новый комментарий невалидный`, async () => {
    await request(app).post(`/articles/1/comments`).send(invalidComment).expect(HttpStatusCode.BAD_REQUEST);
  });
});

describe(`API обновляет комментарий`, () => {
  const app = createAPI();

  test(`Сервер вернет 200`, async () => {
    await request(app).put(`/articles/1/comments/1`).send(newComment).expect(HttpStatusCode.OK);
  });

  test(`Количество комментариев равно 1`, async () => {
    await request(app).get(`/articles/1/comments`).expect((res) => expect(res.body.length).toBe(1));
  });

  test(`Сервер вернет 400, если обновление невалидно`, async () => {
    await request(app).put(`/articles/1/comments/1`).send(invalidComment).expect(HttpStatusCode.BAD_REQUEST);
  });
});

describe(`API удаляет комментарий`, () => {
  const app = createAPI();
  let response;

  beforeAll(async () => {
    response = await request(app).delete(`/articles/1/comments/1`);
  });

  test(`Сервер вернет 200`, () => {
    expect(response.statusCode).toBe(HttpStatusCode.OK);
  });

  test(`Возвращает truthy`, () => {
    expect(response.body).toBeTruthy();
  });

  test(`Количество комментариев равно 0`, async () => {
    await request(app).get(`/articles/1/comments`).expect((res) => expect(res.body.length).toBe(0));
  });

  test(`Сервер вернет 404 при обращении к удаленному комментарию`, async () => {
    await request(app).get(`/articles/1/comments/1`).expect(HttpStatusCode.NOT_FOUND);
  });
});
