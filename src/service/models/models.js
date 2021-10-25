'use strict';

const defineCategory = require(`./category`);
const defineUser = require(`./user`);
const defineArticle = require(`./article`);
const defineComment = require(`./comment`);
const defineArticleCategory = require(`./article-category`);
const {
  ArticleCategoryKey,
  ModelAlias,
  CommentKey,
} = require(`../../common/enums`);

module.exports = (sequelize) => {
  const Article = defineArticle(sequelize);
  const Category = defineCategory(sequelize);
  const Comment = defineComment(sequelize);
  const User = defineUser(sequelize);
  const ArticleCategory = defineArticleCategory(sequelize);

  Category.hasMany(ArticleCategory, {
    foreignKey: ArticleCategoryKey.CATEGORY_ID,
    as: ModelAlias.ARTICLES_CATEGORIES,
  });

  Article.hasMany(Comment, {
    foreignKey: CommentKey.ARTICLE_ID,
    as: ModelAlias.COMMENTS,
  });
  Article.hasMany(ArticleCategory, {
    foreignKey: ArticleCategoryKey.ARTICLE_ID,
    as: ModelAlias.ARTICLES_CATEGORIES,
    onDelete: `cascade`,
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

  Comment.belongsTo(User, {
    foreignKey: CommentKey.USER_ID,
    as: ModelAlias.USER,
  });
  Comment.belongsTo(Article, {
    foreignKey: CommentKey.ARTICLE_ID_ID,
    as: ModelAlias.ARTICLE,
  });

  return {
    Category,
    Article,
    User,
    Comment,
    ArticleCategory,
  };
};
