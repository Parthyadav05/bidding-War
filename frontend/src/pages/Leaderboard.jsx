import React from 'react';
import valoImage from '../assets/valo.jpg';

const leaderboardData = [
  { name: 'Mayank ZOD', rank: 1, profit: 500, loss: 0 },
  { name: 'Harsh', rank: 2, profit: 400, loss: 50 },
  { name: 'ravishankar', rank: 3, profit: 300, loss: 100 },
  { name: 'gurbinder', rank: 4, profit: 150, loss: 200 },
  { name: 'Parth NOOB', rank: 5, profit: 100, loss: 300 },
];

const Leaderboard = () => {
  return (
    <div className="relative flex justify-center items-center h-screen overflow-hidden">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center z-[-1] filter brightness-75"
        style={{ backgroundImage: `url(${valoImage})`, transform: 'scale(1.1)' }}
      ></div>

      {/* Leaderboard */}
      <div className="relative z-10 p-6 bg-black bg-opacity-50 rounded-lg max-w-4xl w-full backdrop-blur-md">
        <h1 className="text-3xl font-semibold text-center text-white mb-6">Leaderboard</h1>
        <div className="space-y-4">
          {leaderboardData.map((item, index) => (
            <div
              key={index}
              className="grid grid-cols-[180px_1fr_1fr] items-center gap-4 py-4 border-b border-gray-300 opacity-90 hover:opacity-100 transition-opacity"
            >
              {/* Name and Rank */}
              <span className="text-xl text-white truncate">{item.rank}. {item.name}</span>

              {/* Profit */}
              <div className="flex items-center space-x-2">
                <div className="w-32 h-2 bg-green-400 rounded-lg">
                  <div
                    className="h-full bg-green-600 rounded-lg"
                    style={{ width: `${(item.profit / 500) * 100}%` }}
                  ></div>
                </div>
                <span className="text-white text-sm whitespace-nowrap">Profit: ${item.profit}</span>
              </div>

              {/* Loss */}
              <div className="flex items-center space-x-2">
                <div className="w-32 h-2 bg-red-400 rounded-lg">
                  <div
                    className="h-full bg-red-600 rounded-lg"
                    style={{ width: `${(item.loss / 500) * 100}%` }}
                  ></div>
                </div>
                <span className="text-white text-sm whitespace-nowrap">Loss: ${item.loss}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Leaderboard;