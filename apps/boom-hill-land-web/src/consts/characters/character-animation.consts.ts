export const CHARACTER_ANIMATIONS = {
  IDLE: "idle",
  THROW_BALLON: "throw-ballon",
  RUNNING_PREPARE: "running-prepare",
} as const;

export type CharacterAnimation = (typeof CHARACTER_ANIMATIONS)[keyof typeof CHARACTER_ANIMATIONS];

export const CHARACTER_ANIMATION_THROW_BALLON_DEFAULT_DURATIONS = {
  "001": 300,
  "002": 400,
  "003": 400,
} as const satisfies Record<string, number>;

export const CHARACTER_ANIMATION_THROW_BALLON_RANDOM_SPEED_RANGE = {
  MIN: 100,
  MAX: 1000,
} as const;
