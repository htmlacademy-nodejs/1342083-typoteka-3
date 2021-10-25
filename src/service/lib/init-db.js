'use strict';

const defineModels = require(`../models`);

module.exports = async (sequelize, mocks) => {
  const {
    categories,
    articles,
    users,
    comments,
    articleCategories,
  } = mocks;
  const {
    Category,
    Article,
    User,
    Comment,
    ArticleCategory,
  } = defineModels(sequelize);

  await sequelize.sync({
    force: true,
  });

  await Category.bulkCreate(categories);
  await User.bulkCreate(users);
  await Article.bulkCreate(articles);
  await Comment.bulkCreate(comments);
  await ArticleCategory.bulkCreate(articleCategories);
};
