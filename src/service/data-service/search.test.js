'use strict';

const {beforeAll, describe, expect, test} = require(`@jest/globals`);
const SearchService = require(`./search`);
const {
  mockArticles,
} = require(`../mock`);

describe(`SearchService возвращает результаты поиска`, () => {
  let service;
  let searchResults;

  beforeAll(() => {
    service = new SearchService(mockArticles);
    searchResults = service.findAll(`Что такое золотое сечение`);
  });

  test(`Возвращает 2 публикации по запросу "Что такое золотое сечение"`, () => {
    expect(searchResults.length).toBe(2);
  });

  test(`Возвращает 2 публикации в порядке от самых новых к самым старым`, () => {
    expect(searchResults[0].createdDate).toBe(`2021-10-01`);
    expect(searchResults[1].createdDate).toBe(`2021-08-15`);
  });

  test(`Возвращает пустой массив, если ничего не найдено`, () => {
    expect(service.findAll(`To be, or not to be`)).toEqual([]);
  });
});
