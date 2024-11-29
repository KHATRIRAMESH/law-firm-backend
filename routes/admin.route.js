import express from "express";
import { signin } from "../controllers/admin.controller.js";
const router = express.Router();

router.get("/signin", signin);

export default router;
