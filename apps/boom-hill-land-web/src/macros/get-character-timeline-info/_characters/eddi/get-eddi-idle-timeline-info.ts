import type { GifMakerTimelineInfo } from "../../../../components/gif-maker/_types/gif-maker.types";
import { BASE_PATH } from "../../../../consts/urls/base-path";

export function getEddiIdleTimelineInfo(): GifMakerTimelineInfo {
  return {
    timelineName: "eddi-idle",
    timelines: [
      {
        uniqueKey: "001",
        imageUrl: `${BASE_PATH}/boom-hill-character/dao/idle/idle-001.png`, // 정면 응시하는 모습
        durationMs: 2000,
      },
      {
        uniqueKey: "002",
        imageUrl: `${BASE_PATH}/boom-hill-character/dao/idle/idle-002.png`, // 고개 위로 올리고 눈 뜬 모습
        durationMs: 300,
      },
      {
        uniqueKey: "003",
        imageUrl: `${BASE_PATH}/boom-hill-character/dao/idle/idle-003.png`, // 고개 위로 올리고 눈 감은 모습
        durationMs: 150,
      },
      {
        uniqueKey: "004",
        imageUrl: `${BASE_PATH}/boom-hill-character/dao/idle/idle-002.png`, // 고개 위로 올리고 눈 뜬 모습
        durationMs: 150,
      },
      {
        uniqueKey: "005",
        imageUrl: `${BASE_PATH}/boom-hill-character/dao/idle/idle-003.png`, // 고개 위로 올리고 눈 감은 모습
        durationMs: 150,
      },
      {
        uniqueKey: "006",
        imageUrl: `${BASE_PATH}/boom-hill-character/dao/idle/idle-002.png`, // 고개 위로 올리고 눈 뜬 모습
        durationMs: 300,
      },
    ],
  };
}
