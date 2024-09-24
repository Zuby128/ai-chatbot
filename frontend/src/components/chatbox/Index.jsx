import React, { useState } from "react";

const Index = () => {
  const [message, setMessage] = useState("");

  return (
    <div className="container mx-auto h-[calc(100vh_-_4rem)] flex justify-center items-center pb-4 md:pb-8">
      <div className="chat-box w-full max-w-xl rounded-lg  h-full flex flex-col-reverse bg-white text-gray-900 relative px-4 pb-[10vh] overflow-auto">
        <div className="w-full flex flex-col my-2">
          <div className="rounded-tr-2xl rounded-br-0 rounded-bl-2xl rounded-tl-2xl my-2 flex items-center p-4 min-h-12 w-fit bg-green-400 ml-auto">
            <p className="text-right w-full m-0">use22radf</p>
          </div>
          <p className="text-right">guest - 12.04.2024 14:01</p>
        </div>
        <div className="w-full flex flex-col my-2 ">
          <div className="rounded-tr-2xl rounded-br-2xl rounded-bl-0 rounded-tl-2xl flex flex-wrap items-center p-4 min-h-12 w-fit bg-blue-400 text-left">
            test
          </div>
          <p className="text-left">chatbot - 12.04.2024 14:00</p>
        </div>

        {/* ----- chat footer start ------ */}
        <div className="chat-footer w-full max-w-xl h-[10vh] fixed left-1/2 -translate-x-1/2 bottom-4 md:bottom-8 rounded-t-0 rounded-b-lg bg-gray-400">
          <div className="w-full h-full flex items-center">
            <input type="text" />
          </div>
        </div>
        {/* ----- chat footer end ------ */}
      </div>
    </div>
  );
};

export default Index;
