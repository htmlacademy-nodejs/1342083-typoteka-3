'use strict';

const {Router} = require(`express`);
const {APIUrl, HttpStatusCode} = require(`../../constants`);

module.exports = (app, service) => {
  const route = new Router();
  app.use(APIUrl.SEARCH, route);

  route.get(`/`, async (req, res) => {
    const {query = ``} = req.query;
    const resuls = await service.findAll(query);
    return res.status(HttpStatusCode.OK).json(query.length ? resuls : []);
  });
};
