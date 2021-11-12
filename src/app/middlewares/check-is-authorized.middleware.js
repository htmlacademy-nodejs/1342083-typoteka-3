'use strict';

const {AppRoute} = require(`../../common/enums`);

const checkIsAuthorized = (req, res, next) => {
  const {user} = req.session;

  if (!user) {
    return res.redirect(AppRoute.LOGIN);
  }

  return next();
};

module.exports = {
  checkIsAuthorized,
};
