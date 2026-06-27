import type { GifMakerV2TimelineInfo } from "../../../../components/gif-maker-v2/_types";
import {
  CHARACTER_ANIMATION_FALL_DOWN_DEFAULT_DURATIONS,
  CHARACTER_ANIMATION_FALL_DOWN_RANDOM_SPEED_RANGE,
} from "../../../../consts/characters/character-animation.consts";
import { BASE_PATH } from "../../../../consts/urls/base-path";
import { getRandomNumber } from "../../../get-random-number";
import type { GetTimelineInfoProps } from "../../_types";

export function getDizniFallDownTimelineInfo(props: GetTimelineInfoProps): GifMakerV2TimelineInfo {
  const { isRandomSpeed = false, loopCount } = props;

  return {
    timelineName: "dizni-fall-down",
    timelines: [
      {
        imageUrl: `${BASE_PATH}/boom-hill-character/dizni/fall-down/fall-down-001.png`,
        durationMs: isRandomSpeed
          ? getRandomNumber({
              min: CHARACTER_ANIMATION_FALL_DOWN_RANDOM_SPEED_RANGE.MIN,
              max: CHARACTER_ANIMATION_FALL_DOWN_RANDOM_SPEED_RANGE.MAX,
            })
          : CHARACTER_ANIMATION_FALL_DOWN_DEFAULT_DURATIONS["001"],
      },
      {
        imageUrl: `${BASE_PATH}/boom-hill-character/dizni/fall-down/fall-down-002.png`,
        durationMs: isRandomSpeed
          ? getRandomNumber({
              min: CHARACTER_ANIMATION_FALL_DOWN_RANDOM_SPEED_RANGE.MIN,
              max: CHARACTER_ANIMATION_FALL_DOWN_RANDOM_SPEED_RANGE.MAX,
            })
          : CHARACTER_ANIMATION_FALL_DOWN_DEFAULT_DURATIONS["002"],
      },
    ],
    loopCount,
  };
}
