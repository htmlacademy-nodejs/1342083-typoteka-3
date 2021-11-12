'use strict';

const axios = require(`axios`);
const {
  API_PORT,
  API_PREFIX,
  API_TIMEOUT,
} = require(`../common/constants`);
const {
  ApiRoute,
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

  getArticle(id) {
    const url = assembleRoute(ApiRoute.ARTICLES_$ARTICLE_ID, {
      [RouteParam.ARTICLE_ID]: id,
    });

    return this._load(url);
  }

  createArticle(data) {
    return this._load(ApiRoute.ARTICLES, {
      method: HttpRequestMethod.POST,
      data,
    });
  }

  deleteArticle(id) {
    const url = assembleRoute(ApiRoute.ARTICLES_$ARTICLE_ID, {
      [RouteParam.ARTICLE_ID]: id,
    });

    return this._load(url, {
      method: HttpRequestMethod.DELETE,
    });
  }

  updateArticle(id, data) {
    const url = assembleRoute(ApiRoute.ARTICLES_$ARTICLE_ID, {
      [RouteParam.ARTICLE_ID]: id,
    });

    return this._load(url, {
      method: HttpRequestMethod.PUT,
      data,
    });
  }

  getArticles({limit, offset}) {
    return this._load(ApiRoute.ARTICLES, {
      params: {
        limit,
        offset,
      },
    });
  }

  getPopularArticles(limit) {
    return this._load(ApiRoute.ARTICLES_POPULAR, {
      params: {
        limit,
      },
    });
  }

  getArticlesByCategory({categoryId, limit, offset}) {
    const url = assembleRoute(ApiRoute.CATEGORIES_$CATEGORY_ID_ARTICLES, {
      [RouteParam.CATEGORY_ID]: categoryId,
    });

    return this._load(url, {
      params: {
        limit,
        offset,
      },
    });
  }

  createComment(id, data) {
    const url = assembleRoute(ApiRoute.ARTICLES_$ARTICLE_ID_COMMENTS, {
      [RouteParam.ARTICLE_ID]: id,
    });

    return this._load(url, {
      method: HttpRequestMethod.POST,
      data,
    });
  }

  deleteComment(commentId) {
    const url = assembleRoute(ApiRoute.COMMENTS_$COMMENT, {
      [RouteParam.COMMENT_ID]: commentId,
    });

    return this._load(url, {
      method: HttpRequestMethod.DELETE,
    });
  }

  getComents({limit, offset}) {
    return this._load(ApiRoute.COMMENTS, {
      params: {
        limit,
        offset,
      },
    });
  }

  getCommentsByArticle(id) {
    const url = assembleRoute(ApiRoute.ARTICLES_$ARTICLE_ID_COMMENTS, {
      [RouteParam.ARTICLE_ID]: id,
    });

    return this._load(url);
  }

  getCategory(id) {
    const url = assembleRoute(ApiRoute.CATEGORIES_$CATEGORY_ID, {
      [RouteParam.CATEGORY_ID]: id,
    });

    return this._load(url);
  }

  createCategory(data) {
    return this._load(ApiRoute.CATEGORIES, {
      method: HttpRequestMethod.POST,
      data,
    });
  }

  deleteCategory(id) {
    const url = assembleRoute(ApiRoute.CATEGORIES_$CATEGORY_ID, {
      [RouteParam.CATEGORY_ID]: id,
    });

    return this._load(url, {
      method: HttpRequestMethod.DELETE,
    });
  }

  updateCategory(id, data) {
    const url = assembleRoute(ApiRoute.CATEGORIES_$CATEGORY_ID, {
      [RouteParam.CATEGORY_ID]: id,
    });

    return this._load(url, {
      method: HttpRequestMethod.PUT,
      data,
    });
  }

  getCategories(needCount) {
    return this._load(ApiRoute.CATEGORIES, {
      params: {
        needCount,
      },
    });
  }

  search(query) {
    return this._load(ApiRoute.SEARCH, {
      params: {
        query,
      },
    });
  }

  createUser(data) {
    return this._load(ApiRoute.USER, {
      method: HttpRequestMethod.POST,
      data,
    });
  }

  login(email, password) {
    return this._load(ApiRoute.USER_AUTH, {
      method: HttpRequestMethod.POST,
      data: {email, password},
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

const port = process.env.API_PORT || API_PORT;
const url = `http://localhost:${port}${API_PREFIX}`;
const defaultAPI = new API(url, API_TIMEOUT);

module.exports = {
  API,
  getAPI() {
    return defaultAPI;
  },
};
