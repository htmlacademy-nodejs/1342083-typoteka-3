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
  RouteParam,
} = require(`../common/enums`);
const {assembleRoute} = require(`../common/helpers`);

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
    return this._load(ApiUrl.ARTICLES_POPULAR, {
      params: {
        limit,
      },
    });
  }

  getArticlesByCategory({categoryId, limit, offset}) {
    const url = assembleRoute(ApiUrl.CATEGORIES_$CATEGORY_ARTICLES, {
      [RouteParam.CATEGORY_ID]: categoryId,
    });

    return this._load(url, {
      params: {
        limit,
        offset,
      },
    });
  }

  getArticle(id) {
    const url = assembleRoute(ApiUrl.ARTICLES_$ARTICLE, {
      [RouteParam.ARTICLE_ID]: id,
    });

    return this._load(url);
  }

  updateArticle(id, article) {
    const url = assembleRoute(ApiUrl.ARTICLES_$ARTICLE, {
      [RouteParam.ARTICLE_ID]: id,
    });

    return this._load(url, {
      method: HttpRequestMethod.PUT,
      data: article,
    });
  }

  createArticle(article) {
    return this._load(ApiUrl.ARTICLES, {
      method: HttpRequestMethod.POST,
      data: article,
    });
  }

  getComents({limit, offset}) {
    return this._load(ApiUrl.ARTICLES_COMMENTS, {
      params: {
        limit,
        offset,
      },
    });
  }

  getCommentsByArticle(id) {
    const url = assembleRoute(ApiUrl.ARTICLES_$ARTICLE_COMMENTS, {
      [RouteParam.ARTICLE_ID]: id,
    });

    return this._load(url);
  }

  createComment(id, comment) {
    const url = assembleRoute(ApiUrl.ARTICLES_$ARTICLE_COMMENTS, {
      [RouteParam.ARTICLE_ID]: id,
    });

    return this._load(url, {
      method: HttpRequestMethod.POST,
      data: comment,
    });
  }

  getCategory(id) {
    const url = assembleRoute(ApiUrl.CATEGORIES_$CATEGORY, {
      [RouteParam.CATEGORY_ID]: id,
    });

    return this._load(url);
  }

  createCategory(category) {
    return this._load(ApiUrl.CATEGORIES, {
      method: HttpRequestMethod.POST,
      data: category,
    });
  }

  getCategories(needCount) {
    return this._load(ApiUrl.CATEGORIES, {
      params: {
        needCount,
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

  createUser(user) {
    return this._load(ApiUrl.USER, {
      method: HttpRequestMethod.POST,
      data: user,
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
