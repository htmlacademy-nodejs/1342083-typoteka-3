'use strict';

const defineModels = require(`../models`);

module.exports = async (sequelize, mocks) => {
  const {
    articles,
    articleCategories,
    categories,
    comments,
    users,
  } = mocks;
  const {
    Article,
    ArticleCategory,
    Comment,
    Category,
    User,
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
