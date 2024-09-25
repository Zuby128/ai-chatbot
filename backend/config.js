import dotenv from 'dotenv'
dotenv.config()


export const PORT = process.env.PORT || 3035
export const DB_URL = process.env.DB_URL

export const OPENAI_API_KEY = process.env.OPENAI_API_KEY
export const END_SESSION_SECRET = process.env.END_SESSION_SECRET
