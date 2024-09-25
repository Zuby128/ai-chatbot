import { END_SESSION_SECRET } from "../config.js"

const language = "English"

const predefinedQuestions = `
    1-What is your favorite breed of cat, and why?,\n
    2-How do you think cats communicate with their owners?,\n
    3-Have you ever owned a cat? If so, what was their name and personality like?,\n
    4-Why do you think cats love to sleep in small, cozy places?,\n
    5-What’s the funniest or strangest behavior you’ve ever seen a cat do?,\n
    6-Do you prefer cats or kittens, and what’s the reason for your preference?,\n
    7-Why do you think cats are known for being independent animals?",\n
    8-How do you think cats manage to land on their feet when they fall?,\n
    9-What’s your favorite fact or myth about cats?,\n
    10-How would you describe the relationship between humans and cats in three words?
`

export const promptChecker = (previousAnswers) => {

    return `
    You are a chatbot.\n
    We want to ask 10 questions and get answers from users.\n
    These are the questions: ${predefinedQuestions}.\n
    Ask these questions one by one as order.\n
    You dont have to ask these questions with exact same sentences, you can use different sentences have the same meanings.\n
    You can check previous conversations from: ${previousAnswers}. You can track conversation tracking "date", "sender" and "text" fields. "bot" is you as a "sender" and "user" is "user"\n
    You have to use ${language} as language. If user try to use another language please warn user slightly about using ${language}.\n
    If user answer is irrelevant, warn user kindly about answering related question. Warn user after 3 irrelevant answer you will end the session.
    After three irrelevant answers in a row, inform the user session end. Then send only ${END_SESSION_SECRET} as message, do not send any other responses, just send ${END_SESSION_SECRET}.
    If you ask a question and got suitable answer, do not ask again the same question.\n
    If you ask all these questions thank the user and send only ${END_SESSION_SECRET} as message, do not send any other responses, just send ${END_SESSION_SECRET}.
    `
}    
