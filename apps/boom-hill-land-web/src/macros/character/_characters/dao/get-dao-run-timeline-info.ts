import type { GifMakerV2TimelineInfo } from "../../../../components/gif-maker-v2/_types";
import { CHARACTER_ANIMATION_RUN_DEFAULT_DURATIONS } from "../../../../consts/characters/character-animation.consts";
import { BASE_PATH } from "../../../../consts/urls/base-path";
import type { GetTimelineInfoProps } from "../../_types";

export function getDaoRunTimelineInfo(props: GetTimelineInfoProps): GifMakerV2TimelineInfo {
  const { loopCount } = props;
  return {
    timelineName: "dao-run",
    timelines: [
      {
        imageUrl: `${BASE_PATH}/boom-hill-character/dao/run/run-001.png`,
        durationMs: CHARACTER_ANIMATION_RUN_DEFAULT_DURATIONS["001"],
      },
      {
        imageUrl: `${BASE_PATH}/boom-hill-character/dao/run/run-002.png`,
        durationMs: CHARACTER_ANIMATION_RUN_DEFAULT_DURATIONS["002"],
      },
      {
        imageUrl: `${BASE_PATH}/boom-hill-character/dao/run/run-003.png`,
        durationMs: CHARACTER_ANIMATION_RUN_DEFAULT_DURATIONS["003"],
      },
    ],
    loopCount,
  };
}
