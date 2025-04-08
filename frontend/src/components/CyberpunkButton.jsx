import React from "react";

const CyberpunkButton = ({ label, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="
        relative px-12 py-3 
        text-cyan-300 
        font-bold 
        uppercase 
        tracking-widest 
        rounded-md 
        bg-black 
        border border-cyan-500
        shadow-[0_6px_0_#00ffff,0_0_12px_#00ffff70]
        hover:translate-y-[-2px]
        hover:shadow-[0_8px_0_#00ffff,0_0_24px_#00ffffaa]
        active:translate-y-[2px]
        active:shadow-[0_2px_0_#00ffff,0_0_8px_#00ffff50]
        transition-all duration-150
        after:absolute after:inset-0 after:rounded-md after:border-2 after:border-cyan-500 after:opacity-0 after:transition-opacity after:duration-300 hover:after:opacity-100
      "
      style={{ fontFamily: "'Orbitron', sans-serif" }}
    >
      {label}
    </button>
  );
};

export default CyberpunkButton;