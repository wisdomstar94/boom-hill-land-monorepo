"use client";

import { createTimeline, type Timeline } from "animejs";
import NextImage from "next/image";
import { useEffect, useId, useRef, useState } from "react";
import type { GifMakerTimelineInfo } from "./_types/gif-maker.types";

export type GifMakerProps = {
  classNames?: {
    root?: string;
    imagesContainer?: string;
    image?: string;
  };
  timelineInfo: GifMakerTimelineInfo;
  loopCount: number;
  onAnimationCycleEnded?: (params: {
    timelineInfo: GifMakerTimelineInfo;
    loopedCount: number;
  }) => void;
  onAnimationRealEnded?: (params: {
    timelineInfo: GifMakerTimelineInfo;
    loopedCount: number;
  }) => void;
  onTimelineStarted?: (params: {
    timelineInfo: GifMakerTimelineInfo;
    timelineUniqueKey: string;
  }) => void;
};

export function GifMaker(props: GifMakerProps) {
  const {
    classNames,
    timelineInfo,
    loopCount,
    onAnimationCycleEnded,
    onAnimationRealEnded,
    onTimelineStarted,
  } = props;
  const reactId = useId();
  const [showTargetUniqueKey, setShowTargetUniqueKey] = useState<string | null>(null);

  const loopedCountRef = useRef(-1);
  const timelineObjectRef = useRef<Timeline | null>(null);

  // biome-ignore lint/correctness/useExhaustiveDependencies: _
  useEffect(() => {
    loopedCountRef.current = -1;
    timelineObjectRef.current = createTimeline({
      loop: loopCount,
      onComplete: () => {
        onAnimationRealEnded?.({
          timelineInfo,
          loopedCount: loopedCountRef.current,
        });
      },
    });

    timelineInfo.timelines.forEach((timelineItem, index) => {
      if (!timelineObjectRef.current) {
        return;
      }
      timelineObjectRef.current = timelineObjectRef.current.add(
        `.${reactId}[data-character-timeline-image-index="${index}"]`,
        {
          duration: timelineItem.durationMs,
          other: ".",
          onBegin: () => {
            if (index === 0) {
              loopedCountRef.current++;
            }
            setShowTargetUniqueKey(timelineItem.uniqueKey);
            onTimelineStarted?.({
              timelineInfo,
              timelineUniqueKey: timelineItem.uniqueKey,
            });
          },
          onComplete: () => {
            if (timelineInfo.timelines.length - 1 === index) {
              onAnimationCycleEnded?.({
                timelineInfo,
                loopedCount: loopedCountRef.current,
              });
            }
          },
        },
      );
    });

    return () => {
      timelineInfo.timelines.forEach((_, index) => {
        timelineObjectRef.current?.remove(
          `.${reactId}[data-character-timeline-image-index="${index}"]`,
        );
      });
    };
  }, [timelineInfo]);

  return (
    <div
      className={`inline-flex relative items-center justify-center justify-items-center text-[0px] ${classNames?.root ?? ""}`}
    >
      <div className={`w-full h-full relative ${classNames?.imagesContainer ?? ""}`}>
        {timelineInfo.timelines.map((timelineItem, index) => {
          return (
            <NextImage
              key={`${timelineItem.uniqueKey}`}
              className={`${reactId} w-full h-full shrink-0 grow-0 absolute top-0 left-0 object-contain ${classNames?.image ?? ""} ${showTargetUniqueKey === timelineItem.uniqueKey ? "opacity-100" : "opacity-0"}`}
              data-character-timeline-image-index={index}
              src={timelineItem.imageUrl}
              alt={timelineItem.imageUrl}
              width={100}
              height={300}
            />
          );
        })}
      </div>
    </div>
  );
}
