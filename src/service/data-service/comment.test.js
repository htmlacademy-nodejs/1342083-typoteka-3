'use strict';

const {describe, expect, test} = require(`@jest/globals`);
const CommentService = require(`./comment`);

const mockData = {
  id: `g2-WE1`,
  title: `Что такое золотое сечение`,
  createdDate: `2021-09-10 10:44:03`,
  announce: `Этот смартфон — настоящая находка. Большой и яркий экран, мощнейший процессор — всё это в небольшом гаджете. Бороться с прокрастинацией несложно. Просто действуйте. Маленькими шагами. Помните, небольшое количество ежедневных упражнений лучше, чем один раз, но много. Программировать не настолько сложно, как об этом говорят. Достичь успеха помогут ежедневные повторения.`,
  categories: [
    `Разное`,
    `Программирование`,
    `Без рамки`
  ],
  comments: [
    {
      id: `yZh3mr`,
      text: `Это где ж такие красоты?`,
      createdDate: `2021-08-04 13:12:35`
    },
    {
      id: `MkZ1nx`,
      text: `Плюсую, но слишком много буквы!`,
      createdDate: `2021-09-29 08:14:32`
    },
    {
      id: `-VRzP8`,
      text: `Совсем немного...`,
      createdDate: `2021-08-28 13:46:36`
    },
  ]
};

const commentUpdate = {
  text: `Помните, небольшое количество ежедневных упражнений лучше, чем один раз, но много.`,
};

test(`CommentService возвращает массив с 3 комментариями`, () => {
  const article = JSON.parse(JSON.stringify(mockData));
  const service = new CommentService();

  const comments = service.findAll(article);
  expect(Array.isArray(comments)).toBeTruthy();
  expect(comments.length).toBe(3);
});

describe(`CommentService создает новый комментарий`, () => {
  const article = JSON.parse(JSON.stringify(mockData));
  const service = new CommentService();
  const text = `Он обязательно понравится геймерам со стажем`;

  test(`Возвращает новый комментарий`, () => {
    const newComment = service.create(article, {text});
    expect(newComment.text).toBe(text);
  });

  test(`Количество комментариев равно 4`, () => {
    const comments = service.findAll(article);
    expect(comments.length).toBe(4);
  });

  test(`Текст последнего комментария равен "${text}"`, () => {
    const comments = service.findAll(article);
    const lastComment = comments[comments.length - 1];
    expect(lastComment.text).toBe(text);
  });
});

describe(`CommentService обновляет комментарий`, () => {
  const article = JSON.parse(JSON.stringify(mockData));
  const service = new CommentService();
  const updateCommentId = `yZh3mr`;

  test(`Обновляет комментарий с id "${updateCommentId}"`, () => {
    const droppedComment = service.update(article, updateCommentId, commentUpdate);
    expect(droppedComment.id).toBe(updateCommentId);
  });

  test(`Количество комментариев равно 3`, () => {
    const comments = service.findAll(article);
    expect(Array.isArray(comments)).toBeTruthy();
    expect(comments.length).toBe(3);
  });

  test(`Текст комментария с id "${updateCommentId}" равен "${commentUpdate.text}"`, () => {
    const comment = service.findOne(article, updateCommentId);
    expect(comment.text).toBe(commentUpdate.text);
  });
});

describe(`CommentService удаляет комментарий`, () => {
  const article = JSON.parse(JSON.stringify(mockData));
  const service = new CommentService();
  const dropCommentId = `yZh3mr`;

  test(`Удаляет комментарий с id "${dropCommentId}"`, () => {
    const droppedComment = service.drop(article, dropCommentId);
    expect(droppedComment.id).toBe(dropCommentId);
  });

  test(`Количество комментариев равно 2`, () => {
    const comments = service.findAll(article);
    expect(Array.isArray(comments)).toBeTruthy();
    expect(comments.length).toBe(2);
  });

  test(`Возвращает null, если комментарий для удаления не найден`, () => {
    const result = service.drop(article, `notFound`);
    expect(result).toBeNull();
  });
});
