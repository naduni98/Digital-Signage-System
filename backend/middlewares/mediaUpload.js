const multer = require('multer');
const path = require('path');
const fs = require('fs');
const mime = require('mime-types');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const now = new Date();
    const folder = path.join(
      __dirname,
      '../uploads/media/',
      now.getFullYear().toString(),
      (now.getMonth() + 1).toString().padStart(2, '0'),
      req.body.room || 'common'
    );
    fs.mkdirSync(folder, { recursive: true });
    cb(null, folder);
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const name = path.basename(file.originalname, ext);
    const safeName = `${name}-${Date.now()}${ext}`;
    cb(null, safeName);
  },
});

const upload = multer({ storage });
module.exports = upload;
