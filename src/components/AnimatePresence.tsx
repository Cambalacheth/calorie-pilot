
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

interface AnimatePresenceProps {
  children: React.ReactNode;
}

export const AnimatePresence: React.FC<AnimatePresenceProps> = ({ children }) => {
  const location = useLocation();
  const [displayLocation, setDisplayLocation] = useState(location);
  const [transitionStage, setTransistionStage] = useState("fadeIn");

  useEffect(() => {
    if (location !== displayLocation) {
      setTransistionStage("fadeOut");
    }
  }, [location, displayLocation]);

  const handleAnimationEnd = () => {
    if (transitionStage === "fadeOut") {
      setTransistionStage("fadeIn");
      setDisplayLocation(location);
    }
  };

  return (
    <div
      className={`${transitionStage === "fadeIn" ? "animate-fade-in" : "animate-fade-out"}`}
      onAnimationEnd={handleAnimationEnd}
    >
      {children}
    </div>
  );
};
