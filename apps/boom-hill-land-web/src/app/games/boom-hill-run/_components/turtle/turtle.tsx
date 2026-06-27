import { useMemo } from "react";
import { GifMakerV2 } from "../../../../../components/gif-maker-v2";
import type { GifMakerV2TimelineInfo } from "../../../../../components/gif-maker-v2/_types";
import { BASE_PATH } from "../../../../../consts/urls/base-path";

export function Turtle() {
  const timelineInfo: GifMakerV2TimelineInfo = useMemo(() => {
    return {
      timelineName: "turtle-hold-rope",
      timelines: [
        {
          imageUrl: `${BASE_PATH}/animals/turtle/hold-rope/hold-rope-001.png`,
          durationMs: 1500,
        },
      ],
      loopCount: Number.POSITIVE_INFINITY,
    };
  }, []);

  return (
    <GifMakerV2
      classNames={{
        root: "w-[32px] aspect-200/300",
      }}
      imageSources={[
        {
          imageUrl: `${BASE_PATH}/animals/turtle/hold-rope/hold-rope-001.png`,
        },
      ]}
      timelineInfo={timelineInfo}
    />
  );
}
