import multer from "multer";
import path from "path";

// const storage = multer.memoryStorage();

// export const upload = multer({
//   storage
// });

// const storage = multer.memoryStorage({
// destination: function (req, file, cb) {
//   cb(null, './public/temp')
// },
// filename: function (req, file, cb) {
// const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
// cb(null, file.fieldname + '-' + uniqueSuffix+path.extname(file.originalname))
// cb(null, file.originalname)
// }

// })
// console.log(`filename:`)

export const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB file size limit
  },
  fileFilter: (req, file, cb) => {
    const allowedTypes = ["image/jpeg", "image/png", "image/gif", "image/webp"];
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error("Invalid file type. Only images are allowed."), false);
    }
  },
});
