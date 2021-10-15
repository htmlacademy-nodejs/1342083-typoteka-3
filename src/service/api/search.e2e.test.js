'use strict';

const {beforeAll, describe, expect, test} = require(`@jest/globals`);
const express = require(`express`);
const request = require(`supertest`);
const search = require(`./search`);
const {SearchService} = require(`../data-service`);
const {HttpStatusCode} = require(`../../constants`);
const {
  mockArticles,
} = require(`../mock`);

const app = express();
app.use(express.json());
search(app, new SearchService(mockArticles));

describe(`API возвращает результаты поиска`, () => {
  let response;

  beforeAll(async () => {
    response = await request(app).get(`/search`).query({
      query: mockArticles[0].title,
    });
  });

  test(`Ответ сервера равен 200`, () => {
    expect(response.statusCode).toBe(HttpStatusCode.OK);
  });

  test(`Возвращает массив с двумя публикациями`, () => {
    expect(Array.isArray(response.body)).toBeTruthy();
    expect(response.body.length).toBe(2);
  });

  test(`Заголовок найденной публикации равен ${mockArticles[0].title}`, () => {
    expect(response.body[0].title).toBe(mockArticles[0].title);
  });

  test(`Id найденной публикации равен ${mockArticles[0].id}`, () => {
    expect(response.body[0].id).toBe(mockArticles[0].id);
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
