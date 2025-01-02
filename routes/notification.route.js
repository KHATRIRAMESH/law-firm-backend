import express from 'express';
import { createNotification } from '../controllers/notification.contoller.js';


const router = express.Router();
router.post("/postNotification", createNotification)
// console.log(router)

export default router;