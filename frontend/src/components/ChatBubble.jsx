import React, { useState } from "react";
import characterImg from "../assets/oldman.png"; // or whichever character you're using

const ChatBubble = () => {
  const [message, setMessage] = useState("");
  const [submittedMsg, setSubmittedMsg] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (message.trim()) {
      setSubmittedMsg(message);
      setMessage("");
    }
  };

  return (
    <div className="flex flex-col items-center space-y-3">
      {/* Chat Bubble */}
      {submittedMsg && (
        <div className="bg-black text-white px-4 py-2 rounded-full text-sm shadow-md max-w-xs text-center">
          {submittedMsg}
        </div>
      )}

      {/* Character */}
      <img src={characterImg} alt="Character" className="w-16 h-16" />

      {/* Input Box */}
      <form onSubmit={handleSubmit} className="mt-2 w-full flex justify-center">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Say something..."
          className="px-4 py-2 w-64 rounded-lg border-2 border-gray-400 focus:outline-none focus:border-white bg-black text-white"
        />
      </form>
    </div>
  );
};

export default ChatBubble;