const multer = require("multer");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public");
  },
  filename: (req, file, cb) => {
    const split = file.originalname.split(".");
    cb(
      null,
      "" +
        Date.now() +
        Math.round(Math.random * 1000000) +
        "." +
        split[split.length - 1]
    );
  },
});

const upload = multer({ storage: storage, limits: { fileSize: 2048 * 2048 } });

module.exports = upload;
