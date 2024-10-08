import express from 'express'
import mongoose from 'mongoose'
import { DB_URL, OPENAI_API_KEY, PORT } from './config.js'
import bodyParser from 'body-parser'
import cors from 'cors'
import chatbotController from './controllers/chatbot.controller.js'
import sessionController from './controllers/session.controller.js'


const app = express()
const port = PORT

app.use(cors())
app.use(bodyParser.json())

app.use(express.urlencoded({ extended: true }));

mongoose
    .connect(DB_URL)
    .then(async () => {
        console.log('Connected to DB')
    })
    .catch((e) => {
        console.log(e)
        console.log('DB error')
    })


app.use('/chat', chatbotController)
app.use('/session', sessionController)


app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
