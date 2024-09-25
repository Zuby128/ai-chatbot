import Chat from "../models/chat.model.js"
import Session from "../models/session.model.js"

export const createChat = async (data) => {
    try {
        const chat = await Chat.create(data)

        return chat
    } catch (error) {
        console.log(error)
    }
}