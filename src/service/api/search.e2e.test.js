'use strict';

const {beforeAll, describe, expect, test} = require(`@jest/globals`);
const Sequelize = require(`sequelize`);
const express = require(`express`);
const request = require(`supertest`);
const search = require(`./search`);
const {SearchService} = require(`../data-services`);
const initDb = require(`../libs/init-db`);
const {HttpStatusCode} = require(`../../common/enums`);
const mocks = require(`../../common/mocks`);

const mockDB = new Sequelize(`sqlite::memory:`, {
  logging: false,
});

const app = express();
app.use(express.json());

beforeAll(async () => {
  await initDb(mockDB, mocks);
  search(app, new SearchService(mockDB));
});

describe(`API возвращает результаты поиска`, () => {
  let response;

  beforeAll(async () => {
    response = await request(app).get(`/search`).query({
      query: `Учим HTML`,
    });
  });

  test(`Ответ сервера равен 200`, () => {
    expect(response.statusCode).toBe(HttpStatusCode.OK);
  });

  test(`Возвращает массив с одной публикациями`, () => {
    expect(Array.isArray(response.body)).toBeTruthy();
    expect(response.body.length).toBe(1);
  });

  test(`Заголовок найденной публикации равен "Учим HTML и CSS"`, () => {
    expect(response.body[0].title).toBe(`Учим HTML и CSS`);
  });

  test(`Id найденной публикации равен 2`, () => {
    expect(response.body[0].id).toBe(2);
  });
});

describe(`API возвращает результаты поиска, ничего не нашлось`, () => {
  let response;

  beforeAll(async () => {
    response = await request(app).get(`/search`).query({
      query: `To be or not to be`,
    });
  });

  test(`Ответ сервера равен 200`, () => {
    expect(response.statusCode).toBe(HttpStatusCode.OK);
  });

  test(`Возвращает пустой массив`, () => {
    expect(Array.isArray(response.body)).toBeTruthy();
    expect(response.body.length).toBe(0);
  });
});

describe(`API возвращает результаты поиска на невалидный запрос`, () => {
  let response;

  beforeAll(async () => {
    response = await request(app).get(`/search`);
  });

  test(`Ответ сервера равен 200`, () => {
    expect(response.statusCode).toBe(HttpStatusCode.OK);
  });

  test(`Возвращает пустой массив`, () => {
    expect(Array.isArray(response.body)).toBeTruthy();
    expect(response.body.length).toBe(0);
  });
});
