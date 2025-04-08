import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import personImage from "../assets/person.jpg"; // Import image

// Enhanced items with descriptions
const items = Array.from({ length: 12 }, (_, i) => ({
  id: i + 1,
  name: `Person ${i + 1}`,
  image: personImage,
  description: `This is a brief description about Person ${i + 1}. Hover to see more details.`
}));

const Slider = () => {
  const [selectedIndex, setSelectedIndex] = useState(Math.floor(items.length / 2)); // Start with middle item
  const [hoveredIndex, setHoveredIndex] = useState(null);

  const handleScroll = (direction) => {
    setSelectedIndex((prev) => {
      if (direction === "right") {
        return prev === items.length - 1 ? 0 : prev + 1; // Loop back to first item
      } else {
        return prev === 0 ? items.length - 1 : prev - 1; // Loop back to last item
      }
    });
  };

  return (
    <div className="w-full flex flex-col items-center justify-center mb-40">
      {/* Carousel */}
      <div className="relative flex items-center justify-center w-full h-[250px] overflow-hidden">
        <AnimatePresence mode="wait">
          {items.map((item, index) => {
            const isActive = index === selectedIndex;
            const isHovered = hoveredIndex === index;
            
            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{
                  opacity: isActive ? 1 : 0.5, // Fade non-selected images
                  scale: isActive ? 1 : 0.75, // Scale down non-selected images
                  x: (index - selectedIndex) * 270, // Increased from 220 to 270 for spacing
                }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.5 }}
                className="absolute w-[250px] h-[250px] shadow-lg flex items-center justify-center overflow-hidden rounded-lg"
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover rounded-lg"
                />
                
                {/* Description overlay with fade effect */}
                <AnimatePresence>
                  {isHovered && (
                    <motion.div 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="absolute inset-0 bg-black bg-opacity-70 p-4 flex flex-col justify-end"
                    >
                      <h3 className="text-white font-bold mb-1">{item.name}</h3>
                      <p className="text-white text-sm">{item.description}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      {/* Scroll Buttons - Centered Below */}
      <div className="flex justify-center mt-6 gap-4">
        <button
          onClick={() => handleScroll("left")}
          className="p-2 bg-gray-700 rounded text-white"
        >
          ◀
        </button>
        <button
          onClick={() => handleScroll("right")}
          className="p-2 bg-gray-700 rounded text-white"
        >
          ▶
        </button>
      </div>
    </div>
  );
};

export default Slider;