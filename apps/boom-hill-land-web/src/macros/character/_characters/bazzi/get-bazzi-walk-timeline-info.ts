import type { GifMakerV2TimelineInfo } from "../../../../components/gif-maker-v2/_types";
import { CHARACTER_ANIMATION_WALK_DEFAULT_DURATIONS } from "../../../../consts/characters/character-animation.consts";
import { BASE_PATH } from "../../../../consts/urls/base-path";
import type { GetTimelineInfoProps } from "../../_types";

export function getBazziWalkTimelineInfo(props: GetTimelineInfoProps): GifMakerV2TimelineInfo {
  const { loopCount } = props;
  return {
    timelineName: "bazzi-walk",
    timelines: [
      {
        imageUrl: `${BASE_PATH}/boom-hill-character/bazzi/walk/walk-001.png`,
        durationMs: CHARACTER_ANIMATION_WALK_DEFAULT_DURATIONS["001"],
      },
      {
        imageUrl: `${BASE_PATH}/boom-hill-character/bazzi/walk/walk-002.png`,
        durationMs: CHARACTER_ANIMATION_WALK_DEFAULT_DURATIONS["002"],
      },
    ],
    loopCount,
  };
}
