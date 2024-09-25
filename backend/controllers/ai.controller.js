import { OpenAI } from "openai"
import { OPENAI_API_KEY } from "../config.js";
import { promptChecker } from "../ai/prompt.generator.js";

const client = new OpenAI({
    apiKey: OPENAI_API_KEY,
})

export const checkUserAnswer = async (prevChats) => {
    try {
        if (!OPENAI_API_KEY) {
            throw new Error("API key is missing.");
        }

        const prompt = promptChecker(prevChats)

        const response = await client.chat.completions.create({
            model: 'gpt-4o',
            messages: [{ role: 'assistant', content: prompt }],
        });
        return response
    } catch (error) {
        console.log(error)
    }
}


