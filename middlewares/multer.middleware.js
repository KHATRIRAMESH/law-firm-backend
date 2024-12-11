import multer from "multer";
import path from "path";

// const storage = multer.memoryStorage();

// export const upload = multer({
//   storage
// });


const storage = multer.diskStorage({
  // destination: function (req, file, cb) {
  //   cb(null, './public/temp')
  // },
  filename: function (req, file, cb) {
    // const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    // cb(null, file.fieldname + '-' + uniqueSuffix+path.extname(file.originalname))
    cb(null, file.originalname)
  }
})
// console.log(`filename:`)

export const upload = multer({ storage: storage })
