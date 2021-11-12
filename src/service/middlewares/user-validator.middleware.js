'use strict';

const {
  LoggerName,
  HttpStatusCode,
  UserKey,
} = require(`../../common/enums`);
const {getLogger} = require(`../../common/libs/logger.lib`);
const {assembleErrors} = require(`../../common/helpers`);
const {userSchema} = require(`../../common/schemas`);

const EMAIL_EXIST_MESSAGE = `Электронный адрес уже используется`;

const logger = getLogger({
  name: LoggerName.API,
});

module.exports = (service) => async (req, res, next) => {
  const userByEmail = await service.findByEmail(req.body[UserKey.EMAIL]);

  if (userByEmail) {
    return res.status(HttpStatusCode.BAD_REQUEST).send([EMAIL_EXIST_MESSAGE]);
  }

  const {error} = userSchema.validate(req.body, {
    abortEarly: false,
  });

  if (error) {
    logger.warn(assembleErrors(error));
    const errors = assembleErrors(error);
    return res.status(HttpStatusCode.BAD_REQUEST).send(errors);
  }

  return next();
};
