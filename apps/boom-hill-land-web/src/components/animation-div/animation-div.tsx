/** biome-ignore-all lint/suspicious/noExplicitAny: _ */
"use client";

import { type AnimationParams, animate, type JSAnimation } from "animejs";
import { type ReactNode, useEffect, useRef } from "react";

export type AnimationDivProps = {
  className?: string;
  children: ReactNode;
  animationParams: Omit<
    AnimationParams,
    "onBegin" | "onBeforeUpdate" | "onUpdate" | "onLoop" | "onPause" | "onComplete" | "onRender"
  > & {
    animationName: string;
  };
  onBegin?: (self: JSAnimation, animationName: string, e?: PointerEvent) => any;
  onBeforeUpdate?: (self: JSAnimation, animationName: string, e?: PointerEvent) => any;
  onUpdate?: (self: JSAnimation, animationName: string, e?: PointerEvent) => any;
  onLoop?: (self: JSAnimation, animationName: string, e?: PointerEvent) => any;
  onPause?: (self: JSAnimation, animationName: string, e?: PointerEvent) => any;
  onComplete?: (self: JSAnimation, animationName: string, e?: PointerEvent) => any;
  onRender?: (self: JSAnimation, animationName: string, e?: PointerEvent) => any;
};

export function AnimationDiv(props: AnimationDivProps) {
  const {
    className,
    children,
    animationParams,
    onBegin,
    onBeforeUpdate,
    onUpdate,
    onLoop,
    onPause,
    onComplete,
    onRender,
  } = props;

  const boxRef = useRef<HTMLDivElement>(null);

  // biome-ignore lint/correctness/useExhaustiveDependencies: _
  useEffect(() => {
    if (boxRef.current === null) {
      return;
    }

    const animation = animate(boxRef.current, {
      ...animationParams,
      onBegin: (self, e) => {
        onBegin?.(self, animationParams.animationName, e);
      },
      onBeforeUpdate: (self, e) => {
        onBeforeUpdate?.(self, animationParams.animationName, e);
      },
      onUpdate: (self, e) => {
        onUpdate?.(self, animationParams.animationName, e);
      },
      onLoop: (self, e) => {
        onLoop?.(self, animationParams.animationName, e);
      },
      onPause: (self, e) => {
        onPause?.(self, animationParams.animationName, e);
      },
      onComplete: (self, e) => {
        onComplete?.(self, animationParams.animationName, e);
      },
      onRender: (self, e) => {
        onRender?.(self, animationParams.animationName, e);
      },
    });

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
