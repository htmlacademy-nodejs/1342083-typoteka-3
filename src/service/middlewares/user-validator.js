'use strict';

const {getLogger} = require(`../../common/libs/logger`);
const {userSchema} = require(`../../common/schemas`);
const {
  assembleErrorsExtended,
  assembleErrorsSimple,
} = require(`../../common/helpers`);
const {
  LoggerName,
  HttpStatusCode,
} = require(`../../common/enums`);

const EMAIL_EXIST_MESSAGE = `Электронный адрес уже используется`;

const logger = getLogger({
  name: LoggerName.API,
});

module.exports = (service) => async (req, res, next) => {
  const {error} = userSchema.validate(req.body, {
    abortEarly: false,
  });

  if (error) {
    logger.warn(assembleErrorsSimple(error));
    const errors = assembleErrorsExtended(error);
    return res.status(HttpStatusCode.BAD_REQUEST).send(errors);
  }

  const userByEmail = await service.findByEmail(req.body.email);

  if (userByEmail) {
    return res.status(HttpStatusCode.BAD_REQUEST).send(EMAIL_EXIST_MESSAGE);
  }

  return next();
};
