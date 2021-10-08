'use strict';

const path = require(`path`);
const express = require(`express`);
const mainRoutes = require(`./routes/main`);
const myRoutes = require(`./routes/my`);
const articlesRoutes = require(`./routes/articles`);
const {
  APP_PORT,
  AppPath,
  AppRoute,
} = require(`./constants`);

const app = express();

app.set(`view engine`, `pug`);
app.set(`views`, path.resolve(__dirname, AppPath.VIEWS_PATH));
app.locals.basedir = path.join(__dirname, AppPath.VIEWS_PATH);

app.use(express.static(path.resolve(__dirname, AppPath.PUBLIC_PATH)));
app.use(express.static(path.resolve(__dirname, AppPath.UPLOAD_PATH)));

app.use(AppRoute.MAIN, mainRoutes);
app.use(AppRoute.MY, myRoutes);
app.use(AppRoute.ARTICLES, articlesRoutes);

app.listen(APP_PORT);
