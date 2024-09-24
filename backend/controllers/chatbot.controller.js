import express from 'express'
import { createChat } from '../services/chat.service.js';

const router = express.Router();

router.post("/", async (req, res) => {
    try {
        const { sender, text, sessionId } = req.body

        if (!sender && !text && !sessionId) return res.status(400).json({ message: notFoundMessage('Session ID') })

        await createChat({ sender, text, sessionId })

        res.status(201).json({ message: updateMessage('chat') })

    } catch (error) {
        res.status(500).json({ message: errorMessage() })
    }
})

export default router;