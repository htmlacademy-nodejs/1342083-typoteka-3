'use strict';

const {describe, expect, test} = require(`@jest/globals`);
const CommentService = require(`./comment`);

const mockData = {
  id: `T13FlI`,
  title: `Как начать программировать`,
  createdDate: `2021-08-30 05:41:26`,
  announce: `Ёлки — это не просто красивое дерево. Это прочная древесина. Помните, небольшое количество ежедневных упражнений лучше, чем один раз, но много. Как начать действовать? Для начала просто соберитесь.`,
  fullText: `Он написал больше 30 хитов. Программировать не настолько сложно, как об этом говорят. Альбом стал настоящим открытием года. Мощные гитарные рифы и скоростные соло-партии не дадут заскучать. Золотое сечение — соотношение двух величин, гармоническая пропорция. Помните, небольшое количество ежедневных упражнений лучше, чем один раз, но много. Игры и программирование разные вещи. Не стоит идти в программисты, если вам нравятся только игры. Этот смартфон — настоящая находка. Большой и яркий экран, мощнейший процессор — всё это в небольшом гаджете. Освоить вёрстку несложно. Возьмите книгу новую книгу и закрепите все упражнения на практике. Собрать камни бесконечности легко, если вы прирожденный герой. Бороться с прокрастинацией несложно. Просто действуйте. Маленькими шагами. Первая большая ёлка была установлена только в 1938 году. Вы можете достичь всего. Стоит только немного постараться и запастись книгами. Это один из лучших рок-музыкантов. Достичь успеха помогут ежедневные повторения. Процессор заслуживает особого внимания. Он обязательно понравится геймерам со стажем. Простые ежедневные упражнения помогут достичь успеха. Из под его пера вышло 8 платиновых альбомов. Рок-музыка всегда ассоциировалась с протестами. Так ли это на самом деле?,`,
  categories: [
    `Деревья`,
    `Без рамки`,
    `IT`
  ],
  comments: [
    {
      id: `9gl2CG`,
      text: `Это где ж такие красоты?`
    },
    {
      id: `8d1r0U`,
      text: `Совсем немного...`
    },
    {
      id: `4m5Zb_`,
      text: `Давно не пользуюсь стационарными компьютерами. Ноутбуки победили.`
    }
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
  const updateCommentId = `9gl2CG`;

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
  const dropCommentId = `9gl2CG`;

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
