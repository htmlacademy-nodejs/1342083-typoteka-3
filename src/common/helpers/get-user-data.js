'use strict';

const {
  UserKey,
  FormElementKey,
} = require(`../enums`);

const getUserData = (body, file) => {
  const userData = {
    [UserKey.EMAIL]: body[FormElementKey.EMAIL],
    [UserKey.FIRST_NAME]: body[FormElementKey.FIRST_NAME],
    [UserKey.LAST_NAME]: body[FormElementKey.LAST_NAME],
    [UserKey.PASSWORD]: body[FormElementKey.PASSWORD],
    [UserKey.PASSWORD_REPEATED]: body[FormElementKey.PASSWORD_REPEATED],
    [UserKey.AVATAR]: file ? file.filename : null,
  };

  return userData;
};

module.exports = {
  getUserData,
};
