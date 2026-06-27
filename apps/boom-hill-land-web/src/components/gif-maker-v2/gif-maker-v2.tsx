import { createTimeline, type Timeline } from "animejs";
import NextImage from "next/image";
import { useEffect, useEffectEvent, useId, useRef, useState } from "react";
import type { GifMakerV2Props, GifMakerV2TimelineInfo } from "./_types";

export function GifMakerV2(props: GifMakerV2Props) {
  const reactId = useId();
  const {
    imageSources,
    classNames,
    timelineInfo,
    onTimelineStarted,
    onAnimationCycleEnded,
    onAnimationRealEnded,
  } = props;
  const [showTargetImageUrl, setShowTargetImageUrl] = useState<string | null>(null);
  const timelineObjectRef = useRef<Timeline | null>(null);

  const settingTimeline = useEffectEvent((timelineInfo: GifMakerV2TimelineInfo) => {
    let loopedCount = -1;

    timelineObjectRef.current = createTimeline({
      loop: timelineInfo.loopCount,
      onComplete: () => {
        onAnimationRealEnded?.({
          timelineInfo,
          loopedCount,
        });
      },
    });

    timelineInfo.timelines.forEach((timelineItem, index) => {
      timelineObjectRef.current?.add(
        `[data-react-id="${reactId}"][data-gif-image-unique-key="${timelineItem.imageUrl}"]`,
        {
          duration: timelineItem.durationMs,
          other: ".",
          onBegin: () => {
            if (index === 0) {
              loopedCount++;
            }
            setShowTargetImageUrl(timelineItem.imageUrl);
            onTimelineStarted?.({
              timelineInfo,
              imageUrl: timelineItem.imageUrl,
            });
          },
          onComplete: () => {
            if (timelineInfo.timelines.length - 1 === index) {
              onAnimationCycleEnded?.({
                timelineInfo,
                loopedCount,
              });
            }
          },
        },
      );
    });
  });

  const clearTimeline = useEffectEvent((timelineInfo: GifMakerV2TimelineInfo) => {
    timelineObjectRef.current?.pause();
    timelineInfo.timelines.forEach((timelineItem) => {
      timelineObjectRef.current?.remove(
        `[data-react-id="${reactId}"][data-gif-image-unique-key="${timelineItem.imageUrl}"]`,
      );
    });
  });

  useEffect(() => {
    settingTimeline(timelineInfo);
    return () => {
      clearTimeline(timelineInfo);
    };
  }, [timelineInfo]);

  return (
    <div className={`inline-flex relative items-center justify-center ${classNames?.root ?? ""}`}>
      <div className={`w-full h-full relative ${classNames?.imagesContainer ?? ""}`}>
        {imageSources.map((imageSource) => {
          return (
            <NextImage
              key={imageSource.imageUrl}
              src={imageSource.imageUrl}
              alt={imageSource.imageUrl}
              data-gif-image-unique-key={imageSource.imageUrl}
              data-react-id={reactId}
              className={`w-full h-full shrink-0 grow-0 origin-center absolute top-0 left-0 object-cover ${classNames?.image ?? ""} ${showTargetImageUrl === imageSource.imageUrl ? "opacity-100" : "opacity-0"}`}
              width={140}
              height={200}
            />
          );
        })}
      </div>
    </div>
  );
}
