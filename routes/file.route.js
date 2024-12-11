import express from "express";
import { uploadFile } from "../controllers/imageUpload.controller.js";
import { upload } from "../middlewares/multer.middleware.js";
const router = express.Router();

router.post("/uploadfile",upload.single("file"), uploadFile);

export default router;
