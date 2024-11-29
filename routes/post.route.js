import express from "express";
import { createPost, getPosts } from "../controllers/post.controller.js";
const router = express.Router();

router.get("/getposts", getPosts);
router.post("/createpost", createPost);
export default router;
