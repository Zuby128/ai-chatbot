import express from 'express'
import { createChat } from '../services/chat.service.js';
import { checkAndCreateSession } from '../services/session.service.js';
import { errorMessage, successMessage } from '../utils/messages.js';

const router = express.Router();

router.post("/", async (req, res) => {
    try {
        const { sender, text, sessionId } = req.body

        if (!sender && !text && !sessionId) return res.status(400).json({ message: notFoundMessage('Session ID') })

        await createChat({ sender, text, sessionId, date: new Date() })

        await checkAndCreateSession(sessionId)

        res.status(200).json({ message: successMessage('chat') })

    } catch (error) {
        res.status(500).json({ message: errorMessage() })
    }
})

export default router;