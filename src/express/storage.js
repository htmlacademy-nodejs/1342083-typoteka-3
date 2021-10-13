'use strict';

const path = require(`path`);
const multer = require(`multer`);
const {getRandomId} = require(`../utils`);

const UPLOAD_DIR = `./upload/img`;
const RANDOM_NAME_LENGTH = 10;

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