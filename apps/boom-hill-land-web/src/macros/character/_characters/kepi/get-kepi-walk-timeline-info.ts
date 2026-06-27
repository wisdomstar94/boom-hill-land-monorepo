import type { GifMakerV2TimelineInfo } from "../../../../components/gif-maker-v2/_types";
import { CHARACTER_ANIMATION_WALK_DEFAULT_DURATIONS } from "../../../../consts/characters/character-animation.consts";
import { BASE_PATH } from "../../../../consts/urls/base-path";
import type { GetTimelineInfoProps } from "../../_types";

export function getKepiWalkTimelineInfo(props: GetTimelineInfoProps): GifMakerV2TimelineInfo {
  const { loopCount } = props;
  return {
    timelineName: "kepi-walk",
    timelines: [
      {
        imageUrl: `${BASE_PATH}/boom-hill-character/kepi/walk/walk-001.png`, // 정면 응시하는 모습
        durationMs: CHARACTER_ANIMATION_WALK_DEFAULT_DURATIONS["001"],
      },
      {
        imageUrl: `${BASE_PATH}/boom-hill-character/kepi/walk/walk-002.png`, // 고개 위로 올리고 눈 뜬 모습
        durationMs: CHARACTER_ANIMATION_WALK_DEFAULT_DURATIONS["002"],
      },
      {
        imageUrl: `${BASE_PATH}/boom-hill-character/kepi/walk/walk-003.png`, // 고개 위로 올리고 눈 감은 모습
        durationMs: CHARACTER_ANIMATION_WALK_DEFAULT_DURATIONS["003"],
      },
    ],
    loopCount,
  };
}
