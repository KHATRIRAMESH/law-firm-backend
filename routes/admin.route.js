import express from "express";
import {
  signin,
  signOut,
  updateUser,
} from "../controllers/admin.controller.js";
const router = express.Router();

router.post("/signin", signin);
router.post("/signout", signOut);
router.put("/update/:userId", updateUser);
export default router;
