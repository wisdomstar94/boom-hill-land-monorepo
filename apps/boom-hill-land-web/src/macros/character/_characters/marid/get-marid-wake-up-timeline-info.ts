import type { GifMakerV2TimelineInfo } from "../../../../components/gif-maker-v2/_types";
import {
  CHARACTER_ANIMATION_WAKE_UP_DEFAULT_DURATIONS,
  CHARACTER_ANIMATION_WAKE_UP_RANDOM_SPEED_RANGE,
} from "../../../../consts/characters/character-animation.consts";
import { BASE_PATH } from "../../../../consts/urls/base-path";
import { getRandomNumber } from "../../../get-random-number";
import type { GetTimelineInfoProps } from "../../_types";

export function getMaridWakeUpTimelineInfo(props: GetTimelineInfoProps): GifMakerV2TimelineInfo {
  const { isRandomSpeed = false, loopCount } = props;

  return {
    timelineName: "marid-wake-up",
    timelines: [
      {
        imageUrl: `${BASE_PATH}/boom-hill-character/marid/wake-up/wake-up-001.png`,
        durationMs: isRandomSpeed
          ? getRandomNumber({
              min: CHARACTER_ANIMATION_WAKE_UP_RANDOM_SPEED_RANGE.MIN,
              max: CHARACTER_ANIMATION_WAKE_UP_RANDOM_SPEED_RANGE.MAX,
            })
          : CHARACTER_ANIMATION_WAKE_UP_DEFAULT_DURATIONS["001"],
      },
      {
        imageUrl: `${BASE_PATH}/boom-hill-character/marid/wake-up/wake-up-002.png`,
        durationMs: isRandomSpeed
          ? getRandomNumber({
              min: CHARACTER_ANIMATION_WAKE_UP_RANDOM_SPEED_RANGE.MIN,
              max: CHARACTER_ANIMATION_WAKE_UP_RANDOM_SPEED_RANGE.MAX,
            })
          : CHARACTER_ANIMATION_WAKE_UP_DEFAULT_DURATIONS["002"],
      },
    ],
    loopCount,
  };
}
