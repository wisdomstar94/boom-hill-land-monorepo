import type { GifMakerV2TimelineInfo } from "../../../../components/gif-maker-v2/_types";
import { BASE_PATH } from "../../../../consts/urls/base-path";
import type { GetTimelineInfoProps } from "../../_types";

export function getEddiIdleTimelineInfo(props: GetTimelineInfoProps): GifMakerV2TimelineInfo {
  const { loopCount } = props;
  return {
    timelineName: "eddi-idle",
    timelines: [
      {
        imageUrl: `${BASE_PATH}/boom-hill-character/eddi/idle/idle-001.png`, // 정면 응시하는 모습
        durationMs: 2000,
      },
      {
        imageUrl: `${BASE_PATH}/boom-hill-character/eddi/idle/idle-002.png`, // 고개 위로 올리고 눈 뜬 모습
        durationMs: 300,
      },
      {
        imageUrl: `${BASE_PATH}/boom-hill-character/eddi/idle/idle-003.png`, // 고개 위로 올리고 눈 감은 모습
        durationMs: 150,
      },
      {
        imageUrl: `${BASE_PATH}/boom-hill-character/eddi/idle/idle-002.png`, // 고개 위로 올리고 눈 뜬 모습
        durationMs: 150,
      },
      {
        imageUrl: `${BASE_PATH}/boom-hill-character/eddi/idle/idle-003.png`, // 고개 위로 올리고 눈 감은 모습
        durationMs: 150,
      },
      {
        imageUrl: `${BASE_PATH}/boom-hill-character/eddi/idle/idle-002.png`, // 고개 위로 올리고 눈 뜬 모습
        durationMs: 300,
      },
    ],
    loopCount,
  };
}
