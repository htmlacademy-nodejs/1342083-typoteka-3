'use strict';

const {
  UserKey,
  FormElementKey,
} = require(`../enums`);

const getUserData = (body, file) => {
  const upload = body[FormElementKey.UPLOAD];
  const uploadTemp = body[FormElementKey.UPLOAD_TEMP];
  let avatar = null;

  if (file) {
    avatar = file.filename;
  } else if (upload) {
    avatar = upload;
  } else if (!upload && uploadTemp) {
    avatar = uploadTemp;
  }

  const userData = {
    [UserKey.EMAIL]: body[FormElementKey.EMAIL],
    [UserKey.FIRST_NAME]: body[FormElementKey.FIRST_NAME],
    [UserKey.LAST_NAME]: body[FormElementKey.LAST_NAME],
    [UserKey.PASSWORD]: body[FormElementKey.PASSWORD],
    [UserKey.PASSWORD_REPEATED]: body[FormElementKey.PASSWORD_REPEATED],
    [UserKey.AVATAR]: avatar,
  };

  return userData;
};

module.exports = {
  getUserData,
};
