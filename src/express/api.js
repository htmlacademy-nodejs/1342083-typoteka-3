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

  getArticles(limit) {
    return this._load(`/articles`, {
      params: {
        limit,
      },
    });
  }

  getPopularArticles(limit) {
    return this._load(`/articles/popular`, {
      params: {
        limit,
      },
    });
  }

  getArticle(id) {
    return this._load(`/articles/${id}`);
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

  getAllComments(limit) {
    return this._load(`/articles/comments`, {
      params: {
        limit,
      },
    });
  }

  getCommentsById(id) {
    return this._load(`/articles/${id}/comments`);
  }

  getCategories(count) {
    return this._load(`/categories`, {
      params: {
        count,
      },
    });
  }

  search(query) {
    return this._load(`/search`, {
      params: {
        query,
      },
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
