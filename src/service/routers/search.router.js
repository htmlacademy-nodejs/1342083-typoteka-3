'use strict';

const {Router} = require(`express`);
const {
  HttpStatusCode,
  SearchRoute,
} = require(`../../common/enums`);

const searchRouter = (app, service) => {
  const router = new Router();
  app.use(SearchRoute.MAIN, router);

  router.get(SearchRoute.ROOT, async (req, res) => {
    const {query = ``} = req.query;

    if (!query) {
      return res.status(HttpStatusCode.OK).json([]);
    }

    const results = await service.findAll(query);
    return res.status(HttpStatusCode.OK).json(results);
  });
};

module.exports = {
  searchRouter,
};
