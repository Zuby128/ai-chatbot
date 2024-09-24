import express from 'express'
import mongoose from 'mongoose'
import { DB_URL, PORT } from './config.js'
import bodyParser from 'body-parser'
import cors from 'cors'
import chatbotController from './chatbot.controller.js'


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


app.use('/chatbot', chatbotController)


app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
