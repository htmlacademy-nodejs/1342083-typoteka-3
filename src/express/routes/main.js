'use strict';

const {Router} = require(`express`);

const mainRouter = new Router();

mainRouter.get(`/`, (req, res) => res.render(`main`));
mainRouter.get(`/register`, (req, res) => res.render(`register`));
mainRouter.get(`/login`, (req, res) => res.render(`login`));
mainRouter.get(`/search`, (req, res) => res.render(`search`));
mainRouter.get(`/categories`, (req, res) => res.render(`admin/categories`));
mainRouter.get(`/404`, (req, res) => res.render(`errors/404`));
mainRouter.get(`/500`, (req, res) => res.render(`errors/500`));

module.exports = mainRouter;
