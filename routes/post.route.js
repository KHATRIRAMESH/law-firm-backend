import express from "express";
import { createPost, deletePost, getPosts, updatePost } from "../controllers/post.controller.js";
const router = express.Router();

router.get("/getposts", getPosts);
router.post("/createpost", createPost);
router.put("/updatepost", updatePost);
router.delete("/deletepost", deletePost);
export default router; 
