'use strict';

const axios = require(`axios`);
const {API_PORT} = require(`../constants`);

const TIMEOUT = 1000;
const API_URL = `http://localhost:${API_PORT}/api/`;

class API {
  constructor(baseURL, timeout) {
    this._http = axios.create({
      baseURL,
      timeout,
    });
  }

  async _load(url, options) {
    const response = await this._http.request({
      url,
      ...options
    });
    return response.data;
  }

  getArticles() {
    return this._load(`/articles`);
  }

  getArticle(id) {
    return this._load(`/articles/${id}`);
  }

  getCategories() {
    return this._load(`/categories`);
  }

  search(query) {
    return this._load(`/search`, {
      params: {query},
    });
  }

  updateArticle(id, update) {
    return this._load(`/articles/${id}`, {
      method: `PUT`,
      body: update,
    });
  }

  createArticle(data) {
    return this._load(`/articles`, {
      method: `POST`,
      data,
    });
  }
}

const defaultAPI = new API(API_URL, TIMEOUT);

module.exports = {
  API,
  getAPI() {
    return defaultAPI;
  },
};
