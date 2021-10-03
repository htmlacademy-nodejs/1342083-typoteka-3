'use strict';

const {Router} = require(`express`);
const {APIUrl, HttpStatusCode} = require(`../../constants`);

module.exports = (app, service) => {
  const route = new Router();
  app.use(APIUrl.SEARCH, route);

  route.get(`/`, (req, res) => {
    const {query = ``} = req.query;
    let results = [];

    if (!query.length) {
      return res.status(HttpStatusCode.BAD_REQUEST).json(results);
    }

    results = service.findAll(query);
    return res.status(results.length ? HttpStatusCode.OK : HttpStatusCode.NOT_FOUND).json(results);
  });
};
