import { createTimeline } from "animejs";
import { useEffect, useRef } from "react";

export type MissProps = {
  missAt: string | null;
};

export function Miss(props: MissProps) {
  const missRef = useRef<HTMLDivElement>(null);
  const { missAt } = props;

  useEffect(() => {
    if (missAt === null) {
      return;
    }
    if (missRef.current === null) {
      return;
    }

    const timeline = createTimeline();

    timeline.add(missRef.current, {
      duration: 0,
      opacity: 0,
    });
    timeline.add(missRef.current, {
      duration: 300,
      opacity: 1,
      y: -2.5,
    });
    timeline.add(missRef.current, {
      duration: 300,
      opacity: 0,
      y: -2.5,
    });

    return () => {
      if (missRef.current === null) {
        return;
      }
      timeline.remove(missRef.current);
      missRef.current.style.removeProperty("transform");
    };
  }, [missAt]);

  if (missAt === null) {
    return null;
  }

  return (
    <div
      ref={missRef}
      className={`text-purple-400 font-bold text-xl text-center ${missAt === null ? "invisible" : ""}`}
    >
      MISS
    </div>
  );
}
