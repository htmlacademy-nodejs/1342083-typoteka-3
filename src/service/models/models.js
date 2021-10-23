'use strict';

const defineCategory = require(`./category`);
const defineUser = require(`./user`);
const defineArticle = require(`./article`);
const defineComment = require(`./comment`);
const defineArticleCategory = require(`./article-category`);
const {
  ModelAlias,
  CommentKey,
  ArticleCategoryKey,
} = require(`../../constants`);

module.exports = (sequelize) => {
  const Category = defineCategory(sequelize);
  const User = defineUser(sequelize);
  const Article = defineArticle(sequelize);
  const Comment = defineComment(sequelize);
  const ArticleCategory = defineArticleCategory(sequelize);

  Category.hasMany(ArticleCategory, {
    as: ModelAlias.ARTICLES_CATEGORIES,
    foreignKey: ArticleCategoryKey.CATEGORY_ID,
  });

  Category.belongsToMany(Article, {
    as: ModelAlias.ARTICLES,
    through: ArticleCategory,
    foreignKey: ArticleCategoryKey.CATEGORY_ID,
  });

  Article.hasMany(ArticleCategory, {
    as: ModelAlias.ARTICLES_CATEGORIES,
    foreignKey: ArticleCategoryKey.ARTICLE_ID,
    onDelete: `cascade`,
  });

  Article.hasMany(Comment, {
    as: ModelAlias.COMMENTS,
    foreignKey: CommentKey.ARTICLE_ID,
    onDelete: `cascade`,
  });

  Article.belongsToMany(Category, {
    as: ModelAlias.CATEGORIES,
    through: ArticleCategory,
    foreignKey: ArticleCategoryKey.ARTICLE_ID,
  });

  User.hasMany(Comment, {
    foreignKey: CommentKey.USER_ID,
  });

  Comment.belongsTo(Article, {
    as: ModelAlias.ARTICLES,
    foreignKey: CommentKey.ARTICLE_ID,
  });

  Comment.belongsTo(User, {
    as: ModelAlias.USERS,
    foreignKey: CommentKey.USER_ID,
  });

  return {
    Category,
    Article,
    User,
    Comment,
    ArticleCategory,
  };
};
