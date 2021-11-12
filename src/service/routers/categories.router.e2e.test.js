'use strict';

const {beforeAll, describe, expect, test} = require(`@jest/globals`);
const Sequelize = require(`sequelize`);
const express = require(`express`);
const request = require(`supertest`);
const {HttpStatusCode} = require(`../../common/enums`);
const mocks = require(`../../common/mocks`);
const {
  ArticleService,
  CategoryService,
} = require(`../services`);
const initDb = require(`../libs/init-db.lib`);
const {categoriesRouter} = require(`./categories.router`);

const mockDB = new Sequelize(`sqlite::memory:`, {
  logging: false,
});
const app = express();
app.use(express.json());

beforeAll(async () => {
  await initDb(mockDB, mocks);
  categoriesRouter(app, new ArticleService(mockDB), new CategoryService(mockDB));
});

describe(`API возвращает доступные категории`, () => {
  let response;

  beforeAll(async () => {
    response = await request(app).get(`/categories`);
  });

  test(`Статус ответа 200`, () => {
    expect(response.statusCode).toBe(HttpStatusCode.OK);
  });

  test(`Количество категорий равно ${mocks.categories.length}`, () => {
    expect(response.body.length).toBe(mocks.categories.length);
  });
});
