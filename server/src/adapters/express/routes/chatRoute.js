import express from 'express';
import { createMessage, fetchChat, fetchMessages } from '../controllers/chatController.js';


const router = express.Router()

router.get('/:userId', fetchChat);
router.get('/:receiverId/:userId',fetchMessages)

router.post("/message",createMessage)


export default router