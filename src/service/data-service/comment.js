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

    const index = article.comments.findIndex((comment) => comment.id === id);
    article.comments = [...article.comments.slice(0, index), ...article.comments.slice(index + 1)];
    return commentToDrop;
  }

  findOne(article, id) {
    return article.comments.find((comment) => comment.id === id);
  }

  findAll(article) {
    return article.comments;
  }
}

module.exports = CommentService;
