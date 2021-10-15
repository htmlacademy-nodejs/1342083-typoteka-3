'use strict';

const {Router} = require(`express`);
const {getAPI} = require(`../api`);
const {
  UserType,
  CommentKey,
} = require(`../../constants`);
const {
  MyRoute,
  AppPage,
} = require(`../constants`);
const {
  compareDatesDescend,
} = require(`../../utils`);

const myRouter = new Router();
const api = getAPI();

myRouter.get(MyRoute.MAIN, async (req, res) => {
  const articles = await api.getArticles();

  res.render(AppPage.ADMIN_ARTICLES, {
    articles,
    account: {
      type: UserType.ADMIN,
    },
  });
});

myRouter.get(MyRoute.COMMENTS, async (req, res) => {
  const articles = await api.getArticles();
  const comments = articles
    .map((article) => {
      return article.comments.map((comment) => {
        comment[CommentKey.ARTICLE] = article;
        return comment;
      });
    })
    .flat()
    .sort((first, second) => compareDatesDescend(first[CommentKey.CREATED_DATE], second[CommentKey.CREATED_DATE]));

  res.render(AppPage.ADMIN_COMMENTS, {
    comments,
    account: {
      type: UserType.ADMIN,
    },
  });
});

module.exports = myRouter;
