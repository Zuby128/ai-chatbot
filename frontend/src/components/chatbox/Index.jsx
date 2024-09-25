import React, { useEffect, useRef, useState } from "react";
import { Send } from "react-feather";
import { v4 as uuidv4 } from "uuid";
import { getSessionMessages, sendMessage } from "../../services/chat.js";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

function formatDate(isoDate) {
  if (!isoDate) return;
  const date = new Date(isoDate);

  const day = String(date.getUTCDate()).padStart(2, "0");
  const month = String(date.getUTCMonth() + 1).padStart(2, "0");
  const year = date.getUTCFullYear(); // Yıl

  const hours = String(date.getUTCHours()).padStart(2, "0");
  const minutes = String(date.getUTCMinutes()).padStart(2, "0");
  const seconds = String(date.getUTCSeconds()).padStart(2, "0");

  return `${day}-${month}-${year} ${hours}:${minutes}:${seconds}`;
}

const Index = () => {
  const [text, setText] = useState("");
  const [sessionId, setSessionId] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);

  const containerRef = useRef(null);

  const navigate = useNavigate();

  useEffect(() => {
    const id = uuidv4();
    setSessionId(id);
  }, []);

  useEffect(() => {
    const element = containerRef.current;
    if (element) {
      element.scrollTop = element.scrollHeight;
    }
  }, [messages]);

  const onChange = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      postMessage();
    }

    setText(e.target.value);
  };

  const postMessage = async () => {
    try {
      if (text.trim()) {
        // make messages display in the chatbox immediately
        const tempMessages = [
          {
            _id: "temporaryId",
            sender: "user",
            date: formatDate(new Date()),
            text: text.trim(),
            sessionId,
          },
          ...messages,
        ];

        setMessages(tempMessages);

        // make the send button disabled
        setLoading(true);

        // create body and post it
        const body = { sessionId, text: text.trim(), sender: "user" };
        await sendMessage(body);
        setText("");

        // get messages
        const { data, status } = await getSessionMessages(sessionId);

        if (status === 204) {
          navigate("session-end");
        }

        // make button usable again
        setLoading(false);

        if (!data) return;

        // sort and set all messages
        const mess = data
          .sort((a, b) => new Date(b.date) - new Date(a.date))
          .map((v) => {
            return { ...v, date: formatDate(v.date) };
          });
        setMessages(mess);
      }
    } catch (error) {
      toast.error("Message couldn't sent, please try again later");
    }
  };

  return (
    <div className="container mx-auto h-[calc(100vh_-_4rem)] flex justify-center items-center pb-4 md:pb-8">
      <div
        ref={containerRef}
        className="chat-box w-full max-w-xl rounded-lg h-full flex flex-col-reverse bg-white text-gray-900 relative px-4 pb-[13vh] overflow-auto"
      >
        {messages.length === 0 && (
          <div className="absolute w-full top-0 left-0 bg-orange-100 text-orange-700 p-4 text-center rounded-lg">
            Welcome, dear guest! <br />
            Your session will begin as soon as you send <br />
            your first message. We hope you enjoy the experience!
          </div>
        )}
        {messages.length > 0 &&
          messages.map((v) => (
            <div className="w-full flex flex-col my-2" key={v._id}>
              {v.sender === "user" && (
                <div className="w-fit ml-auto">
                  <p className="text-right w-full m-0 rounded-tr-2xl rounded-br-0 rounded-bl-2xl rounded-tl-2xl flex items-center p-4 min-h-12 bg-cyan-100 ">
                    {v.text}
                  </p>
                  <p className="text-right font-thin text-xs italic">
                    guest - {v.date}
                  </p>
                </div>
              )}
              {v.sender === "bot" && (
                <div className="w-fit text-left">
                  <p className="text-left w-full m-0 rounded-tr-2xl rounded-br-2xl rounded-bl-0 rounded-tl-2xl flex flex-wrap items-center p-4 min-h-12 bg-yellow-100 ">
                    {v.text}
                  </p>
                  <p className="text-left font-thin text-xs italic">
                    chatbot - {v.date}
                  </p>
                </div>
              )}
            </div>
          ))}

        {/* ----- chat footer start ------ */}
        <div className="chat-footer w-full max-w-xl h-[13vh] fixed left-1/2 -translate-x-1/2 bottom-4 md:bottom-8 rounded-t-0 rounded-b-lg bg-gray-200 p-2">
          <div className="w-full h-full flex flex-col md:grid md:grid-cols-5 items-center">
            <textarea
              name="input"
              id="input"
              cols="30"
              className="min-h-8 max-h-12 mb-1 md:mb-0 w-full md:col-span-4 resize-none rounded-md p-1 shadow-lg focus:outline-none"
              value={text}
              onChange={onChange}
              onKeyDown={onChange}
            ></textarea>
            <button
              onClick={postMessage}
              disabled={loading}
              className="h-8 min-h-8 md:h-full max-h-12 w-full md:col-span-1 rounded-md flex justify-center items-center bg-teal-600 text-white shadow-lg hover:bg-teal-900 disabled:bg-teal-300"
            >
              <Send color="#fff" />
            </button>
          </div>
        </div>
        {/* ----- chat footer end ------ */}
      </div>
    </div>
  );
};

export default Index;
