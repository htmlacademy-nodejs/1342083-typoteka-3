'use strict';

const axios = require(`axios`);
const {
  API_PORT,
  API_PREFIX,
  API_TIMEOUT,
} = require(`../common/constants`);
const {
  ApiUrl,
  HttpRequestMethod,
} = require(`../common/enums`);

class API {
  constructor(baseURL, timeout) {
    this._http = axios.create({
      baseURL,
      timeout,
    });
  }

  getArticles({limit, offset}) {
    return this._load(ApiUrl.ARTICLES, {
      params: {
        limit,
        offset,
      },
    });
  }

  getPopularArticles(limit) {
    return this._load(`${ApiUrl.ARTICLES}${ApiUrl.POPULAR}`, {
      params: {
        limit,
      },
    });
  }

  getArticlesByCategory({categoryId, limit, offset}) {
    return this._load(`${ApiUrl.CATEGORIES}/${categoryId}${ApiUrl.ARTICLES}`, {
      params: {
        categoryId,
        limit,
        offset,
      },
    });
  }

  getArticle(id) {
    return this._load(`${ApiUrl.ARTICLES}/${id}`);
  }

  updateArticle(id, update) {
    return this._load(`${ApiUrl.ARTICLES}/${id}`, {
      method: HttpRequestMethod.PUT,
      body: update,
    });
  }

  createArticle(data) {
    return this._load(ApiUrl.ARTICLES, {
      method: HttpRequestMethod.POST,
      data,
    });
  }

  getComents({limit, offset}) {
    return this._load(`${ApiUrl.ARTICLES}${ApiUrl.COMMENTS}`, {
      params: {
        limit,
        offset,
      },
    });
  }

  getCommentsByArticle(id) {
    return this._load(`${ApiUrl.ARTICLES}/${id}${ApiUrl.COMMENTS}`);
  }

  getCategory(id) {
    return this._load(`${ApiUrl.CATEGORIES}/${id}`);
  }

  getCategories(count) {
    return this._load(ApiUrl.CATEGORIES, {
      params: {
        count,
      },
    });
  }

  search(query) {
    return this._load(ApiUrl.SEARCH, {
      params: {
        query,
      },
    });
  }

  async _load(url, options) {
    const response = await this._http.request({
      url,
      ...options
    });
    return response.data;
  }
}

const url = `http://localhost:${process.env.API_PORT || API_PORT}${API_PREFIX}`;
const defaultAPI = new API(url, API_TIMEOUT);

module.exports = {
  API,
  getAPI() {
    return defaultAPI;
  },
};
