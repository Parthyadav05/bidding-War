import React from 'react';
import valoImage from '../assets/valo.jpg'; // Reuse background image

const HowToPlay = () => {
  return (
    <div className="relative flex justify-center items-center h-screen overflow-hidden px-4">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center z-[-1] filter brightness-75"
        style={{ backgroundImage: `url(${valoImage})`, transform: 'scale(1.1)' }}
      ></div>

      {/* Instructions Content */}
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