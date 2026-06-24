"use client";

import { format } from "date-fns";
import { useEffect, useState } from "react";

export function CurrentTime() {
  const [currentTime, setCurrentTime] = useState<string>("");

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(format(new Date(), "yyyy-MM-dd HH:mm:ss"));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="text-sm text-gray-500 fixed left-0 top-0">
      <div className="bg-black/70 py-0.5 px-1.5 rounded-md text-xs text-white">
        현재시각: {currentTime}
      </div>
    </div>
  );
}
