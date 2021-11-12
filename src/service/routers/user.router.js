'use strict';

const {Router} = require(`express`);
const {
  UserRoute,
  HttpStatusCode,
  UserKey,
} = require(`../../common/enums`);
const passwordUtils = require(`../../common/libs/password.lib`);
const {getError} = require(`../../common/helpers`);
const {userValidator} = require(`../middlewares`);

const ErrorAuthMessage = {
  EMAIL: `Электронный адрес не существует`,
  PASSWORD: `Неверный пароль`,
};

const userRouter = (app, service) => {
  const router = new Router();
  app.use(UserRoute.MAIN, router);

  router.post(UserRoute.ROOT, userValidator(service), async (req, res) => {
    const data = req.body;
    data[UserKey.PASSWORD_HASH] = await passwordUtils.hash(data[UserKey.PASSWORD]);
    const result = await service.create(data);
    delete result[UserKey.PASSWORD_HASH];

    return res.status(HttpStatusCode.CREATED).json(result);
  });

  router.post(UserRoute.AUTH, async (req, res) => {
    const {email, password} = req.body;
    const user = await service.findByEmail(email);

    if (!user) {
      return res.status(HttpStatusCode.UNAUTHORIZED).send([getError(UserKey.EMAIL, ErrorAuthMessage.EMAIL)]);
    }

    const passwordIsCorrect = await passwordUtils.compare(password, user.passwordHash);

    if (passwordIsCorrect) {
      delete user[UserKey.PASSWORD_HASH];
      return res.status(HttpStatusCode.OK).send(user);
    }

    return res.status(HttpStatusCode.UNAUTHORIZED).send(getError(UserKey.PASSWORD, ErrorAuthMessage.PASSWORD));
  });
};

module.exports = {
  userRouter,
};
