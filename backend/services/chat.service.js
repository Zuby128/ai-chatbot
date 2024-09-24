import Chat from "../models/chat.model.js"

export const createChat = async (data) => {
    try {
        await Chat.create(body)
    } catch (error) {
        console.log(error)
    }
}