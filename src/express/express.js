'use strict';

const express = require(`express`);
const {ServerConfig} = require(`./constants`);
const mainRoutes = require(`./routes/main`);
const myRoutes = require(`./routes/my`);
const articlesRoutes = require(`./routes/articles`);

const app = express();
app.use(`/`, mainRoutes);
app.use(`/my`, myRoutes);
app.use(`/articles`, articlesRoutes);

app.listen(ServerConfig.DEFAULT_PORT);
