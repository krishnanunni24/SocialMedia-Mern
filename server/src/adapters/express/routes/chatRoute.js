import express from 'express';
import { createMessage, fetchChat, fetchMessages, getChatNotification, updateMessageStatus } from '../controllers/chatController.js';


const router = express.Router()

router.get('/:userId', fetchChat);
router.get('/:receiverId/:userId',fetchMessages)

router.post("/message",createMessage)
router.put("/updateMessageStatus",updateMessageStatus)
router.get("/:userId/notifications/:chatId",getChatNotification)


export default router