import React from "react";
import { Heart } from "react-feather";

function SessionEnd() {
  return (
    <div className="container mx-auto h-[calc(100vh_-_4rem)] flex justify-center items-center pb-4 md:pb-8 ">
      <div className="bg-blue-500 text-white flex items-center justify-center flex-wrap py-4 px-8 mx-2">
        <p className="text-center flex items-center">
          <Heart color="#fff" fill="red" className="mr-2" />
          Great job! Now we've reached the end of our chat about cats. Thank you
          for participating!
          <Heart color="#fff" fill="red" className="ml-2" />
        </p>
      </div>
    </div>
  );
}

export default SessionEnd;
