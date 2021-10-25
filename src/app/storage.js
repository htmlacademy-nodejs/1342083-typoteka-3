'use strict';

const path = require(`path`);
const multer = require(`multer`);
const {
  UPLOAD_DIR,
  RANDOM_NAME_LENGTH,
} = require(`../common/constants`);
const {getRandomId} = require(`../common/helpers`);

const storage = multer.diskStorage({
  destination: path.resolve(__dirname, UPLOAD_DIR),
  filename(req, file, cb) {
    const uniqueName = getRandomId(RANDOM_NAME_LENGTH);
    const extension = file.originalname.split(`.`).pop();
    cb(null, `${uniqueName}.${extension}`);
  },
});

const upload = multer({storage});

module.exports = {
  upload,
};
