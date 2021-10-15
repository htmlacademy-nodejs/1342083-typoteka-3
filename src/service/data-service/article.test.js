'use strict';

const {beforeAll, describe, expect, test} = require(`@jest/globals`);
const ArticleService = require(`./article`);
const {
  mockArticles,
} = require(`../mock`);

const articleMock = {
  title: `Как начать программировать`,
  createdDate: `2021-09-29 11:15:35`,
  announce: `Бороться с прокрастинацией несложно. Просто действуйте. Маленькими шагами. Программировать не настолько сложно, как об этом говорят. Золотое сечение — соотношение двух величин, гармоническая пропорция. Из под его пера вышло 8 платиновых альбомов. Процессор заслуживает особого внимания. Он обязательно понравится геймерам со стажем.`,
  fullText: `Он написал больше 30 хитов. Это один из лучших рок-музыкантов. Бороться с прокрастинацией несложно. Просто действуйте. Маленькими шагами. Процессор заслуживает особого внимания. Он обязательно понравится геймерам со стажем. Достичь успеха помогут ежедневные повторения. Первая большая ёлка была установлена только в 1938 году.`,
  categories: [
    `Разное`
  ],
};

describe(`ArticleService возвращает публикации`, () => {
  let service;
  let articles;

  beforeAll(() => {
    service = new ArticleService(mockArticles);
    articles = service.findAll();
  });

  test(`Возвращает массив из ${mockArticles.length} публикаций`, () => {
    expect(Array.isArray(articles)).toBeTruthy();
    expect(articles.length).toBe(mockArticles.length);
  });

  test(`Id первой публикации равен "${mockArticles[0].id}"`, () => {
    expect(articles[0].id).toBe(mockArticles[0].id);
  });

  test(`Возвращает публикацю с id равным "${mockArticles[1].id}"`, () => {
    const article = service.findOne(mockArticles[1].id);
    expect(article.id).toBe(mockArticles[1].id);
  });
});

describe(`ArticleService редактирует список публикаций`, () => {
  const service = new ArticleService(mockArticles);
  const someId = mockArticles[1].id;
  const articleTitle = `Отредактированный заголовок статьи, внезапно`;

  test(`Создает публикацию`, () => {
    const newArticle = service.create(articleMock);
    expect(newArticle).toMatchObject({
      id: expect.any(String),
      title: expect.any(String),
      createdDate: expect.any(String),
      announce: expect.any(String),
      fullText: expect.any(String),
      categories: expect.any(Array),
      comments: expect.any(Array),
    });
  });

  test(`Количество публикаций после добавления равно 4`, () => {
    const articles = service.findAll();
    expect(articles.length).toBe(4);
  });

  test(`Редактирует публикацию с id "${someId}"`, () => {
    const update = {
      title: articleTitle,
    };
    const updatedArticle = service.update(someId, update);
    expect(updatedArticle.title).toBe(update.title);
  });

  test(`Заголовок публикации с id "${someId}" равен "${articleTitle}"`, () => {
    const article = service.findOne(someId);
    expect(article.title).toBe(articleTitle);
  });

  test(`Удаляет публикацию с id "${someId}"`, () => {
    const droppedArticle = service.drop(someId);
    expect(droppedArticle.id).toBe(someId);
    expect(droppedArticle.title).toBe(articleTitle);
  });

  test(`Количество публикаций после удаления равно 3`, () => {
    const articles = service.findAll();
    expect(articles.length).toBe(3);
  });

  test(`Возвращает null, если публикация для удаления не найдена`, () => {
    const result = service.drop(`whatislove`);
    expect(result).toBeNull();
  });
});

