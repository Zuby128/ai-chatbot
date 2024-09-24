import express from 'express'
import { createChat } from '../services/chat.service.js';

const router = express.Router();

router.post("/", async (req, res) => {
    try {
        const { sender, text, sessionId } = req.body

        if (!sender && !text && !sessionId) return res.status(400).send({ message: notFoundMessage('Session ID') })

        await createChat({ sender, text, sessionId })

        res.status(201).send({ message: updateMessage('chat') })

    } catch (error) {
        res.status(500).send({ message: errorMessage() })
    }
})

export default router;