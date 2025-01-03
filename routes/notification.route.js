import express from 'express';
import { createNotification } from '../controllers/notification.contoller.js';


const router = express.Router();
router.get("/postNotification", createNotification)
// console.log(router)

export default router;