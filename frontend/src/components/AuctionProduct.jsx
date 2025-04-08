import React, {
  Suspense,
  useState,
  useMemo,
  useEffect,
  forwardRef,
  useImperativeHandle,
} from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";

// Models
const models = [
  { name: "Cyber Gun", path: "/models/gun.glb" },
  { name: "Cyber Dog", path: "/models/dog.glb" },
];

const Model = ({ path }) => {
  const { scene } = useGLTF(path);
  return <primitive object={scene} scale={0.9} position={[0, -1.5, 0]} />;
};

const formatTime = (seconds) => {
  const min = String(Math.floor(seconds / 60)).padStart(2, "0");
  const sec = String(seconds % 60).padStart(2, "0");
  return `${min}:${sec}`;
};

const AuctionProduct = forwardRef(({ onAuctionComplete, onBidPlaced }, ref) => {
  const [current, setCurrent] = useState(0);
  const [timeLeft, setTimeLeft] = useState(20);
  const [bids, setBids] = useState(models.map(() => 10));
  const [auctionFinished, setAuctionFinished] = useState(false);
  const [bidError, setBidError] = useState("");
  const [inputBid, setInputBid] = useState("");

  const currentModel = useMemo(() => models[current], [current]);
  const currentBid = bids[current];
  const isWarning = timeLeft <= 15;

  useEffect(() => {
    if (timeLeft <= 0) {
      handleNext();
      return;
    }

    const interval = setInterval(() => setTimeLeft((prev) => prev - 1), 1000);
    return () => clearInterval(interval);
  }, [timeLeft]);

  const handleNext = () => {
    if (current + 1 < models.length) {
      setCurrent(current + 1);
      setTimeLeft(20);
    } else {
      setAuctionFinished(true);
      onAuctionComplete(bids);
    }
  };

  const handleBid = () => {
    const amount = parseInt(inputBid);
    if (!isNaN(amount) && amount > currentBid) {
      const updatedBids = [...bids];
      updatedBids[current] = amount;
      setBids(updatedBids);
      onBidPlaced(amount);
      setInputBid("");
      setBidError("");
    } else {
      setBidError(`Bid must be greater than ${currentBid}`);
    }
  };

  // Expose handleBid function to parent using ref
  useImperativeHandle(ref, () => ({
    triggerBid: handleBid,
  }));

  return (
    <div className="relative flex flex-col items-center justify-center w-full h-[500px]">
      <div className="absolute w-72 h-72 bg-cyan-400 blur-3xl opacity-30 rounded-full animate-pulse z-0" />

      {/* 3D Model Display */}
      <div className="relative z-10 w-[400px] h-[300px]">
        <Canvas camera={{ position: [0, 2, 5], fov: 70 }}>
          <Suspense fallback={null}>
            <ambientLight intensity={1.2} />
            <directionalLight position={[5, 5, 5]} intensity={2.5} />
            <Model path={currentModel.path} />
            <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={1} />
          </Suspense>
        </Canvas>
      </div>

      {/* Auction Info */}
      <div className="mt-4 flex items-center gap-6 z-10">
        <div
          className={`text-center text-cyan-300 font-bold bg-black/50 p-2 rounded-lg shadow-md w-[250px] border-2 ${
            isWarning ? "border-red-500 animate-pulse" : "border-cyan-500"
          }`}
        >
          <p>{currentModel.name}</p>
          <p>Current Bid: {currentBid} </p>
          <p>
            Time Left:{" "}
            <span className={isWarning ? "text-red-500 font-extrabold" : ""}>
              {formatTime(timeLeft)}
            </span>
          </p>
        </div>
      </div>

      {/* Bid Input */}
      {!auctionFinished && (
        <div className="absolute bottom-2 flex flex-col items-center z-20">
          <div className="flex items-center space-x-2">
            <span className="text-cyan-300 font-bold">$</span>
            <input
              type="number"
              min={currentBid + 1}
              value={inputBid}
              placeholder={`>${currentBid}`}
              className="px-2 py-1 w-24 rounded-md bg-black text-cyan-300 border border-cyan-500 focus:outline-none"
              onChange={(e) => {
                setInputBid(e.target.value);
                setBidError("");
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleBid();
                }
              }}
            />
          </div>
          {bidError && (
            <p className="text-red-500 text-xs font-semibold mt-1">
              {bidError}
            </p>
          )}
        </div>
      )}
    </div>
  );
});

export default AuctionProduct;