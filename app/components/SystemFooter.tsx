"use client";

import { useState, useEffect } from "react";

const SystemFooter = () => {
  const [currentTime, setCurrentTime] = useState("");
  const [currentDate, setCurrentDate] = useState("");

  useEffect(() => {
    const updateDateTime = () => {
      const now = new Date();
      setCurrentTime(now.toLocaleTimeString('en-US', { hour12: false }));
      setCurrentDate(now.toLocaleDateString('en-US', { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' }));
    };

    updateDateTime(); 
    const intervalId = setInterval(updateDateTime, 1000); 

    return () => clearInterval(intervalId); 
  }, []);

  return (
    <footer className="border-t-4 border-green-400 p-2 md:p-3 text-xs md:text-sm">
      <div className="max-w-6xl mx-auto flex justify-between items-center gap-4">
        <div className="flex gap-2 md:gap-4 items-center">
          <span className="text-black bg-green-400 px-2 py-1">STATUS</span>
          <span className="text-green-400">ONLINE</span>
        </div>
        <div className="hidden md:flex gap-4 items-center">
          <span>LATENCY: 14ms</span>
          <span>GEO: New Delhi, IN</span>
        </div>
        <div className="flex gap-2 md:gap-4 items-center text-right">
            <span>{currentDate}</span>
            <span className="text-green-400">{currentTime}</span>
        </div>
      </div>
    </footer>
  );
};

export default SystemFooter;
