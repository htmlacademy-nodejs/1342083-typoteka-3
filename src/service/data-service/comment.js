'use strict';

const {
  Sequelize
} = require(`sequelize`);
const {
  CommentKey,
  ModelAlias,
  SortOrder,
} = require(`../../constants`);

class CommentService {
  constructor(sequelize) {
    this._Comment = sequelize.models.Comment;
    this._Article = sequelize.models.Article;
    this._User = sequelize.models.User;
  }
  async create(articleId, comment) {
    return this._Comment.create({
      [CommentKey.ARTICLE_ID]: articleId,
      ...comment,
    });
  }

  async drop(commentId) {
    const deletedRows = await this._Comment.destroy({
      where: {
        [CommentKey.ID]: commentId,
      },
    });
    return Boolean(deletedRows);
  }

  async update(commentId, update) {
    const [affectedRows] = this._Comment.update(update, {
      where: {
        [CommentKey.ID]: commentId,
      },
    });
    return Boolean(affectedRows);
  }

  async findOne(commentId) {
    return await this._Comment.findAll({
      where: {
        [CommentKey.ID]: commentId,
      },
      raw: true,
    });
  }

  async findAll(limit) {
    return await this._Comment.findAll({
      attributes: [
        CommentKey.ID,
        CommentKey.CREATED_DATE,
        CommentKey.TEXT,
        [Sequelize.col(`articles.id`), `articleId`],
        [Sequelize.col(`users.firstName`), `firstName`],
        [Sequelize.col(`users.lastName`), `lastName`],
        [Sequelize.col(`users.avatar`), `avatar`],
      ],
      include: [
        {
          model: this._Article,
          as: ModelAlias.ARTICLES,
          attributes: [],
        },
        {
          model: this._User,
          as: ModelAlias.USERS,
          attributes: [],
        },
      ],
      order: [
        [CommentKey.CREATED_DATE, SortOrder.DESC],
      ],
      raw: true,
      limit,
    });
  }

  async findAllByArticle(articleId) {
    return await this._Comment.findAll({
      where: {
        [CommentKey.ARTICLE_ID]: articleId,
      },
      raw: true,
    });
  }
}

module.exports = CommentService;
