'use strict';

const {DATE_FORMAT_PATTERN, CommentKey} = require(`../../constants`);
const {getRandomId, getCurrentDate} = require(`../../utils`);

class CommentService {
  create(article, comment) {
    const newComment = {
      ...comment,
      [CommentKey.ID]: getRandomId(),
      [CommentKey.CREATED_DATE]: getCurrentDate(DATE_FORMAT_PATTERN),
    };
    article.comments = [...article.comments, newComment];
    return newComment;
  }

  drop(article, id) {
    const commentToDrop = this.findOne(article, id);

    if (!commentToDrop) {
      return null;
    }

    article.comments = article.comments.filter((comment) => comment.id !== id);
    return commentToDrop;
  }

  update(article, id, update) {
    const commentToUpdate = this.findOne(article, id);

    if (!commentToUpdate) {
      return null;
    }

    const updatedComment = {...commentToUpdate, ...update};
    article.comments = article.comments.map((comment) => {
      if (comment.id === id) {
        return updatedComment;
      }

      return comment;
    });
    return updatedComment;
  }

  findOne(article, id) {
    return article.comments.find((comment) => comment.id === id);
  }

  findAll(article) {
    return article.comments;
  }
}

module.exports = CommentService;
