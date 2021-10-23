'use strict';

const {Router} = require(`express`);
const {
  ApiUrl,
  ApiSearchRoute,
  HttpStatusCode,
} = require(`../../common/enums`);

module.exports = (app, service) => {
  const route = new Router();
  app.use(ApiUrl.SEARCH, route);

  route.get(ApiSearchRoute.MAIN, async (req, res) => {
    const {query = ``} = req.query;
    const resuls = await service.findAll(query);
    return res.status(HttpStatusCode.OK).json(query.length ? resuls : []);
  });
};
