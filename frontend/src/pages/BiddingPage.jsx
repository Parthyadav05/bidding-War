import React, { useState, useRef } from "react";
import cyberpunkBg from "../assets/cyberpunk.jpg";
import AuctionProduct from "../components/AuctionProduct";
import CyberpunkButton from "../components/CyberpunkButton";
import CharacterProfiles from "../components/CharacterProfiles";

const BiddingPage = () => {
  const [showStats, setShowStats] = useState(false);
  const [finalBids, setFinalBids] = useState([]);
  const auctionRef = useRef();

  const handleAuctionComplete = (bids) => {
    setFinalBids(bids);
    setShowStats(true);
  };

  const handleBid = () => {
    auctionRef.current?.triggerBid();
  };

  const handlePass = () => {
    console.log("❌ Passed on the item.");
  };

  return (
    <div
      className="min-h-screen w-full bg-cover bg-center bg-no-repeat relative overflow-hidden"
      style={{ backgroundImage: `url(${cyberpunkBg})` }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-lg z-0" />

      {/* Character Profiles with Chat */}
      <CharacterProfiles />

      {/* 3D Auction Product in center */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full pt-20">
        {!showStats && (
          <AuctionProduct
            ref={auctionRef}
            onAuctionComplete={handleAuctionComplete}
            onBidPlaced={(val) => console.log("New Bid:", val)}
          />
        )}
      </div>

      {/* PASS Button */}
      {!showStats && (
        <div className="absolute bottom-10 left-6 z-20">
          <CyberpunkButton label="PASS" onClick={handlePass} />
        </div>
      )}

      {/* BID Button */}
      {!showStats && (
        <div className="absolute bottom-10 right-6 z-20">
          <CyberpunkButton label="BID" onClick={handleBid} />
        </div>
      )}

      {/* Final Stats Modal */}
      {showStats && (
        <div className="absolute inset-0 z-30 flex items-center justify-center bg-black bg-opacity-80">
          <div className="bg-cyan-950 border-2 border-cyan-400 rounded-lg p-8 text-cyan-300 text-center shadow-lg w-[350px]">
            <h2 className="text-xl font-bold mb-4">Round Stats</h2>
            {finalBids.map((bid, index) => (
              <p key={index}>
                <span className="font-semibold">{`Item ${index + 1}`}</span>:{" "}
                {bid} KHOKHA
              </p>
            ))}
            <CyberpunkButton
              label="CLOSE"
              onClick={() => setShowStats(false)}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default BiddingPage;