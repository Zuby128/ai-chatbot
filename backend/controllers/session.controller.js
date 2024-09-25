import express from 'express'
import { errorMessage, notFoundMessage } from '../utils/messages.js';
import { getSessionMessages, updateSession } from '../services/session.service.js';
import { createChat } from '../services/chat.service.js';
import { checkUserAnswer } from './ai.controller.js';
import { END_SESSION_SECRET } from '../config.js';

const router = express.Router();

const endSessionText = "Great job—now we've reached the end of our chat about cats. Thank you for participating!"

router.get("/:sessionId", async (req, res) => {
    try {
        const { sessionId } = req.params

        if (!sessionId) return res.status(400).json({ message: notFoundMessage('Session ID') })


        const messages = await getSessionMessages(sessionId)
        const data = await checkUserAnswer(messages)

        let botAnswer
        if (data.choices[0].message.content.includes(END_SESSION_SECRET)) {
            botAnswer = await createChat({ sender: "bot", text: endSessionText, date: new Date(), sessionId })
            await updateSession({ sessionId }, { endedAt: new Date() })
            res.status(204).send([...messages, botAnswer])
        } else {
            botAnswer = await createChat({ sender: "bot", text: data.choices[0].message.content, date: new Date(), sessionId })
            res.status(201).send([...messages, botAnswer])
        }

        res.status(201).send([...messages])
    } catch (error) {
        console.log(error)
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