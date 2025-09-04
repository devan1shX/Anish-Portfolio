"use client";

import { useState, useEffect } from "react";

const statuses = ["SYSTEMS: NOMINAL", "MONITORING...", "ENCRYPTION: ACTIVE", "AWAITING COMMAND..."];

const LiveHeader = () => {
  const [currentTime, setCurrentTime] = useState("");
  const [currentStatusIndex, setCurrentStatusIndex] = useState(0);

  useEffect(() => {
    const clockInterval = setInterval(() => {
      setCurrentTime(new Date().toLocaleTimeString('en-US', { timeZone: 'Asia/Kolkata', hour12: false }));
    }, 1000);

    const statusInterval = setInterval(() => {
      setCurrentStatusIndex((prevIndex) => (prevIndex + 1) % statuses.length);
    }, 3000); 

    return () => {
      clearInterval(clockInterval);
      clearInterval(statusInterval);
    };
  }, []);

  const currentDate = new Date().toLocaleDateString('en-US', { timeZone: 'Asia/Kolkata', year: 'numeric', month: '2-digit', day: '2-digit' });

  return (
    <div className="border-2 border-white p-3 md:p-4 mb-4 font-mono">
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-2xl md:text-4xl font-bold mb-2">ANISH</h1>
          <p className="text-base md:text-xl text-green-400">AI ENGINEER & FULL STACK DEVELOPER</p>
        </div>
        <div className="text-right text-xs md:text-sm text-gray-400 hidden sm:block">
          <p>GEO-LINK: NEW DELHI, IN</p>
          <p>WX: 31°C HAZE</p>
        </div>
      </div>
      <div className="border-t-2 border-gray-700 mt-3 pt-2 flex justify-between items-center text-xs md:text-sm">
        <span className="text-green-400">{statuses[currentStatusIndex]}</span>
        <span className="text-gray-400">{currentDate} <span className="text-green-400">{currentTime}</span> IST</span>
      </div>
    </div>
  );
};

export default LiveHeader;
