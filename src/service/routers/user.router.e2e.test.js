'use strict';

const {beforeAll, describe, expect, test} = require(`@jest/globals`);
const Sequelize = require(`sequelize`);
const express = require(`express`);
const request = require(`supertest`);
const {
  UserKey,
  HttpStatusCode,
} = require(`../../common/enums`);
const mocks = require(`../../common/mocks`);
const {UserService} = require(`../services`);
const initDb = require(`../libs/init-db.lib`);
const {userRouter} = require(`./user.router`);

const newUser = {
  [UserKey.EMAIL]: `johnson@example.com`,
  [UserKey.FIRST_NAME]: `Eva`,
  [UserKey.LAST_NAME]: `Johnson`,
  [UserKey.PASSWORD]: `johnson`,
  [UserKey.PASSWORD_REPEATED]: `johnson`,
  [UserKey.AVATAR]: `test.jpg`,
};

const createAPI = () => {
  const mockDB = new Sequelize(`sqlite::memory:`, {
    logging: false,
  });
  const app = express();
  app.use(express.json());

  beforeAll(async () => {
    await initDb(mockDB, mocks);
    userRouter(app, new UserService(mockDB));
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

  test(`Аватар нового пользователя - "test.jpg"`, () => {
    expect(response.body[UserKey.AVATAR]).toBe(`test.jpg`);
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

describe(`API позволяет аутентифицироваться, если данные валидны`, () => {
  const app = createAPI();
  let response;

  beforeAll(async () => {
    const validAuthData = {
      email: `jerde@example.com`,
      password: `jerde`,
    };
    response = await request(app).post(`/user/auth`).send(validAuthData);
  });

  test(`Сервер вернет 200`, () => {
    expect(response.statusCode).toBe(HttpStatusCode.OK);
  });

  test(`Имя пользователя - Kendall`, () => {
    expect(response.body[UserKey.FIRST_NAME]).toBe(`Kendall`);
  });
});

describe(`API не позволяет аутентифицироваться, если данные невалидны`, () => {
  const app = createAPI();

  test(`Сервер вернет 401, если email неверный`, async () => {
    const validAuthData = {
      email: `jerde@htmlacademy.com`,
      password: `jerde`,
    };
    const response = await request(app).post(`/user/auth`).send(validAuthData);
    expect(response.statusCode).toBe(HttpStatusCode.UNAUTHORIZED);
  });

  test(`Сервер вернет 401, если пароль неверный`, async () => {
    const validAuthData = {
      email: `jerde@example.com`,
      password: `htmlacademy`,
    };
    const response = await request(app).post(`/user/auth`).send(validAuthData);
    expect(response.statusCode).toBe(HttpStatusCode.UNAUTHORIZED);
  });
});
