'use strict';

const {Router} = require(`express`);
const {
  AppRoute,
  AppPage,
  ArticleKey,
  ArticlesRoute,
  CommentKey,
  ContentLimit,
  DateFormatPattern,
  FormElementKey,
  RouteParam,
} = require(`../../common/enums`);
const {
  assembleRoute,
  calculatePagination,
  getArticleData,
  getCurrentDate,
  getTotalPages,
  sortErrorsByName,
} = require(`../../common/helpers`);
const {getAPI} = require(`../api`);
const {checkIsAuthorized} = require(`../middlewares`);
const {upload} = require(`../storage`);

const articlesRouter = new Router();
const api = getAPI();

articlesRouter.get(ArticlesRoute.MAIN, (_req, res) => {
  res.redirect(AppRoute.MAIN);
});

articlesRouter.get(ArticlesRoute.CATEGORY_$CATEGORY_ID, async (req, res) => {
  const {categoryId} = req.params;
  const {user} = req.session;
  const {page, offset} = calculatePagination(ContentLimit.PREVIEW_LIST, req.query.page);
  const [category, categories, {count, articles}] = await Promise.all([
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
    user,
  });
});

articlesRouter.get(ArticlesRoute.ADD, checkIsAuthorized, async (req, res) => {
  const {user} = req.session;
  const categories = await api.getCategories();

  res.render(AppPage.ADMIN_ARTICLE, {
    article: {
      [ArticleKey.CREATED_DATE]: getCurrentDate(DateFormatPattern.MACHINE),
      [ArticleKey.CATEGORIES]: [],
    },
    categories,
    user,
  });
});

articlesRouter.post(ArticlesRoute.ADD,
    [checkIsAuthorized, upload.single(FormElementKey.UPLOAD)],
    async (req, res) => {
      const article = getArticleData(req.body, req.file);
      const {user} = req.session;

      try {
        await api.createArticle({
          ...article,
          [ArticleKey.USER_ID]: user.id,
        });

        res.redirect(AppRoute.MY);
      } catch (err) {
        const errorsByName = sortErrorsByName(err.response.data);
        const errors = err.response.data;
        const categories = await api.getCategories();

        res.render(AppPage.ADMIN_ARTICLE, {
          article,
          categories,
          user,
          errorsByName,
          errors,
        });
      }
    });

articlesRouter.get(ArticlesRoute.EDIT_$ARTICLE_ID, checkIsAuthorized, async (req, res) => {
  const {articleId} = req.params;
  const {user} = req.session;
  const [{article}, categories] = await Promise.all([
    api.getArticle(articleId),
    api.getCategories(),
  ]);
  const isEditMode = true;

  res.render(AppPage.ADMIN_ARTICLE, {
    article,
    categories,
    user,
    isEditMode,
  });
});

articlesRouter.post(ArticlesRoute.EDIT_$ARTICLE_ID, upload.single(FormElementKey.UPLOAD), async (req, res) => {
  const {articleId} = req.params;
  const {user} = req.session;
  const {body, file} = req;
  const articleUpdate = getArticleData(body, file);

  try {
    await api.updateArticle(articleId, {
      ...articleUpdate, [ArticleKey.USER_ID]: user.id,
    });
    const url = assembleRoute(AppRoute.ARTICLES_$ARTICLE_ID, {
      [RouteParam.ARTICLE_ID]: articleId,
    });

    res.redirect(url);
  } catch (err) {
    const errorsByName = sortErrorsByName(err.response.data);
    const errors = err.response.data;
    const [{article}, categories] = await Promise.all([
      api.getArticle(articleId),
      api.getCategories(),
    ]);
    const isEditMode = true;

    res.render(AppPage.ADMIN_ARTICLE, {
      isEditMode,
      article: {
        ...article,
        ...articleUpdate,
      },
      categories,
      user,
      errorsByName,
      errors,
    });
  }
});

articlesRouter.get(ArticlesRoute.$ARTICLE_ID, async (req, res, next) => {
  try {
    const {articleId} = req.params;
    const {user} = req.session;
    const backHref = req.headers.referer;
    const {article, comments} = await api.getArticle(articleId);

    res.render(AppPage.ARTICLE, {
      article,
      comments,
      backHref,
      user,
    });
  } catch (err) {
    next();
  }
});

articlesRouter.post(ArticlesRoute.$ARTICLE_ID_COMMENTS, checkIsAuthorized, async (req, res) => {
  const {articleId} = req.params;
  const {user} = req.session;

  try {
    const url = assembleRoute(AppRoute.ARTICLES_$ARTICLE_ID, {[CommentKey.ARTICLE_ID]: articleId});
    const newComment = await api.createComment(articleId, {
      ...req.body,
      [CommentKey.USER_ID]: user.id,
    });

    res.redirect(`${url}/#comment-${newComment.id}`);
  } catch (err) {
    const {article, comments} = await api.getArticle(articleId);
    const errors = err.response.data;
    const backHref = AppRoute.MAIN;

    res.render(AppPage.ARTICLE, {
      article,
      comments,
      backHref,
      user,
      errors,
    });
  }
});

module.exports = {
  articlesRouter,
};
