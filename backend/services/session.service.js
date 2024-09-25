import Chat from "../models/chat.model.js"
import Session from "../models/session.model.js"

export const checkAndCreateSession = async (sessionId) => {
    try {
        const session = await Session.findOne({ sessionId })

        if (!session) {
            await Session.create({ sessionId })
        }
    } catch (error) {
        console.log(error)
    }
}

export const getSessionMessages = async (sessionId) => {
    try {
        const messages = await Chat.find({ sessionId })
        return messages
    } catch (error) {
        console.log(error)
    }
}

export const updateSession = async (id, obj) => {
    try {
        await Session.findOneAndUpdate(id, obj)
    } catch (error) {
        console.log(error)
    }
}

