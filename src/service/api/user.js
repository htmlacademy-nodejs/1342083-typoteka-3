'use strict';

const {Router} = require(`express`);
const {userValidator} = require(`../middlewares`);
const passwordUtils = require(`../libs/password`);
const {
  ApiUrl,
  ApiUserRoute,
  HttpStatusCode,
  UserKey,
} = require(`../../common/enums`);

module.exports = (app, service) => {
  const route = new Router();
  app.use(ApiUrl.USER, route);

  route.get(ApiUserRoute.MAIN, userValidator(service), async (req, res) => {
    const data = req.body;
    data[UserKey.PASSWORD_HASH] = await passwordUtils.hash(data[UserKey.PASSWORD]);

    const result = await service.create(data);
    delete result[UserKey.PASSWORD_HASH];
    return res.status(HttpStatusCode.OK).json(result);
  });
};
