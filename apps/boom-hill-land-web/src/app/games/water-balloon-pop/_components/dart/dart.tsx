import { createTimeline } from "animejs";
import NextImage from "next/image";
import { useEffect, useRef } from "react";
import { getRandomNumber } from "../../../../../macros/get-random-number";

export type DartProps = {
  throwAt: string | null;
  onDartHit: () => void;
  onDartMiss: () => void;
};

export function Dart(props: DartProps) {
  const dartRef = useRef<HTMLDivElement>(null);
  const { throwAt, onDartHit, onDartMiss } = props;

  // biome-ignore lint/correctness/useExhaustiveDependencies: _
  useEffect(() => {
    if (throwAt === null) {
      return;
    }
    if (dartRef.current === null) {
      return;
    }

    const timeline = createTimeline({
      onComplete: () => {
        const value = getRandomNumber({ min: 0, max: 100 });
        if (value <= 20) {
          onDartHit();
        } else {
          onDartMiss();
        }
      },
    });

    timeline.add(dartRef.current, {
      duration: 0,
      opacity: 1,
    });
    timeline.add(dartRef.current, {
      duration: 200,
      opacity: 0,
      y: -80,
    });

    return () => {
      if (dartRef.current === null) {
        return;
      }
      timeline.remove(dartRef.current);
      dartRef.current.style.removeProperty("transform");
    };
  }, [throwAt]);

  if (throwAt === null) {
    return null;
  }

  return (
    <div ref={dartRef} className={`w-[20px] aspect-20/60 ${throwAt === null ? "invisible" : ""}`}>
      <NextImage
        className="w-full h-full object-contain"
        src="/things/dart.png"
        alt="dart"
        width={100}
        height={100}
      />
    </div>
  );
}
