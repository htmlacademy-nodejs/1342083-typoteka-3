'use strict';

const {checkIsAdmin} = require(`./check-is-admin.middleware`);
const {checkIsAuthorized} = require(`./check-is-authorized.middleware`);
const {redirectIsAuthorized} = require(`./redirect-is-authorized.middleware`);

module.exports = {
  checkIsAdmin,
  checkIsAuthorized,
  redirectIsAuthorized,
};
