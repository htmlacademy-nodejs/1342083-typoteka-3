'use strict';

const {afterAll, describe, expect, test} = require(`@jest/globals`);
const fs = require(`fs`).promises;
const mock = require(`mock-fs`);
const createGetMockData = require(`./get-mock-data`);

const mockData = [
  {
    id: `37dzoU`,
    title: `Ёлки. История деревьев`,
    createdDate: `2021-07-23 20:04:09`,
    announce: `Альбом стал настоящим открытием года. Мощные гитарные рифы и скоростные соло-партии не дадут заскучать. Первая большая ёлка была установлена только в 1938 году. Бороться с прокрастинацией несложно. Просто действуйте. Маленькими шагами. Этот смартфон — настоящая находка. Большой и яркий экран, мощнейший процессор — всё это в небольшом гаджете.`,
    fullText: `Процессор заслуживает особого внимания. Он обязательно понравится геймерам со стажем.`,
    сategory: [
      `Кино`
    ],
    comments: [
      {
        id: `SthDo1`,
        text: `Совсем немного...`
      },
      {
        id: `rt4_DL`,
        text: `Мне кажется или я уже читал это где-то?`
      },
      {
        id: `T6hKHJ`,
        text: `Давно не пользуюсь стационарными компьютерами. Ноутбуки победили.`
      },
      {
        id: `pmg0QO`,
        text: `Это где ж такие красоты?`
      },
      {
        id: `XJ0FCZ`,
        text: `Планируете записать видосик на эту тему?`
      }
    ]
  }
];

const invalidMockData = `{foo:bar}`;

const setMocks = (filePath, data) => mock({
  [filePath]: data,
});

describe(`getMockData возвращает данные`, () => {
  afterAll(() => {
    mock.restore();
  });

  test(`getMockData возвращает массив со статьями, если данные валидны`, async () => {
    const filePath = `./mock.json`;
    const getMockData = createGetMockData();
    setMocks(filePath, JSON.stringify(mockData));

    const data = await getMockData(filePath);
    expect(data).toMatchObject(mockData);
  });

  test(`getMockData не загружает данные повторно`, async () => {
    const getMockData = createGetMockData();
    const filePath = `./another-mock.json`;
    setMocks(filePath, JSON.stringify(mockData));

    const spy = jest.spyOn(fs, `readFile`);
    let data = await getMockData(filePath);
    data = await getMockData(filePath);
    data = await getMockData(filePath);
    expect(spy).toHaveBeenCalledTimes(1);
    expect(data).toMatchObject(mockData);
  });

  test(`getMockData возвращает пустой массив, если данные невалидны`, async () => {
    const getMockData = createGetMockData();
    const filePath = `./invalid-mock.json`;
    setMocks(filePath, invalidMockData);

    const data = await getMockData(filePath);
    expect(Array.isArray(data)).toBeTruthy();
    expect(data.length).toBe(0);
  });
});
