"use client";
import { useState, useEffect, useRef } from 'react';
import { Pause, Play, X, Minus } from 'lucide-react';

export default function PomodoroTimer() {
  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [isWorkTime, setIsWorkTime] = useState(true);
  const intervalRef = useRef(null);

  const workDuration = 25 * 60;
  const breakDuration = 5 * 60;

  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {  
            clearInterval(intervalRef.current);
            const newTime = isWorkTime ? breakDuration : workDuration;
            new Audio('/alarm.mp3').play();
            setIsWorkTime(!isWorkTime);
            return newTime;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(intervalRef.current);
  }, [isRunning, isWorkTime]);

  const formatTime = (seconds) => {
    const m = String(Math.floor(seconds / 60)).padStart(2, '0');
    const s = String(seconds % 60).padStart(2, '0');
    return `${m}:${s}`;
  };

  return (
    <div className="w-[220px] h-[287px] bg-white border rounded-xl shadow-lg relative p-4 flex flex-col items-center justify-between">
      <div className="absolute top-2 right-2 flex gap-2">
        <button className="text-gray-500 hover:text-gray-800">
          <Minus size={16} />
        </button>
        <button className="text-gray-500 hover:text-red-500">
          <X size={16} />
        </button>
      </div>
      <h2 className="text-lg font-semibold mt-6">{isWorkTime ? 'Work Time' : 'Break Time'}</h2>
      <div className="text-4xl font-mono my-4">{formatTime(timeLeft)}</div>
      <button
        onClick={() => setIsRunning((prev) => !prev)}
        className="bg-blue-500 text-white rounded-full p-3 hover:bg-blue-600"
      >
        {isRunning ? <Pause size={24} /> : <Play size={24} />}
      </button>
    </div>
  );
}
