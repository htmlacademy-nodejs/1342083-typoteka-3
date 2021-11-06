'use strict';

const {beforeAll, describe, expect, test} = require(`@jest/globals`);
const Sequelize = require(`sequelize`);
const express = require(`express`);
const request = require(`supertest`);
const users = require(`./users`);
const {UserService} = require(`../data-services`);
const initDb = require(`../libs/init-db`);
const {
  UserKey,
  HttpStatusCode,
} = require(`../../common/enums`);
const mocks = require(`../../common/mocks`);

const newUser = {
  [UserKey.EMAIL]: `johnson@example.com`,
  [UserKey.FIRST_NAME]: `Eva`,
  [UserKey.LAST_NAME]: `Johnson`,
  [UserKey.PASSWORD]: `johnson`,
  [UserKey.PASSWORD_REPEATED]: `johnson`,
  [UserKey.AVATAR]: null,
};

const createAPI = () => {
  const mockDB = new Sequelize(`sqlite::memory:`, {
    logging: false,
  });
  const app = express();
  app.use(express.json());

  beforeAll(async () => {
    await initDb(mockDB, mocks);
    users(app, new UserService(mockDB));
  });

  return app;
};

describe(`API создаст нового пользователя, если данные валидны`, () => {
  const app = createAPI();
  let response;

  beforeAll(async () => {
    response = await request(app).post(`/user`).send(newUser);
  });

  test(`Сервер вернет 201`, () => {
    expect(response.statusCode).toBe(HttpStatusCode.CREATED);
  });

  test(`Имя нового пользователя - Eva`, () => {
    expect(response.body[UserKey.FIRST_NAME]).toBe(`Eva`);
  });
});

describe(`API не создает нового пользователя, если данные невалидны`, () => {
  const app = createAPI();

  test(`Сервер вернет 400, если имя пустое`, async () => {
    const invalidUser = {
      ...newUser,
      [UserKey.FIRST_NAME]: ``,
    };
    const response = await request(app).post(`/user`).send(invalidUser);
    expect(response.statusCode).toBe(HttpStatusCode.BAD_REQUEST);
  });

  test(`Сервер вернет 400, если в имени есть недопустимые символы`, async () => {
    const invalidUser = {
      ...newUser,
      [UserKey.FIRST_NAME]: `Eva@`,
    };
    const response = await request(app).post(`/user`).send(invalidUser);
    expect(response.statusCode).toBe(HttpStatusCode.BAD_REQUEST);
  });

  test(`Сервер вернет 400, если фамилия пустая`, async () => {
    const invalidUser = {
      ...newUser,
      [UserKey.LAST_NAME]: ``,
    };
    const response = await request(app).post(`/user`).send(invalidUser);
    expect(response.statusCode).toBe(HttpStatusCode.BAD_REQUEST);
  });

  test(`Сервер вернет 400, если в фамилии есть недопустимые символы`, async () => {
    const invalidUser = {
      ...newUser,
      [UserKey.LAST_NAME]: `$Johnson`,
    };
    const response = await request(app).post(`/user`).send(invalidUser);
    expect(response.statusCode).toBe(HttpStatusCode.BAD_REQUEST);
  });

  test(`Сервер вернет 400, пароль меньше 6 символов`, async () => {
    const invalidUser = {
      ...newUser,
      [UserKey.PASSWORD]: `foo`,
      [UserKey.PASSWORD_REPEATED]: `bar`,
    };
    const response = await request(app).post(`/user`).send(invalidUser);
    expect(response.statusCode).toBe(HttpStatusCode.BAD_REQUEST);
  });

  test(`Сервер вернет 400, если пароли не совпадают`, async () => {
    const invalidUser = {
      ...newUser,
      [UserKey.PASSWORD]: `foobar`,
      [UserKey.PASSWORD_REPEATED]: `foobaz`,
    };
    const response = await request(app).post(`/user`).send(invalidUser);
    expect(response.statusCode).toBe(HttpStatusCode.BAD_REQUEST);
  });

  test(`Сервер вернет 400, если пользователь с указанным email уже существует`, async () => {
    const invalidUser = {
      ...newUser,
      [UserKey.EMAIL]: `jerde@example.com`,
    };
    const response = await request(app).post(`/user`).send(invalidUser);
    expect(response.statusCode).toBe(HttpStatusCode.BAD_REQUEST);
  });
});
