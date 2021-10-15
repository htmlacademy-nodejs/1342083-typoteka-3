'use strict';

const {afterAll, describe, expect, test} = require(`@jest/globals`);
const fs = require(`fs`).promises;
const mock = require(`mock-fs`);
const createGetMockData = require(`./get-mock-data`);
const {
  mockArticles,
} = require(`../mock`);

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
    setMocks(filePath, JSON.stringify(mockArticles));

    const data = await getMockData(filePath);
    expect(data).toMatchObject(mockArticles);
  });

  test(`getMockData не загружает данные повторно`, async () => {
    const getMockData = createGetMockData();
    const filePath = `./another-mock.json`;
    setMocks(filePath, JSON.stringify(mockArticles));

    const spy = jest.spyOn(fs, `readFile`);
    let data = await getMockData(filePath);
    data = await getMockData(filePath);
    data = await getMockData(filePath);
    expect(spy).toHaveBeenCalledTimes(1);
    expect(data).toMatchObject(mockArticles);
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
