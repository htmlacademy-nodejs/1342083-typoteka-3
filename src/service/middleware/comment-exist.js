'use strict';

const {HttpStatusCode} = require(`../../constants`);

module.exports = (service) => async (req, res, next) => {
  const {article} = res.locals;
  const {commentId} = req.params;
  const comment = await service.findOne(article, commentId);

  if (!comment) {
    return res.status(HttpStatusCode.NOT_FOUND).send(`Comment with id "${commentId}" not found!`);
  }

  res.locals.comment = comment;
  return next();
};
