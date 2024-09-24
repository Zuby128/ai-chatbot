import Session from "../models/session.model.js"

export const createSession = async (sessionId) => {
    try {
        await Session.create({ sessionId })
    } catch (error) {
        console.log(error)
    }
}

export const updateSession = async (id, obj) => {
    try {
        await Session.findByIdAndUpdate(id, obj)
    } catch (error) {
        console.log(error)
    }
}