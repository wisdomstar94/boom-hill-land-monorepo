"use client";

import { animate } from "animejs";
import { useEffect, useRef } from "react";

export default function Page() {
  const boxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (boxRef.current === null) {
      return;
    }

    const animation = animate(boxRef.current, {
      x: {
        to: 100,
        duration: 200, // 개별 duration 은 적용 됨
        loop: 3, // 개별 루프 적용 안됨
      },
      rotate: {
        to: "90deg",
        duration: 1000, // 개별 duration 은 적용 됨
        loop: 2, // 개별 루프 적용 안됨
      },
    });

    return () => {
      if (boxRef.current === null) {
        return;
      }
      animation.pause();
    };
  }, []);

  return (
    <div>
      <div ref={boxRef} className="size-10 bg-red-500" />
    </div>
  );
}
