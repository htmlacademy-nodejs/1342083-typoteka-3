'use strict';

const {SESSION_SECRET} = process.env;
const path = require(`path`);
const express = require(`express`);
const session = require(`express-session`);
const sequelize = require(`../common/libs/sequelize`);
const SequelizeStore = require(`connect-session-sequelize`)(session.Store);
const {
  mainRoutes,
  myRoutes,
  articlesRoutes,
} = require(`./routes`);
const {getLogger} = require(`../common/libs/logger`);
const {APP_PORT} = require(`../common/constants`);
const {
  LoggerName,
  AppPath,
  AppRoute,
  AppFormAction,
  ArticleKey,
  CategoryKey,
  CommentKey,
  UserKey,
  UserType,
  HttpStatusCode,
  AppPage,
  FormElementKey,
} = require(`../common/enums`);
const {
  truncateString,
  humanizeDate,
  formatSearchResult,
} = require(`../common/helpers`);

const SessionStore = {
  EXPIRATION: 180000,
  EXPIRATION_INTERVAL: 60000,
};

if (!SESSION_SECRET) {
  throw new Error(`SESSION_SECRET environment variable is not defined`);
}

const sessionStore = new SequelizeStore({
  db: sequelize,
  expiration: SessionStore.EXPIRATION,
  checkExpirationInterval: SessionStore.EXPIRATION_INTERVAL,
});

sequelize.sync({force: false});

const app = express();
app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(session({
  secret: SESSION_SECRET,
  store: sessionStore,
  resave: false,
  proxy: true,
  saveUninitialized: false,
}));

const logger = getLogger({
  name: LoggerName.APP,
});

app.set(`view engine`, `pug`);
app.set(`views`, path.resolve(__dirname, AppPath.VIEWS_PATH));

app.locals = {
  ...app.locals,
  basedir: path.join(__dirname, AppPath.VIEWS_PATH),
  truncateString,
  humanizeDate,
  formatSearchResult,
  AppRoute,
  AppFormAction,
  ArticleKey,
  CategoryKey,
  CommentKey,
  UserKey,
  UserType,
  FormElementKey,
};

app.use(express.static(path.resolve(__dirname, AppPath.PUBLIC_PATH)));
app.use(express.static(path.resolve(__dirname, AppPath.UPLOAD_PATH)));

app.use(AppRoute.ARTICLES, articlesRoutes);
app.use(AppRoute.MY, myRoutes);
app.use(AppRoute.MAIN, mainRoutes);

app.use((req, res) => {
  logger.error(req);
  res.status(HttpStatusCode.NOT_FOUND).render(AppPage.ERROR_404, {
    account: {
      error: HttpStatusCode.NOT_FOUND,
    },
  });
});

app.use((err, _req, res, _next) => {
  logger.error(err);
  res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).render(AppPage.ERROR_500, {
    account: {
      error: HttpStatusCode.INTERNAL_SERVER_ERROR,
    },
  });
});

app.listen(process.env.APP_PORT || APP_PORT);
