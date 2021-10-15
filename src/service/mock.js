'use strict';

const mockArticles = [
  {
    id: `RX8qm4`,
    title: `Что такое золотое сечение`,
    createdDate: `2021-10-01`,
    announce: `Программировать не настолько сложно, как об этом говорят. Простые ежедневные упражнения помогут достичь успеха....`,
    fullText: `Ёлки — это не просто красивое дерево. Это прочная древесина. Рок-музыка всегда ассоциировалась с ...`,
    categories: [
      {
        name: `Разное`,
        id: `DTxsl0`,
      },
    ],
    comments: [
      {
        text: `Давно не пользуюсь стационарными компьютерами. Ноутбуки победили.`,
        createdDate: `2021-11-05`,
        id: `U3alhN`,
        author: {
          email: `PDW8C0GWcXWQ68nRtbLwQ@mail.com`,
          firstName: `Мария`,
          lastName: `Кириченко`,
          passwordHash: `dbf2054308f848873a3f6a2a35817185`,
          avatar: `avatar-5.png`,
        },
      },
      {
        text: `Планируете записать видосик на эту тему?`,
        createdDate: `2021-10-18`,
        id: `hKou-o`,
        author: {
          email: `LQeWc5QFCz-79iLVlbYxM@mail.com`,
          firstName: `Женя`,
          lastName: `Марков`,
          passwordHash: `514a799c6f2d29cabe5ae12d512e1fb7`,
          avatar: `avatar-2.png`,
        },
      },
      {
        text: `Согласен с автором!`,
        createdDate: `2021-10-15`,
        id: `IXubIW`,
        author: {
          email: `LQeWc5QFCz-79iLVlbYxM@mail.com`,
          firstName: `Женя`,
          lastName: `Марков`,
          passwordHash: `514a799c6f2d29cabe5ae12d512e1fb7`,
          avatar: `avatar-2.png`,
        },
      },
      {
        text: `Совсем немного...`,
        createdDate: `2021-10-15`,
        id: `7U2kPK`,
        author: {
          email: `PDW8C0GWcXWQ68nRtbLwQ@mail.com`,
          firstName: `Мария`,
          lastName: `Кириченко`,
          passwordHash: `dbf2054308f848873a3f6a2a35817185`,
          avatar: `avatar-5.png`,
        },
      },
    ],
    author: {
      email: `qlKKf0GXJo437DvU11jAf@mail.com`,
      firstName: `Александр`,
      lastName: `Фролова`,
      passwordHash: `3d2b0e748f740ecd8d4d498a92dc52d6`,
      avatar: `avatar-5.png`,
    },
  },
  {
    id: `8UAaPJ`,
    title: `Обзор новейшего смартфона`,
    createdDate: `2021-9-01`,
    announce: `Собрать камни бесконечности легко, если вы прирожденный герой. Бороться с прокрастинацией несложно. Просто действуйте. Маленькими шагами. Вы можете достичь всего. Стоит только немного постараться и запастись книгами. Альбом стал настоящим открытие...`,
    fullText: `Достичь успеха помогут ежедневные повторения. Этот смартфон — настоящая находка. Большой и яркий ...`,
    categories: [
      {
        name: `Деревья`,
        id: `a2kdK5`,
      },
      {
        name: `За жизнь`,
        id: `dWNppT`,
      },
      {
        name: `Без рамки`,
        id: `Y2UNGI`,
      },
      {
        name: `Разное`,
        id: `DTxsl0`,
      },
    ],
    comments: [
      {
        text: `Совсем немного...`,
        createdDate: `2021-10-15`,
        id: `7U2kPK`,
        author: {
          email: `PDW8C0GWcXWQ68nRtbLwQ@mail.com`,
          firstName: `Мария`,
          lastName: `Кириченко`,
          passwordHash: `dbf2054308f848873a3f6a2a35817185`,
          avatar: `avatar-5.png`,
        },
      },
      {
        text: `Это где ж такие красоты?`,
        createdDate: `2021-11-05`,
        id: `_EdvDG`,
        author: {
          email: `iGO-1OfCf8jTOGLESmQSu@mail.com`,
          firstName: `Александр`,
          lastName: `Петров`,
          passwordHash: `d6b370b94ea255f28e6e3c5df79d73c7`,
          avatar: `avatar-4.png`,
        },
      },
      {
        text: `Планируете записать видосик на эту тему?`,
        createdDate: `2021-10-18`,
        id: `hKou-o`,
        author: {
          email: `LQeWc5QFCz-79iLVlbYxM@mail.com`,
          firstName: `Женя`,
          lastName: `Марков`,
          passwordHash: `514a799c6f2d29cabe5ae12d512e1fb7`,
          avatar: `avatar-2.png`,
        },
      },
      {
        text: `Мне не нравится ваш стиль. Ощущение, что вы меня поучаете.`,
        createdDate: `2021-12-15`,
        id: `qmwEsN`,
        author: {
          email: `bhY6kW525FPmS6fXpv7MV@mail.com`,
          firstName: `Женя`,
          lastName: `Кириченко`,
          passwordHash: `596dbaa5ec53b8a8b8c213c0136d7b7e`,
          avatar: `avatar-1.png`,
        },
      },
    ],
    author: {
      email: `iGO-1OfCf8jTOGLESmQSu@mail.com`,
      firstName: `Александр`,
      lastName: `Петров`,
      passwordHash: `d6b370b94ea255f28e6e3c5df79d73c7`,
      avatar: `avatar-4.png`,
    },
  },
  {
    id: `6oQ5er`,
    title: `Что такое золотое сечение`,
    picture: `sea.jpg`,
    createdDate: `2021-08-15`,
    announce: `Достичь успеха помогут ежедневные повторения....`,
    fullText: `Это один из лучших рок-музыкантов. Бороться с прокрастинацией несложно. Просто действуйте. Малень...`,
    categories: [
      {
        name: `Кино`,
        id: `TAUcht`,
      },
      {
        name: `Без рамки`,
        id: `Y2UNGI`,
      },
      {
        name: `IT`,
        id: `vPSy6A`,
      },
      {
        name: `Железо`,
        id: `b4fMBR`,
      },
    ],
    comments: [],
    author: {
      email: `bhY6kW525FPmS6fXpv7MV@mail.com`,
      firstName: `Женя`,
      lastName: `Кириченко`,
      passwordHash: `596dbaa5ec53b8a8b8c213c0136d7b7e`,
      avatar: `avatar-1.png`,
    },
  },
];

const mockCategories = [
  {
    name: `Разное`,
    id: `DTxsl0`,
  },
  {
    name: `Деревья`,
    id: `a2kdK5`,
  },
  {
    name: `За жизнь`,
    id: `dWNppT`,
  },
  {
    name: `Без рамки`,
    id: `Y2UNGI`,
  },
  {
    name: `Кино`,
    id: `TAUcht`,
  },
  {
    name: `IT`,
    id: `vPSy6A`,
  },
  {
    name: `Железо`,
    id: `b4fMBR`,
  },
];

module.exports = {
  mockArticles,
  mockCategories,
};
