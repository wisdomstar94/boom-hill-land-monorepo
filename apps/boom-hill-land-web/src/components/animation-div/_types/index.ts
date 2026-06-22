import type { AnimationParams } from "animejs";

export type AnimationDivTimelineInfo = {
  timelineName: string;
  timelines: AnimationDivTimelineItem[];
};

export type AnimationDivTimelineItem = {
  uniqueKey: string;
} & AnimationParams;
