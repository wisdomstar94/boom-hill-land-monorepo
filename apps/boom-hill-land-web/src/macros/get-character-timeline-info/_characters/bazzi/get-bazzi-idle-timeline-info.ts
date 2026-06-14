import type { GifMakerTimelineInfo } from "../../../../components/gif-maker/_types/gif-maker.types";

export function getBazziIdleTimelineInfo(): GifMakerTimelineInfo {
  return {
    timelineName: "bazzi-idle",
    timelines: [
      {
        uniqueKey: "001",
        imageUrl: "/boom-hill-character/dao/idle/idle-001.png", // 정면 응시하는 모습
        durationMs: 2000,
      },
      {
        uniqueKey: "002",
        imageUrl: "/boom-hill-character/dao/idle/idle-002.png", // 고개 위로 올리고 눈 뜬 모습
        durationMs: 300,
      },
      {
        uniqueKey: "003",
        imageUrl: "/boom-hill-character/dao/idle/idle-003.png", // 고개 위로 올리고 눈 감은 모습
        durationMs: 150,
      },
      {
        uniqueKey: "004",
        imageUrl: "/boom-hill-character/dao/idle/idle-002.png", // 고개 위로 올리고 눈 뜬 모습
        durationMs: 150,
      },
      {
        uniqueKey: "005",
        imageUrl: "/boom-hill-character/dao/idle/idle-003.png", // 고개 위로 올리고 눈 감은 모습
        durationMs: 150,
      },
      {
        uniqueKey: "006",
        imageUrl: "/boom-hill-character/dao/idle/idle-002.png", // 고개 위로 올리고 눈 뜬 모습
        durationMs: 300,
      },
    ],
  };
}
