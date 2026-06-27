import type { GifMakerV2TimelineInfo } from "../../../../components/gif-maker-v2/_types";
import { CHARACTER_ANIMATION_RUN_DEFAULT_DURATIONS } from "../../../../consts/characters/character-animation.consts";
import { BASE_PATH } from "../../../../consts/urls/base-path";
import type { GetTimelineInfoProps } from "../../_types";

export function getBazziRunTimelineInfo(props: GetTimelineInfoProps): GifMakerV2TimelineInfo {
  const { loopCount } = props;
  return {
    timelineName: "bazzi-run",
    timelines: [
      {
        imageUrl: `${BASE_PATH}/boom-hill-character/bazzi/run/run-001.png`, // 정면 응시하는 모습
        durationMs: CHARACTER_ANIMATION_RUN_DEFAULT_DURATIONS["001"],
      },
      {
        imageUrl: `${BASE_PATH}/boom-hill-character/bazzi/run/run-002.png`, // 고개 위로 올리고 눈 뜬 모습
        durationMs: CHARACTER_ANIMATION_RUN_DEFAULT_DURATIONS["002"],
      },
      {
        imageUrl: `${BASE_PATH}/boom-hill-character/bazzi/run/run-003.png`, // 고개 위로 올리고 눈 감은 모습
        durationMs: CHARACTER_ANIMATION_RUN_DEFAULT_DURATIONS["003"],
      },
    ],
    loopCount,
  };
}
