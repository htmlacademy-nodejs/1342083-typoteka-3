'use strict';

const {AppRoute} = require(`../../common/enums`);

module.exports = (req, res, next) => {
  const {user} = req.session;
  const isAdmin = Boolean(user && user.isAdmin);

  if (!isAdmin) {
    res.redirect(AppRoute.MAIN);
  }

  return next();
};
