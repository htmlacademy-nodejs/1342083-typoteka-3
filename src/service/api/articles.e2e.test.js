'use strict';

const {beforeAll, describe, expect, test} = require(`@jest/globals`);
const express = require(`express`);
const request = require(`supertest`);
const articles = require(`./articles`);
const {ArticleService, CommentService} = require(`../data-service`);
const {HttpStatusCode} = require(`../../constants`);
const {
  mockArticles,
} = require(`../mock`);

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
  const data = JSON.parse(JSON.stringify(mockArticles));
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

  test(`Сервер вернет массив с ${mockArticles.length} публикациями`, () => {
    expect(Array.isArray(response.body)).toBeTruthy();
    expect(response.body.length).toBe(mockArticles.length);
  });

  test(`id первой публикации равен "${mockArticles[0].id}"`, () => {
    expect(response.body[0].id).toBe(mockArticles[0].id);
  });
});

describe(`API вернет публикацию с определенным id`, () => {
  const app = createAPI();
  let response;

  beforeAll(async () => {
    response = await request(app).get(`/articles/${mockArticles[0].id}`);
  });

  test(`Сервер вернет публикацию с id "${mockArticles[0].id}"`, async () => {
    expect(response.body.id).toBe(mockArticles[0].id);
  });

  test(`Сервер вернет публикацию с заголовком "${mockArticles[0].title}"`, async () => {
    expect(response.body.title).toBe(mockArticles[0].title);
  });

  test(`Сервер вернет 404, если публикация не найдена`, async () => {
    await request(app).get(`/articles/ohNo`).expect(HttpStatusCode.NOT_FOUND);
  });
});

describe(`API вернет список комментариев`, () => {
  const app = createAPI();
  let response;

  beforeAll(async () => {
    response = await request(app).get(`/articles/${mockArticles[0].id}/comments`);
  });

  test(`Сервер вернет 200`, () => {
    expect(response.statusCode).toBe(HttpStatusCode.OK);
  });

  test(`Сервер вернет ${mockArticles[0].comments.length} комментария`, () => {
    expect(response.body.length).toBe(mockArticles[0].comments.length);
  });

  test(`id первого комментария равен "${mockArticles[0].comments[0].id}"`, () => {
    expect(response.body[0].id).toBe(mockArticles[0].comments[0].id);
  });

  test(`Сервер вернет 404, если публикация не найдена`, async () => {
    await request(app).get(`/articles/ohNo/comments`).expect(HttpStatusCode.NOT_FOUND);
  });
});

describe(`API вернет комментарий с определенным id`, () => {
  const app = createAPI();
  let response;

  beforeAll(async () => {
    response = await request(app).get(`/articles/${mockArticles[0].id}/comments/${mockArticles[0].comments[0].id}`);
  });

  test(`Сервер вернет 200`, () => {
    expect(response.statusCode).toBe(HttpStatusCode.OK);
  });

  test(`id комментария равен "${mockArticles[0].comments[0].id}"`, () => {
    expect(response.body.id).toBe(`${mockArticles[0].comments[0].id}`);
  });

  test(`Текст комментария равен "${mockArticles[0].comments[0].text}"`, () => {
    expect(response.body.text).toBe(`${mockArticles[0].comments[0].text}`);
  });

  test(`Сервер вернет 404, если комментарий не найден`, async () => {
    await request(app).get(`/articles/${mockArticles[0].id}/comments/notFound`).expect(HttpStatusCode.NOT_FOUND);
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

  test(`Количество публикаций равно 4`, async () => {
    const customResponse = await request(app).get(`/articles`);
    expect(customResponse.body.length).toBe(4);
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
    response = await request(app).post(`/articles/${mockArticles[0].id}/comments`).send(newComment);
  });

  test(`Сервер вернет 200`, () => {
    expect(response.statusCode).toBe(HttpStatusCode.OK);
  });

  test(`Текст нового комментария равен "Золотое сечение — соотношение двух величин, гармоническая пропорция"`, () => {
    expect(response.body.text).toBe(`Золотое сечение — соотношение двух величин, гармоническая пропорция`);
  });

  test(`Сервер вернет 400, если новый комментарий невалидный`, async () => {
    await request(app).post(`/articles/${mockArticles[0].id}/comments`).send(invalidComment).expect(HttpStatusCode.BAD_REQUEST);
  });

  test(`Сервер вернет 400, если публикации не существует`, async () => {
    await request(app).post(`/articles/notFound/comments`).send(newComment).expect(HttpStatusCode.NOT_FOUND);
  });
});

describe(`API обновляет публикацию`, () => {
  const app = createAPI();

  test(`Сервер вернет 200`, async () => {
    await request(app).put(`/articles/${mockArticles[0].id}`).send(articleUpdate).expect(HttpStatusCode.OK);
  });

  test(`Количество публикаций равно 3`, async () => {
    await request(app).get(`/articles`).expect((res) => expect(res.body.length).toBe(3));
  });

  test(`Заголовок публикации с id "${mockArticles[0].id}" равен "Обзор новейшего телефона"`, async () => {
    await request(app).get(`/articles/${mockArticles[0].id}`).expect((res) => expect(res.body.title).toBe(`Обзор новейшего телефона`));
  });

  test(`Сервер вернет 400, если обновление невалидно`, async () => {
    for (const key of Object.keys(articleUpdate)) {
      const invalidUpdate = {...articleUpdate};
      delete invalidUpdate[key];
      await request(app).put(`/articles/${mockArticles[0].id}`).send(invalidUpdate).expect(HttpStatusCode.BAD_REQUEST);
    }
  });

  test(`Сервер вернет 404, если публикация не найдена`, async () => {
    await request(app).put(`/articles/notFound`).send(articleUpdate).expect(HttpStatusCode.NOT_FOUND);
  });
});

describe(`API обновляет комментарий`, () => {
  const app = createAPI();

  test(`Сервер вернет 200`, async () => {
    await request(app).put(`/articles/${mockArticles[0].id}/comments/${mockArticles[0].comments[0].id}`).send(newComment).expect(HttpStatusCode.OK);
  });

  test(`Количество комментариев равно 4`, async () => {
    await request(app).get(`/articles/${mockArticles[0].id}/comments`).expect((res) => expect(res.body.length).toBe(4));
  });

  test(`Текст комментария с id "${mockArticles[0].comments[0].id}" равен "${newComment.text}"`, async () => {
    await request(app).get(`/articles/${mockArticles[0].id}/comments/${mockArticles[0].comments[0].id}`)
      .expect((res) => expect(res.body.text).toBe(newComment.text));
  });

  test(`Сервер вернет 400, если обновление невалидно`, async () => {
    await request(app).put(`/articles/${mockArticles[0].id}/comments/${mockArticles[0].comments[0].id}`).send(invalidComment).expect(HttpStatusCode.BAD_REQUEST);
  });

  test(`Сервер вернет 404, если комментарий не найден`, async () => {
    await request(app).put(`/articles/${mockArticles[0].id}/comments/notFound`).send(articleUpdate).expect(HttpStatusCode.NOT_FOUND);
  });

  test(`Сервер вернет 404, если публикация не найдена`, async () => {
    await request(app).put(`/articles/notFound/comments/${mockArticles[0].comments[0].id}`).send(articleUpdate).expect(HttpStatusCode.NOT_FOUND);
  });
});

describe(`API удаляет публикацию`, () => {
  const app = createAPI();
  let response;

  beforeAll(async () => {
    response = await request(app).delete(`/articles/${mockArticles[0].id}`);
  });

  test(`Сервер вернет 200`, () => {
    expect(response.statusCode).toBe(HttpStatusCode.OK);
  });

  test(`Заголовок удаленной публикации равен "${mockArticles[0].title}"`, () => {
    expect(response.body.title).toBe(mockArticles[0].title);
  });

  test(`Количество публикаций равно 2`, async () => {
    await request(app).get(`/articles`).expect((res) => expect(res.body.length).toBe(2));
  });

  test(`Сервер вернет 404 при обращении к удаленной публикации`, async () => {
    await request(app).get(`/articles/${mockArticles[0].id}`).expect(HttpStatusCode.NOT_FOUND);
  });

  test(`Сервер вернет 404 при попытке удалить несуществующую публикацию`, async () => {
    await request(app).delete(`/articles/notFound`).expect(HttpStatusCode.NOT_FOUND);
  });
});

describe(`API удаляет комментарий`, () => {
  const app = createAPI();
  let response;

  beforeAll(async () => {
    response = await request(app).delete(`/articles/${mockArticles[0].id}/comments/${mockArticles[0].comments[0].id}`);
  });

  test(`Сервер вернет 200`, () => {
    expect(response.statusCode).toBe(HttpStatusCode.OK);
  });

  test(`Текст удаленного комментария равен "${mockArticles[0].comments[0].text}"`, () => {
    expect(response.body.text).toBe(mockArticles[0].comments[0].text);
  });

  test(`Количество комментариев равно 3`, async () => {
    await request(app).get(`/articles/${mockArticles[0].id}/comments`).expect((res) => expect(res.body.length).toBe(3));
  });

  test(`Сервер вернет 404 при обращении к удаленному комментарию`, async () => {
    await request(app).get(`/articles/${mockArticles[0].id}/comments/${mockArticles[0].comments[0].id}`).expect(HttpStatusCode.NOT_FOUND);
  });

  test(`Сервер вернет 404 при попытке удалить несуществующий комментарий`, async () => {
    await request(app).delete(`/articles/${mockArticles[0].id}/comments/notFound`).expect(HttpStatusCode.NOT_FOUND);
  });
});
