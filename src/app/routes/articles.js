'use strict';

const {Router} = require(`express`);
const {getAPI} = require(`../api`);
const {upload} = require(`../storage`);
const {
  AppArticleRoute,
  AppRoute,
  AppPage,
  UserType,
  FormElementKey,
  ArticleKey,
  ContentLimit,
  DateFormatPattern,
  LoggerName,
  RouteParam,
} = require(`../../common/enums`);
const {
  getCurrentDate,
  calculatePagination,
  getTotalPages,
  assembleRoute,
  getArticleData,
} = require(`../../common/helpers`);
const {getLogger} = require(`../../common/libs/logger`);


const articlesRouter = new Router();
const api = getAPI();
const logger = getLogger({
  name: LoggerName.APP,
});

articlesRouter.get(AppArticleRoute.MAIN, (_req, res) => {
  res.redirect(AppRoute.MAIN);
});

articlesRouter.get(AppArticleRoute.CATEGORY, async (req, res) => {
  const {page, offset} = calculatePagination(ContentLimit.PREVIEW_LIST, req.query.page);
  const {id: categoryId} = req.params;

  const [
    category,
    categories,
    {count, articles},
  ] = await Promise.all([
    api.getCategory(categoryId),
    api.getCategories(true),
    api.getArticlesByCategory({
      categoryId,
      limit: ContentLimit.PREVIEW_LIST,
      offset,
    }),
  ]);

  const totalPages = getTotalPages(count, ContentLimit.PREVIEW_LIST);
  res.render(AppPage.CATEGORY, {
    category,
    articles,
    categories,
    page,
    totalPages,
    account: {
      type: UserType.USER,
    },
  });
});

articlesRouter.get(AppArticleRoute.ADD, async (_req, res) => {
  const categories = await api.getCategories();

  res.render(AppPage.ADMIN_ARTICLE, {
    article: {
      [ArticleKey.CREATED_DATE]: getCurrentDate(DateFormatPattern.MACHINE),
      [ArticleKey.CATEGORIES]: [],
    },
    categories,
    account: {
      type: UserType.ADMIN,
    },
  });
});

articlesRouter.get(AppArticleRoute.EDIT, async (req, res) => {
  const [
    article,
    categories,
  ] = await Promise.all([
    api.getArticle(req.params.id),
    api.getCategories(),
  ]);

  res.render(AppPage.ADMIN_ARTICLE, {
    isEditMode: true,
    article,
    categories,
    account: {
      type: UserType.ADMIN,
    },
  });
});

articlesRouter.post(
    AppArticleRoute.EDIT,
    upload.single(FormElementKey.UPLOAD),
    async (req, res) => {
      const {id} = req.params;
      const articleUpdate = getArticleData(req.body, req.file);

      try {
        await api.updateArticle(id, articleUpdate);

        const url = assembleRoute(AppRoute.ARTICLE, {
          [RouteParam.ARTICLE_ID]: id,
        });
        res.redirect(url);
      } catch (err) {
        logger.error(err.message);
        const validationError = err.response.data;

        const [article, categories] = await Promise.all([
          api.getArticle(id),
          api.getCategories(),
        ]);
        res.render(AppPage.ADMIN_ARTICLE, {
          isEditMode: true,
          article: {
            ...article,
            ...articleUpdate,
          },
          categories,
          account: {
            type: UserType.ADMIN,
          },
          validationError,
        });
      }
    }
);

articlesRouter.get(AppArticleRoute.ARTICLE, async (req, res, next) => {
  try {
    const article = await api.getArticle(req.params.id);
    res.render(AppPage.ARTICLE, {
      article,
      backHref: req.headers.referer,
      account: {
        type: UserType.USER,
      },
    });
  } catch (err) {
    next();
  }
});

articlesRouter.post(
    AppArticleRoute.ADD,
    upload.single(FormElementKey.UPLOAD),
    async (req, res) => {
      const article = getArticleData(req.body, req.file);

      try {
        await api.createArticle(article);
        res.redirect(AppRoute.MY);
      } catch (err) {
        logger.error(err.message);
        const validationError = err.response.data;
        const categories = await api.getCategories();
        res.render(AppPage.ADMIN_ARTICLE, {
          article,
          categories,
          account: {
            type: UserType.ADMIN,
          },
          validationError,
        });
      }
    }
);

articlesRouter.post(AppArticleRoute.COMMENTS, async (req, res) => {
  const {id} = req.params;

  try {
    const url = assembleRoute(AppRoute.ARTICLE, {
      articleId: id,
    });
    const newComment = await api.createComment(id, req.body);
    res.redirect(`${url}/#comment-${newComment.id}`);
  } catch (err) {
    const article = await api.getArticle(id);
    const validationError = err.response.data;

    res.render(AppPage.ARTICLE, {
      article,
      backHref: AppRoute.MAIN,
      account: {
        type: UserType.USER,
      },
      validationError,
    });
  }
});

module.exports = articlesRouter;
