import axios from "axios"
import { toast } from "sonner";

const URL = import.meta.env.VITE_API_URL
const MESSAGE_ERROR = "Something went wrong"

export const sendMessage = async (body) => {
    try {
        const { data } = await axios.post(`${URL}/chat`, body)
        return data
    } catch (error) {
        toast.error(MESSAGE_ERROR)
    }
}

export const getSessionMessages = async (sessionId) => {
    try {
        const { data, status } = await axios.get(`${URL}/session/${sessionId}`)
        console.log(status)
        return { data: data, status: status }
    } catch (error) {
        toast.error(MESSAGE_ERROR)
    }
}