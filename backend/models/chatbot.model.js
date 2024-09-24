import mongoose from "mongoose"

const chatSchema = new mongoose.Schema({
    sessionId: { type: String, required: true },
    date: { type: Date, required: true, default: new Date() },
    text: { type: String, required: true }
});

const Chat = mongoose.model('Chat', chatSchema)

export default Chat
