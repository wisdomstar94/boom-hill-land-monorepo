export type GifMakerTimelineInfo = {
  timelineName: string;
  timelines: GifMakerTimelineItem[];
};

export type GifMakerTimelineItem = {
  uniqueKey: string;
  imageUrl: string;
  durationMs: number;
};
