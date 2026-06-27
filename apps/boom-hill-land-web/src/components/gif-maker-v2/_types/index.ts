export type GifMakerV2ImageSource = {
  imageUrl: string;
};

export type GifMakerV2TimelineInfo = {
  timelineName: string;
  timelines: GifMakerV2TimelineItem[];
  loopCount: number;
};

export type GifMakerV2TimelineItem = {
  imageUrl: string;
  durationMs: number;
};

export type GifMakerV2Props = {
  imageSources: GifMakerV2ImageSource[];
  classNames?: {
    root?: string;
    imagesContainer?: string;
    image?: string;
  };
  timelineInfo: GifMakerV2TimelineInfo;
  onTimelineStarted?: (params: { timelineInfo: GifMakerV2TimelineInfo; imageUrl: string }) => void;
  onAnimationCycleEnded?: (params: {
    timelineInfo: GifMakerV2TimelineInfo;
    loopedCount: number;
  }) => void;
  onAnimationRealEnded?: (params: {
    timelineInfo: GifMakerV2TimelineInfo;
    loopedCount: number;
  }) => void;
};
