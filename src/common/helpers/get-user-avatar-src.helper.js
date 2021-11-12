'use strict';

const getUserAvatarSrc = (filename) => filename ? `/img/${filename}` : `/img/icons/smile.svg`;

module.exports = {
  getUserAvatarSrc,
};
