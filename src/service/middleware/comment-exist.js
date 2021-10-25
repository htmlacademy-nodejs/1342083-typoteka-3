'use strict';

const {HttpStatusCode} = require(`../../common/enums`);

module.exports = (service) => async (req, res, next) => {
  const {commentId} = req.params;
  const comment = await service.findOne(commentId);

  if (!comment.length) {
    return res.status(HttpStatusCode.NOT_FOUND).send(`Comment with id "${commentId}" not found!`);
  }

  res.locals.comment = comment;
  return next();
};
