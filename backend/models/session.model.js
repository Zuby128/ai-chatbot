import mongoose from "mongoose"

const sessionSchema = new mongoose.Schema({
    sessionId: { type: String, required: true },
    startedAt: { type: Date, required: true, default: new Date() },
    endedAt: Date
});

const Session = mongoose.model('Session', sessionSchema)

export default Session
