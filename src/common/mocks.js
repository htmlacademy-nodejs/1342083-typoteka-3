'use strict';

const categories = [
  {
    name: `Деревья`,
  },
  {
    name: `За жизнь`,
  },
];

const articles = [
  {
    title: `Что такое золотое сечение`,
    picture: `sea.jpg`,
    createdDate: `2021-10-31T16:27:58.238Z`,
    announce: `Ёлки — это не просто красивое дерево. Это прочная древесина. Он написал больше 30 хитов. Помните, небольшое количество ежедневных упражнений лучше, чем один раз, но много. Достичь успеха помогут ежедневные повторения. Как начать действовать? Для нач…`,
    fullText: `Первая большая ёлка была установлена только в 1938 году. Собрать камни бесконечности легко, если вы…`,
  },
  {
    title: `Учим HTML и CSS`,
    picture: `forest.jpg`,
    createdDate: `2021-10-20T12:05:58.238Z`,
    announce: `Вы можете достичь всего. Стоит только немного постараться и запастись книгами. Бороться с прокрастинацией несложно. Просто действуйте. Маленькими шагами.`,
    fullText: `Игры и программирование разные вещи. Не стоит идти в программисты, если вам нравятся только игры. В…`,
  },
  {
    title: `Как достигнуть успеха не вставая с кресла`,
    picture: `skyscraper`,
    createdDate: `2021-10-27T07:20:58.238Z`,
    announce: `Альбом стал настоящим открытием года. Мощные гитарные рифы и скоростные соло-партии не дадут заскучать. Он написал больше 30 хитов.`,
    fullText: `Этот смартфон — настоящая находка. Большой и яркий экран, мощнейший процессор — всё это в небольшом…`,
  },
];

const users = [
  {
    email: `7lIBpGhnUI-OstrAMchyy@mail.com`,
    firstName: `Женя`,
    lastName: `Фролова`,
    passwordHash: `3d2b0e748f740ecd8d4d498a92dc52d6`,
    avatar: `avatar-2.png`,
  },
];

const comments = [
  {
    text: `Давно не пользуюсь стационарными компьютерами. Ноутбуки победили.`,
    createdDate: `2021-10-31T23:28:58.239Z`,
    articleId: 1,
    userId: 1,
  },
  {
    text: `Мне не нравится ваш стиль. Ощущение, что вы меня поучаете.`,
    createdDate: `2021-10-26T18:48:58.239Z`,
    articleId: 2,
    userId: 1,
  },
  {
    text: `Совсем немного...`,
    createdDate: `2021-10-26T22:09:58.240Z`,
    articleId: 2,
    userId: 1,
  },
  {
    text: `Давно не пользуюсь стационарными компьютерами. Ноутбуки победили.`,
    createdDate: `2021-10-25T21:07:58.240Z`,
    articleId: 3,
    userId: 1,
  },
];

const articleCategories = [
  {
    articleId: 1,
    categoryId: 1,
  },
  {
    articleId: 1,
    categoryId: 2,
  },
  {
    articleId: 2,
    categoryId: 1,
  },
  {
    articleId: 2,
    categoryId: 2,
  },
  {
    articleId: 3,
    categoryId: 1,
  },
];

module.exports = {
  categories,
  articles,
  users,
  comments,
  articleCategories,
};
