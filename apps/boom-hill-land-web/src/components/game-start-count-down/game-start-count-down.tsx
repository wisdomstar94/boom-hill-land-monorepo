"use client";

import { useEffect, useEffectEvent, useState } from "react";

export type GameStartCountDownProps = {
  start: boolean;
  count: number;
  onCountDownEnded: () => void;
};

export function GameStartCountDown(props: GameStartCountDownProps) {
  const { start, count, onCountDownEnded } = props;

  const [currentCount, setCurrentCount] = useState(count);
  const [countDownEnded, setCountDownEnded] = useState(false);

  const onCountDownEndedFn = useEffectEvent(() => {
    onCountDownEnded();
  });

  useEffect(() => {
    if (!start) {
      return;
    }

    const interval = setInterval(() => {
      setCurrentCount((prev) => prev - 1);
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [start]);

  useEffect(() => {
    if (currentCount <= 0) {
      setCountDownEnded(true);
      onCountDownEndedFn();
    }
  }, [currentCount]);

  return (
    <div
      className={`w-px h-px left-1/2 top-1/2 fixed z-2 items-center justify-center ${start && !countDownEnded ? "flex" : "hidden"}`}
    >
      <div className="text-center text-nowrap whitespace-nowrap shrink-0 grow-0 inline-flex items-center justify-center size-14 rounded-full border border-blue-500 bg-white/50">
        <span className="text-2xl font-extrabold text-blue-500">{currentCount}</span>
      </div>
    </div>
  );
}
