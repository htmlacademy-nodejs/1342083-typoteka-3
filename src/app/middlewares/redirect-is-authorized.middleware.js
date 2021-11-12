'use strict';

const {AppRoute} = require(`../../common/enums`);

const redirectIsAuthorized = (req, res, next) => {
  const {user} = req;

  if (user) {
    res.redirect(AppRoute.MAIN);
  }

  next();
};

module.exports = {
  redirectIsAuthorized,
};
