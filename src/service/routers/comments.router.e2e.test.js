'use strict';

const {beforeAll, describe, expect, test} = require(`@jest/globals`);
const Sequelize = require(`sequelize`);
const express = require(`express`);
const request = require(`supertest`);
const {HttpStatusCode} = require(`../../common/enums`);
const mocks = require(`../../common/mocks`);
const initDb = require(`../libs/init-db.lib`);
const {CommentService} = require(`../services`);
const {commentsRouter} = require(`./comments.router`);

const createAPI = () => {
  const mockDB = new Sequelize(`sqlite::memory:`, {
    logging: false,
  });
  const app = express();
  app.use(express.json());

  beforeAll(async () => {
    await initDb(mockDB, mocks);
    commentsRouter(app, new CommentService(mockDB));
  });

  return app;
};

describe(`API загружает список комментариев`, () => {
  const app = createAPI();
  let response;

  beforeAll(async () => {
    response = await request(app).get(`/comments`);
  });

  test(`Сервер вернет 200`, () => {
    expect(response.statusCode).toBe(HttpStatusCode.OK);
  });

  test(`Количество комментариев равно 4`, () => {
    expect(response.body.comments.length).toBe(4);
  });
});

describe(`API удаляет комментарий`, () => {
  const app = createAPI();
  let response;

  beforeAll(async () => {
    response = await request(app).delete(`/comments/1`);
  });

  test(`Сервер вернет 200`, () => {
    expect(response.statusCode).toBe(HttpStatusCode.OK);
  });

  test(`Возвращает truthy`, () => {
    expect(response.body).toBeTruthy();
  });
});
