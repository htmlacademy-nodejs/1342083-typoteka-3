'use strict';

const {
  Sequelize,
  Op: Operator,
} = require(`sequelize`);
const {
  ArticleKey,
  ArticleCategoryKey,
  CategoryKey,
  CommentKey,
  ModelAlias,
  ModelName,
  SortOrder,
  TableName,
  UserKey,
} = require(`../../common/enums`);

class ArticleService {
  constructor(sequelize) {
    this._Article = sequelize.models.Article;
    this._Category = sequelize.models.Category;
    this._Comment = sequelize.models.Comment;
    this._User = sequelize.models.User;
    this._ArticleCategory = sequelize.models.ArticleCategory;
  }

  async create(articleData) {
    const {categories, ...newArticle} = articleData;
    const article = await this._Article.create(newArticle);
    await article.addCategories(categories.map((category) => category.id));

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
    const updatedArticle = await this._Article.update(update, {
      where: {
        [ArticleKey.ID]: id,
      },
      plain: true,
    });

    const article = await this.findOne(id);
    article.setCategories(update.categories.map((category) => category.id));
    return Boolean(updatedArticle);
  }

  findOne(id) {
    return this._Article.findByPk(id, {
      include: [
        {
          model: this._Category,
          as: ModelAlias.CATEGORIES,
          through: {
            attributes: [],
          },
        },
      ],
    });
  }

  async findAll(limit) {
    const articles = await this._Article.findAll({
      include: [
        {
          model: this._Comment,
          as: ModelAlias.COMMENTS,
          attributes: [
            CommentKey.ID,
            CommentKey.TEXT,
            CommentKey.CREATED_DATE,
          ],
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
        },
        {
          model: this._Category,
          as: ModelAlias.CATEGORIES,
          attributes: [
            CategoryKey.ID,
            CategoryKey.NAME,
          ],
          through: {
            attributes: [],
          },
        },
      ],
      order: [
        [ArticleKey.CREATED_DATE, SortOrder.DESC],
      ],
      limit,
    });

    return articles.map((article) => article.get());
  }

  async findAllPopular(limit) {
    const countFn = Sequelize.fn(`COUNT`, Sequelize.col(`${TableName.COMMENTS}.${CommentKey.ID}`));

    const articles = await this._Article.findAll({
      attributes: [
        ArticleKey.ID,
        ArticleKey.ANNOUNCE,
        ArticleKey.CREATED_DATE,
        [countFn, ArticleKey.COMMENTS_COUNT],
      ],
      include: {
        model: this._Comment,
        as: ModelAlias.COMMENTS,
        attributes: [],
        duplicating: false,
      },
      group: [
        Sequelize.col(`${ModelName.ARTICLE}.${ArticleKey.ID}`),
      ],
      having: Sequelize.where(countFn, {
        [Operator.gt]: 0,
      }),
      order: [
        [Sequelize.col(ArticleKey.COMMENTS_COUNT), SortOrder.DESC],
        [ArticleKey.CREATED_DATE, SortOrder.DESC],
      ],
      limit,
    });

    return articles.map((article) => article.get());
  }

  async findAllByCategory({categoryId, limit, offset}) {
    const {count, rows: articles} = await this._Article.findAndCountAll({
      distinct: true,
      include: [
        {
          model: this._Comment,
          as: ModelAlias.COMMENTS,
          attributes: [
            CommentKey.ID,
            CommentKey.TEXT,
            CommentKey.CREATED_DATE,
          ],
        },
        {
          model: this._Category,
          as: ModelAlias.CATEGORIES,
          attributes: [
            CategoryKey.ID,
            CategoryKey.NAME,
          ],
          through: {
            attributes: [],
          },
        },
        {
          model: this._ArticleCategory,
          as: ModelAlias.ARTICLES_CATEGORIES,
          attributes: [],
          where: {
            [ArticleCategoryKey.CATEGORY_ID]: categoryId,
          },
        },
      ],
      order: [
        [ArticleKey.CREATED_DATE, SortOrder.DESC],
      ],
      limit,
      offset,
    });

    return {count, articles};
  }

  async findPage({limit, offset}) {
    const {count, rows: articles} = await this._Article.findAndCountAll({
      distinct: true,
      include: [
        {
          model: this._Comment,
          as: ModelAlias.COMMENTS,
          attributes: [
            CommentKey.ID,
            CommentKey.TEXT,
            CommentKey.CREATED_DATE,
          ],
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
        },
        {
          model: this._Category,
          as: ModelAlias.CATEGORIES,
          attributes: [
            CategoryKey.ID,
            CategoryKey.NAME,
          ],
          through: {
            attributes: [],
          },
        },
      ],
      order: [
        [ArticleKey.CREATED_DATE, SortOrder.DESC],
      ],
      limit,
      offset,
    });

    return {count, articles};
  }
}

module.exports = ArticleService;
