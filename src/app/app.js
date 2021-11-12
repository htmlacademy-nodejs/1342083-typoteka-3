'use strict';

const path = require(`path`);
const express = require(`express`);
const {
  articlesRouter,
  mainRouter,
  myRouter,
} = require(`./routers`);
const {APP_PORT} = require(`../common/constants`);
const {
  AdminAction,
  AppFormAction,
  AppPath,
  AppRoute,
  ArticleKey,
  CategoryKey,
  CommentKey,
  FormElementKey,
  UserKey,
} = require(`../common/enums`);
const {
  assembleRoute,
  checkIsUserAdmin,
  formatSearchResult,
  getUserAvatarSrc,
  humanizeDate,
  truncateString,
} = require(`../common/helpers`);
const {
  internalServerError,
  notFound,
} = require(`./errors`);
const {session} = require(`./session`);

const app = express();
app.use(express.urlencoded({extended: false}));
app.use(session);

app.set(`view engine`, `pug`);
app.set(`views`, path.resolve(__dirname, AppPath.VIEWS));

app.locals = {
  ...app.locals,
  basedir: path.join(__dirname, AppPath.VIEWS),
  AdminAction,
  AppFormAction,
  AppRoute,
  ArticleKey,
  CategoryKey,
  CommentKey,
  FormElementKey,
  UserKey,
  assembleRoute,
  checkIsUserAdmin,
  formatSearchResult,
  getUserAvatarSrc,
  humanizeDate,
  truncateString,
};

app.use(express.static(path.resolve(__dirname, AppPath.PUBLIC)));
app.use(express.static(path.resolve(__dirname, AppPath.UPLOAD)));

app.use(AppRoute.ARTICLES, articlesRouter);
app.use(AppRoute.MAIN, mainRouter);
app.use(AppRoute.MY, myRouter);

app.use(notFound);
app.use(internalServerError);

app.listen(process.env.APP_PORT || APP_PORT);
