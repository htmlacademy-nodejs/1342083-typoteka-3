'use strict';

const {describe, expect, test} = require(`@jest/globals`);
const CategoryService = require(`./category`);
const {
  mockArticles,
  mockCategories,
} = require(`../mock`);

describe(`CategoryService возвращает категории`, () => {
  test(`Экземпляр CategoryService возвращает массив категорий`, () => {
    const categoryService = new CategoryService(mockArticles);
    const categories = categoryService.findAll();
    expect(categories).toEqual(mockCategories);
  });

  test(`Экземпляр CategoryService возвращает пустой массив, если нет категорий`, () => {
    const categoryService = new CategoryService([]);
    const categories = categoryService.findAll();
    expect(categories).toEqual([]);
  });
});
