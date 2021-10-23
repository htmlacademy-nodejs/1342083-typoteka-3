'use strict';

const {Sequelize, Op} = require(`sequelize`);
const {
  ArticleKey,
  ModelAlias,
  SortOrder,
  TableName,
  CommentKey,
} = require(`../../constants`);

class ArticleService {
  constructor(sequelize) {
    this._Article = sequelize.models.Article;
    this._Category = sequelize.models.Category;
    this._Comment = sequelize.models.Comment;
  }

  async create(articleData) {
    const article = await this._Article.crete(articleData);
    await article.addCategories(articleData[ArticleKey.CATEGORIES]);
    return article.get();
  }

  async drop(id) {
    const deletedRows = await this._Article.destroy({
      where: {
        [ArticleKey.ID]: id,
      },
    });

    return Boolean(deletedRows);
  }

  async update(id, update) {
    const [affectedRows] = this._Article.update(update, {
      where: {
        [ArticleKey.ID]: id,
      },
    });
    return Boolean(affectedRows);
  }

  async findOne(id) {
    return await this._Article.findByPk(id, {
      include: [ModelAlias.CATEGORIES, ModelAlias.COMMENTS],
    });
  }

  async findAll(limit) {
    const options = {
      include: [ModelAlias.CATEGORIES, ModelAlias.COMMENTS],
      order: [
        [ArticleKey.CREATED_DATE, SortOrder.DESC],
      ],
    };

    if (limit) {
      options.limit = limit;
    }

    const articles = await this._Article.findAll(options);
    return articles.map((article) => article.get());
  }

  async findAllPopular(limit) {
    const options = {
      attributes: {
        include: [Sequelize.fn(`COUNT`, Sequelize.col(`${TableName.COMMENTS}.${CommentKey.ID}`)), `count`],
      },
      include: {
        model: this._Comment,
        as: ModelAlias.COMMENTS,
        attributes: [],
        duplicating: false,
      },
      group: [Sequelize.col(`Article.${ArticleKey.ID}`)],
      having: Sequelize.where(Sequelize.fn(`COUNT`, Sequelize.col(`${TableName.COMMENTS}.${CommentKey.ID}`)), {
        [Op.gte]: 1,
      }),
      order: [
        [`count`, SortOrder.DESC],
      ],
    };

    if (limit) {
      options.limit = limit;
    }

    const articles = await this._Article.findAll(options);
    return articles.map((article) => article.get());
  }
}

module.exports = ArticleService;
