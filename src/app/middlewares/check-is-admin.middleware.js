'use strict';

const {
  AppRoute,
  UserKey,
} = require(`../../common/enums`);
const {checkIsUserAdmin} = require(`../../common/helpers`);

const checkIsAdmin = (req, res, next) => {
  const {user} = req.session;
  const isAdmin = checkIsUserAdmin(user[UserKey.ID]);

  if (!isAdmin) {
    res.redirect(AppRoute.MAIN);
  }

  return next();
};

module.exports = {
  checkIsAdmin,
};
