import React from 'react';
import valoImage from '../assets/valo.jpg';

const HowToPlay = () => {
  return (
    <div className="relative flex justify-center items-center h-screen overflow-hidden px-4">
      {/* Home Icon Button */}
      <button
        onClick={() => window.location.href = '/'}
        className="absolute top-5 left-5 w-12 h-12 rounded-full bg-white bg-opacity-10 hover:bg-opacity-20 backdrop-blur-md shadow-lg flex items-center justify-center z-20 transition-all"
        title="Go Home"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10l9-7 9 7v10a1 1 0 01-1 1h-6m-6 0H4a1 1 0 01-1-1V10z" />
        </svg>
      </button>

      {/* Background */}
      <div
        className="absolute inset-0 bg-cover bg-center z-[-1] filter brightness-75"
        style={{ backgroundImage: `url(${valoImage})`, transform: 'scale(1.1)' }}
      ></div>

      {/* Instruction Box */}
      <div className="relative z-10 max-w-3xl w-full bg-black bg-opacity-60 rounded-lg p-8 text-white backdrop-blur-md">
        <h1 className="text-4xl font-bold mb-6 text-center">How To Play</h1>
        <ol className="list-decimal list-inside space-y-4 text-lg leading-relaxed">
          <li>Each player is given a fixed amount of virtual money to start with.</li>
          <li>Products or items are auctioned in real-time. You need to place your bids wisely.</li>
          <li>The highest bidder wins the item, and the amount is deducted from their balance.</li>
          <li>Some items have hidden profit/loss values that will affect your score.</li>
          <li>Strategize carefully — aim for high profits and avoid high-risk items.</li>
          <li>Your net performance will be reflected in the leaderboard as profit vs. loss.</li>
          <li>The game ends when all items have been auctioned.</li>
        </ol>
        <div className="mt-8 text-center">
          <p className="text-gray-300">Good luck and may the smartest bidder win!</p>
        </div>
      </div>
    </div>
  );
};

export default HowToPlay;