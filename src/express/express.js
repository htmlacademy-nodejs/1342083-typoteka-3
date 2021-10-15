'use strict';

const path = require(`path`);
const express = require(`express`);
const mainRoutes = require(`./routes/main`);
const myRoutes = require(`./routes/my`);
const articlesRoutes = require(`./routes/articles`);
const {
  HttpStatusCode,
} = require(`../constants`);
const {
  APP_PORT,
  AppPage,
  AppPath,
  AppRoute,
} = require(`./constants`);

const app = express();

app.set(`view engine`, `pug`);
app.set(`views`, path.resolve(__dirname, AppPath.VIEWS_PATH));
app.locals.basedir = path.join(__dirname, AppPath.VIEWS_PATH);

app.use(express.static(path.resolve(__dirname, AppPath.PUBLIC_PATH)));
app.use(express.static(path.resolve(__dirname, AppPath.UPLOAD_PATH)));

app.use(AppRoute.ARTICLES, articlesRoutes);
app.use(AppRoute.MY, myRoutes);
app.use(AppRoute.MAIN, mainRoutes);

app.use((req, res) => {
  res.status(HttpStatusCode.NOT_FOUND).render(AppPage.ERROR_404, {
    account: {
      error: HttpStatusCode.NOT_FOUND,
    },
  });
});

app.use((_err, _req, res, _next) => {
  res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).render(AppPage.ERROR_500, {
    account: {
      error: HttpStatusCode.INTERNAL_SERVER_ERROR,
    },
  });
});

app.listen(APP_PORT);
