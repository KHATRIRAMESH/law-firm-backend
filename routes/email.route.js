import express from "express";
import { postEmailHandler } from "../controllers/email.controller.js";

const router = express.Router();

router.post("/postEmail", postEmailHandler);
// router.get("/getEmail", getEmailHandler);

export default router;
