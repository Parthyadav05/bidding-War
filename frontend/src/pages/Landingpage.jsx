import React from "react";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignUpButton,
  UserButton,
} from "@clerk/clerk-react";
import bgVideo from "../assets/money.mp4";

export default function LandingPage() {
  return (
    <div className="relative w-full h-screen overflow-hidden">
      {/* Background Video */}
      <video
        autoPlay
        loop
        muted
        className="absolute top-0 left-0 w-full h-full object-cover"
      >
        <source src={bgVideo} type="video/mp4" />
      </video>

      {/* Overlay */}
      <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-50 flex flex-col items-center justify-center text-white">
        {/* Game Title */}
        <h1 className="text-6xl font-bold mb-10 drop-shadow-md">
          Game Bidding Wars
        </h1>

        {/* Container for Buttons */}
        <div className="flex flex-col items-start pl-10 space-y-6">
          <SignedIn>
            {/* ENTER ROOM */}
            <a href="/bidding">
              <button className="w-60 py-4 border-4 rounded-2xl border-white text-white text-2xl font-bold bg-black bg-opacity-50 hover:bg-white hover:text-black transition-all duration-300">
                ENTER A ROOM
              </button>
            </a>

            {/* HOW TO PLAY */}
            <a href="/how-to-play">
              <button className="w-60 py-4 border-4 rounded-2xl border-white text-white text-2xl font-bold bg-black bg-opacity-50 hover:bg-white hover:text-black transition-all duration-300">
                HOW TO PLAY
              </button>
            </a>

            {/* LEADERBOARD - NEW! */}
            <a href="/leaderboard">
              <button className="w-60 py-4 border-4 rounded-2xl white text-white text-2xl font-bold bg-black bg-opacity-40 hover:bg-white hover:text-black transition-all duration-300 hover:scale-105 shadow-lg">
                LEADERBOARD
              </button>
            </a>
          </SignedIn>

          <SignedOut>
            <div className="flex flex-col gap-5">
              <SignInButton mode="modal">
                <button className="w-60 py-4 border-4 border-white text-white text-2xl font-bold bg-black bg-opacity-50 hover:bg-white hover:text-black transition-all duration-300">
                  SIGN IN
                </button>
              </SignInButton>

              <SignUpButton mode="modal">
                <button className="w-60 py-4 border-4 border-white text-white text-2xl font-bold bg-black bg-opacity-50 hover:bg-white hover:text-black transition-all duration-300">
                  SIGN UP
                </button>
              </SignUpButton>
            </div>
          </SignedOut>
        </div>
      </div>

      {/* Profile Button at the top-right corner */}
      <div className="absolute top-4 right-4">
        <SignedIn>
          <UserButton />
        </SignedIn>
      </div>
    </div>
  );
}