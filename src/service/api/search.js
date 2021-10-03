'use strict';

const {Router} = require(`express`);
const {HttpStatusCode} = require(`../../constants`);

const URL = `/search`;

module.exports = (app, service) => {
  const route = new Router();
  app.use(URL, route);

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
