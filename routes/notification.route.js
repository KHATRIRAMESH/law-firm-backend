import express from 'express';
import {  notification } from '../controllers/notification.contoller.js';


const router = express.Router();
router.get("/getNotification", notification)
// console.log(router)

export default router;