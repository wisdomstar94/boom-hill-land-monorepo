"use client";

import { type AnimationParams, animate } from "animejs";
import { type ReactNode, useEffect, useRef } from "react";

export type AnimationDivProps = {
  className?: string;
  children: ReactNode;
  animationParams: AnimationParams;
};

export function AnimationDiv(props: AnimationDivProps) {
  const { className, children, animationParams } = props;

  const boxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (boxRef.current === null) {
      return;
    }

    const animation = animate(boxRef.current, animationParams);

    return () => {
      if (boxRef.current === null) {
        return;
      }
      animation.pause();
    };
  }, [animationParams]);

  return (
    <div ref={boxRef} className={`w-full h-full relative ${className ?? ""}`}>
      {children}
    </div>
  );
}
