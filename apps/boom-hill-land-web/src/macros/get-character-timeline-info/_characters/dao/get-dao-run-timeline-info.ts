import type { GifMakerTimelineInfo } from "../../../../components/gif-maker/_types/gif-maker.types";
import { CHARACTER_ANIMATION_RUN_DEFAULT_DURATIONS } from "../../../../consts/characters/character-animation.consts";
import { BASE_PATH } from "../../../../consts/urls/base-path";

export function getDaoRunTimelineInfo(): GifMakerTimelineInfo {
  return {
    timelineName: "dao-run",
    timelines: [
      {
        uniqueKey: "001",
        imageUrl: `${BASE_PATH}/boom-hill-character/dao/run/run-001.png`,
        durationMs: CHARACTER_ANIMATION_RUN_DEFAULT_DURATIONS["001"],
      },
      {
        uniqueKey: "002",
        imageUrl: `${BASE_PATH}/boom-hill-character/dao/run/run-002.png`,
        durationMs: CHARACTER_ANIMATION_RUN_DEFAULT_DURATIONS["002"],
      },
      {
        uniqueKey: "003",
        imageUrl: `${BASE_PATH}/boom-hill-character/dao/run/run-003.png`,
        durationMs: CHARACTER_ANIMATION_RUN_DEFAULT_DURATIONS["003"],
      },
    ],
  };
}
