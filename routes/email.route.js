import express from "express";
import { emailHandler } from "../controllers/email.controller.js";

const router = express.Router();

router.post("/email", emailHandler);

export default router;
