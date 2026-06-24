import type { GifMakerTimelineInfo } from "../../../../components/gif-maker/_types/gif-maker.types";
import {
  CHARACTER_ANIMATION_WAKE_UP_DEFAULT_DURATIONS,
  CHARACTER_ANIMATION_WAKE_UP_RANDOM_SPEED_RANGE,
} from "../../../../consts/characters/character-animation.consts";
import { BASE_PATH } from "../../../../consts/urls/base-path";
import type { CharacterThrowBallonTimelineInfoProps } from "../../../../types/character.types";
import { getRandomNumber } from "../../../get-random-number";

export function getDaoWakeUpTimelineInfo(
  props: CharacterThrowBallonTimelineInfoProps,
): GifMakerTimelineInfo {
  const { isRandomSpeed = false } = props;

  return {
    timelineName: "dao-wake-up",
    timelines: [
      {
        uniqueKey: "001",
        imageUrl: `${BASE_PATH}/boom-hill-character/dao/wake-up/wake-up-001.png`,
        durationMs: isRandomSpeed
          ? getRandomNumber({
              min: CHARACTER_ANIMATION_WAKE_UP_RANDOM_SPEED_RANGE.MIN,
              max: CHARACTER_ANIMATION_WAKE_UP_RANDOM_SPEED_RANGE.MAX,
            })
          : CHARACTER_ANIMATION_WAKE_UP_DEFAULT_DURATIONS["001"],
      },
      {
        uniqueKey: "002",
        imageUrl: `${BASE_PATH}/boom-hill-character/dao/wake-up/wake-up-002.png`,
        durationMs: isRandomSpeed
          ? getRandomNumber({
              min: CHARACTER_ANIMATION_WAKE_UP_RANDOM_SPEED_RANGE.MIN,
              max: CHARACTER_ANIMATION_WAKE_UP_RANDOM_SPEED_RANGE.MAX,
            })
          : CHARACTER_ANIMATION_WAKE_UP_DEFAULT_DURATIONS["002"],
      },
    ],
  };
}
