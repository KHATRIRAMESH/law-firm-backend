import express from "express";
import { createPost, deletePost, getPosts, updatePost } from "../controllers/post.controller.js";
import { upload } from "../middlewares/multer.middleware.js";
const router = express.Router();

router.get("/getposts", getPosts);
router.post("/createpost",upload.single("file"), createPost);
router.post("/updatepost/:postId", updatePost);
router.delete("/deletepost/:postId", deletePost);
export default router; 
