import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/Landingpage";
import BiddingPage from "./pages/BiddingPage";
import Leaderboard from "./pages/Leaderboard";
import HowToPlay from "./pages/HowToPlay";


export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/bidding" element={<BiddingPage />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
        <Route path="/how-to-play" element={<HowToPlay />} />
        <Route path="*" element={<h1 className="text-center text-white text-4xl">Page Not Found</h1>} />
      </Routes>
    </Router>
  );
}