'use strict';

const {
  ArticleCategoryKey,
  ModelAlias,
  CommentKey,
  ArticleKey,
} = require(`../../common/enums`);
const defineArticle = require(`./article.model`);
const defineArticleCategory = require(`./article-category.model`);
const defineCategory = require(`./category.model`);
const defineComment = require(`./comment.model`);
const defineUser = require(`./user.model`);

module.exports = (sequelize) => {
  const Article = defineArticle(sequelize);
  const Category = defineCategory(sequelize);
  const Comment = defineComment(sequelize);
  const User = defineUser(sequelize);
  const ArticleCategory = defineArticleCategory(sequelize);

  Article.hasMany(Comment, {
    foreignKey: CommentKey.ARTICLE_ID,
    as: ModelAlias.COMMENTS,
  });
  Comment.belongsTo(Article, {
    foreignKey: CommentKey.ARTICLE_ID,
    as: ModelAlias.ARTICLES,
  });

  Article.belongsToMany(Category, {
    through: ArticleCategory,
    foreignKey: ArticleCategoryKey.ARTICLE_ID,
    as: ModelAlias.CATEGORIES,
  });
  Category.belongsToMany(Article, {
    through: ArticleCategory,
    foreignKey: ArticleCategoryKey.CATEGORY_ID,
    as: ModelAlias.ARTICLES,
  });

  Article.hasMany(ArticleCategory, {
    foreignKey: ArticleCategoryKey.ARTICLE_ID,
    as: ModelAlias.ARTICLES_CATEGORIES,
    onDelete: `cascade`,
  });
  Category.hasMany(ArticleCategory, {
    foreignKey: ArticleCategoryKey.CATEGORY_ID,
    as: ModelAlias.ARTICLES_CATEGORIES,
  });

  User.hasMany(Article, {
    foreignKey: ArticleKey.USER_ID,
    as: ModelAlias.USERS,
  });
  Article.belongsTo(User, {
    foreignKey: ArticleKey.USER_ID,
    as: ModelAlias.USERS,
  });

  User.hasMany(Comment, {
    foreignKey: CommentKey.USER_ID,
    as: ModelAlias.COMMENTS,
  });
  Comment.belongsTo(User, {
    foreignKey: CommentKey.USER_ID,
    as: ModelAlias.USERS,
  });

  return {
    Category,
    Article,
    User,
    Comment,
    ArticleCategory,
  };
};
