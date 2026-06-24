import type { GifMakerTimelineInfo } from "../../../../components/gif-maker/_types/gif-maker.types";
import { CHARACTER_ANIMATION_WALK_DEFAULT_DURATIONS } from "../../../../consts/characters/character-animation.consts";
import { BASE_PATH } from "../../../../consts/urls/base-path";

export function getMaridWalkTimelineInfo(): GifMakerTimelineInfo {
  return {
    timelineName: "marid-walk",
    timelines: [
      {
        uniqueKey: "001",
        imageUrl: `${BASE_PATH}/boom-hill-character/marid/walk/walk-001.png`, // 정면 응시하는 모습
        durationMs: CHARACTER_ANIMATION_WALK_DEFAULT_DURATIONS["001"],
      },
      {
        uniqueKey: "002",
        imageUrl: `${BASE_PATH}/boom-hill-character/marid/walk/walk-002.png`, // 고개 위로 올리고 눈 뜬 모습
        durationMs: CHARACTER_ANIMATION_WALK_DEFAULT_DURATIONS["002"],
      },
      {
        uniqueKey: "003",
        imageUrl: `${BASE_PATH}/boom-hill-character/marid/walk/walk-003.png`, // 고개 위로 올리고 눈 감은 모습
        durationMs: CHARACTER_ANIMATION_WALK_DEFAULT_DURATIONS["003"],
      },
    ],
  };
}
