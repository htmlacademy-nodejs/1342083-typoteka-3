'use strict';

const path = require(`path`);
const express = require(`express`);
const {ServerConfig} = require(`./constants`);
const mainRoutes = require(`./routes/main`);
const myRoutes = require(`./routes/my`);
const articlesRoutes = require(`./routes/articles`);

const app = express();

app.set(`view engine`, `pug`);
app.set(`views`, path.resolve(__dirname, ServerConfig.VIEWS_PATH));

app.use(express.static(path.resolve(__dirname, ServerConfig.PUBLIC_PATH)));

app.use(`/`, mainRoutes);
app.use(`/my`, myRoutes);
app.use(`/articles`, articlesRoutes);

app.listen(ServerConfig.DEFAULT_PORT);
