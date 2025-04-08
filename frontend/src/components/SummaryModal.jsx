import React from "react";

const SummaryModal = ({ bids, models, onClose }) => {
  // Compute profits
  const profits = {};
  models.forEach((model, index) => {
    const itemBids = bids[index];
    if (itemBids.length > 0) {
      const winner = itemBids[itemBids.length - 1];
      const profit = winner.amount - model.basePrice;
      profits[winner.username] = (profits[winner.username] || 0) + profit;
    }
  });

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-80 z-50">
      <div className="bg-[#0f0f1a] border-2 border-cyan-500 rounded-lg p-6 w-[90%] max-w-xl text-cyan-300 shadow-lg">
        <h2 className="text-xl font-bold text-center mb-4">Auction Summary</h2>

        <div className="space-y-4 max-h-[300px] overflow-y-auto">
          {models.map((model, idx) => {
            const bidsForItem = bids[idx];
            const winner = bidsForItem[bidsForItem.length - 1];
            return (
              <div key={model.name} className="bg-black/50 p-3 rounded border border-cyan-700">
                <p className="font-bold">{model.name}</p>
                {winner ? (
                  <p>
                    Won by: <span className="text-green-400">{winner.username}</span> for{" "}
                    <span className="text-yellow-300">{winner.amount} KHOKHA</span>
                  </p>
                ) : (
                  <p className="text-red-400">No bids placed.</p>
                )}
              </div>
            );
          })}
        </div>

        <h3 className="text-lg font-bold mt-4 text-center">Profits</h3>
        <ul className="mt-2 space-y-1 text-sm">
          {Object.entries(profits).map(([user, amount]) => (
            <li key={user} className="flex justify-between">
              <span>{user}</span>
              <span className="text-green-300">+{amount} KHOKHA</span>
            </li>
          ))}
        </ul>

        <button
          onClick={onClose}
          className="mt-4 px-6 py-2 bg-cyan-600 hover:bg-cyan-700 text-black font-bold rounded transition"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default SummaryModal;