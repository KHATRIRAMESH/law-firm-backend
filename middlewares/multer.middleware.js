import multer from "multer";
import path from "path";

const storage = multer.memoryStorage({
  destination: function (req, file, cb) {
    cb(null, "../temp");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(
      null,
      file.fieldname + "-" + uniqueSuffix + path.extname(file.originalname)
    );
    cb(null, file.originalname);
  },
});

export const upload = multer({ storage });
