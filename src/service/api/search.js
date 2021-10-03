'use strict';

const {Router} = require(`express`);
const {APIUrl, HttpStatusCode} = require(`../../constants`);

module.exports = (app, service) => {
  const route = new Router();
  app.use(APIUrl.SEARCH, route);

  route.get(`/`, (req, res) => {
    const {query = ``} = req.query;
    const results = query.length ? service.findAll(query) : [];
    return res.status(HttpStatusCode.OK).json(results);
  });
};
