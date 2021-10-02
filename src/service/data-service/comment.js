'use strict';

const {getRandomId} = require(`../../utils`);

class CommentService {
  create(article, comment) {
    const newComment = {
      ...comment,
      id: getRandomId(),
    };
    article.comments = [...article.comments, newComment];
    return newComment;
  }

  drop(article, id) {
    const commentToDrop = this.findOne(article, id);

    if (!commentToDrop) {
      return null;
    }

    const index = this._findIndex(article, id);
    article.comments = [...article.comments.slice(0, index), ...article.comments.slice(index + 1)];
    return commentToDrop;
  }

  update(article, id, update) {
    const commentToUpdate = this.findOne(article, id);

    if (!commentToUpdate) {
      return null;
    }

    const index = this._findIndex(article, id);
    const updatedComment = {...commentToUpdate, ...update};
    article.comments = [...article.comments.slice(0, index), updatedComment, ...article.comments.slice(index + 1)];
    return updatedComment;
  }

  findOne(article, id) {
    return article.comments.find((comment) => comment.id === id);
  }

  findAll(article) {
    return article.comments;
  }

  _findIndex(article, id) {
    return article.comments.findIndex((comment) => comment.id === id);
  }
}

module.exports = CommentService;
