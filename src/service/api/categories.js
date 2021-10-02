'use strict';

const {Router} = require(`express`);
const {HttpStatusCode} = require(`../../constants`);

const URL = `/categories`;

module.exports = (app, service) => {
  const route = new Router();
  app.use(URL, route);

  route.get(`/`, async (req, res) => {
    const categories = await service.findAll();
    res.status(HttpStatusCode.OK).json(categories);
  });
};
