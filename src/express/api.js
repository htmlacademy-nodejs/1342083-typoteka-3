'use strict';

const axios = require(`axios`);

const TIMEOUT = 1000;
const port = 3000;
const apiURL = `http://localhost:${port}/api/`;

class API {
  constructor(baseURL, timeout) {
    this._http = axios.create({
      baseURL,
      timeout
    });
  }

  async _load(url, options) {
    const response = await this._http.request({url, ...options});
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
}

const defaultAPI = new API(apiURL, TIMEOUT);

module.exports = {
  API,
  getAPI() {
    return defaultAPI;
  },
};
