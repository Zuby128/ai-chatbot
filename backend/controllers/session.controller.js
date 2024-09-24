import express from 'express'
import { createSession } from '../services/session.service.js';
import { errorMessage, notFoundMessage, successMessage } from '../utils/messages.js';

const router = express.Router();

router.post("/", async (req, res) => {
    try {
        const { sessionId } = req.body

        if (!sessionId) return res.status(400).json({ message: notFoundMessage('Session ID') })

        await createSession(sessionId)

        res.status(200).json({ message: successMessage('session') })
    } catch (error) {
        res.status(500).json({ message: errorMessage() })
    }
})

router.patch("/", async (req, res) => {
    try {
        const { sessionId, endedAt } = req.body

        if (!sessionId && !endedAt) return res.status(400).json({ message: notFoundMessage('Session ID') })

        await updateSession(sessionId, { endedAt })

        res.status(201).json({ message: updateMessage('session') })
    } catch (error) {
        res.status(500).json({ message: errorMessage() })
    }
})

export default router;