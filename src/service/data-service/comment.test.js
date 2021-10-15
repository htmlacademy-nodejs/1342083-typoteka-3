'use strict';

const {describe, expect, test} = require(`@jest/globals`);
const CommentService = require(`./comment`);
const {
  mockArticles,
} = require(`../mock`);

const commentUpdate = {
  text: `Помните, небольшое количество ежедневных упражнений лучше, чем один раз, но много.`,
};

test(`CommentService возвращает массив с 4 комментариями`, () => {
  const articles = JSON.parse(JSON.stringify(mockArticles));
  const service = new CommentService();

  const comments = service.findAll(articles[0]);
  expect(Array.isArray(comments)).toBeTruthy();
  expect(comments.length).toBe(4);
});

describe(`CommentService создает новый комментарий`, () => {
  const articles = JSON.parse(JSON.stringify(mockArticles));
  const service = new CommentService();
  const text = `Он обязательно понравится геймерам со стажем`;

  test(`Возвращает новый комментарий`, () => {
    const newComment = service.create(articles[0], {text});
    expect(newComment.text).toBe(text);
  });

  test(`Количество комментариев равно 5`, () => {
    const comments = service.findAll(articles[0]);
    expect(comments.length).toBe(5);
  });

  test(`Текст последнего комментария равен "${text}"`, () => {
    const comments = service.findAll(articles[0]);
    const lastComment = comments[comments.length - 1];
    expect(lastComment.text).toBe(text);
  });
});

describe(`CommentService обновляет комментарий`, () => {
  const articles = JSON.parse(JSON.stringify(mockArticles));
  const service = new CommentService();
  const updateCommentId = articles[0].comments[0].id;

  test(`Обновляет комментарий с id "${updateCommentId}"`, () => {
    const updatedComment = service.update(articles[0], updateCommentId, commentUpdate);
    expect(updatedComment.id).toBe(updateCommentId);
  });

  test(`Количество комментариев равно 4`, () => {
    const comments = service.findAll(articles[0]);
    expect(Array.isArray(comments)).toBeTruthy();
    expect(comments.length).toBe(4);
  });

  test(`Текст комментария с id "${updateCommentId}" равен "${commentUpdate.text}"`, () => {
    const comment = service.findOne(articles[0], updateCommentId);
    expect(comment.text).toBe(commentUpdate.text);
  });
});

describe(`CommentService удаляет комментарий`, () => {
  const articles = JSON.parse(JSON.stringify(mockArticles));
  const service = new CommentService();
  const dropCommentId = `U3alhN`;

  test(`Удаляет комментарий с id "${dropCommentId}"`, () => {
    const droppedComment = service.drop(articles[0], dropCommentId);
    expect(droppedComment.id).toBe(dropCommentId);
  });

  test(`Количество комментариев равно 3`, () => {
    const comments = service.findAll(articles[0]);
    expect(Array.isArray(comments)).toBeTruthy();
    expect(comments.length).toBe(3);
  });

  test(`Возвращает null, если комментарий для удаления не найден`, () => {
    const result = service.drop(articles[0], `notFound`);
    expect(result).toBeNull();
  });
});
