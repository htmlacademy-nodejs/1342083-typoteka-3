'use strict';

const path = require(`path`);
const express = require(`express`);
const {
  mainRoutes,
  myRoutes,
  articlesRoutes,
} = require(`./routes`);
const {getLogger} = require(`../common/lib/logger`);
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

const app = express();
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

app.use((_req, res) => {
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
