import express from 'express'
import { errorMessage, notFoundMessage } from '../utils/messages.js';
import { getSessionMessages } from '../services/session.service.js';
import { createChat } from '../services/chat.service.js';
import { checkUserAnswer } from './ai.controller.js';

const router = express.Router();

router.get("/:sessionId", async (req, res) => {
    try {
        const { sessionId } = req.params

        if (!sessionId) return res.status(400).json({ message: notFoundMessage('Session ID') })


        const messages = await getSessionMessages(sessionId)
        const data = await checkUserAnswer(messages)

        const question = await createChat({ sender: "bot", text: data.choices[0].message.content, date: new Date(), sessionId })

        res.status(201).send([...messages, question])
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