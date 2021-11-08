'use strict';

const {AppRoute} = require(`../../common/enums`);

module.exports = (req, res, next) => {
  const {user} = req.session;

  if (!user) {
    return res.redirect(AppRoute.LOGIN);
  }

  return next();
};
