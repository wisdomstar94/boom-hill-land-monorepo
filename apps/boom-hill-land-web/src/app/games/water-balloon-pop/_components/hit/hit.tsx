import { createTimeline } from "animejs";
import { useEffect, useRef } from "react";

export type HitProps = {
  hitAt: string | null;
};

export function Hit(props: HitProps) {
  const hitRef = useRef<HTMLDivElement>(null);
  const { hitAt } = props;

  useEffect(() => {
    if (hitAt === null) {
      return;
    }
    if (hitRef.current === null) {
      return;
    }

    const timeline = createTimeline();

    timeline.add(hitRef.current, {
      duration: 0,
      opacity: 0,
    });
    timeline.add(hitRef.current, {
      duration: 300,
      opacity: 1,
      y: -2.5,
    });
    timeline.add(hitRef.current, {
      duration: 300,
      opacity: 0,
      y: -2.5,
    });

    return () => {
      if (hitRef.current === null) {
        return;
      }
      timeline.remove(hitRef.current);
      hitRef.current.style.removeProperty("transform");
    };
  }, [hitAt]);

  if (hitAt === null) {
    return null;
  }

  return (
    <div
      ref={hitRef}
      className={`text-orange-500 font-bold text-xl text-center ${hitAt === null ? "invisible" : ""}`}
    >
      HIT
    </div>
  );
}
