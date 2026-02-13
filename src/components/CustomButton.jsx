import { motion } from "framer-motion";
import { useState } from "react";

const CustomButton = ({
  children,
  onClick,
  className = "",
  borderColor = "transparent",
  bgColor = "#FF5A00",
  hoverBorderColor="white",
  hoverTextColor = "black",
  defaultTextColor = "white",
  sweepColor = "#FF5A00"
}) => {

  const [hovered, setHovered] = useState(false);
  const [leaving, setLeaving] = useState(false);

  const handleEnter = () => {
    setLeaving(false);
    setHovered(true);
  };

  const handleLeave = () => {
    setHovered(false);
    setLeaving(true);

    setTimeout(() => {
      setLeaving(false);
    }, 500);
  };

  return (
    <motion.button
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
      onClick={onClick}
      className={`relative overflow-hidden  
        py-4 px-10  rounded uppercase text-[11px] font-bold tracking-[0.2em]
        transition-colors duration-300
        ${className}
      `}
      style={{
        borderWidth:hovered?"3px":"3px",
        borderColor:hovered?hoverBorderColor: borderColor,
        backgroundColor: hovered ? "transparent" : bgColor,
        color: hovered ? hoverTextColor : defaultTextColor
      }}
    >
      {/* WHITE FILL (Hover Sweep) */}
      {hovered && (
        <span
          className="absolute inset-0 bg-white"
          style={{
            transform: "translateX(-100%)",
            animation: "slideIn 0.5s forwards"
          }}
        />
      )}

      {/* ORANGE SWEEP (Leave) */}
     {/* ORANGE SWEEP (Leave) */}
{leaving && (
  <span
    className="absolute inset-0"
    style={{
      backgroundColor: sweepColor,
      transform: "translateX(100%)",
      animation: "slideOutFade 0.5s forwards"
    }}
  />
)}


      <span className="relative z-10">
        {children}
      </span>

      <style>
        {`
          @keyframes slideIn {
            from { transform: translateX(-100%); }
            to { transform: translateX(0%); }
          }

           @keyframes slideOutFade {
    0% {
      transform: translateX(100%);
      opacity: 1;
    }
    60% {
      transform: translateX(0%);
      opacity: 1;
    }
    100% {
      transform: translateX(0%);
      opacity: 0;
    }
  }
`}
      </style>
    </motion.button>
  );
};

export default CustomButton;
