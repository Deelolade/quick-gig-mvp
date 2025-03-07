import React, { useState } from "react";
import { motion } from "framer-motion";

const HeavyMouseButton = () => {
  const [tilt, setTilt] = useState(0);

  const handleMouseMove = (e) => {
    const button = e.currentTarget.getBoundingClientRect();

    // Get mouse position relative to button width
    const x = (e.clientX - button.left - button.width / 2) / (button.width / 2);

    // Adjust rotation based on horizontal mouse position
    setTilt(x * 10); // Increase for stronger effect
  };

  const handleMouseLeave = () => {
    setTilt(0); // Reset when mouse leaves
  };

  return (
    <motion.button
      className="bg-[#F20DCC] text-xl font-bold rounded-full text-black px-6 py-3 shadow-lg"
      style={{ transformOrigin: "center" }}
      animate={{ rotateX: tilt }} // Only tilt on X-axis (up/down)
      transition={{ type: "spring", stiffness: 100, damping: 10 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      Start Hiring
    </motion.button>
  );
};

export default HeavyMouseButton;
