'use strict';

const path = require(`path`);
const multer = require(`multer`);
const {
  FILE_TYPES,
  RANDOM_NAME_LENGTH,
  UPLOAD_DIR,
} = require(`../common/constants`);
const {getRandomId} = require(`../common/helpers`);

const storage = multer.diskStorage({
  destination: path.resolve(__dirname, UPLOAD_DIR),
  filename(_req, file, cb) {
    const uniqueName = getRandomId(RANDOM_NAME_LENGTH);
    const extension = file.originalname.split(`.`).pop();
    cb(null, `${uniqueName}.${extension}`);
  },
});

const fileFilter = (_req, file, cb) => {
  if (FILE_TYPES.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const upload = multer({storage, fileFilter});

module.exports = {
  upload,
};
