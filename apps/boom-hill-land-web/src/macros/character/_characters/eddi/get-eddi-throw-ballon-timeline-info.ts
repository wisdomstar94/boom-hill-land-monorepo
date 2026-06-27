import type { GifMakerV2TimelineInfo } from "../../../../components/gif-maker-v2/_types";
import {
  CHARACTER_ANIMATION_THROW_BALLON_DEFAULT_DURATIONS,
  CHARACTER_ANIMATION_THROW_BALLON_RANDOM_SPEED_RANGE,
} from "../../../../consts/characters/character-animation.consts";
import { BASE_PATH } from "../../../../consts/urls/base-path";
import { getRandomNumber } from "../../../get-random-number";
import type { GetTimelineInfoProps } from "../../_types";

export function getEddiThrowBallonTimelineInfo(
  props: GetTimelineInfoProps,
): GifMakerV2TimelineInfo {
  const { isRandomSpeed = false, loopCount } = props;

  return {
    timelineName: "eddi-throw-ballon",
    timelines: [
      {
        imageUrl: `${BASE_PATH}/boom-hill-character/eddi/throw-ballon/throw-ballon-001.png`, // 뒷 모습
        durationMs: isRandomSpeed
          ? getRandomNumber({
              min: CHARACTER_ANIMATION_THROW_BALLON_RANDOM_SPEED_RANGE.MIN,
              max: CHARACTER_ANIMATION_THROW_BALLON_RANDOM_SPEED_RANGE.MAX,
            })
          : CHARACTER_ANIMATION_THROW_BALLON_DEFAULT_DURATIONS["001"],
      },
      {
        imageUrl: `${BASE_PATH}/boom-hill-character/eddi/throw-ballon/throw-ballon-002.png`, // 뒷 모습인 상태에서 던지려는 포즈
        durationMs: isRandomSpeed
          ? getRandomNumber({
              min: CHARACTER_ANIMATION_THROW_BALLON_RANDOM_SPEED_RANGE.MIN,
              max: CHARACTER_ANIMATION_THROW_BALLON_RANDOM_SPEED_RANGE.MAX,
            })
          : CHARACTER_ANIMATION_THROW_BALLON_DEFAULT_DURATIONS["002"],
      },
      {
        imageUrl: `${BASE_PATH}/boom-hill-character/eddi/throw-ballon/throw-ballon-003.png`, // 뒷 모습인 상태에서 던진 후 모습
        durationMs: isRandomSpeed
          ? getRandomNumber({
              min: CHARACTER_ANIMATION_THROW_BALLON_RANDOM_SPEED_RANGE.MIN,
              max: CHARACTER_ANIMATION_THROW_BALLON_RANDOM_SPEED_RANGE.MAX,
            })
          : CHARACTER_ANIMATION_THROW_BALLON_DEFAULT_DURATIONS["003"],
      },
    ],
    loopCount,
  };
}
