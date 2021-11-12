'use strict';

const ADMIN_ID = 1;

const checkIsUserAdmin = (id) => id === ADMIN_ID;

module.exports = {
  checkIsUserAdmin,
};
