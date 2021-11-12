'use strict';

const createSession = require(`express-session`);
const SequelizeStore = require(`connect-session-sequelize`)(createSession.Store);
const sequelize = require(`../common/libs/sequelize.lib`);
const {SESSION_SECRET} = process.env;

const SessionStore = {
  EXPIRATION: 180000,
  EXPIRATION_INTERVAL: 60000,
};

if (!SESSION_SECRET) {
  throw new Error(`SESSION_SECRET environment variable is not defined`);
}

sequelize.sync({force: false});

const sessionStore = new SequelizeStore({
  db: sequelize,
  expiration: SessionStore.EXPIRATION,
  checkExpirationInterval: SessionStore.EXPIRATION_INTERVAL,
});

const session = createSession({
  secret: SESSION_SECRET,
  store: sessionStore,
  resave: false,
  proxy: true,
  saveUninitialized: false,
  cookie: {
    sameSite: `strict`,
  },
});

module.exports = {
  session,
};
