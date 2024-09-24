import mongoose, { Schema } from "mongoose"

const sessionSchema = new mongoose.Schema({
    sessionId: String,
    startedAt: Date,
    endedAt: Date,
    questions: [{ question: String, answer: String }],
});

const Session = mongoose.model('Session', sessionSchema)

export default Session
