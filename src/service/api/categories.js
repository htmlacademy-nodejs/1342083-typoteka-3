'use strict';

const {Router} = require(`express`);
const {APIUrl, HttpStatusCode} = require(`../../constants`);

module.exports = (app, service) => {
  const route = new Router();
  app.use(APIUrl.CATEGORIES, route);

  route.get(`/`, async (req, res) => {
    const {count} = req.query;
    const categories = await service.findAll(count);
    res.status(HttpStatusCode.OK).json(categories);
  });
};
