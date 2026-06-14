import type { GifMakerTimelineInfo } from "../../../../components/gif-maker/_types/gif-maker.types";
import {
  CHARACTER_ANIMATION_THROW_BALLON_DEFAULT_DURATIONS,
  CHARACTER_ANIMATION_THROW_BALLON_RANDOM_SPEED_RANGE,
} from "../../../../consts/characters/character-animation.consts";
import type { CharacterThrowBallonTimelineInfoProps } from "../../../../types/character.types";
import { getRandomNumber } from "../../../get-random-number";

export function getDaoThrowBallonTimelineInfo(
  props: CharacterThrowBallonTimelineInfoProps,
): GifMakerTimelineInfo {
  const { isRandomSpeed = false } = props;

  return {
    timelineName: "dao-throw-ballon",
    timelines: [
      {
        uniqueKey: "throw-001",
        imageUrl: "/boom-hill-character/dao/throw-ballon/throw-ballon-001.png", // 뒷 모습
        durationMs: isRandomSpeed
          ? getRandomNumber({
              min: CHARACTER_ANIMATION_THROW_BALLON_RANDOM_SPEED_RANGE.MIN,
              max: CHARACTER_ANIMATION_THROW_BALLON_RANDOM_SPEED_RANGE.MAX,
            })
          : CHARACTER_ANIMATION_THROW_BALLON_DEFAULT_DURATIONS["001"],
      },
      {
        uniqueKey: "throw-002",
        imageUrl: "/boom-hill-character/dao/throw-ballon/throw-ballon-002.png", // 뒷 모습인 상태에서 던지려는 포즈
        durationMs: isRandomSpeed
          ? getRandomNumber({
              min: CHARACTER_ANIMATION_THROW_BALLON_RANDOM_SPEED_RANGE.MIN,
              max: CHARACTER_ANIMATION_THROW_BALLON_RANDOM_SPEED_RANGE.MAX,
            })
          : CHARACTER_ANIMATION_THROW_BALLON_DEFAULT_DURATIONS["002"],
      },
      {
        uniqueKey: "throw-003",
        imageUrl: "/boom-hill-character/dao/throw-ballon/throw-ballon-003.png", // 뒷 모습인 상태에서 던진 후 모습
        durationMs: isRandomSpeed
          ? getRandomNumber({
              min: CHARACTER_ANIMATION_THROW_BALLON_RANDOM_SPEED_RANGE.MIN,
              max: CHARACTER_ANIMATION_THROW_BALLON_RANDOM_SPEED_RANGE.MAX,
            })
          : CHARACTER_ANIMATION_THROW_BALLON_DEFAULT_DURATIONS["003"],
      },
    ],
  };
}
