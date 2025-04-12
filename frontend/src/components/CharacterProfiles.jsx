import React, { useState } from "react";
import oldman from "../assets/oldman.png";

const CharacterProfiles = () => {
  const characters = [1, 2, 3];
  const [message, setMessage] = useState("");
  const [submittedMessage, setSubmittedMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (message.trim()) {
      setSubmittedMessage(message);
      setMessage("");
    }
  };

  return (
    <div className="absolute top-12 left-4 z-30 flex flex-col items-start space-y-4 sm:space-y-6">
      {/* Render other characters - original size, only reduced on small screens */}
      <div className="flex flex-col space-y-2 sm:space-y-4">
        {characters.map((char, idx) => (
          <div
            key={idx}
            className="w-16 h-16 sm:w-24 sm:h-24 rounded-full border-2 sm:border-4 border-cyan-400 shadow-lg overflow-hidden hover:scale-105 transition-transform duration-300"
          >
            <img
              src={oldman}
              alt={`Character ${idx + 1}`}
              className="w-full h-full object-cover"
            />
          </div>
        ))}
      </div>

      {/* YOU Character + Chat Bubble - original size, only reduced on small screens */}
      <div className="flex items-center space-x-3">
        {/* Character image */}
        <div className="w-16 h-16 sm:w-24 sm:h-24 rounded-full border-2 sm:border-4 border-cyan-400 shadow-lg overflow-hidden hover:scale-105 transition-transform duration-300">
          <img src={oldman} alt="YOU" className="w-full h-full object-cover" />
        </div>

        {/* Chat bubble if message exists */}
        {submittedMessage && (
          <div className="bg-black text-white px-3 py-1 sm:px-4 sm:py-2 rounded-full text-xs sm:text-sm animate-fade-in max-w-[120px] sm:max-w-[150px] break-words">
            {submittedMessage}
          </div>
        )}
      </div>

      {/* "YOU" label */}
      <div className="text-cyan-400 font-bold text-base sm:text-lg ml-1 sm:ml-2">YOU</div>

      {/* Message Input - responsive width and proper spacing */}
      <div className="w-full">
        <form onSubmit={handleSubmit} className="relative mb-20">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Say something..."
            className="w-[90%] max-w-xs px-3 py-2 rounded-lg bg-black bg-opacity-50 text-white border border-cyan-400 focus:outline-none focus:ring-2 focus:ring-cyan-300"
          />
        </form>
      </div>
    </div>
  );
};

export default CharacterProfiles;