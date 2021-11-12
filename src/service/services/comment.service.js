'use strict';

const {
  ArticleKey,
  CommentKey,
  ModelAlias,
  SortOrder,
  UserKey,
} = require(`../../common/enums`);

class CommentService {
  constructor(sequelize) {
    this._Comment = sequelize.models.Comment;
    this._Article = sequelize.models.Article;
    this._User = sequelize.models.User;
  }

  create(articleId, comment) {
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
    const [affectedRows] = await this._Comment.update(update, {
      where: {
        [CommentKey.ID]: commentId,
      },
    });
    return Boolean(affectedRows);
  }

  findOne(commentId) {
    return this._Comment.findAll({
      where: {
        [CommentKey.ID]: commentId,
      },
      raw: true,
    });
  }

  async findAll({limit, offset}) {
    const {count, rows: comments} = await this._Comment.findAndCountAll({
      include: [
        {
          model: this._Article,
          as: ModelAlias.ARTICLES,
          attributes: [
            ArticleKey.ID,
            ArticleKey.TITLE,
          ],
        },
        {
          model: this._User,
          as: ModelAlias.USERS,
          attributes: {
            include: [
              UserKey.FIRST_NAME,
              UserKey.LAST_NAME,
              UserKey.AVATAR,
            ],
            exclude: [
              UserKey.PASSWORD_HASH,
            ],
          },
        }
      ],
      order: [
        [CommentKey.CREATED_DATE, SortOrder.DESC],
        [CommentKey.TEXT, SortOrder.ASC],
      ],
      limit,
      offset,
    });

    return {count, comments};
  }

  async findAllByArticle(articleId) {
    return await this._Comment.findAll({
      where: {
        [CommentKey.ARTICLE_ID]: articleId,
      },
      attributes: {
        exclude: [
          CommentKey.USER_ID,
        ],
      },
      include: {
        model: this._User,
        as: ModelAlias.USERS,
        attributes: {
          include: [
            UserKey.ID,
            UserKey.FIRST_NAME,
            UserKey.LAST_NAME,
            UserKey.AVATAR,
          ],
          exclude: [
            UserKey.PASSWORD_HASH,
          ],
        },
      },
      order: [
        [CommentKey.CREATED_DATE, SortOrder.DESC],
      ],
    });
  }
}

module.exports = CommentService;
