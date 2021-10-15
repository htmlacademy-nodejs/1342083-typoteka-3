'use strict';

const {beforeAll, describe, expect, test} = require(`@jest/globals`);
const express = require(`express`);
const request = require(`supertest`);
const categories = require(`./categories`);
const {CategoryService} = require(`../data-service`);
const {HttpStatusCode} = require(`../../constants`);
const {
  mockArticles,
  mockCategories,
} = require(`../mock`);

const app = express();
app.use(express.json());
categories(app, new CategoryService(mockArticles));

describe(`API возвращает доступные категории`, () => {
  let response;

  beforeAll(async () => {
    response = await request(app).get(`/categories`);
  });

  test(`Статус ответа 200`, () => {
    expect(response.statusCode).toBe(HttpStatusCode.OK);
  });

  test(`Количество категорий равно ${mockCategories.length}`, () => {
    expect(response.body.length).toBe(mockCategories.length);
  });

  test(`Возвращает определенный список категорий`, () => {
    expect(response.body).toEqual(mockCategories);
  });
});
