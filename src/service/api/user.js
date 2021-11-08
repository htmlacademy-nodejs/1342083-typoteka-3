'use strict';

const {Router} = require(`express`);
const {userValidator} = require(`../middlewares`);
const passwordUtils = require(`../../common/libs/password`);
const {
  ApiUrl,
  ApiUserRoute,
  HttpStatusCode,
  UserKey,
} = require(`../../common/enums`);

const ErrorAuthMessage = {
  EMAIL: `Электронный адрес не существует`,
  PASSWORD: `Неверный пароль`,
};

module.exports = (app, service) => {
  const route = new Router();
  app.use(ApiUrl.USER, route);

  route.post(ApiUserRoute.MAIN, userValidator(service), async (req, res) => {
    const data = req.body;
    data[UserKey.PASSWORD_HASH] = await passwordUtils.hash(data[UserKey.PASSWORD]);

    const result = await service.create(data);
    delete result[UserKey.PASSWORD_HASH];
    return res.status(HttpStatusCode.CREATED).json(result);
  });

  route.post(ApiUserRoute.AUTH, async (req, res) => {
    const {email, password} = req.body;
    const user = await service.findByEmail(email);

    if (!user) {
      return res.status(HttpStatusCode.UNAUTHORIZED).send(ErrorAuthMessage.EMAIL);
    }

    const passwordIsCorrect = await passwordUtils.compare(password, user.passwordHash);

    if (passwordIsCorrect) {
      delete user[UserKey.PASSWORD_HASH];
      return res.status(HttpStatusCode.OK).send(user);
    }

    return res.status(HttpStatusCode.UNAUTHORIZED).send(ErrorAuthMessage.PASSWORD);
  });
};
